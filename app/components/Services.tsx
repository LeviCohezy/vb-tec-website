"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { asset } from "../lib/asset";
import { services } from "../lib/content";
import { Tag } from "./Button";
import { serviceIcons } from "./icons";
import { Reveal, WordsReveal } from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section className="container-x py-24 md:py-36">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Tag>Onze oplossingen</Tag>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]">
            <WordsReveal text="Zes technieken." />
            <br />
            <span className="text-muted/60">
              <WordsReveal text="Eén geïntegreerd systeem." delay={0.15} />
            </span>
          </h2>
        </div>
        <Reveal className="max-w-sm text-muted">
          Elke techniek werkt beter samen met de andere. Wij ontwerpen je installatie als één geheel, zodat panelen, batterij, laadpaal en warmtepomp elkaar versterken.
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <ul className="border-t border-ink/10">
          {services.map((item, i) => {
            const Icon = serviceIcons[item.key];
            const on = i === active;
            return (
              <li key={item.key} id={`dienst-${item.key}`} className="scroll-mt-32 border-b border-ink/10">
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
                  aria-expanded={on}
                >
                  <span className={`text-sm tabular-nums transition-colors ${on ? "text-emerald" : "text-muted/60"}`}>0{i + 1}</span>
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl transition-colors duration-500 ${on ? "bg-deep text-lilac" : "bg-sand text-forest"}`}>
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className={`flex-1 font-display text-2xl font-semibold tracking-tight transition-colors md:text-3xl ${on ? "text-ink" : "text-ink/45 group-hover:text-ink/75"}`}>
                    {item.title}
                  </span>
                  <span className={`grid size-9 place-items-center rounded-full border transition-all duration-500 ${on ? "rotate-45 border-deep bg-deep text-white" : "border-ink/15 text-ink/50"}`}>
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-[4.6rem]">
                        <p className="max-w-md text-muted">{item.long}</p>
                        {/* Mobile image */}
                        <img src={asset(item.image)} alt={item.title} className="mt-5 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="relative hidden overflow-hidden rounded-[32px] bg-deep lg:block">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={s.key}
              src={asset(s.image)}
              alt={s.title}
              initial={{ opacity: 0, scale: 1.12, clipPath: "inset(0 0 0 100%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
              exit={{ opacity: 0.6 }}
              transition={{ duration: 0.9, ease }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="glass absolute bottom-6 left-6 flex items-end gap-6 rounded-3xl p-5 pr-7 text-white"
            >
              <div>
                <p className="font-display text-4xl font-semibold tracking-tight">{s.stat}</p>
                <p className="mt-1 text-sm text-white/75">{s.statLabel}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <a href={asset("/#contact")} className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-full bg-white py-2 pr-2 pl-4 text-sm font-medium text-deep transition-transform hover:scale-105">
            Advies over {s.title.toLowerCase()}
            <span className="grid size-8 place-items-center rounded-full bg-lilac">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
          <div className="aspect-[4/4.2]" />
        </div>
      </div>
    </section>
  );
}
