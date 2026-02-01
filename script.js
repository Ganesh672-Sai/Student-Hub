/* ================= PARTICLES ================= */
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.3,
    dy: Math.random() * 0.3
  }));

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x > canvas.width) p.x = 0;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================= REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("active"));
},{ threshold:0.15 });
reveals.forEach(el => observer.observe(el));

/* ================= CHATBOT ================= */
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.querySelector(".chat-window");
const chatMessages = document.getElementById("chatMessages");

if (chatToggle) {
  chatToggle.onclick = () => {
    chatWindow.style.display =
      chatWindow.style.display === "flex" ? "none" : "flex";
    chatWindow.style.flexDirection = "column";
  };
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.toLowerCase();
  if (!text) return;

  chatMessages.innerHTML += `<div style="text-align:right">🙂 ${input.value}</div>`;
  input.value = "";

  setTimeout(() => {
    if (text.includes("vision"))
      reply("🎯 Vision: Trusted student innovation ecosystem.");
    else if (text.includes("mission"))
      reply("🚀 Mission: Hands-on learning & real projects.");
    else if (text.includes("project"))
      redirect("projects.html");
    else if (text.includes("about"))
      redirect("about.html");
    else reply("Ask about vision, mission or say go to projects.");
  },500);
}

function reply(msg){
  chatMessages.innerHTML += `<div>🤖 ${msg}</div>`;
}

function redirect(page){
  reply("Redirecting...");
  setTimeout(()=>location.href=page,1200);
}
// Show survey highlight only once per user
document.addEventListener("DOMContentLoaded", () => {
  const survey = document.querySelector(".survey-highlight");

  if (!localStorage.getItem("surveySeen")) {
    survey.classList.add("show");
    localStorage.setItem("surveySeen", "true");
  }
});
