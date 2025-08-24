"use client";
import { useEffect, useState } from "react";

export function TypewriterInline({
  text,
  speed = 36,            // chars per second
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [out, setOut] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, Math.max(12, 1000 / speed));
    return () => clearInterval(id);
  }, [mounted, text, speed]);

  return (
    <span className={className}>
      {/* Render invisible full text on the server so SSR/CSR markup matches */}
      {!mounted ? <span className="invisible">{text}</span> : out}
      <span className="ml-0.5 inline-block w-[1ch] align-baseline animate-pulse">|</span>
    </span>
  );
}
