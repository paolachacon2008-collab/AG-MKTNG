"""Genera la web de Da Mimì en la carpeta web/ y el zip para Hostinger.

Uso:   python3 fuente/build.py
Los datos se cambian en fuente/datos.py; este archivo casi nunca se toca.
"""
import html
import json
import shutil
import sys
import zipfile
from pathlib import Path

from PIL import Image

FUENTE = Path(__file__).resolve().parent
RAIZ = FUENTE.parent
STATIC = FUENTE / "static"
WEB = RAIZ / "web"
ENTREGA = RAIZ / "entrega"
sys.path.insert(0, str(FUENTE))
import datos as D  # noqa: E402

SITE = D.SITE.rstrip("/")
DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
DIAS_SCHEMA = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


def e(texto):
    return html.escape(str(texto), quote=True)


# ------------------------------------------------------------------ pendientes
def pend(motivo, texto="Pendiente"):
    """Etiqueta amarilla. Desaparece del HTML con BORRADOR = False."""
    if not D.BORRADOR:
        return ""
    return f'<span class="pend" title="{e(motivo)}">{texto}</span>'


def bloque_pend(titulo, contenido):
    """Bloque de pendientes. Desaparece del HTML con BORRADOR = False."""
    if not D.BORRADOR:
        return ""
    return (f'<aside class="bloque-pend" aria-label="Pendiente: {e(titulo)}">'
            f'<p class="bloque-pend__tit"><span class="pend">Pendiente</span> {e(titulo)}</p>'
            f'{contenido}</aside>')


def lista(items):
    return "<ul>" + "".join(f"<li>{e(i)}</li>" for i in items) + "</ul>"


# ------------------------------------------------------------------ fotos
def _medidas():
    m = {}
    for f in (STATIC / "img").glob("*.jpg"):
        m[f.stem] = Image.open(f).size
    return m


MEDIDAS = _medidas()


def foto(nombre, alt, sizes, p, lazy=True, clase="", prioridad=False):
    anchos = []
    for w in (480, 800, 1200):
        real = MEDIDAS[f"{nombre}-{w}"][0]
        if real not in [a for a, _ in anchos]:
            anchos.append((real, w))
    webp = ", ".join(f"{p}assets/img/{nombre}-{w}.webp {real}w" for real, w in anchos)
    jpg = ", ".join(f"{p}assets/img/{nombre}-{w}.jpg {real}w" for real, w in anchos)
    ancho, alto = MEDIDAS[f"{nombre}-1200"]
    extra = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high" decoding="async"'
    if prioridad:
        extra = ' fetchpriority="high"'
    cls = f' class="{clase}"' if clase else ""
    return (f'<picture{cls}><source type="image/webp" srcset="{webp}" sizes="{sizes}">'
            f'<img src="{p}assets/img/{nombre}-800.jpg" srcset="{jpg}" sizes="{sizes}" '
            f'width="{ancho}" height="{alto}" alt="{e(alt)}"{extra}></picture>')


# ------------------------------------------------------------------ iconos
ICONOS = {
    "tel": '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
    "bolsa": '<path d="M6 7h12l1 14H5L6 7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 9V6a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    "pin": '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
    "reloj": '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
}


def icono(nombre):
    return (f'<svg class="ico" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" '
            f'focusable="false" fill="currentColor">{ICONOS[nombre]}</svg>')


# ------------------------------------------------------------------ datos comunes
TEL = D.TELEFONO
DIR = D.DIRECCION
DIRECCION_TXT = f'{DIR["calle"]}, {DIR["barrio"]}, {DIR["cp"]} {DIR["ciudad"]}'


def tel_link(clase="", texto=None):
    t = texto or TEL["visible"]
    c = f' class="{clase}"' if clase else ""
    return f'<a{c} href="tel:{TEL["enlace"]}">{t}</a>'


def hora_txt(h):
    return "00:00" if h in ("00:00", "24:00") else h


def tramos_txt(dia):
    tr = D.HORARIO.get(dia) or []
    if not tr:
        return "Cerrado"
    return " y ".join(f"{a}–{hora_txt(c)}" for a, c in tr)


def tabla_horario(compacta=False):
    filas = []
    if compacta:
        # agrupa días seguidos con el mismo horario
        grupos = []
        for d in range(7):
            t = tramos_txt(d)
            if grupos and grupos[-1][2] == t:
                grupos[-1][1] = d
            else:
                grupos.append([d, d, t])
        for a, b, t in grupos:
            dias = DIAS[a] if a == b else f"{DIAS[a]} a {DIAS[b].lower()}"
            filas.append((dias, t, list(range(a, b + 1))))
    else:
        filas = [(DIAS[d], tramos_txt(d), [d]) for d in range(7)]
    cuerpo = "".join(
        f'<tr data-dias="{",".join(map(str, ds))}"><th scope="row">{e(n)}</th><td>{e(t)}</td></tr>'
        for n, t, ds in filas)
    return (f'<table class="horario"><caption class="sr">Horario de apertura</caption>'
            f'<tbody>{cuerpo}</tbody></table>')


def estado_abierto():
    return (f'<p class="estado" data-estado hidden><span class="estado__punto" aria-hidden="true"></span>'
            f'<span class="estado__txt" aria-live="polite"></span> {pend(D.HORARIO_PENDIENTE)}</p>')


def boton_pedido(nombre, url, p):
    if url:
        return f'<a class="btn btn--linea" href="{e(url)}" target="_blank" rel="noopener">{nombre}</a>'
    if not D.BORRADOR:
        return ""
    return (f'<span class="btn btn--linea btn--off" aria-disabled="true">{nombre} '
            f'{pend("Falta el enlace de la ficha de " + nombre + ".")}</span>')


