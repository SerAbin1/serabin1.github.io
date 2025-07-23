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

  // Blog functionality
  const blogPostsContainer = document.getElementById("blog-posts");
  const blogContentModal = document.getElementById("blog-content-modal");
  const blogContentContainer = document.getElementById("blog-content");
  const closeModalButton = document.querySelector(".close-button");
  const converter = new showdown.Converter();

  fetch("blogs/metadata.json")
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post-item");
        postElement.textContent = post.title;
        postElement.addEventListener("click", () => {
          fetch(`blogs/${post.file}`)
            .then(response => response.text())
            .then(markdown => {
              const html = converter.makeHtml(markdown);
              blogContentContainer.innerHTML = html;
              blogContentModal.style.display = "block";
            });
        });
        blogPostsContainer.appendChild(postElement);
      });
    });

  closeModalButton.addEventListener("click", () => {
    blogContentModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == blogContentModal) {
      blogContentModal.style.display = "none";
    }
  });
});

