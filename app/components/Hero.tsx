"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ShieldCheck, Star } from "lucide-react";
import { useRef } from "react";
import { asset } from "../lib/asset";
import { services } from "../lib/content";
import { Button } from "./Button";
import { serviceIcons } from "./icons";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative px-2 pt-2 md:px-3 md:pt-3">
      <div className="grain relative isolate flex min-h-[640px] flex-col overflow-hidden rounded-[28px] bg-deep md:h-[calc(100svh-24px)] md:min-h-[720px] md:rounded-[36px]">
        {/* Parallax photo */}
        <motion.div className="absolute inset-0 -z-10" style={{ y: imgY, scale: imgScale }}>
          <img
            src={asset("/images/hero-house.jpg")}
            alt="Moderne Vlaamse woning met full-black zonnepanelen bij zonsondergang"
            className="size-full object-cover object-[60%_center]"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-deep/55 via-deep/10 to-deep/80" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep/70 via-deep/20 to-transparent" />

        <motion.div style={{ y: textY, opacity: fade }} className="container-x relative flex flex-1 flex-col justify-end pt-32 pb-10 md:justify-center md:pb-40">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="eyebrow mb-6 inline-flex items-center gap-2 text-white/80"
          >
            <ShieldCheck className="size-4 text-lilac" />
            Ingenieursbegeleiding staat op 1
          </motion.p>

          <h1 className="max-w-[15ch] font-display text-[clamp(2.7rem,7.4vw,6.6rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white">
            {["Energie die", "klopt. Tot op", "de laatste kWh."].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease }}
                >
                  {i === 2 ? (
                    <>
                      de laatste <span className="text-lilac">kWh.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            Zonnepanelen, thuisbatterijen, laadpalen en warmtepompen — berekend en gestaafd door een ingenieur. Zo investeer je slim en bespaar je écht.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href={asset("/#contact")}>Gratis energiestudie</Button>
            <Button href={asset("/#calculator")} variant="light">
              Bereken je besparing
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating glass cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="glass absolute top-32 right-8 hidden w-[270px] rounded-3xl p-5 text-white lg:block xl:right-14"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/75">Besparing na studie</p>
            <span className="rounded-full bg-lilac px-2 py-0.5 text-[11px] font-semibold text-deep">gestaafd</span>
          </div>
          <p className="mt-2 font-display text-4xl font-semibold tracking-tight">€1.480<span className="text-lg text-white/60"> /jaar</span></p>
          <div className="mt-4 flex h-16 items-end gap-1.5">
            {[28, 36, 44, 40, 58, 66, 74, 70, 86, 100].map((h, i) => (
              <motion.span
                key={i}
                className={`flex-1 rounded-md ${i > 6 ? "bg-lilac" : "bg-white/35"}`}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.9, delay: 1.3 + i * 0.05, ease }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-white/60">Voorbeeld: gezin, 4.500 kWh, panelen + batterij</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.3, ease }}
          className="glass absolute top-[330px] right-8 hidden items-center gap-3 rounded-full py-2 pr-5 pl-2 text-white lg:flex xl:right-14"
        >
          <div className="flex -space-x-2">
            {["KD", "PV", "SB"].map((i, n) => (
              <span key={i} className={`grid size-9 place-items-center rounded-full border-2 border-white/40 text-[11px] font-semibold ${["bg-lilac text-deep", "bg-mint text-deep", "bg-white text-deep"][n]}`}>
                {i}
              </span>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-0.5 text-lilac">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
              <span className="ml-1.5 text-sm font-semibold text-white">4,9</span>
            </div>
            <p className="text-xs text-white/70">op basis van 180+ reviews</p>
          </div>
        </motion.div>

        <a href="#diensten" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/70 md:flex">
          <span className="eyebrow">Scroll</span>
          <ArrowDown className="size-4 animate-bounce" />
        </a>
      </div>

      {/* Services strip — all six shown immediately */}
      <div id="diensten" className="container-x relative z-10 -mt-10 scroll-mt-28 md:-mt-24">
        <div className="grid grid-cols-2 gap-2 rounded-[28px] bg-paper p-2 shadow-[0_30px_80px_-30px_rgb(1_40_33/0.35)] md:grid-cols-3 md:gap-2.5 md:p-2.5 xl:grid-cols-6">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.key];
            return (
              <motion.a
                key={s.key}
                href={`#dienst-${s.key}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + i * 0.07, ease }}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-[22px] bg-cream p-4 transition-colors duration-500 hover:bg-deep md:p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-white text-forest transition-colors duration-500 group-hover:bg-lilac group-hover:text-deep">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="text-xs text-muted transition-colors group-hover:text-white/50">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink transition-colors duration-500 group-hover:text-white">{s.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted transition-colors duration-500 group-hover:text-white/70">{s.short}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
