"use client";

import { useEffect, useState } from "react";
import { Briefcase, Home, Mail, Sparkles, User } from "lucide-react";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const icons = [Home, Briefcase, User, Sparkles, Mail];

export function Navbar() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* laptop: floating pill */}
      <header className="fixed inset-x-0 top-5 z-50 hidden justify-center md:flex">
        <nav className="glass-strong flex items-center gap-1 rounded-full p-1.5 pl-4">
          <a href="#home" className="mr-3 font-mono text-sm font-semibold tracking-tight">
            {site.shortName.toLowerCase()}
            <span className="text-muted">.dev</span>
          </a>
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                active === n.href
                  ? "bg-fg text-bg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle className="ml-1" />
        </nav>
      </header>

      {/* mobile: top-right theme toggle + bottom glass bar */}
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <ThemeToggle />
      </div>
      <nav className="safe-bottom fixed inset-x-4 bottom-4 z-50 md:hidden">
        <div className="glass-strong flex items-center justify-around rounded-full px-2 py-2">
          {nav.map((n, i) => {
            const Icon = icons[i];
            const on = active === n.href;
            return (
              <a
                key={n.href}
                href={n.href}
                aria-label={n.label}
                className={`grid h-11 w-11 place-items-center rounded-full transition-all ${
                  on ? "bg-fg text-bg" : "text-muted"
                }`}
              >
                <Icon size={19} />
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
