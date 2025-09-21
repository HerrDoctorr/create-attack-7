ServerEvents.recipes((event) => {
    event.remove({ output: "immersive_aircraft:hull" })
    event.remove({ output: "immersive_aircraft:engine" })
    event.remove({ output: "immersive_aircraft:sail" })
    event.remove({ output: "immersive_aircraft:boiler" })
    event.remove({ output: "immersive_aircraft:airship" })
    event.remove({ output: "immersive_aircraft:cargo_airship" })
    event.remove({ output: "immersive_aircraft:biplane" })
    event.remove({ output: "immersive_aircraft:gyrodyne" })
    event.remove({ output: "immersive_aircraft:quadrocopter" })
    event.remove({ output: "immersive_aircraft:enhanced_propeller" })
    event.remove({ output: "immersive_aircraft:eco_engine" })
    event.remove({ output: "immersive_aircraft:nether_engine" })
    event.remove({ output: "immersive_aircraft:steel_boiler" })
    event.remove({ output: "immersive_aircraft:sturdy_pipes" })
    event.remove({ output: "immersive_aircraft:gyroscope" })
    event.remove({ output: "immersive_aircraft:improved_landing_gear" })
    event.remove({ output: "man_of_many_planes:economy_plane" })
    event.remove({ output: "man_of_many_planes:scarlet_biplane" })


    // Hull
    event.shaped(
        "immersive_aircraft:hull",
        [
            "BBB",
            "SSS",
            "BBB"
        ],
        {
            B: "farmersdelight:tree_bark",
            S: "create_dd:steel_sheet",
        }
    )

    // Engine
    event.custom({
        type: "create:sequenced_assembly",
        ingredient: Item.of("immersive_aircraft:boiler"),
        transitionalItem: Item.of("create_attack_7:incomplete_engine"),
        sequence: [
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_engine"),
                    Item.of("minecraft:compass")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_engine")
                ]
            },
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_engine"),
                    Item.of("create:brass_ingot")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_engine")
                ]
            },
            {
                type: "create:pressing",
                ingredients: [
                    Item.of("create_attack_7:incomplete_engine")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_engine")
                ]
            }
        ],
        results: [
            Item.of("immersive_aircraft:engine")
        ],
        loops: 1
    })

    // Boiler
    event.custom({
        type: "create:sequenced_assembly",
        ingredient: Item.of("create_attack_7:incomplete_boiler"),
        transitionalItem: Item.of("create_attack_7:incomplete_boiler"),
        sequence: [
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_boiler"),
                    Item.of("minecraft:blast_furnace")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_boiler")
                ]
            },
            {
                type: "create:pressing",
                ingredients: [
                    Item.of("create_attack_7:incomplete_boiler")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_boiler")
                ]
            },
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_boiler"),
                    Item.of("minecraft:glass_pane")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_boiler")
                ]
            },
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_boiler"),
                    Item.of("minecraft:iron_ingot")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_boiler")
                ]
            },
            {
                type: "create:pressing",
                ingredients: [
                    Item.of("create_attack_7:incomplete_boiler")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_boiler")
                ]
            }
        ],
        results: [
            Item.of("immersive_aircraft:boiler")
        ],
        loops: 1
    })

    // Airship
    event.custom({
        type: "create:mechanical_crafting",
        pattern: [
            " SSSS",
            "SSSS ",
            " SSS ",
            " L L ",
            "HHHEP"
        ],
        key: {
            S: Item.of("create:white_sail"),
            L: Item.of("minecraft:lead"),
            H: Item.of("immersive_aircraft:hull"),
            E: Item.of("immersive_aircraft:engine"),
            P: Item.of("create:propeller")
        },
        result: Item.of("immersive_aircraft:airship"),
        "acceptMirrored": true
    })

    // Cargo Airship
    event.custom({
        type: "create:mechanical_crafting",
        pattern: [
            " SSSS",
            "SSSEP",
            " SSS ",
            " L L ",
            "HCCEP"
        ],
        key: {
            S: Item.of("create:white_sail"),
            L: Item.of("minecraft:lead"),
            H: Item.of("immersive_aircraft:hull"),
            C: Item.of("minecraft:chest"),
            E: Item.of("immersive_aircraft:engine"),
            P: Item.of("create:propeller")
        },
        result: Item.of("immersive_aircraft:cargo_airship"),
        "acceptMirrored": true
    })

    // Biplane
    event.custom({
        type: "create:mechanical_crafting",
        pattern: [
            "SS    ",
            "SS    ",
            "SS    ",
            "SSHH S",
            "PEBAAA",
            "SSHH S",
            "SS    ",
            "SS    ",
            "SS    "
        ],
        key: {
            S: Item.of("create:white_sail"),
            H: Item.of("immersive_aircraft:hull"),
            P: Item.of("create:propeller"),
            E: Item.of("immersive_aircraft:engine"),
            B: Item.of("create:black_seat"),
            A: Item.of("create:andesite_casing")
        },
        result: Item.of("immersive_aircraft:biplane"),
        "acceptMirrored": true
    })

    // Gyrodyne
    event.custom({
        type: "create:mechanical_crafting",
        pattern: [
            "   S  ",
            "   S  ",
            "TTHHHT",
            "GHBPBH",
            "TTHHHT",
            "   S  ",
            "   S  "
        ],
        key: {
            S: Item.of("create:white_sail"),
            T: Item.of("minecraft:stick"),
            H: Item.of("immersive_aircraft:hull"),
            G: Item.of("minecraft:grindstone"),
            B: Item.of("create:black_seat"),
            P: Item.of("create_dd:4_blade_fan")
        },
        result: Item.of("immersive_aircraft:gyrodyne"),
        acceptMirrored: true
    })

    // Quadrocopter
    event.custom({
        type: "create:mechanical_crafting",
        pattern: [
            "P  P",
            "HHHH",
            "HCCE",
            "HHHH",
            "P  P"
        ],
        key: {
            P: Item.of("create:propeller"),
            H: Item.of("immersive_aircraft:hull"),
            C: Item.of("farmersdelight:canvas_rug"),
            E: Item.of("immersive_aircraft:engine")
        },
        result: Item.of("immersive_aircraft:quadrocopter"),
        acceptMirrored: true
    })

    // Enhanced Propeller
    event.custom({
        type: "create:mixing",
        ingredients: [
            Item.of("create:propeller"),
            Item.of("create:brass_ingot")
        ],
        results: [
            Item.of("immersive_aircraft:enhanced_propeller")
        ],
        heatRequirement: "heated"
    })

    // Eco Engine
    event.custom({
        type: "create:sequenced_assembly",
        ingredient: Item.of("immersive_aircraft:engine"),
        transitionalItem: Item.of("create_attack_7:incomplete_eco_engine"),
        sequence: [
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_eco_engine"),
                    Item.of("minecraft:copper_ingot")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_eco_engine")
                ]
            },
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_eco_engine"),
                    Item.of("minecraft:blue_stained_glass_pane")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_eco_engine")
                ]
            },
            {
                type: "create:pressing",
                ingredients: [
                    Item.of("create_attack_7:incomplete_eco_engine")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_eco_engine")
                ]
            }
        ],
        results: [
            Item.of("immersive_aircraft:eco_engine")
        ],
        loops: 3
    })

    // Empty Nether Engine
    event.shaped(
        Item.of("create_attack_7:empty_nether_engine"),
        [
            "N N",
            "SGS"
        ],
        {
            N: Item.of("netherite_ingot"),
            S: Item.of("create_dd:steel_ingot"),
            G: Item.of("minecraft:glass_pane")
        }
    )

    // Nether Engine
    event.custom({
        type: "create:deploying",
        ingredients: [
            Item.of("create_attack_7:empty_nether_engine"),
            Item.of("minecraft:magma_cream")
        ],
        results: [
            Item.of("immersive_aircraft:nether_engine")
        ]
    })

    // Steel Boiler
    event.shaped(
        Item.of("immersive_aircraft:steel_boiler"),
        [
            "SSS",
            "SBS",
            "SFS"
        ],
        {
            S: Item.of("create_dd:steel_ingot"),
            B: Item.of("immersive_aircraft:boiler"),
            F: Item.of("minecraft:blast_furnace")
        }
    )

    // Sturdy Pipes
    event.custom({
        type: "create:sequenced_assembly",
        ingredient: Item.of("create:fluid_pipe"),
        transitionalItem: Item.of("create_attack_7:incomplete_sturdy_pipes"),
        sequence: [
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_sturdy_pipes"),
                    Item.of("minecraft:iron_ingot")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_sturdy_pipes")
                ]
            }
        ],
        results: [
            Item.of("immersive_aircraft:sturdy_pipes")
        ],
        loops: 3
    })

    // Gyroscope
    event.custom({
        type: "create:sequenced_assembly",
        ingredient: Item.of("minecraft:compass"),
        transitionalItem: Item.of("create_attack_7:incomplete_gyroscope"),
        sequence: [
            {
                type: "create:deploying",
                ingredients: [
                    Item.of("create_attack_7:incomplete_gyroscope"),
                    Item.of("create:electron_tube")
                ],
                results: [
                    Item.of("create_attack_7:incomplete_gyroscope")
                ]
            }
        ],
        results: [
            Item.of("immersive_aircraft:gyroscope")
        ],
        loops: 2
    })

    // Wheel
    event.shaped(
        Item.of("create_attack_7:wheel"),
        [
            " R ",
            "RSR",
            " R "
        ],
        {
            R: Item.of("tfmg:rubber_sheet"),
            S: Item.of("tfmg:steel_ingot")
        }
    )

    // Improved Landing Gear
    event.shaped(
        Item.of("immersive_aircraft:improved_landing_gear"),
        [
            "II",
            "WI"
        ],
        {
            I: Item.of("minecraft:iron_ingot"),
            W: Item.of("create_attack_7:wheel")
        }
    )
    
    // Economy Plane (MoMP)
    event.custom({
        type: "create:mechanical_crafting",
        pattern: [
            " SHS     ",
            "SSWP     ",
            " SHK     ",
            "GGWSHHHSS",
            "GBHSEWWSS",
            "GGWSHHHSS",
            " SHK     ",
            "SSWP     ",
            " SHS     "
        ],
        key: {
            S: Item.of("create:white_sail"),
            W: Item.of("createaddition:iron_wire"),
            H: Item.of("immersive_aircraft:hull"),
            P: Item.of("immersive_aircraft:propeller"),
            G: Item.of("minecraft:glass_pane"),
            B: Item.of("create:black_seat"),
            E: Item.of("immersive_aircraft:engine"),
            K: Item.of("create:belt_connector")
        },
        result: Item.of("man_of_many_planes:economy_plane"),
        acceptMirrored: true
    })

    // Scarlet Biplane
    event.custom({
        type: "create:mechanical_crafting",
        pattern: [
            "  HHH    ",
            "  HIH    ",
            "  HWH  HH",
            "SSHHHS HH",
            "PSGBHSSWH",
            "SSHHHS HH",
            "  HWH  HH",
            "  HIH    ",
            "  HHH    "
        ],
        key: {
            S: Item.of("tfmg:steel_block"),
            H: Item.of("immersive_aircraft:hull"),
            P: Item.of("create:propeller"),
            B: Item.of("create:black_seat"),
            I: Item.of("createaddition:iron_wire"),
            W: Item.of("create_attack_7:wheel"),
            G: Item.of("minecraft:glass_pane"),
        },
        result: Item.of("man_of_many_planes:scarlet_biplane"),
        "acceptMirrored": true
    })
})