import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Site configuration
const SITE_URL = "https://serabin1.github.io";
const SITE_TITLE = "Abin Biju's Blog";
const SITE_DESCRIPTION =
    "Notes on backend development, cybersecurity, and things I learn along the way.";
const AUTHOR_NAME = "Abin Biju";

// Import blog posts data
async function getBlogPosts() {
    // Read the blogPosts.ts file and extract the data
    const blogPostsPath = path.join(__dirname, "../src/data/blogPosts.ts");
    const content = fs.readFileSync(blogPostsPath, "utf-8");

    // Extract the blog posts array using regex
    const postsMatch = content.match(
        /export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/
    );
    if (!postsMatch) {
        console.error("Could not find blog posts in file");
        return [];
    }

    // Parse the posts manually (since we can't directly import TS)
    const posts = [];
    const postRegex =
        /\{\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*content:/g;

    let match;
    while ((match = postRegex.exec(content)) !== null) {
        posts.push({
            title: match[1],
            description: match[2],
            date: match[3],
            slug: match[4],
        });
    }

    return posts;
}

function escapeXml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function formatRFC822Date(dateString) {
    const date = new Date(dateString);
    return date.toUTCString();
}

async function generateRSSFeed() {
    const posts = await getBlogPosts();

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const rssItems = posts
        .map(
            (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blogs/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${formatRFC822Date(post.date)}</pubDate>
      <author>${AUTHOR_NAME}</author>
    </item>`
        )
        .join("");

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${formatRFC822Date(new Date().toISOString())}</lastBuildDate>
    <managingEditor>${AUTHOR_NAME}</managingEditor>
    <webMaster>${AUTHOR_NAME}</webMaster>
    ${rssItems}
  </channel>
</rss>`;

    // Write to public folder (will be copied to docs during build)
    const publicPath = path.join(__dirname, "../public/rss.xml");
    fs.writeFileSync(publicPath, rssFeed, "utf-8");

    console.log(`✓ RSS feed generated at public/rss.xml (${posts.length} posts)`);
}

generateRSSFeed().catch(console.error);
