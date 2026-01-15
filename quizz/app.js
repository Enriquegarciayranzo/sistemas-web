// app.js con:
// - menú inicial (elegir modo)
// - 20 preguntas aleatorias
// - modo práctica (feedback inmediato)
// - modo examen (feedback solo al final)
// - practicar solo falladas
// - navegación Anterior/Siguiente
// - revisión final
// - historial de intentos
// - registro de fallos por pregunta
// - barajado de respuestas

let currentIndex = 0;
let score = 0;
let examQuestions = [];   // preguntas del examen actual
let userAnswers = [];     // letra original elegida ('A'...'D' o null)
let currentMode = "practice"; // 'practice' | 'exam'
let onlyWrongThisExam = false;

// DOM
const startContainerEl = document.getElementById("start-container");
const startPracticeBtn = document.getElementById("start-practice-btn");
const startExamBtn = document.getElementById("start-exam-btn");
const startWrongBtn = document.getElementById("start-wrong-btn");
const wrongInfoEl = document.getElementById("wrong-info");

const quizContainerEl = document.getElementById("quiz-container");
const resultsContainerEl = document.getElementById("results-container");

const questionTextEl = document.getElementById("question-text");
const answersContainerEl = document.getElementById("answers-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressEl = document.getElementById("progress");

const scoreTextEl = document.getElementById("score-text");
const reviewContainerEl = document.getElementById("review-container");
const historyContainerEl = document.getElementById("history-container");
const restartBtn = document.getElementById("restart-btn");
const menuBtn = document.getElementById("menu-btn");

// claves de almacenamiento
const HISTORY_KEY = "quizInteractionHistory";
const STATS_KEY = "quizInteractionStats";

// ---------- utilidades generales ----------

function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatearFecha(iso) {
  const d = new Date(iso);
  return d.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// ---------- historial de exámenes ----------

function cargarHistorial() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error leyendo historial:", e);
    return [];
  }
}

function guardarHistorial(attempt) {
  const history = cargarHistorial();
  history.push(attempt);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistorial(history);
}

function renderHistorial(history) {
  if (!history.length) {
    historyContainerEl.innerHTML = "<p class='history-item'>Todavía no hay intentos guardados.</p>";
    return;
  }

  const lines = history
    .map(
      (h, idx) =>
        `<div class="history-item">Intento ${idx + 1}: ${h.score}/${h.total} · ${formatearFecha(
          h.timestamp
        )} · Modo: ${h.mode === "exam" ? "Examen" : "Práctica"}</div>`
    )
    .join("");

  historyContainerEl.innerHTML = lines;
}

// ---------- estadísticas por pregunta (fallos) ----------

function cargarStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) {
      return { failuresPerQuestion: {} };
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error leyendo stats:", e);
    return { failuresPerQuestion: {} };
  }
}

function guardarStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function registrarResultadosEnStats() {
  const stats = cargarStats();
  if (!stats.failuresPerQuestion) stats.failuresPerQuestion = {};

  examQuestions.forEach((q, idx) => {
    const id = q.id;
    const chosenKey = userAnswers[idx];
    const correctKey = q.correctKey;

    if (!stats.failuresPerQuestion[id]) {
      stats.failuresPerQuestion[id] = { attempts: 0, wrong: 0 };
    }

    stats.failuresPerQuestion[id].attempts += 1;
    if (chosenKey !== correctKey) {
      stats.failuresPerQuestion[id].wrong += 1;
    }
  });

  guardarStats(stats);
}

function getPreguntasFalladasIds() {
  const stats = cargarStats();
  const map = stats.failuresPerQuestion || {};
  return Object.entries(map)
    .filter(([_, v]) => v.wrong > 0)
    .map(([id]) => Number(id));
}

