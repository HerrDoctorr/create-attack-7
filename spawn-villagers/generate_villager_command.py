#!/usr/bin/env python3
"""Generate a summon command from one of the villager trade JSON files."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_CURRENCY_FILE = SCRIPT_DIR / "currency_mapping.json"
DEFAULT_ITEMS_FILE = SCRIPT_DIR / "items.json"

# These are vanilla professions. Categories without an exact vanilla equivalent
# get a sensible workstation profession by default; --profession can override it.
PROFESSIONS = {
    "fisherman.json": "fisherman",
    "photographer.json": "librarian",
    "mason_builder.json": "mason",
    "carpenter_furniture_maker.json": "mason",
    "create_engineer.json": "toolsmith",
    "railway_conductor.json": "cartographer",
    "farmer_market_gardener.json": "farmer",
    "cook_baker.json": "butcher",
    "brewer_winemaker.json": "cleric",
    "quartermaster_storage_dealer.json": "toolsmith",
    "toolsmith.json": "toolsmith",
    "cartographer_explorer.json": "cartographer",
    "musician.json": "librarian",
    "armorer_weaponsmith.json": "weaponsmith",
    "florist_botanist.json": "farmer",
    "artillery_engineer.json": "toolsmith",
}


def load_json(path: Path) -> dict[str, Any]:
    try:
        with path.open(encoding="utf-8") as handle:
            value = json.load(handle)
    except FileNotFoundError as exc:
        raise SystemExit(f"File not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise SystemExit(f"Invalid JSON in {path}: {exc}") from exc

    if not isinstance(value, dict):
        raise SystemExit(f"Expected a JSON object in {path}")
    return value


def decompose_cost(cost: int, currency: dict[str, int]) -> list[tuple[str, int]]:
    """Represent cost using no more than two currency denominations.

    The generator prefers one denomination. If that is impossible, it searches
    for an exact two-denomination representation with stack-sized counts.
    """

    if cost <= 0:
        raise SystemExit(f"Trade cost must be positive, got {cost}")

    denominations = sorted(currency.items(), key=lambda pair: pair[1], reverse=True)

    for item_id, value in denominations:
        if cost % value == 0 and cost // value <= 64:
            return [(item_id, cost // value)]

    for first_index, (first_id, first_value) in enumerate(denominations):
        for second_id, second_value in denominations[first_index + 1 :]:
            for first_count in range(1, 65):
                remainder = cost - first_count * first_value
                if remainder <= 0 or remainder % second_value:
                    continue
                second_count = remainder // second_value
                if 1 <= second_count <= 64:
                    return [(first_id, first_count), (second_id, second_count)]

    raise SystemExit(
        f"Cost {cost} cannot be represented with at most two currency denominations "
        "using stack-sized counts"
    )


def snbt_item(item_id: str, count: int) -> str:
    # Namespaced IDs contain a colon, so they must be quoted in SNBT.
    return f"{{id:{json.dumps(item_id, ensure_ascii=False)},count:{count}}}"


def make_trade(
    item: dict[str, Any],
    currency: dict[str, int],
    direction: str,
    max_stack_sizes: dict[str, int],
) -> str:
    item_id = item.get("id")
    count = item.get("count")
    cost = item.get("cost")

    if not isinstance(item_id, str) or not item_id:
        raise SystemExit(f"Trade has an invalid item id: {item!r}")
    if not isinstance(count, int) or count <= 0:
        raise SystemExit(f"Trade {item_id} has an invalid count: {count!r}")
    if not isinstance(cost, int) or cost <= 0:
        raise SystemExit(f"Trade {item_id} has an invalid cost: {cost!r}")

    max_stack_size = max_stack_sizes.get(item_id)
    if max_stack_size is None:
        raise SystemExit(f"Trade {item_id} is missing from the item catalog")

    payment = decompose_cost(cost, currency)

    if direction == "sells":
        if count > max_stack_size:
            raise SystemExit(
                f"Sell trade {item_id} outputs {count}, but its maximum stack size is "
                f"{max_stack_size}; sell trades cannot use a second output slot"
            )
        parts = [f"buy:{snbt_item(payment[0][0], payment[0][1])}"]
        if len(payment) == 2:
            parts.append(f"buyB:{snbt_item(payment[1][0], payment[1][1])}")
        parts.append(f"sell:{snbt_item(item_id, count)}")
    elif direction == "buys":
        if len(payment) != 1:
            raise SystemExit(
                f"Buyback trade {item_id} has a two-denomination payout ({cost}); "
                "buyback payouts must fit in the single sell slot"
            )
        if count > max_stack_size * 2:
            raise SystemExit(
                f"Buyback trade {item_id} requests {count}, but the generator supports "
                f"at most two stacks ({max_stack_size * 2})"
            )
        parts = [
            f"buy:{snbt_item(item_id, min(count, max_stack_size))}",
        ]
        if count > max_stack_size:
            parts.append(f"buyB:{snbt_item(item_id, count - max_stack_size)}")
        parts.append(
            f"sell:{snbt_item(payment[0][0], payment[0][1])}",
        )
    else:
        raise ValueError(direction)

    parts.extend(["rewardExp:0b", "maxUses:9999999"])
    return "{" + ",".join(parts) + "}"


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate a no-AI villager summon command from a trade JSON file."
    )
    parser.add_argument("trade_file", type=Path, help="Category JSON file")
    parser.add_argument("--name", required=True, help="Villager custom name")
    parser.add_argument(
        "--profession",
        help="Override the inferred vanilla profession, for example librarian",
    )
    parser.add_argument("--type", default="plains", help="Villager biome type")
    parser.add_argument("--level", type=int, default=99, help="Villager level")
    parser.add_argument(
        "--currency-file",
        type=Path,
        default=DEFAULT_CURRENCY_FILE,
        help="Currency mapping JSON file",
    )
    parser.add_argument(
        "--items-file",
        type=Path,
        default=DEFAULT_ITEMS_FILE,
        help="Item catalog used for stack-size validation",
    )
    args = parser.parse_args()

    trade_data = load_json(args.trade_file)
    currency_data = load_json(args.currency_file)
    items_data = load_json(args.items_file)

    currency = {}
    for item_id, value in currency_data.items():
        if not isinstance(item_id, str) or not isinstance(value, int) or value <= 0:
            raise SystemExit(f"Invalid currency mapping entry: {item_id}: {value}")
        currency[item_id] = value

    item_entries = items_data.get("items")
    if not isinstance(item_entries, list):
        raise SystemExit("Item catalog must contain a list field named 'items'")
    max_stack_sizes = {}
    for entry in item_entries:
        if not isinstance(entry, dict):
            raise SystemExit(f"Invalid item catalog entry: {entry!r}")
        item_id = entry.get("id")
        max_stack_size = entry.get("maxStackSize")
        if (
            not isinstance(item_id, str)
            or not item_id
            or not isinstance(max_stack_size, int)
            or max_stack_size <= 0
        ):
            raise SystemExit(f"Invalid item catalog entry: {entry!r}")
        max_stack_sizes[item_id] = max_stack_size

    sells = trade_data.get("sells", [])
    buys = trade_data.get("buys", [])
    if not isinstance(sells, list) or not isinstance(buys, list):
        raise SystemExit("Trade JSON must contain list fields named 'sells' and 'buys'")

    sell_ids = {item.get("id") for item in sells}
    buy_ids = {item.get("id") for item in buys}
    overlap = sorted(sell_ids & buy_ids)
    if overlap:
        raise SystemExit(f"Items cannot be both sold and bought: {', '.join(overlap)}")

    recipes = [
        make_trade(item, currency, "sells", max_stack_sizes) for item in sells
    ] + [
        make_trade(item, currency, "buys", max_stack_sizes) for item in buys
    ]

    filename = args.trade_file.name
    profession = args.profession or PROFESSIONS.get(filename, "nitwit")
    custom_name = json.dumps(args.name, ensure_ascii=False)
    recipe_text = ",".join(recipes)

    command = (
        f"/summon villager ~ ~ ~ "
        f"{{VillagerData:{{profession:{profession},level:{args.level},type:{args.type}}},"
        "Invulnerable:1,PersistenceRequired:1,Silent:1,NoAI:1,"
        f"CustomName:{custom_name},Offers:" + "{Recipes:[" + recipe_text + "]}}"
    )
    print(command)


if __name__ == "__main__":
    main()
