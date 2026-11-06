export function SectionTitle({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-8 md:mb-12">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {kicker}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight md:text-[32px]">
        {title}
      </h2>
    </div>
  );
}
