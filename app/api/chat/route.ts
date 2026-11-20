import { runAgent } from "@/lib/agent";
import type { ChatMessage, StreamEvent } from "@/lib/chat-types";
import { allow } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_CHARS = 2000;
const MAX_HISTORY = 8;

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (!allow(ip)) {
    return Response.json({ error: "Too many questions for now. Try again in a few minutes." }, { status: 429 });
  }

  let history: ChatMessage[] = [];
  try {
    const body = await req.json();
    history = (Array.isArray(body?.messages) ? body.messages : [])
      .filter(
        (m: ChatMessage) =>
          (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string" && m.content.trim(),
      )
      .slice(-MAX_HISTORY)
      .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!history.length || history[history.length - 1].role !== "user") {
    return Response.json({ error: "Send a question." }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const emit = (e: StreamEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        await runAgent(history, emit);
      } catch (err) {
        console.error("[chat]", err);
        emit({ type: "error", message: "The agent hit an error reaching the model. Please try again." });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });
}
