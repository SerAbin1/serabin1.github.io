import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
    const posts = await getCollection('blog');
    const sortedPosts = posts.sort(
        (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    );

    const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://serabin1.github.io';

    const content = [
        '# Abin Biju',
        '',
        '> Backend enthusiast. Cybersec admirer. I break things. I build things.',
        '',
        `Site: ${baseUrl}`,
        '',
        '## Blog Posts',
        '',
        ...sortedPosts.map(post =>
            `- [${post.data.title}](${baseUrl}/blogs/${post.id}/)\n  ${post.data.description} (${post.data.date})`
        ),
        '',
        '## Sections',
        '',
        '- Homepage: Introduction, Experience, Projects, Tech Stack, GitHub Activity',
        '- Blog: Technical writing on backend engineering and cybersecurity',
        '',
        '## Contact',
        '',
        '- GitHub: https://github.com/SerAbin1',
        '- LinkedIn: https://www.linkedin.com/in/abin-biju-7956a7262',
    ].join('\n');

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
