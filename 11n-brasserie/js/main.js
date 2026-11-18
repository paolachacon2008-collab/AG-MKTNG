/* =========================================================
   11N Brasserie · lógica común de todas las páginas
   (iconos, ¿abierto ahora?, vacaciones, menú móvil, horario,
   animaciones, temporada, loader, mapa)
   ========================================================= */
(function () {
  "use strict";
  var L = window.LOCAL || {};
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Iconos SVG (se insertan una vez y se usan con <use href="#i-...">) ---------- */
  var VASO = "M10 4H30C34 8.5 34 12.5 30.5 16.5C34 20.5 34 24.5 30.5 28.5C34 32.5 34 36.5 30.5 40.5C32.5 44.5 30.5 47 27.5 47H12.5C9.5 47 7.5 44.5 9.5 40.5C6 36.5 6 32.5 9.5 28.5C6 24.5 6 20.5 9.5 16.5C6 12.5 6 8.5 10 4Z";
  var ICONOS = {
    vaso: ['0 0 40 50', '<path d="' + VASO + '"/><path d="M24 1 21 22"/><path d="M14 12h4M22 32h3"/>'],
    taza: ['0 0 48 48', '<path d="M9 18h24v10a10 10 0 0 1-10 10h-4A10 10 0 0 1 9 28Z"/><path d="M33 21h3a5 5 0 0 1 0 10h-3.5"/><path d="M5 42h34"/><path d="M17 6c-2 3 2 5 0 8M24 5c-2 3 2 5 0 8"/>'],
    plato: ['0 0 48 48', '<ellipse cx="24" cy="28" rx="20" ry="11"/><ellipse cx="24" cy="27" rx="12" ry="6"/><path d="M14 15c3-4 7-6 10-6s7 2 10 6"/><circle cx="19" cy="25" r="1.5"/><circle cx="27" cy="27" r="1.5"/>'],
    huevo: ['0 0 48 48', '<path d="M8 24c0-9 6-14 13-13 4 .5 6-3 11-2 6 1 9 7 8 13s-5 10-11 12-11 3-16 0-5-6-5-10Z"/><circle cx="24" cy="24" r="6"/>'],
    pan: ['0 0 48 48', '<path d="M6 26c0-8 8-14 18-14s18 6 18 14v4a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"/><path d="M15 18l3 6M23 16l2 7M31 18l-2 6"/>'],
    crepe: ['0 0 48 48', '<path d="M6 34 24 8l18 26Z"/><path d="M6 34c6 3 30 3 36 0"/><path d="M15 26c4 1 14 1 18 0M19 19c3 1 7 1 10 0"/>'],
    croissant: ['0 0 48 48', '<path d="M5 30c2-9 9-15 19-15s17 6 19 15c-4 2-8 1-10-2-2 4-6 5-9 5s-7-1-9-5c-2 3-6 4-10 2Z"/><path d="M15 18l4 12M24 16v14M33 18l-4 12"/>'],
    wrap: ['0 0 48 48', '<path d="M10 40 32 6l8 6-22 32Z"/><path d="M32 6c-3 6-1 10 4 10M18 44l-8-4"/><path d="M24 18l6 4M20 25l6 4M16 32l6 4"/>'],
    tarta: ['0 0 48 48', '<path d="M6 32 42 22v14L6 40Z"/><path d="M6 32V40M6 32l14-14 22 4"/><path d="M20 18c0-4 3-6 6-5"/><circle cx="27" cy="12" r="3"/>'],
    tetera: ['0 0 48 48', '<path d="M12 18h22l2 14a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6Z"/><path d="M34 22l8-6-2 10-4 4"/><path d="M12 22 6 20v6l5 4"/><path d="M19 18c0-4 2-6 4-6s4 2 4 6M23 10V8"/>'],
    limonada: ['0 0 48 48', '<path d="M12 10h24l-3 32H15Z"/><path d="M13 20h22"/><circle cx="33" cy="10" r="6"/><path d="M33 4v12M27 10h12"/><path d="M22 14l4-12"/><rect x="18" y="26" width="5" height="5" rx="1"/><rect x="25" y="30" width="5" height="5" rx="1"/>'],
    botella: ['0 0 48 48', '<path d="M20 4h8v8l4 6v24a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V18l4-6Z"/><path d="M16 24h16v10H16Z"/>'],
    menu: ['0 0 24 24', '<path d="M4 8h16M4 16h16"/>'],
    cerrar: ['0 0 24 24', '<path d="M6 6l12 12M18 6 6 18"/>'],
    pin: ['0 0 24 24', '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>'],
    reloj: ['0 0 24 24', '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'],
    telefono: ['0 0 24 24', '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"/>'],
    whatsapp: ['0 0 24 24', '<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19Z"/><path d="M9 9.5c.3 2.2 2.4 4.4 4.8 5l1.2-1.2 1.7.9c-.2 1-1 1.8-2 1.8-3.4 0-7-3.6-7-7 0-1 .8-1.8 1.8-2l.9 1.7Z"/>'],
    instagram: ['0 0 24 24', '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8"/>'],
    flecha: ['0 0 24 24', '<path d="M5 12h14M13 6l6 6-6 6"/>'],
    girar: ['0 0 24 24', '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>'],
    buscar: ['0 0 24 24', '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'],
    hoja: ['0 0 24 24', '<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15Z"/><path d="M5 19 13 11"/>'],
    estrella: ['0 0 24 24', '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>'],
    foto: ['0 0 24 24', '<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/>'],
    corazon: ['0 0 24 24', '<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20Z"/>'],
    pausa: ['0 0 24 24', '<path d="M9 6v12M15 6v12"/>'],
    play: ['0 0 24 24', '<path d="M8 5v14l11-7Z"/>'],
    calendario: ['0 0 24 24', '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>'],
    regalo: ['0 0 24 24', '<rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M3 7h18v3H3ZM12 7v13"/><path d="M12 7C10 3 6 4 7.5 7M12 7c2-4 6-3 4.5 0"/>'],
    compartir: ['0 0 24 24', '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'],
    chat: ['0 0 24 24', '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4Z"/>'],
    alergia: ['0 0 24 24', '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>']
  };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">';
  Object.keys(ICONOS).forEach(function (k) { sprite += '<symbol id="i-' + k + '" viewBox="' + ICONOS[k][0] + '">' + ICONOS[k][1] + '</symbol>'; });
  sprite += '</svg>';
  document.body.insertAdjacentHTML("afterbegin", sprite);

  /* Vaso burbuja relleno por capas (de abajo arriba). Lo usan las tarjetas, el quiz y el loader. */
  var cuentaVasos = 0;
  window.vasoRelleno = function (capas, opciones) {
    opciones = opciones || {};
    var id = "vaso-clip-" + (++cuentaVasos);
    var alto = 43, y = 47, partes = "";
    var total = capas.reduce(function (s, c) { return s + (c[1] || 1); }, 0);
    capas.forEach(function (c) {
      var h = alto * (c[1] || 1) / total;
      y -= h;
      partes += '<rect x="0" y="' + y.toFixed(2) + '" width="40" height="' + (h + 0.6).toFixed(2) + '" fill="' + c[0] + '"/>';
    });
    return '<svg class="vaso-relleno ' + (opciones.clase || "") + '" viewBox="0 0 40 50" aria-hidden="true">' +
      '<defs><clipPath id="' + id + '"><path d="' + VASO + '"/></clipPath></defs>' +
      '<g clip-path="url(#' + id + ')"><g class="liquido">' + partes + '</g>' +
      '<path d="M12 9c-1.5 2-1.5 5 0 7M12 33c-1.5 2-1.5 5 0 7" stroke="#fff" stroke-opacity=".7" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>' +
      (opciones.pajita ? '<path d="M24 1 21 22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' : '') +
      '<path d="' + VASO + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  };
  /* Colores de cada ingrediente (para dibujar las bebidas) */
  window.COLORES_BEBIDA = function (texto) {
    var t = (texto || "").toLowerCase(), capas = [["#F7F3EA", 2]];
    var mapa = [["fresa", "#EBA9B8"], ["pink", "#EBA9B8"], ["plátano", "#F1DE9C"], ["mango", "#F5C26B"], ["arándano", "#A898C8"], ["cereza", "#C9536B"], ["rosa", "#F0C7CC"], ["melocotón", "#F4B88E"], ["piña", "#F3D774"], ["frutos rojos", "#C25A72"], ["caramelo", "#D19A5E"], ["chai", "#C9A07A"], ["vainilla", "#F3E6C4"], ["coco", "#FBF6EC"]];
    mapa.forEach(function (m) { if (t.indexOf(m[0]) > -1 && capas.length < 3) capas.push([m[1], 1.2]); });
    if (t.indexOf("matcha") > -1) capas.push(["#8FA25A", 1.8]);
    else if (t.indexOf("espresso") > -1 || t.indexOf("café") > -1) capas.push(["#8A5A3B", 1.6]);
    if (t.indexOf("espuma") > -1) capas.push([capas.length > 2 ? capas[1][0] : "#FFFDF7", .7]);
    return capas;
  };

  /* ---------- 2. Fecha y hora en Madrid ---------- */
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var DIAS_MAY = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function ahoraMadrid() {
    var p = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var y = +p.year, m = +p.month, d = +p.day;
    var fecha = new Date(Date.UTC(y, m - 1, d));
    return { fecha: fecha, iso: p.year + "-" + p.month + "-" + p.day, dia: fecha.getUTCDay(), min: (+p.hour % 24) * 60 + (+p.minute), mes: m };
  }
  window.ahoraMadrid = ahoraMadrid;
  function aMin(h) { var x = h.split(":"); return +x[0] * 60 + +x[1]; }
  function isoDe(fecha) { return fecha.toISOString().slice(0, 10); }
  function sumarDias(fecha, n) { return new Date(fecha.getTime() + n * 864e5); }
  function enVacaciones(iso) {
    return (L.vacaciones || []).some(function (v) { return iso >= v.desde && iso <= v.hasta; });
  }
  window.enVacaciones = enVacaciones;
  function turnos(dia) { return (L.horario && L.horario[dia]) || []; }
  function abreEseDia(fecha) { return turnos(fecha.getUTCDay()).length > 0 && !enVacaciones(isoDe(fecha)); }
  window.abreEseDia = abreEseDia;
  function textoFecha(fecha) { return DIAS[fecha.getUTCDay()] + " " + fecha.getUTCDate() + " de " + MESES[fecha.getUTCMonth()]; }
  window.textoFecha = textoFecha;
  window.isoDe = isoDe; window.sumarDias = sumarDias;

  function proximaApertura(desde) {
    for (var i = 1; i <= 60; i++) {
      var f = sumarDias(desde, i);
      if (abreEseDia(f)) return { fecha: f, hora: turnos(f.getUTCDay())[0][0], dentro: i };
    }
    return null;
  }

  function estadoActual() {
    var a = ahoraMadrid();
    if (enVacaciones(a.iso)) {
      var vuelta = proximaApertura(a.fecha);
      return { estado: "cerrado", vacaciones: true, html: "<b>Closed</b> · de vacaciones", vuelta: vuelta };
    }
    var ts = turnos(a.dia);
    for (var i = 0; i < ts.length; i++) {
      var ini = aMin(ts[i][0]), fin = aMin(ts[i][1]);
      if (a.min >= ini && a.min < fin) return { estado: "abierto", html: "<b>Open now</b> · cerramos a las " + ts[i][1] };
      if (a.min < ini) return { estado: i === 0 ? "cerrado" : "pausa", html: i === 0 ? "<b>Closed</b> · abrimos hoy a las " + ts[i][0] : "Abrimos a las <b>" + ts[i][0] + "</b>" };
    }
    var p = proximaApertura(a.fecha);
    if (!p) return { estado: "cerrado", html: "<b>Closed</b>" };
    var cuando = p.dentro === 1 ? "mañana" : (p.dentro < 7 ? "el " + DIAS[p.fecha.getUTCDay()] : "el " + textoFecha(p.fecha));
    return { estado: "cerrado", html: "<b>Closed</b> · " + cuando + " desde las " + p.hora };
  }

  function pintarEstado() {
    var e = estadoActual();
    document.querySelectorAll("[data-estado-local]").forEach(function (el) {
      el.setAttribute("data-estado", e.estado);
      el.innerHTML = e.html;
    });
    var banner = document.querySelector(".banner-vacaciones");
    if (banner) {
      if (e.vacaciones && e.vuelta) {
        banner.hidden = false;
        banner.innerHTML = "Estamos de vacaciones 🌿 Volvemos el <b>" + textoFecha(e.vuelta.fecha) + "</b>. Mientras, puedes <a href=\"encargos.html\">encargar ya tus dulces para diciembre</a>.";
      } else banner.hidden = true;
    }
    document.querySelectorAll("[data-wraps-estado]").forEach(function (el) {
      var si = window.wrapsAhora();
      el.textContent = si ? "Disponible ahora" : "De " + L.franjaWraps[0] + " a " + L.franjaWraps[1];
      el.classList.toggle("si", si);
    });
  }
  window.wrapsAhora = function () {
    var a = ahoraMadrid();
    if (enVacaciones(a.iso) || !turnos(a.dia).length || !L.franjaWraps) return false;
    return a.min >= aMin(L.franjaWraps[0]) && a.min < aMin(L.franjaWraps[1]);
  };

  /* ---------- 3. Horario (tabla y resumen) ---------- */
  var ORDEN = [1, 2, 3, 4, 5, 6, 0];
  function textoTurnos(ts) { return ts.length ? ts.map(function (t) { return t[0] + "–" + t[1]; }).join(" y ") : "Cerrado"; }
  function pintarHorario() {
    var hoy = ahoraMadrid().dia;
    document.querySelectorAll("[data-horario]").forEach(function (tabla) {
      var html = "<caption class=\"visually-hidden\">Horario de apertura</caption><tbody>";
      ORDEN.forEach(function (d) {
        var esHoy = d === hoy;
        html += "<tr" + (esHoy ? " class=\"hoy\" aria-current=\"date\"" : "") + "><th scope=\"row\">" + DIAS_MAY[d] + (esHoy ? "<span class=\"hoy-chip\">hoy</span>" : "") + "</th><td>" + textoTurnos(turnos(d)) + "</td></tr>";
      });
      tabla.innerHTML = html + "</tbody>";
    });
    // Resumen agrupando días seguidos con el mismo horario
    var grupos = [];
    ORDEN.forEach(function (d) {
      var t = textoTurnos(turnos(d)), ult = grupos[grupos.length - 1];
      if (ult && ult.t === t) ult.fin = d; else grupos.push({ ini: d, fin: d, t: t });
    });
    var corto = grupos.map(function (g) {
      var dias = g.ini === g.fin ? DIAS_MAY[g.ini] : DIAS_MAY[g.ini] + " a " + DIAS[g.fin];
      return dias + ": " + g.t.toLowerCase().replace("cerrado", "cerrado");
    });
    document.querySelectorAll("[data-horario-corto]").forEach(function (el) { el.innerHTML = corto.join("<br>"); });
  }

  /* ---------- 4. Datos de contacto y nota de Google ---------- */
  function pintarDatos() {
    document.querySelectorAll("[data-resena]").forEach(function (a) { a.href = L.enlaceResena || L.maps; });
    if (L.google) {
      document.querySelectorAll("[data-nota]").forEach(function (el) { el.textContent = String(L.google.nota).replace(".", ","); });
      document.querySelectorAll("[data-resenas]").forEach(function (el) { el.textContent = L.google.resenas; });
      document.querySelectorAll("[data-nota-fecha]").forEach(function (el) { el.textContent = L.google.fecha; });
    }
    document.querySelectorAll("[data-anio]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- 5. Menú móvil ---------- */
  function menuMovil() {
    var menu = document.getElementById("menu-movil"), abrir = document.querySelector(".boton-menu");
    if (!menu || !abrir) return;
    var cerrar = menu.querySelector(".cerrar"), ultimoFoco;
    function abrirMenu() {
      ultimoFoco = document.activeElement;
      menu.classList.add("abierto"); menu.removeAttribute("inert"); menu.setAttribute("aria-hidden", "false");
      abrir.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden";
      setTimeout(function () { cerrar.focus(); }, 50);
    }
    function cerrarMenu() {
      menu.classList.remove("abierto"); menu.setAttribute("inert", ""); menu.setAttribute("aria-hidden", "true");
      abrir.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
      if (ultimoFoco) ultimoFoco.focus();
    }
    abrir.addEventListener("click", abrirMenu);
    cerrar.addEventListener("click", cerrarMenu);
    menu.addEventListener("keydown", function (e) {
      if (e.key === "Escape") cerrarMenu();
      if (e.key === "Tab") { // mantener el foco dentro
        var f = menu.querySelectorAll("a, button"), pri = f[0], ult = f[f.length - 1];
        if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
        else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
      }
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { document.body.style.overflow = ""; }); });
  }

  /* ---------- 6. Aparición al hacer scroll ---------- */
  function revelar() {
    var els = document.querySelectorAll(".revelar");
    if (reducido || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("visible"); }); return; }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- 7. Parallax suave (solo escritorio) ---------- */
  function parallax() {
    var img = document.querySelector("[data-parallax]");
    if (!img || reducido || !window.matchMedia("(min-width: 861px)").matches) return;
    var pendiente = false;
    window.addEventListener("scroll", function () {
      if (pendiente) return; pendiente = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        img.style.transform = "translateY(" + (-y * 0.08) + "px)";
        pendiente = false;
      });
    }, { passive: true });
  }

  /* ---------- 8. Hojas / copos / pétalos según la temporada ---------- */
  var FORMAS = {
    arce: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l1.6 3.6 2.6-1.2-.6 3.4 3.4-1-1 3 3 1.2-3.2 2.2.8 1.6-4-.6-.8 3.6h-.6V22h-1.4v-4.2l-.8-3.6-4 .6.8-1.6L2 11l3-1.2-1-3 3.4 1-.6-3.4 2.6 1.2Z"/></svg>',
    copo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/></svg>',
    estrella: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l2 7.5L22 12l-8 2.5L12 22l-2-7.5L2 12l8-2.5Z"/></svg>',
    petalo: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c4 3 6 7 4 12-1 3-3 5-4 6-1-1-3-3-4-6-2-5 0-9 4-12Z"/></svg>',
    hoja: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 20C4 10 10 4 21 3c0 11-6 17-17 17Z"/></svg>',
    hielo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="5" width="14" height="14" rx="3" transform="rotate(12 12 12)"/></svg>'
  };
  function temporada() {
    if (reducido) return;
    var mes = ahoraMadrid().mes, formas, colores;
    if (mes >= 9 && mes <= 11) { formas = ["arce", "arce", "hoja"]; colores = ["#D98B3A", "#C9A14A", "#B4533A", "#E0A458"]; }
    else if (mes === 12 || mes <= 2) { formas = ["copo", "estrella", "copo"]; colores = ["#B8975A", "#C8CEB3", "#D7C08E"]; }
    else if (mes <= 5) { formas = ["petalo"]; colores = ["#F0A6BA", "#F6C3D0", "#E58AA5"]; }
    else { formas = ["hoja", "hielo"]; colores = ["#94A07B", "#8FA25A", "#A9C7CE"]; }
    var capa = document.createElement("div");
    capa.className = "temporada"; capa.setAttribute("aria-hidden", "true");
    var n = window.innerWidth < 700 ? 6 : 10, html = "";
    for (var i = 0; i < n; i++) {
      var s = "left:" + (Math.random() * 96).toFixed(1) + "%;color:" + colores[i % colores.length] +
        ";--dur:" + (13 + Math.random() * 12).toFixed(1) + "s;--delay:" + (-Math.random() * 20).toFixed(1) +
        "s;--tam:" + (14 + Math.random() * 14).toFixed(0) + "px;--deriva:" + (Math.random() * 160 - 80).toFixed(0) +
        "px;--giro:" + (Math.random() * 540 - 270).toFixed(0) + "deg;--bal:" + (3 + Math.random() * 3).toFixed(1) + "s";
      html += '<span style="' + s + '">' + FORMAS[formas[i % formas.length]] + "</span>";
    }
    capa.innerHTML = html;
    document.body.appendChild(capa);

    var boton = document.createElement("button");
    boton.className = "boton-temporada"; boton.type = "button";
    var pausada = false;
    try { pausada = localStorage.getItem("11n-temporada") === "pausa"; } catch (e) {}
    function actualizar() {
      capa.classList.toggle("pausada", pausada);
      boton.setAttribute("aria-pressed", pausada ? "true" : "false");
      boton.setAttribute("aria-label", pausada ? "Reanudar animación de temporada" : "Pausar animación de temporada");
      boton.innerHTML = '<svg class="i" aria-hidden="true"><use href="#i-' + (pausada ? "play" : "pausa") + '"/></svg>';
    }
    boton.addEventListener("click", function () {
      pausada = !pausada; actualizar();
      try { localStorage.setItem("11n-temporada", pausada ? "pausa" : "on"); } catch (e) {}
    });
    actualizar();
    document.body.appendChild(boton);
  }

  /* ---------- 9. Loader (solo la primera vez en la sesión, < 1 s) ---------- */
  function loader() {
    var l = document.querySelector(".loader");
    if (!l) return;
    var caja = l.querySelector("[data-vaso-loader]");
    if (caja) caja.innerHTML = window.vasoRelleno([["#F7F3EA", 1.4], ["#8FA25A", 2]], { clase: "", pajita: true });
    setTimeout(function () { l.classList.add("fuera"); }, 850);
    try { sessionStorage.setItem("11n-visto", "1"); } catch (e) {}
  }

  /* ---------- 10. Mapa: solo se carga si se pulsa (sin cookies de Google hasta entonces) ---------- */
  function mapa() {
    document.querySelectorAll("[data-cargar-mapa]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var caja = btn.closest(".mapa");
        var q = encodeURIComponent("11N Brasserie, " + L.direccion + ", " + L.cp + " " + L.ciudad);
        caja.innerHTML = '<iframe title="Mapa de Google con la ubicación de 11N Brasserie" src="https://www.google.com/maps?q=' + q + '&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
      });
    });
  }

  /* ---------- Arranque ---------- */
  pintarDatos();
  pintarHorario();
  pintarEstado();
  setInterval(pintarEstado, 60000);
  menuMovil();
  revelar();
  parallax();
  mapa();
  loader();
  temporada();
  document.querySelectorAll("[data-vaso]").forEach(function (el) {
    el.innerHTML = window.vasoRelleno(window.COLORES_BEBIDA(el.getAttribute("data-vaso")), { pajita: el.hasAttribute("data-pajita") });
  });
})();
