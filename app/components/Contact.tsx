"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { services, site } from "../lib/content";
import { LeafMark } from "./Logo";
import { Magnetic } from "./Magnetic";

/** No backend: the form opens a pre-filled e-mail. */
export function Contact() {
  const [picked, setPicked] = useState<string[]>(["Zonnepanelen"]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Naam: ${f.get("name")}`,
      `Telefoon: ${f.get("phone")}`,
      `Postcode: ${f.get("zip")}`,
      `Interesse: ${picked.join(", ")}`,
      "",
      `${f.get("message") ?? ""}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Aanvraag gratis energiestudie")}&body=${encodeURIComponent(body)}`;
  }

  const field = "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition-colors focus:border-lilac";

  return (
    <section id="contact" className="scroll-mt-16 px-2 md:px-3">
      <div className="grain relative overflow-hidden rounded-[28px] bg-deep text-white md:rounded-[40px]">
        <LeafMark className="pointer-events-none absolute -top-24 -right-24 size-[420px] opacity-[0.07]" />
        <div className="container-x relative grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col">
            <span className="eyebrow text-lilac">Gratis & vrijblijvend</span>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
              Laat een ingenieur <span className="text-lilac">jouw woning</span> doorrekenen.
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Je krijgt een gestaafd voorstel met investering, besparing en terugverdientijd. Pas als de cijfers kloppen, beslis jij.
            </p>
            <ul className="mt-10 space-y-4 text-white/85">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-lilac"><Phone className="size-4 text-lilac" /> {site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-lilac"><Mail className="size-4 text-lilac" /> {site.email}</a>
              </li>
              <li className="flex items-center gap-3"><MapPin className="size-4 text-lilac" /> {site.region}</li>
            </ul>
          </div>

          <form onSubmit={submit} className="rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-8">
            <p className="text-sm text-white/70">Waarin ben je geïnteresseerd?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => {
                const on = picked.includes(s.title);
                return (
                  <button
                    type="button"
                    key={s.key}
                    onClick={() => setPicked((p) => (on ? p.filter((x) => x !== s.title) : [...p, s.title]))}
                    aria-pressed={on}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${on ? "bg-lilac text-deep" : "bg-white/5 text-white/75 ring-1 ring-white/15 hover:ring-white/35"}`}
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <input name="name" required placeholder="Naam" className={field} autoComplete="name" />
              <input name="phone" required placeholder="Telefoon" className={field} autoComplete="tel" />
              <input name="email" type="email" placeholder="E-mail" className={field} autoComplete="email" />
              <input name="zip" placeholder="Postcode" className={field} autoComplete="postal-code" />
              <textarea name="message" rows={4} placeholder="Vertel kort over je woning of vraag (optioneel)" className={`${field} sm:col-span-2`} />
            </div>
            <Magnetic className="mt-6 w-full">
              <button type="submit" className="w-full rounded-full bg-lilac py-4 font-medium text-deep transition-shadow hover:shadow-[0_12px_40px_-10px_rgb(229_201_248/0.6)]">
                Vraag mijn gratis energiestudie aan
              </button>
            </Magnetic>
            <p className="mt-4 text-center text-xs text-white/45">We nemen binnen 1 werkdag contact op.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
