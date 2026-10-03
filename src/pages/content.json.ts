import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { mdxToText } from '@/lib/mdx-to-text';

// Machine-readable export of everything on the site: full post bodies plus
// projects and work experience. Consumed by knowledge-mcp so AI assistants can
// answer from my own writing. llms.txt is the human-skimmable index; this is
// the full content.
export const GET: APIRoute = async ({ site }) => {
    const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://serabin1.github.io';
    const posts = (await getCollection('blog')).sort(
        (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    );

    const content = {
        author: 'Abin Biju',
        site: baseUrl,
        posts: posts.map(post => ({
            id: post.id,
            url: `${baseUrl}/blogs/${post.id}/`,
            title: post.data.title,
            description: post.data.description,
            date: post.data.date,
            lastUpdated: post.data.lastUpdated ?? null,
            body: mdxToText(post.body ?? ''),
        })),
        projects: projects.map(p => ({ ...p, url: `${baseUrl}/projects/` })),
        experience: experiences.map(e => ({ ...e, url: `${baseUrl}/work/` })),
    };

    return new Response(JSON.stringify(content, null, 2), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
};
