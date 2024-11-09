const API_BASE_URL = "https://dev-api.dorascribe.ai/";
let activePeriod = "Month";

// Fetch plans from the API
function fetchPlans() {
  const url = `${API_BASE_URL}api/v1/plans`;

  // Show loading indicator
  document.getElementById("loadingIndicator").style.display = "block";
  document.getElementById("pricingPlansContainer").innerHTML = "";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      renderPlans(data.data);
    })
    .catch((error) => {
      console.error("Error fetching plans:", error);
    })
    .finally(() => {
      // Hide loading indicator after fetching plans
      document.getElementById("loadingIndicator").style.display = "none";
    });
}

// Render the plans based on the active period
function renderPlans(plans) {
  const pricingPlansContainer = document.getElementById(
    "pricingPlansContainer"
  );
  pricingPlansContainer.innerHTML = "";

  const filteredPlans = plans.filter(
    (item) => item.periodicity_type === activePeriod || item.name === "Free"
  );

  // Set grid column classes based on the number of plans
  const gridClass =
    filteredPlans.length === 1
      ? "lg:grid-cols-1"
      : filteredPlans.length === 2
      ? "lg:grid-cols-2"
      : filteredPlans.length === 3
      ? "lg:grid-cols-3"
      : filteredPlans.length === 4
      ? "lg:grid-cols-4"
      : "lg:grid-cols-3";

  pricingPlansContainer.className = `grid grid-cols-1 gap-6 w-full mt-12 md:grid-cols-2 ${gridClass}`;

  filteredPlans.forEach((plan) => {
    const planCard = document.createElement("div");
    planCard.className =
      "w-full border border-[#EAEBF0] rounded-[20px] p-6 md:p-8";

    planCard.innerHTML = `
        <p class="text-[#272D37] font-semibold text-2xl md:text-4xl">
          $${plan.price}
          <span class="text-[#5F6D7E] font-normal text-base md:text-base">
            ${
              plan.name === "Free"
                ? "for 7 days Trial"
                : `Per ${plan.periodicity_type}`
            }
          </span>
        </p>
        <p class="text-[#272D37] font-medium text-base md:text-xl mt-4">${
          plan.name
        }</p>
        <p class="mt-2 text-sm md:text-base text-[#5F6D7E] border-b border-[#EAEBF0] pb-6">${
          plan.excerpt
        }</p>
        <div class="py-6 space-y-3 md:h-[180px]">
          ${plan.benefits
            .map(
              (benefit) => `
            <span class="flex flex-row items-center space-x-3">
              <img src="${"./assets/checked.svg"}" class="w-6 md:w-auto" alt="" />
              <p class="text-[#272D37] font-normal text-sm md:text-sm">${benefit}</p>
            </span>
          `
            )
            .join("")}
        </div>
        <a href="/signUp">
          <button class="w-full py-3 bg-[#00aaaa] shadow rounded-[30px] text-center text-white text-sm md:text-base font-semibold">
            Get Started
          </button>
        </a>
      `;

    pricingPlansContainer.appendChild(planCard);
  });
}

// Set active period and re-render plans
function setActivePeriod(period) {
  activePeriod = period;
  document
    .getElementById("monthlyButton")
    .classList.toggle("bg-[#00aaaa]", period === "Month");
  document
    .getElementById("monthlyButton")
    .classList.toggle("text-white", period === "Month");
  document
    .getElementById("monthlyButton")
    .classList.toggle("text-[#929292]", period !== "Month");

  document
    .getElementById("yearlyButton")
    .classList.toggle("bg-[#00aaaa]", period === "Year");
  document
    .getElementById("yearlyButton")
    .classList.toggle("text-white", period === "Year");
  document
    .getElementById("yearlyButton")
    .classList.toggle("text-[#929292]", period !== "Year");

  fetchPlans();
}

// Initial fetch on page load
fetchPlans();
