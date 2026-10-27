console.log("script connected");

// Select elements
const createPlanBtn = document.getElementById("createPlanBtn");
const planCard = document.getElementById("planCard");
const planMessage = document.getElementById("planMessage");
const planEnergy = document.getElementById("planEnergy");
const planTime = document.getElementById("planTime");
const planGoal = document.getElementById("planGoal");
const planWorkout = document.getElementById("planWorkout");
const planBreak = document.getElementById("planWellness");
const planNutrition = document.getElementById("planNutrition");
// Plan data
const workouts = {
  low: {
    10: "Gentle neck and shoulder stretch",
    20: "Slow full body stretch",
    30: "Easy walk with light stretching",
  },
  medium: {
    10: "Quick bodyweight circuit",
    20: "Full body stretch and core",
    30: "Brisk walk or light jog",
  },
  high: {
    10: "High knees and burpees, 3 rounds",
    20: "HIIT cardio blast",
    30: "Strength and cardio circuit",
  },
};

const breaks = {
  active: "Quick walk",
  relax: "Deep breathing",
  eat: "Water and stretching",
};

const meals = {
  active: "Banana with a handful of nuts",
  relax: "Warm herbal tea with oats",
  eat: "Try a bowl of vegetable upma",
};

const energyLabels = { low: "Low", medium: "Medium", high: "High" };
const goalLabels = { active: "Stay Active", relax: "Chill Out", eat: "Eat Smart" };

// Click handler
createPlanBtn.addEventListener("click", () => {
  const energy = document.querySelector('input[name="energy-level"]:checked')?.value;
  const time = document.querySelector('input[name="time"]:checked')?.value;
  const goal = document.querySelector('input[name="goal"]:checked')?.value;

  console.log(energy, time, goal);

  if (!energy || !time || !goal) {
    planMessage.textContent = "Please answer all three questions.";
    return;
  }

  planMessage.textContent = "";

  planEnergy.textContent = energyLabels[energy];
  planTime.textContent = time + " Min";
  planGoal.textContent = goalLabels[goal];
  planWorkout.textContent = time + " Min · " + workouts[energy][time];
  planBreak.textContent = "5 Min · " + breaks[goal];
  planNutrition.textContent = meals[goal];

  planCard.classList.remove("hidden");
  planCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

//FAQ section
// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-button");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector("i");

  button.addEventListener("click", () => {
    const wasOpen = !answer.classList.contains("hidden");

    // Close every item
    faqItems.forEach((other) => {
      other.querySelector(".faq-answer").classList.add("hidden");
      other.querySelector("i").classList.remove("rotate-180");
      other.querySelector(".faq-button").setAttribute("aria-expanded", "false");
    });

    // Open the clicked one, unless it was already open
    if (!wasOpen) {
      answer.classList.remove("hidden");
      icon.classList.add("rotate-180");
      button.setAttribute("aria-expanded", "true");
    }
  });
});
//tip section
// 1. tips array
const tips = [
  {
    title: "Stay Hydrated",
    text: "Water boosts your energy, improves focus, helps digestion and keeps your skin healthy. Try to drink at least 8 glasses of water today.",
    note: "Small Sips. Big Benefits",
    image: "./images/hydrate.jpg",
    link: "./meal-page/meal.html",
    linkText: "Explore Nutrition",
  },
  {
    title: "Take a Mindful Break",
    text: "Take a few minutes to pause, breathe deeply, and relax your mind. Even a short mindful break can help you feel calmer and more focused.",
    note: "Pause. Breathe. Feel Better.",
    image: "./images/mindful.jpg",
    link: "quiz.html",
    linkText: "Explore Mindfulness",
  },
  {
    title: "Keep Your Body Moving",
    text: "Break up long periods of sitting with short walks or gentle stretches. Small amounts of movement throughout your day count.",
    note: "Move More. Feel Better.",
    image: "./images/move.jpg",
    link: "glowfit-workout-library.html",
    linkText: "Explore Workouts",
  },
  {
    title: "Eat a Balanced Meal",
    text: "Build nourishing meals with a variety of vegetables, protein sources, whole grains, and other foods you enjoy.",
    note: "Nourish Your Body. Fuel Your Day.",
    image: "./images/meal.jpg",
    link: "./meal-page/meal.html",
    linkText: "Explore Nutrition",
  },
  {
    title: "Make Sleep a Priority",
    text: "Try to maintain a consistent sleep schedule and create a relaxing bedtime routine to support your rest and recovery.",
    note: "Rest Well. Rise Strong.",
    image: "./images/sleep.jpg",
    link: "quiz.html",
    linkText: "Explore Wellness",
  },
  {
    title: "Enjoy Some Time Outdoors",
    text: "When practical, spend a little time outside enjoying fresh air and natural daylight. Choose a comfortable time and protect yourself from excessive sun exposure.",
    note: "Step Outside. Refresh Your Mind.",
    image: "./images/outdoors.jpg",
    link: "quiz.html",
    linkText: "Explore Wellness",
  },
];

// 2. select elements
const tipImage = document.getElementById("tipImage");
const tipTitle = document.getElementById("tipTitle");
const tipText = document.getElementById("tipText");
const tipNote = document.getElementById("tipNote");
const tipLink = document.getElementById("tipLink");
const tipLinkText = document.getElementById("tipLinkText");
const nextTipBtn = document.getElementById("nextTipBtn");
const tipDots = document.getElementById("tipDots");

let currentIndex = 0;

// 3. show one tip
function showTip(index) {
  const tip = tips[index];
  tipImage.src = tip.image;
  tipImage.alt = tip.title;
  tipTitle.textContent = tip.title;
  tipText.textContent = tip.text;
  tipNote.textContent = tip.note;
  tipLink.href = tip.link;
  tipLinkText.textContent = tip.linkText;
  Array.from(tipDots.children).forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// 4. build the dots
tips.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show tip ${i + 1}`);
  dot.addEventListener("click", () => {
    currentIndex = i;
    showTip(i);
  });
  tipDots.appendChild(dot);
});

// 5. Next Tip button and first tip
nextTipBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % tips.length;
  showTip(currentIndex);
});

showTip(currentIndex);