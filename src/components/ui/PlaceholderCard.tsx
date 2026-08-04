export function PlaceholderCard({
  label,
  detail,
}: {
  label: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border-2 border-dashed border-surface-border bg-surface-alt p-6">
      <span className="inline-flex w-fit items-center rounded-full bg-ink-100 px-3 py-1 text-small font-medium uppercase tracking-wide text-text-muted">
        Placeholder — not a real result
      </span>
      <p className="text-body-lg font-heading font-semibold text-text">{label}</p>
      <p className="text-body text-text-muted">{detail}</p>
    </div>
  );
}
