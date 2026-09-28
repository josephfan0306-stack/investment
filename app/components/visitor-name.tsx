"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { GlassCard } from "./glass-card";
import { IconChip } from "./icons";

const STORAGE_KEY = "cpo_visitor_name";
const SKIPPED_KEY = "cpo_visitor_name_skipped";

type VisitorNameContextValue = {
  name: string | null;
  openPrompt: () => void;
};

const VisitorNameContext = createContext<VisitorNameContextValue>({
  name: null,
  openPrompt: () => {},
});

export function useVisitorName() {
  return useContext(VisitorNameContext);
}

export function VisitorNameProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    let stored: string | null = null;
    let skipped = false;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
      skipped = window.localStorage.getItem(SKIPPED_KEY) === "1";
    } catch {
      // 無法存取 localStorage（例如隱私模式），視為尚未設定
    }
    if (stored) {
      setName(stored);
    } else if (!skipped) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openPrompt = () => {
    setDraft(name ?? "");
    setOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setName(trimmed);
    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
      window.localStorage.removeItem(SKIPPED_KEY);
    } catch {
      // 忽略儲存失敗
    }
    setOpen(false);
  };

  const handleSkip = () => {
    try {
      window.localStorage.setItem(SKIPPED_KEY, "1");
    } catch {
      // 忽略儲存失敗
    }
    setOpen(false);
  };

  return (
    <VisitorNameContext.Provider value={{ name, openPrompt }}>
      {children}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="visitor-name-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

          <GlassCard className="relative w-full max-w-sm border-white/15 bg-slate-900/90 p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-200">
                <IconChip className="h-7 w-7" />
              </span>
              <h2 id="visitor-name-title" className="mt-4 text-xl font-semibold text-white">
                歡迎來到 CPO Insights
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                告訴我們怎麼稱呼你，我們會在網站上跟你打聲招呼！
              </p>

              <form onSubmit={handleSubmit} className="mt-6 w-full">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="輸入你的名字或暱稱"
                  maxLength={20}
                  autoFocus
                  className="w-full rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-center text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="mt-4 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  開始探索
                </button>
              </form>

              <button
                type="button"
                onClick={handleSkip}
                className="mt-3 text-xs text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                先隨便看看
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </VisitorNameContext.Provider>
  );
}
