import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "../components/glass-card";
import { IconArrowRight, IconCalendar, IconClock } from "../components/icons";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "技術文章 | CPO Insights",
  description: "共同封裝光學（Co-Packaged Optics）相關技術文章與產業趨勢整理。",
};

export default function BlogPage() {
  return (
    <>
      <section className="flex flex-col items-center text-center">
        <span className="mb-5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-xl">
          技術文章
        </span>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          深入了解 Co-Packaged Optics
        </h1>
        <p className="mt-5 max-w-2xl leading-8 text-slate-300">
          從技術原理、架構比較到應用場景，這裡整理了與共同封裝光學（CPO）相關的技術文章，
          幫助你建立對這項次世代光電互連技術的完整理解。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
            <GlassCard className="flex h-full flex-col overflow-hidden transition-colors group-hover:border-cyan-300/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt={post.title}
                className="h-auto w-full border-b border-white/10"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <IconCalendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconClock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-3 font-semibold text-white transition-colors group-hover:text-cyan-200">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-cyan-200">
                  閱讀全文
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </section>
    </>
  );
}
