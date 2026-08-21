StartupEvents.registry("fluid", (event) => {
    const jam = (id, color) => event.create(`create_attack_7:${id}`, "thick")
        .slopeFindDistance(2)
        .tint(color)
        .levelDecreasePerBlock(2)
        .tickRate(30)
        .type((type) => type
            .canDrown(true)
            .density(2000)
            .viscosity(1500)
        )

    jam("strawberry_jam", 0xD92F54)
    jam("sweetberry_jam", 0x8E245E)
    jam("glowberry_jam", 0xF28CFF)
    jam("apple_jam", 0xD86B32)
    jam("chocolate_jam", 0x6B3E26)
})
