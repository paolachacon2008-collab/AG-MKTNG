"""Prepara las fotos de la web a partir de fotos-originales/.

Solo recorta, redimensiona y comprime. No cambia colores ni retoca los platos.
Uso:  python3 fuente/fotos.py
Resultado: fuente/static/img/  (luego build.py lo copia a web/)
"""
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "fotos-originales"
LOGOS = RAIZ / "logo"
DESTINO = RAIZ / "fuente" / "static" / "img"
ANCHOS = (480, 800, 1200)

# Recortes (izquierda, arriba, derecha, abajo) en píxeles de la foto original.
# None = la foto se usa entera.
RECORTES = {
    "carbonara-ingredientes": (0, 650, 1194, 1346),      # fuera el texto «Producto 100% italiano»
    "horno-da-mimi": (0, 0, 1206, 1000),                 # parte de arriba: horno y nombre grabado
    "pasta-del-mes-pappardelle": (0, 0, 1206, 1030),     # solo la foto, sin el texto del cartel
    "pizza-del-mes-speck-patata": (0, 540, 1206, 1440),  # solo la pizza, sin textos ni logo
    "rueda-parmesano": (0, 100, 1206, 1563),             # fuera el indicador «1/2» de Instagram
    "masa-tomate": (0, 0, 1170, 1270),
    "gnocchi-nueces": None,
    "parmigiana-berenjena": None,
    "pizza-blanca-porcion": None,
    "pizza-salmon-rucula": None,
    "postre-chocolate": None,
    "postre-crema-avellana": None,
}


def guardar(im, nombre, ancho):
    if im.width > ancho:
        alto = round(im.height * ancho / im.width)
        im = im.resize((ancho, alto), Image.LANCZOS)
    im.save(DESTINO / f"{nombre}-{ancho}.webp", "WEBP", quality=78, method=6)
    im.save(DESTINO / f"{nombre}-{ancho}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    return im.size


def main():
    DESTINO.mkdir(parents=True, exist_ok=True)
    medidas = {}
    for nombre, caja in RECORTES.items():
        im = ImageOps.exif_transpose(Image.open(ORIGEN / f"{nombre}.jpg")).convert("RGB")
        if caja:
            im = im.crop(caja)
        medidas[nombre] = im.size
        for ancho in ANCHOS:
            guardar(im, nombre, ancho)

    # Imagen para redes sociales (Open Graph), 1200x630, foto real recortada.
    im = Image.open(ORIGEN / "pizza-blanca-porcion.jpg").convert("RGB")
    ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, 0.55)).save(
        DESTINO / "og-da-mimi.jpg", "JPEG", quality=82, optimize=True)

    # Logos (provisionales) a 2x para la cabecera y el pie.
    for color in ("rojo", "tinta", "crema"):
        logo = Image.open(LOGOS / f"logo-da-mimi-{color}.png").convert("RGBA")
        logo.thumbnail((440, 440), Image.LANCZOS)
        logo.save(DESTINO / f"logo-da-mimi-{color}.png", optimize=True)
        logo.save(DESTINO / f"logo-da-mimi-{color}.webp", "WEBP", quality=90)

    # Iconos: logo rojo sobre crema.
    logo = Image.open(LOGOS / "logo-da-mimi-rojo.png").convert("RGBA")
    for lado, archivo in ((512, "icon-512.png"), (192, "icon-192.png"),
                          (180, "apple-touch-icon.png"), (32, "favicon-32.png")):
        lienzo = Image.new("RGBA", (lado, lado), "#FBF6EE")
        l = logo.copy()
        l.thumbnail((int(lado * 0.88), lado), Image.LANCZOS)
        lienzo.paste(l, ((lado - l.width) // 2, (lado - l.height) // 2), l)
        lienzo.convert("RGB").save(DESTINO / archivo, optimize=True)
    Image.open(DESTINO / "icon-512.png").save(DESTINO / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    for n, (w, h) in medidas.items():
        print(f"{n}: {w}x{h}")


if __name__ == "__main__":
    main()
