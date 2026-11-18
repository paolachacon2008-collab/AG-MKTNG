/* =========================================================
   11N Brasserie · quiz "Elige tu matcha" y "Elige tu café"
   Las recomendaciones salen SOLO de bebidas reales de data/menu.js.
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var caja = document.querySelector("[data-quiz]");
  if (!caja || !window.MENU) return;
  var L = window.LOCAL || {};
  var platos = window.MENU.platos;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function precio(p) { return typeof p === "number" ? p.toFixed(2).replace(".", ",") + " €" : p; }
  function tiene(p, palabras) { var t = (p.nombre + " " + (p.desc || "")).toLowerCase(); return palabras.some(function (w) { return t.indexOf(w) > -1; }); }

  /* ---------- Preguntas ---------- */
  var QUIZ = {
    matcha: {
      preguntas: [
        { id: "temp", texto: "¿Frío o caliente?", opciones: [["frio", "🧊", "Iced, siempre"], ["caliente", "☕", "Calentito, por favor"]] },
        { id: "sabor", texto: "¿Qué te apetece?", opciones: [["clasico", "🍵", "Algo clásico", "Matcha y poco más"], ["postre", "🍰", "Algo dulce", "Tipo postre"], ["fruta", "🍓", "Algo afrutado", "Fresco y con fruta"]] },
        { id: "leche", texto: "¿Con qué leche?", opciones: [["normal", "🥛", "Leche normal"], ["avena", "🌾", "Avena"], ["soja", "🫘", "Soja"], ["coco", "🥥", "Coco"], ["almendra", "🌰", "Almendra"]] },
        { id: "mood", texto: "¿Qué mood tienes hoy?", opciones: [["energia", "☀️", "Energía"], ["capricho", "🌸", "Capricho"], ["cozy", "🍂", "Cozy"]] }
      ],
      candidatos: function (r) { return platos.filter(function (p) { return p.cat === "matcha" && (r.temp === "frio" ? p.frio : p.caliente); }); },
      puntuar: function (p, r) {
        var s = 0;
        if (r.sabor === "clasico" && p.grupo === "Classic") s += 3;
        if (r.sabor === "postre" && tiene(p, ["caramelo", "plátano", "vainilla", "chai"])) s += 3;
        if (r.sabor === "fruta" && (p.grupo === "Fruity" || tiene(p, ["fresa", "arándano", "rosa", "cereza"]))) s += 3;
        if (r.leche === "avena" && tiene(p, ["avena"])) s += 2;
        if (r.leche === "coco" && tiene(p, ["coco"])) s += 2;
        if (r.leche === "soja" && tiene(p, ["soja"])) s += 2;
        if (r.mood === "energia" && (p.grupo === "Classic" || p.grupo === "Fruity") && !tiene(p, ["caramelo", "espuma"])) s += 1.5;
        if (r.mood === "capricho" && (p.grupo === "Signature" || tiene(p, ["caramelo"]))) s += 1.5;
        if (r.mood === "cozy" && tiene(p, ["chai", "caramelo", "plátano", "vainilla"])) s += 1.5;
        if (p.best) s += 0.5;
        return s;
      },
      frases: {
        "Matcha Latte Clásico": "Eres un Matcha Latte Clásico: sin artificios, auténtico y siempre buena idea 🍵",
        "Matcha Latte de Vainilla": "Eres un Matcha Latte de Vainilla: suave, dulce en su justa medida y muy de domingo 🤍",
        "Iced Matcha Avena & Vainilla": "Eres un Iced Matcha Avena & Vainilla: fresco, cremoso y el favorito de la casa ✨",
        "Chai Matcha Latte": "Eres un Chai Matcha Latte: especiado, cálido y con mucho carácter 🍂",
        "Matcha Latte de Caramelo Salado": "Eres un Matcha de Caramelo Salado: dulce con un punto salado. Un capricho con todas las letras 🍯",
        "Pink Matcha": "Eres un Pink Matcha: dulce, intenso y muy fotogénico 💗",
        "Rose Matcha": "Eres un Rose Matcha: delicado, floral y un poco romántico 🌹",
        "Matcha de Plátano": "Eres un Banana Bread Matcha: comfort food en vaso. Puro abrazo 🍌",
        "Matcha Arándanos": "Eres un Blueberry Matcha: diferente, morado y con mucha personalidad 💜",
        "Matcha Coco & Mango": "Eres un Coco & Mango Matcha: vacaciones en un vaso, aunque sea martes 🥭",
        "Piña Colada Matcha": "Eres un Piña Colada Matcha: tropical, alegre y sin complicaciones 🍍",
        "Matcha Melocotón": "Eres un Matcha Melocotón: suave, afrutado y con avena. Dulzura natural 🍑",
        "Matcha Frutos Rojos": "Eres un Matcha Frutos Rojos: fresco, ácido y lleno de color 🍓",
        "Matcha Cherry": "Eres un Matcha Cherry: atrevido, rojo y con espuma de cereza. Main character 🍒"
      }
    },
    cafe: {
      preguntas: [
        { id: "temp", texto: "¿Frío o caliente?", opciones: [["frio", "🧊", "Iced coffee"], ["caliente", "☕", "Caliente"]] },
        { id: "estilo", texto: "¿Cómo te gusta el café?", opciones: [["intenso", "⚡", "Intenso", "Que se note el café"], ["suave", "🥛", "Suave", "Con su leche"], ["dulce", "🍫", "Dulce", "Tipo postre"]] },
        { id: "mood", texto: "¿Qué mood tienes hoy?", opciones: [["energia", "☀️", "Energía"], ["capricho", "🌸", "Capricho"], ["cozy", "🍂", "Cozy"]] }
      ],
      candidatos: function (r) {
        return platos.filter(function (p) {
          if (r.temp === "frio") return p.cat === "frios";
          return p.cat === "cafes" && tiene(p, ["espresso", "americano", "café", "capuccino", "latte", "flat", "cortado", "manchado", "macchiato"]) && !tiene(p, ["chai"]);
        });
      },
      puntuar: function (p, r) {
        var s = 0, n = p.nombre.toLowerCase();
        var intenso = ["espresso", "americano", "cortado", "macchiato", "flat white", "latte español"];
        var dulce = ["caramelo", "pumpkin", "bombón", "frappuccino", "dubai", "tiramisú", "cinnamon", "lotus", "bounty", "arándanos", "affogato", "vainilla"];
        var esIntenso = intenso.some(function (w) { return n.indexOf(w) > -1; });
        var esDulce = dulce.some(function (w) { return n.indexOf(w) > -1; });
        if (r.estilo === "intenso" && esIntenso) s += 3;
        if (r.estilo === "suave" && !esIntenso && !esDulce) s += 3;
        if (r.estilo === "suave" && n.indexOf("vainilla") > -1) s += 2;
        if (r.estilo === "dulce" && esDulce) s += 3;
        if (r.mood === "energia" && (esIntenso || n.indexOf("americano") > -1)) s += 1.5;
        if (r.mood === "capricho" && /dubai|tiramisú|lotus|bounty|frappuccino|bombón/.test(n)) s += 1.5;
        if (r.mood === "cozy" && /pumpkin|cinnamon|caramelo|café con leche|capuccino|latte$/.test(n)) s += 1.5;
        return s;
      },
      fraseTipo: function (p) {
        var n = p.nombre;
        if (/espresso|cortado|americano|macchiato/i.test(n)) return "Eres un " + n + ": directo, intenso y sin rodeos ⚡";
        if (/pumpkin/i.test(n)) return "Eres un " + n + ": otoño en un vaso. Muy cozy 🍂";
        if (/dubai|tiramisú|lotus|bounty|frappuccino|affogato|bombón/i.test(n)) return "Eres un " + n + ": esto ya es postre, y lo sabes 🍫";
        return "Eres un " + n + ": equilibrado, cremoso y siempre apetece ☕";
      }
    }
  };

  var tipo = "matcha", paso = 0, resp = {};
  var params = new URLSearchParams(location.search);
  if (params.get("temp") === "frio" || params.get("temp") === "caliente") { resp.temp = params.get("temp"); paso = 1; }

  function pintar() {
    var q = QUIZ[tipo], total = q.preguntas.length;
    if (paso >= total) return resultado();
    var pr = q.preguntas[paso];
    caja.innerHTML =
      '<div class="quiz-progreso" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + paso + '" aria-label="Progreso del quiz"><span style="width:' + ((paso) / total * 100) + '%"></span></div>' +
      '<div class="quiz-paso">' +
        '<p class="quiz-paso-num">Pregunta ' + (paso + 1) + " de " + total + "</p>" +
        '<h3 class="quiz-pregunta" tabindex="-1">' + esc(pr.texto) + "</h3>" +
        '<div class="quiz-opciones">' + pr.opciones.map(function (o) {
          return '<button type="button" class="quiz-opcion" aria-pressed="' + (resp[pr.id] === o[0]) + '" data-valor="' + o[0] + '"><span class="emoji" aria-hidden="true">' + o[1] + "</span><span>" + esc(o[2]) + (o[3] ? "<small>" + esc(o[3]) + "</small>" : "") + "</span></button>";
        }).join("") + "</div>" +
        '<div class="quiz-nav"><button type="button" class="quiz-atras"' + (paso === 0 ? " disabled" : "") + ">← Atrás</button></div>" +
      "</div>";
    requestAnimationFrame(function () { caja.querySelector(".quiz-progreso span").style.width = ((paso + 1) / total * 100) + "%"; });
    caja.querySelectorAll(".quiz-opcion").forEach(function (b) {
      b.addEventListener("click", function () { resp[pr.id] = b.getAttribute("data-valor"); paso++; pintar(); enfocar(); });
    });
    caja.querySelector(".quiz-atras").addEventListener("click", function () { paso = Math.max(0, paso - 1); pintar(); enfocar(); });
  }
  function enfocar() { var h = caja.querySelector(".quiz-pregunta, .nombre"); if (h) h.focus({ preventScroll: true }); }

  function resultado() {
    var q = QUIZ[tipo];
    var lista = q.candidatos(resp).map(function (p, i) { return { p: p, s: q.puntuar(p, resp), i: i }; });
    lista.sort(function (a, b) { return b.s - a.s || a.i - b.i; });
    var g = lista[0].p;
    var frase = tipo === "matcha" ? (q.frases[g.nombre] || "Eres un " + g.nombre + " 🍵") : q.fraseTipo(g);
    var consejo = "";
    if (tipo === "matcha" && ["avena", "soja", "coco", "almendra"].indexOf(resp.leche) > -1 && !tiene(g, [resp.leche])) consejo = "Pídelo con leche de " + resp.leche + " 🌱";
    if (tipo === "matcha" && resp.leche === "normal" && tiene(g, ["avena", "soja", "coco"])) consejo = "Lleva leche vegetal de serie, pero puedes pedirlo con leche normal.";
    var colores = window.COLORES_BEBIDA ? window.COLORES_BEBIDA(g.nombre + " " + (g.desc || "")) : [];
    var segunda = lista[1] ? lista[1].p : null;
    caja.innerHTML =
      '<div class="quiz-resultado">' +
        '<p class="quiz-paso-num">Tu resultado</p>' +
        '<div class="ilus">' + (window.vasoRelleno ? window.vasoRelleno(colores, { pajita: resp.temp === "frio" }) : "") + "</div>" +
        '<h3 class="nombre" tabindex="-1">' + esc(g.nombre) + "</h3>" +
        '<p class="precio">' + precio(g.precio) + "</p>" +
        '<p class="frase">' + esc(frase) + "</p>" +
        '<p class="ingredientes">' + esc(g.desc || "") + (consejo ? "<br><strong>" + esc(consejo) + "</strong>" : "") + "</p>" +
        (segunda ? '<p class="ingredientes" style="margin-top:6px">Plan B: <strong>' + esc(segunda.nombre) + "</strong></p>" : "") +
        '<div class="botones">' +
          '<a class="btn" href="' + esc(L.maps || "#") + '" rel="noopener"><svg class="i" aria-hidden="true"><use href="#i-pin"/></svg>Cómo llegar</a>' +
          '<button class="btn btn-borde" type="button" data-compartir><svg class="i" aria-hidden="true"><use href="#i-compartir"/></svg>Compartir</button>' +
        "</div>" +
        '<p class="aviso-copiado" role="status" data-aviso></p>' +
        '<button class="quiz-atras otra" type="button" data-repetir>↺ Repetir el quiz</button>' +
      "</div>";
    caja.querySelector("[data-repetir]").addEventListener("click", function () { paso = 0; resp = {}; pintar(); enfocar(); });
    caja.querySelector("[data-compartir]").addEventListener("click", function () {
      var url = location.origin + location.pathname + "#quiz";
      var texto = "Me ha salido " + g.nombre + " en el quiz de 11N Brasserie 🍵 ¿Y a ti?";
      var aviso = caja.querySelector("[data-aviso]");
      if (navigator.share) { navigator.share({ title: "11N Brasserie", text: texto, url: url }).catch(function () {}); return; }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(texto + " " + url).then(function () { aviso.textContent = "Enlace copiado. ¡Pégalo donde quieras!"; }, function () { aviso.textContent = url; });
      } else aviso.textContent = url;
    });
  }

  document.querySelectorAll("[data-quiz-tipo]").forEach(function (b) {
    b.addEventListener("click", function () {
      tipo = b.getAttribute("data-quiz-tipo"); paso = 0; resp = {};
      document.querySelectorAll("[data-quiz-tipo]").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      pintar();
    });
  });
  pintar();
});
