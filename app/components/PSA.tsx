"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "motion/react";
import { AlertTriangle, Check, TrendingUp, X } from "lucide-react";
import { useRef, useState } from "react";
import { asset } from "../lib/asset";
import { psa } from "../lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

/* ---------- Visuals per stage ---------- */

function ProblemVisual() {
  const bars = [42, 46, 44, 58, 71, 64, 78, 92, 86, 100];
  return (
    <div className="relative h-full overflow-hidden rounded-[28px]">
      <img src={asset("/images/meter.jpg")} alt="Digitale meter in een meterkast" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent" />
      <div className="glass absolute inset-x-5 bottom-5 rounded-3xl p-5 text-white md:inset-x-6 md:bottom-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/75">Gemiddelde energiefactuur</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ffb4a2] px-2 py-0.5 text-xs font-semibold text-deep">
            <TrendingUp className="size-3" /> stijgend
          </span>
        </div>
        <div className="mt-4 flex h-24 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 rounded-md ${i > 6 ? "bg-[#ffb4a2]" : "bg-white/35"}`}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: i * 0.05, ease }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-white/50">
          <span>2017</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}

function AgitateVisual() {
  const errors = [
    { t: "Batterij te groot", d: "Raakt 8 maanden per jaar nooit vol — €3.200 te veel betaald." },
    { t: "Warmtepomp te klein", d: "Elektrische bijverwarming in de winter, factuur +40%." },
    { t: "Omvormer niet compatibel", d: "Laadpaal en batterij spreken niet met elkaar." },
    { t: "Keuring afgekeurd", d: "Niet AREI-conform: herwerken op eigen kosten." },
  ];
  return (
    <div className="relative flex h-full flex-col justify-center gap-3 rounded-[28px] bg-white/[0.04] p-5 ring-1 ring-white/10 md:p-8">
      {errors.map((e, i) => (
        <motion.div
          key={e.t}
          initial={{ opacity: 0, x: 40, rotate: i % 2 ? 1.5 : -1.5 }}
          animate={{ opacity: 1, x: 0, rotate: i % 2 ? 0.6 : -0.6 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease }}
          className="flex items-start gap-4 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 backdrop-blur"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#ffb4a2]/15 text-[#ffb4a2]">
            <X className="size-4" />
          </span>
          <div>
            <p className="font-medium text-white">{e.t}</p>
            <p className="text-sm text-white/60">{e.d}</p>
          </div>
        </motion.div>
      ))}
      <p className="mt-2 flex items-center gap-2 text-xs text-white/45">
        <AlertTriangle className="size-3.5" /> Situaties die we wekelijks tegenkomen bij tweede opinies.
      </p>
    </div>
  );
}

function SolutionVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[28px]">
      <img src={asset("/images/engineer.jpg")} alt="VBTEC-ingenieur controleert zonnepanelen met een tablet" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="absolute inset-x-5 bottom-5 rounded-3xl bg-paper p-5 md:inset-x-6 md:bottom-6"
      >
        <p className="eyebrow text-emerald">Rendementsrapport</p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[
            ["8,4 kWp", "vermogen"],
            ["7,5 kWh", "batterij"],
            ["6,8 jaar", "terugverdiend"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">{v}</p>
              <p className="text-xs text-muted">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-3 text-sm text-forest">
          <span className="grid size-5 place-items-center rounded-full bg-mint">
            <Check className="size-3" />
          </span>
          Goedgekeurd door ir. — studie-ingenieur VBTEC
        </div>
      </motion.div>
    </div>
  );
}

const visuals = [ProblemVisual, AgitateVisual, SolutionVisual];

const themes = [
  { bg: "#ece7da", fg: "text-ink", sub: "text-muted", tag: "bg-ink/5 text-ink", dot: "bg-[#e0795f]" },
  { bg: "#012821", fg: "text-white", sub: "text-white/65", tag: "bg-white/10 text-white", dot: "bg-[#ffb4a2]" },
  { bg: "#0c5546", fg: "text-white", sub: "text-white/70", tag: "bg-lilac text-deep", dot: "bg-lilac" },
];

function StageText({ i, compact = false }: { i: number; compact?: boolean }) {
  const s = psa[i];
  const t = themes[i];
  return (
    <div>
      <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium ${t.tag}`}>
        <span className={`size-1.5 rounded-full ${t.dot}`} />
        {s.tag}
      </span>
      <h2 className={`mt-6 font-display ${compact ? "text-3xl" : "text-[clamp(2rem,3.6vw,3.5rem)]"} leading-[1.04] font-semibold tracking-[-0.035em] ${t.fg}`}>
        {s.title}
      </h2>
      <p className={`mt-5 max-w-lg text-lg leading-relaxed ${t.sub}`}>{s.body}</p>
      <ul className="mt-7 space-y-3">
        {s.points.map((p) => (
          <li key={p} className={`flex items-center gap-3 ${t.fg}`}>
            <span className={`grid size-6 shrink-0 place-items-center rounded-full ${i === 2 ? "bg-lilac text-deep" : i === 1 ? "bg-white/10 text-[#ffb4a2]" : "bg-ink/10 text-ink"}`}>
              {i === 2 ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Problem → Agitate → Solution, pinned to the viewport and advanced by scroll on desktop. */
export function PSA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stage, setStage] = useState(0);
  const bg = useTransform(scrollYProgress, [0, 0.3, 0.38, 0.63, 0.71, 1], [themes[0].bg, themes[0].bg, themes[1].bg, themes[1].bg, themes[2].bg, themes[2].bg]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setStage(v < 0.34 ? 0 : v < 0.67 ? 1 : 2));

  const Visual = visuals[stage];

  return (
    <section id="aanpak" className="scroll-mt-20">
      {/* Desktop: pinned, scroll-driven */}
      <div ref={ref} className="relative hidden h-[330vh] md:block">
        <motion.div style={{ backgroundColor: bg }} className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-x grid h-[min(78vh,720px)] grid-cols-[1fr_1.05fr] items-center gap-14">
            <div className="flex h-full flex-col justify-between py-4">
              <div className={`flex items-center gap-4 text-sm ${themes[stage].sub}`}>
                {psa.map((p, i) => (
                  <span key={p.tag} className={`font-display text-sm transition-opacity duration-500 ${i === stage ? "opacity-100" : "opacity-40"}`}>
                    0{i + 1}
                  </span>
                ))}
                <span className="relative h-px flex-1 bg-current/25">
                  <motion.span style={{ width: bar }} className="absolute inset-y-0 left-0 bg-current" />
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease }}
                >
                  <StageText i={stage} />
                </motion.div>
              </AnimatePresence>
              <p className={`text-sm ${themes[stage].sub}`}>{stage < 2 ? "Blijf scrollen ↓" : "Zo pakken wij het aan."}</p>
            </div>
            <div className="h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden">
        {psa.map((_, i) => {
          const V = visuals[i];
          return (
            <div key={i} style={{ backgroundColor: themes[i].bg }} className="px-5 py-16">
              <StageText i={i} compact />
              <div className="mt-10 h-[440px]">
                <V />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
