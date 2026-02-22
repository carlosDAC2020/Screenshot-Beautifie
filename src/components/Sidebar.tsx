"use client";

import { useState } from "react";
import {
    Download, Sliders, Palette, Share2, Check,
    Image as ImageIcon, HelpCircle, Sparkles,
    Code2, Monitor, Languages
} from "lucide-react";
import AdPlaceholder from "./AdPlaceholder";
import GradientBuilder from "./GradientBuilder";
import { cn } from "../lib/utils";

interface SidebarProps {
    mode: "image" | "code";
    setMode: (mode: "image" | "code") => void;
    padding: number;
    setPadding: (val: number) => void;
    rounding: number;
    setRounding: (val: number) => void;
    shadow: number;
    setShadow: (val: number) => void;
    selectedBackground: string;
    setSelectedBackground: (val: string) => void;
    onDownload: () => void;
    aspectRatio: string;
    setAspectRatio: (val: string) => void;
    customGradients: string[];
    onAddGradient: (gradient: string) => void;
    onDeleteGradient: (index: number) => void;
    code: string;
    setCode: (val: string) => void;
    language: string;
    setLanguage: (val: string) => void;
}

const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "TypeScript", value: "typescript" },
    { name: "CSS", value: "css" },
    { name: "HTML", value: "html" },
    { name: "Python", value: "python" },
    { name: "React DX", value: "tsx" },
];

const aspectRatios = [
    { name: "Auto", value: "auto" },
    { name: "16:9", value: "16/9" },
    { name: "4:3", value: "4/3" },
    { name: "1:1", value: "1/1" },
    { name: "4:5", value: "4/5" },
];

const defaultBackgrounds = [
    { name: "Ocean", value: "linear-gradient(45deg, #00d2ff 0%, #3a7bd5 100%)" },
    { name: "Sunset", value: "linear-gradient(45deg, #ee0979 0%, #ff6a00 100%)" },
    { name: "Emerald", value: "linear-gradient(45deg, #10b981 0%, #059669 100%)" },
];

const communityGradients = [
    { name: "Aurora", value: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)" },
    { name: "Midnight", value: "radial-gradient(at 0% 100%, hsla(339,49%,30%,1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(221,45%,32%,1) 0, transparent 50%), #09090b" },
    { name: "Hyper", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Vapor", value: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)" },
];

