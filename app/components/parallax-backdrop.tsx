"use client";

import { useReducedMotion, useScrollY } from "./hooks";

export function ParallaxBackdrop() {
  const scrollY = useScrollY();
  const reducedMotion = useReducedMotion();

  const blobOffset = (factor: number, max: number) =>
    reducedMotion ? 0 : Math.max(Math.min(scrollY * factor, max), -max);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl"
        style={{ transform: `translate3d(0, ${blobOffset(0.08, 70)}px, 0)` }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-3xl"
        style={{ transform: `translate3d(0, ${blobOffset(-0.06, 60)}px, 0)` }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
        style={{ transform: `translate3d(0, ${blobOffset(0.1, 80)}px, 0)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.2),rgba(2,6,23,0.9))]" />
    </div>
  );
}
