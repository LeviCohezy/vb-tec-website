"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { BatteryCharging, Car, Info } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { asset } from "../lib/asset";
import { Button } from "./Button";
import { LeafMark } from "./Logo";

// Indicative assumptions for Flanders (2026). Tweak here.
const PRICE = 0.32; // €/kWh bought from the grid
const INJECTION = 0.04; // €/kWh fed back
const COST_PER_KWP = 1250; // € incl. install, 6% VAT
const COST_PER_BATTERY_KWH = 480;
const BATTERY_FIXED = 900;
const EV_KWH = 2500;
const CO2_PER_KWH = 0.16; // kg
const YEARS = 20;

const roofs = [
  { key: "zuid", label: "Zuid", yield: 950 },
  { key: "ow", label: "Oost-West", yield: 830 },
  { key: "plat", label: "Plat dak", yield: 880 },
] as const;

const eur = (n: number) => n.toLocaleString("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

function useAnimatedNumber(value: number) {
  const mv = useMotionValue(value);
  const [v, setV] = useState(value);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    const u = mv.on("change", setV);
    return () => {
      c.stop();
      u();
    };
  }, [value, mv]);
  return v;
}

function Toggle({ on, onChange, icon, label }: { on: boolean; onChange: (v: boolean) => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-pressed={on}
      className={`flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition-all duration-300 ${
        on ? "border-lilac bg-lilac text-deep" : "border-white/15 bg-white/5 text-white/80 hover:border-white/30"
      }`}
    >
      {icon}
      <span className="flex-1">{label}</span>
      <span className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-deep" : "bg-white/20"}`}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-all duration-300 ${on ? "left-[18px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export function Calculator() {
  const [usage, setUsage] = useState(4000);
  const [roof, setRoof] = useState<(typeof roofs)[number]["key"]>("zuid");
  const [battery, setBattery] = useState(true);
  const [ev, setEv] = useState(false);

  const r = useMemo(() => {
    const y = roofs.find((x) => x.key === roof)!.yield;
    const consumption = usage + (ev ? EV_KWH : 0);
    const kwp = Math.min(14, Math.max(2, Math.round((consumption / y) * 10) / 10));
    const production = kwp * y;
    const selfFraction = Math.min(0.82, 0.34 + (ev ? 0.1 : 0) + (battery ? 0.32 : 0));
    const selfUsed = Math.min(production * selfFraction, consumption);
    const injected = production - selfUsed;
    const batteryKwh = battery ? Math.min(15, Math.max(5, Math.round((consumption / 1000) * 1.4))) : 0;
    const investment = kwp * COST_PER_KWP + (battery ? batteryKwh * COST_PER_BATTERY_KWH + BATTERY_FIXED : 0);
    const savings = selfUsed * PRICE + injected * INJECTION;
    const payback = investment / savings;
    const cumulative = Array.from({ length: YEARS + 1 }, (_, i) => savings * i * (1 + 0.015 * i) - investment);
    return { kwp, production, batteryKwh, investment, savings, payback, cumulative, net: cumulative[YEARS], co2: (production * CO2_PER_KWH * YEARS) / 1000 };
  }, [usage, roof, battery, ev]);

  const savings = useAnimatedNumber(r.savings);
  const net = useAnimatedNumber(r.net);
  const fill = ((usage - 1500) / (12000 - 1500)) * 100;
  const min = Math.min(...r.cumulative);
  const max = Math.max(...r.cumulative);
  const zeroY = (max / (max - min)) * 100;

  return (
    <section id="calculator" className="scroll-mt-16 px-2 md:px-3">
      <div className="grain relative overflow-hidden rounded-[28px] bg-forest py-20 text-white md:rounded-[40px] md:py-28">
        <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-lilac/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-[420px] rounded-full bg-mint/10 blur-[100px]" />

        <div className="container-x relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-lilac" /> Besparingscalculator
              </span>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]">
                Hoeveel bespaar <span className="text-lilac">jij</span>?
              </h2>
            </div>
            <p className="max-w-sm text-white/70">Een eerste indicatie in 20 seconden. Onze ingenieur maakt nadien een exacte berekening op basis van je echte meterdata.</p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.25fr]">
            {/* Inputs */}
            <div className="rounded-[28px] bg-deep/50 p-6 ring-1 ring-white/10 backdrop-blur md:p-8">
              <div className="flex items-baseline justify-between">
                <label htmlFor="usage" className="text-sm text-white/70">
                  Jaarlijks stroomverbruik
                </label>
                <span className="font-display text-2xl font-semibold tabular-nums">
                  {usage.toLocaleString("nl-BE")} <span className="text-sm text-white/60">kWh</span>
                </span>
              </div>
              <input
                id="usage"
                type="range"
                min={1500}
                max={12000}
                step={100}
                value={usage}
                onChange={(e) => setUsage(+e.target.value)}
                style={{ ["--fill" as string]: `${fill}%` }}
                className="mt-5 w-full"
              />
              <div className="mt-2 flex justify-between text-xs text-white/40">
                <span>Appartement</span>
                <span>Gemiddeld gezin</span>
                <span>Groot verbruik</span>
              </div>

              <p className="mt-9 text-sm text-white/70">Oriëntatie van je dak</p>
              <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-white/5 p-1.5">
                {roofs.map((x) => (
                  <button
                    key={x.key}
                    type="button"
                    onClick={() => setRoof(x.key)}
                    className={`relative rounded-xl py-2.5 text-sm transition-colors ${roof === x.key ? "text-deep" : "text-white/75 hover:text-white"}`}
                  >
                    {roof === x.key && <motion.span layoutId="roof" className="absolute inset-0 rounded-xl bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{x.label}</span>
                  </button>
                ))}
              </div>

              <p className="mt-9 text-sm text-white/70">Extra’s</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Toggle on={battery} onChange={setBattery} icon={<BatteryCharging className="size-5" />} label="Thuisbatterij" />
                <Toggle on={ev} onChange={setEv} icon={<Car className="size-5" />} label="Elektrische wagen" />
              </div>

              <div className="mt-9 grid grid-cols-3 gap-2 border-t border-white/10 pt-6 text-center">
                <div>
                  <p className="font-display text-xl font-semibold">{r.kwp.toLocaleString("nl-BE")} kWp</p>
                  <p className="text-xs text-white/55">panelen (± {Math.round((r.kwp * 1000) / 430)} st.)</p>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold">{battery ? `${r.batteryKwh} kWh` : "—"}</p>
                  <p className="text-xs text-white/55">batterij</p>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold">{eur(r.investment)}</p>
                  <p className="text-xs text-white/55">investering</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col rounded-[28px] bg-paper p-6 text-ink md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted">Geschatte besparing per jaar</p>
                  <p className="mt-1 font-display text-[clamp(3rem,6vw,5rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums">{eur(savings)}</p>
                </div>
                <LeafMark className="size-10" />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  [`${r.payback.toLocaleString("nl-BE", { maximumFractionDigits: 1 })} jaar`, "terugverdientijd"],
                  [eur(net), `netto winst na ${YEARS} jaar`],
                  [`${r.co2.toLocaleString("nl-BE", { maximumFractionDigits: 1 })} ton`, `CO₂ vermeden (${YEARS} j)`],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-2xl bg-cream p-4">
                    <p className="font-display text-lg font-semibold tracking-tight tabular-nums md:text-2xl">{v}</p>
                    <p className="mt-1 text-xs text-muted">{l}</p>
                  </div>
                ))}
              </div>

              {/* Cumulative cash flow */}
              <div className="mt-8 flex-1">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>Cumulatieve cashflow</span>
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#e0795f]" />investering</span>
                    <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald" />winst</span>
                  </span>
                </div>
                <div className="relative mt-3 flex h-40 items-stretch gap-[3px]">
                  <span className="absolute inset-x-0 h-px bg-ink/15" style={{ top: `${zeroY}%` }} />
                  {r.cumulative.map((v, i) => {
                    const h = (Math.abs(v) / (max - min)) * 100;
                    return (
                      <div key={i} className="relative flex-1">
                        <motion.span
                          className={`absolute inset-x-0 rounded-[3px] ${v >= 0 ? "bg-emerald" : "bg-[#e0795f]"}`}
                          initial={false}
                          animate={v >= 0 ? { top: `${zeroY - h}%`, height: `${h}%` } : { top: `${zeroY}%`, height: `${h}%` }}
                          transition={{ duration: 0.6, delay: i * 0.012, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-muted">
                  <span>Jaar 0</span>
                  <span>Jaar 10</span>
                  <span>Jaar 20</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center">
                <p className="flex max-w-xs items-start gap-2 text-xs text-muted">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  Indicatief. Stroomprijs €0,32/kWh, injectie €0,04/kWh, 1,5% jaarlijkse prijsstijging, 6% btw.
                </p>
                <Button href={asset("/#contact")} variant="dark">
                  Exacte berekening
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
