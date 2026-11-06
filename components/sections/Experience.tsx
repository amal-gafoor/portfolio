import { experience, site } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1100px] px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
        <div>
          <Reveal>
            <SectionTitle kicker="About" title="Demos are easy. Load is hard." />
          </Reveal>
          {site.about.map((para, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className="mb-4 text-[15px] leading-relaxed text-muted md:text-base">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <div>
          <Reveal>
            <SectionTitle kicker="Experience" title="Where I've been" />
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard hover={false} spot={false} className="p-6 md:p-8">
              <ol className="relative border-l border-[var(--glass-border)] pl-6">
                {experience.map((x) => (
                  <li key={x.title + x.org} className="mb-8 last:mb-0">
                    <span className="absolute -left-[5px] mt-1.5 h-[9px] w-[9px] rounded-full bg-fg ring-4 ring-[var(--bg)]" />
                    <p className="font-mono text-xs text-muted">{x.period}</p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">
                      {x.title}
                    </h3>
                    <p className="text-sm text-muted">{x.org}</p>
                    {x.points.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                        {x.points.map((pt) => (
                          <li key={pt} className="flex gap-2">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-muted" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
