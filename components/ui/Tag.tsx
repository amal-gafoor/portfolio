export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] tracking-wide text-muted">
      {children}
    </span>
  );
}
