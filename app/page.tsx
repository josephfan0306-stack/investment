"use client";

import type { ReactElement } from "react";
import { GlassCard } from "./components/glass-card";
import { useParallax } from "./components/hooks";
import { IconBolt, IconChip, IconGauge, IconLayers, type IconProps } from "./components/icons";
import { useVisitorName } from "./components/visitor-name";

type Advantage = {
  icon: (p: IconProps) => ReactElement;
  title: string;
  desc: string;
};

const advantages: Advantage[] = [
  {
    icon: IconBolt,
    title: "降低功耗",
    desc: "縮短光引擎與交換器 ASIC 之間的電氣訊號路徑，減少驅動與均衡電路所需能量，降低每位元傳輸的耗電量。",
  },
  {
    icon: IconGauge,
    title: "提升頻寬密度",
    desc: "在相同機箱面積內整合更多光通道，支援 800G、1.6T 以上的單埠頻寬，突破前面板可插拔模組的空間限制。",
  },
  {
    icon: IconLayers,
    title: "降低延遲與訊號損耗",
    desc: "電氣路徑縮短代表訊號完整性更好，減少均衡與重時脈需求，有助於降低整體傳輸延遲與錯誤率。",
  },
  {
    icon: IconChip,
    title: "簡化系統設計",
    desc: "減少可插拔模組數量與連接器介面，降低機箱散熱與電源設計的複雜度，簡化整體系統架構。",
  },
];

const applications = [
  {
    title: "AI 訓練與推論叢集",
    desc: "大規模 GPU 叢集需要極高頻寬與低延遲的節點互連，CPO 有助於提升整體運算效能與能源使用效率。",
    image: "/images/ai-cluster-nodes.svg",
  },
  {
    title: "高速乙太網路交換器",
    desc: "資料中心核心交換器持續朝向更高埠數與更高單埠速率發展，CPO 是支撐這個趨勢的關鍵封裝技術之一。",
    image: "/images/network-topology.svg",
  },
  {
    title: "高效能運算（HPC）",
    desc: "超級電腦節點間的高速互連對頻寬與功耗同樣敏感，CPO 架構可作為傳統可插拔光模組的替代方案。",
    image: "/images/bandwidth-chart.svg",
  },
  {
    title: "次世代資料中心網路",
    desc: "隨著 800G、1.6T 甚至更高速率規格的推進，CPO 被視為因應頻寬與功耗挑戰的重要技術路線之一。",
    image: "/images/datacenter-racks.svg",
  },
];

const stats = [
  { value: "30–50%", label: "潛在功耗降低幅度＊" },
  { value: "2–3x", label: "潛在頻寬密度提升＊" },
  { value: "800G+", label: "支援單埠速率等級" },
];