# ------------------------------------------------------------------ JSON-LD
def ld_restaurante():
    horas = []
    for d, tramos in D.HORARIO.items():
        for a, c in tramos:
            horas.append({"@type": "OpeningHoursSpecification",
                          "dayOfWeek": f"https://schema.org/{DIAS_SCHEMA[d]}",
                          "opens": a, "closes": "23:59" if c == "00:00" else c})
    datos = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": f"{SITE}/#restaurante",
        "name": D.NOMBRE,
        "url": f"{SITE}/",
        "logo": f"{SITE}/assets/img/logo-da-mimi-rojo.png",
        "image": [f"{SITE}/assets/img/pizza-blanca-porcion-1200.jpg",
                  f"{SITE}/assets/img/horno-da-mimi-1200.jpg",
                  f"{SITE}/assets/img/rueda-parmesano-1200.jpg"],
        "description": "Pizzería napolitana y cocina italiana en Teatinos (Málaga).",
        "telephone": TEL["enlace"],
        "servesCuisine": ["Pizza napolitana", "Italiana"],
        "acceptsReservations": True,
        "hasMenu": f"{SITE}/carta/",
        "address": {"@type": "PostalAddress", "streetAddress": DIR["calle"],
                    "addressLocality": DIR["ciudad"], "postalCode": DIR["cp"],
                    "addressRegion": DIR["provincia"], "addressCountry": DIR["pais"]},
        "geo": {"@type": "GeoCoordinates", "latitude": DIR["lat"], "longitude": DIR["lng"]},
        "hasMap": DIR["maps"],
        "openingHoursSpecification": horas,
    }
    # Las redes solo se declaran a Google cuando el restaurante confirme que son suyas.
    if not D.REDES.get("pendiente"):
        datos["sameAs"] = [D.REDES["instagram"], D.REDES["facebook"]]
    return datos


def ld_migas(migas):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n,
                                 "item": f"{SITE}/{s}"} for i, (n, s) in enumerate(migas)]}


def ld_menu():
    secciones = []
    for sec in D.CARTA:
        items = []
        for pl in sec["platos"]:
            it = {"@type": "MenuItem", "name": pl["nombre"]}
            if pl["ingredientes"]:
                it["description"] = pl["ingredientes"]
            if pl["foto"]:
                it["image"] = f"{SITE}/assets/img/{pl['foto']}-800.jpg"
            if pl["precio"]:
                it["offers"] = {"@type": "Offer", "price": pl["precio"].replace(",", "."),
                                "priceCurrency": "EUR"}
            items.append(it)
        secciones.append({"@type": "MenuSection", "name": sec["titulo"], "hasMenuItem": items})
    return {"@context": "https://schema.org", "@type": "Menu", "name": f"Carta de {D.NOMBRE}",
            "url": f"{SITE}/carta/", "inLanguage": "es", "hasMenuSection": secciones}


def ld_faq():
    conf = [f for f in D.FAQ if f["confirmada"]]
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": f["p"],
                            "acceptedAnswer": {"@type": "Answer", "text": f["r"]}} for f in conf]}


# ------------------------------------------------------------------ plantilla
NAV = [
    ("carta/", "Carta"),
    ("especialidades/", "Especialidades"),
    ("nuestra-historia/", "Nuestra historia"),
    ("galeria/", "Galería"),
    ("reservas/", "Reservas y pedidos"),
    ("contacto/", "Contacto"),
]


def cabecera(slug, p):
    def enlaces():
        out = []
        for s, n in NAV:
            cur = ' aria-current="page"' if s == slug else ""
            out.append(f'<li><a href="{p}{s}"{cur}>{n}</a></li>')
        return "".join(out)

    aviso = ""
    if D.BORRADOR:
        aviso = ('<div class="aviso-borrador" role="note">Versión borrador · los datos con '
                 '<span class="pend">Pendiente</span> faltan por confirmar con Da Mimì</div>')
    return f"""{aviso}<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="cab">
  <div class="cab__in envoltura">
    <a class="cab__logo" href="{p or './'}"><img src="{p}assets/img/logo-da-mimi-rojo.webp" width="440" height="166" alt="Da Mimì, ir al inicio"></a>
    <nav class="cab__nav" aria-label="Principal"><ul>{enlaces()}</ul></nav>
    <a class="btn btn--rojo cab__llamar" href="tel:{TEL['enlace']}">{icono('tel')}<span>Llamar</span></a>
    <button class="cab__menu" type="button" aria-expanded="false" aria-controls="menu-movil"><span class="cab__menu-raya" aria-hidden="true"></span>Menú</button>
  </div>
  <nav id="menu-movil" class="menu-movil" aria-label="Menú móvil" hidden>
    <ul class="envoltura"><li><a href="{p or './'}"{' aria-current="page"' if slug == '' else ''}>Inicio</a></li>{enlaces()}</ul>
  </nav>
</header>"""


def pie(p):
    nav = "".join(f'<li><a href="{p}{s}">{n}</a></li>' for s, n in NAV)
    legal = "".join(f'<li><a href="{p}{s}">{n}</a></li>' for s, n in
                    [("aviso-legal/", "Aviso legal"), ("privacidad/", "Privacidad"), ("cookies/", "Cookies")])
    return f"""<footer class="pie">
  <div class="envoltura pie__grid">
    <div class="pie__marca">
      <img src="{p}assets/img/logo-da-mimi-crema.webp" width="440" height="166" alt="Da Mimì" loading="lazy">
      <p>Pizzería napolitana y cocina italiana en Teatinos, Málaga.</p>
    </div>
    <div>
      <h2 class="pie__tit">Dónde estamos</h2>
      <p><a href="{DIR['maps']}" target="_blank" rel="noopener">{e(DIR['calle'])}<br>{e(DIR['barrio'])}<br>{DIR['cp']} {e(DIR['ciudad'])}</a></p>
      <p>{tel_link()} {pend(TEL['pendiente'])}</p>
      <p class="pie__redes"><a href="{D.REDES['instagram']}" target="_blank" rel="noopener">Instagram</a> · <a href="{D.REDES['facebook']}" target="_blank" rel="noopener">Facebook</a> {pend(D.REDES['pendiente']) if D.REDES.get('pendiente') else ''}</p>
    </div>
    <div>
      <h2 class="pie__tit">La web</h2>
      <ul class="pie__lista"><li><a href="{p or './'}">Inicio</a></li>{nav}</ul>
    </div>
    <div>
      <h2 class="pie__tit">Legal</h2>
      <ul class="pie__lista">{legal}</ul>
    </div>
  </div>
  <div class="envoltura pie__base">
    <p>© {D.NOMBRE}</p>
    <p>Web por <a href="https://improve-it.es" target="_blank" rel="noopener">Improve It</a></p>
  </div>
</footer>
<nav class="barra" aria-label="Acciones rápidas">
  <a href="tel:{TEL['enlace']}">{icono('tel')}<span>Llamar</span></a>
  <a href="{p}reservas/#domicilio">{icono('bolsa')}<span>Pedir</span></a>
  <a href="{DIR['maps']}" target="_blank" rel="noopener">{icono('pin')}<span>Cómo llegar</span></a>
</nav>"""


