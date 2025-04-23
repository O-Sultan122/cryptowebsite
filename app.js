const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const UPDATE_INTERVAL = 60 * 1000;

let coins = [];

function getCoins() {
  axios.get(COINGECKO_API_URL, {
    params: {
      vs_currency: "usd",
      ids: "bitcoin,ethereum,solana,binancecoin,usd-coin,dogecoin",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: true
    }
  })
  .then(response => {
    coins = response.data;
    updateUI();
  })
  .catch(error => {
    console.error("Error fetching CoinGecko data:", error);
  });
}

function getColor(change) {
  return change >= 0 ? "#16a34a" : "#dc2626";
}

function updateUI() {
  const container = document.getElementById("coins-container");
  container.innerHTML = '';

  coins.forEach((coin, index) => {
    const change = coin.price_change_percentage_24h?.toFixed(2);
    const color = getColor(change);

    const coinElement = document.createElement("div");
    coinElement.className = "coin";

    coinElement.innerHTML = `
    <img src="${coin.image}" alt="${coin.symbol} logo" />
    <div class="coin-info">
      <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
      <p>Price: $${coin.current_price.toFixed(2)}</p>
      <p style="color:${color};">24h Change: ${change}%</p>
    </div>
    <div class="sparkline-container">
      <canvas id="sparkline-${index}"></canvas>
    </div>
  `;
  

    container.appendChild(coinElement);

    // Render sparkline
    const ctx = document.getElementById(`sparkline-${index}`).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: coin.sparkline_in_7d.price.map((_, i) => i),
        datasets: [{
          data: coin.sparkline_in_7d.price,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        elements: {
          line: { tension: 0.4 },
          point: { radius: 0 }
        },
        responsive: false,
        maintainAspectRatio: false
      }
      
    });
  });
}

window.onload = function() {
  getCoins();
  setInterval(getCoins, UPDATE_INTERVAL);
};
