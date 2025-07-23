
const fs = require('fs');
const path = require('path');
const showdown = require('showdown');

const converter = new showdown.Converter();
const postsDir = path.join(__dirname, 'posts');
const blogsDir = path.join(__dirname, 'blogs');
const metadataPath = path.join(blogsDir, 'metadata.json');

if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir);
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const template = fs.readFileSync(path.join(__dirname, 'posts', 'post.html'), 'utf8');

metadata.forEach(post => {
    const markdown = fs.readFileSync(path.join(blogsDir, post.file), 'utf8');
    const html = converter.makeHtml(markdown);
    const output = template
        .replace(/{{POST_TITLE}}/g, post.title)
        .replace(/{{POST_DATE}}/g, post.date)
        .replace(/{{POST_BODY}}/g, html);

    fs.writeFileSync(path.join(postsDir, `${post.slug}.html`), output);
});

console.log('Blog posts built successfully!');
