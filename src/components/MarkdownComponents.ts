import LFUVisualizer from "./LFUVisualizer";
import LRUVisualizer, { LRUPutVisualizer, LRUGetVisualizer } from "./LRUVisualizer";

export const MarkdownComponents: Record<string, React.ComponentType<any>> = {
    LFUVisualizer,
    LRUVisualizer,
    LRUPutVisualizer,
    LRUGetVisualizer,
};
