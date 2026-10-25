// Workout information used to build the page.
const workouts = [
  {
    name: "Full Body Beginner Workout",
    type: "Home Workout",
    category: "type_home_workout",
    image: "recommended-fullbody-begineer.png",
    duration: 20,
    level: "Beginner",
    calories: 120,
    goals: ["Weight Loss", "General Fitness"],
    equipment: ["No Equipment"],
    intensity: "Low",
  },
  {
    name: "Upper Body Strength",
    type: "Gym Workout",
    category: "type_gym_workout",
    image: "recommended-upper-body-strength.png",
    duration: 30,
    level: "Intermediate",
    calories: 220,
    goals: ["Build Muscle"],
    equipment: ["Dumbbells", "Gym Equipment"],
    intensity: "High",
  },
  {
    name: "HIIT Cardio Blast",
    type: "Cardio",
    category: "type_cardio",
    image: "recommended-hiit-cardio.png",
    duration: 25,
    level: "Intermediate",
    calories: 120,
    goals: ["Weight Loss"],
    equipment: ["No Equipment"],
    intensity: "High",
  },
  {
    name: "Morning Yoga Flow",
    type: "Yoga",
    category: "type_yoga",
    image: "recommended-morning-yoga.png",
    duration: 20,
    level: "Beginner",
    calories: 120,
    goals: ["Flexibility", "Stress Relief"],
    equipment: ["Yoga Mat"],
    intensity: "Low",
  },
  {
    name: "Core & Abs Workout",
    type: "Pilates",
    category: "type_pilates",
    image: "recommended-core-abs.png",
    duration: 30,
    level: "Advanced",
    calories: 250,
    goals: ["Build Muscle", "General Fitness"],
    equipment: ["Yoga Mat"],
    intensity: "Moderate",
  },
  {
    name: "Guided Meditation",
    type: "Meditation",
    category: "type_meditation",
    image: "recommended-guided-meditation.png",
    duration: 10,
    level: "All Levels",
    calories: 60,
    goals: ["Stress Relief"],
    equipment: ["No Equipment"],
    intensity: "Low",
  },
];

// The filter values match the information in the workout list above.
const filterGroups = [
  {
    name: "goals",
    title: "Goals",
    icon: "🔥",
    options: ["Weight Loss", "Build Muscle", "Flexibility", "Stress Relief", "General Fitness"],
  },
  {
    name: "duration",
    title: "Duration",
    icon: "⏱️",
    options: [
      { label: "Under 15 minutes", value: "under_15" },
      { label: "15–30 minutes", value: "15_to_30" },
      { label: "30–60 minutes", value: "30_to_60" },
      { label: "Over 60 minutes", value: "over_60" },
    ],
  },
  {
    name: "type",
    title: "Workout Type",
    icon: "🏅",
    options: ["Home Workout", "Gym Workout", "Cardio", "Yoga", "Pilates", "Meditation"],
  },
  {
    name: "level",
    title: "Fitness Level",
    icon: "📶",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    name: "equipment",
    title: "Equipment",
    icon: "🏋️",
    options: ["No Equipment", "Dumbbells", "Resistance Band", "Yoga Mat", "Gym Equipment"],
  },
  {
    name: "intensity",
    title: "Intensity",
    icon: "📈",
    options: ["Low", "Moderate", "High"],
  },
];

const activities = [
  {
    name: "Home Workouts",
    description: "No equipment needed",
    type: "Home Workout",
    category: "type_home_workout",
    image: "activity-home-workout.png",
    icon: "🏠",
  },
  {
    name: "Gym Workouts",
    description: "Build strength & muscle",
    type: "Gym Workout",
    category: "type_gym_workout",
    image: "activity-gym.png",
    icon: "🏋️",
  },
  {
    name: "Cardio",
    description: "Boost endurance & burn fat",
    type: "Cardio",
    category: "type_cardio",
    image: "activity-cardio.png",
    icon: "❤️",
  },
  {
    name: "Yoga",
    description: "Improve flexibility & balance",
    type: "Yoga",
    category: "type_yoga",
    image: "activity-yoga.png",
    icon: "🪷",
  },
  {
    name: "Pilates",
    description: "Core strength & posture",
    type: "Pilates",
    category: "type_pilates",
    image: "activity-pilates.png",
    icon: "🧍",
  },
  {
    name: "Meditation",
    description: "Calm mind & less stress",
    type: "Meditation",
    category: "type_meditation",
    image: "activity-meditation.png",
    icon: "🧘",
  },
];

