// Overlay toggle function
function toggleOverlay() {
  const overlayDiv = document.getElementById("overlay");
  overlayDiv.classList.toggle("-translate-y-[500px]");
}

// Check for localStorage token
window.addEventListener("DOMContentLoaded", () => {
  const doraToken = localStorage.getItem("dora_token");
  if (doraToken) {
    document.getElementById("dashboard-btn").classList.remove("hidden");
    document.getElementById("dashboard-btn-md").classList.remove("hidden");
    document.getElementById("login-btn").classList.add("hidden");
    document.getElementById("signup-btn").classList.add("hidden");
    document.getElementById("login-btn-md").classList.add("hidden");
    document.getElementById("signup-btn-md").classList.add("hidden");
  }
});
