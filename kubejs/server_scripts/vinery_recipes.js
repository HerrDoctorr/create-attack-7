ServerEvents.recipes((event) => {
    event.custom({
        type: "create:compacting",
        ingredients: [{ item: "minecraft:apple" }],
        results: [{ id: "vinery:apple_mash" }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [{ item: "vinery:apple_mash" }],
        results: [{ id: "create_attack_7:apple_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:jungle_grapes_red" },
            { item: "vinery:jungle_grapes_red" },
            { item: "vinery:jungle_grapes_red" }
        ],
        results: [{ id: "create_attack_7:jungle_red_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:jungle_grapes_white" },
            { item: "vinery:jungle_grapes_white" },
            { item: "vinery:jungle_grapes_white" }
        ],
        results: [{ id: "create_attack_7:jungle_white_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:red_grape" },
            { item: "vinery:red_grape" },
            { item: "vinery:red_grape" }
        ],
        results: [{ id: "create_attack_7:red_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:savanna_grapes_red" },
            { item: "vinery:savanna_grapes_red" },
            { item: "vinery:savanna_grapes_red" }
        ],
        results: [{ id: "create_attack_7:savanna_red_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:savanna_grapes_white" },
            { item: "vinery:savanna_grapes_white" },
            { item: "vinery:savanna_grapes_white" }
        ],
        results: [{ id: "create_attack_7:savanna_white_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:taiga_grapes_red" },
            { item: "vinery:taiga_grapes_red" },
            { item: "vinery:taiga_grapes_red" }
        ],
        results: [{ id: "create_attack_7:taiga_red_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:taiga_grapes_white" },
            { item: "vinery:taiga_grapes_white" },
            { item: "vinery:taiga_grapes_white" }
        ],
        results: [{ id: "create_attack_7:taiga_white_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:compacting",
        ingredients: [
            { item: "vinery:white_grape" },
            { item: "vinery:white_grape" },
            { item: "vinery:white_grape" }
        ],
        results: [{ id: "create_attack_7:white_grape_juice", amount: 250 }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:apple_juice", amount: 250 }],
        results: [{ id: "vinery:apple_juice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:red_grape_juice", amount: 250 }],
        results: [{ id: "vinery:red_grapejuice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:jungle_red_grape_juice", amount: 250 }],
        results: [{ id: "vinery:red_jungle_grapejuice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:savanna_red_grape_juice", amount: 250 }],
        results: [{ id: "vinery:red_savanna_grapejuice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:taiga_red_grape_juice", amount: 250 }],
        results: [{ id: "vinery:red_taiga_grapejuice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:white_grape_juice", amount: 250 }],
        results: [{ id: "vinery:white_grapejuice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:jungle_white_grape_juice", amount: 250 }],
        results: [{ id: "vinery:white_jungle_grapejuice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:savanna_white_grape_juice", amount: 250 }],
        results: [{ id: "vinery:white_savanna_grapejuice" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "vinery:wine_bottle" }, { type: "neoforge:single", fluid: "create_attack_7:taiga_white_grape_juice", amount: 250 }],
        results: [{ id: "vinery:white_taiga_grapejuice" }]
    });

    event.custom({
        type: "create:mixing",
        ingredients: [{ tag: "forge:sand/colorless" }, { item: "minecraft:clay_ball" }],
        results: [{ id: "vinery:loam" }]
    });
});
