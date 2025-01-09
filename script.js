// Fetch players and populate the sidebar
async function fetchPlayers() {
    const response = await fetch("https://www.balldontlie.io/api/v1/players");
    const data = await response.json();
    const playerList = document.getElementById("player-list");

    data.data.slice(0, 20).forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.first_name} ${player.last_name}`;
        li.addEventListener("click", () => loadPlayerStats(player));
        playerList.appendChild(li);
    });
}

// Load player stats and update the chart
async function loadPlayerStats(player) {
    document.getElementById("player-name").textContent = `${player.first_name} ${player.last_name}`;

    // Mock data for chart (replace with real API call later)
    const actualPoints = [10, 15, 20, 25, 30];
    const potentialPoints = [12, 18, 22, 28, 35];

    // Update chart
    updateChart(actualPoints, potentialPoints);
}

// Update the chart with player stats
function updateChart(actualPoints, potentialPoints) {
    const ctx = document.getElementById("performance-chart").getContext("2d");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'],
            datasets: [
                {
                    label: 'Actual Points',
                    data: actualPoints,
                    borderColor: 'green',
                    fill: false,
                },
                {
                    label: 'Potential Points',
                    data: potentialPoints,
                    borderColor: 'blue',
                    fill: false,
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Initialize
fetchPlayers();
