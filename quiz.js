
/* ==================================
   GLOWFIT WELLNESS QUIZ
================================== */

// 1. Select HTML elements
const startBtn = document.getElementById("startBtn");
const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");

const questionCount = document.getElementById("questionCount");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const errorMessage = document.getElementById("errorMessage");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const scoreValue = document.getElementById("scoreValue");
const scoreBar = document.getElementById("scoreBar");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const recommendations = document.getElementById("recommendations");

// 2. Store 10 questions, answer choices, and tips
const questions = [
    {
        question: "1. How would you describe your sleep routine?",
        answers: [
            { text: "I wake up feeling refreshed", score: 2 },
            { text: "My sleep is sometimes irregular", score: 1 },
            { text: "I often struggle to sleep well", score: 0 }
        ],
        tip: "Try maintaining a consistent bedtime and wake-up time."
    },
    {
        question: "2. How often do you engage in physical activity?",
        answers: [
            { text: "Regularly throughout the week", score: 2 },
            { text: "Occasionally during the week", score: 1 },
            { text: "Rarely at the moment", score: 0 }
        ],
        tip: "Try short walks or gentle movement that suits your ability."
    },
    {
        question: "3. How often do you drink water?",
        answers: [
            { text: "Regularly throughout the day", score: 2 },
            { text: "I sometimes forget", score: 1 },
            { text: "I rarely remember", score: 0 }
        ],
        tip: "Keep water nearby and drink regularly throughout the day."
    },
    {
        question: "4. How often do you eat fruits and vegetables?",
        answers: [
            { text: "I include them in meals regularly", score: 2 },
            { text: "I eat them on some days", score: 1 },
            { text: "I rarely include them", score: 0 }
        ],
        tip: "Try adding a fruit or vegetable to one daily meal."
    },
    {
        question: "5. How do you manage everyday stress?",
        answers: [
            { text: "I have healthy ways to manage it", score: 2 },
            { text: "Sometimes I feel overwhelmed", score: 1 },
            { text: "I often struggle to manage it", score: 0 }
        ],
        tip: "Try slow breathing, relaxing activities, or talking to someone you trust."
    },
    {
        question: "6. How often do you take breaks from screens?",
        answers: [
            { text: "I take regular breaks", score: 2 },
            { text: "I take breaks occasionally", score: 1 },
            { text: "I rarely take breaks", score: 0 }
        ],
        tip: "Schedule short screen breaks during long sessions."
    },
    {
        question: "7. How often do you stretch or move after sitting?",
        answers: [
            { text: "I move around regularly", score: 2 },
            { text: "I move around sometimes", score: 1 },
            { text: "I often sit for long periods", score: 0 }
        ],
        tip: "Take regular breaks to stand, stretch, or move around."
    },
    {
        question: "8. How often do you connect with friends or family?",
        answers: [
            { text: "I connect with them regularly", score: 2 },
            { text: "I connect with them sometimes", score: 1 },
            { text: "I would like more opportunities to connect", score: 0 }
        ],
        tip: "Make time for a conversation with someone you trust."
    },
    {
        question: "9. How consistent is your daily routine?",
        answers: [
            { text: "I follow a routine that works well", score: 2 },
            { text: "My routine changes sometimes", score: 1 },
            { text: "I do not have a regular routine", score: 0 }
        ],
        tip: "Choose one small daily habit and practise it consistently."
    },
    {
        question: "10. How often do you make time to relax?",
        answers: [
            { text: "I relax most days", score: 2 },
            { text: "I relax when I have time", score: 1 },
            { text: "I rarely make time to relax", score: 0 }
        ],
        tip: "Set aside a few minutes for an activity you enjoy."
    }
];

// 3. Quiz variables
let currentQuestion = 0;
let selectedAnswers = [];

