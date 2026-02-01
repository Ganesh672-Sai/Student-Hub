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

/* ================= REVEAL ON SCROLL ================= */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("active"));
},{ threshold:0.15 });
reveals.forEach(el => observer.observe(el));

/* ================= CODE EDITOR ================= */
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

  if (lang === "c") {
    valid =
      code.includes("#include") &&
      code.includes("int main") &&
      code.includes("printf") &&
      hasAdditionLogic(code);
  }
  else if (lang === "cpp") {
    valid =
      code.includes("#include") &&
      code.includes("int main") &&
      (code.includes("cout") || code.includes("printf")) &&
      hasAdditionLogic(code);
  }
  else if (lang === "java") {
    valid =
      code.includes("class") &&
      code.includes("public static void main") &&
      code.includes("System.out.print") &&
      hasAdditionLogic(code);
  }
  else if (lang === "python") {
    valid =
      !code.includes("#include") &&
      !code.includes("int main") &&
      code.includes("print") &&
      hasAdditionLogic(code);
  }

  if (!valid) {
    resultBox.innerText = "❌ Language or Logic Error";
    resultBox.className = "wrong";
    return;
  }

  outputBox.innerText = expectedOutput;
  resultBox.innerText = "✅ Accepted";
  resultBox.className = "accepted";
});

resetBtn.addEventListener("click", () => {
  editor.value = "";
  outputBox.innerText = "";
  resultBox.innerText = "";
});

/* ================= SURVEY HIGHLIGHT ================= */
document.addEventListener("DOMContentLoaded", () => {
  const survey = document.querySelector(".survey-highlight");
  if (!localStorage.getItem("surveySeen")) {
    survey.classList.add("show");
    localStorage.setItem("surveySeen", "true");
  }
});
