from pathlib import Path

lines = [
    "Inacio Wellington Oliveira",
    "Curriculo - versao placeholder",
    "Substituir este arquivo por assets/cv.pdf real.",
]
content = "BT /F1 16 Tf 72 760 Td (" + lines[0] + ") Tj ET\n"
content += "BT /F1 11 Tf 72 730 Td (" + lines[1] + ") Tj 0 -20 Td (" + lines[2] + ") Tj ET\n"

objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R "
    "/Resources << /Font << /F1 5 0 R >> >> >>",
    f"<< /Length {len(content)} >>\nstream\n{content}endstream",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
]

out = "%PDF-1.4\n"
offsets = []
for i, body in enumerate(objs, start=1):
    offsets.append(len(out))
    out += f"{i} 0 obj\n{body}\nendobj\n"

xref = len(out)
out += f"xref\n0 {len(objs) + 1}\n0000000000 65535 f \n"
for off in offsets:
    out += f"{off:010d} 00000 n \n"
out += f"trailer\n<< /Size {len(objs) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n"

target = Path(__file__).resolve().parent.parent / "assets" / "cv.pdf"
target.write_bytes(out.encode("latin-1"))
print("ok", target)
