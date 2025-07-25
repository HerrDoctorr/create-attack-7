// API endpoint
const API_URL = 'http://localhost:8080/api/transactions';

let apiData = null;
let currentView = 'all';
let selectedItem = null;
let charts = {};

async function loadApiData() {
    try {
        showLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        apiData = await response.json();
        console.log('API Data loaded:', apiData);

        generateSummaryCards();
        generateItemButtons();
        showAllItems();
        showLoading(false);
    } catch (error) {
        console.error('Error loading API data:', error);
        showError('Fehler beim Laden der API-Daten. Bitte überprüfen Sie die Verbindung.');
        showLoading(false);
    }
}

// Show loading indicator
function showLoading(show) {
    const container = document.getElementById('charts-container');
    if (show) {
        container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Lade Daten...</p>
            </div>
        `;
    }
}

// Show error message
function showError(message) {
    const container = document.getElementById('charts-container');
    container.innerHTML = `
        <div class="error-message">
            <h3>⚠️ Fehler</h3>
            <p>${message}</p>
            <button onclick="loadApiData()" class="retry-btn">Erneut versuchen</button>
        </div>
    `;
}

// Calculate price per item
function calculatePricePerItem(transaction) {
    return transaction.quantity > 0 ? transaction.price / transaction.quantity : transaction.price;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadApiData();

    // Auto-refresh every 30 seconds
    //setInterval(loadApiData, 30000);
});

// Generate summary cards
function generateSummaryCards() {
    const container = document.getElementById('summary-cards');
    const transactions = apiData.allTransactions;

    let totalTransactions = 0;
    let totalVolume = 0;
    let highestPrice = 0;
    let itemCount = Object.keys(transactions).length;

    Object.values(transactions).forEach(itemTransactions => {
        itemTransactions.forEach(transaction => {
            totalTransactions++;
            totalVolume += transaction.quantity;
            if (transaction.price > highestPrice) {
                highestPrice = transaction.price;
            }
        });
    });

    const cards = [
        { title: '📦 Gesamt Items', value: itemCount, label: 'verschiedene Items' },
        { title: '💱 Transaktionen', value: totalTransactions, label: 'gesamt' },
        { title: '📊 Volumen', value: totalVolume, label: 'Stück verkauft' },
        { title: '💎 Höchster Preis', value: highestPrice, label: 'Credits' }
    ];

    container.innerHTML = cards.map(card => `
        <div class="summary-card">
            <h3>${card.title}</h3>
            <div class="value">${card.value.toLocaleString()}</div>
            <div class="label">${card.label}</div>
        </div>
    `).join('');
}

// Generate item selection buttons
function generateItemButtons() {
    const container = document.getElementById('item-buttons');
    const transactions = apiData.allTransactions;

    const buttons = Object.keys(transactions).map(itemKey => {
        const itemName = getItemDisplayName(itemKey);
        const transactionCount = transactions[itemKey].length;

        return `
            <button class="item-btn" onclick="selectItem('${itemKey}')">
                ${itemName} (${transactionCount})
            </button>
        `;
    }).join('');

    container.innerHTML = buttons;
}

// Get display name for item
function getItemDisplayName(itemKey) {
    const names = {
        'oak_log': '🌳 Oak Log',
        'mangrove_leaves': '🍃 Mangrove Leaves',
        'diamond_block': '💎 Diamond Block'
    };
    return names[itemKey] || itemKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Navigation functions
function showAllItems() {
    currentView = 'all';
    updateNavButtons('all');
    document.getElementById('charts-container').style.display = 'block';
    document.getElementById('time-analysis').style.display = 'none';

    if (!selectedItem) {
        selectItem(Object.keys(apiData.allTransactions)[0]);
    }
}

function showTopItems() {
    currentView = 'top';
    updateNavButtons('top');
    generateTopItemsCharts();
}

function showTimeAnalysis() {
    currentView = 'time';
    updateNavButtons('time');
    document.getElementById('charts-container').style.display = 'none';
    document.getElementById('time-analysis').style.display = 'block';
    generateTimeAnalysis();
}

function updateNavButtons(active) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeButton = Array.from(document.querySelectorAll('.nav-btn')).find(btn => {
        if (active === 'all' && btn.textContent.includes('Alle Items')) return true;
        if (active === 'top' && btn.textContent.includes('Top Items')) return true;
        if (active === 'time' && btn.textContent.includes('Zeitanalyse')) return true;
        return false;
    });

    if (activeButton) activeButton.classList.add('active');
}

// Select item and generate charts
function selectItem(itemKey) {
    selectedItem = itemKey;

    // Update item button states
    document.querySelectorAll('.item-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');

    generateItemCharts(itemKey);
}

// Generate charts for selected item
function generateItemCharts(itemKey) {
    const container = document.getElementById('charts-container');
    const transactions = apiData.allTransactions[itemKey];
    const itemName = getItemDisplayName(itemKey);

    container.innerHTML = `
        <div class="chart-card">
            <h3>📈 ${itemName} - Preisverlauf</h3>
            <div class="chart-wrapper">
                <canvas id="priceChart-${itemKey}"></canvas>
            </div>
        </div>
        
        <div class="chart-card">
            <h3>📊 ${itemName} - Verkaufsvolumen</h3>
            <div class="chart-wrapper">
                <canvas id="volumeChart-${itemKey}"></canvas>
            </div>
        </div>
        
        <div class="chart-card">
            <h3>⏰ ${itemName} - Verkaufszeiten</h3>
            <div class="chart-wrapper">
                <canvas id="timeChart-${itemKey}"></canvas>
            </div>
            <div class="stats-grid">
                ${generateItemStats(transactions)}
            </div>
        </div>
    `;

    // Destroy existing charts
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};

    // Generate new charts
    generatePriceChart(itemKey, transactions);
    generateVolumeChart(itemKey, transactions);
    generateTimeChart(itemKey, transactions);
}

// Generate price trend chart
function generatePriceChart(itemKey, transactions) {
    const ctx = document.getElementById(`priceChart-${itemKey}`).getContext('2d');

    const sortedTransactions = [...transactions].sort((a, b) => a.timestamp - b.timestamp);

    const labels = sortedTransactions.map(t => new Date(t.timestamp).toLocaleString('de-DE'));
    const pricesPerItem = sortedTransactions.map(t => calculatePricePerItem(t));
    const types = sortedTransactions.map(t => t.type);

    charts[`price-${itemKey}`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Preis pro Item',
                data: pricesPerItem,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                pointBackgroundColor: pricesPerItem.map((price, index) =>
                    types[index] === 'sell' ? '#27ae60' : '#e74c3c'
                ),
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const transaction = sortedTransactions[context.dataIndex];
                            const pricePerItem = calculatePricePerItem(transaction);
                            return `Preis pro Item: ${pricePerItem.toFixed(2)} Credits`;
                        },
                        afterLabel: function(context) {
                            const transaction = sortedTransactions[context.dataIndex];
                            return [
                                `Typ: ${transaction.type === 'sell' ? 'Verkauf' : 'Kauf'}`,
                                `Menge: ${transaction.quantity}x`,
                                `Gesamtpreis: ${transaction.price} Credits`,
                                `Spieler: ${transaction.playerName}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Preis pro Item (Credits)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Zeit'
                    }
                }
            }
        }
    });
}

