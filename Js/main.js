// Remove loading overlay when page loads
window.addEventListener("load", function () {
  const loadingOverlay = document.getElementById("loadingOverlay");
  setTimeout(() => {
    loadingOverlay.style.opacity = "0";
    setTimeout(() => {
      loadingOverlay.style.display = "none";
    }, 500);
  }, 800);

  // Initialize animations
  initAnimations();

  // Initialize counters
  initCounters();
});

// Scroll animations
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });
}

// Counter animations for stats
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.disconnect();
      }
    });

    observer.observe(counter);
  });
}

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNavbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Show/hide scroll to top button
  const scrollTopBtn = document.getElementById("scrollTop");
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// WhatsApp modal functionality
const whatsappBtn = document.getElementById("whatsappBtn");
const whatsappModal = document.getElementById("whatsappModal");
const whatsappClose = document.getElementById("whatsappClose");

whatsappBtn.addEventListener("click", function () {
  whatsappModal.classList.add("show");
});

whatsappClose.addEventListener("click", function () {
  whatsappModal.classList.remove("show");
});

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target === whatsappModal) {
    whatsappModal.classList.remove("show");
  }
});

// Scroll to top functionality
document.getElementById("scrollTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // In a real application, you would send the form data to a server
  // For this demo, we'll just show an alert
  alert(
    "Thank you for your message! Our security team will contact you shortly."
  );
  this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Update active nav link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Create particles for hero section
function createParticles() {
  const heroSection = document.querySelector(".hero-section");
  const particlesCount = 30;

  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random position
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Random animation duration
    const duration = Math.random() * 20 + 10;
    particle.style.animation = `float ${duration}s linear infinite`;

    // Random delay
    particle.style.animationDelay = Math.random() * 5 + "s";

    heroSection.appendChild(particle);
  }
}

createParticles();

// // Initialize animations and counters
// initAnimations();
// initCounters();
