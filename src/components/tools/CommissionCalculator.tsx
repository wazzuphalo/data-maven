"use client";

import { useMemo, useState } from "react";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CommissionCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState(300);
  const [avgTicket, setAvgTicket] = useState(32);
  const [commissionRate, setCommissionRate] = useState(28);

  const { monthlyCommission, annualCommission } = useMemo(() => {
    const monthlyRevenue = monthlyOrders * avgTicket;
    const monthly = monthlyRevenue * (commissionRate / 100);
    return { monthlyCommission: monthly, annualCommission: monthly * 12 };
  }, [monthlyOrders, avgTicket, commissionRate]);

  return (
    <div className="rounded-lg border border-surface-border bg-surface p-6 md:p-8">
      <noscript>
        <p className="mb-4 text-small text-text-muted">
          The numbers below update live with JavaScript enabled. Without it,
          you&apos;re seeing the result for the example figures shown in the
          fields.
        </p>
      </noscript>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="cc-orders" className="text-body font-medium">
            Monthly third-party orders
          </label>
          <input
            id="cc-orders"
            type="number"
            min={0}
            value={monthlyOrders}
            onChange={(e) => setMonthlyOrders(Number(e.target.value) || 0)}
            className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cc-ticket" className="text-body font-medium">
            Average ticket ($)
          </label>
          <input
            id="cc-ticket"
            type="number"
            min={0}
            step={0.5}
            value={avgTicket}
            onChange={(e) => setAvgTicket(Number(e.target.value) || 0)}
            className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cc-rate" className="text-body font-medium">
            Commission rate (%)
          </label>
          <input
            id="cc-rate"
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={commissionRate}
            onChange={(e) => setCommissionRate(Number(e.target.value) || 0)}
            className="rounded-md border border-surface-border bg-surface px-3 py-2 text-body"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-surface-border pt-6 sm:grid-cols-2">
        <div>
          <p className="text-small font-medium uppercase tracking-wide text-text-muted">
            Monthly commission paid
          </p>
          <p className="mt-1 text-h1 font-heading font-semibold text-accent" aria-live="polite">
            {formatCurrency(monthlyCommission)}
          </p>
        </div>
        <div>
          <p className="text-small font-medium uppercase tracking-wide text-text-muted">
            Annual commission paid
          </p>
          <p className="mt-1 text-h1 font-heading font-semibold" aria-live="polite">
            {formatCurrency(annualCommission)}
          </p>
        </div>
      </div>

      <p className="mt-6 text-small text-text-muted">
        Rough estimate based on the numbers you enter — not a substitute for
        your actual statements. Useful for seeing, in dollars, what a
        delivery-app commission rate costs over a year.
      </p>
    </div>
  );
}
