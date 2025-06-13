// CyberGuard Scam Awareness Website JavaScript

// Global Variables
let scamReports = [];
let currentUser = null;

// Scam Information Database (unchanged from your original)
const scamDatabase = {
  // ... (your existing scamDatabase object remains exactly the same)
};

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
  setupEventListeners();
  loadScamReports();
  animateOnScroll();
  setupInteractiveFeatures();
});

// Initialize Website
function initializeWebsite() {
  console.log("CyberGuard Website Initialized");

  // Add loading animation to elements
  const elements = document.querySelectorAll(
    ".feature-box, .scam-card, .blog-card"
  );
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "all 0.6s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scam report form submission
  const scamForm = document.getElementById("scamReportForm");
  if (scamForm) {
    scamForm.addEventListener("submit", handleScamReportSubmission);
  }

  // Navbar background change on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(30, 61, 89, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.style.background =
        "linear-gradient(135deg, #1e3d59 0%, #17a2b8 100%)";
      navbar.style.backdropFilter = "none";
    }
  });

  // Form validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
}

// Show Scam Details Modal
function showScamDetails(scamType) {
  const scamInfo = scamDatabase[scamType];
  if (!scamInfo) return;

  const modal = new bootstrap.Modal(document.getElementById("scamModal"));
  const modalTitle = document.getElementById("scamModalTitle");
  const modalBody = document.getElementById("scamModalBody");

  modalTitle.textContent = scamInfo.title;

  modalBody.innerHTML = `
        <div class="scam-details">
            <div class="mb-4">
                <h5 class="text-primary"><i class="fas fa-info-circle me-2"></i>What is it?</h5>
                <p>${scamInfo.description}</p>
            </div>
            
            <div class="mb-4">
                <h5 class="text-warning"><i class="fas fa-cogs me-2"></i>How it Works</h5>
                <ul>
                    ${scamInfo.howItWorks
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="mb-4">
                <h5 class="text-danger"><i class="fas fa-exclamation-triangle me-2"></i>Warning Signs</h5>
                <ul>
                    ${scamInfo.warningSigns
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="mb-4">
                <h5 class="text-success"><i class="fas fa-shield-alt me-2"></i>Prevention Tips</h5>
                <ul>
                    ${scamInfo.prevention
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="mb-4">
                <h5 class="text-info"><i class="fas fa-list me-2"></i>Common Examples</h5>
                <ul>
                    ${scamInfo.examples
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="alert alert-warning">
                <i class="fas fa-lightbulb me-2"></i>
                <strong>Remember:</strong> When in doubt, don't engage. Verify independently through official channels and trust your instincts.
            </div>
        </div>
    `;

  modal.show();
}

// Handle Scam Report Submission
function handleScamReportSubmission(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const reportData = {
    id: Date.now(),
    reporterName: document.getElementById("reporterName").value,
    reporterEmail: document.getElementById("reporterEmail").value,
    scamType: document.getElementById("scamType").value,
    incidentDate: document.getElementById("incidentDate").value,
    scammerContact: document.getElementById("scammerContact").value,
    financialLoss: document.getElementById("financialLoss").value,
    description: document.getElementById("scamDescription").value,
    consent: document.getElementById("consent").checked,
    submissionDate: new Date().toISOString(),
    status: "pending",
  };

  // Validate form
  if (!validateScamReport(reportData)) {
    return;
  }

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Save report
    scamReports.push(reportData);
    saveScamReports();

    // Show success message
    showAlert(
      "success",
      "Thank you for your report! Your submission has been received and will help others stay safe from scams."
    );

    // Reset form
    e.target.reset();
    e.target.classList.remove("was-validated");

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Scroll to top of form
    document.getElementById("report").scrollIntoView({ behavior: "smooth" });
  }, 2000);
}