// Generate volume chart
function generateVolumeChart(itemKey, transactions) {
    const ctx = document.getElementById(`volumeChart-${itemKey}`).getContext('2d');

    const hourlyVolume = {};
    transactions.forEach(transaction => {
        const hour = new Date(transaction.timestamp).getHours();
        hourlyVolume[hour] = (hourlyVolume[hour] || 0) + transaction.quantity;
    });

    const hours = Array.from({length: 24}, (_, i) => i);
    const volumes = hours.map(hour => hourlyVolume[hour] || 0);

    charts[`volume-${itemKey}`] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hours.map(h => `${h}:00`),
            datasets: [{
                label: 'Verkauftes Volumen',
                data: volumes,
                backgroundColor: volumes.map(vol => {
                    if (vol === 0) return '#bdc3c7';
                    if (vol <= 1) return '#f39c12';
                    if (vol <= 3) return '#3498db';
                    return '#27ae60';
                }),
                borderColor: '#2c3e50',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Verkaufte Menge'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Uhrzeit'
                    }
                }
            }
        }
    });
}

// Generate time-based chart
function generateTimeChart(itemKey, transactions) {
    const ctx = document.getElementById(`timeChart-${itemKey}`).getContext('2d');

    const dailyTransactions = {};
    transactions.forEach(transaction => {
        const date = new Date(transaction.timestamp).toDateString();
        if (!dailyTransactions[date]) {
            dailyTransactions[date] = { count: 0, totalValue: 0 };
        }
        dailyTransactions[date].count++;
        dailyTransactions[date].totalValue += transaction.price * transaction.quantity;
    });

    const dates = Object.keys(dailyTransactions);
    const counts = dates.map(date => dailyTransactions[date].count);
    const values = dates.map(date => dailyTransactions[date].totalValue);

    charts[`time-${itemKey}`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Anzahl Transaktionen',
                data: counts,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                yAxisID: 'y'
            }, {
                label: 'Gesamtwert (Credits)',
                data: values,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Anzahl Transaktionen'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Gesamtwert (Credits)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Generate item statistics
function generateItemStats(transactions) {
    const totalTransactions = transactions.length;
    const totalVolume = transactions.reduce((sum, t) => sum + t.quantity, 0);
    const avgPrice = transactions.reduce((sum, t) => sum + t.price, 0) / totalTransactions;
    const maxPrice = Math.max(...transactions.map(t => t.price));
    const minPrice = Math.min(...transactions.map(t => t.price));

    // Find peak hour
    const hourlyCount = {};
    transactions.forEach(t => {
        const hour = new Date(t.timestamp).getHours();
        hourlyCount[hour] = (hourlyCount[hour] || 0) + 1;
    });

    const peakHour = Object.keys(hourlyCount).reduce((a, b) =>
        hourlyCount[a] > hourlyCount[b] ? a : b
    );

    return `
        <div class="stat-item">
            <div class="stat-value">${totalTransactions}</div>
            <div class="stat-label">Transaktionen</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${totalVolume}</div>
            <div class="stat-label">Gesamtvolumen</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${avgPrice.toFixed(0)}</div>
            <div class="stat-label">Ø Preis</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${maxPrice}</div>
            <div class="stat-label">Max Preis</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${minPrice}</div>
            <div class="stat-label">Min Preis</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${peakHour}:00</div>
            <div class="stat-label">Peak Zeit</div>
        </div>
    `;
}

// Generate top items analysis
function generateTopItemsCharts() {
    const container = document.getElementById('charts-container');
    const transactions = apiData.allTransactions;

    // Calculate top items by various metrics
    const itemStats = Object.keys(transactions).map(itemKey => {
        const itemTransactions = transactions[itemKey];
        const totalVolume = itemTransactions.reduce((sum, t) => sum + t.quantity, 0);
        const totalValue = itemTransactions.reduce((sum, t) => sum + (t.price * t.quantity), 0);
        const avgPrice = itemTransactions.reduce((sum, t) => sum + t.price, 0) / itemTransactions.length;

        return {
            key: itemKey,
            name: getItemDisplayName(itemKey),
            transactions: itemTransactions.length,
            volume: totalVolume,
            value: totalValue,
            avgPrice: avgPrice
        };
    });

    container.innerHTML = `
        <div class="chart-card">
            <h3>🏆 Top Items nach Transaktionen</h3>
            <div class="chart-wrapper">
                <canvas id="topTransactionsChart"></canvas>
            </div>
        </div>
        
        <div class="chart-card">
            <h3>💰 Top Items nach Gesamtwert</h3>
            <div class="chart-wrapper">
                <canvas id="topValueChart"></canvas>
            </div>
        </div>
    `;

    // Destroy existing charts
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};

    // Top by transactions
    const topByTransactions = [...itemStats].sort((a, b) => b.transactions - a.transactions);

    charts['topTransactions'] = new Chart(document.getElementById('topTransactionsChart'), {
        type: 'doughnut',
        data: {
            labels: topByTransactions.map(item => item.name),
            datasets: [{
                data: topByTransactions.map(item => item.transactions),
                backgroundColor: ['#3498db', '#27ae60', '#f39c12', '#e74c3c', '#9b59b6'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Top by value
    const topByValue = [...itemStats].sort((a, b) => b.value - a.value);

    charts['topValue'] = new Chart(document.getElementById('topValueChart'), {
        type: 'bar',
        data: {
            labels: topByValue.map(item => item.name),
            datasets: [{
                label: 'Gesamtwert (Credits)',
                data: topByValue.map(item => item.value),
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Gesamtwert (Credits)'
                    }
                }
            }
        }
    });
}

// Generate time analysis
function generateTimeAnalysis() {
    const transactions = apiData.allTransactions;
    const allTransactions = Object.values(transactions).flat();

    const hourlyData = Array.from({length: 24}, () => ({ count: 0, volume: 0, value: 0 }));

    allTransactions.forEach(transaction => {
        const hour = new Date(transaction.timestamp).getHours();
        hourlyData[hour].count++;
        hourlyData[hour].volume += transaction.quantity;
        hourlyData[hour].value += transaction.price * transaction.quantity;
    });

    // Destroy existing chart
    if (charts['hourly']) {
        charts['hourly'].destroy();
    }

    charts['hourly'] = new Chart(document.getElementById('hourlyChart'), {
        type: 'bar',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: 'Anzahl Verkäufe',
                data: hourlyData.map(h => h.count),
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: '#3498db',
                borderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Verkaufsvolumen',
                data: hourlyData.map(h => h.volume),
                backgroundColor: 'rgba(39, 174, 96, 0.7)',
                borderColor: '#27ae60',
                borderWidth: 1,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Anzahl Verkäufe'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Verkaufsvolumen'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Uhrzeit'
                    }
                }
            }
        }
    });
}
