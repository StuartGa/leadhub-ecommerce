#!/usr/bin/env python3
"""
Convierte el Excel del cliente a catalog.json para el script de importación.
Uso: python3 scripts/parse-excel.py
"""
import json, sys, os

try:
    import openpyxl
except ImportError:
    os.system("pip3 install openpyxl -q")
    import openpyxl

EXCEL_PATH = os.path.expanduser(
    "~/Downloads/yectic- Alimentos Convenientes San Patric/Archivos/Productos página web Abril 2026.xlsx"
)

OUT_PATH = os.path.join(os.path.dirname(__file__), "catalog.json")

def main():
    if not os.path.exists(EXCEL_PATH):
        print(f"❌  No se encontró el Excel en:\n    {EXCEL_PATH}")
        sys.exit(1)

    wb = openpyxl.load_workbook(EXCEL_PATH)
    ws = wb["Sheet1"]

    products = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        sku = row[0]
        name = row[1]
        if not sku or not name:
            continue
        products.append({
            "sku":       str(sku).strip(),
            "name":      str(name).strip(),
            "price":     row[2],
            "shortDesc": str(row[3]).strip() if row[3] else "",
            "foto1":     row[4],
            "foto2":     row[5],
            "foto3":     row[6],
            "foto4":     row[7],
            "longDesc":  str(row[8]).strip() if row[8] else "",
            "category":  str(row[9]).strip() if row[9] else "",
            "brand":     str(row[10]).strip() if row[10] else "",
            "weight":    str(row[11]).strip() if row[11] else "",
            "related":   str(row[12]).strip() if row[12] else "",
        })

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    print(f"✅  {len(products)} productos exportados → {OUT_PATH}")

if __name__ == "__main__":
    main()
