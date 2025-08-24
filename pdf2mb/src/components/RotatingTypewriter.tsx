"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export function RotatingTypewriter({
  words,
  speed = 42,
  eraseSpeed = 60,
  holdMs = 1100,
  className = "",
  prefix = " ",
  suffix = ".",
}: {
  words: string[];
  speed?: number;
  eraseSpeed?: number;
  holdMs?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const first = useMemo(() => words?.[0] ?? "Instantly", [words]);
  const [mounted, setMounted] = useState(false);
  const [i, setI] = useState(0);
  const [out, setOut] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing");
  const t = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => () => { if (t.current) clearTimeout(t.current); }, []);

  useEffect(() => {
    if (!mounted || words.length === 0) return;
    const w = words[i];

    if (phase === "typing") {
      if (out.length < w.length) {
        t.current = window.setTimeout(
          () => setOut(w.slice(0, out.length + 1)),
          Math.max(12, 1000 / speed)
        );
      } else {
        setPhase("hold");
        t.current = window.setTimeout(() => setPhase("erasing"), holdMs);
      }
    } else if (phase === "erasing") {
      if (out.length > 0) {
        t.current = window.setTimeout(
          () => setOut(out.slice(0, -1)),
          Math.max(12, 1000 / eraseSpeed)
        );
      } else {
        setI((i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [mounted, words, i, out, phase, speed, eraseSpeed, holdMs]);

  return (
    <span className={className}>
      {!mounted ? (
        <span className="invisible">{prefix}{first}{suffix}</span>
      ) : (
        <>
          {prefix}{out}{suffix}
          <span className="ml-0.5 inline-block w-[1ch] align-baseline animate-pulse">|</span>
        </>
      )}
    </span>
  );
}
