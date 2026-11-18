"""Recorta las capturas de fotos-originales/ y genera las versiones web en img/.

Uso:  python3 herramientas/optimizar_fotos.py   (desde la carpeta 11n-brasserie)
Necesita Pillow:  pip install pillow

Cada foto genera tamaños 480, 800 y 1200 px de ancho (si la original lo permite)
en JPG y WebP. Cuando tengáis las fotos originales del local, poned la caja de
recorte a None.
"""
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIG = RAIZ / "fotos-originales"
SALIDA = RAIZ / "img"

# nombre de salida: (archivo original, caja de recorte (izq, arriba, der, abajo) o None, anchos)
FOTOS = {
    "interior":      ("ig-interior-letras-11n.png", (140, 380, 1465, 2065), (480, 800, 1200)),
    "vasos-burbuja": ("ig-vasos-burbuja.png",       (78, 288, 1442, 2110),  (480, 800, 1200)),
    "cafes-ojo":     ("ig-cafes-ojo-azul.png",      (146, 300, 1449, 2040), (480, 800, 1200)),
    "chica-matcha":  ("ig-chica-matcha.png",        (185, 347, 1493, 2085), (480, 800, 1200)),
    "galletas":      ("ig-galletas.png",            (115, 332, 1523, 2212), (480, 800, 1200)),
    "pumpkin-spice": ("ig-pumpkin-spice.png",       (177, 321, 1456, 2030), (480, 800, 1200)),
    "brunch-marmol": ("ig-brunch-marmol.png",       (219, 300, 1552, 2075), (480, 800, 1200)),
}


def guardar(img, nombre, ancho):
    if img.width > ancho:
        alto = round(img.height * ancho / img.width)
        img = img.resize((ancho, alto), Image.LANCZOS)
    base = SALIDA / f"{nombre}-{ancho}"
    img.save(f"{base}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    img.save(f"{base}.webp", "WEBP", quality=78, method=6)
    print(f"  {base.name}  {img.width}x{img.height}")


def main():
    SALIDA.mkdir(exist_ok=True)
    for nombre, (archivo, caja, anchos) in FOTOS.items():
        img = Image.open(ORIG / archivo).convert("RGB")
        if caja:
            img = img.crop(caja)
        print(nombre, img.size)
        for ancho in anchos:
            guardar(img, nombre, ancho)


if __name__ == "__main__":
    main()
