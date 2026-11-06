import { skills } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1100px] px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionTitle kicker="Stack" title="What I work with" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05}>
            <GlassCard className="p-6">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {g.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
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
