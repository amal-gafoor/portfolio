import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1100px] px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionTitle kicker="Projects" title="Things that run in production" />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.06} className={p.featured ? "md:col-span-2" : ""}>
            <SpotlightCard className="h-full">
              <CardHeader>
                <div className="mb-1.5 flex items-start justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</p>
                  <div className="flex gap-1.5">
                    {p.code && (
                      <Button asChild variant="glass" size="icon-sm">
                        <a href={p.code} target="_blank" rel="noreferrer" aria-label={`${p.title} code`}>
                          <GithubIcon size={15} />
                        </a>
                      </Button>
                    )}
                    {p.live && (
                      <Button asChild size="icon-sm">
                        <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live`}>
                          <ArrowUpRight size={15} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-5 pt-2">
                <CardDescription>{p.blurb}</CardDescription>
              </CardContent>
              <CardFooter className="flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </CardFooter>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
