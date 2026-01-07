// Mobile nav
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Estimate calculator (simple starting estimates)
const estimateForm = document.getElementById("estimateForm");
const estimateResult = document.getElementById("estimateResult");

const pricing = {
  "Screen Replacement": { iPhone: [119, 249], Samsung: [129, 279], "Google Pixel": [129, 269], "Other Android": [99, 229] },
  "Battery Replacement": { iPhone: [59, 129], Samsung: [69, 139], "Google Pixel": [69, 149], "Other Android": [49, 129] },
  "Charging Port Repair": { iPhone: [69, 159], Samsung: [79, 169], "Google Pixel": [79, 169], "Other Android": [59, 149] },
  "Water Damage Diagnostic": { iPhone: [39, 89], Samsung: [39, 89], "Google Pixel": [39, 89], "Other Android": [39, 89] },
  "Camera / Mic / Speaker": { iPhone: [69, 199], Samsung: [79, 219], "Google Pixel": [79, 219], "Other Android": [59, 189] }
};

if (estimateForm && estimateResult) {
  estimateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const device = document.getElementById("device").value;
    const issue = document.getElementById("issue").value;

    const range = pricing[issue]?.[device];
    if (!range) {
      estimateResult.innerHTML = `<strong>Estimate:</strong> Please contact us for this device/issue.`;
      return;
    }

    const [low, high] = range;
    estimateResult.innerHTML =
      `<strong>Estimate:</strong> $${low}–$${high} <span class="muted">(starting range)</span><br/>
       <span class="muted small">We confirm final pricing by exact model and part type.</span>`;
  });
}

// Contact form: opens user's email app (no backend needed)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const device = document.getElementById("deviceField").value.trim();
    const issue = document.getElementById("issueField").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`Repair Request - ${device} (${issue})`);
    const body = encodeURIComponent(
`Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}
Device: ${device}
Issue: ${issue}

Message:
${message || "N/A"}

Preferred time to visit:
`
    );

    // Change this email to yours:
    const to = "repairs@phonerepairstulsa.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
