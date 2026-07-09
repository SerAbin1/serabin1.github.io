import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog');
    const sortedPosts = posts.sort(
        (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    );

    return rss({
        title: "Abin Biju's Blog",
        description: 'Notes on backend development, cybersecurity, and things I learn along the way.',
        site: context.site!,
        items: await Promise.all(sortedPosts.map(async post => {
            const { rendered } = await render(post);
            return {
                title: post.data.title,
                description: post.data.description,
                pubDate: new Date(post.data.date),
                link: `/blogs/${post.id}/`,
                content: rendered.html,
            };
        })),
        customData: `<language>en-us</language>`,
    });
}
