"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

const noop = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // false on the server and first paint, true once hydrated
  const mounted = useSyncExternalStore(noop, () => true, () => false);
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
      variant="glass"
      size="icon-md"
      aria-label="Toggle theme"
      onClick={toggle}
      className={cn("relative", className)}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          size={18}
          className={cn(
            "absolute inset-0 transition-all duration-500",
            mounted && isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
          )}
        />
        <Moon
          size={18}
          className={cn(
            "absolute inset-0 transition-all duration-500",
            mounted && !isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0",
          )}
        />
      </span>
    </Button>
  );
}
