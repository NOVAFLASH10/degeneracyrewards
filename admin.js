document.addEventListener("DOMContentLoaded", () => {
  const countdownInput = document.getElementById("countdown");
  const saveCountdownBtn = document.getElementById("saveCountdown");
  const usersDiv = document.getElementById("users");

  // Load countdown if saved
  const savedCountdown = localStorage.getItem("countdownEnd");
  if (savedCountdown) {
    const localTime = new Date(savedCountdown);
    countdownInput.value = localTime.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  }

  // Save countdown
  saveCountdownBtn.addEventListener("click", () => {
    const end = countdownInput.value;
    if (!end) return alert("Please enter a valid date/time.");
    localStorage.setItem("countdownEnd", new Date(end).toISOString());
    alert("Countdown saved!");
  });

  // Generate 10 editable user blocks
  for (let i = 1; i <= 10; i++) {
    usersDiv.innerHTML += `
      <div class="user-group">
        <h3>Rank ${i}</h3>
        <label>Username:</label>
        <input type="text" name="username${i}" />
        <label>Wager:</label>
        <input type="text" name="wager${i}" />
        <label>Prize:</label>
        <input type="text" name="prize${i}" />
      </div>
    `;
  }

  // Load saved leaderboard if exists
  const savedData = JSON.parse(localStorage.getItem("leaderboardData")) || [];
  savedData.forEach((user, idx) => {
    if (idx < 10) {
      document.querySelector(`[name="username${idx + 1}"]`).value = user.username || "";
      document.querySelector(`[name="wager${idx + 1}"]`).value = user.wager || "";
      document.querySelector(`[name="prize${idx + 1}"]`).value = user.prize || "";
    }
  });

  // Save leaderboard
  document.getElementById("leaderboardForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = [];

    for (let i = 1; i <= 10; i++) {
      const username = document.querySelector(`[name="username${i}"]`).value || "-";
      const wager = document.querySelector(`[name="wager${i}"]`).value || "-";
      const prize = document.querySelector(`[name="prize${i}"]`).value || "-";
      data.push({ rank: i, username, wager, prize });
    }

    localStorage.setItem("leaderboardData", JSON.stringify(data));
    alert("Leaderboard saved!");
  });
});
