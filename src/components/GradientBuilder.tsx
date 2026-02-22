"use client";

import { useState } from "react";
import { Plus, X, Paintbrush } from "lucide-react";

interface GradientBuilderProps {
    onAddGradient: (gradient: string) => void;
}

export default function GradientBuilder({ onAddGradient }: GradientBuilderProps) {
    const [color1, setColor1] = useState("#3b82f6");
    const [color2, setColor2] = useState("#8b5cf6");
    const [angle, setAngle] = useState(45);

    const generateGradient = () => {
        return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
    };

    const currentGradient = generateGradient();

    return (
        <div className="space-y-4 p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Paintbrush className="w-3.5 h-3.5 text-blue-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Custom Creator</h3>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 uppercase font-semibold">Start Color</label>
                    <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
                        <input
                            type="color"
                            value={color1}
                            onChange={(e) => setColor1(e.target.value)}
                            className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">{color1}</span>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 uppercase font-semibold">End Color</label>
                    <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
                        <input
                            type="color"
                            value={color2}
                            onChange={(e) => setColor2(e.target.value)}
                            className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">{color2}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] text-zinc-500 uppercase font-semibold">Angle</label>
                    <span className="text-[10px] text-zinc-400">{angle}°</span>
                </div>
                <input
                    type="range" min="0" max="360" value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>

            <div
                className="h-12 w-full rounded-lg border border-white/10 shadow-inner"
                style={{ background: currentGradient }}
            />

            <button
                onClick={() => onAddGradient(currentGradient)}
                className="w-full py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-[11px] font-bold rounded-lg border border-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
                <Plus className="w-3 h-3" />
                Add to My Presets
            </button>
        </div>
    );
}
