"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { asset } from "../lib/asset";
import { LeafMark } from "./Logo";

export function FullImage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const clip = useTransform(scrollYProgress, (v) => {
    const t = Math.max(0, 1 - v / 0.35);
    return `inset(0 ${t * 6}% round ${t * 48}px)`;
  });

  return (
    <section ref={ref} className="relative">
      <motion.div style={{ clipPath: clip }} className="grain relative h-[88vh] min-h-[560px] overflow-hidden bg-deep">
        <motion.img
          style={{ y, scale: 1.25 }}
          src={asset("/images/aerial.svg")}
          alt="Luchtfoto van een Vlaamse woonwijk met zonnepanelen op de daken"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/50 via-deep/25 to-deep/75" />
        <div className="container-x relative flex h-full flex-col items-center justify-center text-center text-white">
          <LeafMark className="size-10" />
          <p className="mt-8 max-w-4xl font-display text-[clamp(2.2rem,5.6vw,5.2rem)] leading-[1] font-semibold tracking-[-0.045em]">
            Geen giswerk.
            <br />
            <span className="text-lilac">Enkel gestaafde keuzes.</span>
          </p>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Duizenden Vlaamse daken, elk met een eigen oriëntatie, verbruik en budget. Daarom begint elk VBTEC-project met een berekening — nooit met een catalogus.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {["AREI-conforme keuring", "Erkend installateur", "A-merken", "Premie-begeleiding"].map((t) => (
              <span key={t} className="glass rounded-full px-4 py-2 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