def migas_html(migas, p):
    if len(migas) < 2:
        return ""
    partes = []
    for i, (n, s) in enumerate(migas):
        if i == len(migas) - 1:
            partes.append(f'<li aria-current="page">{e(n)}</li>')
        else:
            partes.append(f'<li><a href="{p}{s}">{e(n)}</a></li>')
    return f'<nav class="migas envoltura" aria-label="Estás en"><ol>{"".join(partes)}</ol></nav>'


def pagina(slug, titulo, desc, cuerpo, jsonld=(), migas=None, indexar=True, ruta_archivo=None):
    p = "" if slug == "" else "../" * slug.count("/")
    if ruta_archivo == "404.html":
        p = "/"  # la 404 puede servirse desde cualquier ruta
    canon = f"{SITE}/{slug}"
    robots = '<meta name="robots" content="noindex, nofollow">' if (D.BORRADOR or not indexar) else ""
    lds = list(jsonld)
    if migas:
        lds.append(ld_migas(migas))
    ld_html = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in lds)
    horario_json = json.dumps({str(k): v for k, v in D.HORARIO.items()})
    doc = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(titulo)}</title>
<meta name="description" content="{e(desc)}">
{robots}
<link rel="canonical" href="{canon}">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="{D.NOMBRE}">
<meta property="og:title" content="{e(titulo)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/assets/img/og-da-mimi.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Porción de pizza blanca con setas de Da Mimì">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFFDF9">
<link rel="preload" href="{p}assets/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{p}assets/fonts/jost-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{p}assets/css/site.css">
<link rel="icon" href="{p}favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="{p}favicon-32.png">
<link rel="apple-touch-icon" href="{p}apple-touch-icon.png">
<link rel="manifest" href="{p}site.webmanifest">
{ld_html}
</head>
<body>
{cabecera(slug, p)}
{migas_html(migas or [], p)}
<main id="contenido">
{cuerpo}
</main>
{pie(p)}
<script type="application/json" id="horario-datos">{horario_json}</script>
<script src="{p}assets/js/site.js" defer></script>
</body>
</html>
"""
    destino = WEB / (ruta_archivo or (slug + "index.html"))
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(doc, encoding="utf-8")


# ------------------------------------------------------------------ bloques
def cartel(item, p, h="h3", lazy=True, sizes="(min-width: 960px) 46vw, 100vw"):
    """El cartel «del mes»: foto real grande, titular condensado y firma manuscrita."""
    return f"""<article class="cartel">
  <div class="cartel__foto">{foto(item['foto'], item['alt'], sizes, p, lazy=lazy)}</div>
  <div class="cartel__texto">
    <{h} class="cartel__tit">{e(item['nombre'])}</{h}>
    <p class="cartel__firma" aria-hidden="true">{e(D.DEL_MES['mes'])}</p>
    <p class="cartel__desc">{e(item['descripcion'])}</p>
    <p class="cartel__meta"><span class="sr">Disponible en </span><span class="cartel__mes">{e(D.DEL_MES['mes'].capitalize())}</span> · <a href="{p}carta/#del-mes">Ver en la carta</a></p>
  </div>
</article>"""


def carteles_del_mes(p, h="h3"):
    return f"""<div class="carteles">
{cartel(D.DEL_MES['pizza'], p, h)}
{cartel(D.DEL_MES['pasta'], p, h)}
</div>"""


COMO_TRABAJAMOS = [
    ("masa-tomate", "La masa, a mano",
     "Cada base se monta a mano sobre la encimera de granito. Así sale el borde alto y aireado de la pizza napolitana.",
     "Pizzero con guantes negros extendiendo salsa de tomate con un cucharón sobre una base de masa recién montada, en encimera de granito"),
    ("horno-da-mimi", "Al horno con nuestro nombre",
     "La pizza entra en un horno que lleva «Da Mimì» grabado en la placa.",
     "Pala metiendo una pizza en la boca del horno encendido, con el nombre Da Mimì grabado en la placa de arriba"),
    ("rueda-parmesano", "Pasta terminada en la rueda",
     "Algunas pastas se terminan dentro de la rueda de parmesano.",
     "Cocinero removiendo pasta dentro de una rueda de parmesano abierta"),
]


def como_trabajamos(p, h="h3"):
    items = "".join(f"""<li class="paso">
  {foto(f, alt, "(min-width: 960px) 30vw, (min-width: 640px) 45vw, 100vw", p, clase="paso__foto")}
  <{h} class="paso__tit">{e(t)}</{h}>
  <p>{e(txt)}</p>
</li>""" for f, t, txt, alt in COMO_TRABAJAMOS)
    nota = (f'<p class="nota">«Producto 100% italiano» {pend(D.PRODUCTO_ITALIANO_PENDIENTE)}</p>'
            if D.BORRADOR else "")
    return f'<ol class="pasos">{items}</ol>{nota}'


def ubicacion(p, h="h2"):
    return f"""<div class="ubic">
  <div class="ubic__txt">
    <{h} class="tit-seccion">Dónde y cuándo</{h}>
    <p class="ubic__dir">{icono('pin')}<span>{e(DIR['calle'])}<br>{e(DIR['barrio'])}, {DIR['cp']} {e(DIR['ciudad'])}</span></p>
    <p class="ubic__dir">{icono('tel')}<span>{tel_link()} {pend(TEL['pendiente'])}</span></p>
    {estado_abierto()}
    <div class="botones">
      <a class="btn btn--rojo" href="{DIR['maps']}" target="_blank" rel="noopener">{icono('pin')}Cómo llegar</a>
      <a class="btn btn--linea" href="{p}contacto/">Ver contacto y mapa</a>
    </div>
  </div>
  <div class="ubic__horario">
    <h3 class="sub">{icono('reloj')} Horario {pend(D.HORARIO_PENDIENTE)}</h3>
    {tabla_horario(compacta=True)}
  </div>
