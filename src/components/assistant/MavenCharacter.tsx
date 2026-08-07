/** The "maven" — a friendly magnifying glass. Inherits currentColor. */
export function MavenCharacter({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="13" cy="13" r="9" strokeWidth="2" />
      <line
        x1="19.6"
        y1="19.6"
        x2="27"
        y2="27"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path
        d="M10 15.4 Q13 17.8 16 15.4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
