"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Canvas from "@/components/Canvas";
import Sidebar from "@/components/Sidebar";
import AdPlaceholder from "@/components/AdPlaceholder";
import { toPng } from "html-to-image";

export default function Home() {
  const [mode, setMode] = useState<"image" | "code">("image");
  const [padding, setPadding] = useState(60);
  const [rounding, setRounding] = useState(12);
  const [shadow, setShadow] = useState(40);
  const [background, setBackground] = useState("radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)");
  const [aspectRatio, setAspectRatio] = useState("auto");
  const [customGradients, setCustomGradients] = useState<string[]>([]);

  // Code mode specific state
  const [code, setCode] = useState(`function HelloWorld() {
  console.log("Hello, Beautifier!");
}`);
  const [language, setLanguage] = useState("javascript");

  // Persistence logic
  useEffect(() => {
    const saved = localStorage.getItem("custom_gradients");
    if (saved) {
      try {
        setCustomGradients(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved gradients", e);
      }
    }
  }, []);

  const handleAddGradient = (gradient: string) => {
    const updated = [gradient, ...customGradients].slice(0, 12);
    setCustomGradients(updated);
    localStorage.setItem("custom_gradients", JSON.stringify(updated));
    setBackground(gradient);
  };

  const handleDeleteGradient = (index: number) => {
    const updated = customGradients.filter((_, i) => i !== index);
    setCustomGradients(updated);
    localStorage.setItem("custom_gradients", JSON.stringify(updated));
  };

  const downloadImage = () => {
    const element = document.getElementById("export-container");
    if (!element) return;

    toPng(element, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "transparent",
      style: {
        transform: 'scale(1)',
      }
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `beautified-${mode}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Could not download image", err);
      });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#09090b] text-zinc-100 font-sans">
      <Header />

      {/* Top Leaderboard Ad - Re-centered below Header */}
      <div className="w-full bg-zinc-950/50 border-b border-zinc-900 overflow-hidden flex items-center justify-center py-4 bg-dots">
        <AdPlaceholder width={728} height={90} label="Top Leaderboard Banner" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Canvas + Footer */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0c0c0e] relative overflow-hidden">
          <main className="flex-1 flex items-center justify-center p-4 relative">
            <Canvas
              mode={mode}
              padding={padding}
              rounding={rounding}
              shadow={shadow}
              background={background}
              code={code}
              language={language}
              aspectRatio={aspectRatio}
            />
          </main>

          <footer className="bg-[#09090b] border-t border-zinc-900 relative z-50 flex flex-col items-center justify-center py-4 gap-4">
            {/* Bottom Anchor Ad */}
            <div className="hidden md:block group scale-90 origin-bottom">
              <div className="relative">
                <AdPlaceholder width={728} height={90} label="Bottom Anchor Ad" />
                <div className="absolute -top-2 -right-2 bg-zinc-950 border border-zinc-800 text-[8px] px-1 text-zinc-500 rounded opacity-0 group-hover:opacity-100 transition-opacity">SPONSORED</div>
              </div>
            </div>
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Made with Screenshot Beautifier</p>
          </footer>
        </div>

        {/* Right Side: Sidebar (Full Height) */}
        <Sidebar
          mode={mode}
          setMode={setMode}
          padding={padding}
          setPadding={setPadding}
          rounding={rounding}
          setRounding={setRounding}
          shadow={shadow}
          setShadow={setShadow}
          selectedBackground={background}
          setSelectedBackground={setBackground}
          onDownload={downloadImage}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          customGradients={customGradients}
          onAddGradient={handleAddGradient}
          onDeleteGradient={handleDeleteGradient}
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
}
