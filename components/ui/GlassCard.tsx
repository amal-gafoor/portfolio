"use client";

import { useCallback, type HTMLAttributes, type MouseEvent } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  spot?: boolean;
};

export function GlassCard({
  className = "",
  hover = true,
  spot = true,
  children,
  ...rest
}: Props) {
  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div
      onMouseMove={spot ? onMove : undefined}
      className={`glass rounded-[20px] ${hover ? "glass-hover" : ""} ${spot ? "spot" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
