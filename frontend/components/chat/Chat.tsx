"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUp, ArrowUpRight, ChevronDown, FileText, Mail, Phone, Wrench } from "lucide-react";
import type { ChatMessage, Source, Stats, StreamEvent, UiAction } from "@/lib/chat-types";
import type { Project } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Step = { tool: string; input: string; output: string };

type Turn = {
  id: number;
  question: string;
  steps: Step[];
  sources: Source[];
  ui: UiAction[];
  text: string;
  stats?: Stats;
  error?: string;
  done: boolean;
};

const SUGGESTIONS = [
  "What has Amal built?",
  "Show me his RAG projects",
  "How does this chatbot work?",
  "Is he a fit for my role?",
  "Switch to light mode",
];

/** The Python backend that runs the agent (see /backend). */
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

const MIN_H = 56;
const MAX_H = 180;

export function Chat() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const { setTheme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  const resize = useCallback((reset?: boolean) => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = `${MIN_H}px`;
    if (!reset) el.style.height = `${Math.max(MIN_H, Math.min(el.scrollHeight, MAX_H))}px`;
  }, []);

  // keep the newest content in view while steps arrive and the answer types out
  useEffect(() => {
    const el = scrollRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const ro = new ResizeObserver(() => el.scrollTo({ top: el.scrollHeight }));
    ro.observe(inner);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turns.length > 0]);

  const patch = (id: number, fn: (t: Turn) => Turn) =>
    setTurns((all) => all.map((t) => (t.id === id ? fn(t) : t)));

  const ask = async (raw: string) => {
    const question = raw.trim();
    if (!question || busy) return;

    if (/fit for my role/i.test(question) && question.length < 40) {
      // this chip needs a job description, so prefill instead of sending
      setValue("Is Amal a fit for this role?\n\n[paste the job description here]");
      requestAnimationFrame(() => {
        resize();
        textareaRef.current?.focus();
      });
      return;
    }

    const id = nextId.current++;
    const history: ChatMessage[] = [
      ...turns.flatMap((t) => [
        { role: "user" as const, content: t.question },
        { role: "assistant" as const, content: t.text || "(no answer)" },
      ]),
      { role: "user", content: question },
    ];
    setTurns((all) => [...all, { id, question, steps: [], sources: [], ui: [], text: "", done: false }]);
    setValue("");
    resize(true);
    setBusy(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => null);
        throw new Error(typeof body?.detail === "string" ? body.detail : "Something went wrong. Please try again.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const e = JSON.parse(line) as StreamEvent;
          if (e.type === "step") patch(id, (t) => ({ ...t, steps: [...t.steps, e] }));
          else if (e.type === "sources") patch(id, (t) => ({ ...t, sources: e.items }));
          else if (e.type === "text") patch(id, (t) => ({ ...t, text: e.content }));
          else if (e.type === "stats") patch(id, (t) => ({ ...t, stats: e.stats }));
          else if (e.type === "error") patch(id, (t) => ({ ...t, error: e.message }));
          else if (e.type === "ui") {
            if (e.action.kind === "theme") setTheme(e.action.mode);
            patch(id, (t) => ({ ...t, ui: [...t.ui, e.action] }));
          }
        }
      }
    } catch (err) {
      const offline = err instanceof TypeError; // fetch could not reach the backend
      patch(id, (t) => ({
        ...t,
        error: offline
          ? "Can't reach the agent backend right now. Please try again in a moment."
          : err instanceof Error
            ? err.message
            : "Something went wrong.",
      }));
    } finally {
      patch(id, (t) => ({ ...t, done: true }));
      setBusy(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="gap-0 overflow-hidden py-0">
        {turns.length > 0 && (
          <div ref={scrollRef} className="max-h-[36svh] overflow-y-auto border-b md:max-h-[46svh]">
            <div ref={innerRef} className="space-y-6 p-4 md:p-5">
              {turns.map((t) => (
                <TurnView key={t.id} turn={t} />
              ))}
            </div>
          </div>
        )}

        <Textarea
          ref={textareaRef}
          value={value}
          rows={1}
          maxLength={2000}
          onChange={(e) => {
            setValue(e.target.value);
            resize();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(value);
            }
          }}
          placeholder="Ask about my work, or paste a job description…"
          aria-label="Ask the portfolio agent"
          className="resize-none rounded-none border-0 px-4 py-4 text-[15px] shadow-none focus-visible:ring-0 md:text-[15px]"
          style={{ height: MIN_H }}
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <span className="pl-1 font-mono text-[11px] text-muted-foreground">RAG + tool-calling agent · live</span>
          <Button
            type="button"
            size="icon-sm"
            variant={value.trim() && !busy ? "default" : "outline"}
            onClick={() => ask(value)}
            disabled={!value.trim() || busy}
            aria-label="Send"
            className="rounded-full"
          >
            <ArrowUp size={16} />
          </Button>
        </div>
      </Card>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <Button key={s} type="button" variant="outline" size="sm" onClick={() => ask(s)} disabled={busy} className="rounded-full font-normal text-muted-foreground">
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- one turn ----------------------------- */

function TurnView({ turn }: { turn: Turn }) {
  const [open, setOpen] = useState(true);
  const typed = useTyped(turn.text);

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap rounded-lg bg-primary px-3.5 py-2 text-sm text-primary-foreground">
          {turn.question}
        </p>
      </div>

      {/* agent trace */}
      {(turn.steps.length > 0 || !turn.done) && (
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className="rounded-lg border border-dashed font-mono text-[11px] text-muted-foreground"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2">
            <span className="flex items-center gap-2">
              <Wrench size={12} />
              {turn.done ? `agent trace · ${turn.steps.length} step${turn.steps.length === 1 ? "" : "s"}` : "agent working…"}
            </span>
            <ChevronDown size={13} className={cn("transition-transform", open && "rotate-180")} />
          </CollapsibleTrigger>
          {turn.steps.length > 0 && (
            <CollapsibleContent>
              <ol className="space-y-1.5 border-t border-dashed px-3 py-2">
                {turn.steps.map((s, i) => (
                  <li key={i} className="break-words">
                    <span className="text-foreground">
                      {i + 1}. {s.tool}
                    </span>
                    {s.input && (
                      <span>
                        (&quot;{s.input.slice(0, 60)}
                        {s.input.length > 60 ? "…" : ""}&quot;)
                      </span>
                    )}
                    <span> → {s.output}</span>
                  </li>
                ))}
              </ol>
            </CollapsibleContent>
          )}
        </Collapsible>
      )}

      {/* answer */}
      {turn.error ? (
        <p className="text-sm text-muted-foreground">{turn.error}</p>
      ) : (
        turn.text && <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{typed}</p>
      )}

      {/* tool output rendered as UI */}
      {turn.ui.map((a, i) =>
        a.kind === "projects" ? (
          <div key={i} className="grid gap-2 sm:grid-cols-2">
            {a.projects.map((p) => (
              <MiniProject key={p.title} p={p} />
            ))}
          </div>
        ) : a.kind === "contact" ? (
          <div key={i} className="flex flex-wrap gap-2">
            <Pill href={`mailto:${a.email}`} icon={<Mail size={13} />} label={a.email} />
            {a.phone && <Pill href={`tel:${a.phone.replace(/\s+/g, "")}`} icon={<Phone size={13} />} label={a.phone} />}
            <Pill href={a.linkedin} icon={<LinkedinIcon size={13} />} label="LinkedIn" />
            <Pill href={a.github} icon={<GithubIcon size={13} />} label="GitHub" />
          </div>
        ) : null,
      )}

      {/* sources + stats */}
      {turn.sources.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[11px] text-muted-foreground">sources</span>
          {turn.sources.map((s) => (
            <Badge key={s.id} variant="outline" className="font-mono font-normal text-muted-foreground">
              <FileText size={10} />
              {s.title}
            </Badge>
          ))}
        </div>
      )}
      {turn.stats && (
        <p className="font-mono text-[11px] text-muted-foreground">
          {(turn.stats.ms / 1000).toFixed(2)}s · {turn.stats.steps} tool call{turn.stats.steps === 1 ? "" : "s"} ·{" "}
          {turn.stats.chunks} chunk{turn.stats.chunks === 1 ? "" : "s"} retrieved
          {turn.stats.mode === "llm"
            ? ` · ${turn.stats.tokens} tokens · ${turn.stats.model}`
            : " · demo mode (retrieval only, no LLM key set)"}
        </p>
      )}
    </div>
  );
}

function MiniProject({ p }: { p: Project }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{p.tag}</p>
          <p className="mt-0.5 text-sm font-semibold">{p.title}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          {p.code && (
            <Button asChild variant="outline" size="icon-sm" className="size-7">
              <a href={p.code} target="_blank" rel="noreferrer" aria-label={`${p.title} code`}>
                <GithubIcon size={12} />
              </a>
            </Button>
          )}
          {p.live && (
            <Button asChild size="icon-sm" className="size-7">
              <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live`}>
                <ArrowUpRight size={12} />
              </a>
            </Button>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.blurb}</p>
      <p className="mt-2 font-mono text-[10px] text-muted-foreground">{p.stack.join(" · ")}</p>
    </div>
  );
}

function Pill({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Button asChild variant="outline" size="sm" className="font-normal">
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {icon}
        {label}
      </a>
    </Button>
  );
}

/** Reveals text a few characters at a time, like a streamed answer. */
function useTyped(text: string) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!text) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? text.length : Math.max(2, Math.ceil(text.length / 120));
    const timer = setInterval(() => {
      setN((c) => {
        if (c >= text.length) {
          clearInterval(timer);
          return c;
        }
        return c + step;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [text]);
  return text.slice(0, n);
}
