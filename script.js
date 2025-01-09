async function fetchPlayers() {
    const url = "https://www.balldontlie.io/api/v1/players"; // Free API endpoint
    const playerList = document.getElementById("player-list");

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        data.data.slice(0, 20).forEach(player => {
            const li = document.createElement("li");
            li.textContent = `${player.first_name} ${player.last_name}`;
            li.addEventListener("click", () => loadPlayerStats(player));
            playerList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching players:", error);
        playerList.innerHTML = "<p style='color: red;'>Failed to load players. Please try again later.</p>";
    }
}

async function loadPlayerStats(player) {
    document.getElementById("player-name").textContent = `${player.first_name} ${player.last_name}`;
    const actualPoints = [10, 15, 20, 25, 30];
    const potentialPoints = [12, 18, 22, 28, 35];
    updateChart(actualPoints, potentialPoints);
}

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
