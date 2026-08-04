"use client";

import { useEffect, useRef, useState } from "react";
import { LENSES } from "../../../content/lenses";

/**
 * Renders as six native <details> elements, each open by default — so with
 * JS disabled every lens is fully expanded and readable, no interaction
 * required. Once mounted, JS collapses all but the first for a cleaner
 * single-open accordion feel, without touching the underlying semantics:
 * <details>/<summary> stay keyboard- and screen-reader-native throughout.
 */
export function SixLensExplorer() {
  const [enhanced, setEnhanced] = useState(false);
  const [openId, setOpenId] = useState<string>(LENSES[0].id);
  const detailsRefs = useRef<Record<string, HTMLDetailsElement | null>>({});

  useEffect(() => {
    setEnhanced(true);
  }, []);

  function handleToggle(id: string, el: HTMLDetailsElement) {
    if (!enhanced) return;
    if (el.open) setOpenId(id);
  }

  return (
    <div className="divide-y divide-surface-border border-y border-surface-border">
      {LENSES.map((lens) => {
        const isOpen = enhanced ? openId === lens.id : true;
        return (
          <details
            key={lens.id}
            ref={(el) => {
              detailsRefs.current[lens.id] = el;
            }}
            open={isOpen}
            onToggle={(e) => handleToggle(lens.id, e.currentTarget)}
            className="group py-2"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 py-3 marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-surface-border text-body font-heading font-semibold text-text-muted group-open:border-accent group-open:text-accent"
              >
                {lens.number}
              </span>
              <span className="flex-1">
                <span className="block text-body-lg font-heading font-semibold">
                  {lens.name}
                </span>
                <span className="block text-small text-text-muted">
                  {lens.question}
                </span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="shrink-0 text-text-muted transition-transform duration-150 motion-reduce:transition-none group-open:rotate-180"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>

            <div className="grid gap-6 py-4 pl-0 md:grid-cols-2 md:pl-[3.25rem]">
              <div>
                <p className="text-small font-medium uppercase tracking-wide text-text-muted">
                  What's checked
                </p>
                <ul className="mt-2 flex flex-col gap-1.5 text-body text-text">
                  {lens.checks.map((check) => (
                    <li key={check} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent">
                        &#8226;
                      </span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-small font-medium uppercase tracking-wide text-text-muted">
                    Why it matters
                  </p>
                  <p className="mt-2 text-body text-text-muted">
                    {lens.whyItMatters}
                  </p>
                </div>

                <div className="rounded-md border border-surface-border bg-surface-alt p-4">
                  <p className="text-small font-medium uppercase tracking-wide text-text-muted">
                    Example finding &middot; {lens.example.vertical}
                  </p>
                  <p className="mt-2 text-body text-text">
                    {lens.example.finding}
                  </p>
                </div>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
