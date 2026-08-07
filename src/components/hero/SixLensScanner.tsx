"use client";

import { useEffect, useRef, useState } from "react";
import { LENSES } from "../../../content/lenses";

const CX = 200;
const CY = 200;
const R = 150;
const LABEL_R = 150;
const GAP_DEG = 8;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
}

// Round every derived coordinate to 2 decimals. Math.sin/cos are not
// guaranteed bit-identical across engines, so the raw floats differ in the
// last digit between the Node (SSR) and browser (hydration) renders —
// rounding to a fixed precision makes both sides serialize identically.
const r2 = (n: number) => Math.round(n * 100) / 100;

const SEGMENTS = LENSES.map((lens, i) => {
  const a0 = -90 + i * 60 + GAP_DEG / 2;
  const a1 = -90 + (i + 1) * 60 - GAP_DEG / 2;
  const [x0, y0] = polar(CX, CY, R, a0);
  const [x1, y1] = polar(CX, CY, R, a1);
  const [lx, ly] = polar(CX, CY, LABEL_R, (a0 + a1) / 2);
  const arcLen = (R * (a1 - a0) * Math.PI) / 180;
  return {
    id: lens.id,
    number: lens.number,
    name: lens.name,
    d: `M ${r2(x0)} ${r2(y0)} A ${R} ${R} 0 0 1 ${r2(x1)} ${r2(y1)}`,
    labelX: r2(lx),
    labelY: r2(ly),
    arcLen: r2(arcLen),
  };
});

export function SixLensScanner() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMove(e: MouseEvent) {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el!.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
        el!.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
      });
    }
    function onLeave() {
      el!.style.setProperty("--rx", "0deg");
      el!.style.setProperty("--ry", "0deg");
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const activeLens = active !== null ? SEGMENTS.find((s) => s.number === active) : null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="scanner-wrap relative mx-auto w-full max-w-[440px] select-none [perspective:900px]"
    >
      <div className="scanner-tilt">
        <svg viewBox="0 0 400 400" className="h-auto w-full overflow-visible">
          <defs>
            <radialGradient id="scanner-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
              <stop offset="70%" stopColor="var(--color-accent)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="scanner-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Faint radar guide rings */}
          {[70, 100, 130].map((r) => (
            <circle
              key={r}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="var(--color-surface-border)"
              strokeWidth="1"
              strokeDasharray="2 5"
              opacity="0.7"
            />
          ))}

          {/* Center glow + core */}
          <circle cx={CX} cy={CY} r="120" fill="url(#scanner-core)" className="scanner-glow" />
          <circle
            cx={CX}
            cy={CY}
            r="46"
            fill="var(--color-surface)"
            stroke="var(--color-surface-border)"
            strokeWidth="1.5"
          />
          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            className="fill-[var(--color-accent)] font-heading"
            style={{ fontSize: "26px", fontWeight: 700 }}
          >
            6
          </text>
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            className="fill-[var(--color-text-muted)]"
            style={{ fontSize: "9px", letterSpacing: "0.12em" }}
          >
            LENSES
          </text>

          {/* Rotating radar sweep (entrance + slow ambient; stops under reduced-motion) */}
          <g className="scanner-sweep" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <path
              d={`M ${CX} ${CY} L ${CX} ${CY - 148} A 148 148 0 0 1 ${polar(CX, CY, 148, -46)[0].toFixed(
                2
              )} ${polar(CX, CY, 148, -46)[1].toFixed(2)} Z`}
              fill="url(#scanner-sweep)"
              opacity="0.55"
            />
          </g>

          {/* The six lens segments */}
          {SEGMENTS.map((seg, i) => (
            <g key={seg.id}>
              <path
                d={seg.d}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="16"
                strokeLinecap="round"
                className="scanner-seg"
                style={{
                  strokeDasharray: seg.arcLen,
                  strokeDashoffset: seg.arcLen,
                  animationDelay: `${0.15 + i * 0.13}s`,
                  opacity: active === null || active === seg.number ? 1 : 0.35,
                }}
                onMouseEnter={() => setActive(seg.number)}
                onMouseLeave={() => setActive(null)}
              />
              <circle
                cx={seg.labelX}
                cy={seg.labelY}
                r="13"
                fill="var(--color-surface)"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                className="scanner-label"
                style={{ animationDelay: `${0.35 + i * 0.13}s` }}
              />
              <text
                x={seg.labelX}
                y={seg.labelY + 4}
                textAnchor="middle"
                className="scanner-label fill-[var(--color-accent)] font-heading"
                style={{ fontSize: "12px", fontWeight: 600, animationDelay: `${0.35 + i * 0.13}s` }}
              >
                {seg.number}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Readout caption — meaningful, ties the visual to the methodology */}
      <p className="scanner-readout mt-2 text-center text-small text-text-muted">
        {activeLens ? activeLens.name : "A six-point digital presence diagnostic"}
      </p>
    </div>
  );
}
