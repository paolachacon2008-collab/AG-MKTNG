# ============================================================
#  DATOS DE LA WEB DE DA MIMÌ — el único archivo que hay que tocar
# ============================================================
#  Después de cambiar algo, ejecuta:   python3 fuente/build.py
#
#  - Texto entre comillas: se puede cambiar libremente.
#  - None significa «todavía no lo tenemos».
#  - pendiente="..." es el motivo que sale al pasar el ratón por la
#    etiqueta amarilla. Cuando un dato esté confirmado, pon pendiente=None.
# ============================================================

# True mientras la web sea un borrador: se ven las etiquetas «Pendiente»
# y Google no la indexa. Ponlo en False solo para publicar la versión final.
BORRADOR = True

# Dominio definitivo (sin barra al final). Cambiar cuando exista.
SITE = "https://www.da-mimi.example"

NOMBRE = "Da Mimì"

TELEFONO = {
    "visible": "951 70 55 35",
    "enlace": "+34951705535",
    "pendiente": "Gastroranking muestra otro número (951 20 34 54). Falta confirmar cuál es el bueno.",
}

DIRECCION = {
    "calle": "Blvr. Louis Pasteur, 15",
    "barrio": "Teatinos-Universidad",
    "cp": "29010",
    "ciudad": "Málaga",
    "provincia": "Málaga",
    "pais": "ES",
    "lat": 36.7176954,
    "lng": -4.4632746,
    "maps": "https://maps.app.goo.gl/3Tmb4tCz8ZxkCvuR9",
}

REDES = {
    "instagram": "https://www.instagram.com/damimipizzeria/",
    "facebook": "https://www.facebook.com/damimipizzeria/",
    "pendiente": "Falta que el restaurante confirme que estas cuentas son suyas.",
}

# Enlaces de pedidos. None = no tenemos el enlace todavía (el botón sale como pendiente).
GLOVO = None
JUST_EAT = None
WHATSAPP = None  # Ejemplo cuando exista: "https://wa.me/34600000000"

TERRAZA_PENDIENTE = "Falta confirmar que tienen terraza con mesas fuera."
PRODUCTO_ITALIANO_PENDIENTE = "Lo dicen en Instagram («producto 100% italiano»), pero falta que lo confirmen y digan qué producto."

# Horario: 0 = lunes ... 6 = domingo. Cada tramo es ("apertura", "cierre").
# "00:00" como cierre significa medianoche.
HORARIO = {
    0: [("13:00", "16:00"), ("19:30", "23:30")],
    1: [("13:00", "16:00"), ("19:30", "23:30")],
    2: [("13:00", "16:00"), ("19:30", "23:30")],
    3: [("13:00", "16:00"), ("19:30", "23:30")],
    4: [("13:00", "16:00"), ("19:30", "00:00")],
    5: [("13:00", "16:30"), ("19:30", "00:00")],
    6: [("13:00", "16:30"), ("19:30", "23:30")],
}
HORARIO_PENDIENTE = "Horario sacado de directorios de internet. Falta que Da Mimì lo confirme."

# ------------------------------------------------------------
#  DEL MES — cambia cada mes (ver README.md)
# ------------------------------------------------------------
DEL_MES = {
    "mes": "noviembre",
    "pizza": {
        "nombre": "Pizza del mes",
        "descripcion": "Base de patata, speck y patata crunchy.",
        "foto": "pizza-del-mes-speck-patata",
        "alt": "Pizza del mes de Da Mimì con base de patata, lonchas de speck y patata crujiente por encima, sobre plato de cerámica azul",
    },
    "pasta": {
        "nombre": "Pasta del mes",
        "descripcion": "Pappardelle, speck y crema de porcini, terminados dentro de la rueda de parmesano.",
        "foto": "pasta-del-mes-pappardelle",
        "alt": "Pappardelle cremosos levantados con pinzas sobre la rueda de parmesano",
    },
}

