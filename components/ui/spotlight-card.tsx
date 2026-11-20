"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** shadcn Card plus the hover lift and the glow that follows the cursor. */
function SpotlightCard({ className, onMouseMove, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn("glass-hover spot", className)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        onMouseMove?.(e);
      }}
      {...props}
    />
  );
}

export { SpotlightCard };
