/** VBTEC leaf mark: large radius on top-left and bottom-right, tight on the other corners. */
export function LeafMark({ className = "", color = "var(--color-lilac)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M17 2 H35 Q38 2 38 5 V23 Q38 38 23 38 H5 Q2 38 2 35 V17 Q2 2 17 2 Z"
        fill={color}
        transform="skewX(-6) translate(2 0)"
      />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LeafMark className="h-[1.15em] w-[1.15em]" />
      <span
        className={`font-display text-[1.35em] leading-none font-extrabold tracking-[-0.03em] ${
          tone === "light" ? "text-white" : "text-deep"
        }`}
      >
        VBTEC
      </span>
    </span>
  );
}
