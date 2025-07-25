package dev.ithundxr.createnumismatics.forge.web.data;

public class TransactionData {
    private final long timestamp;
    private final String playerName;
    private final String itemName;
    private final int quantity;
    private final int price;
    private final String type; // "buy" or "sell"
    private final String position;

    public TransactionData(long timestamp, String playerName, String itemName, int quantity, int price, String type, String position) {
        this.timestamp = timestamp;
        this.playerName = playerName;
        this.itemName = itemName;
        this.quantity = quantity;
        this.price = price;
        this.type = type;
        this.position = position;
    }

    public long getTimestamp() { return timestamp; }
    public String getPlayerName() { return playerName; }
    public String getItemName() { return itemName; }
    public int getQuantity() { return quantity; }
    public int getPrice() { return price; }
    public String getType() { return type; }
    public String getPosition() { return position; }
}
