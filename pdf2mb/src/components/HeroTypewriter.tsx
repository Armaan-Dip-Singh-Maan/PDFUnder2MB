// src/components/HeroTypewriter.tsx
"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function HeroTypewriter() {
  const words = [
    { text: "Compress" },
    { text: "PDFs" },
    { text: "to" },
    { text: "under" },
    { text: "2", className: "text-foreground" },
    { text: "MB.", className: "text-foreground/80" },
    { text: "Instantly.", className: "text-foreground/70" },
  ];

  return (
    <TypewriterEffectSmooth
      words={words}
      className="text-4xl font-extrabold md:text-6xl leading-tight tracking-tight"
      cursorClassName="bg-foreground"
    />
  );
}
