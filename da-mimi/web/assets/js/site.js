/* Da Mimì — JavaScript mínimo. Todo funciona sin él salvo el estado
   «Abierto/Cerrado», el visor de la galería y la carga del mapa. */
(function () {
  "use strict";

  /* ---------- Menú móvil ---------- */
  var boton = document.querySelector(".cab__menu");
  var menu = document.getElementById("menu-movil");
  if (boton && menu) {
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      menu.hidden = abierto;
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !menu.hidden) {
        menu.hidden = true;
        boton.setAttribute("aria-expanded", "false");
        boton.focus();
      }
    });
  }

  /* ---------- Abierto ahora / Cerrado (hora de Madrid) ---------- */
  var datos = document.getElementById("horario-datos");
  var horario = null;
  try { horario = datos ? JSON.parse(datos.textContent) : null; } catch (e) { horario = null; }

  function aMin(h) { var p = h.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function tramos(dia) {
    return (horario[String(dia)] || []).map(function (t) {
      var a = aMin(t[0]), c = aMin(t[1]);
      if (c <= a) c += 1440; // cierra pasada la medianoche
      return { a: a, c: c, ta: t[0], tc: t[1] };
    });
  }
  function ahoraMadrid() {
    var partes = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var o = {};
    partes.forEach(function (p) { o[p.type] = p.value; });
    var dias = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
    return { dia: dias[o.weekday], min: (+o.hour % 24) * 60 + (+o.minute) };
  }
  function estado() {
    var n = ahoraMadrid();
    var ayer = (n.dia + 6) % 7;
    var t, i;
    var hoy = tramos(n.dia);
    for (i = 0; i < hoy.length; i++) {
      t = hoy[i];
      if (n.min >= t.a && n.min < t.c) return { abierto: true, txt: "Abierto ahora · cierra a las " + t.tc, dia: n.dia };
    }
    var prev = tramos(ayer);
    for (i = 0; i < prev.length; i++) {
      t = prev[i];
      if (t.c > 1440 && n.min + 1440 < t.c) return { abierto: true, txt: "Abierto ahora · cierra a las " + t.tc, dia: n.dia };
    }
    for (i = 0; i < hoy.length; i++) {
      if (hoy[i].a > n.min) return { abierto: false, txt: "Cerrado ahora · abre hoy a las " + hoy[i].ta, dia: n.dia };
    }
    for (var k = 1; k <= 7; k++) {
      var d = (n.dia + k) % 7, tr = tramos(d);
      if (tr.length) {
        var nombres = ["el lunes", "el martes", "el miércoles", "el jueves", "el viernes", "el sábado", "el domingo"];
        return { abierto: false, txt: "Cerrado ahora · abre " + (k === 1 ? "mañana" : nombres[d]) + " a las " + tr[0].ta, dia: n.dia };
      }
    }
    return null;
  }
  function pintarEstado() {
    if (!horario || !window.Intl) return;
    var s = estado();
    if (!s) return;
    document.querySelectorAll("[data-estado]").forEach(function (el) {
      el.querySelector(".estado__txt").textContent = s.txt;
      el.classList.toggle("is-abierto", s.abierto);
      el.classList.toggle("is-cerrado", !s.abierto);
      el.hidden = false;
    });
    document.querySelectorAll(".horario tr[data-dias]").forEach(function (tr) {
      var dias = tr.getAttribute("data-dias").split(",").map(Number);
      tr.classList.toggle("is-hoy", dias.indexOf(s.dia) !== -1);
    });
  }
  pintarEstado();
  setInterval(pintarEstado, 60000);

  /* ---------- Chips de la carta: marcar la sección visible ---------- */
  var chips = document.querySelectorAll(".chips a");
  if (chips.length && "IntersectionObserver" in window) {
    var porId = {};
    chips.forEach(function (a) { porId[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting && porId[en.target.id]) {
          chips.forEach(function (a) { a.classList.remove("is-activo"); });
          var a = porId[en.target.id];
          a.classList.add("is-activo");
          var ul = a.closest("ul");
          if (ul) ul.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(porId).forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
  }

  /* ---------- Visor de la galería (<dialog>) ---------- */
  var visor = document.querySelector(".visor");
  var fotos = Array.prototype.slice.call(document.querySelectorAll(".gal__btn"));
  if (visor && fotos.length && typeof visor.showModal === "function") {
    var img = visor.querySelector("img");
    var src = visor.querySelector("source");
    var pie = visor.querySelector(".visor__pie");
    var num = visor.querySelector(".visor__num");
    var actual = 0, origen = null;

    function mostrar(i) {
      actual = (i + fotos.length) % fotos.length;
      var b = fotos[actual];
      src.srcset = b.getAttribute("data-grande-webp");
      img.src = b.getAttribute("data-grande");
      img.alt = b.querySelector("img").alt;
      pie.textContent = b.getAttribute("data-pie");
      num.textContent = (actual + 1) + " de " + fotos.length;
    }
    fotos.forEach(function (b, i) {
      b.addEventListener("click", function () {
        origen = b;
        mostrar(i);
        visor.showModal();
      });
    });
    visor.addEventListener("click", function (ev) {
      var acc = ev.target.closest("[data-visor]");
      if (acc) {
        var a = acc.getAttribute("data-visor");
        if (a === "ant") mostrar(actual - 1);
        if (a === "sig") mostrar(actual + 1);
        if (a === "cerrar") visor.close();
      } else if (ev.target === visor) {
        visor.close();
      }
    });
    visor.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft") mostrar(actual - 1);
      if (ev.key === "ArrowRight") mostrar(actual + 1);
    });
    visor.addEventListener("close", function () { if (origen) origen.focus(); });
  }

  /* ---------- Mapa de Google: solo se carga al pulsar ---------- */
  document.querySelectorAll("[data-mapa]").forEach(function (caja) {
    var btn = caja.querySelector("[data-mapa-cargar]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = caja.getAttribute("data-mapa");
      f.title = "Mapa de Google con la ubicación de Da Mimì";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      caja.innerHTML = "";
      caja.appendChild(f);
    });
  });
})();
