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
})

