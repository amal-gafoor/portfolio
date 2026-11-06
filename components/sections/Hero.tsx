import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { site, stats } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Ninja } from "@/components/Ninja";

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[100svh] max-w-[1100px] flex-col justify-center px-5 pb-24 pt-24 md:px-8 md:pt-32"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.25fr_1fr] md:gap-8">
        {/* text */}
        <div className="order-2 md:order-1">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-fg" />
              Open to AI engineering roles
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[40px] font-semibold leading-[1.05] tracking-tight md:text-[60px]">
              {site.name.split(" ").slice(0, 2).join(" ")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[520px] text-lg leading-relaxed text-fg md:text-xl">
              {site.headline}
            </p>
            <p className="mt-3 max-w-[520px] text-base leading-relaxed text-muted">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="#projects">
                View work <ArrowDown size={16} />
              </Button>
              <Button href={`mailto:${site.email}`} variant="ghost">
                <Mail size={16} /> Contact
              </Button>
              <div className="ml-1 flex items-center gap-2">
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
            </div>
          </Reveal>
        </div>

        {/* avatar + ninja */}
        <Reveal delay={0.1} className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative h-[220px] w-[220px] md:h-[300px] md:w-[300px]">
            <div className="absolute inset-[-14%] rounded-full bg-[var(--glow)] blur-3xl" />
            <div className="glass absolute inset-0 rounded-full p-2">
              <Image
                src="/avatar.png"
                alt={site.name}
                width={512}
                height={512}
                priority
                sizes="(max-width: 768px) 220px, 300px"
                className="h-full w-full rounded-full object-cover grayscale transition duration-700 hover:grayscale-0"
              />
            </div>
            <Ninja />
          </div>
        </Reveal>
      </div>

      {/* stats */}
      <Reveal delay={0.2}>
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-4">
              <div className="font-mono text-2xl font-semibold tracking-tight md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted md:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
