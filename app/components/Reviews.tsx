import { Quote, Star } from "lucide-react";
import { reviews } from "../lib/content";
import { Tag } from "./Button";
import { Reveal, WordsReveal } from "./Reveal";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-label="5 op 5 sterren">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  );
}

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="flex w-[330px] shrink-0 flex-col rounded-[24px] bg-paper p-6 md:w-[400px] md:p-7">
      <div className="flex items-center justify-between">
        <Stars className="text-emerald" />
        <span className="rounded-full bg-cream px-3 py-1 text-xs text-muted">{r.service}</span>
      </div>
      <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-ink">“{r.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
        <span className="grid size-10 place-items-center rounded-full bg-deep font-display text-sm font-semibold text-lilac">{r.name[0]}</span>
        <span>
          <span className="block font-medium">{r.name}</span>
          <span className="block text-xs text-muted">{r.place} · Google review</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)];

  return (
    <section className="overflow-hidden bg-sand/60 py-24 md:py-36">
      <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <Tag>Reviews</Tag>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]">
            <WordsReveal text="Wat onze klanten" />
            <span className="text-muted/60">
              {" "}
              <WordsReveal text="over ons zeggen." delay={0.15} />
            </span>
          </h2>
        </div>
        <Reveal className="flex items-center gap-6 rounded-[28px] bg-deep p-6 text-white md:p-7">
          <div>
            <p className="font-display text-6xl font-semibold tracking-tighter">4,9</p>
            <Stars className="mt-2 text-lilac" />
          </div>
          <div className="border-l border-white/15 pl-6">
            <p className="font-medium">Uitstekend</p>
            <p className="mt-1 text-sm text-white/65">Gemiddelde score op basis van 180+ Google-reviews</p>
          </div>
          <Quote className="ml-auto hidden size-10 text-lilac/40 sm:block" />
        </Reveal>
      </div>

      <div className="mt-14 space-y-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, i) => (
          <div key={i} className="group flex w-max">
            <div className={`flex gap-4 pr-4 ${i ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"} group-hover:[animation-play-state:paused]`}>
              {[...row, ...row, ...row, ...row].map((r, n) => (
                <Card key={n} r={r} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
