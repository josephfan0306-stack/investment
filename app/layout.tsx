import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ParallaxBackdrop } from "./components/parallax-backdrop";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { LuckyDrawButton } from "./components/lucky-draw";
import { VisitorNameProvider } from "./components/visitor-name";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CPO 共封裝光學技術介紹",
  description: "Co-Packaged Optics（共封裝光學）技術介紹網站",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <VisitorNameProvider>
          <div
            id="top"
            className="relative flex flex-1 flex-col overflow-hidden bg-slate-950 text-slate-100"
          >
            <ParallaxBackdrop />
            <SiteHeader />
            <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-28 px-4 pb-28 pt-16 sm:px-8 sm:pt-24">
              {children}
            </main>
            <SiteFooter />
            <LuckyDrawButton />
          </div>
        </VisitorNameProvider>
      </body>
    </html>
  );
}
