import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1100px] px-5 pb-32 pt-20 md:px-8 md:pb-20 md:pt-28">
      <Reveal>
        <GlassCard hover={false} className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Contact
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-[32px]">
              Let&apos;s build something that doesn&apos;t break.
            </h2>
            <p className="mt-2 text-sm text-muted md:text-base">
              {site.email} · {site.location}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={`mailto:${site.email}`}>
              <Mail size={16} /> Say hello
            </Button>
            <a
              aria-label="GitHub"
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover grid h-11 w-11 place-items-center rounded-full"
            >
              <GithubIcon size={18} />
            </a>
            <a
              aria-label="LinkedIn"
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover grid h-11 w-11 place-items-center rounded-full"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </GlassCard>
      </Reveal>
      <footer className="mt-10 flex flex-col items-center justify-between gap-2 font-mono text-xs text-muted md:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Next.js · Tailwind · deployed on Vercel</span>
      </footer>
    </section>
  );
}
