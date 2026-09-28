"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "./glass-card";
import { IconClose, IconGift, IconSpark } from "./icons";

const WIN_RATE = 0.1;

function generateCouponCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CPO90-${code}`;
}

type Status = "idle" | "drawing" | "won" | "lost";

export function LuckyDrawButton() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [couponCode, setCouponCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleOpen = () => {
    setStatus("idle");
    setCopied(false);
    setOpen(true);
  };

  const handleDraw = () => {
    setStatus("drawing");
    window.setTimeout(() => {
      const win = Math.random() < WIN_RATE;
      if (win) {
        setCouponCode(generateCouponCode());
        setStatus("won");
      } else {
        setStatus("lost");
      }
    }, 1300);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-transform hover:scale-105 hover:bg-white/20"
      >
        <IconGift className="h-5 w-5 text-cyan-200" />
        <span className="hidden sm:inline">抽獎拿優惠券</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lucky-draw-title"
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="關閉"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          <GlassCard className="relative w-full max-w-sm border-white/15 bg-slate-900/90 p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="關閉視窗"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/15 hover:text-white"
            >
              <IconClose className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-200">
                {status === "won" ? (
                  <IconSpark className="h-7 w-7" />
                ) : (
                  <IconGift className="h-7 w-7" />
                )}
              </span>

              <h2 id="lucky-draw-title" className="mt-4 text-xl font-semibold text-white">
                CPO 課程優惠券抽獎
              </h2>

              {status === "idle" && (
                <>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    點擊下方按鈕試試手氣，有 10% 機率抽中
                    <span className="font-semibold text-cyan-200">「CPO 專業課程 9 折優惠券」</span>！
                  </p>
                  <button
                    type="button"
                    onClick={handleDraw}
                    className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
                  >
                    立即抽獎
                  </button>
                </>
              )}

              {status === "drawing" && (
                <>
                  <p className="mt-3 text-sm text-slate-300">抽獎中，請稍候…</p>
                  <div className="mt-6 flex h-12 w-12 items-center justify-center">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-cyan-300" />
                  </div>
                </>
              )}

              {status === "won" && (
                <>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    恭喜中獎！以下是你的專屬優惠券代碼：
                  </p>
                  <div className="mt-5 flex w-full items-center justify-between gap-3 rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3">
                    <code className="text-base font-semibold tracking-wider text-cyan-200">
                      {couponCode}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex-none rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                    >
                      {copied ? "已複製" : "複製"}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    憑此代碼於報名 CPO 專業課程時輸入，即可享 9 折優惠。
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 w-full rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    關閉
                  </button>
                </>
              )}

              {status === "lost" && (
                <>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    銘謝惠顧，這次差一點點！要不要再試一次手氣？
                  </p>
                  <button
                    type="button"
                    onClick={handleDraw}
                    className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
                  >
                    再抽一次
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    關閉
                  </button>
                </>
              )}

              <p className="mt-6 text-[11px] text-slate-500">
                ＊本活動為網站功能示範，優惠券代碼僅供展示，不代表實際可兌換之課程折扣。
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
}
