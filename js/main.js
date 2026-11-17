/* Taberna la New — script principal.
   Pinta la carta, los platos estrella, el horario, las reseñas y los datos
   para Google a partir de los archivos de /datos. No hace falta tocar este archivo
   para cambiar precios u horarios. */
(function () {
  "use strict";
  var C = window.CONTACTO || {}, H = window.HORARIO || { dias: [] }, M = window.CARTA || { secciones: [] }, R = window.RESENAS || [];
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function vacio(v) { return !v || /^\[CONFIRMAR/.test(v); }
  function texto(v) { return vacio(v) && v ? '<span class="pendiente">' + esc(v) + "</span>" : esc(v || ""); }
  // "12,9" -> "12,90 €"
  function euros(v) {
    var n = parseFloat(String(v).replace(",", "."));
    if (isNaN(n)) return esc(v);
    return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }
  function precios(lista) { return lista.map(euros).join('<span class="sep">/</span>'); }

  var hoja = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 3C9 3 4 8 4 15c0 2 .5 3.6 1.3 4.9L3.3 22l1.4 1.4 2.1-2.1C8 22 9.6 22.5 11.5 22.5 18 22.5 21 16 21 8V3h-4zm-5.7 12.7-1.4-1.4 6-6 1.4 1.4-6 6z"/></svg>';

  // 14 alérgenos oficiales UE (Reglamento 1169/2011)
  var ALERGENOS = {
    "gluten": ["GL", "Gluten"], "crustaceos": ["CR", "Crustáceos"], "huevos": ["HU", "Huevos"], "pescado": ["PE", "Pescado"],
    "cacahuetes": ["CA", "Cacahuetes"], "soja": ["SO", "Soja"], "lacteos": ["LA", "Lácteos"], "frutos-cascara": ["FC", "Frutos de cáscara"],
    "apio": ["AP", "Apio"], "mostaza": ["MO", "Mostaza"], "sesamo": ["SE", "Sésamo"], "sulfitos": ["SU", "Sulfitos"],
    "altramuces": ["AL", "Altramuces"], "moluscos": ["ML", "Moluscos"]
  };
  function iconosAlergenos(a) {
    if (!a || !a.length) return "";
    return '<span class="alergenos">' + a.map(function (k) {
      var x = ALERGENOS[k]; return x ? '<abbr title="' + x[1] + '" aria-label="Contiene ' + x[1].toLowerCase() + '">' + x[0] + "</abbr>" : "";
    }).join("") + "</span>";
  }

  /* ---------- Datos de contacto ---------- */
  $$("[data-contacto]").forEach(function (el) {
    var v = C[el.getAttribute("data-contacto")];
    if (v !== undefined && v !== "") el.innerHTML = texto(v);
  });
  $$("[data-num-resenas]").forEach(function (el) {
    el.innerHTML = vacio(C.numeroResenas) ? '<span class="pendiente">[CONFIRMAR: nº de reseñas]</span>' : "(" + esc(C.numeroResenas) + " reseñas)";
  });
  if (C.telefonoEnlace) $$("[data-tel]").forEach(function (a) { a.href = "tel:" + C.telefonoEnlace; });
  if (C.googleMaps) $$("[data-maps]").forEach(function (a) { a.href = C.googleMaps; });
  var bRes = $("#boton-resena");
  if (bRes && !vacio(C.enlaceResena)) bRes.href = C.enlaceResena;

  var redes = $("#redes");
  if (redes) {
    if (!vacio(C.facebook)) redes.insertAdjacentHTML("beforeend", '<li><a href="' + esc(C.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>');
    if (!vacio(C.whatsapp)) redes.insertAdjacentHTML("beforeend", '<li><a href="https://wa.me/' + esc(C.whatsapp) + '" target="_blank" rel="noopener">WhatsApp</a></li>');
  }
  var anio = $("#anio"); if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Horario ---------- */
  function turnos(t) { return t.length ? t.map(function (x) { return x[0] + "–" + (x[1] === "24:00" ? "00:00" : x[1]); }).join(" y ") : "Cerrado"; }
  var tb = $("#horario tbody");
  if (tb) {
    var hoy = (new Date().getDay() + 6) % 7; // lunes = 0
    tb.innerHTML = H.dias.map(function (d, i) {
      return '<tr' + (i === hoy ? ' class="hoy"' : "") + '><th scope="row">' + esc(d.dia) + (i === hoy ? ' <span class="visualmente-oculto">(hoy)</span>' : "") + "</th><td>" + turnos(d.turnos) + "</td></tr>";
    }).join("");
    if (H.pendienteConfirmar) $("#horario").insertAdjacentHTML("afterend", '<p><span class="pendiente">[CONFIRMAR: horario]</span></p>');
  }
  var hp = $("#horario-pie");
  if (hp) {
    // agrupa días con el mismo horario
    var grupos = [];
    H.dias.forEach(function (d) {
      var t = turnos(d.turnos), u = grupos[grupos.length - 1];
      if (u && u.t === t) u.fin = d.dia; else grupos.push({ ini: d.dia, fin: null, t: t });
    });
    hp.innerHTML = grupos.map(function (g) {
      var dias = g.ini === "Lunes" && g.fin === "Domingo" ? "Todos los días" : g.ini + (g.fin ? " a " + g.fin : "");
      return "<li>" + esc(dias) + "<br>" + esc(g.t) + "</li>";
    }).join("");
  }

  /* ---------- Carta ---------- */
  var nav = $("#carta-nav"), cuerpo = $("#carta-cuerpo");
  if (nav && cuerpo) {
    nav.innerHTML = M.secciones.map(function (s) {
      return '<li><a href="#c-' + s.id + '">' + esc((s.subtitulo || s.titulo).replace(/…$/, "")) + "</a></li>";
    }).join("");
    cuerpo.innerHTML = M.secciones.map(function (s) {
      var h = '<section class="carta-seccion" id="c-' + s.id + '" aria-labelledby="h-' + s.id + '"><h3 id="h-' + s.id + '">' + esc(s.titulo) + "</h3>";
      if (s.subtitulo) h += '<p class="sub">' + esc(s.subtitulo) + "</p>";
      h += '<ul class="lista-platos">' + s.platos.map(function (p) {
        return '<li><span class="n">' + esc(p.nombre) +
          (p.vegetariano ? '<span class="veg" title="Vegetariano">' + hoja + '<span class="visualmente-oculto">(vegetariano)</span></span>' : "") +
          iconosAlergenos(p.alergenos) +
          (p.verificar ? ' <span class="pendiente">[VERIFICAR: ' + esc(p.verificar) + "]</span>" : "") +
          '</span><span class="p">' + precios(p.precios) + "</span></li>";
      }).join("") + "</ul>";
      if (s.tercios) {
        h += '<p class="sub-tabla" aria-hidden="true">Tercios</p><div class="tercios"><table class="tabla-cervezas"><caption class="visualmente-oculto">Tercios</caption><tbody>' +
          s.tercios.slice(0, Math.ceil(s.tercios.length / 2)).map(function (b) { return '<tr><th scope="row">' + esc(b.nombre) + "</th><td>" + euros(b.precio) + "</td></tr>"; }).join("") +
          '</tbody></table><table class="tabla-cervezas"><caption class="visualmente-oculto">Tercios (continuación)</caption><tbody>' +
          s.tercios.slice(Math.ceil(s.tercios.length / 2)).map(function (b) { return '<tr><th scope="row">' + esc(b.nombre) + "</th><td>" + euros(b.precio) + "</td></tr>"; }).join("") +
          "</tbody></table></div>";
      }
      if (s.barril) {
        h += '<table class="tabla-cervezas"><caption>De barril</caption><thead><tr><th scope="col"><span class="visualmente-oculto">Cerveza</span></th><th scope="col">Caña</th><th scope="col">Copa</th><th scope="col">Pinta</th></tr></thead><tbody>' +
          s.barril.map(function (b) { return '<tr><th scope="row">' + esc(b.nombre) + "</th><td>" + euros(b.cana) + "</td><td>" + euros(b.copa) + "</td><td>" + euros(b.pinta) + "</td></tr>"; }).join("") +
          "</tbody></table>";
      }
      if (s.nota) h += '<p class="nota">' + esc(s.nota) + "</p>";
      return h + "</section>";
    }).join("");
    if (M.servicioPan) $("#servicio-pan").innerHTML = euros(M.servicioPan);
    if (M.avisoAlergenos) $("#aviso-alergenos").textContent = M.avisoAlergenos;

    // marca la sección visible en la barra de la carta
    if ("IntersectionObserver" in window) {
      var enlaces = $$("a", nav);
      var obs = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          enlaces.forEach(function (a) {
            var on = a.getAttribute("href") === "#" + e.target.id;
            a.classList.toggle("activa", on);
            if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      $$(".carta-seccion", cuerpo).forEach(function (s) { obs.observe(s); });
    }
  }

  /* ---------- Platos estrella ---------- */
  var est = $("#estrellas");
  if (est) {
    var todos = [];
    M.secciones.forEach(function (s) { s.platos.forEach(function (p) { if (p.estrella) todos.push(p); }); });
    todos.sort(function (a, b) { return a.estrella - b.estrella; });
    var conFoto = todos.filter(function (p) { return p.foto; }), sinFoto = todos.filter(function (p) { return !p.foto; });
    est.innerHTML = conFoto.map(function (p, i) {
      var sizes = i === 0 ? "(max-width: 860px) 100vw, 58vw" : "(max-width: 860px) 100vw, 42vw";
      var an = p.fotoAnchos || [480, 800, 1200];
      var srcW = an.map(function (w) { return "img/" + p.foto + "-" + w + ".webp " + w + "w"; }).join(", ");
      var srcJ = an.map(function (w) { return "img/" + p.foto + "-" + w + ".jpg " + w + "w"; }).join(", ");
      return '<figure class="plato aparece"><div class="foto"><picture><source type="image/webp" srcset="' + srcW + '" sizes="' + sizes + '">' +
        '<img src="img/' + p.foto + '-800.jpg" srcset="' + srcJ + '" sizes="' + sizes + '" width="800" height="800" loading="lazy" decoding="async" alt="' + esc(p.fotoAlt || p.nombre) + '"></picture></div>' +
        (p.credito ? '<span class="credito">' + esc(p.credito) + "</span>" : "") +
        '<figcaption><span class="nombre">' + esc(p.nombreCorto || p.nombre) + '</span><span class="precio">' + precios(p.precios) + "</span></figcaption></figure>";
    }).join("") + (sinFoto.length ? '<div class="tambien aparece"><p class="etiqueta">Y no te vayas sin probar</p>' +
      sinFoto.map(function (p) { return "<span>" + esc(p.nombreCorto || p.nombre) + "<b>" + precios(p.precios) + "</b></span>"; }).join("") + "</div>" : "");
  }

  /* ---------- Reseñas ---------- */
  var res = $("#resenas");
  if (res) {
    var lista = R.length ? R : [0, 1, 2];
    res.innerHTML = lista.map(function (r) {
      if (!R.length) return '<figure class="resena"><blockquote><span class="pendiente">[CONFIRMAR: reseña real copiada de Google]</span></blockquote><figcaption><span class="pendiente">[Nombre tal como aparece en Google]</span></figcaption></figure>';
      var n = Math.max(0, Math.min(5, r.estrellas || 5));
      return '<figure class="resena aparece"><blockquote><p>' + esc(r.texto) + '</p></blockquote><figcaption><span class="estrellas" aria-label="' + n + ' de 5 estrellas">' + "★★★★★".slice(0, n) + "</span><br>" +
        esc(r.nombre) + (r.fecha ? " · " + esc(r.fecha) : "") + " · en Google</figcaption></figure>";
    }).join("");
  }

  /* ---------- Datos estructurados para Google (JSON-LD) ---------- */
  var dias = { "Lunes": "Monday", "Martes": "Tuesday", "Miércoles": "Wednesday", "Jueves": "Thursday", "Viernes": "Friday", "Sábado": "Saturday", "Domingo": "Sunday" };
  var horas = [];
  H.dias.forEach(function (d) {
    d.turnos.forEach(function (t) {
      horas.push({ "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/" + dias[d.dia], opens: t[0], closes: t[1] === "24:00" ? "23:59" : t[1] });
    });
  });
  var url = (C.dominio || "").replace(/\/$/, "") + "/";
  var ld = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: C.nombre,
    slogan: "Tradición & Actualidad",
    url: url,
    telephone: C.telefonoEnlace,
    email: C.email,
    image: [url + "img/compartir-1200x630.jpg", url + "img/salon-1200.jpg"],
    logo: url + "favicon-512.png",
    priceRange: "20–30 €",
    servesCuisine: ["Andaluza", "Española"],
    acceptsReservations: "True",
    hasMenu: url + "#carta",
    address: { "@type": "PostalAddress", addressLocality: C.ciudad, addressRegion: "Málaga", addressCountry: "ES" },
    areaServed: "Teatinos, Málaga",
    openingHoursSpecification: horas,
    sameAs: [C.instagram, C.facebook].filter(function (x) { return !vacio(x); })
  };
  if (!vacio(C.direccion)) ld.address.streetAddress = C.direccion;
  if (!vacio(C.codigoPostal)) ld.address.postalCode = C.codigoPostal;
  if (!vacio(C.latitud) && !vacio(C.longitud)) ld.geo = { "@type": "GeoCoordinates", latitude: C.latitud, longitude: C.longitud };
  if (C.googleMaps) ld.hasMap = C.googleMaps;
  var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

  /* ---------- Menú móvil ---------- */
  var bm = $(".boton-menu"), menu = $("#menu");
  if (bm && menu) {
    var cerrar = function () { menu.classList.remove("abierto"); bm.setAttribute("aria-expanded", "false"); $(".visualmente-oculto", bm).textContent = "Abrir menú"; };
    bm.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      bm.setAttribute("aria-expanded", String(abierto));
      $(".visualmente-oculto", bm).textContent = abierto ? "Cerrar menú" : "Abrir menú";
    });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", cerrar); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("abierto")) { cerrar(); bm.focus(); } });
  }

  /* ---------- Mapa: solo se carga si el usuario lo pide (cookies) ---------- */
  var vm = $("#ver-mapa");
  if (vm) vm.addEventListener("click", function () {
    var q = encodeURIComponent(vacio(C.direccion) ? C.nombre + ", Teatinos, Málaga" : C.nombre + ", " + C.direccion + ", " + C.ciudad);
    $("#mapa").innerHTML = '<iframe title="Mapa de situación de ' + esc(C.nombre) + '" src="https://www.google.com/maps?q=' + q + '&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  });

  /* ---------- Aparición suave al hacer scroll ---------- */
  var aparecen = $$(".aparece");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    aparecen.forEach(function (el) { io.observe(el); });
  } else {
    aparecen.forEach(function (el) { el.classList.add("visible"); });
  }
})();
