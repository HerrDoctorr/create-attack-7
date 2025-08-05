ServerEvents.recipes((event) => {
    event.custom({
        type: "create:sandpaper_polishing",
        ingredients: [
            Item.of("minecraft:diamond")
        ],
        results: [
            Item.of("ca7:polished_diamond")
        ]
    })

    event.custom({
        type: "create:pressing",
        ingredients: [
            Item.of("minecraft:netherrack")
        ],
        results: [
            Item.of("ca7:netherrack_sheet")
        ]
    })

    event.custom({
        type: "create:sequenced_assembly",
        ingredient: [
            Item.of("ca7:netherrack_sheet")
        ],
        loops: 1,
        results: [
            {
                chance: 80,
                item: "minecraft:netherite_upgrade_smithing_template"
            },
            {
                chance: 12.5,
                item: "ca7:netherrack_sheet"
            },
            {
                chance: 4,
                item: "ca7:polished_diamond"
            },
            {
                chance: 2.5,
                item: "minecraft:netherrack"
            },
            {
                chance: 1,
                item: "minecraft:diamond"
            }
        ],
        transitionalItem: {
            item: "ca7:incomplete_netherite_upgrade_smithing_template"
        },
        sequence: [
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("ca7:incomplete_netherite_upgrade_smithing_template"),
                    Item.of("ca7:polished_diamond")
                ],
                results: [
                    Item.of("ca7:incomplete_netherite_upgrade_smithing_template")
                ]
            },
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("ca7:incomplete_netherite_upgrade_smithing_template"),
                    Item.of("ca7:netherrack_sheet")
                ],
                results: [
                    Item.of("ca7:incomplete_netherite_upgrade_smithing_template")
                ]
            },
            {
                type: "create:pressing",
                ingredients: [
                    Item.of("ca7:incomplete_netherite_upgrade_smithing_template")
                ],
                results: [
                    Item.of("ca7:incomplete_netherite_upgrade_smithing_template")
                ]
            }
        ]
    })
})
