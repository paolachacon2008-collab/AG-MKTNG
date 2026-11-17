"""Genera una vista previa de la web en UN SOLO ARCHIVO HTML (con estilos, datos,
fuentes y fotos dentro), para poder abrirla o enviarla sin subir nada al hosting.
Uso: python3 herramientas/vista_previa.py [ruta_de_salida.html]
No es la versión para publicar: para el hosting se sube la carpeta normal (ver LEEME.md)."""
import base64, os, re, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = sys.argv[1] if len(sys.argv) > 1 else os.path.join(BASE, "vista-previa.html")
MIME = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg", "woff2": "font/woff2"}


def leer(rel):
    with open(os.path.join(BASE, rel), encoding="utf-8") as f:
        return f.read()


def data_uri(rel):
    with open(os.path.join(BASE, rel), "rb") as f:
        return "data:%s;base64,%s" % (MIME[rel.rsplit(".", 1)[1]], base64.b64encode(f.read()).decode())


html = leer("index.html")

# CSS con las fuentes dentro
css = leer("css/estilos.css")
css = re.sub(r'url\("\.\./(fuentes/[^"]+)"\)', lambda m: 'url("%s")' % data_uri(m.group(1)), css)
html = html.replace('<link rel="stylesheet" href="css/estilos.css">', "<style>%s</style>" % css)
html = re.sub(r'\s*<link rel="preload"[^>]*>', "", html)

# Scripts dentro
for src in ["datos/contacto.js", "datos/horario.js", "datos/carta.js", "datos/resenas.js", "js/main.js"]:
    html = html.replace('<script src="%s"></script>' % src, "<script>%s</script>" % leer(src).replace("</script", "<\\/script"))

# Fotos: una versión de 800 px de cada una (y el logo)
fotos = {}
for f in sorted(os.listdir(os.path.join(BASE, "img"))):
    if f.endswith("-800.webp"):
        fotos[f[:-9]] = data_uri("img/" + f)
fotos["logo"] = data_uri("img/logo-440.png")
script = """<script>
(function(){var F=%s;
function clave(u){var m=/img\\/(.+?)-(\\d+|1200x630)\\.(webp|jpg|png)/.exec(u||"");return m?(m[1]==="logo"?"logo":m[1]):null;}
document.querySelectorAll("source").forEach(function(s){var k=clave(s.getAttribute("srcset"));if(k&&F[k]){s.removeAttribute("sizes");s.setAttribute("srcset",F[k]);}});
document.querySelectorAll("img").forEach(function(i){var k=clave(i.getAttribute("src"));if(k&&F[k]){i.removeAttribute("srcset");i.removeAttribute("sizes");i.src=F[k];}});
})();</script>""" % repr(fotos).replace("'", '"')
html = html.replace("</body>", script + "\n</body>")

# Aviso de que es una vista previa
html = html.replace("<body>", '<body>\n<div style="background:#FFF1A8;color:#4A3B00;text-align:center;padding:.5rem 1rem;font:600 14px/1.4 system-ui,sans-serif;border-bottom:1px dashed #8A6D00">VISTA PREVIA · Lo marcado en amarillo está pendiente de confirmar. Los enlaces a las páginas legales solo funcionan en la web publicada.</div>', 1)

with open(SALIDA, "w", encoding="utf-8") as f:
    f.write(html)
print("Vista previa creada:", SALIDA, "(%d KB)" % (os.path.getsize(SALIDA) // 1024))
