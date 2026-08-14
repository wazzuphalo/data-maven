export function PrototypeBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border-2 border-dashed border-surface-border bg-surface-alt p-4">
      <span className="mt-0.5 inline-flex w-fit shrink-0 items-center rounded-full bg-ink-100 px-3 py-1 text-small font-medium uppercase tracking-wide text-text-muted">
        Prototype
      </span>
      <p className="text-body text-text-muted">{children}</p>
    </div>
  );
}
