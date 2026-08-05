"use client";

import { useState } from "react";

/**
 * Ships disabled until real before/after assets exist — see ASSETS-NEEDED.md.
 * The slider interaction itself is built and functional so it's a drop-in
 * once real images are available; only the `disabled` prop needs removing.
 */
export function BeforeAfterSlider({
  label,
  disabled = true,
}: {
  label: string;
  disabled?: boolean;
}) {
  const [position, setPosition] = useState(50);

  if (disabled) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-surface-border bg-surface-alt p-6 text-center">
        <span className="inline-flex w-fit items-center rounded-full bg-ink-100 px-3 py-1 text-small font-medium uppercase tracking-wide text-text-muted">
          Case study coming
        </span>
        <p className="text-body text-text-muted">{label}</p>
        <p className="text-small text-text-muted">
          Before/after comparison will go here once a real engagement
          completes. 1200&times;800px, same viewport for both frames.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ba-slider" className="text-small text-text-muted">
        {label} — drag to compare
      </label>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-surface-border">
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-accent"
          style={{ width: `${position}%` }}
        >
          <div className="flex h-full w-full items-center justify-center bg-surface-alt text-small text-text-muted">
            Before
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center bg-surface text-small text-text-muted">
          After
        </div>
      </div>
      <input
        id="ba-slider"
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="accent-(--color-accent)"
      />
    </div>
  );
}
