const KEYWORD_BANK = {
  easy: [
    "what is", "define", "name the", "list", "who", "when", "where",
    "identify", "state the", "recall", "which of the following", "true or false"
  ],
  medium: [
    "explain", "describe", "compare", "calculate", "solve", "find the value",
    "apply", "illustrate", "summarize", "classify", "differentiate", "convert"
  ],
  hard: [
    "prove", "derive", "analyze", "evaluate", "critique", "justify",
    "design an algorithm", "optimize", "synthesize", "formulate", "construct a proof",
    "time complexity", "master theorem", "np-complete", "reduce to", "counter-example",
    "prove by induction", "eigenvalue", "differential equation", "asymptotic",
    "recurrence relation", "big-o", "space complexity", "dynamic programming",
    "np-hard", "turing machine", "lagrangian", "integral", "derivative", "matrix inverse"
  ]
};

// Subject-specific bonus terms
const SUBJECT_HARD_TERMS = {
  math: ["integral", "derivative", "eigenvalue", "matrix", "differential", "proof", "theorem", "limit"],
  cs: ["algorithm", "complexity", "recursion", "np-hard", "graph traversal", "dynamic programming", "big-o"],
  science: ["thermodynamics", "quantum", "entropy", "reaction mechanism", "equilibrium constant"],
  reasoning: ["syllogism", "puzzle", "arrangement", "blood relation", "coding-decoding"],
  general: []
};

function analyze() {
  const rawText = document.getElementById("question").value.trim();
  const subject = document.getElementById("subject").value;
  const resultCard = document.getElementById("resultCard");
  const badge = document.getElementById("badge");
  const barFill = document.getElementById("barFill");
  const scoreLine = document.getElementById("scoreLine");
  const reasonsList = document.getElementById("reasons");

  reasonsList.innerHTML = "";

  if (!rawText) {
    resultCard.classList.add("show");
    badge.textContent = "No input";
    badge.className = "badge";
    barFill.style.width = "0%";
    scoreLine.textContent = "";
    const li = document.createElement("li");
    li.textContent = "Please type or paste a question first.";
    reasonsList.appendChild(li);
    return;
  }

  const text = rawText.toLowerCase();
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;

  let score = 0;
  const reasons = [];

  // 1. Keyword matching
  let easyHits = 0, medHits = 0, hardHits = 0;
  KEYWORD_BANK.easy.forEach(k => { if (text.includes(k)) easyHits++; });
  KEYWORD_BANK.medium.forEach(k => { if (text.includes(k)) medHits++; });
  KEYWORD_BANK.hard.forEach(k => { if (text.includes(k)) hardHits++; });

  score += easyHits * 1;
  score += medHits * 3;
  score += hardHits * 6;

  if (hardHits > 0) reasons.push(`Contains ${hardHits} advanced/technical keyword(s) (e.g. proof, derive, complexity terms).`);
  if (medHits > 0) reasons.push(`Contains ${medHits} moderate-complexity keyword(s) (e.g. explain, calculate, compare).`);
  if (easyHits > 0 && hardHits === 0 && medHits === 0) reasons.push(`Mostly recall-based phrasing (e.g. define, list, what is).`);

  // 2. Subject-specific technical terms
  const subjectTerms = SUBJECT_HARD_TERMS[subject] || [];
  let subjectHits = 0;
  subjectTerms.forEach(t => { if (text.includes(t)) subjectHits++; });
  if (subjectHits > 0) {
    score += subjectHits * 4;
    reasons.push(`Uses ${subjectHits} subject-specific advanced term(s) for "${subject}".`);
  }

  // 3. Sentence / question length (longer & multi-clause = harder)
  if (wordCount > 40) {
    score += 6;
    reasons.push(`Question is long (${wordCount} words) — suggests multi-step reasoning.`);
  } else if (wordCount > 20) {
    score += 3;
    reasons.push(`Moderate length (${wordCount} words).`);
  } else {
    reasons.push(`Short and direct (${wordCount} words).`);
  }

  // 4. Multiple sub-questions (semicolons, "and", numbered parts)
  const subParts = (rawText.match(/;|\band\b|\(i\)|\(ii\)|\(iii\)|part\s*\d/gi) || []).length;
  if (subParts >= 2) {
    score += 5;
    reasons.push(`Appears to have multiple parts/sub-questions (${subParts} detected).`);
  }

  // 5. Presence of numeric/mathematical expressions
  const hasMath = /[0-9]+\s*[\+\-\*\/\^=]\s*[0-9]/.test(rawText) || /∑|∫|√|π|θ/.test(rawText);
  if (hasMath) {
    score += 4;
    reasons.push(`Contains numerical/mathematical expressions.`);
  }

  // 6. Negation / conditional complexity ("if...then", "unless", "except")
  const conditionalHits = (text.match(/\bif\b|\bunless\b|\bexcept\b|\bwhereas\b|\bhowever\b/g) || []).length;
  if (conditionalHits > 0) {
    score += conditionalHits * 2;
    reasons.push(`Includes conditional/logical connectors (${conditionalHits}), adding reasoning load.`);
  }

  // Normalize score to 0-100 scale for the progress bar (cap at ~40 raw points)
  const normalized = Math.min(100, Math.round((score / 40) * 100));

  // Classify
  let level, badgeClass;
  if (score <= 6) {
    level = "Easy";
    badgeClass = "Easy";
  } else if (score <= 16) {
    level = "Medium";
    badgeClass = "Medium";
  } else {
    level = "Hard";
    badgeClass = "Hard";
  }

  if (reasons.length === 0) {
    reasons.push("No strong difficulty signals detected — treated as a straightforward question.");
  }

  // Render results
  resultCard.classList.add("show");
  badge.textContent = level;
  badge.className = "badge " + badgeClass;
  barFill.style.width = normalized + "%";
  scoreLine.textContent = `Raw score: ${score} · Normalized: ${normalized}/100`;

  reasons.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    reasonsList.appendChild(li);
  });
}
