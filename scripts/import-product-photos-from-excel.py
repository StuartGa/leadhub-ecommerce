#!/usr/bin/env python3
"""
Importa fotografías de productos desde el Excel del cliente (Sheet1).
Descarga imágenes de Google Drive y actualiza products.json.

Uso:
  python3 scripts/import-product-photos-from-excel.py [ruta-al-excel]
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_EXCEL = Path.home() / "Downloads" / "Productos página web Abril 2026.xlsx"
PRODUCTS_JSON = ROOT / "src/infrastructure/data/products.json"
OUT_DIR = ROOT / "public/images/products"
MAX_PHOTOS = 3
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def norm_sku(value: str) -> str:
    cleaned = str(value).strip().upper()
    stripped = re.sub(r"^0+", "", cleaned)
    return stripped or "0"


def drive_file_id(url: str) -> str | None:
    match = re.search(r"/d/([a-zA-Z0-9_-]+)", url)
    return match.group(1) if match else None


def download_drive_image(url: str, destination: Path) -> bool:
    file_id = drive_file_id(url)
    if not file_id:
        return False

    tmp = destination.with_suffix(".download")

    def fetch(download_url: str) -> bytes | None:
        try:
            request = urllib.request.Request(
                download_url,
                headers={"User-Agent": "Mozilla/5.0 (compatible; SanPatricImport/1.0)"},
            )
            with urllib.request.urlopen(request, timeout=120) as response:
                data = response.read()
            if len(data) < 1024:
                return None
            if b"<!DOCTYPE html" in data[:256].lower() or b"<html" in data[:256].lower():
                return None
            return data
        except (urllib.error.URLError, TimeoutError, OSError):
            return None

    data = fetch(f"https://drive.google.com/uc?export=download&id={file_id}")
    if data is None:
        data = fetch(f"https://drive.google.com/uc?export=download&confirm=t&id={file_id}")

    if data is None:
        return False

    tmp.write_bytes(data)

    try:
        subprocess.run(
            ["sips", "-s", "format", "webp", str(tmp), "--out", str(destination)],
            check=True,
            capture_output=True,
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        destination.write_bytes(tmp.read_bytes())
    finally:
        if tmp.exists():
            tmp.unlink()

    return destination.exists() and destination.stat().st_size > 0


def load_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    strings: list[str] = []
    for item in root.findall("m:si", NS):
        parts = [node.text or "" for node in item.findall(".//m:t", NS)]
        strings.append("".join(parts))
    return strings


def cell_value(cell: ET.Element, shared_strings: list[str]) -> str:
    cell_type = cell.get("t")
    value_node = cell.find("m:v", NS)
    if value_node is None or value_node.text is None:
        return ""
    if cell_type == "s":
        return shared_strings[int(value_node.text)]
    return value_node.text


def load_excel_rows(excel_path: Path) -> dict[str, list[str]]:
    rows_by_sku: dict[str, list[str]] = {}

    with zipfile.ZipFile(excel_path) as archive:
        shared_strings = load_shared_strings(archive)
        sheet = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))

        for row in sheet.findall(".//m:sheetData/m:row", NS):
            cells: dict[str, str] = {}
            for cell in row.findall("m:c", NS):
                reference = cell.get("r", "")
                column = re.match(r"[A-Z]+", reference)
                if not column:
                    continue
                cells[column.group(0)] = cell_value(cell, shared_strings).strip()

            sku = cells.get("A", "")
            if not sku:
                continue

            photo_urls = [
                cells[key]
                for key in ("E", "F", "G")
                if cells.get(key, "").startswith("http")
            ]
            rows_by_sku[norm_sku(sku)] = photo_urls[:MAX_PHOTOS]

    return rows_by_sku


def main() -> None:
    excel_path = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else DEFAULT_EXCEL
    if not excel_path.exists():
        print(f"❌ No se encontró el Excel: {excel_path}")
        sys.exit(1)

    products = json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))
    excel_photos = load_excel_rows(excel_path)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    updated = 0
    skipped = 0
    failed: list[str] = []

    for product in products:
        sku = product.get("sku")
        if not sku:
            skipped += 1
            continue

        urls = excel_photos.get(norm_sku(sku), [])
        if not urls:
            skipped += 1
            continue

        slug = product.get("slug") or norm_sku(sku).lower()
        product_dir = OUT_DIR / slug
        product_dir.mkdir(parents=True, exist_ok=True)

        gallery: list[str] = []
        for index, url in enumerate(urls, start=1):
            filename = f"{index}.webp"
            destination = product_dir / filename
            public_path = f"images/products/{slug}/{filename}"

            if destination.exists() and destination.stat().st_size > 0:
                gallery.append(public_path)
                continue

            print(f"↓ {sku} ({slug}) foto {index}/{len(urls)}")
            if download_drive_image(url, destination):
                gallery.append(public_path)
            else:
                failed.append(f"{sku} foto {index}")

        if not gallery:
            failed.append(str(sku))
            continue

        product["imageUrl"] = gallery[0]
        product["gallery"] = gallery
        updated += 1

    PRODUCTS_JSON.write_text(
        json.dumps(products, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print("\n══════════════════════════════════════")
    print(f"✅ Productos actualizados: {updated}")
    print(f"⏭️  Sin fotos en Excel: {skipped}")
    print(f"❌ Descargas fallidas: {len(failed)}")
    if failed[:10]:
        print("   Ejemplos:", ", ".join(failed[:10]))


if __name__ == "__main__":
    main()
