import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1100px] px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionTitle kicker="Projects" title="Things that run in production" />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 3) * 0.06}
            className={p.featured ? "md:col-span-2" : ""}
          >
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {p.tag}
                </p>
                <div className="flex gap-1.5">
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} code`}
                      className="glass glass-hover grid h-9 w-9 place-items-center rounded-full"
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} live`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-fg text-bg"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted md:text-[15px]">
                {p.blurb}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
