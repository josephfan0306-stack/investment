"use client";

import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setY(window.scrollY);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return y;
}

/** 依元素相對於視窗中心的距離產生視差位移，滾動時越靠近畫面邊緣位移越明顯。 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setOffset(0);
      return;
    }
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        setOffset((elementCenter - viewportCenter) * speed);
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, reducedMotion]);

  return {
    ref,
    style: { transform: `translate3d(0, ${offset.toFixed(2)}px, 0)` },
  };
}
