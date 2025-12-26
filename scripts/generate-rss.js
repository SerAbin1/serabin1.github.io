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
    const blogPostsPath = path.join(__dirname, "../src/data/blogPosts.ts");
    const content = fs.readFileSync(blogPostsPath, "utf-8");

    const posts = [];

    // Match each complete blog post object including content
    const postPattern =
        /\{\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*content:\s*`([\s\S]*?)`\s*,?\s*\}/g;

    let match;
    while ((match = postPattern.exec(content)) !== null) {
        posts.push({
            title: match[1],
            description: match[2],
            date: match[3],
            slug: match[4],
            content: match[5],
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

// Convert markdown to basic HTML for RSS content
function markdownToHtml(markdown) {
    // Handle escaped backticks from template literals
    let html = markdown.replace(/\\`/g, "`");

    // Store code blocks with placeholders to preserve them during processing
    const codeBlocks = [];
    html = html.replace(/```[\w]*\n([\s\S]*?)```/g, (match, code) => {
        const escapedCode = code
            .trim()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        const placeholder = `__CODEBLOCK_${codeBlocks.length}__`;
        codeBlocks.push(`<pre><code>${escapedCode}</code></pre>`);
        return placeholder;
    });

    // Inline code - also use placeholders
    const inlineCode = [];
    html = html.replace(/`([^`]+)`/g, (match, code) => {
        const placeholder = `__INLINECODE_${inlineCode.length}__`;
        inlineCode.push(`<code>${code}</code>`);
        return placeholder;
    });

    // Headers
    html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

    // Bold and italic
    html = html.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Lists
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

    // Split by double newlines for paragraphs
    const blocks = html.split(/\n\n+/);

    html = blocks
        .map((block) => {
            block = block.trim();
            if (!block) return "";

            // Don't wrap placeholders or block elements
            if (/^(__CODEBLOCK_|<h[1-4]|<pre|<ul|<ol)/.test(block)) {
                return block.replace(/\n/g, " ");
            }

            // Wrap list items in ul
            if (block.startsWith("<li>")) {
                return `<ul>${block.replace(/\n/g, "")}</ul>`;
            }

            // Regular paragraph
            return `<p>${block.replace(/\n/g, "<br>")}</p>`;
        })
        .filter(Boolean)
        .join("\n");

    // Restore code blocks
    codeBlocks.forEach((code, i) => {
        html = html.replace(`__CODEBLOCK_${i}__`, code);
    });

    // Restore inline code
    inlineCode.forEach((code, i) => {
        html = html.replace(`__INLINECODE_${i}__`, code);
    });

    return html;
}

async function generateRSSFeed() {
    const posts = await getBlogPosts();

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const rssItems = posts
        .map((post) => {
            const htmlContent = markdownToHtml(post.content);
            return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blogs/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
      <pubDate>${formatRFC822Date(post.date)}</pubDate>
      <author>${AUTHOR_NAME}</author>
    </item>`;
        })
        .join("");

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${formatRFC822Date(new Date().toISOString())}</lastBuildDate>
    <managingEditor>${AUTHOR_NAME}</managingEditor>
    <webMaster>${AUTHOR_NAME}</webMaster>
    ${rssItems}
  </channel>
</rss>`;

    // Write to public/feed folder
    const feedDir = path.join(__dirname, "../public/feed");
    if (!fs.existsSync(feedDir)) {
        fs.mkdirSync(feedDir, { recursive: true });
    }
    const publicPath = path.join(feedDir, "index.xml");
    fs.writeFileSync(publicPath, rssFeed, "utf-8");

    console.log(
        `✓ RSS feed generated at public/feed/index.xml (${posts.length} posts with full content)`
    );
}

generateRSSFeed().catch(console.error);
