document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "https://dev-api.dorascribe.ai/";
  const faqContainer = document.getElementById("faqContainer");

  // Fetch FAQs from the API
  async function fetchFaqs() {
    try {
      const url = new URL(`${API_BASE_URL}api/v1/faqs`);
      url.searchParams.append("type", "pricing");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      renderFaqs(data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  }

  // Toggle dropdown for FAQ answers
  function toggleDropDown(faqElement) {
    faqElement.classList.toggle("active");
  }
  // Render FAQs
  function renderFaqs(faqs) {
    faqContainer.innerHTML = ""; // Clear existing content

    faqs.forEach((faq, index) => {
      const faqElement = document.createElement("div");
      faqElement.className = "faq";
      faqElement.innerHTML = `
        <div class="flex justify-between items-center">
          <p class="font-Inter text-[#000000] text-base md:text-lg font-normal">${faq.question}</p>
          <img src="./assets/arrow-down.svg" alt="" class="arrow-icon">
        </div>
        <div class="answer">
          <p class="font-Inter text-[#282D2D] font-normal text-sm md:text-base mt-5">${faq.answer}</p>
        </div>
      `;

      faqElement.addEventListener("click", () => toggleDropDown(faqElement));
      faqContainer.appendChild(faqElement);
    });
  }

  // Initial fetch of FAQs on page load
  fetchFaqs();
});
