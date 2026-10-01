// In-memory prefetch for ClientRouter, the way Next.js does it.
// Astro's built-in prefetch uses <link rel=prefetch>, which browsers may ignore
// (Firefox `network.prefetch-next`), and a click still re-requests the page from
// the HTTP cache. Here pages are fetched with fetch() and handed straight to the
// router on click, so a prefetched navigation makes no request at all.
import type { TransitionBeforePreparationEvent } from 'astro:transitions/client';

const pages = new Map<string, Promise<string | null>>();
const parser = new DOMParser();

const key = (url: URL) => url.origin + url.pathname + url.search;

function isPrefetchable(a: HTMLAnchorElement): boolean {
  if (a.target || a.hasAttribute('download') || a.dataset.astroReload != null) return false;
  const url = new URL(a.href, location.href);
  // Skip other origins and files like /rss.xml or /favicon.ico.
  return url.origin === location.origin && !/\.\w+$/.test(url.pathname);
}

function prefetch(url: URL) {
  if (pages.has(key(url))) return;
  pages.set(
    key(url),
    fetch(url, { priority: 'low' })
      .then((res) =>
        res.ok && !res.redirected && res.headers.get('content-type')?.startsWith('text/html')
          ? res.text()
          : null,
      )
      .catch(() => null),
  );
}

const slowConnection = () => {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  return !!conn && (conn.saveData === true || /2g/.test(conn.effectiveType ?? ''));
};

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    prefetch(new URL((entry.target as HTMLAnchorElement).href));
  }
});

document.addEventListener('astro:page-load', () => {
  // Keep the current page too, so going back to it is instant.
  prefetch(new URL(location.href));
  if (slowConnection()) return;
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
    if (isPrefetchable(a)) observer.observe(a);
  }
});

document.addEventListener('astro:before-preparation', (event) => {
  const e = event as TransitionBeforePreparationEvent;
  if (e.formData) return;
  const cached = pages.get(key(e.to));
  if (!cached) return;
  const defaultLoader = e.loader;
  e.loader = async () => {
    const html = await cached;
    const doc = html && parser.parseFromString(html, 'text/html');
    // Fall back to Astro's loader if the page failed to load or needs a
    // stylesheet the current page hasn't loaded (Astro waits for those).
    const loaded = new Set([...document.styleSheets].map((s) => s.href));
    const newCss = doc
      ? [...doc.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]')].some(
          (l) => !loaded.has(new URL(l.getAttribute('href')!, e.to).href),
        )
      : true;
    if (!doc || newCss) return defaultLoader();
    doc.querySelectorAll('noscript').forEach((el) => el.remove());
    e.newDocument = doc;
  };
});
