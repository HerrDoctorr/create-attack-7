ServerEvents.recipes((event) => {
    event.remove({ output: "davebuildingmod:soft_air" });
    event.remove({ input: "davebuildingmod:soft_air" });
});
