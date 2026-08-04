import type { FaqItem } from "../../../content/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-surface-border border-y border-surface-border">
      {items.map((item) => (
        <details key={item.question} className="group py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-body-lg font-medium marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]">
            <span>{item.question}</span>
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
          <p className="pb-4 text-body text-text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