function actualizarInfoFalladasInicio() {
  const falladasIds = getPreguntasFalladasIds();
  const num = falladasIds.length;
  if (num === 0) {
    wrongInfoEl.textContent = "Todavía no tienes preguntas con fallos registrados.";
    startWrongBtn.disabled = true;
  } else {
    wrongInfoEl.textContent = `Tienes ${num} preguntas con fallos previos.`;
    startWrongBtn.disabled = false;
  }
}

// ---------- generación de examen ----------

function generarNuevoExamen() {
  let pool = QUESTIONS.slice();

  if (onlyWrongThisExam) {
    const falladasIds = getPreguntasFalladasIds();
    const falladas = pool.filter((q) => falladasIds.includes(q.id));
    if (falladas.length > 0) {
      pool = falladas;
    }
  }

  pool = shuffleArray(pool);

  const NUM = 20;
  const seleccion = pool.slice(0, Math.min(NUM, pool.length));

  examQuestions = seleccion.map((q) => {
    const baseChoices = ["A", "B", "C", "D"].map((key) => ({
      key,
      text: q.options[key]
    }));

    const shuffledChoices = shuffleArray(baseChoices);

    return {
      id: q.id,
      question: q.question,
      choices: shuffledChoices,   // [{key,text},...]
      correctKey: q.correctOption // letra original correcta
    };
  });

  currentIndex = 0;
  score = 0;
  userAnswers = Array(examQuestions.length).fill(null);
}

// ---------- render pregunta ----------

function renderQuestion() {
  const q = examQuestions[currentIndex];

  progressEl.textContent = `Pregunta ${currentIndex + 1} de ${examQuestions.length}`;
  questionTextEl.textContent = q.question;
  feedbackEl.textContent = "";

  nextBtn.disabled = userAnswers[currentIndex] === null;
  prevBtn.disabled = currentIndex === 0;

  answersContainerEl.innerHTML = "";

  const letrasVisuales = ["A", "B", "C", "D"];

  q.choices.forEach((choice, idx) => {
    const visualLetter = letrasVisuales[idx];

    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.dataset.originalKey = choice.key;
    btn.innerHTML = `<span class="answer-label">${visualLetter}.</span> ${choice.text}`;

    btn.addEventListener("click", () => handleAnswerClick(choice.key));

    answersContainerEl.appendChild(btn);
  });

  if (userAnswers[currentIndex] !== null && currentMode === "practice") {
    marcarRespuestaGuardada();
  }
}

// ---------- responder ----------

function handleAnswerClick(chosenKey) {
  userAnswers[currentIndex] = chosenKey;

  if (currentMode === "practice") {
    marcarRespuestaGuardada();
  } else {
    const allButtons = answersContainerEl.querySelectorAll(".answer-btn");
    allButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled");
    });
    feedbackEl.textContent = "Respuesta guardada. Pulsa Siguiente cuando quieras.";
  }

  nextBtn.disabled = false;
}

function marcarRespuestaGuardada() {
  const q = examQuestions[currentIndex];
  const chosen = userAnswers[currentIndex];
  const allButtons = answersContainerEl.querySelectorAll(".answer-btn");

  allButtons.forEach((btn) => {
    const originalKey = btn.dataset.originalKey;
    btn.classList.remove("correct", "incorrect", "disabled");
    btn.disabled = true;
    btn.classList.add("disabled");

    if (originalKey === q.correctKey) {
      btn.classList.add("correct");
    }

    if (originalKey === chosen && chosen !== q.correctKey) {
      btn.classList.add("incorrect");
    }
  });

  if (chosen === q.correctKey) {
    feedbackEl.textContent = "✅ ¡Correcto!";
  } else {
    feedbackEl.textContent = `❌ Incorrecto. La correcta era ${q.correctKey}.`;
  }
}

// ---------- nota y revisión ----------

function calcularScore() {
  score = userAnswers.reduce((acc, ans, idx) => {
    const q = examQuestions[idx];
    if (ans === q.correctKey) return acc + 1;
    return acc;
  }, 0);
}

