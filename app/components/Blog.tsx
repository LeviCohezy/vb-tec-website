import { ArrowUpRight } from "lucide-react";
import { asset } from "../lib/asset";
import { posts } from "../lib/content";
import { Tag } from "./Button";
import { Reveal, WordsReveal } from "./Reveal";

export function Blog() {
  return (
    <section id="blog" className="container-x scroll-mt-24 py-24 md:py-36">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Tag>Kennisbank</Tag>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]">
            <WordsReveal text="Slimmer beslissen" />
            <span className="text-muted/60">
              {" "}
              <WordsReveal text="begint met weten." delay={0.15} />
            </span>
          </h2>
        </div>
        <p className="max-w-sm text-muted">Heldere uitleg van onze ingenieurs over energie, premies en technieken — zonder vakjargon.</p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <a href={asset(`/blog/${p.slug}/`)} className="group block">
              <div className="relative overflow-hidden rounded-[24px]">
                <img src={asset(p.image)} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]" />
                <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">{p.category}</span>
                <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-lilac text-deep opacity-0 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:opacity-100">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <p className="mt-5 text-xs text-muted">
                {p.date} · {p.read} lezen
              </p>
              <h3 className="mt-2 font-display text-xl leading-snug font-semibold tracking-tight transition-colors group-hover:text-emerald md:text-2xl">{p.title}</h3>
              <p className="mt-2 text-muted">{p.excerpt}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
