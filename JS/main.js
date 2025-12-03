document.addEventListener("DOMContentLoaded", () => {
  // ===== ELEMENT REFERENCES =====
  const waitlistForm = document.getElementById("waitlistForm");
  const waitlistEmail = document.getElementById("waitlistEmail");
  const subscribeForm = document.getElementById("subscribeForm");
  const subscribeEmail = document.getElementById("subscribeEmail");

  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  const popupContent = document.getElementById("popupContent");
  const closePopup = document.getElementById("closePopup");

  const confettiCanvas = document.getElementById("confettiCanvas");
  const ctx = confettiCanvas?.getContext("2d");
  let confetti = [];

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const mainContent = document.getElementById("main-content");

  const tipsContainer = document.getElementById("tipsContainer");
  const newTipBtn = document.getElementById("newTipBtn");
  const tips = [
    "Use public transport or carpool to reduce CO₂ emissions.",
    "Turn off lights and unplug devices when not in use.",
    "Adopt a plant-based diet 2-3 times a week.",
    "Collect rainwater for gardening and cleaning purposes.",
    "Support local and sustainable businesses.",
    "Recycle and compost household waste to minimize landfill contributions.",
    "Use energy-efficient appliances and LED lighting.",
    "Utilize solar energy whenever possible.",
    "Invest in plastic-free food storage containers.",
    "Donate or upcycle what you don't want.",
    "Invest in reusable bags.",
    "Use recycled and eco-friendly wrapping paper materials.",
    "Volunteer for local organizations.",
    "Donate when you can.",
  ];

  // ===== CANVAS RESIZE =====
  function resizeCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // ===== CONFETTI =====
  function createConfetti() {
    confetti = [];
    for (let i = 0; i < 80; i++) {
      confetti.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 1 + 0.5,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      });
    }
  }

  function drawConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.y += c.d * 3;
      if (c.y > confettiCanvas.height) c.y = -10;
    });
  }

  function startConfetti() {
    createConfetti();
    const duration = 3000;
    const start = Date.now();
    const animate = () => {
      if (Date.now() - start < duration) {
        drawConfetti();
        requestAnimationFrame(animate);
      } else if (ctx) {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    };
    animate();
  }

  // ===== POPUP =====
  function showPopup(message) {
    popupText.textContent = message;
    popup.classList.remove("hidden", "opacity-0", "pointer-events-none");
    popup.classList.add("opacity-100");
    popupContent.classList.remove("scale-90", "opacity-0");
    popupContent.classList.add("scale-100", "opacity-100");
    startConfetti();
  }

  function hidePopup() {
    popupContent.classList.remove("scale-100", "opacity-100");
    popupContent.classList.add("scale-90", "opacity-0");
    setTimeout(() => {
      popup.classList.add("hidden");
      popup.classList.remove("opacity-100");
      popup.classList.add("opacity-0", "pointer-events-none");
    }, 250);
  }

  closePopup?.addEventListener("click", hidePopup);
  popup?.addEventListener("click", e => {
    if (e.target === popup) hidePopup();
  });

  // ===== WAITLIST FORM =====
  if (waitlistForm) {
    waitlistForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = waitlistEmail.value.trim();
      if (!email) return alert("Please enter a valid email.");

      let waitlist = JSON.parse(localStorage.getItem("waitlist")) || [];
      if (!waitlist.includes(email)) {
        waitlist.push(email);
        localStorage.setItem("waitlist", JSON.stringify(waitlist));
        showPopup("🎉 Thank you for joining the waitlist! We’ll notify you soon.");
      } else {
        showPopup("You're already on the waitlist!", "Thanks for staying with us.");
      }
      waitlistForm.reset();
    });
  }

  // ===== SUBSCRIBE FORM =====
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = subscribeEmail.value.trim();
      if (!email) return alert("Please enter a valid email.");

      let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
        showPopup("🎉 Thank you for subscribing!", "You will start receiving updates soon.");
      } else {
        showPopup("You're already subscribed!", "Thanks for staying with us.");
      }
      subscribeForm.reset();
    });
  }

  // ===== SIDEBAR =====
  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    mainContent?.classList.add("blurred");
  }
  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    mainContent?.classList.remove("blurred");
  }

  menuBtn?.addEventListener("click", openSidebar);
  closeBtn?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  // ===== TIPS =====
  function showTip() {
    if (!tipsContainer) return;
    const tip = tips[Math.floor(Math.random() * tips.length)];
    tipsContainer.innerHTML = `<p class="fade-in-tip">${tip}</p>`;
  }
  if (tipsContainer && newTipBtn) {
    showTip();
    newTipBtn.addEventListener("click", showTip);
  }

  // ===== FADE-IN ANIMATION =====
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-element");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".feature-card, .text-center, .max-w-4xl > div").forEach(el => observer.observe(el));

  // ===== LOGIN / REGISTER DEMO =====
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      alert(`Logged in with ${email} (Demo only)`);
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      alert(`Account created for ${name} (Demo only)`);
      window.location.href = "login.html";
    });
  }
});
