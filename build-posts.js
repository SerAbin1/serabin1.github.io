
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
        .replace(/{{POST_BODY}}/g, html)
        .replace(/{{META_DESCRIPTION}}/g, post.snippet);

    const postPath = path.join(postsDir, post.slug);
    if (!fs.existsSync(postPath)) {
        fs.mkdirSync(postPath);
    }
    fs.writeFileSync(path.join(postPath, 'index.html'), output);
});

console.log('Blog posts built successfully!');
