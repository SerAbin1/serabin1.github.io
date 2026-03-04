# Blog Content Management

## Adding New Blog Posts

To add a new blog post, create a new `.mdx` file inside the `src/content/blog/` directory. The filename will automatically become the URL slug.

Example: `src/content/blog/my-new-post.mdx` -> `https://your-site.com/blogs/my-new-post`

### Frontmatter

Every blog post must begin with a YAML frontmatter block that defines its metadata:

```mdx
---
title: "Your Blog Post Title"
description: "A brief description of your post"
date: "2026-03-04"
---

Your MDX content goes here...
```

## Guidelines

- **File Naming**: Must be URL-friendly (lowercase, use hyphens instead of spaces). e.g., `how-to-code.mdx`
- **Date**: Use `YYYY-MM-DD` format to ensure proper sorting on the blog index page.
- **Content**: You can use standard Markdown as well as React/Astro components directly in the text (MDX).
- **Code Blocks**: Use standard markdown fenced code blocks. Use lowercase language tags for proper syntax highlighting (e.g. \`\`\`js, \`\`\`python).

## System Architecture

The blog is powered by Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) feature:
- Posts are automatically read and validated against the schema defined in `src/content/config.ts`.
- The blog index page (`src/pages/blogs/index.astro`) automatically fetches and sorts all posts.
- Individual post routes (`src/pages/blogs/[slug].astro`) use `getStaticPaths()` to build static pages for every MDX file.
- Astro MDX handles rendering and Shiki handles syntax highlighting.