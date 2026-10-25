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