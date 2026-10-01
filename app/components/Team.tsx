"use client";

import { motion } from "motion/react";
import { asset } from "../lib/asset";
import { team } from "../lib/content";
import { Tag } from "./Button";
import { LeafMark } from "./Logo";
import { Reveal, WordsReveal } from "./Reveal";

const tints = ["bg-lilac", "bg-mint", "bg-sand", "bg-lilac-soft"];

export function Team() {
  return (
    <section id="team" className="container-x scroll-mt-24 py-24 md:py-36">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div>
          <Tag>Het team</Tag>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]">
            <WordsReveal text="Ingenieurs en vakmensen" />
            <span className="text-muted/60">
              {" "}
              <WordsReveal text="die je bij naam kent." delay={0.15} />
            </span>
          </h2>
        </div>
        <Reveal className="relative overflow-hidden rounded-[28px]">
          <img src={asset("/images/installers.jpg")} alt="Twee VBTEC-installateurs monteren zonnepanelen op een pannendak" className="aspect-[16/8] w-full object-cover" />
          <div className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm text-white">Eigen installatieploegen — geen onderaannemers</div>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            {/* Portrait placeholder — replace with a real team photo */}
            <div className={`relative aspect-[4/5] overflow-hidden rounded-[24px] ${tints[i]}`}>
              <LeafMark className="absolute -right-6 -bottom-6 size-48 opacity-60 transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:-rotate-6" color="rgb(255 255 255 / 0.55)" />
              <span className="absolute top-5 left-5 font-display text-5xl font-semibold tracking-tighter text-deep/80">{m.initials}</span>
              <span className="absolute right-4 bottom-4 left-4 rounded-full bg-white/70 px-3 py-1.5 text-center text-[11px] text-deep/70 backdrop-blur">Foto volgt</span>
            </div>
            <p className="mt-4 font-display text-lg font-semibold tracking-tight">{m.name}</p>
            <p className="text-sm text-muted">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