const breathingSteps = [
  ["Inhale", "4 seconds"],
  ["Hold", "4 seconds"],
  ["Exhale", "6 seconds"],
  ["Repeat", ""],
];

const quickLinks = [
  ["📅", "Weekly Plan", "Schedule your workouts"],
  ["📊", "My Progress", "View stats & goals"],
  ["❤️", "Saved Workouts", "Your favorite routines"],
  ["🏆", "Achievements", "Earn badges & rewards"],
];

let favoriteWorkouts = [];
let searchText = "";
let viewMode = "grid";
let timerSeconds = 300;
let timerInterval = null;

function renderFilters() {
  const filterOptions = document.getElementById("filter_options");

  filterOptions.innerHTML = "";

  for (const group of filterGroups) {
    let optionHtml = "";

    for (const option of group.options) {
      let optionLabel = option;
      let optionValue = option;

      if (typeof option === "object") {
        optionLabel = option.label;
        optionValue = option.value;
      }

      optionHtml += `
        <label class="filter_choice">
          <input type="checkbox" data-filter="${group.name}" value="${optionValue}">
          <span>${optionLabel}</span>
        </label>`;
    }

    filterOptions.innerHTML += `
      <section class="filter_group">
        <h3>${group.icon} ${group.title}</h3>
        ${optionHtml}
      </section>`;
  }
}

function renderActivities() {
  const activityList = document.getElementById("activity_list");
  let activityHtml = "";

  for (const activity of activities) {
    activityHtml += `
      <button class="activity_card ${activity.category}" type="button" data-type="${activity.type}">
        <img class="activity_image" src="images/${activity.image}" alt="" loading="lazy">
        <div class="activity_details">
          <span class="activity_icon" aria-hidden="true">${activity.icon}</span>
          <div class="activity_name">
            <span>${activity.name}</span>
            <span aria-hidden="true">→</span>
          </div>
          <p>${activity.description}</p>
        </div>
      </button>`;
  }

  activityList.innerHTML = activityHtml;
}

function renderBreathingSteps() {
  const breathingList = document.getElementById("breathing_steps");
  let stepHtml = "";

  for (let index = 0; index < breathingSteps.length; index += 1) {
    const step = breathingSteps[index];
    stepHtml += `<li><strong>${step[0]}</strong>`;

    if (step[1] !== "") {
      stepHtml += ` – ${step[1]}`;
    }

    stepHtml += "</li>";
  }

  breathingList.innerHTML = stepHtml;
}

function renderQuickLinks() {
  const quickLinkList = document.getElementById("quick_links");
  let linkHtml = "";

  for (const link of quickLinks) {
    linkHtml += `
      <a class="quick_link" href="#">
        <span aria-hidden="true">${link[0]}</span>
        <span><strong>${link[1]}</strong><small>${link[2]}</small></span>
      </a>`;
  }

  quickLinkList.innerHTML = linkHtml;
}

function renderFooterNavigation() {
  const navigationLinks = [
    ["Home", "index.html"],
    ["Workouts", "glowfit-workout-library.html"],
    ["Nutrition", "meal-page/meal.html"],
    ["Quiz", "quiz.html"],
    ["Progress", "progress.html"],
    ["Community", "community.html"],
  ];
  const footerNavigation = document.getElementById("footer_navigation");
  let linkHtml = "";

  for (const [label, href] of navigationLinks) {
    linkHtml += `<a href="${href}">${label}</a>`;
  }

  footerNavigation.innerHTML = linkHtml;
}

function getSelectedFilters(filterName) {
  const checkedBoxes = document.querySelectorAll(
    `[data-filter="${filterName}"]:checked`,
  );
  const selectedValues = [];

  for (const checkbox of checkedBoxes) {
    selectedValues.push(checkbox.value);
  }

  return selectedValues;
}

function matchesDuration(duration, selectedRanges) {
  if (selectedRanges.length === 0) {
    return true;
  }

  for (const range of selectedRanges) {
    if (range === "under_15" && duration < 15) {
      return true;
    }

    if (range === "15_to_30" && duration >= 15 && duration <= 30) {
      return true;
    }

    if (range === "30_to_60" && duration >= 30 && duration <= 60) {
      return true;
    }

    if (range === "over_60" && duration > 60) {
      return true;
    }
  }

  return false;
}

function matchesWorkoutOptions(workout, filterName, workoutValues) {
  const selectedValues = getSelectedFilters(filterName);

  if (selectedValues.length === 0) {
    return true;
  }

  for (const selectedValue of selectedValues) {
    if (workoutValues.includes(selectedValue)) {
      return true;
    }
  }

  // Workouts for every fitness level can be shown when a level is selected.
  if (filterName === "level" && workout.level === "All Levels") {
    return true;
  }

  return false;
}

