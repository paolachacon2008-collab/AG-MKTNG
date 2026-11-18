/* =========================================================
   11N Brasserie · formulario de encargos → WhatsApp
   Los datos NO se envían a ningún servidor: solo se prepara el
   mensaje y se abre WhatsApp.
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var form = document.querySelector("[data-encargo]");
  if (!form) return;
  var L = window.LOCAL || {};
  // Antelación mínima en días. [COMPLETAR con el local] (1 = desde mañana)
  var ANTELACION_DIAS = 1;

  var f = form.elements;
  var fecha = f.fecha, caja = form.querySelector("[data-vista-previa]"), previa = form.querySelector("[data-texto-previa]");
  var enviar = form.querySelector("[data-enviar-wa]"), final = form.querySelector("[data-mensaje-final]");

  var hoy = window.ahoraMadrid ? window.ahoraMadrid().fecha : new Date();
  var minimo = window.sumarDias ? window.sumarDias(hoy, ANTELACION_DIAS) : hoy;
  fecha.min = minimo.toISOString().slice(0, 10);
  var max = new Date(hoy.getTime() + 180 * 864e5);
  fecha.max = max.toISOString().slice(0, 10);

  function error(campo, msg) {
    var el = document.getElementById("e-" + campo.name);
    campo.setAttribute("aria-invalid", msg ? "true" : "false");
    if (el) { el.textContent = msg || ""; campo.setAttribute("aria-describedby", (campo.id === "f-fecha" ? "a-fecha " : "") + el.id); }
    return !msg;
  }
  function validarFecha() {
    var v = fecha.value;
    if (!v) return error(fecha, "Elige una fecha de recogida.");
    var d = new Date(v + "T00:00:00Z");
    if (v < fecha.min) return error(fecha, "Elige una fecha a partir del " + window.textoFecha(minimo) + ".");
    if (v > fecha.max) return error(fecha, "Para fechas tan lejanas, escríbenos directamente por WhatsApp.");
    if (window.enVacaciones && window.enVacaciones(v)) return error(fecha, "Ese día estamos de vacaciones 🌿 Elige otra fecha.");
    if (window.abreEseDia && !window.abreEseDia(d)) return error(fecha, "Ese día cerramos (los lunes no abrimos). Elige otra fecha.");
    return error(fecha, "");
  }
  fecha.addEventListener("change", validarFecha);

  function validar() {
    var ok = true;
    ok = error(f.nombre, f.nombre.value.trim() ? "" : "Escribe tu nombre.") && ok;
    var tel = f.telefono.value.replace(/[^\d+]/g, "");
    ok = error(f.telefono, tel.replace(/\D/g, "").length >= 9 ? "" : "Escribe un teléfono válido (9 cifras como mínimo).") && ok;
    ok = validarFecha() && ok;
    ok = error(f.pedido, f.pedido.value.trim() ? "" : "Cuéntanos qué te gustaría.") && ok;
    ok = error(f.privacidad, f.privacidad.checked ? "" : "Necesitamos tu permiso para gestionar el encargo.") && ok;
    if (!ok) { var primero = form.querySelector('[aria-invalid="true"]'); if (primero) primero.focus(); }
    return ok;
  }

  function mensaje() {
    var d = new Date(f.fecha.value + "T00:00:00Z");
    var franja = form.querySelector('input[name="franja"]:checked').value;
    var lineas = [
      "¡Hola 11N! 🌿 Quiero hacer un encargo:",
      "• Nombre: " + f.nombre.value.trim(),
      "• Teléfono: " + f.telefono.value.trim(),
      "• Evento: " + f.evento.value,
      "• Fecha de recogida: " + window.textoFecha(d) + " (" + franja + ")",
      "• Personas: " + (f.personas.value || "sin especificar"),
      "• Pedido: " + f.pedido.value.trim().replace(/\s+/g, " "),
      "• Alergias: " + (f.alergias.value.trim().replace(/\s+/g, " ") || "ninguna")
    ];
    return lineas.join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validar()) return;
    var texto = mensaje();
    previa.textContent = texto;
    enviar.href = "https://wa.me/" + (L.whatsapp || "34687023906") + "?text=" + encodeURIComponent(texto);
    caja.hidden = false; final.hidden = true;
    caja.scrollIntoView({ behavior: "smooth", block: "nearest" });
    enviar.focus({ preventScroll: true });
  });
  enviar.addEventListener("click", function () {
    enviar.target = "_blank";
    setTimeout(function () { final.hidden = false; }, 400);
  });
  form.querySelector("[data-editar]").addEventListener("click", function () { caja.hidden = true; f.nombre.focus(); });
});
