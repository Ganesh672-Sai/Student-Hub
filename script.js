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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
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

/* ================= TIMER ================= */
let timerInterval = null;
let seconds = 0;
const timerEl = document.getElementById("timer");

function startTimer() {
  if (!timerEl) return;
  stopTimer();
  seconds = 0;
  timerEl.innerText = "⏱ 00:00";

  timerInterval = setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    timerEl.innerText = `⏱ ${m}:${s}`;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/* ================= MINI CODECHEF ================= */
const expectedOutput = "5";

const editor = document.getElementById("code-editor");
const runBtn = document.getElementById("run");
const resetBtn = document.getElementById("reset");
const outputBox = document.getElementById("output");
const resultBox = document.getElementById("result");
const languageSelect = document.getElementById("language");

function hasAdditionLogic(code) {
  return code.includes("+");
}

runBtn?.addEventListener("click", () => {
  startTimer();

  const code = editor.value.trim();
  const lang = languageSelect.value;

  outputBox.innerText = "";
  resultBox.innerText = "";

  if (!code) {
    stopTimer();
    resultBox.innerText = "⚠️ Please write code";
    resultBox.className = "wrong";
    return;
  }

  let valid = false;

  if (lang === "c") {
    valid = code.includes("#include") && code.includes("int main") &&
            code.includes("printf") && hasAdditionLogic(code);
  } 
  else if (lang === "cpp") {
    valid = code.includes("#include") && code.includes("int main") &&
            (code.includes("cout") || code.includes("printf")) &&
            hasAdditionLogic(code);
  } 
  else if (lang === "java") {
    valid = code.includes("class") &&
            code.includes("public static void main") &&
            code.includes("System.out") &&
            hasAdditionLogic(code);
  } 
  else if (lang === "python") {
    valid = code.includes("print") && hasAdditionLogic(code);
  }

  setTimeout(() => {
    stopTimer();

    if (!valid) {
      resultBox.innerText = "❌ Wrong Answer";
      resultBox.className = "wrong";
      return;
    }

    outputBox.innerText = expectedOutput;
    resultBox.innerText = "✅ Accepted";
    resultBox.className = "accepted";
  }, 800);
});

resetBtn?.addEventListener("click", () => {
  stopTimer();
  if (timerEl) timerEl.innerText = "⏱ 00:00";
  editor.value = "";
  outputBox.innerText = "";
  resultBox.innerText = "";
});

/* ================= CHATBOT ================= */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("chatbotToggle");
  const box = document.getElementById("chatbotBox");
  const close = document.getElementById("closeChatbot");
  const messages = document.getElementById("chatMessages");

  if (!toggle || !box) return;

  toggle.onclick = () => box.style.display = "flex";
  close.onclick = () => box.style.display = "none";

  window.addBotMessage = (text) => {
    const msg = document.createElement("div");
    msg.className = "bot-msg";
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  };

  window.addUserMessage = (text) => {
    const msg = document.createElement("div");
    msg.className = "user-msg";
    msg.innerText = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  };

  window.botReply = (type) => {
    addUserMessage(type);
    setTimeout(() => {
      if (type === "projects") location.href = "projects.html";
      if (type === "resources") location.href = "resources.html";
      if (type === "contest") location.href = "contests.html";
      if (type === "contact") location.href = "contact.html";
    }, 700);
  };
});
/* ================= FAQ ACCORDION ================= */
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});