function workoutMatchesFilters(workout) {
  const goalsMatch = matchesWorkoutOptions(workout, "goals", workout.goals);
  const typesMatch = matchesWorkoutOptions(workout, "type", [workout.type]);
  const levelsMatch = matchesWorkoutOptions(workout, "level", [workout.level]);
  const equipmentMatch = matchesWorkoutOptions(workout, "equipment", workout.equipment);
  const intensityMatch = matchesWorkoutOptions(workout, "intensity", [workout.intensity]);
  const durationMatch = matchesDuration(workout.duration, getSelectedFilters("duration"));
  const workoutText = `${workout.name} ${workout.type} ${workout.goals.join(" ")}`.toLowerCase();
  const searchMatches = workoutText.includes(searchText);

  return (
    goalsMatch &&
    typesMatch &&
    levelsMatch &&
    equipmentMatch &&
    intensityMatch &&
    durationMatch &&
    searchMatches
  );
}

function getFilteredWorkouts() {
  const filteredWorkouts = [];

  for (const workout of workouts) {
    if (workoutMatchesFilters(workout)) {
      filteredWorkouts.push(workout);
    }
  }

  const sortChoice = document.getElementById("sort_select").value;

  if (sortChoice === "duration") {
    filteredWorkouts.sort((firstWorkout, secondWorkout) => firstWorkout.duration - secondWorkout.duration);
  }

  if (sortChoice === "calories") {
    filteredWorkouts.sort((firstWorkout, secondWorkout) => secondWorkout.calories - firstWorkout.calories);
  }

  return filteredWorkouts;
}

function createWorkoutCard(workout) {
  const workoutIndex = workouts.indexOf(workout);
  let favoriteIcon = "♡";
  let favoriteLabel = "Add to favorites";

  if (favoriteWorkouts.includes(workoutIndex)) {
    favoriteIcon = "♥";
    favoriteLabel = "Remove from favorites";
  }

  return `
    <article class="workout_card ${workout.category}">
      <div class="workout_image">
        <img src="images/${workout.image}" alt="${workout.name}" loading="lazy">
        <button class="favorite_button" type="button" data-workout-index="${workoutIndex}" aria-label="${favoriteLabel}">
          ${favoriteIcon}
        </button>
      </div>
      <div class="workout_details">
        <span class="workout_type">${workout.type}</span>
        <h3>${workout.name}</h3>
        <div class="workout_facts">
          <span>${workout.duration} min</span>
          <span>${workout.level}</span>
        </div>
        <div class="workout_footer">
          <span class="favorite_calories">🔥 ${workout.calories} kcal</span>
          <button class="details_button" type="button">View Workout →</button>
        </div>
      </div>
    </article>`;
}

function renderWorkouts() {
  const workoutList = document.getElementById("workout_list");
  const emptyMessage = document.getElementById("empty_message");
  const filteredWorkouts = getFilteredWorkouts();
  let workoutHtml = "";

  for (const workout of filteredWorkouts) {
    workoutHtml += createWorkoutCard(workout);
  }

  workoutList.innerHTML = workoutHtml;
  workoutList.classList.toggle("list_view", viewMode === "list");
  emptyMessage.hidden = filteredWorkouts.length > 0;

  document.getElementById("grid_view_button").classList.toggle("selected_view", viewMode === "grid");
  document.getElementById("list_view_button").classList.toggle("selected_view", viewMode === "list");
}

function clearFilters() {
  const filterBoxes = document.querySelectorAll("[data-filter]");

  for (const checkbox of filterBoxes) {
    checkbox.checked = false;
  }

  renderWorkouts();
}

function selectActivity(event) {
  const activityButton = event.target.closest(".activity_card");

  if (activityButton === null) {
    return;
  }

  clearFilters();

  const typeFilters = document.querySelectorAll('[data-filter="type"]');

  for (const checkbox of typeFilters) {
    if (checkbox.value === activityButton.dataset.type) {
      checkbox.checked = true;
    }
  }

  renderWorkouts();
  document.getElementById("workout_list").scrollIntoView({ behavior: "smooth" });
}

function toggleFavorite(event) {
  const favoriteButton = event.target.closest(".favorite_button");

  if (favoriteButton === null) {
    return;
  }

  const workoutIndex = Number(favoriteButton.dataset.workoutIndex);
  const savedIndex = favoriteWorkouts.indexOf(workoutIndex);

  if (savedIndex === -1) {
    favoriteWorkouts.push(workoutIndex);
  } else {
    favoriteWorkouts.splice(savedIndex, 1);
  }

  renderWorkouts();
}

