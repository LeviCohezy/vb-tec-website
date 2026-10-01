import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "lilac" | "dark" | "light" | "outline";

const styles: Record<Variant, { pill: string; dot: string }> = {
  lilac: { pill: "bg-lilac text-deep", dot: "bg-deep text-lilac" },
  dark: { pill: "bg-deep text-white", dot: "bg-lilac text-deep" },
  light: { pill: "bg-white text-deep", dot: "bg-deep text-white" },
  outline: { pill: "border border-current text-current", dot: "bg-current/10" },
};

/** Pill CTA with a round arrow badge that rotates on hover. */
export function Button({ href, children, variant = "lilac", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  const s = styles[variant];
  return (
    <Magnetic className={className}>
      <a
        href={href}
        className={`group inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6 text-[0.95rem] font-medium transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgb(1_40_33/0.45)] ${s.pill}`}
      >
        {children}
        <span className={`grid size-10 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45 ${s.dot}`}>
          <ArrowUpRight className="size-[18px]" />
        </span>
      </a>
    </Magnetic>
  );
}

export function Tag({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium ${
        tone === "light" ? "border-white/25 text-white/85" : "border-ink/15 text-ink/75"
      }`}
    >
      <span className={`size-1.5 rounded-full ${tone === "light" ? "bg-lilac" : "bg-emerald"}`} />
      {children}
    </span>
  );
}
