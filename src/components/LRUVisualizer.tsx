/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ArrowBigRight, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";

type Mode = "array" | "linked-list" | "lru" | "full" | "put" | "get";

export function LRUVisualizer({ mode = "lru" }: { mode?: string }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Legacy support mapping
    const effectiveMode = (mode === "full" || mode === "put" || mode === "get") ? "lru" : mode;

    return (
        <div className="my-8 font-sans">
            {effectiveMode === "array" && <ArrayMode />}
            {effectiveMode === "linked-list" && <LinkedListMode />}
            {effectiveMode === "lru" && <LRUMode />}
        </div>
    );
};

// --- ARRAY MODE ---
const ArrayMode = () => {
    const [items, setItems] = useState([1, 2, 3, 4, 5]);
    const [highlight, setHighlight] = useState<number | null>(null);
    const [animatingPair, setAnimatingPair] = useState<[number, number] | null>(null); // [leftValue, rightValue]
    const [message, setMessage] = useState("Click GET to access an element");

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleGet = async (val: number) => {
        if (highlight !== null) return; // Busy

        const startIdx = items.indexOf(val);
        if (startIdx === -1) return;

        setHighlight(val);
        setMessage(`Accessing ${val} at Index ${startIdx}...`);
        await delay(800);

        setMessage(`Bubbling ${val} to the end (MRU position)...`);

        // Bubble the value to the end
        let currentArray = [...items];
        for (let i = startIdx; i < currentArray.length - 1; i++) {
            const leftVal = currentArray[i];
            const rightVal = currentArray[i + 1];

            // Trigger animation
            setAnimatingPair([leftVal, rightVal]);
            await delay(600);

            // Perform swap
            [currentArray[i], currentArray[i + 1]] = [currentArray[i + 1], currentArray[i]];
            setItems([...currentArray]);
            setAnimatingPair(null);

            await delay(100);
        }

        setHighlight(null);
        setMessage("Moved to end (MRU). Array re-indexed.");
    };

    return (
        <div className="p-4 sm:p-6 bg-card border rounded-xl shadow-sm overflow-hidden">
            <h3 className="text-xl font-bold mb-4">Array Implementation</h3>
            <div className="flex gap-2 mb-6 flex-wrap">
                {[2, 3, 4].map(v => (
                    <button
                        key={v}
                        onClick={() => handleGet(v)}
                        disabled={highlight !== null}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-bold text-sm sm:text-base transition-colors disabled:opacity-50"
                    >
                        GET {v}
                    </button>
                ))}
            </div>

            <div className="relative min-h-[100px] bg-muted/30 rounded-lg p-4 flex flex-wrap items-center gap-2 border border-border/50 justify-center sm:justify-start">
                <div className="absolute left-2 text-[10px] text-muted-foreground -top-3">Index 0 (LRU)</div>
                {items.map((item, idx) => {
                    const isAnimatingLeft = animatingPair?.[0] === item;
                    const isAnimatingRight = animatingPair?.[1] === item;

                    return (
                        <div
                            key={`${item}-${idx}`}
                            style={{
                                transform: isAnimatingLeft
                                    ? 'translateX(calc(100% + 0.5rem))'
                                    : isAnimatingRight
                                        ? 'translateX(calc(-100% - 0.5rem))'
                                        : 'translateX(0)',
                                transition: isAnimatingLeft || isAnimatingRight ? 'transform 0.5s ease-in-out' : 'none'
                            }}
                            className={`
                                relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md border-2 font-bold text-base sm:text-lg bg-card
                                ${highlight === item ? "border-primary text-primary scale-110" : "border-muted-foreground/20 text-muted-foreground"}
                                ${isAnimatingLeft || isAnimatingRight ? "z-20" : "z-0"}
                            `}
                        >
                            {item}
                            <span className="absolute -bottom-4 text-[8px] text-muted-foreground opacity-50">{idx}</span>
                        </div>
                    );
                })}
                <div className="absolute right-2 text-[10px] text-muted-foreground -top-3">Index N (MRU)</div>
            </div>

            <div className="mt-6 text-sm font-mono text-muted-foreground min-h-[1.5rem]">
                {message}
            </div>
        </div>
    );
};

