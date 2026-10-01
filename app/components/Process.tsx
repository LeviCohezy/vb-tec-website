"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { asset } from "../lib/asset";
import { process } from "../lib/content";
import { Button, Tag } from "./Button";
import { LeafMark } from "./Logo";
import { Reveal, WordsReveal } from "./Reveal";

export function Process() {
  return (
    <section className="container-x py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Tag>De ingenieursaanpak</Tag>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]">
            <WordsReveal text="Eerst rekenen." />
            <br />
            <span className="text-emerald">
              <WordsReveal text="Dan pas bouwen." delay={0.15} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Een ingenieur volgt je project van de eerste meting tot de keuring. Geen verkoper met een standaardpakket, maar een technisch onderbouwd plan.
            </p>
            <div className="mt-8">
              <Button href={asset("/#contact")} variant="dark">
                Plan je gratis studie
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="relative mt-12 hidden overflow-hidden rounded-[28px] lg:block">
            <img src={asset("/images/consult.jpg")} alt="Energie-adviseur bespreekt een dakplan met een koppel aan de keukentafel" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
        </div>

        <ol className="relative">
          {process.map((p, i) => (
            <Step key={p.n} step={p} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ step, index }: { step: (typeof process)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const dark = index === 3;

  return (
    <motion.li ref={ref} style={{ scale, opacity }} className="mb-4 origin-top last:mb-0">
      <div className={`relative overflow-hidden rounded-[28px] p-7 md:p-10 ${dark ? "bg-deep text-white" : "bg-paper"}`}>
        <div className="flex items-start justify-between gap-6">
          <span className={`font-display text-6xl font-semibold tracking-tighter md:text-7xl ${dark ? "text-lilac" : "text-sand"}`}>{step.n}</span>
          <LeafMark className="size-8" color={dark ? "var(--color-lilac)" : "var(--color-mint)"} />
        </div>
        <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">{step.title}</h3>
        <p className={`mt-3 max-w-md text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{step.body}</p>
        {index === 1 && (
          <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-muted">
            {["Schaduwanalyse", "Warmteverlies", "Kwartierdata"].map((t) => (
              <span key={t} className="rounded-full bg-cream px-3 py-2">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
}
