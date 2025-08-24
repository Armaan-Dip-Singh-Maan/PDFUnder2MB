"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Common CTA
function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild size="lg" className="w-full">
      <a href={href}>{children}</a>
    </Button>
  );
}

// ---- Types
type Plan = {
  name: string;
  price: string;        // "$5" or "$48"
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
  suffix?: string;      // "/month", "/year", etc. (optional)
  badge?: string;       // "Popular", "Best value" (optional)
};

type BillingCycle = "monthly" | "yearly";

// ---- Data (typed)
const plans = {
  monthly: [
    {
      name: "Free",
      price: "$0",
      tagline: "Get started",
      features: [
        "10 compressions / day",
        "Max input 25 MB",
        "2 / 4 / 6 MB presets",
        "In-browser processing",
        "Basic support",
      ],
      cta: "Try now",
      href: "/compress",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$5",
      suffix: "/month",
      tagline: "For regular use",
      features: [
        "Unlimited compressions",
        "Batch up to 20 files",
        "Custom target size",
        "Higher image quality",
        "Priority queue",
      ],
      cta: "Go Pro",
      href: "/checkout?plan=pro-monthly",
      highlight: true,
      badge: "Popular",
    },
    {
      name: "Team",
      price: "$15",
      suffix: "/user/mo",
      tagline: "For teams",
      features: [
        "Everything in Pro",
        "5 seats included",
        "Shared presets",
        "Usage analytics",
        "Email support",
      ],
      cta: "Contact sales",
      href: "/contact",
      highlight: false,
    },
  ],
  yearly: [
    {
      name: "Free",
      price: "$0",
      tagline: "Get started",
      features: [
        "10 compressions / day",
        "Max input 25 MB",
        "2 / 4 / 6 MB presets",
        "In-browser processing",
        "Basic support",
      ],
      cta: "Try now",
      href: "/compress",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$48",
      suffix: "/year",
      tagline: "2 months free",
      features: [
        "Unlimited compressions",
        "Batch up to 20 files",
        "Custom target size",
        "Higher image quality",
        "Priority queue",
      ],
      cta: "Go Pro",
      href: "/checkout?plan=pro-yearly",
      highlight: true,
      badge: "Best value",
    },
    {
      name: "Team",
      price: "$144",
      suffix: "/user/yr",
      tagline: "Saves 20%",
      features: [
        "Everything in Pro",
        "5 seats included",
        "Shared presets",
        "Usage analytics",
        "Email support",
      ],
      cta: "Contact sales",
      href: "/contact",
      highlight: false,
    },
  ],
} satisfies Record<BillingCycle, Plan[]>;

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="scroll-mt-24 container mx-auto px-4 pb-12 md:pb-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Simple pricing</h2>
        <p className="mt-2 text-muted-foreground">Start free. Upgrade when you need more.</p>

        {/* Toggle */}
        <div className="mt-4 inline-flex rounded-lg border p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              billing === "monthly"
                ? "bg-foreground text-background"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              billing === "yearly"
                ? "bg-foreground text-background"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans[billing].map((p) => (
          <Card key={p.name} className={p.highlight ? "border-foreground/25 shadow-xl" : ""}>
            <CardHeader>
              <div className="flex items-baseline justify-between">
                <CardTitle className="text-xl">{p.name}</CardTitle>
                {p.badge ? <Badge>{p.badge}</Badge> : null}
              </div>

              <div className="mt-1 flex items-end gap-2">
                <div className="text-3xl font-semibold">{p.price}</div>
                {p.suffix ? (
                  <div className="pb-1 text-sm text-muted-foreground">{p.suffix}</div>
                ) : null}
              </div>

              <CardDescription>{p.tagline}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="mb-4 grid gap-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-foreground/70" />
                    {f}
                  </li>
                ))}
              </ul>
              <CTA href={p.href}>{p.cta}</CTA>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted-foreground">
        Note: Some government portals enforce different limits. Always verify the exact requirement for your region.
      </p>
    </section>
  );
}
