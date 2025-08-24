"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  UploadCloud,
  FileText,
  ZoomIn,
  ZoomOut,
  ShieldCheck,
  CheckCircle2,
  Trash2,
} from "lucide-react";

// Wireframe-only helper styles
const dashed = "border-2 border-dashed border-muted-foreground/40";
const hint = (text: string) => (
  <span className="text-xs text-muted-foreground">{text}</span>
);

export default function PDFCompressorWireframe() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<"2" | "4" | "6">("2");
  const [progress, setProgress] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(100);

  const onSelect = useCallback((f: File) => {
    setFile(f);
    setProgress(0);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onSelect(e.dataTransfer.files[0]);
      }
    },
    [onSelect]
  );

  const onBrowse = useCallback(() => inputRef.current?.click(), []);

  const simulateCompress = () => {
    if (!file) return;
    setProgress(5);
    const steps = [20, 38, 56, 74, 88, 100];
    let i = 0;
    const id = setInterval(() => {
      setProgress(steps[i]);
      i++;
      if (i >= steps.length) clearInterval(id);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-muted grid place-items-center">
              <FileText className="size-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">PDF2MB</h1>
              <p className="text-xs text-muted-foreground">Drag and drop PDF compression • Wireframe</p>
            </div>
            <Badge variant="secondary" className="ml-2">wireframe</Badge>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge>Responsive</Badge>
            <Badge variant="outline">shadcn</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 grid gap-6 md:grid-cols-3">
        {/* Left column: Drop area + presets */}
        <div className="md:col-span-2 space-y-6">
          {/* Drag and Drop */}
          <Card>
            <CardHeader>
              <CardTitle>Upload or drop PDF</CardTitle>
              <CardDescription>Single file up to 100 MB. {hint("Replace with your real limits.")}</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative ${dashed} rounded-xl p-6 md:p-10 grid place-items-center text-center bg-muted/20`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
              >
                <div className="space-y-3">
                  <UploadCloud className="mx-auto size-8" />
                  <p className="text-sm">Drag and drop your PDF here</p>
                  <p className="text-xs text-muted-foreground">or</p>
                  <Button size="sm" onClick={onBrowse}>Choose file</Button>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onSelect(f);
                    }}
                  />
                </div>

                {file ? (
                  <div className="absolute right-4 bottom-4 bg-background/70 border rounded-lg px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <span className="font-medium truncate max-w-[180px]">{file.name}</span>
                      <Button variant="ghost" size="icon" className="size-6" onClick={() => setFile(null)}>
                        <Trash2 className="size-4" />
                        <span className="sr-only">Clear</span>
                      </Button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-3">
              <div className="w-full">
                <Progress value={progress} className="h-2" />
              </div>
              <div className="flex flex-wrap gap-2 w-full justify-between">
                <span className="text-xs text-muted-foreground">No upload to server in this wireframe. {hint("Hook your in-browser or API logic here.")}</span>
                <Button onClick={simulateCompress} disabled={!file}>
                  Compress
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Presets */}
          <Card>
            <CardHeader>
              <CardTitle>Design presets</CardTitle>
              <CardDescription>Fast size targets. {hint("Bind these to compression params.")}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={preset}
                onValueChange={(v) => setPreset(v as any)}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { v: "2", label: "2 MB", sub: "Gov e-file" },
                  { v: "4", label: "4 MB", sub: "Email safe" },
                  { v: "6", label: "6 MB", sub: "Hi quality" },
                ].map((p) => (
                  <label key={p.v} className={`rounded-xl p-4 ${dashed} cursor-pointer hover:bg-muted/30`}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem id={`preset-${p.v}`} value={p.v} />
                      <div>
                        <div className="font-medium leading-none">{p.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{p.sub}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor="custom">Custom target size</Label>
                  <div className="flex gap-2 mt-1">
                    <Input id="custom" placeholder="e.g. 3.5" disabled />
                    <Button variant="secondary" disabled>MB</Button>
                  </div>
                  {hint("Enable if you support arbitrary targets.")}
                </div>
                <div>
                  <Label htmlFor="dpi">Image quality slider</Label>
                  <div className={`rounded-xl h-10 ${dashed} grid place-items-center text-xs text-muted-foreground`}>
                    placeholder control
                  </div>
                  {hint("Replace with real slider e.g. 0.1–1.0 / DPI.")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Preview */}
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>Preview</CardTitle>
              <CardDescription>Before and after views</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="before">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="before">Before</TabsTrigger>
                  <TabsTrigger value="after">After</TabsTrigger>
                </TabsList>
                <TabsContent value="before" className="mt-3">
                  <div className={`aspect-[3/4] ${dashed} rounded-lg bg-muted/20 relative grid place-items-center`}>
                    <span className="text-xs text-muted-foreground">Page canvas placeholder</span>
                    <div className="absolute right-2 bottom-2 flex gap-1">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-8"
                        onClick={() => setZoom(Math.min(200, zoom + 10))}
                      >
                        <ZoomIn className="size-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-8"
                        onClick={() => setZoom(Math.max(50, zoom - 10))}
                      >
                        <ZoomOut className="size-4" />
                      </Button>
                    </div>
                    <div className="absolute left-2 bottom-2 text-[10px] text-muted-foreground">{zoom}%</div>
                  </div>
                </TabsContent>
                <TabsContent value="after" className="mt-3">
                  <div className={`aspect-[3/4] ${dashed} rounded-lg bg-muted/20 grid place-items-center`}>
                    <span className="text-xs text-muted-foreground">Compressed preview placeholder</span>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className={`rounded-lg p-3 ${dashed}`}>
                  <div className="font-medium">Original</div>
                  <div className="text-muted-foreground mt-1">File: {file ? file.name : "—"}</div>
                  <div className="text-muted-foreground">Size: {file ? "8.2 MB*" : "—"}</div>
                </div>
                <div className={`rounded-lg p-3 ${dashed}`}>
                  <div className="font-medium">Result</div>
                  <div className="text-muted-foreground mt-1">Target: {preset} MB</div>
                  <div className="text-muted-foreground">Est. size: {file ? `${preset}.0 MB` : "—"}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" size="sm" disabled={!file}>Download</Button>
              <Button size="sm" variant="secondary" disabled={!file}>Share link</Button>
            </CardFooter>
          </Card>

          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Gov compliance messaging</AlertTitle>
            <AlertDescription>
              Placeholder copy. Add your real legal text here. Example topics: PIPEDA and GDPR alignment, in-browser processing, retention policy, and contact for privacy requests. Avoid claiming compliance without legal review.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Review checklist</CardTitle>
              <CardDescription className="text-xs">What this wireframe includes</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 text-xs">
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-600" /> Drag and drop area</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-600" /> Presets 2 / 4 / 6 MB</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-600" /> Preview with Before/After and zoom</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-600" /> Mobile responsive layout</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-green-600" /> Gov compliance message placeholder</div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-xs text-muted-foreground">
          Built with shadcn/ui, Tailwind, lucide icons, and framer-motion. All elements are wireframe placeholders. Replace dashed boxes and text with real components and logic.
        </div>
      </footer>
    </div>
  );
}
