package dev.ithundxr.createnumismatics.forge.web.data;

public class VendorData {
    private String sellingItem;
    private int price;
    private int stock;
    private boolean isAdminVendor;
    private String ownerName;
    private long lastUpdate;
    private boolean isOnline;

    public VendorData() {
        this.isAdminVendor = true;
        this.lastUpdate = System.currentTimeMillis();
        this.isOnline = false;
    }

    public VendorData(String sellingItem, int price, int stock, boolean isAdminVendor) {
        this.sellingItem = sellingItem;
        this.price = price;
        this.stock = stock;
        this.isAdminVendor = isAdminVendor;
        this.lastUpdate = System.currentTimeMillis();
        this.isOnline = true;
    }

    public String getSellingItem() { return sellingItem; }
    public void setSellingItem(String sellingItem) { this.sellingItem = sellingItem; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public boolean isAdminVendor() { return isAdminVendor; }
    public void setAdminVendor(boolean adminVendor) { this.isAdminVendor = adminVendor; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public long getLastUpdate() { return lastUpdate; }
    public void setLastUpdate(long lastUpdate) { this.lastUpdate = lastUpdate; }

    public boolean isOnline() { return isOnline; }
    public void setOnline(boolean online) { this.isOnline = online; }
}
