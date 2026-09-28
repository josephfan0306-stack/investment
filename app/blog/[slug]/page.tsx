import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard } from "../../components/glass-card";
import { IconArrowRight, IconCalendar, IconClock } from "../../components/icons";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "文章不存在 | CPO Insights" };
  return {
    title: `${post.title} | CPO Insights`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <article>
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <IconArrowRight className="h-4 w-4 rotate-180" />
          返回技術文章列表
        </Link>
      </div>

      <header className="mx-auto max-w-3xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center justify-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <IconCalendar className="h-4 w-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <IconClock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-3xl">
        <GlassCard className="overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.title} className="h-auto w-full" />
        </GlassCard>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <GlassCard className="p-6 sm:p-10">
          <div className="flex flex-col gap-5">
            {post.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2 key={i} className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="flex flex-col gap-2 pl-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-7 text-slate-300 sm:text-base">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-sm leading-7 text-slate-300 sm:text-base">
                  {block.text}
                </p>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <Link href={`/blog/${nextPost.slug}`} className="group block">
          <GlassCard className="flex items-center justify-between gap-4 p-6 transition-colors group-hover:border-cyan-300/30">
            <div>
              <p className="text-xs text-slate-400">下一篇</p>
              <p className="mt-1 font-semibold text-white transition-colors group-hover:text-cyan-200">
                {nextPost.title}
              </p>
            </div>
            <IconArrowRight className="h-5 w-5 flex-none text-cyan-200 transition-transform group-hover:translate-x-1" />
          </GlassCard>
        </Link>
      </div>
    </article>
  );
}
