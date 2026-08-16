ServerEvents.recipes((event) => {
    event.custom({
        type: "create:sandpaper_polishing",
        ingredients: [
            {
                item: "minecraft:diamond"
            }
        ],
        results: [
            {
                id: "create_attack_7:polished_diamond"
            }
        ]
    })

    event.custom({
        type: "create:pressing",
        ingredients: [
            {
                item: "minecraft:netherrack"
            }
        ],
        results: [
            {
                id: "create_attack_7:netherrack_sheet"
            }
        ]
    })

    event.custom({
        type: "create:sequenced_assembly",
        ingredient: [
            {
                item: "create_attack_7:netherrack_sheet"
            }
        ],
        loops: 1,
        results: [
            {
                chance: 80,
                id: "minecraft:netherite_upgrade_smithing_template"
            },
            {
                chance: 12.5,
                id: "create_attack_7:netherrack_sheet"
            },
            {
                chance: 4,
                id: "create_attack_7:polished_diamond"
            },
            {
                chance: 2.5,
                id: "minecraft:netherrack"
            },
            {
                chance: 1,
                id: "minecraft:diamond"
            }
        ],
        transitional_item: {
            id: "create_attack_7:incomplete_netherite_upgrade_smithing_template"
        },
        sequence: [
            {
                type: "create:deploying",
                ingredients: [
                    {
                        item: "create_attack_7:incomplete_netherite_upgrade_smithing_template"
                    },
                    {
                        item: "create_attack_7:polished_diamond"
                    }
                ],
                results: [
                    {
                        id: "create_attack_7:incomplete_netherite_upgrade_smithing_template"
                    }
                ]
            },
            {
                type: "create:deploying",
                ingredients: [
                    {
                        item: "create_attack_7:incomplete_netherite_upgrade_smithing_template"
                    },
                    {
                        item: "create_attack_7:netherrack_sheet"
                    }
                ],
                results: [
                    {
                        id: "create_attack_7:incomplete_netherite_upgrade_smithing_template"
                    }
                ]
            },
            {
                type: "create:pressing",
                ingredients: [
                    {
                        item: "create_attack_7:incomplete_netherite_upgrade_smithing_template"
                    }
                ],
                results: [
                    {
                        id: "create_attack_7:incomplete_netherite_upgrade_smithing_template"
                    }
                ]
            }
        ]
    })
})
