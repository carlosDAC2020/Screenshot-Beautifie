"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Maximize2, Terminal } from "lucide-react";
// Import Prism core and languages in correct dependency order
import Prism from "prismjs";
import "prismjs/components/prism-markup"; // HTML/XML
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";

interface CanvasProps {
    mode: "image" | "code";
    padding: number;
    rounding: number;
    shadow: number;
    background: string;
    aspectRatio: string;
    code?: string;
    language?: string;
}

/**
 * Token mapping for Prism to Tailwind (Preserving User Colors: Orange strings, Yellow functions, Green numbers)
 */
const TOKEN_COLORS: Record<string, string> = {
    keyword: "text-purple-400 font-semibold",
    string: "text-orange-400",
    number: "text-green-400",
    comment: "text-zinc-500 italic font-light",
    function: "text-yellow-300",
    "class-name": "text-blue-300 font-bold",
    tag: "text-rose-400 font-medium",
    attr: "text-amber-200",
    operator: "text-sky-300",
    punctuation: "text-zinc-400",
    boolean: "text-rose-400",
    builtin: "text-blue-300 italic",
    variable: "text-zinc-100",
    property: "text-amber-200",
    selector: "text-rose-400",
    constant: "text-rose-400",
    char: "text-orange-400",
};

export default function Canvas({
    mode, padding, rounding, shadow, background, aspectRatio, code, language = "javascript"
}: CanvasProps) {
    const [image, setImage] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Auto-scale logic
    useEffect(() => {
        if ((mode === 'image' && !image) || !wrapperRef.current || !containerRef.current) return;

        const updateScale = () => {
            const wrapper = wrapperRef.current;
            const container = containerRef.current;
            if (!wrapper || !container) return;

            const safePadding = 80;
            const availableWidth = wrapper.clientWidth - safePadding;
            const availableHeight = wrapper.clientHeight - safePadding;

            const contentWidth = container.offsetWidth;
            const contentHeight = container.offsetHeight;

            const scaleX = availableWidth / contentWidth;
            const scaleY = availableHeight / contentHeight;
            const newScale = Math.min(scaleX, scaleY, 1);

            setScale(newScale);
        };

        const resizeObserver = new ResizeObserver(updateScale);
        resizeObserver.observe(wrapperRef.current);
        updateScale();

        return () => resizeObserver.disconnect();
    }, [image, mode, padding, aspectRatio, code]);

    useEffect(() => {
        const onPaste = (e: ClipboardEvent) => {
            if (mode !== "image") return;
            const items = e.clipboardData?.items;
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        const blob = items[i].getAsFile();
                        if (blob) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                setImage(event.target?.result as string);
                            };
                            reader.readAsDataURL(blob);
                        }
                    }
                }
            }
        };

        window.addEventListener("paste", onPaste);
        return () => window.removeEventListener("paste", onPaste);
    }, [mode]);

    /**
     * Recursive mapper: Converts Prism tokens to styled JSX spans
     */
    const renderPrismTokens = (tokens: (string | Prism.Token)[]): (string | React.JSX.Element)[] => {
        return tokens.map((token, i) => {
            if (typeof token === "string") {
                return token;
            }

            const tokenType = Array.isArray(token.type) ? token.type[0] : token.type;
            const colorClass = TOKEN_COLORS[tokenType] || "";

            return (
                <span key={i} className={colorClass}>
                    {Array.isArray(token.content)
                        ? renderPrismTokens(token.content)
                        : (typeof token.content === "string" ? token.content : renderPrismTokens([token.content as Prism.Token]))
                    }
                </span>
            );
        });
    };

    const highlightCodeWithPrism = (text: string, lang: string) => {
        if (!text) return null;

        // Simplify language naming for Prism
        let prismLang = lang;
        if (lang === 'html') prismLang = 'markup';

        const grammar = Prism.languages[prismLang] || Prism.languages.javascript;
        const tokens = Prism.tokenize(text, grammar);

        return renderPrismTokens(tokens);
    };

    return (
        <div
            ref={wrapperRef}
            className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0c0c0e]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {(mode === "image" && !image) ? (
                <label className="flex flex-col items-center justify-center w-full max-w-2xl aspect-video border-2 border-dashed border-zinc-800 rounded-2xl cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/50 transition-all group backdrop-blur-sm">
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    <Upload className="w-12 h-12 text-zinc-600 mb-4 group-hover:text-zinc-400 group-hover:scale-110 transition-all" />
                    <p className="text-zinc-400 font-medium text-center px-4">Click to upload or paste (Ctrl+V)</p>
                    <p className="text-zinc-600 text-sm mt-2 font-mono uppercase tracking-widest text-[10px]">Mockup Mode Active</p>
                </label>
            ) : (
                <div className="flex-1 w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        className="flex items-center justify-center origin-center"
                    >
                        <div
                            id="export-container"
                            ref={containerRef}
                            className="relative flex items-center justify-center shadow-2xl flex-shrink-0"
                            style={{
                                padding: `${padding}px`,
                                background: background,
                                aspectRatio: aspectRatio === 'auto' ? 'auto' : aspectRatio,
                                display: 'flex',
                                minWidth: mode === 'code' ? '600px' : '300px',
                            }}
                        >
                            {mode === "image" ? (
                                <img
                                    src={image!}
                                    alt="Preview"
                                    className="block h-auto pointer-events-none shadow-2xl"
                                    style={{
                                        borderRadius: `${rounding}px`,
                                        boxShadow: shadow > 0 ? `0 ${shadow / 2}px ${shadow}px rgba(0,0,0,0.5)` : 'none',
                                        maxWidth: '1200px',
                                    }}
                                />
                            ) : (
                                <div
                                    className="bg-[#1a1b26]/95 backdrop-blur-md overflow-hidden border border-white/10 shadow-2xl"
                                    style={{
                                        borderRadius: `${rounding}px`,
                                        boxShadow: shadow > 0 ? `0 ${shadow / 2}px ${shadow}px rgba(0,0,0,0.5)` : 'none',
                                        minWidth: '100%',
                                    }}
                                >
                                    {/* Mac OS Window Header */}
                                    <div className="h-12 bg-white/5 flex items-center px-6 justify-between border-b border-white/5">
                                        <div className="flex gap-2.5">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                        </div>
                                        <div className="text-[11px] text-zinc-400 font-mono font-medium flex items-center gap-2 tracking-wide">
                                            <Terminal className="w-3.5 h-3.5 text-blue-400" />
                                            {language?.toUpperCase()}
                                            <span className="text-zinc-600">— beautifier.io</span>
                                        </div>
                                        <div className="w-12" /> {/* Spacer */}
                                    </div>
                                    <div className="p-10">
                                        <pre className="text-[15px] font-mono leading-relaxed text-zinc-100 whitespace-pre">
                                            {highlightCodeWithPrism(code || "// Start typing your code...", language || "javascript")}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {image && mode === "image" && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <button
                        onClick={() => setImage(null)}
                        className="px-4 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold rounded-full border border-zinc-800 transition-all backdrop-blur-md shadow-xl"
                    >
                        Clear Image
                    </button>
                    <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2 backdrop-blur-md">
                        <Maximize2 className="w-3 h-3 text-blue-400" />
                        <span className="text-[10px] text-blue-400 font-mono font-bold">{Math.round(scale * 100)}% Fit</span>
                    </div>
                </div>
            )}
        </div>
    );
}
