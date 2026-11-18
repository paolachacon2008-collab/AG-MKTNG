/* =========================================================
   11N Brasserie · pinta la carta desde data/menu.js
   - Home: best sellers
   - carta.html: pestañas, buscador, filtros, ES/EN y tarjetas flip
   - matcha-bar.html: familias, vaso que se llena, "Hot or iced?"
   No hace falta tocar este archivo para cambiar precios.
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var M = window.MENU;
  if (!M) return;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var idioma = "es";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function precio(p) {
    if (typeof p !== "number") return esc(p);
    var t = p.toFixed(2);
    return idioma === "en" ? "€" + t : t.replace(".", ",") + " €";
  }
  function extra(p) { return "+" + precio(p); }
  function nom(pl) { return idioma === "en" && pl.nombre_en ? pl.nombre_en : pl.nombre; }
  function desc(pl) { return idioma === "en" && pl.desc_en ? pl.desc_en : (pl.desc || ""); }
  function cat(id) { return M.categorias.filter(function (c) { return c.id === id; })[0]; }
  var T = {
    es: { frio: "Frío", caliente: "Caliente", vegetal: "Leche vegetal", best: "Best seller", girar: "Toca para ver qué lleva", extras: "Extras", nada: "No hay nada con esos filtros. Prueba a quitar alguno.", res: " platos encontrados" },
    en: { frio: "Iced", caliente: "Hot", vegetal: "Plant milk", best: "Best seller", girar: "Tap to see what's in it", extras: "Extras", nada: "Nothing matches those filters. Try removing one.", res: " items found" }
  };
  function t(k) { return T[idioma][k]; }
  function ico(n) { return '<svg class="i" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function esBebidaVaso(pl) { return pl.cat === "matcha" || pl.cat === "frios"; }
  function ilustracion(pl) {
    if (esBebidaVaso(pl) && window.vasoRelleno) {
      return '<div class="ilus">' + window.vasoRelleno(window.COLORES_BEBIDA(pl.nombre + " " + (pl.desc || "")), { pajita: pl.frio }) + "</div>";
    }
    var c = cat(pl.cat);
    return '<svg class="ilus" aria-hidden="true"><use href="#i-' + (c ? c.ilus : "plato") + '"/></svg>';
  }
  function foto(pl) {
    return '<picture><source type="image/webp" srcset="img/' + pl.foto + '-480.webp"><img src="img/' + pl.foto + '-480.jpg" alt="' + esc(pl.fotoAlt || "") + '" loading="lazy" decoding="async"></picture>';
  }
  function etiquetas(pl, oscuro) {
    var e = "";
    if (pl.best) e += '<span class="etiqueta">⭐ ' + t("best") + "</span>";
    if (pl.frio) e += '<span class="etiqueta">❄️ ' + t("frio") + "</span>";
    if (pl.caliente) e += '<span class="etiqueta">🔥 ' + t("caliente") + "</span>";
    if (pl.vegetal) e += '<span class="etiqueta">🌱 ' + t("vegetal") + "</span>";
    if (pl.wraps) e += '<span class="etiqueta etiqueta-wraps" data-wraps-estado>' + (window.wrapsAhora && window.wrapsAhora() ? "Disponible ahora" : "De 12:00 a 13:30") + "</span>";
    return e;
  }

  /* ---------- Tarjeta flip ---------- */
  function tarjeta(pl) {
    var front = pl.foto ? foto(pl) : ilustracion(pl);
    var chipsDelante = (pl.best ? '<span class="etiqueta etiqueta-best" style="position:static">⭐ ' + t("best") + "</span>" : "") +
      (pl.wraps ? '<span class="etiqueta etiqueta-wraps" data-wraps-estado>' + (window.wrapsAhora && window.wrapsAhora() ? "Disponible ahora" : "De 12:00 a 13:30") + "</span>" : "");
    var extras = "";
    if (pl.extras && pl.extras.length) {
      extras = "<ul>" + pl.extras.map(function (x) { return "<li>" + esc(x[0]) + " " + extra(x[1]) + "</li>"; }).join("") + "</ul>";
    }
    var verificar = pl.verificar ? '<p class="verificar"><span class="pendiente">[VERIFICAR: ' + esc(pl.verificar) + "]</span></p>" : "";
    return '<article class="plato">' +
      '<div class="plato-interior" tabindex="0" role="button" aria-pressed="false">' +
        '<div class="cara cara-delante">' +
          '<div class="media">' + front + '<span class="etiquetas">' + chipsDelante + "</span>" +
            '<span class="girar-pista" title="' + t("girar") + '">' + ico("girar") + "</span></div>" +
          '<div class="pie-plato"><h3>' + esc(nom(pl)) + '</h3><span class="precio">' + precio(pl.precio) + "</span></div>" +
          (desc(pl) ? '<p class="visually-hidden">' + esc(desc(pl)) + "</p>" : "") +
        "</div>" +
        '<div class="cara cara-detras">' +
          "<h3>" + esc(nom(pl)) + " · " + precio(pl.precio) + "</h3>" +
          (desc(pl) ? "<p>" + esc(desc(pl)) + "</p>" : "") +
          '<div class="etiquetas">' + etiquetas(pl) + "</div>" + extras + verificar +
        "</div>" +
      "</div></article>";
  }
  function filaSimple(pl) {
    var marcas = (pl.best ? " ⭐" : "") + (pl.vegetal ? ' <span title="' + t("vegetal") + '">🌱</span>' : "");
    var ver = pl.verificar ? ' <span class="pendiente">[VERIFICAR: ' + esc(pl.verificar) + "]</span>" : "";
    return '<li><span class="nom">' + esc(nom(pl)) + marcas + ver + '</span><span class="puntos" aria-hidden="true"></span><span class="precio">' + precio(pl.precio) + "</span></li>";
  }
  function activarFlips(raiz) {
    raiz.querySelectorAll(".plato-interior").forEach(function (el) {
      function girar() {
        var art = el.parentNode, on = !art.classList.contains("girada");
        art.classList.toggle("girada", on);
        el.setAttribute("aria-pressed", on ? "true" : "false");
      }
      el.addEventListener("click", girar);
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); girar(); } });
    });
  }
  function bloqueGrupo(lista) {
    var conDetalle = lista.some(function (p) { return p.desc || p.extras || p.foto; });
    if (conDetalle) return '<div class="rejilla-platos">' + lista.map(tarjeta).join("") + "</div>";
    return '<ul class="lista-simple">' + lista.map(filaSimple).join("") + "</ul>";
  }
  function agrupar(lista) {
    var grupos = [], idx = {};
    lista.forEach(function (p) {
      var g = p.grupo || "";
      if (!(g in idx)) { idx[g] = grupos.length; grupos.push({ nombre: g, platos: [] }); }
      grupos[idx[g]].platos.push(p);
    });
    return grupos;
  }
  var GRUPOS_EN = { "Crujientes": "Crispy", "Dulces": "Sweet", "Crêpes salados": "Savoury crêpes", "Crêpes dulces": "Sweet crêpes", "Desayunos del mundo": "Breakfasts of the world", "Smoothies & zumos": "Smoothies & juices", "Zumos de botella": "Bottled juices", "Batidos": "Milkshakes" };
  function nomGrupo(g) { return idioma === "en" && GRUPOS_EN[g] ? GRUPOS_EN[g] : g; }

  /* ======================= HOME: best sellers ======================= */
  var best = document.querySelector("[data-best-sellers]");
  if (best) {
    best.innerHTML = M.platos.filter(function (p) { return p.best; }).map(function (p, i) {
      return '<a class="tarjeta-bebida revelar visible" href="matcha-bar.html#familias" style="text-decoration:none;color:inherit">' +
        '<span class="etiqueta etiqueta-best">⭐ Best seller</span>' +
        '<div class="ilus">' + window.vasoRelleno(window.COLORES_BEBIDA(p.nombre + " " + p.desc), { pajita: true }) + "</div>" +
        "<h3>" + esc(p.nombre_en || p.nombre) + "</h3><p>" + esc(p.desc) + '</p><span class="precio">' + precio(p.precio) + "</span></a>";
    }).join("");
  }

  /* ======================= CARTA COMPLETA ======================= */
  var carta = document.querySelector("[data-carta]");
  if (carta) {
    var pestanas = document.querySelector("[data-pestanas]");
    var buscador = document.querySelector("[data-buscador]");
    var avisoRes = document.querySelector("[data-resultados]");
    var filtros = {};

    function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
    function pasa(p) {
      var q = norm(buscador.value.trim());
      if (q) {
        var texto = norm([p.nombre, p.nombre_en, p.desc, p.desc_en, p.grupo].join(" "));
        if (texto.indexOf(q) === -1) return false;
      }
      for (var f in filtros) if (filtros[f] && !p[f]) return false;
      return true;
    }
    function pintarCarta() {
      var html = "", tabs = "", total = 0;
      M.categorias.forEach(function (c) {
        var lista = M.platos.filter(function (p) { return p.cat === c.id && pasa(p); });
        if (!lista.length) return;
        total += lista.length;
        var nombreCat = idioma === "en" ? c.en : c.es;
        tabs += '<a href="#cat-' + c.id + '" data-tab="' + c.id + '">' + esc(nombreCat) + "</a>";
        html += '<section class="carta-cat" id="cat-' + c.id + '" aria-labelledby="h-' + c.id + '"><h2 id="h-' + c.id + '">' + esc(nombreCat) + "</h2>";
        var nota = M.notas[c.id];
        html += nota ? '<p class="nota-cat">' + esc(nota[idioma]) + "</p>" : '<p class="nota-cat"></p>';
        agrupar(lista).forEach(function (g) {
          if (g.nombre) html += '<h3 class="carta-grupo">' + esc(nomGrupo(g.nombre)) + "</h3>";
          html += bloqueGrupo(g.platos);
        });
        html += "</section>";
      });
      carta.innerHTML = html || '<p class="sin-resultados">' + t("nada") + "</p>";
      carta.setAttribute("lang", idioma);
      pestanas.innerHTML = tabs;
      avisoRes.textContent = total + t("res");
      activarFlips(carta);
      observarPestanas();
    }
    var ultimoActivo = null;
    function marcar(id) {
      if (id === ultimoActivo) return;
      ultimoActivo = id;
      pestanas.querySelectorAll("a").forEach(function (a) {
        var on = a.getAttribute("data-tab") === id;
        a.classList.toggle("activa", on);
        if (on) {
          a.setAttribute("aria-current", "true");
          var izq = a.offsetLeft - pestanas.clientWidth / 2 + a.clientWidth / 2;
          pestanas.scrollTo({ left: izq, behavior: reducido ? "auto" : "smooth" });
        } else a.removeAttribute("aria-current");
      });
    }
    function seccionActiva() {
      var limite = pestanas.getBoundingClientRect().bottom + 60, actual = null;
      carta.querySelectorAll(".carta-cat").forEach(function (sec) { if (sec.getBoundingClientRect().top <= limite || !actual) actual = sec; });
      if (actual) marcar(actual.id.replace("cat-", ""));
    }
    function observarPestanas() { ultimoActivo = null; seccionActiva(); }
    var pendScroll = false;
    window.addEventListener("scroll", function () {
      if (pendScroll) return; pendScroll = true;
      requestAnimationFrame(function () { seccionActiva(); pendScroll = false; });
    }, { passive: true });
    var temporizador;
    buscador.addEventListener("input", function () { clearTimeout(temporizador); temporizador = setTimeout(pintarCarta, 160); });
    document.querySelectorAll("[data-filtro]").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filtro"), on = b.getAttribute("aria-pressed") !== "true";
        b.setAttribute("aria-pressed", on ? "true" : "false");
        filtros[f] = on; pintarCarta();
      });
    });
    document.querySelectorAll("[data-idioma]").forEach(function (b) {
      b.addEventListener("click", function () {
        idioma = b.getAttribute("data-idioma");
        document.querySelectorAll("[data-idioma]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        buscador.placeholder = idioma === "en" ? "Search: matcha, pistachio, salmon…" : "Busca: matcha, pistacho, salmón…";
        pintarCarta();
      });
    });
    pintarCarta();
    if (location.hash) { var dest = document.querySelector(location.hash); if (dest) dest.scrollIntoView(); }
  }

  /* ======================= MATCHA BAR ======================= */
  var cm = document.querySelector("[data-carta-matcha]");
  if (cm) {
    var html = "";
    agrupar(M.platos.filter(function (p) { return p.cat === "matcha"; })).forEach(function (g) {
      html += '<h3 class="carta-grupo">' + esc(g.nombre) + "</h3>" + '<div class="rejilla-platos">' + g.platos.map(tarjeta).join("") + "</div>";
    });
    cm.innerHTML = html;
    activarFlips(cm);
  }

  /* Vaso del hero que se llena al hacer scroll (leche abajo, matcha arriba) */
  var vs = document.querySelector("[data-vaso-scroll]");
  if (vs) {
    var leche = vs.querySelector('[data-capa="leche"]'), matcha = vs.querySelector('[data-capa="matcha"]'), hielo = vs.querySelector("[data-hielo]");
    var FONDO = 47, ALTO = 41;
    function llenar(p) {
      p = Math.max(0, Math.min(1, p));
      var hL = ALTO * 0.45 * Math.min(1, p / 0.5);
      var hM = ALTO * 0.55 * Math.max(0, Math.min(1, (p - 0.35) / 0.65));
      leche.setAttribute("y", (FONDO - hL).toFixed(2)); leche.setAttribute("height", hL.toFixed(2));
      matcha.setAttribute("y", (FONDO - hL - hM).toFixed(2)); matcha.setAttribute("height", (hM + 0.4).toFixed(2));
      hielo.setAttribute("opacity", p > 0.85 ? 1 : 0);
    }
    if (reducido) llenar(1);
    else {
      var base = 0.55; llenar(base);
      var hero = vs.closest("section"), pend = false;
      function alScroll() {
        if (pend) return; pend = true;
        requestAnimationFrame(function () {
          var r = hero.getBoundingClientRect();
          var p = base + (1 - base) * (-r.top / (r.height * 0.6));
          llenar(p); pend = false;
        });
      }
      window.addEventListener("scroll", alScroll, { passive: true });
      // pequeño "llenado" inicial para que se note el efecto
      var t0 = null;
      requestAnimationFrame(function anim(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 900); llenar(base * k); if (k < 1) requestAnimationFrame(anim); else alScroll(); });
    }
  }

  /* Hot or iced? */
  var hi = document.querySelector("[data-hot-iced]");
  if (hi) {
    var sw = hi.querySelector("[data-interruptor]"), lista = hi.querySelector("[data-lista-tipo]");
    function pintarTipo() {
      var iced = sw.getAttribute("aria-checked") === "true";
      hi.classList.toggle("iced", iced);
      var bebidas = M.platos.filter(function (p) { return p.cat === "matcha" && (iced ? p.frio : p.caliente); });
      lista.innerHTML = '<p style="width:100%;margin:0 0 6px;color:var(--texto-suave)">' + (iced ? "Matchas que puedes pedir fríos (" : "Matchas que puedes pedir calientes (") + bebidas.length + ")</p>" +
        bebidas.map(function (p, i) { return '<span style="animation-delay:' + (i * 40) + 'ms"><b>' + esc(p.nombre) + "</b> · " + precio(p.precio) + "</span>"; }).join("");
    }
    sw.addEventListener("click", function () { sw.setAttribute("aria-checked", sw.getAttribute("aria-checked") === "true" ? "false" : "true"); pintarTipo(); });
    pintarTipo();
  }
});