function renderReview() {
  const letrasVisuales = ["A", "B", "C", "D"];

  const items = examQuestions.map((q, idx) => {
    const chosenKey = userAnswers[idx];
    const correctKey = q.correctKey;
    const choices = q.choices;

    let chosenVisual = "-";
    let chosenText = "(sin respuesta)";

    if (chosenKey) {
      const posElegida = choices.findIndex((c) => c.key === chosenKey);
      if (posElegida >= 0) {
        chosenVisual = letrasVisuales[posElegida];
        chosenText = choices[posElegida].text;
      }
    }

    const posCorrecta = choices.findIndex((c) => c.key === correctKey);
    const correctVisual = posCorrecta >= 0 ? letrasVisuales[posCorrecta] : correctKey;
    const correctText = posCorrecta >= 0 ? choices[posCorrecta].text : "(no encontrado)";

    const isCorrect = chosenKey === correctKey;

    return `
      <div class="review-item ${isCorrect ? "correct" : "incorrect"}">
        <div class="review-q">${idx + 1}. ${q.question}</div>
        <div class="review-line">
          Tu respuesta: <strong>${chosenVisual}</strong> — ${chosenText}
        </div>
        <div class="review-line">
          Correcta: <strong>${correctVisual}</strong> — ${correctText}
        </div>
      </div>
    `;
  });

  reviewContainerEl.innerHTML = items.join("");
}

function showResults() {
  calcularScore();

  quizContainerEl.classList.add("hidden");
  resultsContainerEl.classList.remove("hidden");

  scoreTextEl.textContent = `Has acertado ${score} de ${examQuestions.length} preguntas.`;

  renderReview();
  registrarResultadosEnStats();

  const attempt = {
    timestamp: new Date().toISOString(),
    score,
    total: examQuestions.length,
    mode: currentMode
  };
  guardarHistorial(attempt);

  actualizarInfoFalladasInicio(); // actualizar para el menú
}

// ---------- navegación ----------

nextBtn.addEventListener("click", () => {
  if (currentIndex < examQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResults();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
});

// Repetir mismo modo
restartBtn.addEventListener("click", () => {
  generarNuevoExamen();
  resultsContainerEl.classList.add("hidden");
  quizContainerEl.classList.remove("hidden");
  reviewContainerEl.innerHTML = "";
  renderQuestion();
});

// Volver al menú
menuBtn.addEventListener("click", () => {
  resultsContainerEl.classList.add("hidden");
  quizContainerEl.classList.add("hidden");
  startContainerEl.classList.remove("hidden");
  reviewContainerEl.innerHTML = "";
});

// ---------- menú inicial ----------

startPracticeBtn.addEventListener("click", () => {
  currentMode = "practice";
  onlyWrongThisExam = false;
  startContainerEl.classList.add("hidden");
  resultsContainerEl.classList.add("hidden");
  quizContainerEl.classList.remove("hidden");
  generarNuevoExamen();
  renderQuestion();
});

startExamBtn.addEventListener("click", () => {
  currentMode = "exam";
  onlyWrongThisExam = false;
  startContainerEl.classList.add("hidden");
  resultsContainerEl.classList.add("hidden");
  quizContainerEl.classList.remove("hidden");
  generarNuevoExamen();
  renderQuestion();
});

startWrongBtn.addEventListener("click", () => {
  currentMode = "practice"; // normalmente solo falladas interesa con feedback
  onlyWrongThisExam = true;
  startContainerEl.classList.add("hidden");
  resultsContainerEl.classList.add("hidden");
  quizContainerEl.classList.remove("hidden");
  generarNuevoExamen();
  renderQuestion();
});

// ---------- inicio ----------

(function init() {
  quizContainerEl.classList.add("hidden");
  resultsContainerEl.classList.add("hidden");
  startContainerEl.classList.remove("hidden");

  renderHistorial(cargarHistorial());
  actualizarInfoFalladasInicio();
})();
