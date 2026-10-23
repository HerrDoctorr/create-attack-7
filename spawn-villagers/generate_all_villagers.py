#!/usr/bin/env python3
"""Generate summon commands for all 16 spawn traders."""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
GENERATOR = SCRIPT_DIR / "generate_villager_command.py"

# Keep this list explicit so the wrapper only processes the intended 16 traders.
TRADERS = (
    ("fisherman.json", "Fischer"),
    ("photographer.json", "Fotograf"),
    ("mason_builder.json", "Maurer"),
    ("carpenter_furniture_maker.json", "Schreiner"),
    ("create_engineer.json", "Ingenieur"),
    ("railway_conductor.json", "Eisenbahner"),
    ("farmer_market_gardener.json", "Bauer"),
    ("cook_baker.json", "Koch"),
    ("brewer_winemaker.json", "Brauer"),
    ("quartermaster_storage_dealer.json", "Quartiermeister"),
    ("toolsmith.json", "Werkzeugschmied"),
    ("cartographer_explorer.json", "Kartograf"),
    ("musician.json", "Musiker"),
    ("armorer_weaponsmith.json", "Waffenschmied"),
    ("florist_botanist.json", "Botaniker"),
    ("artillery_engineer.json", "Artillerist"),
)


def generate_command(category_file: str, name: str) -> str:
    result = subprocess.run(
        [sys.executable, str(GENERATOR), str(SCRIPT_DIR / category_file), f"--name={name}"],
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate summon commands for all 16 German-named spawn traders."
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        help="Write one .mcfunction file per trader instead of printing commands",
    )
    args = parser.parse_args()

    if not GENERATOR.is_file():
        raise SystemExit(f"Generator script not found: {GENERATOR}")

    commands = [
        (category_file, name, generate_command(category_file, name))
        for category_file, name in TRADERS
    ]

    if args.output_dir is None:
        for _, _, command in commands:
            print(command)
        return

    args.output_dir.mkdir(parents=True, exist_ok=True)
    for category_file, _, command in commands:
        output_file = args.output_dir / f"{Path(category_file).stem}.mcfunction"
        output_file.write_text(command + "\n", encoding="utf-8")
        print(f"Wrote {output_file}")


if __name__ == "__main__":
    main()