// Validate Scam Report
function validateScamReport(data) {
  const errors = [];

  if (!data.reporterName.trim()) {
    errors.push("Name is required");
  }

  if (!data.reporterEmail.trim() || !isValidEmail(data.reporterEmail)) {
    errors.push("Valid email is required");
  }

  if (!data.scamType) {
    errors.push("Scam type is required");
  }

  if (!data.incidentDate) {
    errors.push("Incident date is required");
  }

  if (!data.description.trim()) {
    errors.push("Description is required");
  }

  if (!data.consent) {
    errors.push("Consent is required");
  }

  if (errors.length > 0) {
    showAlert(
      "danger",
      "Please fix the following errors: " + errors.join(", ")
    );
    return false;
  }

  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show Alert
function showAlert(type, message) {
  const alertContainer = document.querySelector(".container");
  const alertElement = document.createElement("div");

  alertElement.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertElement.style.cssText =
    "top: 100px; right: 20px; z-index: 1060; max-width: 400px;";

  alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(alertElement);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertElement.parentNode) {
      alertElement.remove();
    }
  }, 5000);
}

// Load Scam Reports from Storage
function loadScamReports() {
  // Note: In a real application, this would load from a backend API
  // For demo purposes, we're using in-memory storage
  const savedReports = getStoredData("scamReports");
  if (savedReports) {
    scamReports = savedReports;
  }
}

// Save Scam Reports to Storage
function saveScamReports() {
  // Note: In a real application, this would save to a backend API
  // For demo purposes, we're using in-memory storage
  setStoredData("scamReports", scamReports);
}

// Storage utilities (using variables instead of localStorage for Claude.ai compatibility)
let storedData = {};

function getStoredData(key) {
  return storedData[key] || null;
}

function setStoredData(key, value) {
  storedData[key] = value;
}

// Animate on Scroll
function animateOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  const elements = document.querySelectorAll(
    ".feature-box, .scam-card, .blog-card, .resource-card"
  );
  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Generate Scam Report Statistics
function generateScamStatistics() {
  const stats = {
    totalReports: scamReports.length,
    scamTypes: {},
    financialLoss: 0,
    recentReports: 0,
  };

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  scamReports.forEach((report) => {
    // Count by scam type
    stats.scamTypes[report.scamType] =
      (stats.scamTypes[report.scamType] || 0) + 1;

    // Sum financial loss
    if (report.financialLoss) {
      stats.financialLoss += parseFloat(report.financialLoss);
    }

    // Count recent reports
    const reportDate = new Date(report.submissionDate);
    if (reportDate >= oneWeekAgo) {
      stats.recentReports++;
    }
  });

  return stats;
}

// Search Functionality
function searchScamDatabase(query) {
  const results = [];
  const searchTerm = query.toLowerCase();

  Object.keys(scamDatabase).forEach((scamType) => {
    const scam = scamDatabase[scamType];
    if (
      scam.title.toLowerCase().includes(searchTerm) ||
      scam.description.toLowerCase().includes(searchTerm) ||
      scam.warningSigns.some((sign) =>
        sign.toLowerCase().includes(searchTerm)
      ) ||
      scam.examples.some((example) =>
        example.toLowerCase().includes(searchTerm)
      )
    ) {
      results.push({
        type: scamType,
        ...scam,
      });
    }
  });

  return results;
}

// Setup Interactive Features
function setupInteractiveFeatures() {
  // Add hover effects to cards
  const cards = document.querySelectorAll(
    ".scam-card, .blog-card, .feature-box"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    });
  });

  // Add typing effect to hero text
  const heroTitle = document.querySelector(".hero-section h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
  }
}

// Export functions for external use
window.CyberGuard = {
  showScamDetails,
  generateScamStatistics,
  searchScamDatabase,
  scamDatabase,
};

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNavbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  const scrollTopBtn = document.getElementById("scrollTop");
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

const whatsappBtn = document.getElementById("whatsappBtn");
const whatsappModal = document.getElementById("whatsappModal");
const whatsappClose = document.getElementById("whatsappClose");

whatsappBtn.addEventListener("click", function () {
  whatsappModal.classList.add("show");
});

whatsappClose.addEventListener("click", function () {
  whatsappModal.classList.remove("show");
});

document.getElementById("scrollTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

Initialize;
loadScamReports();
animateOnScroll();
setupInteractiveFeatures();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "loadScamReports") {
    loadScamReports();
  }
});
