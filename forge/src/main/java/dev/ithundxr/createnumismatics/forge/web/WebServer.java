package dev.ithundxr.createnumismatics.forge.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import dev.ithundxr.createnumismatics.Numismatics;
import dev.ithundxr.createnumismatics.forge.web.data.TransactionData;
import net.minecraft.core.BlockPos;
import net.minecraft.world.item.ItemStack;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class WebServer {
    private static final int HTTP_PORT = 8080;
    private static WebServer instance;
    private HttpServer httpServer;
    private final Gson gson = new GsonBuilder()
            .setPrettyPrinting()
            .create();

    // Storage for transaction history
    private final Map<String, List<TransactionData>> transactionHistory = new ConcurrentHashMap<>();

    public static WebServer getInstance() {
        if (instance == null) {
            instance = new WebServer();
        }
        return instance;
    }

    public void start() {
        try {
            // Start HTTP server
            httpServer = HttpServer.create(new InetSocketAddress(HTTP_PORT), 0);
            setupRoutes();
            httpServer.start();
            Numismatics.LOGGER.info("HTTP server started on port " + HTTP_PORT);
            Numismatics.LOGGER.info("Access the dashboard at: http://localhost:" + HTTP_PORT);
        } catch (IOException e) {
            Numismatics.LOGGER.error("Failed to start web server", e);
        }
    }

    public void stop() {
        if (httpServer != null) {
            httpServer.stop(0);
            Numismatics.LOGGER.info("HTTP server stopped");
        }
    }

    private void setupRoutes() {
        // API routes
        httpServer.createContext("/api/transactions", new TransactionHistoryHandler());

        // Static file routes
        httpServer.createContext("/", new StaticFileHandler());
    }

    public void recordTransaction(BlockPos pos, String playerName, ItemStack item, int price, String transactionType) {
        String itemKey = item.getItem().toString();
        TransactionData transaction = new TransactionData(
            System.currentTimeMillis(),
            playerName,
            item.getDisplayName().getString(),
            item.getCount(),
            price,
            transactionType,
            pos.toString()
        );

        transactionHistory.computeIfAbsent(itemKey, k -> new ArrayList<>()).add(transaction);

        // Log transaction for debugging
        Numismatics.LOGGER.info("Recorded transaction: {} {} {} for {} coins at {}",
            transactionType, playerName, item.getDisplayName().getString(), price, pos);
    }

    // HTTP Handlers
    private class TransactionHistoryHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("GET".equals(exchange.getRequestMethod())) {
                String query = exchange.getRequestURI().getQuery();
                String itemFilter = null;

                if (query != null && query.contains("item=")) {
                    itemFilter = query.split("item=")[1].split("&")[0];
                }

                Map<String, Object> response = new HashMap<>();

                if (itemFilter != null) {
                    response.put("transactions", transactionHistory.getOrDefault(itemFilter, new ArrayList<>()));
                    response.put("item", itemFilter);
                } else {
                    response.put("allTransactions", transactionHistory);
                }

                sendJsonResponse(exchange, response);
            }
        }
    }

    private class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if ("/".equals(path)) {
                sendHtmlResponse(exchange, getMainPage());
            } else {
                send404Response(exchange);
            }
        }
    }

    private void sendJsonResponse(HttpExchange exchange, Object data) throws IOException {
        String json = gson.toJson(data);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.sendResponseHeaders(200, json.getBytes().length);

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(json.getBytes());
        }
    }

    private void sendHtmlResponse(HttpExchange exchange, String html) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "text/html");
        exchange.sendResponseHeaders(200, html.getBytes().length);

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(html.getBytes());
        }
    }

    private void sendErrorResponse(HttpExchange exchange, String error) throws IOException {
        Map<String, String> response = new HashMap<>();
        response.put("error", error);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(400, 0);

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(gson.toJson(response).getBytes());
        }
    }

    private void send404Response(HttpExchange exchange) throws IOException {
        String response = "404 - Not Found";
        exchange.sendResponseHeaders(404, response.getBytes().length);

        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    private String getMainPage() {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Numismatics Vendor Dashboard</title>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; }
                    .content { margin-top: 20px; }
                    .transaction { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; background: white; transition: all 0.3s ease; }
                    .transaction:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                    .transaction.new { animation: highlight 2s ease-in-out; }
                    .buy { border-left: 5px solid #28a745; }
                    .sell { border-left: 5px solid #007bff; }
                    .filter { margin: 20px 0; padding: 20px; background: white; border-radius: 8px; }
                    input[type="text"] { padding: 10px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; }
                    button { padding: 10px 15px; background: #007cba; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
                    button:hover { background: #005a87; }
                    .status { padding: 10px; margin: 10px 0; border-radius: 4px; background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
                    .stats { display: flex; gap: 20px; margin: 20px 0; }
                    .stat-card { background: white; padding: 20px; border-radius: 8px; flex: 1; text-align: center; }
                    .stat-number { font-size: 2em; font-weight: bold; color: #007cba; }
                    
                    @keyframes highlight {
                        0% { background-color: #ffffcc; }
                        100% { background-color: white; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🪙 Numismatics Vendor Dashboard</h1>
                    <p>Einfaches Tracking aller Vendor-Transaktionen</p>
                </div>
                
                <div class="content">
                    <div class="status">✅ Dashboard aktiv - Auto-Aktualisierung alle 5 Sekunden</div>
                    
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number" id="totalTransactions">0</div>
                            <div>Gesamt Transaktionen</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="totalSales">0</div>
                            <div>Verkäufe</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="totalPurchases">0</div>
                            <div>Käufe</div>
                        </div>
                    </div>
                    
                    <div class="filter">
                        <input type="text" id="itemFilter" placeholder="Item-Name eingeben...">
                        <button onclick="loadTransactions()">Filtern</button>
                        <button onclick="loadAllTransactions()">Alle anzeigen</button>
                        <button onclick="clearDisplay()">Anzeige leeren</button>
                    </div>
                    
                    <div id="transactions"></div>
                </div>
                
                <script>
                    let transactions = [];
                    
                    function loadTransactions() {
                        const filter = document.getElementById('itemFilter').value;
                        const url = filter ? `/api/transactions?item=${encodeURIComponent(filter)}` : '/api/transactions';
                        
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                const newTransactions = [];
                                if (data.allTransactions) {
                                    for (let item in data.allTransactions) {
                                        newTransactions.push(...data.allTransactions[item]);
                                    }
                                } else if (data.transactions) {
                                    newTransactions.push(...data.transactions);
                                }
                                
                                transactions = newTransactions;
                                displayTransactions();
                                updateStats();
                            })
                            .catch(error => {
                                console.error('Error loading transactions:', error);
                                document.querySelector('.status').innerHTML = '❌ Fehler beim Laden der Daten';
                            });
                    }
                    
                    function loadAllTransactions() {
                        document.getElementById('itemFilter').value = '';
                        loadTransactions();
                    }
                    
                    function clearDisplay() {
                        document.getElementById('transactions').innerHTML = '<p>Anzeige geleert. Transaktionen werden weiterhin aufgezeichnet.</p>';
                    }
                    
                    function updateStats() {
                        const total = transactions.length;
                        const sales = transactions.filter(t => t.type === 'sell').length;
                        const purchases = transactions.filter(t => t.type === 'buy').length;
                        
                        document.getElementById('totalTransactions').textContent = total;
                        document.getElementById('totalSales').textContent = sales;
                        document.getElementById('totalPurchases').textContent = purchases;
                    }
                    
                    function displayTransactions() {
                        const container = document.getElementById('transactions');
                        if (transactions.length === 0) {
                            container.innerHTML = '<p>Keine Transaktionen gefunden. Führe eine Transaktion an einem Vendor durch, um sie hier zu sehen.</p>';
                            return;
                        }
                        
                        const sortedTransactions = transactions
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .slice(0, 100);
                        
                        container.innerHTML = sortedTransactions
                            .map(t => {
                                const date = new Date(t.timestamp);
                                return `
                                    <div class="transaction ${t.type}">
                                        <strong>${t.type.toUpperCase()}</strong> - ${t.playerName}<br>
                                        <strong>Item:</strong> ${t.itemName} x${t.itemCount}<br>
                                        <strong>Preis:</strong> ${t.price} Coins<br>
                                        <strong>Position:</strong> ${t.position}<br>
                                        <strong>Zeit:</strong> ${date.toLocaleString('de-DE')}
                                    </div>
                                `;
                            })
                            .join('');
                    }
                    
                    // Initialize and set up auto-refresh
                    loadAllTransactions();
                    
                    // Auto-refresh every 5 seconds
                    setInterval(() => {
                        loadAllTransactions();
                        document.querySelector('.status').innerHTML = `✅ Dashboard aktiv - Letzte Aktualisierung: ${new Date().toLocaleTimeString('de-DE')}`;
                    }, 5000);
                </script>
            </body>
            </html>
            """;
    }
}
