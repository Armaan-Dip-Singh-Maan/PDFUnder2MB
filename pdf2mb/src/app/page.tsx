"use client";

import React, { useEffect, useState } from "react";
import { PricingGrid } from "@/components/PricingGrid";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypewriterInline } from "@/components/TypewriterInline";
import { PricingSection } from "@/components/PricingSection";
import { RotatingTypewriter } from "@/components/RotatingTypewriter";
import CtaFaqSection from "@/components/CtaFaqSection";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  UploadCloud,
  ShieldCheck,
  Timer,
  SlidersHorizontal,
  FileDown,
  Sparkles,
  Globe,
  Github,
  CheckCircle2,
} from "lucide-react";

// Your Aceternity navbar + extras
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { FileUpload } from "@/components/ui/file-upload";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// ---------- Visual helpers ----------
const Bg = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen overflow-x-clip bg-background">
    {/* dotted grid */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(hsl(var(--foreground)/0.06)_1px,transparent_1px)] [background-size:16px_16px]"
    />
    {children}
  </div>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.45, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

function Typewriter({ text, speed = 24 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, Math.max(12, 1000 / speed));
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span className="whitespace-pre">
      {out}
      <span className="ml-0.5 inline-block w-[1ch] animate-pulse">|</span>
    </span>
  );
}

// Subtle primary button (no heavy glow)
function PrimaryButton({ href, children, size = "default" }: { href: string; children: React.ReactNode; size?: "default" | "sm" | "lg" }) {
  const sizing = size === "lg" ? "px-5 py-3 text-base" : size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  return (
    <a href={href} className={`relative inline-flex items-center justify-center rounded-xl ${sizing} font-medium text-white`}>
      <span className="absolute -inset-px rounded-xl bg-gradient-to-b from-foreground/12 to-foreground/8" />
      <span className="relative z-10 rounded-[10px] bg-foreground px-4 py-2 shadow-[0_10px_30px_rgba(2,6,23,0.18)] ring-1 ring-black/10">
        {children}
      </span>
    </a>
  );
}

export default function LandingPage() {
  // Smooth scroll for all anchors
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
    return () => document.documentElement.classList.remove("scroll-smooth");
  }, []);

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <Bg>
      {/* Navbar */}
      <header className="sticky top-0 z-50 isolate border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto px-4">
          <Navbar>
            <NavBody>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold tracking-tight">PDF2MB</span>
                <Badge variant="secondary" className="ml-1">Beta</Badge>
              </div>
              <NavItems items={navItems} />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                {/* NavbarButton already renders an <a>. Pass href, do not nest anchors. */}
                <NavbarButton variant="primary" href="/compress">Try it</NavbarButton>
              </div>
            </NavBody>

            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle isOpen={isMobileOpen} onClick={() => setIsMobileOpen((v) => !v)} />
              </MobileNavHeader>
              <MobileNavMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)}>
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton onClick={() => setIsMobileOpen(false)} variant="primary" href="/compress" className="w-full">
                    Try it
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>
      </header>

      {/* Hero */}
      <section className="relative container mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-14">
        {/* keep the aurora inside the hero, not behind the header */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_30%_40%,black,transparent)] bg-[conic-gradient(from_180deg,theme(colors.primary/0.10),transparent_35%)] blur-3xl" />

        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
  <div>
   <motion.h1
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
>
  <span>Compress PDFs to under </span>
  <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
    2 MB
  </span>
  <RotatingTypewriter
    words={["Instantly", "Fast", "Private", "Clean"]}
    className="text-foreground"
  />
</motion.h1>

    <p className="mt-4 max-w-prose text-muted-foreground">
      Drag and drop a file. Pick a 2 / 4 / 6 MB preset. Get a clean result that works
      for email and government portals. Processing can run in the browser.
    </p>

    <div className="mt-7 flex flex-wrap items-center gap-4">
      <PrimaryButton size="lg" href="/compress">Upload PDF</PrimaryButton>
      <Button size="lg" variant="secondary" asChild>
        <a href="#features">See features</a>
      </Button>
    </div>

    <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
      <ShieldCheck className="h-4 w-4" /> In-browser option. Keep docs local.
    </div>
  </div>
