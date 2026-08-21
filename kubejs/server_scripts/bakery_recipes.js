ServerEvents.recipes((event) => {
    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:apple_pie" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:apple_pie_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:bundt_cake" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:bundt_cake_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:chocolate_cake" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:chocolate_cake_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:cake_dough" }, { item: "bakery:chocolate_truffle" }],
        results: [{ id: "bakery:chocolate_gateau" }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:chocolate_gateau" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:chocolate_gateau_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:chocolate_tart" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:chocolate_tart_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "create_attack_7:cupcake_base" }, { item: "bakery:rolling_pin" }],
        results: [{ id: "create_attack_7:cookie_base" }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:cake_dough" }, { tag: "bakery:knives" }],
        results: [{ id: "create_attack_7:cupcake_base", count: 5 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:glowberry_tart" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:glowberry_pie_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:linzer_tart" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:linzer_tart_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:pudding" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:pudding_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:strawberry_cake" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:strawberry_cake_slice", count: 4 }]
    });

    event.custom({
        type: "create:deploying",
        ingredients: [{ item: "bakery:sweetberry_cake" }, { tag: "bakery:knives" }],
        results: [{ id: "bakery:sweetberry_cake_slice", count: 4 }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "create_attack_7:cupcake_base" }, { type: "neoforge:single", fluid: "create_attack_7:apple_jam", amount: 50 }],
        results: [{ id: "bakery:apple_cupcake" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:jar" }, { type: "neoforge:single", fluid: "create_attack_7:apple_jam", amount: 250 }],
        results: [{ id: "create_attack_7:apple_jam" }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ tag: "bakery:bread" }, { type: "neoforge:single", fluid: "create_attack_7:apple_jam", amount: 250 }],
        results: [{ id: "bakery:bread_with_jam", count: 5 }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ tag: "bakery:bread" }, { type: "neoforge:single", fluid: "create_attack_7:chocolate_jam", amount: 250 }],
        results: [{ id: "bakery:bread_with_jam", count: 5 }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ tag: "bakery:bread" }, { type: "neoforge:single", fluid: "create_attack_7:glowberry_jam", amount: 250 }],
        results: [{ id: "bakery:bread_with_jam", count: 5 }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ tag: "bakery:bread" }, { type: "neoforge:single", fluid: "create_attack_7:strawberry_jam", amount: 250 }],
        results: [{ id: "bakery:bread_with_jam", count: 5 }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ tag: "bakery:bread" }, { type: "neoforge:single", fluid: "create_attack_7:sweetberry_jam", amount: 250 }],
        results: [{ id: "bakery:bread_with_jam", count: 5 }]
    });

    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:cake_dough" }, { type: "neoforge:single", fluid: "create_attack_7:chocolate_jam", amount: 250 }],
        results: [{ id: "bakery:chocolate_cake" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "create_attack_7:cookie_base" }, { type: "neoforge:single", fluid: "create_attack_7:chocolate_jam", amount: 50 }],
        results: [{ id: "bakery:chocolate_glazed_cookie" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:jar" }, { type: "neoforge:single", fluid: "create_attack_7:chocolate_jam", amount: 250 }],
        results: [{ id: "create_attack_7:chocolate_jam" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:jar" }, { type: "neoforge:single", fluid: "create_attack_7:glowberry_jam", amount: 250 }],
        results: [{ id: "bakery:glowberry_jam" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:cake_dough" }, { type: "neoforge:single", fluid: "create_attack_7:strawberry_jam", amount: 250 }],
        results: [{ id: "bakery:strawberry_cake" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "create_attack_7:cookie_base" }, { type: "neoforge:single", fluid: "create_attack_7:strawberry_jam", amount: 50 }],
        results: [{ id: "bakery:strawberry_glazed_cookie" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "create_attack_7:cupcake_base" }, { type: "neoforge:single", fluid: "create_attack_7:strawberry_jam", amount: 50 }],
        results: [{ id: "bakery:strawberry_cupcake" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:jar" }, { type: "neoforge:single", fluid: "create_attack_7:strawberry_jam", amount: 250 }],
        results: [{ id: "bakery:strawberry_jam" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:cake_dough" }, { type: "neoforge:single", fluid: "create_attack_7:sweetberry_jam", amount: 250 }],
        results: [{ id: "bakery:sweetberry_cake" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "create_attack_7:cupcake_base" }, { type: "neoforge:single", fluid: "create_attack_7:sweetberry_jam", amount: 50 }],
        results: [{ id: "bakery:sweetberry_cupcake" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "create_attack_7:cookie_base" }, { type: "neoforge:single", fluid: "create_attack_7:sweetberry_jam", amount: 50 }],
        results: [{ id: "bakery:sweetberry_glazed_cookie" }]
    });
    event.custom({
        type: "create:filling",
        ingredients: [{ item: "bakery:jar" }, { type: "neoforge:single", fluid: "create_attack_7:sweetberry_jam", amount: 250 }],
        results: [{ id: "create_attack_7:sweetberry_jam" }]
    });

    event.custom({
        type: "create:mixing",
        heat_requirement: "heated",
        ingredients: [{ item: "minecraft:apple" }, { item: "minecraft:sugar" }],
        results: [{ id: "create_attack_7:apple_jam", amount: 250 }]
    });
    event.custom({
        type: "create:mixing",
        heat_requirement: "heated",
        ingredients: [{ item: "create:bar_of_chocolate" }, { item: "minecraft:sugar" }, { type: "neoforge:tag", tag: "c:milk", amount: 250 }],
        results: [{ id: "create_attack_7:chocolate_jam", amount: 250 }]
    });
    event.custom({
        type: "create:mixing",
        heat_requirement: "heated",
        ingredients: [{ item: "minecraft:glow_berries" }, { item: "minecraft:sugar" }],
        results: [{ id: "create_attack_7:glowberry_jam", amount: 250 }]
    });
    event.custom({
        type: "create:mixing",
        heat_requirement: "heated",
        ingredients: [{ tag: "c:strawberries" }, { item: "minecraft:sugar" }],
        results: [{ id: "create_attack_7:strawberry_jam", amount: 250 }]
    });
    event.custom({
        type: "create:mixing",
        heat_requirement: "heated",
        ingredients: [{ item: "minecraft:sweet_berries" }, { item: "minecraft:sugar" }],
        results: [{ id: "create_attack_7:sweetberry_jam", amount: 250 }]
    });

    event.custom({
        type: "create:pressing",
        ingredients: [{ item: "create_attack_7:cupcake_base" }],
        results: [{ id: "create_attack_7:cookie_base" }]
    });

    event.custom({
        type: "create:sequenced_assembly",
        ingredient: [
            { item: "bakery:tray" }
        ],
        transitional_item: { id: "create_attack_7:incomplete_bread_crate" },
        loops: 1,
        results: [{ id: "bakery:bread_crate" }],
        sequence: [
            {
                type: "create:deploying",
                ingredients: [{ item: "create_attack_7:incomplete_bread_crate" }, { item: "bakery:baguette" }],
                results: [{ id: "create_attack_7:incomplete_bread_crate" }]
            },
            {
                type: "create:deploying",
                ingredients: [{ item: "create_attack_7:incomplete_bread_crate" }, { item: "bakery:bun" }],
                results: [{ id: "create_attack_7:incomplete_bread_crate" }]
            },
            {
                type: "create:deploying",
                ingredients: [{ item: "create_attack_7:incomplete_bread_crate" }, { item: "bakery:braided_bread" }],
                results: [{ id: "create_attack_7:incomplete_bread_crate" }]
            },
            {
                type: "create:deploying",
                ingredients: [{ item: "create_attack_7:incomplete_bread_crate" }, { tag: "c:bread" }],
                results: [{ id: "create_attack_7:incomplete_bread_crate" }]
            }
        ]
    });
});
