# Web de 11N Brasserie · guía rápida

Web estática (HTML, CSS y JavaScript sin frameworks) de **11N Brasserie**, cafetería y matcha bar en Teatinos (Málaga). No necesita servidor ni base de datos.

> Lo que falta confirmar con el local está en **`PENDIENTES.md`** y aparece en la web en amarillo.

## Qué hay en cada sitio

| Archivo / carpeta | Para qué sirve | ¿Lo tocas? |
|---|---|---|
| `data/menu.js` | Toda la carta: platos, precios, descripciones ES/EN, etiquetas | ✅ Sí |
| `data/local.js` | Horario, vacaciones, teléfono, nota de Google, enlace de reseñas | ✅ Sí |
| `index.html`, `carta.html`, `matcha-bar.html`, `encargos.html`, `visitanos.html` | Las páginas | Poco |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Textos legales | Al completar los datos del titular |
| `css/styles.css` | Diseño. Colores y fuentes arriba del todo, en `:root` | ❌ Mejor no |
| `js/` | Lógica (estado abierto/cerrado, carta, quiz, encargos) | ❌ No |
| `img/`, `fonts/` | Fotos optimizadas y fuentes | Solo para cambiar fotos |
| `fotos-originales/`, `herramientas/` | Capturas de partida y script de fotos. **No se suben al hosting** | — |

## 1. Ver la web en tu ordenador

- **Rápido:** haz doble clic en `index.html`. Funciona en Chrome y Edge. En Firefox puede que no carguen las fuentes.
- **Recomendado** (se ve exactamente como en internet): abre una terminal en esta carpeta y escribe:
  ```
  python3 -m http.server 8000
  ```
  Después abre `http://localhost:8000` en el navegador. También sirve la extensión *Live Server* de Visual Studio Code.

## 2. Cambiar un precio

Abre `data/menu.js`, busca el plato (Ctrl + F) y cambia el número de `precio`. **Usa punto para los decimales:**

```js
{ cat: "matcha", grupo: "Signature", nombre: "Pink Matcha", ... precio: 7.5, ... },
                                                              ↑ 7.5 = 7,50 €
```

- **Añadir un plato:** copia una línea entera de la misma sección (desde `{` hasta `},`), pégala debajo y cambia los datos.
- **Quitar un plato:** borra su línea.
- **Etiquetas:** `frio: true`, `caliente: true`, `vegetal: true` (se puede pedir con leche vegetal) y `best: true` (best seller). Salen en los filtros de la carta y en el quiz.
- Si un plato tiene descripción, sale como **tarjeta que gira**. Si no la tiene, sale en una **lista con puntitos**, como en la carta física.

⚠️ Si después de editar desaparece la carta entera, casi seguro falta una coma, unas comillas o una llave. Deshaz el último cambio.

## 3. Cambiar el horario o las vacaciones

Abre `data/local.js`:

```js
vacaciones: [
  { desde: "2026-11-17", hasta: "2026-12-08" }
]
```

- Las fechas van en formato `AAAA-MM-DD` y los dos días están incluidos.
- Para varias vacaciones, añade otra línea `{ desde: ..., hasta: ... },`.
- Durante las vacaciones aparece un banner arriba en toda la web, la pastilla dice "Closed · de vacaciones" y el formulario de encargos no deja elegir esos días.
- **Horario:** `horario` va de `0` (domingo) a `6` (sábado). `[]` significa cerrado.
- Si cambias el horario, cámbialo también en el `<script type="application/ld+json">` de `index.html` y `visitanos.html` (es lo que lee Google) y en tu **Perfil de Empresa de Google**.

## 4. Subir la web a Hostinger

1. Entra en hPanel → **Administrador de archivos** → carpeta **`public_html`**.
2. Sube **todo** el contenido de esta carpeta **excepto** `fotos-originales/`, `herramientas/`, `README.md` y `PENDIENTES.md`. Incluye el archivo oculto `.htaccess` (activa la compresión y la caché).
3. Activa el **SSL gratuito** en el panel. Cuando funcione `https://`, descomenta las 3 últimas líneas de `.htaccess` para forzar https.
4. Antes de publicar, haz **Buscar y reemplazar** de `https://DOMINIO-POR-CONFIRMAR` por el dominio real (con `https://` y sin barra final) en todos los `.html`, `robots.txt` y `sitemap.xml`.
5. Abre la web en el móvil y comprueba que todo se ve bien.

**Para actualizar algo después:** sube solo el archivo que hayas cambiado (por ejemplo `data/menu.js`). Si no ves el cambio, recarga con Ctrl + F5.

## Decisiones técnicas (por si alguien pregunta)

- **Sin cookies ni analítica** → no hace falta banner de cookies. Si algún día se añade Google Analytics, hará falta banner y actualizar `cookies.html`.
- **Fuentes alojadas en la propia web** (Cormorant Garamond, DM Serif Display y Jost, licencia SIL OFL, en `fonts/`). No se conecta a Google Fonts, que envía la IP del visitante a Google.
- **El mapa de Google solo se carga si el visitante lo pide**, así que tampoco instala cookies de Google sin permiso.
- **El formulario de encargos no envía datos a ningún servidor.** Prepara el mensaje y abre WhatsApp.
- Accesible con teclado y lector de pantalla, con contraste AA. Las animaciones se pueden pausar y se apagan si el sistema tiene activado "reducir movimiento".
