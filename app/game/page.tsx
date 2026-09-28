"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { GlassCard } from "../components/glass-card";

const GAME_DURATION = 15;
const FRUIT_EMOJIS = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍌", "🍑", "🍉"];
const CATCH_Y = 86;
const CATCH_TOLERANCE = 10;
const BASKET_EDGE = 6;
const HIGH_SCORE_KEY = "cpo_fruit_game_high_score";

type Fruit = {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
};

type Status = "idle" | "playing" | "over";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function FruitGamePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [highScore, setHighScore] = useState(0);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const fruitsRef = useRef<Fruit[]>([]);
  const basketXRef = useRef(50);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const nextSpawnGapRef = useRef(700);
  const nextIdRef = useRef(0);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(HIGH_SCORE_KEY);
      if (stored) setHighScore(Number(stored) || 0);
    } catch {
      // 忽略讀取失敗
    }
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        basketXRef.current = Math.max(BASKET_EDGE, basketXRef.current - 7);
        setBasketX(basketXRef.current);
      } else if (e.key === "ArrowRight") {
        basketXRef.current = Math.min(100 - BASKET_EDGE, basketXRef.current + 7);
        setBasketX(basketXRef.current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  const spawnFruit = () => {
    const fruit: Fruit = {
      id: nextIdRef.current++,
      x: randomBetween(10, 90),
      y: -5,
      speed: randomBetween(20, 32),
      emoji: FRUIT_EMOJIS[Math.floor(Math.random() * FRUIT_EMOJIS.length)],
    };
    fruitsRef.current = [...fruitsRef.current, fruit];
  };

  const endGame = () => {
    cancelAnimationFrame(rafRef.current);
    setStatus("over");
    setScore((current) => {
      if (current > highScore) {
        setHighScore(current);
        try {
          window.localStorage.setItem(HIGH_SCORE_KEY, String(current));
        } catch {
          // 忽略儲存失敗
        }
      }
      return current;
    });
  };

  const loop = (timestamp: number) => {
    if (!lastFrameRef.current) lastFrameRef.current = timestamp;
    const dt = (timestamp - lastFrameRef.current) / 1000;
    lastFrameRef.current = timestamp;

    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const remaining = Math.max(0, GAME_DURATION - elapsed);
    setTimeLeft(remaining);

    if (timestamp - lastSpawnRef.current > nextSpawnGapRef.current) {
      spawnFruit();
      lastSpawnRef.current = timestamp;
      nextSpawnGapRef.current = randomBetween(550, 950);
    }

    let caught = 0;
    const next: Fruit[] = [];
    for (const f of fruitsRef.current) {
      const ny = f.y + f.speed * dt;
      if (ny >= CATCH_Y && Math.abs(f.x - basketXRef.current) <= CATCH_TOLERANCE) {
        caught += 1;
        continue;
      }
      if (ny > 108) continue;
      next.push({ ...f, y: ny });
    }
    fruitsRef.current = next;
    setFruits(next);
    if (caught > 0) setScore((s) => s + caught);

    if (remaining <= 0) {
      endGame();
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  };

  const startGame = () => {
    fruitsRef.current = [];
    setFruits([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    basketXRef.current = 50;
    setBasketX(50);
    nextIdRef.current = 0;
    lastFrameRef.current = 0;
    lastSpawnRef.current = performance.now();
    nextSpawnGapRef.current = 500;
    startTimeRef.current = performance.now();
    setStatus("playing");
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (status !== "playing" || !arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(100 - BASKET_EDGE, Math.max(BASKET_EDGE, pct));
    basketXRef.current = clamped;
    setBasketX(clamped);
  };

  return (
    <>
      <section className="flex flex-col items-center text-center">
        <span className="mb-5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-xl">
          小遊戲
        </span>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          接水果大挑戰
        </h1>
        <p className="mt-5 max-w-xl leading-8 text-slate-300">
          移動滑鼠、手指拖曳或使用左右方向鍵控制籃子，
          在 15 秒內盡量接住越多水果，測試一下你的手速！
        </p>
      </section>

      <section className="mx-auto w-full max-w-2xl">
        <GlassCard
          ref={arenaRef}
          onPointerMove={handlePointerMove}
          className="relative h-[440px] touch-none select-none overflow-hidden sm:h-[520px]"
        >
          <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-xl">
            得分：{score}
          </div>
          <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-xl">
            剩餘 {Math.ceil(timeLeft)} 秒
          </div>

          {fruits.map((f) => (
            <span
              key={f.id}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-3xl sm:text-4xl"
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
            >
              {f.emoji}
            </span>
          ))}

          {status !== "over" && (
            <span
              className="pointer-events-none absolute -translate-x-1/2 select-none text-5xl sm:text-6xl"
              style={{ left: `${basketX}%`, top: "88%" }}
            >
              🧺
            </span>
          )}

          {status === "idle" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-slate-950/60 p-6 text-center backdrop-blur-sm">
              <p className="text-sm text-slate-300">
                準備好了嗎？時間只有 <span className="font-semibold text-cyan-200">15 秒</span>！
              </p>
              {highScore > 0 && (
                <p className="text-xs text-slate-400">目前最高紀錄：{highScore} 分</p>
              )}
              <button
                type="button"
                onClick={startGame}
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
              >
                開始遊戲
              </button>
            </div>
          )}

          {status === "over" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-slate-950/70 p-6 text-center backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white">遊戲結束！</h2>
              <p className="text-lg text-cyan-200">本次得分：{score} 分</p>
              <p className="text-xs text-slate-400">最高紀錄：{highScore} 分</p>
              <button
                type="button"
                onClick={startGame}
                className="mt-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
              >
                再玩一次
              </button>
            </div>
          )}
        </GlassCard>
        <p className="mt-4 text-center text-xs text-slate-500">
          ＊ 本遊戲為網站功能示範，純粹娛樂用途。
        </p>
      </section>
    </>
  );
}