export default function Home() {
  const heroParallax = useParallax<HTMLDivElement>(0.05);
  const bannerParallax = useParallax<HTMLDivElement>(0.04);
  const fiberParallax = useParallax<HTMLImageElement>(-0.06);
  const { name, openPrompt } = useVisitorName();

  return (
    <>
      {/* Hero */}
      <section id="overview" className="flex flex-col items-center text-center">
        <span className="mb-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-xl">
          {name ? `嗨，${name}！歡迎回來` : "下一代光電互連技術"}
          {name && (
            <button
              type="button"
              onClick={openPrompt}
              className="text-slate-400 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              （不是你？）
            </button>
          )}
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          共同封裝光學
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            Co-Packaged Optics
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          將光學引擎與交換器 ASIC 整合封裝於同一基板，縮短電氣訊號路徑，
          突破傳統可插拔光模組在頻寬與功耗上的物理限制，
          為 AI 資料中心與高速網路打造下一世代互連架構。
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href="#advantages"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
          >
            了解技術優勢
          </a>
          <a
            href="#applications"
            className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/15"
          >
            查看應用場景
          </a>
        </div>

        <div ref={heroParallax.ref} style={heroParallax.style} className="mt-14 w-full">
          <GlassCard className="w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-cpo.svg"
              alt="共同封裝光學晶片架構示意圖"
              className="h-auto w-full"
            />
          </GlassCard>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <GlassCard key={s.label} className="px-6 py-8">
              <p className="text-3xl font-semibold text-white sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm text-slate-300">{s.label}</p>
            </GlassCard>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          ＊ 為業界技術路線之一般性估計數值，實際效益依系統設計與應用情境而異。
        </p>
      </section>

      {/* 什麼是 CPO */}
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">什麼是 CPO？</h2>
          <p className="mt-4 leading-8 text-slate-300">
            Co-Packaged Optics（共封裝光學）是一種將光學收發元件（Optical Engine）
            與交換器 ASIC 封裝在同一個模組或基板上的技術架構。相較於傳統將光模組
            放置在機箱前面板、再透過 PCB 走線與 ASIC 連接的作法，CPO
            大幅縮短了電氣訊號必須行走的距離，讓系統在更低功耗下達到更高的頻寬密度。
          </p>
        </div>
        <div className="grid gap-4">
          <GlassCard className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pluggable-optics.svg"
              alt="傳統可插拔光模組架構示意圖"
              className="h-auto w-full border-b border-white/10"
            />
            <div className="p-6">
              <p className="text-sm font-medium text-slate-400">傳統架構</p>
              <p className="mt-2 font-semibold text-white">可插拔光模組（Pluggable Optics）</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                光模組位於前面板，訊號需經過較長的 PCB 電氣路徑才能到達 ASIC，
                路徑越長，訊號衰減與功耗開銷也越高。
              </p>
            </div>
          </GlassCard>
          <GlassCard className="overflow-hidden border-cyan-300/20 bg-cyan-400/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/co-packaged-optics.svg"
              alt="共同封裝光學架構示意圖"
              className="h-auto w-full border-b border-white/10"
            />
            <div className="p-6">
              <p className="text-sm font-medium text-cyan-200">CPO 架構</p>
              <p className="mt-2 font-semibold text-white">共同封裝光學引擎</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                光引擎與 ASIC 直接共同封裝，電氣路徑縮短至毫米等級，
                有效降低功耗與訊號損耗，同時提升單位面積的頻寬密度。
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 核心優勢 */}
      <section id="advantages">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">核心優勢</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            CPO 從封裝層級重新設計光電互連方式，帶來多項系統層級的效益
          </p>
        </div>
        <div ref={bannerParallax.ref} style={bannerParallax.style} className="mt-8">
          <GlassCard className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/chip-thermal-banner.svg"
              alt="共封裝結構散熱與功耗管理示意圖"
              className="h-auto w-full"
            />
          </GlassCard>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => {
            const Icon = a.icon;
            return (
              <GlassCard key={a.title} className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{a.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 應用場景 */}
      <section id="applications">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">應用場景</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            高頻寬、低功耗的需求場景，正是 CPO 技術發揮價值之處
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {applications.map((app) => (
            <GlassCard key={app.title} className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.image}
                alt={app.title}
                className="h-auto w-full border-b border-white/10"
              />
              <div className="p-6">
                <h3 className="font-semibold text-white">{app.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{app.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 技術數據 */}
      <section id="data">
        <GlassCard className="relative flex flex-col items-center gap-6 overflow-hidden px-6 py-12 text-center sm:px-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={fiberParallax.ref}
            style={fiberParallax.style}
            src="/images/fiber-strands-bg.svg"
            alt=""
            aria-hidden="true"
            className="absolute -inset-y-10 inset-x-0 h-[calc(100%+5rem)] w-full object-cover opacity-60"
          />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              下一代網路架構的關鍵拼圖
            </h2>
            <p className="max-w-2xl leading-8 text-slate-300">
              隨著 AI 運算需求持續成長，資料中心對頻寬與能源效率的要求也不斷提高。
              CPO 透過封裝層級的創新，成為業界因應這項挑戰的重要技術方向之一。
            </p>
          </div>
        </GlassCard>
      </section>
    </>
  );
}
