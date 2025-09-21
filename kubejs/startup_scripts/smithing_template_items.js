StartupEvents.registry("item", (event) => {
    event.create("create_attack_7:netherrack_sheet")
        .texture("create_attack_7:item/netherrack_sheet")
        .maxStackSize(64)
    
    event.create("create_attack_7:incomplete_netherite_upgrade_smithing_template")
        .texture("create_attack_7:item/incomplete_netherite_upgrade_smithing_template")
        .maxStackSize(64)

    event.create("create_attack_7:polished_diamond")
        .texture("create_attack_7:item/polished_diamond")
        .maxStackSize(64)
})