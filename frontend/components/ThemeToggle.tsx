"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const doc = document as DocWithVT;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // origin of the circular reveal = the button
    const r = e.currentTarget.getBoundingClientRect();
    root.style.setProperty("--tx", `${r.left + r.width / 2}px`);
    root.style.setProperty("--ty", `${r.top + r.height / 2}px`);

    if (doc.startViewTransition && !reduce) {
      doc.startViewTransition(() => setTheme(next));
    } else {
      root.classList.add("theme-fade");
      setTheme(next);
      setTimeout(() => root.classList.remove("theme-fade"), 600);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      className={cn("relative rounded-full", className)}
    >
      <span className="relative block h-[18px] w-[18px]">
        {/* which icon shows is decided by the .dark class in CSS, so it is right before JS loads */}
        <Sun
          size={18}
          className="absolute inset-0 -rotate-90 scale-50 opacity-0 transition-all duration-500 dark:rotate-0 dark:scale-100 dark:opacity-100"
        />
        <Moon
          size={18}
          className="absolute inset-0 rotate-0 scale-100 opacity-100 transition-all duration-500 dark:rotate-90 dark:scale-50 dark:opacity-0"
        />
      </span>
    </Button>
  );
}
