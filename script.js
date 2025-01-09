async function fetchPlayers() {
    const response = await fetch("https://www.balldontlie.io/api/v1/players");
    const data = await response.json();
    const players = data.data;

    const playerList = document.getElementById("player-list");
    players.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.first_name} ${player.last_name}`;
        li.addEventListener("click", () => showPlayerStats(player.id));
        playerList.appendChild(li);
    });
}

async function showPlayerStats(playerId) {
    const response = await fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}`);
    const data = await response.json();
    const stats = data.data[0];

    const statsContainer = document.getElementById("stats-container");
    statsContainer.innerHTML = `
        <p>Points: ${stats.pts}</p>
        <p>Rebounds: ${stats.reb}</p>
        <p>Assists: ${stats.ast}</p>
    `;

    // Example Chart Data
    updateChart([10, 20, 30, 40], [15, 25, 35, 45]);
}

function updateChart(actual, potential) {
    const ctx = document.getElementById("performance-chart").getContext("2d");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4'],
            datasets: [
                {
                    label: 'Actual Points',
                    data: actual,
                    borderColor: 'green',
                },
                {
                    label: 'Potential Points',
                    data: potential,
                    borderColor: 'blue',
                }
            ]
        }
    });
}

fetchPlayers();
