import { useState, useEffect } from "react";
import { ArrowRight, RefreshCw, Layers, ArrowUp } from "lucide-react";

type Node = {
    key: number;
    val: string;
    freq: number;
};

type FreqGroup = {
    freq: number;
    nodes: Node[];
};

export default function LFUVisualizer() {
    const [capacity] = useState(3);
    const [freqGroups, setFreqGroups] = useState<FreqGroup[]>([]);
    const [cache, setCache] = useState<{ [key: number]: Node }>({});
    const [message, setMessage] = useState("Ready");
    const [highlight, setHighlight] = useState<{ key: number, type: 'read' | 'write' | 'evict' | 'promote' } | null>(null);
    const [valInput, setValInput] = useState("");

    const reset = () => {
        setFreqGroups([]);
        setCache({});
        setMessage("Cache initialized. Capacity: 3");
        setHighlight(null);
    };

    useEffect(reset, []);

    const get = (key: number) => {
        if (!cache[key]) {
            setMessage(`GET ${key}: Not found`);
            return;
        }

        const node = cache[key];
        setMessage(`GET ${key}: Found (Freq ${node.freq}). Promoting...`);
        setHighlight({ key, type: 'read' });

        setTimeout(() => {
            // Promote
            const newFreq = node.freq + 1;

            // Remove from old group
            setFreqGroups(prev => {
                const newGroups = prev.map(g => {
                    if (g.freq === node.freq) return { ...g, nodes: g.nodes.filter(n => n.key !== key) };
                    return g;
                }).filter(g => g.nodes.length > 0);

                // Add to new group
                let added = false;
                const finalGroups = newGroups.map(g => {
                    if (g.freq === newFreq) {
                        added = true;
                        return { ...g, nodes: [...g.nodes, { ...node, freq: newFreq }] };
                    }
                    return g;
                });

                if (!added) {
                    finalGroups.push({ freq: newFreq, nodes: [{ ...node, freq: newFreq }] });
                    finalGroups.sort((a, b) => a.freq - b.freq);
                }
                return finalGroups;
            });

            setCache(p => ({ ...p, [key]: { ...node, freq: newFreq } }));
            setMessage(`Promoted ${key} to Frequency ${newFreq}`);
            setHighlight({ key, type: 'promote' });
            setTimeout(() => setHighlight(null), 800);
        }, 600);
    };

    const put = (key: number) => {
        if (cache[key]) {
            setMessage(`PUT ${key}: Exists. Updating value & Promoting.`);
            const node = cache[key];
            setHighlight({ key, type: 'write' });

            setTimeout(() => {
                get(key); // Re-use promotion logic
            }, 400);
            return;
        }

        setMessage(`PUT ${key}: New Entry.`);

        if (Object.keys(cache).length >= capacity) {
            // Evict
            if (freqGroups.length === 0) return;
            const minGroup = freqGroups[0];
            const victim = minGroup.nodes[0]; // LRU is the first in the list

            setMessage(`Capacity Full! Evicting Min Freq / LRU: ${victim.key}`);
            setHighlight({ key: victim.key, type: 'evict' });

            setTimeout(() => {
                setCache(p => {
                    const n = { ...p };
                    delete n[victim.key];
                    return n;
                });

                setFreqGroups(prev => {
                    return prev.map(g => {
                        if (g.freq === minGroup.freq) return { ...g, nodes: g.nodes.filter(n => n.key !== victim.key) };
                        return g;
                    }).filter(g => g.nodes.length > 0);
                });

                // Insert New
                insertNew(key);
            }, 800);
        } else {
            insertNew(key);
        }
    };

    const insertNew = (key: number) => {
        const newNode: Node = { key, val: `Val-${key}`, freq: 1 };

        setCache(p => ({ ...p, [key]: newNode }));

        setFreqGroups(prev => {
            let added = false;
            const groups = prev.map(g => {
                if (g.freq === 1) {
                    added = true;
                    return { ...g, nodes: [...g.nodes, newNode] };
                }
                return g;
            });

            if (!added) {
                groups.unshift({ freq: 1, nodes: [newNode] });
                groups.sort((a, b) => a.freq - b.freq); // Ensure order
            }
            return groups;
        });

        setMessage(`Inserted ${key} at Frequency 1`);
        setHighlight({ key, type: 'write' });
        setTimeout(() => setHighlight(null), 800);
    };

    return (
        <div className="my-10 p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-sans">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-2">
                    <Layers className="text-blue-500" size={20} />
                    <h3 className="text-lg font-bold text-zinc-100">LFU Visualizer</h3>
                </div>
                <button onClick={reset} className="p-2 hover:bg-zinc-900 rounded text-zinc-400">
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 w-20 text-sm text-white"
                        placeholder="Key"
                        value={valInput}
                        onChange={(e) => setValInput(e.target.value)}
                    />
                    <button
                        onClick={() => valInput && get(parseInt(valInput))}
                        className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded text-sm font-bold"
                    >
                        GET
                    </button>
                    <button
                        onClick={() => valInput && put(parseInt(valInput))}
                        className="px-4 py-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded text-sm font-bold"
                    >
                        PUT
                    </button>
                </div>
                <div className="h-8 w-px bg-zinc-800 hidden sm:block"></div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map(k => (
                        <button
                            key={k}
                            onClick={() => put(k)}
                            className="w-8 h-8 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-500 border border-zinc-800"
                        >
                            {k}
                        </button>
                    ))}
                </div>
            </div>

            {/* Visualization Area */}
            <div className="min-h-[200px] flex flex-col-reverse justify-end gap-4 p-4 bg-zinc-900/30 rounded-lg border border-zinc-900/50">
                {freqGroups.length === 0 && (
                    <div className="text-center text-zinc-600 italic py-10">Cache is Empty</div>
                )}

                {freqGroups.map((group) => (
                    <div key={group.freq} className="flex gap-4 items-center animate-in slide-in-from-left-4 fade-in duration-500">
                        {/* Freq Label */}
                        <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-zinc-700 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold">Freq</span>
                            <span className="text-2xl font-bold text-blue-400">{group.freq}</span>
                        </div>

                        {/* List */}
                        <div className="flex-1 flex items-center gap-2 overflow-x-auto p-2 border-l-2 border-zinc-800 pl-4">
                            {group.nodes.map((node, idx) => (
                                <div key={node.key} className="flex items-center animate-in zoom-in duration-300">
                                    <div
                                        className={`
                                            relative w-14 h-14 rounded-md border-2 flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-300
                                            ${highlight?.key === node.key && highlight.type === 'evict' ? 'border-red-500 bg-red-900/20 scale-90 opacity-50' : ''}
                                            ${highlight?.key === node.key && highlight.type === 'promote' ? 'border-emerald-400 bg-emerald-900/20 scale-110 -translate-y-2' : 'border-zinc-700 bg-zinc-800 text-zinc-200'}
                                        `}
                                    >
                                        {node.key}
                                        {group.freq === freqGroups[0].freq && idx === 0 && (
                                            <span className="absolute -bottom-5 text-[9px] text-red-500 font-bold uppercase whitespace-nowrap">LRU Victim</span>
                                        )}
                                    </div>
                                    {idx < group.nodes.length - 1 && <ArrowRight size={14} className="text-zinc-700" />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-sm font-mono text-zinc-400">
                <span className="text-blue-500 mr-2">ℹ</span>
                {message}
            </div>
        </div>
    );
}