// --- LINKED LIST MODE ---
const LinkedListMode = () => {
    const [items, setItems] = useState([1, 2, 3, 4, 5]);
    const [highlight, setHighlight] = useState<number | null>(null);
    const [scanningIdx, setScanningIdx] = useState<number | null>(null);
    const [message, setMessage] = useState("Linked List: Efficient moves, slow search.");
    const [phase, setPhase] = useState<'idle' | 'searching' | 'moving'>('idle');

    const handleGet = (target: number) => {
        if (phase !== 'idle') return;
        setMessage(`Searching for ${target}... (O(n) Traversal)`);
        setPhase('searching');

        // Phase 1: Scanning
        let idx = 0;
        const scanInterval = setInterval(() => {
            setScanningIdx(idx);

            if (items[idx] === target) {
                clearInterval(scanInterval);
                setTimeout(() => {
                    startMovePhase(target);
                }, 500);
            } else {
                idx++;
                if (idx >= items.length) {
                    clearInterval(scanInterval); // Should not happen in this demo
                    setPhase('idle');
                }
            }
        }, 400);
    };

    const startMovePhase = (target: number) => {
        setMessage("Found! Detaching pointers & moving to Tail (MRU)...");
        setPhase('moving');
        setScanningIdx(null);
        setHighlight(target);

        setTimeout(() => {
            setItems(prev => {
                const others = prev.filter(i => i !== target);
                return [...others, target];
            });
            setMessage("Re-attached at Tail. O(1) Pointer Manipulation.");

            setTimeout(() => {
                setHighlight(null);
                setPhase('idle');
            }, 1000);
        }, 1000);
    };

    return (
        <div className="p-4 sm:p-6 bg-card border rounded-xl shadow-sm overflow-visible">
            <h3 className="text-xl font-bold mb-4">Linked List Implementation</h3>
            <div className="flex gap-2 mb-6 flex-wrap">
                <button
                    onClick={() => handleGet(3)}
                    disabled={phase !== 'idle'}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-bold text-sm sm:text-base transition-colors disabled:opacity-50"
                >
                    GET 3
                </button>
                <button
                    onClick={() => handleGet(2)}
                    disabled={phase !== 'idle'}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-bold text-sm sm:text-base transition-colors disabled:opacity-50"
                >
                    GET 2
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 min-h-[120px] p-2">
                {items.map((item, idx) => (
                    <div key={item} className="flex items-center group relative">
                        {/* Node */}
                        <div
                            className={`
                                relative w-12 h-12 sm:w-16 sm:h-16 flex flex-col items-center justify-center rounded-full border-2 bg-card font-mono text-sm transition-all duration-500 z-10
                                ${scanningIdx === idx ? "border-yellow-400 bg-yellow-400/10 scale-110 shadow-[0_0_15px_rgba(250,204,21,0.3)]" : ""}
                                ${highlight === item ? "border-green-500 bg-green-500/10 scale-110 translate-y-[-10px] shadow-lg shadow-green-500/20" : "border-muted"}
                            `}
                        >
                            <span className="text-xs text-muted-foreground mb-0.5">Val</span>
                            <span className="font-bold">{item}</span>

                            {/* Pointers Visualization */}
                            <div className="absolute -bottom-2 w-full flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                <div className="w-1 h-1 rounded-full bg-red-400"></div>
                            </div>
                        </div>

                        {/* Arrow/Connection */}
                        {idx < items.length - 1 && (
                            <div className={`
                                w-6 sm:w-10 h-0.5 bg-muted-foreground/30 relative transition-all duration-500
                                ${highlight === item ? "opacity-20 scale-x-50" : "opacity-100"}
                            `}>
                                <ArrowRight className="absolute -right-2 -top-2.5 text-muted-foreground/50 w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                        )}

                        {/* MRU Label for last item */}
                        {idx === items.length - 1 && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-500 uppercase whitespace-nowrap">
                                MRU (Tail)
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-8 text-sm font-mono text-muted-foreground">
                {message}
            </div>
        </div>
    );
};

// --- FINAL LRU MODE ---
type LRUState = {
    order: number[]; // Left to Right (LRU -> MRU)
    cache: { [key: number]: string };
    capacity: number;
    highlight: number | null;
    message: string;
};

const LRUMode = () => {
    const [state, setState] = useState<LRUState>({
        order: [],
        cache: {},
        capacity: 3,
        highlight: null,
        message: "Enter a Value to GET or PUT"
    });
    const [valInput, setValInput] = useState("");

    const handleGet = (key: number) => {
        if (!state.cache[key]) {
            setState(p => ({ ...p, message: `Key ${key} not found!` }));
            return;
        }

        setState(p => ({
            ...p,
            highlight: key,
            message: `GET ${key}: Exists. Moving to MRU (Right).`
        }));

        setTimeout(() => {
            setState(p => ({
                ...p,
                order: [...p.order.filter(k => k !== key), key],
                highlight: null
            }));
        }, 600);
    };

    const handlePut = (key: number) => {
        if (state.cache[key]) {
            setState(p => ({
                ...p,
                highlight: key,
                message: `PUT ${key}: Update value. Move to MRU.`,
                cache: { ...p.cache, [key]: `Val-${key}` },
                order: [...p.order.filter(k => k !== key), key]
            }));
            return;
        }

        let newOrder = [...state.order];
        const newCache = { ...state.cache };
        let msg = `PUT ${key}: New Entry. Insert at MRU.`;

        if (newOrder.length >= state.capacity) {
            const lru = newOrder[0];
            msg = `Capacity Full! Evict LRU (${lru}). Insert ${key}.`;
            delete newCache[lru];
            newOrder = newOrder.slice(1);
        }

        newOrder.push(key);
        newCache[key] = `Val-${key}`;

        setState(p => ({
            ...p,
            cache: newCache,
            order: newOrder,
            message: msg
        }));
    };

    return (
        <div className="p-4 sm:p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 sm:mb-8 border-b border-zinc-900 pb-4">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100">LRU Cache</h3>
                    <div className="text-[10px] sm:text-xs text-zinc-500 font-mono">Hash Map + Doubly Linked List</div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setState({ order: [], cache: {}, capacity: 3, highlight: null, message: "Reset" })}
                        className="p-2 hover:bg-zinc-900 rounded text-zinc-400 transition-colors"
                        aria-label="Reset"
                    >
                        <RefreshCw size={16} />
                    </button>
                </div>
            </div>

            {/* Input Area */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10 justify-center items-center">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 w-20 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                        placeholder="Key"
                        value={valInput}
                        onChange={(e) => setValInput(e.target.value)}
                    />
                    <button
                        onClick={() => valInput && handleGet(parseInt(valInput))}
                        className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded text-sm font-bold transition-all"
                    >
                        GET
                    </button>
                    <button
                        onClick={() => valInput && handlePut(parseInt(valInput))}
                        className="px-4 py-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded text-sm font-bold transition-all"
                    >
                        PUT
                    </button>
                </div>

                <div className="h-px w-full sm:w-px sm:h-8 bg-zinc-800"></div>

                {/* Quick Actions */}
                <div className="flex gap-1 flex-wrap justify-center">
                    {[1, 2, 3, 4].map(k => (
                        <button
                            key={k}
                            onClick={() => handlePut(k)}
                            className="w-8 h-8 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-500 border border-zinc-800 transition-colors"
                        >
                            {k}
                        </button>
                    ))}
                </div>
            </div>

            {/* Visualization */}
            <div className="flex flex-wrap items-center justify-center gap-2 min-h-[140px] p-2">
                {/* Sentinel Left */}
                <div className="w-10 h-14 sm:w-12 sm:h-16 border-2 border-dashed border-zinc-800 bg-zinc-900/50 rounded flex items-center justify-center text-zinc-600 font-mono text-xs shrink-0">
                    L
                </div>

                {/* Arrrows */}
                <ArrowRight className="text-zinc-800 shrink-0" size={14} />

                {/* Nodes */}
                {state.order.length === 0 && <span className="text-zinc-700 italic text-sm">Empty</span>}
                {state.order.map((key, idx) => (
                    <div key={key} className="flex items-center animate-in zoom-in duration-300">
                        <div
                            className={`
                                relative w-14 h-16 sm:w-16 sm:h-20 bg-zinc-900 border-2 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all duration-500
                                ${state.highlight === key ? "border-emerald-500 shadow-emerald-900/20 scale-110 z-10" : "border-zinc-700"}
                            `}
                        >
                            {idx === 0 && (
                                <span className="absolute -top-5 sm:-top-6 text-[9px] sm:text-[10px] text-red-500 font-bold uppercase tracking-wider">LRU</span>
                            )}
                            {idx === state.order.length - 1 && (
                                <span className="absolute -bottom-5 sm:-top-6 text-[9px] sm:text-[10px] text-emerald-500 font-bold uppercase tracking-wider">MRU</span>
                            )}

                            <span className="text-zinc-500 text-[8px] sm:text-[10px] uppercase">Key</span>
                            <span className="text-lg sm:text-xl font-bold text-white">{key}</span>
                        </div>
                        {idx < state.order.length - 1 && (
                            <ArrowRight className="mx-1 sm:mx-2 text-zinc-700 shrink-0" size={14} />
                        )}
                    </div>
                ))}

                <ArrowRight className="text-zinc-800 shrink-0" size={14} />

                {/* Sentinel Right */}
                <div className="w-10 h-14 sm:w-12 sm:h-16 border-2 border-dashed border-zinc-800 bg-zinc-900/50 rounded flex items-center justify-center text-zinc-600 font-mono text-xs shrink-0">
                    R
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <div className="text-xs sm:text-sm font-mono text-emerald-400">
                    <span className="text-zinc-600 mr-2">➜</span>
                    {state.message}
                </div>
            </div>
        </div>
    );
};

export const LRUPutVisualizer = () => <LRUVisualizer mode="put" />;
export const LRUGetVisualizer = () => <LRUVisualizer mode="get" />;

export default LRUVisualizer;