</div>"""


def tarjeta_plato(pl, p, enlace=True):
    img = foto(pl["foto"], pl["alt"], "(min-width: 960px) 23vw, (min-width: 640px) 45vw, 100vw", p, clase="tarjeta__foto")
    return f"""<li class="tarjeta">
  {img}
  <h3 class="tarjeta__tit">{e(pl['nombre'])}</h3>
  <p class="tarjeta__desc">{e(pl['ingredientes'])}</p>
</li>"""


# ------------------------------------------------------------------ páginas
def pag_inicio():
    p = ""
    destacados = [pl for sec in D.CARTA for pl in sec["platos"]
                  if pl["nombre"] in ("Parmigiana de berenjena", "Pizza de salmón y rúcula", "Carbonara", "Ñoquis con nueces")]
    cuerpo = f"""
<section class="hero">
  <div class="envoltura hero__grid">
    <div class="hero__txt">
      <p class="antetit">Pizzería napolitana · Teatinos, Málaga</p>
      <h1 class="hero__tit">Pizza napolitana en Teatinos</h1>
      <p class="hero__lead">Masa montada a mano, borde alto y aireado, y pasta que se termina en la rueda de parmesano. En el Bulevar Louis Pasteur, en Teatinos-Universidad.</p>
      <div class="botones">
        <a class="btn btn--rojo" href="tel:{TEL['enlace']}">{icono('tel')}Llamar al {TEL['visible']}</a>
        <a class="btn btn--linea" href="reservas/#domicilio">{icono('bolsa')}Pedir a domicilio</a>
      </div>
      {estado_abierto()}
    </div>
    <div class="hero__foto">
      {foto('pizza-blanca-porcion', 'Mano con guante levantando una porción de pizza blanca con setas y albahaca, de borde alto y tostado', '(min-width: 960px) 50vw, 100vw', p, lazy=False, prioridad=True)}
    </div>
  </div>
</section>

<section class="banda banda--oscura" aria-labelledby="t-mes">
  <div class="envoltura">
    <div class="cab-seccion">
      <h2 id="t-mes" class="tit-seccion">Este mes en Da Mimì</h2>
      <p>Cada mes cambian una pizza y una pasta. Estas son las de {e(D.DEL_MES['mes'])}.</p>
    </div>
    {carteles_del_mes(p)}
  </div>
</section>

<section class="banda" aria-labelledby="t-carta">
  <div class="envoltura">
    <div class="cab-seccion">
      <h2 id="t-carta" class="tit-seccion">De la carta</h2>
      <p>Algunos de los platos que salen de la cocina. {pend('Faltan los precios y los alérgenos de la carta oficial.')}</p>
    </div>
    <ul class="tarjetas">{''.join(tarjeta_plato(pl, p) for pl in destacados)}</ul>
    <p class="centro"><a class="btn btn--linea" href="carta/">Ver la carta completa</a></p>
  </div>
</section>

<section class="banda banda--granito" aria-labelledby="t-como">
  <div class="envoltura">
    <div class="cab-seccion">
      <h2 id="t-como" class="tit-seccion">Cómo trabajamos</h2>
    </div>
    {como_trabajamos(p)}
  </div>
</section>

<section class="banda" aria-labelledby="t-ubic">
  <div class="envoltura">
    {ubicacion(p).replace('<h2 class="tit-seccion">', '<h2 id="t-ubic" class="tit-seccion">', 1)}
  </div>
</section>
"""
    pagina("", "Da Mimì | Pizzería napolitana en Teatinos, Málaga",
           "Pizzería napolitana en Teatinos (Málaga): masa montada a mano, borde alto y pasta terminada en la rueda de parmesano. Blvr. Louis Pasteur, 15.",
           cuerpo, jsonld=[ld_restaurante()])


def pag_carta():
    p = "../"
    chips = "".join(f'<li><a href="#{s["id"]}">{e(s["titulo"])}</a></li>' for s in D.CARTA)
    secciones = []
    for sec in D.CARTA:
        platos = []
        for pl in sec["platos"]:
            if pl["precio"]:
                precio = f'<span class="plato__precio">{e(pl["precio"])} €</span>'
            elif D.BORRADOR:
                precio = f'<span class="plato__precio">— {pend("Falta el precio en la carta oficial.")}</span>'
            else:
                precio = ""
            if pl["alergenos"]:
                alg = ", ".join(D.ALERGENOS[a] for a in pl["alergenos"])
                alerg = f'<p class="plato__alerg"><span>Alérgenos:</span> {e(alg)}</p>'
            elif pl["alergenos"] == []:
                alerg = '<p class="plato__alerg"><span>Alérgenos:</span> ninguno de los 14 de declaración obligatoria</p>'
            else:
                alerg = (f'<p class="plato__alerg"><span>Alérgenos:</span> pregunta al personal '
                         f'{pend("Faltan los alérgenos de este plato en la carta oficial.")}</p>')
            img = (foto(pl["foto"], pl["alt"], "(min-width: 768px) 200px, 112px", p, clase="plato__foto")
                   if pl["foto"] else '<div class="plato__foto plato__foto--vacia" aria-hidden="true"></div>')
            nota = pend(pl["pendiente"], "Pendiente de confirmar") if pl.get("pendiente") else ""
            platos.append(f"""<li class="plato">
  {img}
  <div class="plato__txt">
    <div class="plato__fila"><h3 class="plato__nombre">{e(pl['nombre'])}</h3>{precio}</div>
    {f'<p class="plato__ing">{e(pl["ingredientes"])}</p>' if pl['ingredientes'] else ''}
    {nota}
    {alerg}
  </div>