# ------------------------------------------------------------
#  CARTA
#  precio: None = pendiente (sale «—»). Cuando lo tengáis: "12,50"
#  alergenos: None = pendiente. Cuando los tengáis: ["gluten", "lacteos"]
#     (nombres válidos: los de ALERGENOS, más abajo)
# ------------------------------------------------------------
CARTA = [
    {
        "id": "del-mes",
        "titulo": "Del mes",
        "platos": [
            {"nombre": "Pizza del mes", "ingredientes": "Base de patata, speck y patata crunchy.",
             "foto": "pizza-del-mes-speck-patata", "alt": DEL_MES["pizza"]["alt"],
             "precio": None, "alergenos": None},
            {"nombre": "Pasta del mes", "ingredientes": "Pappardelle, speck y crema de porcini, terminados en la rueda de parmesano.",
             "foto": "pasta-del-mes-pappardelle", "alt": DEL_MES["pasta"]["alt"],
             "precio": None, "alergenos": None},
        ],
    },
    {
        "id": "para-empezar",
        "titulo": "Para empezar",
        "platos": [
            {"nombre": "Parmigiana de berenjena", "ingredientes": "Con brotes y flores comestibles.",
             "foto": "parmigiana-berenjena",
             "alt": "Torre de parmigiana de berenjena coronada con brotes verdes y una flor comestible morada",
             "precio": None, "alergenos": None},
        ],
    },
    {
        "id": "pizzas",
        "titulo": "Pizzas",
        "platos": [
            {"nombre": "Pizza blanca con setas", "ingredientes": "Mozzarella, setas y albahaca.",
             "foto": "pizza-blanca-porcion",
             "alt": "Mano con guante levantando una porción de pizza blanca con setas y albahaca, de borde alto y tostado",
             "precio": None, "alergenos": None,
             "pendiente": "Nombre e ingredientes sacados de la foto. Falta confirmarlos con la carta oficial."},
            {"nombre": "Pizza de salmón y rúcula", "ingredientes": "Rúcula, salmón ahumado y cebolla morada.",
             "foto": "pizza-salmon-rucula",
             "alt": "Pizza con rúcula, salmón ahumado, cebolla morada y toques blancos por encima, sobre plato de cerámica azul",
             "precio": None, "alergenos": None,
             "pendiente": "Nombre e ingredientes sacados de la foto. Falta confirmarlos con la carta oficial."},
        ],
    },
    {
        "id": "pastas",
        "titulo": "Pastas",
        "platos": [
            {"nombre": "Carbonara", "ingredientes": "Guanciale, yema y queso rallado.",
             "foto": "carbonara-ingredientes",
             "alt": "Ingredientes de la carbonara preparados en cuencos de acero: guanciale, queso rallado, yema batida y nidos de pasta",
             "precio": None, "alergenos": None},
            {"nombre": "Ñoquis con nueces", "ingredientes": "Salsa cremosa, nueces y brotes.",
             "foto": "gnocchi-nueces",
             "alt": "Plato de ñoquis en salsa cremosa con nueces, brotes y una flor comestible, en plato de cerámica azul y blanca",
             "precio": None, "alergenos": None},
        ],
    },
    {
        "id": "postres",
        "titulo": "Postres",
        "platos": [
            {"nombre": "Tarta de chocolate con helado", "ingredientes": "",
             "foto": "postre-chocolate",
             "alt": "Salsa de chocolate cayendo sobre una porción de tarta de chocolate con una bola de helado",
             "precio": None, "alergenos": None},
            {"nombre": "Copa de crema y avellana", "ingredientes": "",
             "foto": "postre-crema-avellana",
             "alt": "Copa de crema con avellana troceada, hilos de chocolate y una galleta, sujeta con las dos manos",
             "precio": None, "alergenos": None},
        ],
    },
    {
        "id": "bebidas",
        "titulo": "Bebidas",
        "platos": [
            {"nombre": "Vino, cerveza y café", "ingredientes": "",
             "foto": None, "alt": "", "precio": None, "alergenos": None,
             "pendiente": "Falta el detalle de bebidas (qué vinos, cervezas, cafés) y sus precios."},
        ],
    },
]

ALERGENOS = {
    "gluten": "Gluten",
    "crustaceos": "Crustáceos",
    "huevo": "Huevo",
    "pescado": "Pescado",
    "cacahuetes": "Cacahuetes",
    "soja": "Soja",
    "lacteos": "Lácteos",
    "frutos-cascara": "Frutos de cáscara",
    "apio": "Apio",
    "mostaza": "Mostaza",
    "sesamo": "Sésamo",
    "sulfitos": "Sulfitos",
    "altramuces": "Altramuces",
    "moluscos": "Moluscos",
}

# ------------------------------------------------------------
#  PREGUNTAS FRECUENTES (página de reservas)
#  confirmada=True: entra en los datos para Google (FAQPage).
# ------------------------------------------------------------
FAQ = [
    {"p": "¿Dónde está Da Mimì?",
     "r": "En el Blvr. Louis Pasteur, 15, en Teatinos-Universidad (29010 Málaga).",
     "confirmada": True},
    {"p": "¿Qué tipo de pizza hacéis?",
     "r": "Pizza napolitana: masa montada a mano y borde alto y aireado.",
     "confirmada": True},
    {"p": "¿Hacéis pedidos a domicilio?",
     "r": "Sí, a través de Glovo y Just Eat.",
     "confirmada": True},
    {"p": "¿Cómo reservo mesa?",
     "r": "Llamando por teléfono al restaurante. No hay reserva online.",
     "confirmada": False, "pendiente": "Falta confirmar el teléfono bueno."},
    {"p": "¿Tenéis terraza?",
     "r": "Hay mesas fuera.",
     "confirmada": False, "pendiente": TERRAZA_PENDIENTE},
    {"p": "¿Tenéis opciones sin gluten o para alergias?",
     "r": "Todavía no tenemos la información de alérgenos de cada plato. Avisa de cualquier alergia o intolerancia al pedir.",
     "confirmada": False, "pendiente": "Falta la carta oficial con alérgenos y saber si hay opciones sin gluten."},
]

# Lo que falta para publicar (sale en un bloque solo en modo borrador).
PENDIENTES_GENERALES = [
    "Carta oficial con precios y alérgenos.",
    "Horario confirmado.",
    "Teléfono bueno (951 70 55 35 o 951 20 34 54).",
    "Enlaces de Glovo y Just Eat.",
    "Si tienen WhatsApp.",
    "Logo vectorial.",
    "Fotos del local, de la terraza y del equipo.",
    "Su historia (entrevista).",
    "Razón social, NIF y correo para aviso legal, privacidad y cookies.",
    "Dominio.",
]

PREGUNTAS_ENTREVISTA = [
    "¿Quién es Mimì?",
    "¿En qué año abristeis?",
    "¿De qué parte de Italia viene vuestra cocina?",
    "¿Cómo hacéis la masa y qué horno usáis?",
    "¿Qué producto traéis de Italia?",
]

# Datos legales (aviso legal, privacidad, cookies). None = pendiente.
LEGAL = {
    "razon_social": None,
    "nif": None,
    "email": None,
    "registro": None,  # Datos registrales, si es una sociedad
}
