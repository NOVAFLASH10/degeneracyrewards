document.addEventListener("DOMContentLoaded", () => {
  function updateCountdown() {
    const endStr = localStorage.getItem("countdownEnd");
    if (!endStr) return;

    const end = new Date(endStr);
    const now = new Date();
    const diff = Math.max(end - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  function loadLeaderboard() {
    const data = JSON.parse(localStorage.getItem("leaderboardData")) || [];
    const sorted = [...data].sort((a, b) => a.rank - b.rank).slice(0, 10);
    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = "";

    sorted.forEach((user, index) => {
      // Top cards
      if (index === 0) document.getElementById("top1").textContent = `Top 1\n${user.username}`;
      if (index === 1) document.getElementById("top2").textContent = `Top 2\n${user.username}`;
      if (index === 2) document.getElementById("top3").textContent = `Top 3\n${user.username}`;

      // Table row
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.rank}</td>
        <td>${user.username}</td>
        <td>${user.wager}</td>
        <td>${user.prize}</td>
      `;
      tbody.appendChild(row);
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
  loadLeaderboard();
});
