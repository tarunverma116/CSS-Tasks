const questions = [
  {
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "define", "dim"],
    answer: 1,
    explanation: "The let keyword declares a variable limited to its block."
  },
  {
    question: "Which operator checks strict equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: 2,
    explanation: "The === operator compares values without converting their types."
  },
  {
    question: "Which array method adds an item to the end?",
    options: ["pop()", "push()", "shift()", "slice()"],
    answer: 1,
    explanation: "push() adds one or more items to the end of an array."
  },
  {
    question: "Which value is a Boolean?",
    options: ['"true"', "25", "true", "undefined"],
    answer: 2,
    explanation: "true is a Boolean value. The text \"true\" is a string."
  },
  {
    question: "Which method converts JSON text into a JavaScript value?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.read()"
    ],
    answer: 1,
    explanation: "JSON.parse() reads JSON text and converts it into a JavaScript value."
  }
];

const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const explanationElement = document.getElementById("explanation");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const resultElement = document.getElementById("result");
const reviewElement = document.getElementById("review");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerId = null;
let answered = false;
let wrongAnswers = [];

function startQuiz() {
  clearInterval(timerId);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  answered = false;
  wrongAnswers = [];

  scoreElement.textContent = "Score: 0";
  resultElement.textContent = "";
  reviewElement.innerHTML = "";
  reviewElement.hidden = true;
  nextButton.hidden = false;
  nextButton.textContent = "Next";

  showQuestion();
}

function showQuestion() {
  clearInterval(timerId);

  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }

  answered = false;
  timeLeft = 30;

  const current = questions[currentQuestionIndex];

  questionNumber.textContent =
    `Q${currentQuestionIndex + 1}/${questions.length}`;
  scoreElement.textContent = `Score: ${score}`;
  progressBar.style.width =
    `${(currentQuestionIndex / questions.length) * 100}%`;
  timerElement.textContent = timeLeft;
  questionElement.textContent = current.question;
  optionsElement.innerHTML = "";
  explanationElement.textContent = "";
  nextButton.disabled = true;

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index));
    optionsElement.appendChild(button);
  });

  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft -= 1;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timerId);
    selectAnswer(-1);
  }
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  clearInterval(timerId);

  const current = questions[currentQuestionIndex];
  const optionButtons = optionsElement.querySelectorAll(".option");
  const isCorrect = selectedIndex === current.answer;

  if (isCorrect) {
    score += 1;
  } else {
    wrongAnswers.push({
      question: current.question,
      selectedAnswer: selectedIndex === -1
        ? "No answer (time expired)"
        : current.options[selectedIndex],
      correctAnswer: current.options[current.answer],
      explanation: current.explanation
    });
  }

  optionButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === current.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  scoreElement.textContent = `Score: ${score}`;

  if (isCorrect) {
    explanationElement.textContent = `Correct! ${current.explanation}`;
  } else if (selectedIndex === -1) {
    explanationElement.textContent = `Time's up! ${current.explanation}`;
  } else {
    explanationElement.textContent = `Incorrect. ${current.explanation}`;
  }

  nextButton.disabled = false;
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = "Finish";
  }
}

function showResult() {
  clearInterval(timerId);
  questionNumber.textContent = "Completed";
  progressBar.style.width = "100%";
  timerElement.textContent = "0";
  questionElement.textContent = "Quiz Completed!";
  optionsElement.innerHTML = "";
  explanationElement.textContent = "";
  nextButton.hidden = true;

  let rating;
  if (score === questions.length) {
    rating = "Excellent! Perfect score!";
  } else if (score >= Math.ceil(questions.length * 0.6)) {
    rating = "Good job! Keep practising.";
  } else {
    rating = "Keep practising. You can improve!";
  }

  resultElement.innerHTML = "";
  const finalScore = document.createElement("h2");
  finalScore.textContent = `Final Score: ${score}/${questions.length}`;
  const ratingMessage = document.createElement("p");
  ratingMessage.textContent = rating;
  resultElement.append(finalScore, ratingMessage);

  showWrongAnswers();
}

function showWrongAnswers() {
  reviewElement.hidden = false;
  reviewElement.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent = "Review Wrong Answers";
  reviewElement.appendChild(heading);

  if (wrongAnswers.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No wrong answers. Well done!";
    reviewElement.appendChild(message);
    return;
  }

  wrongAnswers.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "review-item";

    const question = document.createElement("strong");
    question.textContent = `${index + 1}. ${item.question}`;

    const selected = document.createElement("p");
    selected.textContent = `Your answer: ${item.selectedAnswer}`;

    const correct = document.createElement("p");
    correct.textContent = `Correct answer: ${item.correctAnswer}`;

    const explanation = document.createElement("p");
    explanation.textContent = `Explanation: ${item.explanation}`;

    card.append(question, selected, correct, explanation);
    reviewElement.appendChild(card);
  });
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  currentQuestionIndex += 1;
  showQuestion();
});

restartButton.addEventListener("click", startQuiz);

startQuiz();