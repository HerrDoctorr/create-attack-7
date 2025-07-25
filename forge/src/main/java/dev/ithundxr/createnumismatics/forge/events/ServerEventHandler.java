package dev.ithundxr.createnumismatics.forge.events;

import dev.ithundxr.createnumismatics.Numismatics;
import dev.ithundxr.createnumismatics.forge.web.WebServer;
import net.minecraft.core.BlockPos;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraftforge.event.server.ServerStartedEvent;
import net.minecraftforge.event.server.ServerStoppedEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

@Mod.EventBusSubscriber(modid = Numismatics.MOD_ID, bus = Mod.EventBusSubscriber.Bus.FORGE)
public class ServerEventHandler {

    @SubscribeEvent
    public static void onServerStarted(ServerStartedEvent event) {
        Numismatics.LOGGER.info("Starting Numismatics Web Server...");
        WebServer.getInstance().start();
    }

    @SubscribeEvent
    public static void onServerStopped(ServerStoppedEvent event) {
        Numismatics.LOGGER.info("Stopping Numismatics Web Server...");
        WebServer.getInstance().stop();
    }

    // Static method to be called from VendorBlockEntity
    public static void recordVendorTransaction(Level level, BlockPos pos, String playerName, ItemStack item, int price, String type) {
        if (level != null && !level.isClientSide) {
            WebServer.getInstance().recordTransaction(pos, playerName, item, price, type);
        }
    }
}
