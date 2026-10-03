document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);
reveals.forEach((el) => io.observe(el));

// Mobile hamburger menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Cursor glow (desktop only)
if (window.matchMedia("(pointer: fine)").matches) {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 30;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(52,211,153,.09), transparent 65%);
    transform: translate(-50%, -50%); transition: opacity .3s;
    left: 0; top: 0; opacity: 0;
  `;
  document.body.appendChild(glow);
  let mx = 0,
    my = 0,
    gx = 0,
    gy = 0;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.opacity = "1";
  });
  const loop = () => {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();
}

// ---- CONTACT FORM: AJAX submit + toast + reset ----
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const toastText = toast.querySelector(".toast-text");
const toastIcon = toast.querySelector(".toast-icon");
let toastTimer;

function showToast(message, type = "success") {
  toastText.textContent = message;
  toastIcon.textContent = type === "success" ? "✓" : "!";
  toast.classList.toggle("error", type === "error");
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        showToast("Message sent — I'll get back to you soon.", "success");
      } else {
        const err = await response.json().catch(() => ({}));
        const msg =
          err?.errors?.[0]?.message ||
          "Something went wrong. Try again or email me directly.";
        showToast(msg, "error");
      }
    } catch (err) {
      showToast(
        "Network error. Please try again or email me directly.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