</li>""")
        extra = ""
        if sec["id"] == "del-mes":
            extra = f'<p class="sec-carta__firma" aria-hidden="true">{e(D.DEL_MES["mes"])}</p>'
        secciones.append(f"""<section class="sec-carta" id="{sec['id']}" aria-labelledby="t-{sec['id']}">
  <div class="sec-carta__cab"><h2 id="t-{sec['id']}" class="tit-seccion">{e(sec['titulo'])}</h2>{extra}</div>
  <ul class="platos">{''.join(platos)}</ul>
</section>""")
    alergenos = "".join(f"<li>{e(n)}</li>" for n in D.ALERGENOS.values())
    cuerpo = f"""
<section class="intro envoltura">
  <h1 class="tit-pagina">Carta</h1>
  <p class="intro__lead">Pizza napolitana, pastas, entrantes y postres. La pizza y la pasta del mes cambian cada mes.</p>
  {bloque_pend('Carta oficial', '<p>Esta carta se ha hecho con los platos que se ven en las fotos del restaurante. Faltan los precios, los alérgenos de cada plato y el resto de platos de la carta oficial.</p>')}
</section>
<nav class="chips" aria-label="Secciones de la carta"><ul class="envoltura">{chips}<li><a href="#alergias">Alergias</a></li></ul></nav>
<div class="envoltura carta">
{''.join(secciones)}
<section class="alergias" id="alergias" aria-labelledby="t-alergias">
  <h2 id="t-alergias" class="tit-seccion">Alergias e intolerancias</h2>
  <p>Si tienes alguna alergia o intolerancia, dínoslo antes de pedir. Estos son los 14 alérgenos de declaración obligatoria en la Unión Europea (Reglamento UE 1169/2011):</p>
  <ul class="alergenos">{alergenos}</ul>
  {bloque_pend('Alérgenos por plato', '<p>Falta que Da Mimì nos pase qué alérgenos lleva cada plato. Hasta entonces, la web no indica ninguno.</p>')}
</section>
</div>
"""
    migas = [("Inicio", ""), ("Carta", "carta/")]
    pagina("carta/", "Carta de Da Mimì | Pizzería napolitana en Teatinos",
           "Carta de Da Mimì, pizzería napolitana en Teatinos (Málaga): pizzas, pastas, parmigiana, postres y la pizza y la pasta del mes.",
           cuerpo, jsonld=[ld_menu()], migas=migas)


def pag_especialidades():
    p = "../"
    bloques = [
        ("pizza-salmon-rucula", "Pizza napolitana",
         "Masa montada a mano y borde alto y aireado. En la carta, entre otras, la pizza blanca con setas y la de salmón y rúcula.",
         "Pizza con rúcula, salmón ahumado y cebolla morada sobre plato de cerámica azul", "carta/#pizzas", "Ver las pizzas"),
        ("pasta-del-mes-pappardelle", "Pasta en la rueda de parmesano",
         "Algunas pastas se terminan dentro de la rueda de parmesano. Este mes, los pappardelle con speck y crema de porcini.",
         "Pappardelle cremosos levantados con pinzas sobre la rueda de parmesano", "carta/#pastas", "Ver las pastas"),
        ("parmigiana-berenjena", "Parmigiana de berenjena",
         "Para empezar, una torre de parmigiana de berenjena con brotes y flores comestibles.",
         "Torre de parmigiana de berenjena coronada con brotes verdes y una flor comestible morada", "carta/#para-empezar", "Ver los entrantes"),
    ]
    filas = "".join(f"""<article class="fila{' fila--inv' if i % 2 else ''}">
  {foto(f, alt, '(min-width: 960px) 50vw, 100vw', p, clase='fila__foto')}
  <div class="fila__txt">
    <h3 class="fila__tit">{e(t)}</h3>
    <p>{e(txt)}</p>
    <a class="btn btn--linea" href="{p}{link}">{e(lt)}</a>
  </div>
</article>""" for i, (f, t, txt, alt, link, lt) in enumerate(bloques))
    cuerpo = f"""
<section class="intro envoltura">
  <h1 class="tit-pagina">Especialidades</h1>
  <p class="intro__lead">La pizza y la pasta del mes, y algunos platos de la casa.</p>
</section>
<section class="banda banda--oscura" aria-labelledby="t-mes">
  <div class="envoltura">
    <div class="cab-seccion"><h2 id="t-mes" class="tit-seccion">Del mes · {e(D.DEL_MES['mes'])}</h2></div>
    {carteles_del_mes(p)}
  </div>
</section>
<section class="banda" aria-labelledby="t-esp">
  <div class="envoltura">
    <div class="cab-seccion"><h2 id="t-esp" class="tit-seccion">De siempre</h2></div>
    {filas}
  </div>
</section>
"""
    pagina("especialidades/", "Especialidades | Pizzería napolitana Da Mimì, Málaga",
           "La pizza y la pasta del mes y las especialidades de Da Mimì: pizza napolitana, pasta en la rueda de parmesano y parmigiana. Teatinos, Málaga.",
           cuerpo, migas=[("Inicio", ""), ("Especialidades", "especialidades/")])


def pag_historia():
    p = "../"
    preguntas = "<ol>" + "".join(f"<li>{e(q)}</li>" for q in D.PREGUNTAS_ENTREVISTA) + "</ol>"
    historia = bloque_pend(
        "La historia de Da Mimì",
        "<p>Esta parte se escribirá con lo que nos cuente el restaurante en una entrevista. "
        "No publicamos nada que no venga de ellos. Preguntas para la entrevista:</p>" + preguntas)
    cuerpo = f"""
<section class="intro envoltura">
  <h1 class="tit-pagina">Nuestra historia</h1>
  <p class="intro__lead">Una pizzería napolitana en Teatinos, con la masa hecha a mano y un horno con nuestro nombre.</p>
  {historia}
</section>
<section class="banda banda--granito" aria-labelledby="t-como">
  <div class="envoltura">
    <div class="cab-seccion"><h2 id="t-como" class="tit-seccion">Cómo trabajamos</h2></div>
    {como_trabajamos(p)}
  </div>
