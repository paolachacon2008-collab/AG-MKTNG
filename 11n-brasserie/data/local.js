/* =========================================================
   DATOS DEL LOCAL · 11N Brasserie
   Aquí se cambia el horario, las vacaciones, el contacto y la
   nota de Google. Todo lo demás de la web lee de este archivo.
   ========================================================= */
window.LOCAL = {
  nombre: "11N Brasserie",
  direccion: "Avenida del Dr. Manuel Domínguez 12",
  barrio: "Teatinos-Universidad",
  cp: "29010",
  ciudad: "Málaga",
  telefonoVisible: "687 02 39 06",
  telefono: "+34687023906",
  whatsapp: "34687023906",
  instagram: "https://www.instagram.com/11nbrasserie/",
  instagramUsuario: "@11nbrasserie",
  maps: "https://maps.app.goo.gl/bmeKR61CEHYkmaSj7",
  // [COMPLETAR] Enlace directo para dejar reseña (Perfil de Empresa de Google → "Pedir reseñas").
  // Mientras esté vacío, el botón lleva a la ficha de Google Maps.
  enlaceResena: "",

  // ⚠️ ACTUALIZAR de vez en cuando con lo que diga Google Maps.
  // Dato tomado de la ficha de Google en noviembre de 2026. [VERIFICAR]
  google: { nota: 4.4, resenas: 135, fecha: "noviembre de 2026" },

  // Horario. 0 = domingo, 1 = lunes ... 6 = sábado. [] = cerrado.
  horario: {
    0: [["10:00", "13:30"], ["17:00", "20:30"]],
    1: [],
    2: [["10:00", "13:30"], ["17:00", "20:30"]],
    3: [["10:00", "13:30"], ["17:00", "20:30"]],
    4: [["10:00", "13:30"], ["17:00", "20:30"]],
    5: [["10:00", "13:30"], ["17:00", "20:30"]],
    6: [["10:00", "13:30"], ["17:00", "20:30"]]
  },
  // Wraps y sándwiches solo en esta franja
  franjaWraps: ["12:00", "13:30"],

  // Vacaciones (ambos días incluidos, formato AAAA-MM-DD).
  // [VERIFICAR] si el 8 de diciembre siguen cerrados o ya abren.
  vacaciones: [
    { desde: "2026-11-17", hasta: "2026-12-08" }
  ]
};
