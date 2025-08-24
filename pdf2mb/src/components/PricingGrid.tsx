// src/components/PricingGrid.tsx
"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function PricingGrid() {
  return (
    <ul
      className="
        group/pricing relative grid grid-cols-1 grid-rows-none
        gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4
        xl:max-h-[34rem] xl:grid-rows-2
        rounded-3xl border bg-background p-2 md:p-3
        overflow-hidden
      "
    >
      {/* Outline overlay: draws column/row lines without double borders */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-3xl opacity-80
          [background:
            linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),
            linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)
          ]
          md:[background-size:calc(100%/12)_100%,100%_calc(100%/3)]
          xl:[background-size:calc(100%/12)_100%,100%_calc(100%/2)]
          [background-repeat:repeat]
        "
      />

      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-foreground/80" />}
        title="Do things the right way"
        description="Running out of copy so I'll write anything."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-foreground/80" />}
        title="The best AI code editor ever."
        description="Yes, it's true. Ask my mom if you don't believe me."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-foreground/80" />}
        title="You should buy Aceternity UI Pro"
        description="It's the best money you'll ever spend."
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-foreground/80" />}
        title="This card is also built by Cursor"
        description="Still true. Ask my mom if you don't believe me."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-foreground/80" />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no kidding."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

function GridItem({ area, icon, title, description }: GridItemProps) {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full">
        {/* card shell with single outline and hover lift */}
        <div
          className="
            relative h-full rounded-2xl bg-background
            ring-1 ring-border transition
            hover:ring-foreground/25 hover:-translate-y-0.5
            p-2 md:rounded-3xl md:p-3
          "
        >
          {/* soft inner glow that follows cursor */}
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} />

          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border border-border/80 p-2 bg-background">
                {icon}
              </div>

              <div className="space-y-3">
                <h3 className="pt-0.5 text-balance text-xl font-semibold md:text-2xl">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
