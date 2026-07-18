# Intelligent Question Difficulty Analyzer

A lightweight, fully client-side web app that predicts the difficulty level
(Easy / Medium / Hard) of a competitive exam question using keyword and
heuristic-based NLP scoring — no backend or API keys required.

## Features
- Keyword-weighted scoring (recall verbs vs. analytical/proof verbs)
- Subject-aware bonus scoring (Math, CS, Science, Reasoning)
- Detects multi-part questions, mathematical expressions, and conditional logic
- Visual difficulty badge + progress bar with explanation of *why* a score was given

## How it works
1. User pastes a question and picks a subject.
2. `script.js` scans the text against curated keyword banks (`easy`, `medium`, `hard`)
   and subject-specific technical terms.
3. Additional heuristics add points for question length, multiple sub-parts,
   math symbols, and logical connectors (if/unless/except).
4. The total score is normalized and mapped to a difficulty label with a
   human-readable list of reasons.

## Tech Stack
- HTML5 / CSS3 (no frameworks)
- Vanilla JavaScript (no dependencies)

## Run locally
Just open `index.html` in any browser — no build step or server needed.

## Possible future upgrades
- Swap heuristic engine for a real ML/NLP model (e.g. TF-IDF + logistic regression, or a small transformer)
- Add a labeled dataset of exam questions to train/validate the scoring weights
- Export analysis history and add a difficulty trend dashboard

## For resume framing
> Built an intelligent question-difficulty classification tool using a custom
> keyword/heuristic scoring engine in vanilla JavaScript, featuring subject-aware
> analysis, multi-factor scoring (linguistic complexity, structure, math content),
> and a live visual feedback UI.
