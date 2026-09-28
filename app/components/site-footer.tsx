"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { GlassCard } from "./glass-card";
import { IconChip } from "./icons";
import { useParallax } from "./hooks";

// 採用與瀏覽器 <input type="email"> 相同規格的驗證規則（HTML Living Standard），
// 比單純檢查「有沒有 @ 和 .」更嚴謹：會擋掉連續句點、開頭結尾多餘符號、網域格式錯誤等情況。
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const SUBSCRIBERS_KEY = "cpo_newsletter_subscribers";

type SubscribeStatus = "idle" | "success" | "error";

export function SiteFooter() {
  const circuitParallax = useParallax<HTMLImageElement>(-0.04);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    const isValid =
      normalized.length > 0 &&
      normalized.length <= 254 &&
      !normalized.includes("..") &&
      EMAIL_PATTERN.test(normalized);

    if (!isValid) {
      setStatus("error");
      return;
    }
    try {
      const raw = window.localStorage.getItem(SUBSCRIBERS_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(normalized)) {
        list.push(normalized);
        window.localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(list));
      }
    } catch {
      // 忽略儲存失敗，仍顯示訂閱成功
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="relative z-10 mt-auto px-4 pb-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <GlassCard className="relative overflow-hidden p-8 sm:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={circuitParallax.ref}
            style={circuitParallax.style}
            src="/images/circuit-traces-bg.svg"
            alt=""
            aria-hidden="true"
            className="absolute -inset-y-10 inset-x-0 h-[calc(100%+5rem)] w-full object-cover opacity-25"
          />
          <div className="relative z-10 mb-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-semibold text-white">訂閱 CPO 技術文章</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                留下 Email，第一時間收到最新的共封裝光學技術文章與產業趨勢。
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:items-end">
              <form
                onSubmit={handleSubscribe}
                noValidate
                className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="你的 Email"
                  aria-label="Email"
                  className="w-full rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20 sm:w-64"
                />
                <button
                  type="submit"
                  className="flex-none rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
                >
                  訂閱
                </button>
              </form>
              {status === "success" && (
                <p className="text-xs text-cyan-200">訂閱成功，謝謝你的關注！</p>
              )}
              {status === "error" && (
                <p className="text-xs text-rose-300">請輸入有效的 Email 格式。</p>
              )}
            </div>
          </div>
          <div className="relative z-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-cyan-200">
                  <IconChip className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">
                  CPO<span className="text-cyan-300"> Insights</span>
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                專注於共同封裝光學（Co-Packaged Optics）技術介紹，
                協助理解次世代資料中心光電互連架構的原理與趨勢。
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-white">快速連結</p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
                <Link href="/#overview" className="w-fit transition-colors hover:text-white">
                  技術概述
                </Link>
                <Link href="/#advantages" className="w-fit transition-colors hover:text-white">
                  核心優勢
                </Link>
                <Link href="/#applications" className="w-fit transition-colors hover:text-white">
                  應用場景
                </Link>
                <Link href="/#data" className="w-fit transition-colors hover:text-white">
                  技術數據
                </Link>
                <Link href="/blog" className="w-fit transition-colors hover:text-white">
                  技術文章
                </Link>
                <Link href="/game" className="w-fit transition-colors hover:text-white">
                  小遊戲
                </Link>
              </nav>
            </div>
            <div>
              <p className="text-sm font-medium text-white">關於本站</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                本頁面為技術示範網站，內容為一般性技術介紹，
                非任何機構之官方發布資訊，數據僅供參考。
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
            <span>© 2026 CPO Insights. All rights reserved.</span>
            <span>Co-Packaged Optics 技術介紹網站 · 僅供教育與參考用途</span>
          </div>
        </GlassCard>
      </div>
    </footer>
  );
}
