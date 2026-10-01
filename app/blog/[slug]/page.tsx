import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/Button";
import { asset } from "../../lib/asset";
import { posts } from "../../lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} — VBTEC` : "Blog — VBTEC", description: post?.excerpt };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main>
      <header className="px-2 pt-2 md:px-3 md:pt-3">
        <div className="relative overflow-hidden rounded-[28px] bg-deep md:rounded-[36px]">
          <img src={asset(post.image)} alt="" className="absolute inset-0 size-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-deep/30" />
          <div className="container-x relative pt-36 pb-14 text-white md:pt-44 md:pb-20">
            <a href={asset("/#blog")} className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
              <ArrowLeft className="size-4" /> Terug naar de blog
            </a>
            <p className="mt-8 text-sm text-lilac">
              {post.category} · {post.date} · {post.read} lezen
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1] font-semibold tracking-[-0.04em]">{post.title}</h1>
          </div>
        </div>
      </header>
      <article className="container-x max-w-3xl py-16 md:py-24">
        <p className="font-display text-2xl leading-snug font-medium tracking-tight">{post.excerpt}</p>
        {post.body.map((para, i) => (
          <p key={i} className="mt-6 text-lg leading-relaxed text-ink/80">
            {para}
          </p>
        ))}
        <div className="mt-14 rounded-[28px] bg-paper p-8">
          <p className="font-display text-2xl font-semibold tracking-tight">Benieuwd wat dit voor jouw woning betekent?</p>
          <p className="mt-2 text-muted">Onze ingenieur rekent het gratis voor je uit.</p>
          <div className="mt-6">
            <Button href={asset("/#contact")} variant="dark">
              Gratis energiestudie
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
