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

/* ================= REVEAL ON SCROLL ================= */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("active");
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

/* ================= MINI CODECHEF STRICT JUDGE ================= */
const expectedOutput = "5";

const editor = document.getElementById("code-editor");
const runBtn = document.getElementById("run");
const resetBtn = document.getElementById("reset");
const outputBox = document.getElementById("output");
const resultBox = document.getElementById("result");
const languageSelect = document.getElementById("language");

function isBalanced(code, open, close) {
  let count = 0;
  for (let c of code) {
    if (c === open) count++;
    if (c === close) count--;
    if (count < 0) return false;
  }
  return count === 0;
}

if (runBtn) {
  runBtn.addEventListener("click", () => {
    const code = editor.value.trim();
    const lang = languageSelect.value;

    outputBox.innerText = "";
    resultBox.innerText = "";

    if (!code) {
      resultBox.innerText = "⚠️ Please write code";
      resultBox.className = "wrong";
      return;
    }

    let valid = false;

    /* ---- C ---- */
    if (lang === "c") {
      valid =
        code.includes("#include") &&
        code.includes("int main") &&
        code.includes("printf") &&
        code.includes("+") &&
        isBalanced(code, "{", "}") &&
        isBalanced(code, "(", ")");
    }

    /* ---- C++ ---- */
    else if (lang === "cpp") {
      valid =
        code.includes("#include") &&
        code.includes("int main") &&
        (code.includes("cout") || code.includes("printf")) &&
        code.includes("+") &&
        isBalanced(code, "{", "}") &&
        isBalanced(code, "(", ")");
    }

    /* ---- JAVA ---- */
    else if (lang === "java") {
      valid =
        code.includes("class") &&
        code.includes("public static void main") &&
        code.includes("System.out") &&
        code.includes("+") &&
        isBalanced(code, "{", "}") &&
        isBalanced(code, "(", ")");
    }

    /* ---- PYTHON ---- */
    else if (lang === "python") {
      valid =
        code.includes("print") &&
        code.includes("+") &&
        isBalanced(code, "(", ")") &&
        !code.includes("#include") &&
        !code.includes("int main");
    }

    if (!valid) {
      resultBox.innerText = "❌ Compilation Error";
      resultBox.className = "wrong";
      return;
    }

    outputBox.innerText = expectedOutput;
    resultBox.innerText = "✅ Accepted";
    resultBox.className = "accepted";
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    editor.value = "";
    outputBox.innerText = "";
    resultBox.innerText = "";
  });
}

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
      if (type === "projects") {
        addBotMessage("Opening Projects 📂");
        setTimeout(() => location.href = "projects.html", 1000);
      }

      if (type === "resources") {
        addBotMessage("Opening Resources 📘");
        setTimeout(() => location.href = "resources.html", 1000);
      }

      if (type === "contest") {
        addBotMessage("Opening Contests 🏆");
        setTimeout(() => location.href = "contests.html", 1000);
      }

      if (type === "contact") {
        addBotMessage("Opening Contact Page 📩");
        setTimeout(() => location.href = "contact.html", 1000);
      }
    }, 500);
  };
});
