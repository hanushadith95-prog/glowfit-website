
/* =========================
   GLOWFIT NAVBAR
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const searchToggle = document.getElementById("searchToggle");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Mobile dropdown menu
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after selecting a link
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Search field toggle
searchToggle.addEventListener("click", function () {
    searchForm.classList.toggle("search-open");

    if (searchForm.classList.contains("search-open")) {
        searchInput.focus();
    }
});

// Search submission
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (query) {
        alert("Search for: " + query);
    }
});

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.closest(".navbar")) {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }
});


/* =========================
   QUIZ QUESTIONS
========================= */

const questions = [
    {
        category: "HEALTHY HABITS",
        question: "1. Why is drinking enough water important?",
        options: [
            "It helps maintain hydration",
            "It replaces the need for food",
            "It prevents the need for sleep",
            "It builds muscles instantly"
        ],
        answer: 0,
        explanation: "Water supports hydration and normal body functions."
    },
    {
        category: "FITNESS KNOWLEDGE",
        question: "2. What should you do before an intense workout?",
        options: [
            "Skip all preparation",
            "Warm up your body",
            "Eat a very large meal",
            "Avoid moving"
        ],
        answer: 1,
        explanation: "A warm-up gradually prepares your body for exercise."
    },
    {
        category: "BETTER LIFESTYLE",
        question: "3. Why is getting enough sleep important?",
        options: [
            "It removes the need for exercise",
            "It guarantees you never feel tired",
            "It supports recovery and overall health",
            "It means you can skip meals"
        ],
        answer: 2,
        explanation: "Sleep supports recovery, mood, and general wellbeing."
    },
    {
        category: "SMART NUTRITION",
        question: "4. Which meal is generally the most balanced?",
        options: [
            "Only candy and sweets",
            "Only fried snacks",
            "Only soft drinks",
            "Vegetables, whole grains, and protein"
        ],
        answer: 3,
        explanation: "A balanced meal can include vegetables, grains, and protein."
    },
    {
        category: "FITNESS KNOWLEDGE",
        question: "5. What is one benefit of regular physical activity?",
        options: [
            "It supports heart health and fitness",
            "It eliminates the need for rest",
            "It guarantees instant weight loss",
            "It means hydration is unnecessary"
        ],
        answer: 0,
        explanation: "Regular activity can improve cardiovascular fitness and health."
    },
    {
        category: "HEALTHY HABITS",
        question: "6. What is a good way to build a healthy habit?",
        options: [
            "Change every habit overnight",
            "Start small and stay consistent",
            "Give up after one missed day",
            "Ignore your daily routine"
        ],
        answer: 1,
        explanation: "Small, repeatable actions can help build lasting habits."
    },
    {
        category: "BETTER LIFESTYLE",
        question: "7. What is a helpful way to manage everyday stress?",
        options: [
            "Never take breaks",
            "Avoid talking to anyone",
            "Try deep breathing or a relaxing activity",
            "Reduce your sleep"
        ],
        answer: 2,
        explanation: "Relaxation techniques and breathing exercises may help manage stress."
    },
    {
        category: "SMART NUTRITION",
        question: "8. Which is a good everyday snack choice?",
        options: [
            "Only sugary drinks",
            "Only sweets",
            "Skipping every snack regardless of hunger",
            "Fruit and a handful of nuts"
        ],
        answer: 3,
        explanation: "Fruit and nuts can provide fiber, vitamins, and healthy fats."
    },
    {
        category: "FITNESS KNOWLEDGE",
        question: "9. Why are rest days useful in an exercise routine?",
        options: [
            "They allow recovery between workouts",
            "They make warming up unnecessary",
            "They guarantee immediate results",
            "They replace healthy eating"
        ],
        answer: 0,
        explanation: "Rest helps your body recover from physical activity."
    },
    {
        category: "HEALTHY HABITS",
        question: "10. Which approach supports long-term wellness?",
        options: [
            "Exercise as hard as possible every day",
            "Balance activity, nutritious food, sleep, and recovery",
            "Avoid drinking water during exercise",
            "Skip meals to save time"
        ],
        answer: 1,
        explanation: "A sustainable routine balances activity, nutrition, sleep, and recovery."
    }
];


/* =========================
   QUIZ ELEMENTS
========================= */

const startSection = document.getElementById("startSection");
const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");
const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const answerMessage = document.getElementById("answerMessage");

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);