</section>
<section class="banda" aria-labelledby="t-mise">
  <div class="envoltura fila">
    {foto('carbonara-ingredientes', 'Ingredientes de la carbonara preparados en cuencos de acero: guanciale, queso rallado, yema batida y nidos de pasta', '(min-width: 960px) 50vw, 100vw', p, clase='fila__foto')}
    <div class="fila__txt">
      <h2 id="t-mise" class="fila__tit">Todo preparado antes del servicio</h2>
      <p>Así empieza una carbonara: guanciale, yema y queso rallado, cada cosa en su cuenco.</p>
      <a class="btn btn--linea" href="{p}carta/#pastas">Ver las pastas</a>
    </div>
  </div>
</section>
"""
    pagina("nuestra-historia/", "Nuestra historia | Da Mimì, pizzería en Teatinos",
           "Cómo se trabaja en Da Mimì, pizzería napolitana de Teatinos (Málaga): masa montada a mano, horno con nombre propio y pasta en la rueda de parmesano.",
           cuerpo, migas=[("Inicio", ""), ("Nuestra historia", "nuestra-historia/")])


GALERIA = [
    ("pizza-blanca-porcion", "Porción de pizza blanca con setas y albahaca"),
    ("pizza-del-mes-speck-patata", "Pizza del mes: base de patata, speck y patata crunchy"),
    ("pasta-del-mes-pappardelle", "Pasta del mes: pappardelle con speck y crema de porcini en la rueda de parmesano"),
    ("horno-da-mimi", "Pizza entrando en el horno con el nombre Da Mimì grabado"),
    ("masa-tomate", "Extendiendo el tomate sobre la masa recién montada"),
    ("pizza-salmon-rucula", "Pizza de salmón ahumado, rúcula y cebolla morada"),
    ("rueda-parmesano", "Pasta terminándose dentro de la rueda de parmesano"),
    ("parmigiana-berenjena", "Parmigiana de berenjena con brotes y flores comestibles"),
    ("gnocchi-nueces", "Ñoquis con salsa cremosa, nueces y brotes"),
    ("carbonara-ingredientes", "Ingredientes de la carbonara: guanciale, queso rallado, yema y pasta"),
    ("postre-chocolate", "Tarta de chocolate con helado"),
    ("postre-crema-avellana", "Copa de crema y avellana"),
]


def pag_galeria():
    p = "../"
    items = "".join(f"""<li><button class="gal__btn" type="button" data-grande="{p}assets/img/{f}-1200.jpg" data-grande-webp="{p}assets/img/{f}-1200.webp" data-pie="{e(t)}" aria-label="Ampliar: {e(t)}">
  {foto(f, t, '(min-width: 960px) 30vw, (min-width: 640px) 45vw, 50vw', p, lazy=i > 3)}
</button></li>""" for i, (f, t) in enumerate(GALERIA))
    cuerpo = f"""
<section class="intro envoltura">
  <h1 class="tit-pagina">Galería</h1>
  <p class="intro__lead">Fotos reales de nuestros platos y de la cocina. Pulsa en una para verla en grande.</p>
  {bloque_pend('Más fotos', '<p>Faltan fotos del local, de la terraza y del equipo.</p>')}
</section>
<div class="envoltura"><ul class="gal">{items}</ul></div>
<dialog class="visor" aria-label="Foto ampliada">
  <figure class="visor__fig">
    <picture><source type="image/webp"><img alt=""></picture>
    <figcaption class="visor__pie"></figcaption>
  </figure>
  <div class="visor__ctrl">
    <button type="button" class="visor__btn" data-visor="ant" aria-label="Foto anterior">←</button>
    <span class="visor__num" aria-live="polite"></span>
    <button type="button" class="visor__btn" data-visor="sig" aria-label="Foto siguiente">→</button>
    <button type="button" class="visor__btn visor__cerrar" data-visor="cerrar" aria-label="Cerrar">✕</button>
  </div>
</dialog>
"""
    pagina("galeria/", "Galería de fotos | Da Mimì, pizzería napolitana",
           "Fotos de Da Mimì, pizzería napolitana en Teatinos (Málaga): pizzas, pasta en la rueda de parmesano, postres y la cocina.",
           cuerpo, migas=[("Inicio", ""), ("Galería", "galeria/")])


def pag_reservas():
    p = "../"
    faq = "".join(f"""<details class="faq">
  <summary>{e(f['p'])}</summary>
  <p>{e(f['r'])} {pend(f['pendiente']) if f.get('pendiente') else ''}</p>
</details>""" for f in D.FAQ if f["confirmada"] or D.BORRADOR)
    whatsapp = ""
    if D.WHATSAPP:
        whatsapp = f'<a class="btn btn--linea" href="{e(D.WHATSAPP)}" target="_blank" rel="noopener">WhatsApp</a>'
    cuerpo = f"""
<section class="intro envoltura">
  <h1 class="tit-pagina">Reservas y pedidos</h1>
  <p class="intro__lead">Reserva por teléfono, pide a domicilio o encarga y recoge en el local.</p>
</section>
<div class="envoltura">
  <ul class="canales">
    <li class="canal" id="reservar">
      <h2 class="canal__tit">{icono('tel')} Reservar mesa</h2>
      <p>Las reservas se hacen por teléfono. No hay reserva online.</p>
      <p class="canal__dato">{tel_link()} {pend(TEL['pendiente'])}</p>
      <div class="botones"><a class="btn btn--rojo" href="tel:{TEL['enlace']}">Llamar para reservar</a>{whatsapp}</div>
      {bloque_pend('WhatsApp', '<p>Falta saber si el restaurante tiene WhatsApp para reservas.</p>') if not D.WHATSAPP else ''}
    </li>
    <li class="canal" id="domicilio">
      <h2 class="canal__tit">{icono('bolsa')} A domicilio</h2>
      <p>Los pedidos a domicilio se hacen por Glovo y Just Eat.</p>
      <div class="botones">{boton_pedido('Glovo', D.GLOVO, p)}{boton_pedido('Just Eat', D.JUST_EAT, p)}</div>
    </li>
    <li class="canal" id="recoger">
      <h2 class="canal__tit">{icono('pin')} Recoger en el local</h2>
      <p>Encarga por teléfono y pasa a recogerlo por el {e(DIR['calle'])}. {pend('Falta confirmar con el restaurante que se puede encargar para recoger.')}</p>
      <div class="botones"><a class="btn btn--linea" href="{DIR['maps']}" target="_blank" rel="noopener">Cómo llegar</a></div>
    </li>
  </ul>
  <section class="faqs" aria-labelledby="t-faq">
    <h2 id="t-faq" class="tit-seccion">Preguntas frecuentes</h2>
    {faq}
  </section>
