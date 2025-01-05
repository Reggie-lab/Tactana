document.getElementById("player-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const playerName = document.getElementById("player-name").value;
    const points = parseFloat(document.getElementById("points").value);
    const rebounds = parseFloat(document.getElementById("rebounds").value);
    const assists = parseFloat(document.getElementById("assists").value);

    const predictionResult = document.getElementById("prediction-result");

    // Example Prediction Logic (replace with your API call or algorithm)
    const predictedPerformance = points * 1.1 + rebounds * 1.2 + assists * 1.3;

    predictionResult.innerHTML = `Predicted Performance for ${playerName}: ${predictedPerformance.toFixed(2)}`;
});
