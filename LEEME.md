# Web de Taberna la New · Guía para mantenerla

Esta guía es para personas que **no programan**. Solo necesitas un editor de texto:
- En el ordenador: el Bloc de notas sirve, pero es mejor **Visual Studio Code**, que es gratis.
- En el hosting: el editor del propio administrador de archivos.

> **Regla de oro:** casi todo lo que vas a cambiar está en la carpeta **`datos/`**. No toques `css/` ni `js/` salvo que sepas lo que haces.

## Qué hay en cada carpeta

| Carpeta / archivo | Para qué sirve | ¿Lo tocas? |
|---|---|---|
| `datos/carta.js` | Platos, precios, secciones, platos estrella | ✅ Sí |
| `datos/horario.js` | Horario de apertura | ✅ Sí |
| `datos/contacto.js` | Teléfono, dirección, redes, enlace de reseñas | ✅ Sí |
| `datos/resenas.js` | Reseñas de Google que se muestran | ✅ Sí |
| `img/` | Fotos ya optimizadas que usa la web | Solo para cambiar fotos |
| `index.html` | La página principal | Muy poco (ver más abajo) |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Textos legales | Al completar los datos del titular |
| `css/estilos.css` | Diseño. Los colores y las fuentes están arriba del todo | ❌ No |
| `js/main.js` | Lógica de la web | ❌ No |
| `fotos-originales/` | Fotos de partida. **No se suben al hosting** | — |
| `herramientas/` | Script para preparar fotos. **No se sube al hosting** | — |

---

## 1. Cómo cambiar un precio o añadir un plato

Abre **`datos/carta.js`**. Cada plato es una línea así:

```js
{ nombre: "Croquetas caseras (6 uds)", precios: ["10,5"], alergenos: [] },
```

**Cambiar un precio:** cambia solo el número entre comillas. Usa coma para los decimales, como en la carta. La web lo muestra automáticamente como "10,50 €".

```js
precios: ["10,5"]   →   precios: ["11"]
```

**Plato con dos precios** (como la ensaladilla): `precios: ["3,9", "7,9"]`

**Añadir un plato:**
1. Copia una línea entera de un plato de la misma sección, desde `{` hasta `},`.
2. Pégala justo debajo.
3. Cambia el nombre y el precio.
4. Comprueba que **todas las líneas terminan en coma**, menos la última de cada sección (que también puede llevarla).

**Quitar un plato:** borra su línea entera.

**Otras opciones de un plato:**
- `vegetariano: true` hace que salga la hojita verde.
- `estrella: 3` hace que salga en "Platos estrella" en la posición 3. Si además tiene foto, sale grande.
- `alergenos: ["gluten", "huevos"]` muestra los iconos de alérgenos. Los nombres válidos están al principio del archivo.

**Servicio y pan:** al final del archivo, en `servicioPan: "1"`.

⚠️ Si después de editar la carta desaparece entera, casi seguro falta una coma, unas comillas o una llave. Deshaz el último cambio y revísalo.

---

## 2. Cómo cambiar una foto

**Opción fácil, para sustituir una foto existente:**
1. Prepara la foto nueva en formato JPG, con la misma orientación (vertical u horizontal).
2. Ve a [squoosh.app](https://squoosh.app), una herramienta gratuita de Google. Redúcela a 800 px de ancho y guárdala en JPG y en WebP.
3. En la carpeta `img/`, sustituye los archivos con **el mismo nombre**. Por ejemplo, `salon-800.jpg` y `salon-800.webp`. Haz lo mismo con los otros tamaños (`-480` y `-1200`) o copia la misma foto con esos nombres.

**Opción completa** (si tienes Python instalado o ayuda de alguien técnico):
1. Mete la foto original en `fotos-originales/`.
2. En `herramientas/optimizar_fotos.py`, en la lista `FOTOS`, cambia el nombre del archivo. Si la foto ya no es una captura, pon `None` en la caja de recorte.
3. Ejecuta `python3 herramientas/optimizar_fotos.py`. Genera todos los tamaños y formatos.

**Fotos de los platos estrella:** en `datos/carta.js`, el campo `foto: "huevos-rotos"` indica qué foto usa cada plato. `fotoAlt` es la descripción para personas ciegas y para Google: descríbela en una frase.

**Importante:** usa solo fotos del restaurante o fotos con permiso por escrito de su autor.

---

## 3. Cómo cambiar el horario

Abre **`datos/horario.js`**. Cada día tiene sus turnos:

```js
{ dia: "Lunes", turnos: [["12:00", "16:00"], ["20:00", "24:00"]] },
```

- **Cambiar una hora:** edita los números. Medianoche se escribe `"24:00"`.
- **Un solo turno:** `turnos: [["13:00", "17:00"]]`
- **Día cerrado:** `turnos: []`
- Cuando el local confirme el horario, cambia `pendienteConfirmar: true` por `false` para que desaparezca el aviso amarillo.

Este archivo alimenta la tabla de horario, el pie de página **y los datos que lee Google**. Solo hay que cambiarlo aquí.

> Recuerda cambiar también el horario en tu **Perfil de Empresa de Google**. Los dos tienen que coincidir.

---

## 4. Cómo subir la web al hosting (p. ej. Hostinger)

1. Entra en el panel del hosting → **Administrador de archivos**.
2. Abre la carpeta **`public_html`**.
3. Sube estas carpetas y archivos **tal cual**:
   - `index.html`, `aviso-legal.html`, `privacidad.html`, `cookies.html`
   - `css/`, `js/`, `datos/`, `img/`, `fuentes/`
   - `favicon.ico`, `favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png`
   - `robots.txt`, `sitemap.xml`
4. **No subas** `fotos-originales/`, `herramientas/`, `LEEME.md` ni `PENDIENTES.md`.
5. Activa el **certificado SSL** (https). En Hostinger es gratis y está en el panel.
6. Abre la web en el móvil y comprueba que se ve bien.

**Para actualizar algo después:** sube solo el archivo que hayas cambiado (por ejemplo `datos/carta.js`) y sustituye el anterior. Si no ves el cambio, recarga la página con Ctrl + F5 (o cierra y abre el navegador del móvil).

### Antes de publicar por primera vez: el dominio

Cuando tengáis el dominio (por ejemplo `tabernalanew.es`), haz **Buscar y reemplazar** de `https://DOMINIO-POR-CONFIRMAR` por la dirección real (con `https://` y sin barra final) en estos archivos:
- `index.html` (aparece 3 veces)
- `robots.txt`
- `sitemap.xml`
- `datos/contacto.js` (campo `dominio`)

Después, en **Google Search Console** (gratis), añade la web y envía el `sitemap.xml`.

---

## Cosas que conviene saber

- **El nombre, la dirección y el teléfono** tienen que estar escritos **exactamente igual** en la web, en Google Maps, en Instagram y en cualquier directorio. Esto es clave para el SEO local.
- Lo que aparece en **amarillo con borde de rayas** en la web son datos pendientes. La lista completa está en `PENDIENTES.md`.
- La web no usa cookies. El mapa de Google solo se carga si el visitante pulsa "Ver mapa".
