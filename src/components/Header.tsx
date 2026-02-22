"use client";

import { ImageIcon } from "lucide-react";
import AdPlaceholder from "./AdPlaceholder";

export default function Header() {
    return (
        <header className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-xl z-50">
            <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white leading-tight">Screenshot Beautifier</h1>
                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em]">High-Fidelity Mockups</p>
                    </div>
                </div>

                <div className="flex-1" />
            </div>
        </header>
    );
}
