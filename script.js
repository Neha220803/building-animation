// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const elevator = document.getElementById("elevator");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const elevatorIndicator = document.getElementById("elevatorIndicator");

// Training steps data
const trainingSteps = [
  "Hands-On Practical Training",
  "Job-Oriented Training",
  "Budget-Friendly Training",
  "Career Assistance & Job Referrals",
  "Flexible Learning Modes",
  "Updated Syllabus",
  "Industry-Oriented Training",
];

// Calculate elevator positions for each floor
const buildingHeight = 500;
const floorHeight = buildingHeight / 7;
const elevatorPositions = [];

// Create positions for floors 7 to 1 (top to bottom)
for (let i = 0; i < 7; i++) {
  elevatorPositions.push(i * floorHeight + 3);
}

// Initialize entrance animation
gsap.set(".building-container", {
  scale: 0.8,
  opacity: 0,
  y: 50,
});

gsap.set(".floor-text", {
  x: -30,
  opacity: 0,
});

gsap.set(".elevator", {
  y: 0,
  scale: 0.9,
});

// Entrance animation sequence
const tl = gsap.timeline();

tl.to(".building-container", {
  scale: 1,
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: "back.out(1.2)",
}).to(
  ".elevator",
  {
    scale: 1,
    duration: 0.5,
    ease: "back.out(1.2)",
  },
  "-=0.5"
);

// Main scroll-triggered animation
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".container",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        // Update progress bar
        const progress = self.progress;
        progressFill.style.width = progress * 100 + "%";

        // Calculate current training step
        const currentStepIndex = Math.floor(progress * 6.99);
        const currentStep = trainingSteps[currentStepIndex];

        // Update progress text
        if (progress < 0.02) {
          progressText.textContent = "Ready to Start";
        } else if (progress > 0.98) {
          progressText.textContent = "Training Complete!";
        } else {
          progressText.textContent = currentStep || "In Progress...";
        }

        // Update elevator floor indicator
        const currentFloor = 7 - currentStepIndex;
        elevatorIndicator.textContent = currentFloor;

        // Add visual feedback for completion
        if (progress > 0.95) {
          elevator.style.background =
            "linear-gradient(135deg, #48BB78, #38A169)";
          elevator.style.boxShadow = "0 4px 20px rgba(72, 187, 120, 0.4)";
        } else {
          elevator.style.background =
            "linear-gradient(135deg, #4299E1, #3182CE)";
          elevator.style.boxShadow = "0 4px 12px rgba(44, 82, 130, 0.3)";
        }
      },
    },
  })
  .to(elevator, {
    y: elevatorPositions[6],
    duration: 1,
    ease: "none",
  });

// Animate floor texts as they come into focus
gsap.utils.toArray(".floor-text").forEach((text, index) => {
  gsap.to(text, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".container",
      start: `${index * 12}% top`,
      end: `${(index + 2) * 12}% top`,
      scrub: 1,
      onEnter: () => {
        gsap.to(text, {
          scale: 1.05,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
      },
    },
  });
});

// Add floating animation to the plant
gsap.to(".plant-icon", {
  y: -5,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
});

// Grid cells animation
gsap.utils.toArray(".grid-cell").forEach((cell, index) => {
  gsap.to(cell, {
    backgroundColor: "rgba(44, 82, 130, 0.1)",
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    delay: index * 0.1,
    ease: "power2.inOut",
  });
});

// Elevator person breathing animation
gsap.to(".person-body", {
  scaleY: 1.1,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
});

// Add elevator movement sound effect (visual feedback)
ScrollTrigger.create({
  trigger: ".container",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    // Add subtle shake effect during movement
    if (self.velocity > 0.1 || self.velocity < -0.1) {
      gsap.to(elevator, {
        x: Math.random() * 2 - 1,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
  },
});

// Add completion celebration
ScrollTrigger.create({
  trigger: ".container",
  start: "95% top",
  onEnter: () => {
    // Celebration effect
    gsap.to(".start-arrow", {
      scale: 1.5,
      rotation: 360,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Progress text celebration
    gsap.to(".progress-text", {
      scale: 1.1,
      color: "#48BB78",
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    });
  },
});

// Smooth scroll behavior for better UX
gsap.to(window, {
  scrollTo: 0,
  duration: 0,
});

// Add scroll progress indicator
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = scrolled / maxScroll;

  // Update elevator glow based on progress
  const glowIntensity = scrollProgress * 20;
  elevator.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(66, 153, 225, 0.6))`;
});

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    window.scrollBy({ top: window.innerHeight / 7, behavior: "smooth" });
  } else if (e.key === "ArrowUp") {
    window.scrollBy({ top: -window.innerHeight / 7, behavior: "smooth" });
  }
});

console.log("🎓 Training Program Elevator Animation Loaded Successfully!");
