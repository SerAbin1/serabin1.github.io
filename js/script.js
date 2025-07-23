document.addEventListener("DOMContentLoaded", () => {
  // Typed.js initialization
  const typed = new Typed("#typed", {
    strings: ["I'm Abin Biju.", "Backend Developer"],
    typeSpeed: 50,
    loop: true,
    loopCount: Infinity,
    backDelay: 2000,
  })

  // Card flip functionality
  const projectCards = document.querySelectorAll(".project-card")
  const flipDirections = ["flip-right", "flip-left", "flip-up", "flip-down"]

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Find the currently applied flip class, if any
      const currentFlip = flipDirections.find((dir) =>
        card.classList.contains(dir),
      )

      if (currentFlip) {
        // If it's flipped, remove the class to flip it back
        card.classList.remove(currentFlip)
      } else {
        // If it's not flipped, add a random flip class
        const randomDirection =
          flipDirections[Math.floor(Math.random() * flipDirections.length)]
        card.classList.add(randomDirection)
      }
    })
  })

  // Auto-scroll for projects carousel
  const projectsCarousel = document.querySelector(".projects-carousel");
  let projectScrollInterval;

  const startProjectScroll = () => {
    projectScrollInterval = setInterval(() => {
      if (projectsCarousel.scrollLeft + projectsCarousel.clientWidth >= projectsCarousel.scrollWidth) {
        projectsCarousel.scrollLeft = 0; // Loop back to start
      } else {
        projectsCarousel.scrollLeft += projectsCarousel.clientWidth; // Scroll one card width
      }
    }, 7000); // 7 seconds
  };

  const stopProjectScroll = () => {
    clearInterval(projectScrollInterval);
  };

  projectsCarousel.addEventListener('mouseenter', stopProjectScroll);
  projectsCarousel.addEventListener('mouseleave', startProjectScroll);
  startProjectScroll();

  // Dynamic scroll snapping for footer visibility
  const html = document.documentElement;

  window.addEventListener('scroll', () => {
    // Check if the user has scrolled to the very bottom
    if (window.innerHeight + window.scrollY >= html.scrollHeight) {
      html.classList.add('no-snap');
    } else {
      html.classList.remove('no-snap');
    }
  });

  // Blog carousel functionality
  const blogCarousel = document.getElementById("blog-carousel");

  fetch("blogs/metadata.json")
    .then(response => response.json())
    .then(posts => {
      // Sort posts by date in descending order
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Take the top 3 recent posts
      const recentPosts = posts.slice(0, 3);

      recentPosts.forEach(post => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("project-container"); // Reusing project-container style

        const postCard = document.createElement("div");
        postCard.classList.add("project-card"); // Reusing project-card style
        postCard.style.cursor = "pointer"; // Make it clear it's clickable

        postCard.addEventListener("click", () => {
          window.location.href = `/posts/${post.slug}/`;
        });

        const postCardInner = document.createElement("div");
        postCardInner.classList.add("project-card-inner");

        const postCardFront = document.createElement("div");
        postCardFront.classList.add("project-card-front");

        const titleElement = document.createElement("h3");
        titleElement.textContent = post.title;

        const dateElement = document.createElement("p");
        dateElement.classList.add("post-date");
        dateElement.textContent = post.date;

        const snippetElement = document.createElement("p");
        snippetElement.textContent = post.snippet;

        postCardFront.appendChild(titleElement);
        postCardFront.appendChild(dateElement);
        postCardFront.appendChild(snippetElement);

        postCardInner.appendChild(postCardFront);
        postCard.appendChild(postCardInner);
        postContainer.appendChild(postCard);
        blogCarousel.appendChild(postContainer);
      });

      // Add a single "Read All Blogs" button below the carousel
      const readAllBlogsButton = document.createElement("a");
      readAllBlogsButton.href = "blogs.html";
      readAllBlogsButton.classList.add("button");
      readAllBlogsButton.textContent = "Read All Blogs";
      readAllBlogsButton.style.marginTop = "20px"; // Add some spacing
      blogCarousel.parentNode.appendChild(readAllBlogsButton);

      // Auto-scroll for blog carousel
      let blogScrollInterval;

      const startBlogScroll = () => {
        blogScrollInterval = setInterval(() => {
          if (blogCarousel.scrollLeft + blogCarousel.clientWidth >= blogCarousel.scrollWidth) {
            blogCarousel.scrollLeft = 0; // Loop back to start
          } else {
            blogCarousel.scrollLeft += blogCarousel.clientWidth; // Scroll one card width
          }
        }, 5000); // 5 seconds
      };

      const stopBlogScroll = () => {
        clearInterval(blogScrollInterval);
      };

      blogCarousel.addEventListener('mouseenter', stopBlogScroll);
      blogCarousel.addEventListener('mouseleave', startBlogScroll);
      startBlogScroll();
    });
});