</div>
"""
    pagina("reservas/", "Reservas y pedidos | Da Mimì, pizzería en Teatinos",
           "Reserva mesa por teléfono en Da Mimì, pizzería napolitana de Teatinos (Málaga), o pide a domicilio por Glovo y Just Eat.",
           cuerpo, jsonld=[ld_faq()], migas=[("Inicio", ""), ("Reservas y pedidos", "reservas/")])


def pag_contacto():
    p = "../"
    mapa = (f"https://www.google.com/maps?q={DIR['lat']},{DIR['lng']}&z=17&hl=es&output=embed")
    cuerpo = f"""
<section class="intro envoltura">
  <h1 class="tit-pagina">Contacto y ubicación</h1>
  <p class="intro__lead">Estamos en Teatinos-Universidad, en el Bulevar Louis Pasteur.</p>
</section>
<div class="envoltura contacto">
  <div class="contacto__datos">
    <h2 class="sub">Dirección</h2>
    <p class="ubic__dir">{icono('pin')}<span>{e(DIR['calle'])}<br>{e(DIR['barrio'])}<br>{DIR['cp']} {e(DIR['ciudad'])}</span></p>
    <h2 class="sub">Teléfono</h2>
    <p class="ubic__dir">{icono('tel')}<span>{tel_link()} {pend(TEL['pendiente'])}</span></p>
    <h2 class="sub">Redes</h2>
    <p><a href="{D.REDES['instagram']}" target="_blank" rel="noopener">Instagram</a> · <a href="{D.REDES['facebook']}" target="_blank" rel="noopener">Facebook</a> {pend(D.REDES['pendiente']) if D.REDES.get('pendiente') else ''}</p>
    <h2 class="sub">Terraza</h2>
    <p>Hay mesas fuera. {pend(D.TERRAZA_PENDIENTE)}</p>
    <div class="botones"><a class="btn btn--rojo" href="{DIR['maps']}" target="_blank" rel="noopener">{icono('pin')}Cómo llegar</a></div>
  </div>
  <div class="contacto__horario">
    <h2 class="sub">{icono('reloj')} Horario {pend(D.HORARIO_PENDIENTE)}</h2>
    {estado_abierto()}
    {tabla_horario()}
  </div>
  <div class="mapa" data-mapa="{e(mapa)}">
    <div class="mapa__aviso">
      <p>El mapa es de Google. Para no compartir datos con Google sin tu permiso, no se carga hasta que lo pidas.</p>
      <button type="button" class="btn btn--linea" data-mapa-cargar>Cargar el mapa</button>
    </div>
  </div>
</div>
"""
    pagina("contacto/", "Contacto y ubicación | Da Mimì, Teatinos (Málaga)",
           "Dirección, teléfono, horario y mapa de Da Mimì, pizzería napolitana en el Blvr. Louis Pasteur, 15, Teatinos (Málaga).",
           cuerpo, jsonld=[ld_restaurante()], migas=[("Inicio", ""), ("Contacto", "contacto/")])


def dato_legal(clave, nombre):
    v = D.LEGAL.get(clave)
    if v:
        return e(v)
    return f'[{nombre}] {pend("Falta que Da Mimì nos dé este dato.")}' if D.BORRADOR else "—"


def pag_legales():
    titular = f"""<ul class="datos-legales">
  <li><strong>Titular:</strong> {dato_legal('razon_social', 'Razón social')}</li>
  <li><strong>NIF:</strong> {dato_legal('nif', 'NIF')}</li>
  <li><strong>Domicilio:</strong> {e(DIRECCION_TXT)}</li>
  <li><strong>Correo electrónico:</strong> {dato_legal('email', 'correo')}</li>
  <li><strong>Teléfono:</strong> {TEL['visible']}</li>
  <li><strong>Datos registrales:</strong> {dato_legal('registro', 'datos del Registro Mercantil, si es sociedad')}</li>
</ul>"""
    aviso = f"""
<section class="intro envoltura legal">
  <h1 class="tit-pagina">Aviso legal</h1>
  {bloque_pend('Datos de la empresa', '<p>Faltan razón social, NIF, correo y, si es una sociedad, los datos registrales. Conviene que un profesional revise estos textos antes de publicar.</p>')}
  <h2>1. Datos del titular</h2>
  <p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI), estos son los datos del titular de esta web:</p>
  {titular}
  <h2>2. Objeto</h2>
  <p>Esta web informa sobre el restaurante {D.NOMBRE}: su carta, horario, ubicación y formas de reservar o pedir. No se venden productos ni servicios a través de ella.</p>
  <h2>3. Condiciones de uso</h2>
  <p>Quien visita la web se compromete a usarla de forma lícita. La información de la carta, precios y horario puede cambiar; ante cualquier duda, confírmala con el restaurante.</p>
  <h2>4. Propiedad intelectual</h2>
  <p>Los textos, fotografías y el logotipo de esta web pertenecen a su titular o se usan con su permiso. No se pueden reproducir sin autorización.</p>
  <h2>5. Enlaces externos</h2>
  <p>La web enlaza a servicios de terceros (Google Maps, Instagram, Facebook y plataformas de reparto). El titular no se hace responsable de su contenido ni de sus políticas.</p>
  <h2>6. Legislación aplicable</h2>
  <p>Este aviso legal se rige por la legislación española.</p>
</section>"""
    privacidad = f"""
