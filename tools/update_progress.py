"""Write each era's development progress into index.html from the engine's parity tracker.

Usage: python tools/update_progress.py [<workspace>/progress/parity]

Progress per title = the mean of its two 1:1 figures from report.json (tools/parity in the engine
repository): original engine code verified 1:1, and original game content decoded 1:1, each weighed
by bytes. Equal halves so neither the code (a few MB) nor the content (over a GB) swamps the other.
A title without a report shows "Not yet measured".
"""
import json
import re
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
TITLES = {"bf1942": "bf1942", "bfv": "bfv", "bf2": "bf2", "bf2142": "bf2142"}  # data-title -> report folder


def percent(report: dict) -> float:
    code = report["code"]["tiers"]
    data = report["data"]["tiers"]
    code_1to1 = (code["verified"] + code["exact"]) / report["code"]["in_scope_bytes"]
    data_1to1 = (data["verified"] + data["exact"]) / report["data"]["bytes"]
    return 50.0 * (code_1to1 + data_1to1)


def main() -> int:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else SITE.parent / "progress" / "parity"
    page = SITE / "index.html"
    html = page.read_text(encoding="utf-8")
    for key, folder in TITLES.items():
        report = root / folder / "report.json"
        if report.exists():
            p = percent(json.loads(report.read_text(encoding="utf-8")))
            value, label, width, tag = f"{p:.0f}", f"{p:.0f}%", f"{p:.1f}%", "<b>"
        else:
            value, label, width, tag = "0", "Not yet measured", "0%", '<b class="na">'
        block = re.compile(
            r'(<div class="progress" data-title="' + key + r'">.*?)<b[^>]*>(.*?)(</b>.*?aria-valuenow=")(.*?)(".*?style="width: )(.*?)(")',
            re.S)
        html, n = block.subn(lambda m: m[1] + tag + label + m[3] + value + m[5] + width + m[7], html)
        if n != 1:
            print(f"{key}: progress block not found")
            return 1
        print(f"{key}: {label}")
    page.write_text(html, encoding="utf-8", newline="\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
