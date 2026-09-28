"use client";

import Link from "next/link";
import { useState } from "react";
import { IconChip, IconClose, IconMenu } from "./icons";

const navLinks = [
  { href: "/#overview", label: "技術概述" },
  { href: "/#advantages", label: "核心優勢" },
  { href: "/#applications", label: "應用場景" },
  { href: "/#data", label: "技術數據" },
  { href: "/blog", label: "技術文章" },
  { href: "/game", label: "小遊戲" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 px-4 pt-4 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-cyan-200">
              <IconChip className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              CPO<span className="text-cyan-300"> Insights</span>
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/#overview"
              className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 md:inline-block md:text-sm"
            >
              了解更多
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "關閉選單" : "開啟選單"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
            >
              {menuOpen ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="mt-3 flex flex-col gap-1 rounded-3xl border border-white/10 bg-white/[0.08] p-4 text-sm text-slate-200 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#overview"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-white px-3 py-2.5 text-center font-medium text-slate-900"
            >
              了解更多
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
