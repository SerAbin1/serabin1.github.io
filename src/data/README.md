# Blog Data Management

## Adding New Blog Posts

To add a new blog post, edit `src/data/blogPosts.ts` and add a new object to the `blogPosts` array:

```typescript
{
  title: "Your Blog Post Title",
  description: "A brief description of your post",
  date: "2025-01-01", // YYYY-MM-DD format
  readTime: "5 min read",
  category: "Your Category",
  slug: "your-blog-post-slug", // URL-friendly version of title
  tags: ["tag1", "tag2", "tag3"],
  content: `# Your Blog Post Title

Your markdown content goes here...

## Subheading

More content...
`
}
```

## Guidelines

- **Slug**: Must be URL-friendly (lowercase, hyphens instead of spaces)
- **Date**: Use YYYY-MM-DD format for consistent sorting
- **Content**: Use markdown with escaped backticks (\`\`\`) for code blocks
- **Tags**: Keep relevant and consistent with existing tags
- **Categories**: Try to use existing categories for consistency

The blog system will automatically:
- Display posts on the blogs index page
- Create individual post pages at `/blogs/{slug}`
- Format dates and metadata
- Render markdown content with syntax highlighting