export default function Sidebar({
    mode, setMode,
    padding, setPadding,
    rounding, setRounding,
    shadow, setShadow,
    selectedBackground, setSelectedBackground,
    onDownload,
    aspectRatio, setAspectRatio,
    customGradients, onAddGradient, onDeleteGradient,
    code, setCode,
    language, setLanguage
}: SidebarProps) {
    const [showBuilder, setShowBuilder] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        setIsSharing(true);
        const shareData = {
            title: 'Screenshot Beautifier',
            text: 'Check out this awesome mockup tool!',
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                // Simple feedback would be great here, maybe a toast later
            }
        } catch (err) {
            console.error('Share failed:', err);
        } finally {
            setTimeout(() => setIsSharing(false), 2000);
        }
    };

    return (
        <aside className="w-96 border-l border-zinc-800 flex flex-col h-full glass relative z-40 transition-all">
            {/* Mode Toggle */}
            <div className="p-5 border-b border-zinc-800 bg-zinc-950/20">
                <div className="flex p-1 bg-zinc-950 rounded-xl border border-zinc-800">
                    <button
                        onClick={() => setMode("image")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all",
                            mode === "image" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <ImageIcon className="w-3.5 h-3.5" />
                        Mockup
                    </button>
                    <button
                        onClick={() => setMode("code")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all",
                            mode === "code" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <Code2 className="w-3.5 h-3.5" />
                        Code
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
                <div className="p-8 space-y-12 flex-1">
                    {/* Mode Specific Controls */}
                    {mode === "code" ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Monitor className="w-4 h-4 text-blue-500" />
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Editor</h2>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs text-zinc-400 font-medium">Snippet Content</label>
                                    <textarea
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-[13px] font-mono text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none no-scrollbar shadow-inner"
                                        placeholder="Paste your code here..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-zinc-400 font-medium flex items-center gap-2">
                                        <Languages className="w-3 h-3 text-zinc-500" />
                                        Language
                                    </label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 focus:outline-none hover:border-zinc-700 transition-all cursor-pointer"
                                    >
                                        {languages.map(lang => (
                                            <option key={lang.value} value={lang.value}>{lang.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Sliders className="w-4 h-4 text-blue-500" />
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Adjustments</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Aspect Ratio Restoration */}
                                <div className="space-y-3">
                                    <label className="text-xs text-zinc-400 font-medium">Canvas Ratio</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {aspectRatios.map((ratio) => (
                                            <button
                                                key={ratio.value}
                                                onClick={() => setAspectRatio(ratio.value)}
                                                className={cn(
                                                    "px-3 py-2 rounded-lg border text-[10px] font-bold transition-all uppercase tracking-tighter",
                                                    aspectRatio === ratio.value
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-900/40"
                                                        : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                                )}
                                            >
                                                {ratio.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-400">Padding</span>
                                        <span className="text-zinc-100 font-mono">{padding}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="150" value={padding}
                                        onChange={(e) => setPadding(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-400">Rounding</span>
                                        <span className="text-zinc-100 font-mono">{rounding}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="50" value={rounding}
                                        onChange={(e) => setRounding(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-400">Shadow Depth</span>
                                        <span className="text-zinc-100 font-mono">{shadow}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" value={shadow}
                                        onChange={(e) => setShadow(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Shared Backgrounds Section */}
                    <div className="space-y-10">
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-amber-500" />
                                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Presets</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[...defaultBackgrounds, ...communityGradients].map((bg) => (
                                    <button
                                        key={bg.name}
                                        onClick={() => setSelectedBackground(bg.value)}
                                        className={cn(
                                            "w-full aspect-square rounded-lg border-2 transition-all group relative overflow-hidden",
                                            selectedBackground === bg.value ? "border-blue-600 ring-2 ring-blue-600/20" : "border-transparent hover:border-zinc-700"
                                        )}
                                        style={{ background: bg.value }}
                                    >
                                        {selectedBackground === bg.value && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Palette className="w-4 h-4 text-blue-500" />
                                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">My Library</h2>
                                </div>
                                <button
                                    onClick={() => setShowBuilder(!showBuilder)}
                                    className="text-[10px] text-blue-400 font-bold hover:text-blue-300 transition-colors bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20"
                                >
                                    {showBuilder ? "Close" : "+ New"}
                                </button>
                            </div>

                            {showBuilder && (
                                <GradientBuilder onAddGradient={(g) => {
                                    onAddGradient(g);
                                    setShowBuilder(false);
                                }} />
                            )}

                            <div className="grid grid-cols-3 gap-3">
                                {customGradients.map((bg, idx) => (
                                    <div key={idx} className="relative group">
                                        <button
                                            onClick={() => setSelectedBackground(bg)}
                                            className={cn(
                                                "w-full aspect-square rounded-lg border-2 transition-all relative overflow-hidden",
                                                selectedBackground === bg ? "border-blue-600 ring-2 ring-blue-600/20" : "border-transparent hover:border-zinc-700"
                                            )}
                                            style={{ background: bg }}
                                        >
                                            {selectedBackground === bg && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <Check className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => onDeleteGradient(idx)}
                                            className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                            <Check className="w-2 h-2 rotate-45" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Ad Slot */}
                        <div className="pt-8 border-t border-zinc-800/50">
                            <AdPlaceholder width={300} height={250} label="Sidebar MPU Ad" />
                        </div>
                    </div>

                    {/* Vertical Spacer to push footer actions to bottom */}
                    <div className="flex-grow" />

                    {/* Quick Help - Now secondary and smaller */}
                    <div className="mt-12 bg-zinc-900/30 rounded-xl p-4 border border-zinc-800/50 space-y-3">
                        <div className="flex items-center gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Quick Tips</h3>
                        </div>
                        <ul className="text-[10px] text-zinc-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                            <li>Toggle <strong>Code Mode</strong> to beautify snippets.</li>
                            <li>High <strong>Padding</strong> shows more background.</li>
                            <li>Export as <strong>PNG</strong> for maximum quality.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Actions - Now Fixed/Sticky at the bottom base */}
            <div className="p-6 border-t border-zinc-800 space-y-3 bg-[#09090b] relative z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <button
                    onClick={onDownload}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-900/30 text-sm"
                >
                    <Download className="w-4 h-4" />
                    Download {mode === "image" ? "Mockup" : "Snippet"}
                </button>
                <button
                    onClick={handleShare}
                    className={cn(
                        "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border text-sm",
                        isSharing
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300"
                    )}
                >
                    {isSharing ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {isSharing ? "Link Copied!" : "Share"}
                </button>
            </div>
        </aside>
    );
}