<section class="intro envoltura legal">
  <h1 class="tit-pagina">Política de privacidad</h1>
  {bloque_pend('Datos del responsable', '<p>Faltan razón social, NIF y correo de contacto para ejercer derechos. Conviene revisión profesional antes de publicar.</p>')}
  <h2>1. Responsable del tratamiento</h2>
  {titular}
  <h2>2. Qué datos recoge esta web</h2>
  <p>Esta web no tiene formularios, no pide registro y no guarda datos personales de quien la visita. Si llamas por teléfono o escribes por redes sociales, el restaurante usará tus datos solo para atender tu reserva, pedido o consulta.</p>
  <h2>3. Base legal y conservación</h2>
  <p>La base legal es tu consentimiento o la gestión de lo que nos pides (artículo 6.1 a) y b) del Reglamento General de Protección de Datos, RGPD). Los datos se guardan solo el tiempo necesario para atenderte y cumplir obligaciones legales.</p>
  <h2>4. Servicios de terceros</h2>
  <p>El hosting de la web puede registrar datos técnicos de las visitas (como la dirección IP) por motivos de seguridad. El mapa de Google solo se carga si pulsas «Cargar el mapa»; a partir de ese momento se aplica la política de privacidad de Google.</p>
  <h2>5. Tus derechos</h2>
  <p>Puedes pedir el acceso, la rectificación, la supresión, la oposición, la limitación del tratamiento y la portabilidad de tus datos escribiendo al correo del responsable. Si crees que no se han respetado tus derechos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>
</section>"""
    cookies = f"""
<section class="intro envoltura legal">
  <h1 class="tit-pagina">Política de cookies</h1>
  {bloque_pend('Revisión', '<p>Revisar este texto si en el futuro se añade analítica (por ejemplo, Google Analytics), un píxel de redes o un widget de reservas: en ese caso hará falta un banner de consentimiento.</p>')}
  <h2>1. Qué cookies usa esta web</h2>
  <p>Esta web no instala cookies propias ni cookies de analítica o publicidad.</p>
  <h2>2. Cookies de terceros</h2>
  <p>En la página de contacto hay un mapa de Google que no se carga hasta que pulsas «Cargar el mapa». Si lo cargas, Google puede instalar sus propias cookies según su política.</p>
  <h2>3. Cómo gestionarlas</h2>
  <p>Puedes ver y borrar las cookies desde la configuración de tu navegador.</p>
</section>"""
    for slug, tit, desc, cuerpo in [
        ("aviso-legal/", "Aviso legal | Da Mimì", "Aviso legal de la web de Da Mimì, pizzería napolitana en Teatinos (Málaga).", aviso),
        ("privacidad/", "Política de privacidad | Da Mimì", "Política de privacidad de la web de Da Mimì, pizzería napolitana en Teatinos (Málaga).", privacidad),
        ("cookies/", "Política de cookies | Da Mimì", "Política de cookies de la web de Da Mimì, pizzería napolitana en Teatinos (Málaga).", cookies),
    ]:
        nombre = tit.split(" |")[0]
        pagina(slug, tit, desc, cuerpo, migas=[("Inicio", ""), (nombre, slug)])


def pag_404():
    cuerpo = """
<section class="intro envoltura no-encontrada">
  <p class="cartel__firma" aria-hidden="true">vaya…</p>
  <h1 class="tit-pagina">Esta página no existe</h1>
  <p class="intro__lead">Puede que el enlace esté mal o que la página haya cambiado de sitio.</p>
  <div class="botones"><a class="btn btn--rojo" href="/">Ir al inicio</a><a class="btn btn--linea" href="/carta/">Ver la carta</a></div>
</section>"""
    pagina("", "Página no encontrada | Da Mimì",
           "La página que buscas no existe en la web de Da Mimì.", cuerpo, indexar=False, ruta_archivo="404.html")


# ------------------------------------------------------------------ archivos técnicos
PAGINAS_SITEMAP = ["", "carta/", "especialidades/", "nuestra-historia/", "galeria/",
                   "reservas/", "contacto/", "aviso-legal/", "privacidad/", "cookies/"]


def tecnicos():
    urls = "".join(f"<url><loc>{SITE}/{s}</loc></url>" for s in PAGINAS_SITEMAP)
    (WEB / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n',
        encoding="utf-8")
    (WEB / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
    manifest = {"name": D.NOMBRE, "short_name": D.NOMBRE, "lang": "es", "start_url": "/",
                "display": "browser", "background_color": "#FFFDF9", "theme_color": "#FFFDF9",
                "icons": [{"src": "/assets/img/icon-192.png", "sizes": "192x192", "type": "image/png"},
                          {"src": "/assets/img/icon-512.png", "sizes": "512x512", "type": "image/png"}]}
    (WEB / "site.webmanifest").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
    shutil.copy(FUENTE / "htaccess.txt", WEB / ".htaccess")
    for f in ("favicon.ico", "favicon-32.png", "apple-touch-icon.png"):
        shutil.copy(STATIC / "img" / f, WEB / f)


def empaquetar():
    ENTREGA.mkdir(exist_ok=True)
    destino = ENTREGA / "da-mimi-hostinger.zip"
    with zipfile.ZipFile(destino, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(WEB.rglob("*")):
            if f.is_file():
                z.write(f, f.relative_to(WEB).as_posix())
    return destino


def main():
    if WEB.exists():
        shutil.rmtree(WEB)
    (WEB / "assets").mkdir(parents=True)
    for carpeta in ("css", "js", "fonts", "img"):
        shutil.copytree(STATIC / carpeta, WEB / "assets" / carpeta)
    pag_inicio()
    pag_carta()
    pag_especialidades()
    pag_historia()
    pag_galeria()
    pag_reservas()
    pag_contacto()
    pag_legales()
    pag_404()
    tecnicos()
    z = empaquetar()
    modo = "BORRADOR (con etiquetas Pendiente y noindex)" if D.BORRADOR else "FINAL (sin pendientes, indexable)"
    print(f"Web generada en {WEB}  ·  modo {modo}")
    print(f"Zip para Hostinger: {z}")


if __name__ == "__main__":
    main()
