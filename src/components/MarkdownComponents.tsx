import LFUVisualizer from "./LFUVisualizer";
import LRUVisualizer from "./LRUVisualizer";

const LRUPutVisualizer = () => <LRUVisualizer defaultMode="put-demo" />;
const LRUGetVisualizer = () => <LRUVisualizer defaultMode="get-demo" />;

export const MarkdownComponents: Record<string, React.ComponentType<any>> = {
    LFUVisualizer,
    LRUVisualizer,
    LRUPutVisualizer,
    LRUGetVisualizer,
};
