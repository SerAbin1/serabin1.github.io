
document.addEventListener("DOMContentLoaded", () => {
    const blogListContainer = document.getElementById("blog-list");

    fetch("blogs/metadata.json")
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("blog-list-item");

                const titleElement = document.createElement("h3");
                const linkElement = document.createElement("a");
                linkElement.href = `posts/${post.slug}.html`;
                linkElement.textContent = post.title;
                titleElement.appendChild(linkElement);

                const dateElement = document.createElement("p");
                dateElement.classList.add("post-date");
                dateElement.textContent = post.date;

                const snippetElement = document.createElement("p");
                snippetElement.textContent = post.snippet;

                postElement.appendChild(titleElement);
                postElement.appendChild(dateElement);
                postElement.appendChild(snippetElement);

                blogListContainer.appendChild(postElement);
            });
        });
});