/* =========================
   START QUIZ
========================= */

startBtn.addEventListener("click", function () {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);

    startSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    renderQuestion();

    quizSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


/* =========================
   DISPLAY QUESTION
========================= */

function renderQuestion() {
    const question = questions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionCategory.textContent = question.category;
    questionText.textContent = question.question;

    optionsList.innerHTML = "";
    answerMessage.textContent = "";

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "option-btn";

        button.innerHTML = `
            <span class="option-letter">
                ${String.fromCharCode(65 + index)}
            </span>
            <span></span>
        `;

        button.querySelector("span:last-child").textContent = option;

        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        optionsList.appendChild(button);
    });

    previousBtn.disabled = currentQuestion === 0;
    previousBtn.style.opacity =
        currentQuestion === 0 ? "0.5" : "1";

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "View Results →"
            : "Next Question →";

    nextBtn.disabled = userAnswers[currentQuestion] === null;
}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(selectedIndex) {
    userAnswers[currentQuestion] = selectedIndex;

    const buttons = optionsList.querySelectorAll(".option-btn");

    buttons.forEach(function (button, index) {
        button.classList.toggle("selected", index === selectedIndex);
    });

    nextBtn.disabled = false;
    answerMessage.textContent = "Answer selected. Continue when ready.";
    answerMessage.style.color = "#39876b";
}


/* =========================
   PREVIOUS QUESTION
========================= */

previousBtn.addEventListener("click", function () {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});


/* =========================
   NEXT QUESTION / RESULTS
========================= */

nextBtn.addEventListener("click", function () {
    if (userAnswers[currentQuestion] === null) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();

        quizSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } else {
        showResults();
    }
});


/* =========================
   CALCULATE SCORE
========================= */

function showResults() {
    let score = 0;

    questions.forEach(function (question, index) {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });

    const percentage = Math.round((score / questions.length) * 100);

    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    document.getElementById("scoreValue").textContent =
        `${score}/${questions.length}`;

    document.getElementById("resultPercentage").textContent =
        `${percentage}%`;

    document.getElementById("correctCount").textContent = score;
    document.getElementById("wrongCount").textContent =
        questions.length - score;

    const resultTitle = document.getElementById("resultTitle");
    const resultDescription =
        document.getElementById("resultDescription");
    const resultIcon = document.getElementById("resultIcon");

    if (percentage >= 80) {
        resultTitle.textContent = "Amazing Work!";
        resultDescription.textContent =
            "Excellent! You have a strong understanding of healthy habits.";
        resultIcon.textContent = "🏆";
    } else if (percentage >= 50) {
        resultTitle.textContent = "Good Job!";
        resultDescription.textContent =
            "You are on the right track. Keep learning and building healthy habits.";
        resultIcon.textContent = "🌟";
    } else {
        resultTitle.textContent = "Keep Growing!";
        resultDescription.textContent =
            "Every step counts. Review your answers and try the quiz again.";
        resultIcon.textContent = "🌱";
    }

    showAnswerReview();

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================
   ANSWER REVIEW
========================= */

function showAnswerReview() {
    const reviewList = document.getElementById("reviewList");

    reviewList.innerHTML = "";

    questions.forEach(function (question, index) {
        const isCorrect = userAnswers[index] === question.answer;

        const reviewItem = document.createElement("article");
        reviewItem.className =
            `review-item ${isCorrect ? "correct" : "incorrect"}`;

        const title = document.createElement("h4");
        title.textContent = question.question;

        const yourAnswer = document.createElement("p");
        yourAnswer.textContent =
            "Your answer: " +
            (userAnswers[index] === null
                ? "Not answered"
                : question.options[userAnswers[index]]);

        const correctAnswer = document.createElement("p");
        correctAnswer.className = "correct-answer";
        correctAnswer.textContent =
            "Correct answer: " + question.options[question.answer];

        const explanation = document.createElement("p");
        explanation.textContent = question.explanation;

        reviewItem.append(
            title,
            yourAnswer,
            correctAnswer,
            explanation
        );

        reviewList.appendChild(reviewItem);
    });
}


/* =========================
   RESTART QUIZ
========================= */

restartBtn.addEventListener("click", function () {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);

    resultSection.classList.add("hidden");
    startSection.classList.remove("hidden");

    startSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});
