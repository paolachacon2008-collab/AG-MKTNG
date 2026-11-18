"""Genera una VISTA PREVIA de toda la web en UN SOLO ARCHIVO HTML (estilos, datos,
fuentes, fotos y las 8 páginas dentro), para abrirla en el móvil o enseñarla
sin subir nada a un hosting.

Uso (desde la carpeta 11n-brasserie):  python3 herramientas/vista_previa.py
Crea: vista-previa-11n.html  ← NO se sube al hosting (para eso, la carpeta normal).
"""
import base64, re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
SALIDA = BASE / "vista-previa-11n.html"
PAGINAS = [("index", "11N Brasserie | Cafetería & Matcha en Teatinos, Málaga"),
           ("carta", "Carta | 11N Brasserie"), ("matcha-bar", "Matcha Bar | 11N Brasserie"),
           ("encargos", "Encargos | 11N Brasserie"), ("visitanos", "Visítanos | 11N Brasserie"),
           ("aviso-legal", "Aviso legal | 11N Brasserie"), ("privacidad", "Privacidad | 11N Brasserie"),
           ("cookies", "Cookies | 11N Brasserie")]
MIME = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg", "woff2": "font/woff2", "svg": "image/svg+xml"}


def leer(rel):
    return (BASE / rel).read_text(encoding="utf-8")


def uri(rel):
    return "data:%s;base64,%s" % (MIME[rel.rsplit(".", 1)[1]], base64.b64encode((BASE / rel).read_bytes()).decode())


def js(rel):
    return "<script>%s</script>" % leer(rel).replace("</script", "<\\/script")


# Una versión de cada foto (800 px en WebP)
FOTOS = {f.name[:-9]: uri("img/" + f.name) for f in sorted((BASE / "img").glob("*-800.webp"))}


def fotos_estaticas(html):
    def cambiar(m):
        bloque = m.group(0)
        clave = re.search(r'src="img/([a-z-]+?)-\d+\.jpg"', bloque)
        if not clave or clave.group(1) not in FOTOS:
            return bloque
        img = re.search(r"<img [^>]+>", bloque).group(0)
        img = re.sub(r'\s(srcset|sizes)="[^"]*"', "", img)
        img = re.sub(r'src="[^"]*"', 'src="%s"' % FOTOS[clave.group(1)], img)
        return img
    return re.sub(r"<picture>.*?</picture>", cambiar, html, flags=re.S)


indice = leer("index.html")
cabeza = indice[:indice.index("<body>")]
cuerpo_ini = indice[indice.index("<body>"):indice.index('<main id="contenido">')]
pie = indice[indice.index("</main>") + len("</main>"):indice.index('<script src="data/local.js">')]

# CSS con las fuentes dentro
css = leer("css/styles.css")
css = re.sub(r'url\("\.\./(fonts/[^"]+)"\)', lambda m: 'url("%s")' % uri(m.group(1)), css)
css += "\n[data-pagina][hidden]{display:none!important}"
cabeza = cabeza.replace('<link rel="stylesheet" href="css/styles.css">', "<style>%s</style>" % css)
cabeza = re.sub(r'\s*<link rel="(preload|canonical|icon|apple-touch-icon)"[^>]*>', "", cabeza)
cabeza = cabeza.replace("</head>", '  <link rel="icon" href="%s">\n</head>' % uri("favicon.svg"))

secciones = ""
for nombre, _ in PAGINAS:
    h = leer(nombre + ".html")
    main = h[h.index('<main id="contenido">') + len('<main id="contenido">'):h.index("</main>")]
    secciones += '<div data-pagina="%s"%s>%s</div>\n' % (nombre, "" if nombre == "index" else " hidden", main)

menu_js = leer("js/menu.js").replace(
    "'<picture><source type=\"image/webp\" srcset=\"img/' + pl.foto + '-480.webp\"><img src=\"img/' + pl.foto + '-480.jpg\"",
    "'<picture><img src=\"' + (window.FOTOS_PREVIA[pl.foto] || '') + '\"")

ROUTER = """<script>
(function(){
  var TITULOS=%s, paginas=document.querySelectorAll("[data-pagina]");
  function mostrar(p, hash, query){
    if(!TITULOS[p]) return false;
    paginas.forEach(function(d){ d.hidden = d.getAttribute("data-pagina")!==p; });
    document.title = TITULOS[p];
    document.querySelectorAll(".nav a, .menu-movil nav a").forEach(function(a){
      if(a.getAttribute("href")===p+".html") a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    var menu=document.querySelector(".menu-movil.abierto"); if(menu) menu.querySelector(".cerrar").click();
    var destino = hash && document.querySelector('[data-pagina="'+p+'"] '+hash);
    if(destino) destino.scrollIntoView(); else window.scrollTo(0,0);
    if(query && /temp=(frio|caliente)/.test(query)){
      var v=/temp=(frio|caliente)/.exec(query)[1], b=document.querySelector('[data-quiz] .quiz-opcion[data-valor="'+v+'"]');
      if(b && document.querySelector('[data-quiz] .quiz-paso-num').textContent.indexOf("1 de")>-1) b.click();
    }
    window.dispatchEvent(new Event("scroll"));
    return true;
  }
  document.addEventListener("click", function(e){
    var a=e.target.closest("a[href]"); if(!a) return;
    var m=/^([a-z-]+)\\.html(\\?[^#]*)?(#.*)?$/.exec(a.getAttribute("href"));
    if(m && mostrar(m[1], m[3], m[2])) e.preventDefault();
  });
})();
</script>""" % (str({n: t for n, t in PAGINAS}).replace("'", '"'))

html = (cabeza
        + cuerpo_ini.replace("<body>", '<body>\n<div style="background:#FFF1A8;color:#4A3B00;text-align:center;padding:.5rem 1rem;font:500 13px/1.4 system-ui,sans-serif;border-bottom:1px dashed #8A6D00">VISTA PREVIA de la propuesta · Lo marcado en amarillo está pendiente de confirmar con el local.</div>', 1)
        + '<main id="contenido">\n' + fotos_estaticas(secciones) + "</main>\n"
        + pie
        + "<script>window.FOTOS_PREVIA=%s;</script>\n" % str(FOTOS).replace("'", '"')
        + js("data/local.js") + js("data/menu.js") + "<script>%s</script>" % menu_js
        + js("js/quiz.js") + js("js/encargos.js") + js("js/main.js") + ROUTER
        + "\n</body>\n</html>\n")
SALIDA.write_text(html, encoding="utf-8")
print("Vista previa creada:", SALIDA.name, "(%d KB)" % (SALIDA.stat().st_size // 1024))
