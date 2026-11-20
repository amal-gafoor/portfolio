import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1100px] px-5 pb-32 pt-20 md:px-8 md:pb-20 md:pt-28">
      <Reveal>
        <Card className="py-0">
          <CardContent className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
              <h2 className="text-2xl font-semibold tracking-tight md:text-[32px]">
                Let&apos;s build something that doesn&apos;t break.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                {site.email} · {site.location}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${site.email}`}>
                  <Mail size={16} /> Say hello
                </a>
              </Button>
              <Button asChild variant="outline" size="icon-lg">
                <a aria-label="GitHub" href={site.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon size={18} />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon-lg">
                <a aria-label="LinkedIn" href={site.links.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon size={18} />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Reveal>
      <footer className="mt-10 flex flex-col items-center justify-between gap-2 font-mono text-xs text-muted-foreground md:flex-row">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Next.js · Tailwind · shadcn/ui</span>
      </footer>
    </section>
  );
}
