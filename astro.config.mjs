import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://serabin1.github.io',
  output: 'static',
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  redirects: { '/blogs': '/' },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Fira Code',
      cssVariable: '--font-fira-code',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Consolas', 'monospace'],
    },
  ],
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark',
      },
    }),
  ],
});
