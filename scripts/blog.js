const blogContainer = document.getElementById('blog');

// List of blog markdown files
const posts = [
  'posts/my-first-post.md'
];

posts.forEach(async (url) => {
  const res = await fetch(url);
  const text = await res.text();

  // Extract frontmatter
  const [_, metaBlock, markdown] = text.match(/---(.*?)---(.*)/s) || [];
  const metadata = {};
  metaBlock?.trim().split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    metadata[key.trim()] = rest.join(':').trim();
  });

  const previewHTML = marked.parse(metadata.excerpt || markdown.split('\n\n')[1]);

  const postDiv = document.createElement('div');
  postDiv.className = 'blog-preview';
  postDiv.innerHTML = `
    <h2><a href="blog.html?post=${url}">${metadata.title}</a></h2>
    <p>${previewHTML}</p>
    <a href="blog.html?post=${url}">Read more</a>
  `;

  blogContainer.appendChild(postDiv);
});

