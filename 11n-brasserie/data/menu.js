/* =========================================================
   CARTA · 11N Brasserie
   Fuente: carta publicada en Google Maps (fotos de noviembre de 2026).

   CÓMO CAMBIAR UN PRECIO: busca el plato y cambia el número de
   "precio". Usa PUNTO para los decimales: 7.5 = 7,50 €.

   Campos de cada plato:
     cat        → pestaña donde sale (ver lista "categorias")
     grupo      → subtítulo dentro de la pestaña (opcional)
     nombre / nombre_en, desc / desc_en
     precio     → número (o texto como "0,40 €/ud")
     frio, caliente, vegetal (se puede con leche vegetal), best (best seller)
     extras     → [["Texto", precio], ...]
     foto       → nombre de una foto de img/ (opcional)
     nota       → texto pequeño (opcional)

   ⚠️ Los textos en inglés (nombre_en, desc_en) son una traducción
   provisional: hay que compararlos con la carta inglesa del local.
   ========================================================= */
window.MENU = {
  categorias: [
    { id: "matcha",     es: "Matcha Bar",         en: "Matcha Bar",      ilus: "vaso" },
    { id: "desayunos",  es: "Desayunos",          en: "Breakfast",       ilus: "plato" },
    { id: "huevos",     es: "Huevos",             en: "Eggs",            ilus: "huevo" },
    { id: "pitufos",    es: "Pitufos",            en: "Toasted rolls",   ilus: "pan" },
    { id: "pancakes",   es: "Pancakes marroquíes", en: "Moroccan pancakes", ilus: "plato" },
    { id: "crepes",     es: "Crêpes & Waffles",   en: "Crêpes & Waffles", ilus: "crepe" },
    { id: "croissants", es: "Croissants",         en: "Croissants",      ilus: "croissant" },
    { id: "wraps",      es: "Wraps",              en: "Wraps",           ilus: "wrap" },
    { id: "postres",    es: "Postres",            en: "Desserts",        ilus: "tarta" },
    { id: "cafes",      es: "Cafés",              en: "Hot drinks",      ilus: "taza" },
    { id: "frios",      es: "Cafés fríos",        en: "Iced coffee",     ilus: "vaso" },
    { id: "tes",        es: "Tés",                en: "Teas",            ilus: "tetera" },
    { id: "limonadas",  es: "Limonadas",          en: "Lemonades",       ilus: "limonada" },
    { id: "smoothies",  es: "Smoothies",          en: "Smoothies",       ilus: "limonada" },
    { id: "bebidas",    es: "Bebidas",            en: "Drinks",          ilus: "botella" }
  ],

  notas: {
    matcha:   { es: "Leches vegetales disponibles: soja, avena, coco y almendra.", en: "Plant milks available: soy, oat, coconut and almond." },
    cafes:    { es: "Leches vegetales (soja, avena, coco, almendra): +0,50 €.", en: "Plant milks (soy, oat, coconut, almond): +€0.50." },
    frios:    { es: "Leches vegetales (soja, avena, coco, almendra): +0,50 €.", en: "Plant milks (soy, oat, coconut, almond): +€0.50." },
    tes:      { es: "Con leche en lugar de agua: +0,50 €.", en: "With milk instead of water: +€0.50." },
    limonadas:{ es: "Con agua con gas o sin gas, como prefieras.", en: "With sparkling or still water." },
    pitufos:  { es: "Pan blanco. Integral: +0,20 €. Extras: aguacate +1,00 € · salmón ahumado +1,20 €.", en: "White bread. Wholemeal: +€0.20. Extras: avocado +€1.00 · smoked salmon +€1.20." },
    huevos:   { es: "Extras: salmón ahumado +1,20 € · pavo +1,00 €.", en: "Extras: smoked salmon +€1.20 · turkey +€1.00." },
    wraps:    { es: "Solo de 12:00 a 13:30.", en: "Only from 12:00 to 13:30." }
  },

  platos: [
    /* ---------- MATCHA BAR ---------- */
    { cat: "matcha", grupo: "Classic", nombre: "Matcha Latte Clásico", nombre_en: "Classic Matcha Latte", desc: "Leche y matcha.", desc_en: "Milk and matcha.", precio: 5.5, frio: true, caliente: true, vegetal: true },
    { cat: "matcha", grupo: "Classic", nombre: "Matcha Latte de Vainilla", nombre_en: "Vanilla Matcha Latte", desc: "Leche, vainilla y matcha.", desc_en: "Milk, vanilla and matcha.", precio: 6, frio: true, caliente: true, vegetal: true },
    { cat: "matcha", grupo: "Classic", nombre: "Iced Matcha Avena & Vainilla", nombre_en: "Iced Oat Vanilla Matcha", desc: "Leche de avena, vainilla y matcha. Solo frío.", desc_en: "Oat milk, vanilla and matcha. Iced only.", precio: 7, frio: true, caliente: false, vegetal: true, best: true },
    { cat: "matcha", grupo: "Classic", nombre: "Chai Matcha Latte", nombre_en: "Chai Matcha Latte", desc: "Chai latte, matcha y espuma de chai.", desc_en: "Chai latte, matcha and chai foam.", precio: 7, frio: true, caliente: true, vegetal: true },
    { cat: "matcha", grupo: "Classic", nombre: "Matcha Latte de Caramelo Salado", nombre_en: "Salted Caramel Matcha Latte", desc: "Leche, matcha y espuma de caramelo salado.", desc_en: "Milk, matcha and salted caramel foam.", precio: 7.5, frio: true, caliente: true, vegetal: true },

    { cat: "matcha", grupo: "Signature", nombre: "Pink Matcha", nombre_en: "Pink Matcha", desc: "Leche, puré de fresa, matcha y espuma pink.", desc_en: "Milk, strawberry purée, matcha and pink foam.", precio: 7.5, frio: true, caliente: true, vegetal: true, best: true },
    { cat: "matcha", grupo: "Signature", nombre: "Rose Matcha", nombre_en: "Rose Matcha", desc: "Leche, agua de rosas, matcha y espuma de rosa.", desc_en: "Milk, rose water, matcha and rose foam.", precio: 8, frio: true, caliente: true, vegetal: true },
    { cat: "matcha", grupo: "Signature", nombre: "Matcha de Plátano", nombre_en: "Banana Bread Matcha", desc: "Leche, puré de plátano, matcha y espuma de plátano.", desc_en: "Milk, banana purée, matcha and banana bread foam.", precio: 8, frio: true, caliente: true, vegetal: true, best: true },
    { cat: "matcha", grupo: "Signature", nombre: "Matcha Arándanos", nombre_en: "Blueberry Matcha", desc: "Leche, matcha y espuma de arándanos. Solo frío.", desc_en: "Milk, matcha and blueberry foam. Iced only.", precio: 8.5, frio: true, caliente: false, vegetal: true },

    { cat: "matcha", grupo: "Fruity", nombre: "Matcha Coco & Mango", nombre_en: "Coconut Mango Matcha", desc: "Leche de coco, puré de mango y matcha. Recomendado frío.", desc_en: "Coconut milk, mango purée and matcha. Best iced.", precio: 7.5, frio: true, caliente: false, vegetal: true, best: true },
    { cat: "matcha", grupo: "Fruity", nombre: "Piña Colada Matcha", nombre_en: "Piña Colada Matcha", desc: "Leche de coco, piña colada y matcha. Recomendado frío.", desc_en: "Coconut milk, piña colada and matcha. Best iced.", precio: 7.5, frio: true, caliente: false, vegetal: true },
    { cat: "matcha", grupo: "Fruity", nombre: "Matcha Melocotón", nombre_en: "Peach Matcha", desc: "Leche de avena, puré de melocotón y matcha. Recomendado frío.", desc_en: "Oat milk, peach purée and matcha. Best iced.", precio: 8, frio: true, caliente: false, vegetal: true },
    { cat: "matcha", grupo: "Fruity", nombre: "Matcha Frutos Rojos", nombre_en: "Berry Matcha", desc: "Leche, frutos rojos y matcha. Recomendado frío.", desc_en: "Milk, red berries and matcha. Best iced.", precio: 7.5, frio: true, caliente: false, vegetal: true },
    { cat: "matcha", grupo: "Fruity", nombre: "Matcha Cherry", nombre_en: "Cherry Matcha", desc: "Puré de cereza, leche de soja, matcha y espuma de cereza. Recomendado frío.", desc_en: "Cherry purée, soy milk, matcha and cherry foam. Best iced.", precio: 8.5, frio: true, caliente: false, vegetal: true },

    /* ---------- DESAYUNOS ---------- */
    { cat: "desayunos", nombre: "Bowl de Açaí", nombre_en: "Açaí Bowl", desc: "Açaí, granola, arándanos, plátano, frambuesas, mantequilla de almendras y coco.", desc_en: "Açaí, granola, blueberries, banana, raspberries, almond butter and coconut.", precio: 14.5, foto: "brunch-marmol", fotoAlt: "Bowl de açaí con frutos rojos, pancakes y café sobre mármol verde" },
    { cat: "desayunos", nombre: "Tostada de Aguacate con Bruschetta", nombre_en: "Avocado Bruschetta Toast", desc: "Masa madre, aguacate y tomate estilo bruschetta.", desc_en: "Sourdough, avocado and bruschetta-style tomato.", precio: 7, extras: [["Huevo", 1], ["Salmón", 1.2]] },
    { cat: "desayunos", nombre: "Tostada 11N", nombre_en: "11N Toast", desc: "Masa madre con calabaza, aguacate, salmón ahumado, rúcula y aderezo balsámico de mango.", desc_en: "Sourdough with pumpkin, avocado, smoked salmon, rocket and mango balsamic dressing.", precio: 9 },
    { cat: "desayunos", nombre: "Tostada de Pesto", nombre_en: "Pesto Toast", desc: "Tostada, mozzarella, pesto, tomate y rúcula.", desc_en: "Toast, mozzarella, pesto, tomato and rocket.", precio: 7.5 },
    { cat: "desayunos", nombre: "Pancakes Americanos", nombre_en: "American Pancakes", desc: "Con sirope de arce, mantequilla y arándanos.", desc_en: "With maple syrup, butter and blueberries.", precio: 6 },
    { cat: "desayunos", nombre: "French Toast Brioche de Canela", nombre_en: "Cinnamon Brioche French Toast", desc: "Tostada francesa, miel y frutas.", desc_en: "French toast, honey and fruit.", precio: 6.5 },
    { cat: "desayunos", grupo: "Desayunos del mundo", nombre: "Istanbul", nombre_en: "Istanbul", desc: "Huevos shakshuka, salchichas a la parrilla, pan y té turco.", desc_en: "Shakshuka eggs, grilled sausages, bread and Turkish tea.", precio: 12 },
    { cat: "desayunos", grupo: "Desayunos del mundo", nombre: "EUA", nombre_en: "USA", desc: "Pancakes americanos, huevos revueltos y bacon de pavo.", desc_en: "American pancakes, scrambled eggs and turkey bacon.", precio: 10.5 },
    { cat: "desayunos", grupo: "Churros", nombre: "Mini churros", nombre_en: "Mini churros", desc: "Mini churros individuales. Mínimo 6 unidades.", desc_en: "Individual mini churros. Minimum 6.", precio: "0,40 €/ud" },

    /* ---------- HUEVOS ---------- */
    { cat: "huevos", nombre: "Fritos", nombre_en: "Fried eggs", desc: "Huevos fritos, ensalada y pan.", desc_en: "Fried eggs, salad and bread.", precio: 6 },
    { cat: "huevos", nombre: "Fritos al Ajillo", nombre_en: "Garlic fried eggs", desc: "Huevos fritos con aceite de ajo, ensalada y pan.", desc_en: "Fried eggs with garlic oil, salad and bread.", precio: 6.5 },
    { cat: "huevos", nombre: "Huevos Revueltos", nombre_en: "Scrambled eggs", desc: "Revueltos cremosos, ensalada y patatas waffle.", desc_en: "Creamy scrambled eggs, salad and waffle fries.", precio: 6.5 },
    { cat: "huevos", nombre: "Huevos Revueltos 11N", nombre_en: "11N Scrambled eggs", desc: "Revueltos cremosos con champiñones salteados y parmesano, ensalada y patatas waffle.", desc_en: "Creamy scrambled eggs with sautéed mushrooms and parmesan, salad and waffle fries.", precio: 8 },
    { cat: "huevos", nombre: "Omelette", nombre_en: "Omelette", desc: "Omelette clásica, tostada brioche y ensalada.", desc_en: "Classic omelette, brioche toast and salad.", precio: 6 },

    /* ---------- PITUFOS ---------- */
    { cat: "pitufos", nombre: "Tomate", nombre_en: "Tomato", precio: 3.5 },
    { cat: "pitufos", nombre: "Tomate, atún, lechuga y mayonesa", nombre_en: "Tomato, tuna, lettuce and mayo", precio: 5.5 },
    { cat: "pitufos", nombre: "Queso", nombre_en: "Cheese", precio: 3 },
    { cat: "pitufos", nombre: "Tortilla francesa", nombre_en: "French omelette", precio: 4 },
    { cat: "pitufos", nombre: "Mixto", nombre_en: "Ham & cheese", precio: 3.5 },

    /* ---------- PANCAKES MARROQUÍES ---------- */
    { cat: "pancakes", grupo: "Crujientes", nombre: "Pollo", nombre_en: "Chicken", desc: "Con pimientos, cebolla y zanahoria. Ensalada y patatas fritas.", desc_en: "With peppers, onion and carrot. Salad and fries.", precio: 9.5 },
    { cat: "pancakes", grupo: "Crujientes", nombre: "Mixto", nombre_en: "Cheese & turkey bacon", desc: "Con queso y bacon de pavo.", desc_en: "With cheese and turkey bacon.", precio: 4.5 },
    { cat: "pancakes", grupo: "Crujientes", nombre: "Carne picada", nombre_en: "Minced beef", desc: "Con pimientos, cebolla y zanahoria. Ensalada y patatas fritas.", desc_en: "With peppers, onion and carrot. Salad and fries.", precio: 10 },
    { cat: "pancakes", grupo: "Crujientes", nombre: "Miel y almendras laminadas", nombre_en: "Honey & flaked almonds", desc: "Pancake crujiente con miel y almendras laminadas.", desc_en: "Crispy pancake with honey and flaked almonds.", precio: 4.5 },
    { cat: "pancakes", grupo: "Crujientes", nombre: "Veggie", nombre_en: "Veggie", desc: "Pimientos, cebolla y zanahoria. Ensalada y patatas fritas.", desc_en: "Peppers, onion and carrot. Salad and fries.", precio: 7.5 },
    { cat: "pancakes", grupo: "Crujientes", nombre: "Sabor Pastela de Pollo", nombre_en: "Chicken Pastilla", desc: "Relleno dulce y salado. Ensalada y patatas fritas.", desc_en: "Sweet and savoury filling. Salad and fries.", precio: 12 },
    { cat: "pancakes", grupo: "Dulces", nombre: "Crema de pistacho", nombre_en: "Pistachio cream", precio: 5.5 },
    { cat: "pancakes", grupo: "Dulces", nombre: "Nata montada y leche condensada", nombre_en: "Whipped cream & condensed milk", precio: 4.5 },
    { cat: "pancakes", grupo: "Dulces", nombre: "Crema Lotus", nombre_en: "Lotus cream", precio: 5 },
    { cat: "pancakes", grupo: "Dulces", nombre: "Nutella", nombre_en: "Nutella", precio: 4 },
    { cat: "pancakes", grupo: "Dulces", nombre: "Frutas", nombre_en: "Fruit", precio: 6 },

    /* ---------- CRÊPES & WAFFLES ---------- */
    { cat: "crepes", grupo: "Crêpes salados", nombre: "Crêpe 11N", nombre_en: "11N Crêpe", desc: "Pavo, champiñones y mozzarella.", desc_en: "Turkey, mushrooms and mozzarella.", precio: 7.5 },
    { cat: "crepes", grupo: "Crêpes salados", nombre: "Mixto", nombre_en: "Ham & cheese", desc: "Crêpe salado mixto.", desc_en: "Ham and cheese crêpe.", precio: 4.5 },
    { cat: "crepes", grupo: "Crêpes salados", nombre: "Salmón, espinacas y mozzarella", nombre_en: "Salmon, spinach & mozzarella", desc: "Salmón ahumado, espinacas y mozzarella.", desc_en: "Smoked salmon, spinach and mozzarella.", precio: 7.5 },
    { cat: "crepes", grupo: "Crêpes salados", nombre: "Atún y cebolla caramelizada", nombre_en: "Tuna & caramelised onion", desc: "Atún, cebolla caramelizada, tomate y mozzarella.", desc_en: "Tuna, caramelised onion, tomato and mozzarella.", precio: 7 },
    { cat: "crepes", grupo: "Crêpes salados", nombre: "Mozzarella", nombre_en: "Mozzarella", desc: "Crêpe de mozzarella.", desc_en: "Mozzarella crêpe.", precio: 4 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Nutella", nombre_en: "Nutella", precio: 4.5 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Nutella & fresas", nombre_en: "Nutella & strawberries", precio: 5 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Nutella & plátano", nombre_en: "Nutella & banana", precio: 4.5 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Dulce de leche", nombre_en: "Dulce de leche", precio: 4 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Chocolate blanco", nombre_en: "White chocolate", precio: 4.5 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Oreo", nombre_en: "Oreo", precio: 6 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Biscoff Lotus", nombre_en: "Biscoff Lotus", precio: 6 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Chocolate Dubai", nombre_en: "Dubai chocolate", precio: 6 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Kinder", nombre_en: "Kinder", precio: 6 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Filipinos", nombre_en: "Filipinos", precio: 6 },
    { cat: "crepes", grupo: "Crêpes dulces", nombre: "Kit Kat", nombre_en: "Kit Kat", precio: 6 },
    { cat: "crepes", grupo: "Waffles", nombre: "Waffle (unidad)", nombre_en: "Waffle (each)", desc: "Añade los toppings que quieras.", desc_en: "Add the toppings you like.", precio: 3.5,
      extras: [["Nutella", 0.5], ["Nata montada", 0.5], ["Frutos rojos", 2], ["Pistacho", 1.5], ["Plátano", 1], ["Dulce de leche", 0.5], ["Chocolate blanco", 0.5], ["Lotus", 1]] },

    /* ---------- CROISSANTS ---------- */
    { cat: "croissants", nombre: "Chocolate", nombre_en: "Chocolate", precio: 3.5 },
    { cat: "croissants", nombre: "Mixto", nombre_en: "Ham & cheese", precio: 4 },
    { cat: "croissants", nombre: "Omelette", nombre_en: "Omelette", precio: 5 },
    { cat: "croissants", nombre: "Aguacate y salmón", nombre_en: "Avocado & salmon", precio: 5.5 },
    { cat: "croissants", nombre: "Mermelada y mantequilla", nombre_en: "Jam & butter", precio: 3 },

    /* ---------- WRAPS (12:00–13:30) ---------- */
    { cat: "wraps", nombre: "Wrap de Pollo al Curry", nombre_en: "Curry Chicken Wrap", desc: "Salsa curry, pepinillos, lechuga y patatas fritas.", desc_en: "Curry sauce, pickles, lettuce and fries.", precio: 12, wraps: true },
    { cat: "wraps", nombre: "Wrap Shawarma", nombre_en: "Shawarma Wrap", desc: "Salsa de ajo, cebolla, tomate y patatas fritas.", desc_en: "Garlic sauce, onion, tomato and fries.", precio: 12.5, wraps: true },
    { cat: "wraps", nombre: "Wrap de Pollo Honey Mustard", nombre_en: "Honey Mustard Chicken Wrap", desc: "Lechuga, pepinillos y patatas waffle.", desc_en: "Lettuce, pickles and waffle fries.", precio: 11, wraps: true },
    { cat: "wraps", nombre: "Moroccan Spiced Beef", nombre_en: "Moroccan Spiced Beef", desc: "Sándwich de carne especiada con ensalada de tomate y cebolla.", desc_en: "Spiced beef sandwich with tomato and onion salad.", precio: 12.5, wraps: true },

    /* ---------- POSTRES ---------- */
    { cat: "postres", nombre: "Cheesecake casera de fresa", nombre_en: "Homemade strawberry cheesecake", desc: "Tarta de queso casera con fresa.", desc_en: "Homemade cheesecake with strawberry.", precio: 4.5, verificar: "La carta en inglés dice 6,00 €" },
    { cat: "postres", nombre: "Bizcocho casero del día", nombre_en: "Homemade cake of the day", desc: "Precio por trozo.", desc_en: "Price per slice.", precio: 4 },
    { cat: "postres", nombre: "Galletas marroquíes", nombre_en: "Moroccan cookies", desc: "Precio por unidad.", desc_en: "Price per cookie.", precio: 1 },

    /* ---------- CAFÉS (calientes) ---------- */
    { cat: "cafes", nombre: "Espresso", nombre_en: "Espresso", precio: 2.1, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Americano", nombre_en: "Americano", precio: 2.2, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Café con leche", nombre_en: "Café con leche", precio: 2.5, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Capuccino", nombre_en: "Cappuccino", precio: 2.6, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Latte", nombre_en: "Latte", precio: 3, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Café bombón", nombre_en: "Café bombón", precio: 2.7, caliente: true },
    { cat: "cafes", nombre: "Flat White", nombre_en: "Flat White", precio: 3, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Café cortado", nombre_en: "Cortado", precio: 2.3, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Café manchado", nombre_en: "Manchado", precio: 2.3, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Macchiato", nombre_en: "Macchiato", precio: 3, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Chai Latte", nombre_en: "Chai Latte", precio: 4, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Latte Caramelo", nombre_en: "Caramel Latte", precio: 4, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Latte Pumpkin Spice 🍂", nombre_en: "Pumpkin Spice Latte 🍂", desc: "De temporada.", desc_en: "Seasonal.", precio: 4.5, caliente: true, vegetal: true, foto: "pumpkin-spice", fotoAlt: "Pumpkin spice latte en vaso burbuja con una hoja de otoño" },
    { cat: "cafes", nombre: "Chocolate caliente", nombre_en: "Hot chocolate", precio: 3, caliente: true, vegetal: true },
    { cat: "cafes", nombre: "Churros con chocolate", nombre_en: "Churros with chocolate", precio: 3.5, caliente: true },

    /* ---------- CAFÉS FRÍOS ---------- */
    { cat: "frios", nombre: "Frappuccino de Chocolate", nombre_en: "Chocolate Frappuccino", desc: "Espresso, leche, chocolate y nata montada.", desc_en: "Espresso, milk, chocolate and whipped cream.", precio: 5.5, frio: true, vegetal: true },
    { cat: "frios", nombre: "Frappuccino de Caramelo", nombre_en: "Caramel Frappuccino", desc: "Espresso, leche, caramelo y nata montada.", desc_en: "Espresso, milk, caramel and whipped cream.", precio: 5.5, frio: true, vegetal: true },
    { cat: "frios", nombre: "Affogato", nombre_en: "Affogato", desc: "Helado de vainilla y espresso.", desc_en: "Vanilla ice cream and espresso.", precio: 5, frio: true },
    { cat: "frios", nombre: "Café Latte Español", nombre_en: "Iced Spanish Latte", desc: "Leche y espresso.", desc_en: "Milk and espresso.", precio: 4, frio: true, vegetal: true },
    { cat: "frios", nombre: "Latte de Caramelo", nombre_en: "Iced Caramel Latte", desc: "Leche, espresso y espuma de caramelo.", desc_en: "Milk, espresso and caramel foam.", precio: 5, frio: true, vegetal: true },
    { cat: "frios", nombre: "Latte Dubai Chocolate", nombre_en: "Dubai Chocolate Latte", desc: "Leche de chocolate, espresso, crema de pistacho y espuma de chocolate.", desc_en: "Chocolate milk, espresso, pistachio cream and chocolate foam.", precio: 6, frio: true },
    { cat: "frios", nombre: "Latte Vainilla", nombre_en: "Iced Vanilla Latte", desc: "Leche, espresso y espuma de vainilla.", desc_en: "Milk, espresso and vanilla foam.", precio: 5, frio: true, vegetal: true },
    { cat: "frios", nombre: "Latte Tiramisú", nombre_en: "Tiramisu Latte", desc: "Leche, café, espuma de mascarpone, cacao y galleta savoiardi.", desc_en: "Milk, coffee, mascarpone foam, cocoa and savoiardi biscuit.", precio: 6, frio: true },
    { cat: "frios", nombre: "Latte Cinnamon Roll", nombre_en: "Cinnamon Roll Latte", desc: "Espresso infusionado con canela, leche y espuma cinnamon roll.", desc_en: "Cinnamon-infused espresso, milk and cinnamon roll foam.", precio: 5.5, frio: true, vegetal: true },
    { cat: "frios", nombre: "Latte Biscoff Lotus", nombre_en: "Biscoff Lotus Latte", desc: "Leche Lotus, doble espresso y espuma Lotus.", desc_en: "Lotus milk, double espresso and Lotus foam.", precio: 6, frio: true },
    { cat: "frios", nombre: "Latte Arándanos", nombre_en: "Blueberry Iced Latte", desc: "Leche, espresso y espuma de arándanos.", desc_en: "Milk, espresso and blueberry foam.", precio: 7, frio: true, vegetal: true },
    { cat: "frios", nombre: "Latte Bounty", nombre_en: "Bounty Latte", desc: "Leche de coco, chocolate, espresso y espuma de coco.", desc_en: "Coconut milk, chocolate, espresso and coconut foam.", precio: 7.5, frio: true, vegetal: true },

    /* ---------- TÉS ---------- */
    { cat: "tes", nombre: "Rooibos", nombre_en: "Rooibos", precio: 3, caliente: true },
    { cat: "tes", nombre: "Té verde", nombre_en: "Green tea", precio: 3, caliente: true },
    { cat: "tes", nombre: "Té rojo", nombre_en: "Red tea", precio: 3, caliente: true },
    { cat: "tes", nombre: "Té negro", nombre_en: "Black tea", precio: 3, caliente: true },
    { cat: "tes", nombre: "Manzanilla", nombre_en: "Chamomile", precio: 3, caliente: true },
    { cat: "tes", nombre: "Poleo menta", nombre_en: "Pennyroyal mint", precio: 3, caliente: true },
    { cat: "tes", nombre: "Té marroquí", nombre_en: "Moroccan tea", precio: 4.5, caliente: true },
    { cat: "tes", nombre: "Té karak", nombre_en: "Karak tea", precio: 4.5, caliente: true },

    /* ---------- LIMONADAS CASERAS ---------- */
    { cat: "limonadas", nombre: "Limón y menta estilo Alec", nombre_en: "Alec-style lemon & mint", precio: 5, frio: true },
    { cat: "limonadas", nombre: "Limón, menta y piña colada", nombre_en: "Lemon, mint & piña colada", precio: 5.5, frio: true },
    { cat: "limonadas", nombre: "Limón, menta y maracuyá", nombre_en: "Lemon, mint & passion fruit", precio: 6, frio: true },
    { cat: "limonadas", nombre: "Melocotón", nombre_en: "Peach", precio: 6, frio: true },
    { cat: "limonadas", nombre: "Lichi", nombre_en: "Lychee", precio: 7, frio: true },
    { cat: "limonadas", nombre: "Granada", nombre_en: "Pomegranate", precio: 7, frio: true },
    { cat: "limonadas", nombre: "Sandía", nombre_en: "Watermelon", precio: 6.5, frio: true },

    /* ---------- SMOOTHIES, ZUMOS Y BATIDOS ---------- */
    { cat: "smoothies", grupo: "Smoothies & zumos", nombre: "Summer", nombre_en: "Summer", desc: "Melocotón, leche de coco y mango.", desc_en: "Peach, coconut milk and mango.", precio: 7, frio: true, vegetal: true },
    { cat: "smoothies", grupo: "Smoothies & zumos", nombre: "Dulce", nombre_en: "Sweet", desc: "Naranja, fresa y plátano.", desc_en: "Orange, strawberry and banana.", precio: 6, frio: true },
    { cat: "smoothies", grupo: "Smoothies & zumos", nombre: "Tropical", nombre_en: "Tropical", desc: "Piña, mango y naranja.", desc_en: "Pineapple, mango and orange.", precio: 7, frio: true },
    { cat: "smoothies", grupo: "Smoothies & zumos", nombre: "Berry Blush", nombre_en: "Berry Blush", desc: "Naranja y frutos rojos.", desc_en: "Orange and red berries.", precio: 7, frio: true },
    { cat: "smoothies", grupo: "Smoothies & zumos", nombre: "11N Smoothie", nombre_en: "11N Smoothie", desc: "Fresa, plátano, leche de coco y vainilla.", desc_en: "Strawberry, banana, coconut milk and vanilla.", precio: 7.5, frio: true, vegetal: true },
    { cat: "smoothies", grupo: "Smoothies & zumos", nombre: "Zumo de naranja natural", nombre_en: "Fresh orange juice", desc: "Recién exprimido.", desc_en: "Freshly squeezed.", precio: 3.5, frio: true },
    { cat: "smoothies", grupo: "Zumos de botella", nombre: "Melocotón", nombre_en: "Peach", precio: 2, frio: true },
    { cat: "smoothies", grupo: "Zumos de botella", nombre: "Naranja", nombre_en: "Orange", precio: 2, frio: true },
    { cat: "smoothies", grupo: "Zumos de botella", nombre: "Piña", nombre_en: "Pineapple", precio: 2, frio: true },
    { cat: "smoothies", grupo: "Batidos", nombre: "Fresa", nombre_en: "Strawberry", precio: 2, frio: true },
    { cat: "smoothies", grupo: "Batidos", nombre: "Chocolate", nombre_en: "Chocolate", precio: 2, frio: true },
    { cat: "smoothies", grupo: "Batidos", nombre: "Vainilla", nombre_en: "Vanilla", precio: 2, frio: true },

    /* ---------- BEBIDAS ---------- */
    { cat: "bebidas", nombre: "Agua pequeña", nombre_en: "Small water", precio: 2, frio: true },
    { cat: "bebidas", nombre: "Agua mediana", nombre_en: "Medium water", precio: 2.5, frio: true },
    { cat: "bebidas", nombre: "Agua grande", nombre_en: "Large water", precio: 3.5, frio: true },
    { cat: "bebidas", nombre: "Agua con gas", nombre_en: "Sparkling water", precio: 3, frio: true },
    { cat: "bebidas", nombre: "Coca-Cola (normal / Zero)", nombre_en: "Coca-Cola (regular / Zero)", precio: 3, frio: true },
    { cat: "bebidas", nombre: "Fanta naranja / limón", nombre_en: "Fanta orange / lemon", precio: 3, frio: true },
    { cat: "bebidas", nombre: "Sprite", nombre_en: "Sprite", precio: 3, frio: true },
    { cat: "bebidas", nombre: "Tónica Schweppes", nombre_en: "Schweppes tonic", precio: 3, frio: true },
    { cat: "bebidas", nombre: "Aquarius naranja / limón", nombre_en: "Aquarius orange / lemon", precio: 3, frio: true },
    { cat: "bebidas", nombre: "Fuze Tea maracuyá / limón", nombre_en: "Fuze Tea passion fruit / lemon", precio: 3, frio: true, verificar: "La carta en inglés incluye también el sabor frutos rojos" },
    { cat: "bebidas", nombre: "Tinto de verano limón 0,0", nombre_en: "Alcohol-free lemon tinto de verano", precio: 3.5, frio: true },
    { cat: "bebidas", nombre: "Corona Cero", nombre_en: "Corona Cero", precio: 3.5, frio: true },
    { cat: "bebidas", nombre: "San Miguel 0,0", nombre_en: "San Miguel 0.0", precio: 3.5, frio: true },
    { cat: "bebidas", nombre: "San Miguel 0,0 Tostada", nombre_en: "San Miguel 0.0 Tostada", precio: 3.5, frio: true }
  ]
};
