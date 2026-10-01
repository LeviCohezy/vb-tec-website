"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { asset } from "../lib/asset";
import { faqGroups } from "../lib/content";
import { Button, Tag } from "./Button";
import { Reveal, WordsReveal } from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function FAQ() {
  const key = faqGroups.slice(0, 3);
  const rest = faqGroups.slice(3);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-x py-24 md:py-36">
      <div className="text-center">
        <Tag>Vragen & antwoorden</Tag>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]">
          <WordsReveal text="Wat is het, waarom heb je het nodig" />
          <span className="text-muted/60">
            {" "}
            <WordsReveal text="en hoe bespaar je erop?" delay={0.2} />
          </span>
        </h2>
      </div>

      {/* The three questions every customer asks, as headings with a direct answer */}
      <div className="mt-16 grid gap-3 md:grid-cols-3">
        {key.map((q, i) => (
          <Reveal key={q.question} delay={i * 0.1} className={`flex flex-col rounded-[28px] p-7 md:p-8 ${i === 1 ? "bg-deep text-white" : i === 2 ? "bg-lilac text-deep" : "bg-paper"}`}>
            <span className={`font-display text-sm ${i === 1 ? "text-lilac" : "text-emerald"}`}>Vraag 0{i + 1}</span>
            <h3 className="mt-4 font-display text-2xl leading-tight font-semibold tracking-tight md:text-[1.7rem]">{q.question}</h3>
            <p className={`mt-4 leading-relaxed ${i === 1 ? "text-white/70" : i === 2 ? "text-deep/75" : "text-muted"}`}>{q.answer}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <h3 className="font-display text-3xl font-semibold tracking-tight">Nog vragen?</h3>
          <p className="mt-3 max-w-sm text-muted">Onze ingenieurs beantwoorden ze graag persoonlijk — vrijblijvend en zonder verkooppraatje.</p>
          <div className="mt-6">
            <Button href={asset("/#contact")} variant="dark">
              Stel je vraag
            </Button>
          </div>
        </Reveal>
        <ul className="border-t border-ink/10">
          {rest.map((q, i) => {
            const on = open === i;
            return (
              <li key={q.question} className="border-b border-ink/10">
                <button onClick={() => setOpen(on ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={on}>
                  <span className="font-display text-xl font-medium tracking-tight">{q.question}</span>
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${on ? "rotate-45 bg-deep text-white" : "bg-sand text-ink"}`}>
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted">{q.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