function changeView(viewName) {
  viewMode = viewName;
  renderWorkouts();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const clock = document.getElementById("timer_clock");
  const timerRing = document.getElementById("timer_ring");
  const minuteText = String(minutes).padStart(2, "0");
  const secondText = String(seconds).padStart(2, "0");
  const progress = ((300 - timerSeconds) / 300) * 100;

  clock.textContent = `${minuteText}:${secondText}`;
  timerRing.style.setProperty("--timer_progress", `${progress}%`);
}

function toggleTimer() {
  const timerButton = document.getElementById("timer_button");

  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerButton.textContent = "Start Now";
    return;
  }

  if (timerSeconds === 0) {
    timerSeconds = 300;
    updateTimerDisplay();
  }

  timerButton.textContent = "Pause";
  timerInterval = setInterval(function () {
    timerSeconds -= 1;
    updateTimerDisplay();

    if (timerSeconds === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerButton.textContent = "Start Again";
    }
  }, 1000);
}

function toggleFilterPanel() {
  if (window.innerWidth > 1000) {
    return;
  }

  const filterContent = document.getElementById("filter_content");
  const filterButton = document.getElementById("filter_toggle");
  const filterArrow = document.getElementById("filter_arrow");
  const panelIsClosed = filterContent.classList.toggle("is_closed");

  filterButton.setAttribute("aria-expanded", String(!panelIsClosed));
  filterArrow.textContent = panelIsClosed ? "▼" : "▲";
}

function applyFilters() {
  renderWorkouts();

  if (window.innerWidth <= 1000) {
    document.getElementById("filter_content").classList.add("is_closed");
    document.getElementById("filter_toggle").setAttribute("aria-expanded", "false");
    document.getElementById("filter_arrow").textContent = "▼";
  }
}

function handleSearch() {
  searchText = document.getElementById("search_input").value.trim().toLowerCase();
  renderWorkouts();
}

function toggleMobileMenu() {
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("menuBtn");
  const menuIsOpen = menu.classList.toggle("is_open");

  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
  menuButton.setAttribute("aria-label", menuIsOpen ? "Close menu" : "Open menu");
}

function closeMobileMenu(event) {
  if (event.target.closest("#menu") !== null || event.target.closest("#menuBtn") !== null) {
    return;
  }

  document.getElementById("menu").classList.remove("is_open");
  document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
  document.getElementById("menuBtn").setAttribute("aria-label", "Open menu");
}

function addEventListeners() {
  document.getElementById("filter_toggle").addEventListener("click", toggleFilterPanel);
  document.getElementById("clear_filters").addEventListener("click", clearFilters);
  document.getElementById("apply_filters").addEventListener("click", applyFilters);
  document.getElementById("search_input").addEventListener("input", handleSearch);
  document.getElementById("sort_select").addEventListener("change", renderWorkouts);
  document.getElementById("grid_view_button").addEventListener("click", function () {
    changeView("grid");
  });
  document.getElementById("list_view_button").addEventListener("click", function () {
    changeView("list");
  });
  document.getElementById("workout_list").addEventListener("click", toggleFavorite);
  document.getElementById("activity_list").addEventListener("click", selectActivity);
  document.getElementById("timer_button").addEventListener("click", toggleTimer);
  document.getElementById("menuBtn").addEventListener("click", toggleMobileMenu);
  document.getElementById("menu").addEventListener("click", function (event) {
    if (event.target.closest("a") !== null) {
      document.getElementById("menu").classList.remove("is_open");
      document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
      document.getElementById("menuBtn").setAttribute("aria-label", "Open menu");
    }
  });
  document.getElementById("header_search_button").addEventListener("click", function () {
    document.getElementById("search_input").focus();
  });
  document.addEventListener("click", closeMobileMenu);

  document.getElementById("filter_options").addEventListener("change", renderWorkouts);
}

function startWorkoutLibrary() {
  const filterContent = document.getElementById("filter_content");
  const filterButton = document.getElementById("filter_toggle");
  const filterArrow = document.getElementById("filter_arrow");

  if (window.innerWidth <= 1000) {
    filterContent.classList.add("is_closed");
    filterButton.setAttribute("aria-expanded", "false");
    filterArrow.textContent = "▼";
  } else {
    filterButton.setAttribute("aria-expanded", "true");
  }

  renderFilters();
  renderActivities();
  renderBreathingSteps();
  renderQuickLinks();
  renderFooterNavigation();
  addEventListeners();
  renderWorkouts();
}

startWorkoutLibrary();
