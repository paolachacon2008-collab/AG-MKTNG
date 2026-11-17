"""Recorta las capturas de pantalla (quita la interfaz de Instagram / Google Maps)
y genera versiones WebP + JPG en varios tamaños dentro de /img.
Uso: python3 herramientas/optimizar_fotos.py
Cuando lleguen las fotos originales del local, basta con poner la caja de recorte a None."""
from PIL import Image
import os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "fotos-originales")
OUT = os.path.join(BASE, "img")

# nombre de salida: (archivo original, caja de recorte (izq, arriba, der, abajo) o None, anchos)
FOTOS = {
    "huevos-rotos":        ("huevos-rotos-instagram.png",                 (90, 100, 1640, 2205), [480, 800, 1200, 1550]),
    "gambas-setas":        ("gambas-setas-tenedor-instagram.png",         (305, 495, 1340, 2050), [480, 800, 1035]),
    "ezequiel":            ("ezequiel-cocina-instagram.png",              (305, 545, 1340, 1765), [480, 800, 1035]),
    "ensalada-templada":   ("ensalada-templada-almendra.png",             (0, 175, 1640, 2190), [480, 800, 1200]),
    "salon":               ("salon-cartel-leon.png",                      (0, 175, 1640, 2190), [480, 800, 1200]),
    "ostras":              ("ostras.png",                                 (0, 175, 1640, 2190), [480, 800, 1200]),
    "alcachofas":          ("CLIENTA-alcachofas-maria-marquez-torres.png",(0, 240, 1640, 2190), [480, 800, 1200]),
    "fideos-tostados":     ("CLIENTA-fideos-tostados-carolina-r.png",     (300, 300, 1640, 2030), [480, 800, 1200]),
}

def guardar(im, nombre, anchos):
    for w in anchos:
        w = min(w, im.width)
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        r.save(os.path.join(OUT, f"{nombre}-{w}.webp"), "WEBP", quality=78, method=6)
        r.save(os.path.join(OUT, f"{nombre}-{w}.jpg"), "JPEG", quality=80, optimize=True, progressive=True)
    print(nombre, im.size)

os.makedirs(OUT, exist_ok=True)
for nombre, (archivo, caja, anchos) in FOTOS.items():
    im = Image.open(os.path.join(SRC, archivo)).convert("RGB")
    if caja: im = im.crop(caja)
    guardar(im, nombre, anchos)

# Imagen para compartir (Open Graph) 1200x630, a partir de los huevos rotos
im = Image.open(os.path.join(SRC, FOTOS["huevos-rotos"][0])).convert("RGB").crop(FOTOS["huevos-rotos"][1])
w = im.width; h = round(w * 630 / 1200); top = int(im.height * 0.42)
im.crop((0, top, w, top + h)).resize((1200, 630), Image.LANCZOS).save(os.path.join(OUT, "compartir-1200x630.jpg"), "JPEG", quality=82, optimize=True)

# Logo: todo lo que no es oscuro (letras y león) pasa a transparente
logo = Image.open(os.path.join(SRC, "logo.jpg")).convert("RGB").crop((105, 185, 750, 535))
sand = (201, 178, 130)
rgba = Image.new("RGBA", logo.size)
px = []
for p in logo.get_flattened_data() if hasattr(logo, "get_flattened_data") else logo.getdata():
    lum = 0.3 * p[0] + 0.59 * p[1] + 0.11 * p[2]
    alpha = 255 if lum < 105 else (0 if lum > 150 else int((150 - lum) * 255 / 45))
    px.append(tuple(p) + (alpha,))
rgba.putdata(px)
rgba = rgba.crop(rgba.getbbox())
for w in (220, 440):
    r = rgba.resize((w, round(rgba.height * w / rgba.width)), Image.LANCZOS)
    r.save(os.path.join(OUT, f"logo-{w}.png"), optimize=True)
    r.save(os.path.join(OUT, f"logo-{w}.webp"), "WEBP", quality=90)
print("logo", rgba.size)

# Favicon: cabeza de león sobre círculo arena
src = Image.open(os.path.join(SRC, "logo.jpg")).convert("RGB")
leon = src.crop((352, 190, 493, 365))
lado = 512
fav = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
from PIL import ImageDraw
ImageDraw.Draw(fav).ellipse((0, 0, lado - 1, lado - 1), fill=sand + (255,))
l = leon.resize((300, round(300 * leon.height / leon.width)), Image.LANCZOS)
mask = Image.new("L", l.size, 255)
fav.paste(l, ((lado - l.width) // 2, (lado - l.height) // 2 + 6), mask)
fav.save(os.path.join(BASE, "favicon-512.png"))
fav.resize((180, 180), Image.LANCZOS).save(os.path.join(BASE, "apple-touch-icon.png"))
fav.resize((32, 32), Image.LANCZOS).save(os.path.join(BASE, "favicon-32.png"))
fav.save(os.path.join(BASE, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("favicon ok")
