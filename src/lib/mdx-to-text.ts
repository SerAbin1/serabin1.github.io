// Turns an MDX post body into plain markdown for machine readers (the
// knowledge-mcp server, LLMs). Drops ESM import lines and interactive
// component tags, which mean nothing outside the page, but leaves fenced code
// blocks untouched since code samples can legitimately contain `import`.
export function mdxToText(body: string): string {
    const out: string[] = [];
    let inFence = false;
    for (const line of body.split('\n')) {
        if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
        if (!inFence) {
            if (/^import\s.+from\s/.test(line)) continue;
            const component = line.match(/^\s*<([A-Z]\w*)\b[^>]*\/>\s*$/);
            if (component) {
                out.push(`[Interactive ${component[1]} — see the post on the site]`);
                continue;
            }
        }
        out.push(line);
    }
    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
