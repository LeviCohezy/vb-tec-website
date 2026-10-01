"use client";

import { motion, useInView, useMotionValue, useScroll, useTransform, animate, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "../lib/content";
import { Tag } from "./Button";

const statement =
  "Wij verkopen geen panelen. Wij berekenen wat jouw woning écht nodig heeft — en installeren enkel wat zichzelf terugbetaalt. Elke keuze gestaafd door een ingenieur.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const highlight = /ingenieur|écht|terugbetaalt/.test(word);
  return (
    <motion.span style={{ opacity }} className={highlight ? "text-emerald" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

function Counter({ value, decimals = 0, suffix }: { value: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    const unsub = mv.on("change", (v) => setDisplay(v.toLocaleString("nl-BE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      <span className="text-emerald">{suffix}</span>
    </span>
  );
}

export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  return (
    <section className="container-x py-24 md:py-36">
      <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
        <div>
          <Tag>Waarom VBTEC</Tag>
        </div>
        <div>
          <p ref={ref} className="font-display text-[clamp(1.75rem,3.8vw,3.4rem)] leading-[1.12] font-medium tracking-[-0.03em] text-ink">
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-ink/10 pt-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="pr-4">
                <p className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
