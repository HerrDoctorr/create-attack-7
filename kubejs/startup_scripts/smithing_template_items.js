StartupEvents.registry("item", event => {
    event.create("ca7:netherrack_sheet")
        .texture("ca7:item/netherrack_sheet")
        .maxStackSize(64)
    
    event.create("ca7:incomplete_netherite_upgrade_smithing_template")
        .texture("ca7:item/incomplete_netherite_upgrade_smithing_template")
        .maxStackSize(64)

    event.create("ca7:polished_diamond")
        .texture("ca7:item/polished_diamond")
        .maxStackSize(64)
})