// 4. Start the quiz
startBtn.addEventListener("click", function () {
    currentQuestion = 0;
    selectedAnswers = [];

    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    showQuestion();

    quizSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// 5. Display question and answer choices
function showQuestion() {
    const question = questions[currentQuestion];

    questionCount.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const progress = Math.round(
        ((currentQuestion + 1) / questions.length) * 100
    );

    progressPercent.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;

    questionText.textContent = question.question;
    answerOptions.innerHTML = "";
    errorMessage.classList.add("hidden");

    question.answers.forEach(function (answer, index) {
        const label = document.createElement("label");

        label.className =
            "flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 transition hover:border-orange-400 hover:bg-orange-50";

        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "quizAnswer";
        radio.value = index;
        radio.className = "h-4 w-4 accent-orange-500";

        const answerText = document.createElement("span");
        answerText.textContent = answer.text;

        // Restore the selected answer when going back
        if (selectedAnswers[currentQuestion] === index) {
            radio.checked = true;
            label.classList.add("border-orange-500", "bg-orange-50");
        }

        radio.addEventListener("change", function () {
            selectedAnswers[currentQuestion] = index;
            errorMessage.classList.add("hidden");

            // Update selected answer styling
            answerOptions.querySelectorAll("label").forEach(function (item) {
                item.classList.remove("border-orange-500", "bg-orange-50");
            });

            label.classList.add("border-orange-500", "bg-orange-50");
        });

        label.append(radio, answerText);
        answerOptions.appendChild(label);
    });

    // Hide Back on the first question
    backBtn.classList.toggle("hidden", currentQuestion === 0);

    // Change button text on the final question
    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "View Results →"
            : "Next →";
}

// 6. Next button and answer validation
nextBtn.addEventListener("click", function () {
    if (selectedAnswers[currentQuestion] === undefined) {
        errorMessage.classList.remove("hidden");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
});

// 7. Back button
backBtn.addEventListener("click", function () {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

// 8. Calculate score and show results
function showResults() {
    let totalScore = 0;

    selectedAnswers.forEach(function (answerIndex, questionIndex) {
        totalScore +=
            questions[questionIndex].answers[answerIndex].score;
    });

    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    scoreValue.textContent = totalScore;
    scoreBar.style.width = `${(totalScore / 20) * 100}%`;

    let title;
    let description;
    let icon;

    if (totalScore >= 16) {
        title = "Great Work! Keep It Up!";
        description =
            "Your answers suggest you have several positive wellness habits. Keep building on them.";
        icon = "🌟";
    } else if (totalScore >= 10) {
        title = "You're Making Progress!";
        description =
            "You have some positive habits already. Small, consistent changes may help you improve your routine.";
        icon = "🌿";
    } else {
        title = "Start With Small Steps!";
        description =
            "Your answers highlight some habits you could work on gradually. Choose one manageable change at a time.";
        icon = "💚";
    }

    resultIcon.textContent = icon;
    resultTitle.textContent = title;
    resultDescription.textContent = description;

    // Generate suggestions from answers scoring below 2
    recommendations.innerHTML = "";

    let tips = [];

    selectedAnswers.forEach(function (answerIndex, questionIndex) {
        if (questions[questionIndex].answers[answerIndex].score < 2) {
            tips.push(questions[questionIndex].tip);
        }
    });

    // Show general tips if all answers scored 2
    if (tips.length === 0) {
        tips = [
            "Continue the healthy habits that work for you.",
            "Maintain a balanced routine with rest and movement.",
            "Review your habits regularly and set achievable goals."
        ];
    }

    // Display a maximum of four suggestions
    tips.slice(0, 4).forEach(function (tip) {
        const item = document.createElement("li");
        item.textContent = tip;
        recommendations.appendChild(item);
    });

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// 9. Retake quiz
restartBtn.addEventListener("click", function () {
    currentQuestion = 0;
    selectedAnswers = [];

    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    showQuestion();

    quizSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// 10. Mobile navigation menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", function () {
    const isOpening = mobileNav.classList.toggle("hidden");

    menuBtn.setAttribute("aria-expanded", String(!isOpening));
    menuBtn.textContent = isOpening ? "☰" : "✕";
});
