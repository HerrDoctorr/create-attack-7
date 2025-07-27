ServerEvents.recipes((event) => {
    event.remove({ output: "storagedrawers:compacting_drawers_2" })
    event.remove({ output: "storagedrawers:compacting_drawers_3" })

    event.remove({ output: "storagedrawers:compacting_half_drawers_2" })
    event.remove({ output: "storagedrawers:compacting_half_drawers_3" })

    event.remove({ output: "storagedrawers:controller" })
    event.remove({ output: "storagedrawers:controller_slave" })

    
    event.shaped(
        Item.of("storagedrawers:compacting_drawers_2"),
        [
            "IDI",
            "IPI",
            "SCS"
        ],
        {
            I: "create:iron_sheet",
            D: "#storagedrawers:full_drawers",
            P: "create:mechanical_press",
            C: "create:mechanical_crafter",
            S: "minecraft:stone_slab"
        }
    )
    event.shaped(
        Item.of("storagedrawers:compacting_drawers_3"),
        [
            "IDI",
            "PIP",
            "CSC"
        ],
        {
            I: "create:iron_sheet",
            D: "#storagedrawers:full_drawers",
            P: "create:mechanical_press",
            C: "create:mechanical_crafter",
            S: "minecraft:stone_slab"
        }
    )
    
    event.shaped(
        Item.of("storagedrawers:compacting_half_drawers_2"),
        [
            "IDI",
            "IPI",
            "SCS"
        ],
        {
            I: "create:iron_sheet",
            D: "#storagedrawers:half_drawers",
            P: "create:mechanical_press",
            C: "create:mechanical_crafter",
            S: "minecraft:stone_slab"
        }
    )
    event.shaped(
        Item.of("storagedrawers:compacting_half_drawers_3"),
        [
            "IDI",
            "PIP",
            "CSC"
        ],
        {
            I: "create:iron_sheet",
            D: "#storagedrawers:half_drawers",
            P: "create:mechanical_press",
            C: "create:mechanical_crafter",
            S: "minecraft:stone_slab"
        }
    )

    event.shaped(
        Item.of("storagedrawers:controller"),
        [
            "III",
            "EDE",
            "STS"
        ],
        {
            I: "create:iron_sheet",
            E: "create:electron_tube",
            D: "#storagedrawers:full_drawers",
            S: "minecraft:stone_slab",
            T: "minecraft:diamond"
        }
    )
    event.shaped(
        Item.of("storagedrawers:controller_slave"),
        [
            "III",
            "EDE",
            "SGS"
        ],
        {
            I: "create:iron_sheet",
            E: "create:electron_tube",
            D: "#storagedrawers:full_drawers",
            S: "minecraft:stone_slab",
            G: "minecraft:gold_ingot"
        }
    )
})
