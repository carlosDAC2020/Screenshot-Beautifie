export default function AdPlaceholder({ width, height, label }: { width: number, height: number, label: string }) {
    return (
        <div
            className="bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#52525b] text-sm overflow-hidden rounded-lg mx-auto"
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <div className="flex flex-col items-center gap-1">
                <span className="font-medium">{label}</span>
                <span className="text-xs opacity-50">{width} x {height}</span>
            </div>
        </div>
    );
}
