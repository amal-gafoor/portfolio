import { skills } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1100px] px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionTitle kicker="Stack" title="What I work with" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05}>
            <Card className="h-full gap-4">
              <CardHeader>
                <CardTitle className="font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-muted-foreground">
                  {g.group}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
