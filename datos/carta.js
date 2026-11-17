/* =====================================================================
   CARTA DE TABERNA LA NEW
   ---------------------------------------------------------------------
   Para cambiar un precio: cambia solo el número entre comillas.
     Ejemplo:  precios: ["12,9"]   →   precios: ["13,5"]
   Si un plato tiene dos precios (como en la carta física), van los dos:
     precios: ["3,9", "7,9"]
   Para añadir un plato: copia una línea entera { ... }, pégala debajo
   y cambia el nombre y el precio. No olvides la coma al final.
   vegetariano: true  → sale la hojita verde.
   alergenos: []      → déjalo vacío hasta que el local dé la información.
       Valores posibles: "gluten", "crustaceos", "huevos", "pescado",
       "cacahuetes", "soja", "lacteos", "frutos-cascara", "apio",
       "mostaza", "sesamo", "sulfitos", "altramuces", "moluscos"
   estrella: 1, 2, 3… → aparece también en "Platos estrella", en ese orden.
       Los que tienen foto salen grandes; los que no, en la franja "También".
   verificar: "..."   → sale marcado en amarillo (dato pendiente).
   ===================================================================== */

window.CARTA = {
  secciones: [
    {
      id: "empezar",
      titulo: "Por algo hay que empezar…",
      platos: [
        { nombre: "Nuestra Gilda del Norte", precios: ["3,5"], alergenos: [] },
        { nombre: "Pincho de langostinos con albahaca", precios: ["3,5"], alergenos: [] },
        { nombre: "Ensaladilla rusa La New", precios: ["3,9", "7,9"], alergenos: [] },
        { nombre: "Mini hamburguesa con cheddar, bacon y mayonesa trufada", precios: ["4,9"], alergenos: [] },
        { nombre: "Mini mollete de lomo y alioli", precios: ["3,7"], alergenos: [] },
        { nombre: "Lomo de orza", precios: ["4,5", "8,5"], alergenos: [] },
        { nombre: "Tosta de salmón, aguacate, queso y rúcula", precios: ["7,5"], alergenos: [] }
      ]
    },
    {
      id: "papelones",
      titulo: "Nuestros papelones",
      platos: [
        { nombre: "Chicharrón de Cádiz con toque de lima", precios: ["9"], alergenos: [] },
        { nombre: "Lomo embuchado ibérico", precios: ["8"], alergenos: [] },
        { nombre: "Salchichón ibérico", precios: ["7"], alergenos: [] },
        { nombre: "Chorizo ibérico", precios: ["7"], alergenos: [] },
        { nombre: "Tabla de quesos", precios: ["15"], alergenos: [] },
        { nombre: "Surtido de ibéricos", precios: ["15"], alergenos: [] }
      ]
    },
    {
      id: "compartir",
      titulo: "Amar es compartir",
      platos: [
        { nombre: "Croquetas caseras (6 uds)", precios: ["10,5"], alergenos: [] },
        { nombre: "Flamenquín La New", precios: ["14,9"], alergenos: [], estrella: 7 },
        { nombre: "Fideos tostados con emulsión de pimientos del piquillo y alioli de albahaca", precios: ["9,8"], alergenos: [], estrella: 5,
          nombreCorto: "Fideos tostados",
          foto: "fideos-tostados", fotoAnchos: [480, 800, 1200], fotoAlt: "Fideos tostados cubiertos de emulsión de piquillo y alioli de albahaca en un plato de cerámica a rayas",
          credito: "Foto: Carolina R. (Google Maps)" },
        { nombre: "Tabla de filetitos aliñados a la andaluza", precios: ["12,9"], alergenos: [] },
        { nombre: "Tabla campera de pollo", precios: ["12,9"], alergenos: [] },
        { nombre: "Brioche relleno de meloso ibérico, hierbas frescas y mayonesa cítrica", precios: ["8,5"], alergenos: [] },
        { nombre: "Lagrimitas de pollo", precios: ["9,8"], alergenos: [] },
        { nombre: "Bravas La New", precios: ["8"], alergenos: [] }
      ]
    },
    {
      id: "casa",
      titulo: "Como en casa…",
      platos: [
        { nombre: "Carrillada guisada en su jugo", precios: ["5,5", "10,2"], alergenos: [] },
        { nombre: "Codillo guisado en su jugo con parmentier ibérico", precios: ["18"], alergenos: [] },
        { nombre: "Cachopo de ternera con queso fundente", precios: ["16,5"], alergenos: [] },
        { nombre: "Guiso del día", precios: ["8,9"], alergenos: [] }
      ]
    },
    {
      id: "revueltos",
      titulo: "Revueltos…",
      platos: [
        { nombre: "Huevos rotos trufados con paleta ibérica", precios: ["12,9"], alergenos: [], estrella: 1,
          foto: "huevos-rotos", fotoAnchos: [480, 800, 1200], fotoAlt: "Huevos rotos con paleta ibérica mientras se vierte la salsa trufada con una cuchara" },
        { nombre: "Setas de temporada con espárragos y langostinos", precios: ["13,9"], alergenos: [], estrella: 2,
          foto: "gambas-setas", fotoAnchos: [480, 800, 1035], fotoAlt: "Langostinos y setas salteados; un tenedor levanta un langostino del plato" }
      ]
    },
    {
      id: "verde",
      titulo: "Algo de verde…",
      platos: [
        { nombre: "Ensalada templada con velo de aguacate y langostinos salteados en vinagreta de tomate seco y almendra tostada laminada", precios: ["13"], alergenos: [], estrella: 3,
          nombreCorto: "Ensalada templada con langostinos y almendra",
          foto: "ensalada-templada", fotoAnchos: [480, 800, 1200], fotoAlt: "Ensalada templada con langostinos, aguacate, tomate seco y almendra laminada" },
        { nombre: "Flor de alcachofas en dos cocciones con velo de papada ibérica y emulsión de setas", precios: ["13,9"], alergenos: [], estrella: 4,
          nombreCorto: "Flor de alcachofas con papada ibérica",
          foto: "alcachofas", fotoAnchos: [480, 800, 1200], fotoAlt: "Flor de alcachofas cubierta con láminas de papada ibérica sobre emulsión de setas en plato de cerámica azulada",
          credito: "Foto: María Márquez Torres (Google Maps)" },
        { nombre: "Berenjena rustida con queso de cabra caramelizado y miel de caña", precios: ["9"], vegetariano: true, alergenos: [] },
        { nombre: "Ensalada de salmón curado, tomate cherry, aguacate, queso de cabra, crujiente de maíz y vinagreta de fruta de la pasión", precios: ["13"], alergenos: [] },
        { nombre: "Parrillada de verduras", precios: ["12"], vegetariano: true, alergenos: [] }
      ]
    },
    {
      id: "atun",
      titulo: "El rincón del atún…",
      platos: [
        { nombre: "Tartar de atún", precios: ["18"], alergenos: [], estrella: 6 },
        { nombre: "Tataki de atún", precios: ["17"], alergenos: [] },
        { nombre: "Camperito de atún rojo", precios: ["5,7"], alergenos: [] },
        { nombre: "Ensaladilla rusa con tartar", precios: ["13"], alergenos: [], verificar: "¿tartar de atún?" },
        { nombre: "Chuletón de atún (300 g)", precios: ["35"], alergenos: [] }
      ]
    },
    {
      id: "brasas",
      titulo: "Brasas…",
      nota: "Guarnición: verduras del Valle del Guadalhorce y patatas baby.",
      platos: [
        { nombre: "Presa ibérica a la brasa", precios: ["22"], alergenos: [], verificar: "¿«a la brasa»? No se leía en la foto de la carta" },
        { nombre: "Entrecot de ternera", precios: ["25"], alergenos: [] },
        { nombre: "Picaña a baja temperatura", precios: ["24"], alergenos: [] },
        { nombre: "Pata de pulpo a la brasa (300 g)", precios: ["23"], alergenos: [] }
      ]
    },
    {
      id: "postres",
      titulo: "No tan bueno como tú…",
      subtitulo: "Postres",
      platos: [
        { nombre: "Tarta cremosa de queso", precios: ["5"], alergenos: [] },
        { nombre: "Cremoso de galletas", precios: ["5"], alergenos: [] },
        { nombre: "Brownie con helado de frutos rojos", precios: ["5"], alergenos: [] },
        { nombre: "Arroz con leche de la abuela", precios: ["5"], alergenos: [] }
      ]
    },
    {
      id: "bebidas",
      titulo: "Brinda, disfruta y repite…",
      subtitulo: "Bebidas",
      platos: [
        { nombre: "Refrescos", precios: ["2,8"] },
        { nombre: "Agua", precios: ["2,5"] },
        { nombre: "Agua con gas", precios: ["2,7"] },
        { nombre: "Zumos", precios: ["2,5"] },
        { nombre: "Tinto de verano", precios: ["3,5"] },
        { nombre: "Copa de vino blanco", precios: ["3,5"] },
        { nombre: "Copa de vino tinto", precios: ["3,5"] },
        { nombre: "Vermut", precios: ["3,9"] }
      ],
      // Cervezas en tabla compacta
      tercios: [
        { nombre: "Cruzcampo", precio: "2,8" },
        { nombre: "18/70", precio: "3" },
        { nombre: "Águila Dorada", precio: "3" },
        { nombre: "Alcázar", precio: "3" },
        { nombre: "Heineken", precio: "2,8" },
        { nombre: "Radler", precio: "2,8" },
        { nombre: "Amstel Tostada 0,0", precio: "2,8" },
        { nombre: "Heineken 0,0", precio: "2,8" },
        { nombre: "Cruzcampo sin gluten", precio: "2,8" },
        { nombre: "Águila 0,0 sin gluten", precio: "2,8" }
      ],
      barril: [
        { nombre: "Cruzcampo", cana: "2,5", copa: "3,5", pinta: "3,9" },
        { nombre: "Águila Dorada", cana: "2,6", copa: "3,6", pinta: "4,5" },
        { nombre: "18/70", cana: "2,6", copa: "3,6", pinta: "4,5" }
      ]
    }
  ],

  servicioPan: "1",           // Servicio y pan por persona (€)
  avisoAlergenos: "Si tienes alguna alergia o intolerancia, consulta a nuestro equipo."
};
