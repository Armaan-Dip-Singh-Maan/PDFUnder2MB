"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, Mail, ChevronRight } from "lucide-react";

const faq: { q: string; a: string }[] = [
  {
    q: "Do you upload my files?",
    a: "You can run fully in the browser so files never leave your device. If you opt into server mode later, temporary files are deleted after processing.",
  },
  {
    q: "Will it pass government portal limits?",
    a: "Yes for common 2 MB limits using the 2 MB preset. Different regions may vary, so always double-check the exact requirement before submitting.",
  },
  {
    q: "Is text still searchable?",
    a: "If the original PDF has a text layer, it remains searchable. Image-only scans may need OCR, which we can add as a future feature.",
  },
];

export default function CtaFaqSection() {
  return (
    <section aria-label="Get started and FAQ" className="scroll-mt-24 container mx-auto px-4 pb-16">
      {/* CTA panel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35 }}
      >
        <Card className="mx-auto max-w-4xl overflow-hidden border border-border/80">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-foreground/[0.04] to-transparent"
          />
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-balance">Ready to compress a file?</CardTitle>
            <CardDescription>No account needed for basic use.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-center gap-3 pb-8 pt-2">
            <Button asChild size="lg" className="px-5">
              <a href="/compress">Open the compressor</a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="px-5">
              <a href="#faq">Read the FAQ</a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQ */}
      <motion.div
        id="faq"
        className="mx-auto mt-12 max-w-3xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">FAQ</h2>
          <p className="mt-2 text-muted-foreground">Short and useful answers.</p>
        </div>

        <Accordion type="single" collapsible className="divide-y rounded-xl border">
          {faq.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="px-3">
              <AccordionTrigger className="gap-3 py-4 text-left hover:no-underline">
                <span className="flex-1 text-base font-medium">{item.q}</span>
                {/* Rotate chevron instead of caret-down */}
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-foreground/60 transition-transform data-[state=open]:rotate-90"
                  aria-hidden
                />
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* Contact card */}
      <motion.div
        id="contact"
        className="mx-auto mt-10 max-w-3xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <CardTitle>Contact</CardTitle>
            </div>
            <CardDescription>Questions or feedback? Drop a note.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Add your form here, or email{" "}
              <a className="underline hover:text-foreground" href="mailto:support@pdf2mb.app">
                support@pdf2mb.app
              </a>
              .
            </p>
            <p className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              In-browser option keeps files local.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