</Reveal>


          {/* File upload animation block */}
          <Reveal delay={0.1}>
            <Card className="z-0 mx-auto max-w-md border-0 shadow-xl ring-1 ring-black/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Drag and drop</CardTitle>
                <CardDescription>Target: 2 MB preset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-dashed">
                  <FileUpload onChange={() => {}} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "2 MB", icon: <ShieldCheck className="h-4 w-4" /> },
                    { label: "4 MB", icon: <FileDown className="h-4 w-4" /> },
                    { label: "6 MB", icon: <SlidersHorizontal className="h-4 w-4" /> },
                  ].map((p) => (
                    <Button key={p.label} variant="outline" className="justify-start gap-2">
                      {p.icon}
                      {p.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Features */}
      <section id="features" className="scroll-mt-24 container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Why PDF2MB</h2>
            <p className="mt-2 text-muted-foreground">Focused tools. No clutter. Works great on mobile.</p>
          </Reveal>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={<UploadCloud className="h-5 w-5" />} title="Drag and drop" desc="Drop a PDF or browse from your device." />
          <FeatureCard icon={<SlidersHorizontal className="h-5 w-5" />} title="Smart presets" desc="Hit 2 MB, 4 MB, or 6 MB targets with tuned quality." />
          <FeatureCard icon={<Timer className="h-5 w-5" />} title="Fast" desc="Snappy feedback with streaming progress." />
          <FeatureCard icon={<ShieldCheck className="h-5 w-5" />} title="Private" desc="Optional in‑browser processing keeps files local." />
          <FeatureCard icon={<Globe className="h-5 w-5" />} title="Gov friendly" desc="Fits typical e‑filing limits and email gateways." />
          <FeatureCard icon={<FileDown className="h-5 w-5" />} title="Clean results" desc="Readable text and balanced image quality." />
        </div>
      </section>

      {/* Moving testimonials */}
      <section id="social-proof" className="scroll-mt-24 container mx-auto px-4 pb-12 md:pb-16">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What people say</h2>
            <p className="mt-2 text-muted-foreground">Short quotes from real users.</p>
          </div>
        </Reveal>
        <div className="relative mt-6 rounded-xl border bg-background">
          <InfiniteMovingCards
            items={[
              { quote: "From 9.7 MB to 1.9 MB. Text stayed sharp.", name: "Arman", title: "Operations" },
              { quote: "Presets nailed the email limit on the first try.", name: "Leah", title: "Consultant" },
              { quote: "Runs in the browser so I can use it on client laptops.", name: "Marco", title: "Field Engineer" },
              { quote: "Fast, clean, predictable.", name: "Priya", title: "PM" },
            ]}
            direction="right"
            speed="slow"
          />
        </div>
      </section>

        <PricingSection />

      {/* FAQ */}
      <CtaFaqSection />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-3 z-40 mx-auto w-full max-w-lg px-4 md:hidden">
        <div className="rounded-2xl border bg-background/80 p-2 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Ready to compress?</span>
            </div>
            <PrimaryButton href="/compress" size="sm">Open</PrimaryButton>
          </div>
        </div>
      </div>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 md:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} PDF2MB</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </Bg>
  );
}

// ---------- UI Partials ----------
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Reveal>
      <Card className="h-full transition-transform hover:-translate-y-0.5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm">
            {icon}
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
      </Card>
    </Reveal>
  );
}

function PriceCard({ name, price, cta, features, highlight = false }: { name: string; price: string; cta: string; features: string[]; highlight?: boolean }) {
  return (
    <Reveal>
      <Card className={highlight ? "border-foreground/20 shadow-lg" : ""}>
        <CardHeader>
          <div className="flex items-baseline justify-between">
            <CardTitle className="text-xl">{name}</CardTitle>
            {highlight ? <Badge>Popular</Badge> : null}
          </div>
          <div className="mt-1 text-3xl font-semibold">{price}</div>
          <CardDescription>Per user, billed monthly.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="mb-4 grid gap-2 text-sm">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-foreground/70" /> {f}
              </li>
            ))}
          </ul>
          <PrimaryButton href="/compress" size="lg">{cta}</PrimaryButton>
        </CardContent>
      </Card>
    </Reveal>
  );
}
