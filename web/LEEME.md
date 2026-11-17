# Web de QAWA: cómo funciona y cómo cambiarla

Es una web de archivos normales (HTML, CSS e imágenes). No hace falta instalar nada ni "compilar": se sube tal cual a Hostinger.

## Qué hay en cada carpeta

| Carpeta o archivo | Qué es |
|---|---|
| `index.html` | Portada en español |
| `carta/`, `historia/`, `cafe-en-grano/`, `visitanos/` | Páginas en español (cada una con su `index.html`) |
| `en/` | Las mismas páginas en inglés: `en/menu/`, `en/our-story/`, `en/coffee-beans/`, `en/visit-us/` |
| `aviso-legal/`, `privacidad/`, `cookies/` (y `en/legal-notice/`, `en/privacy/`, `en/cookies/`) | Textos legales, **provisionales** |
| `404.html` | Página que sale si alguien escribe una dirección que no existe |
| `css/estilos.css` | Todos los colores, tipos de letra y medidas. Un solo archivo para toda la web |
| `fuentes/` | Tipografías Gloock, Outfit y Amiri, alojadas aquí (no se cargan de Google, por el RGPD) |
| `img/` | Fotos en formato WebP en varios tamaños, y la imagen para compartir en redes |
| `sitemap.xml`, `robots.txt` | Para Google |
| `.htaccess` | Configuración de Hostinger (página 404 y caché). Es un archivo oculto: no lo borréis |

## Cambiar un precio de la carta

1. Abre `carta/index.html` con un editor de texto (por ejemplo, VS Code o el editor de archivos de Hostinger).
2. Busca el producto (Ctrl+F). Verás algo así:
   `<span>Cappuccino</span> … <span class="precio">3,00 €</span>`
3. Cambia solo el número. En español: `3,50 €`. En inglés (`en/menu/index.html`): `€3.50`.
4. **Haz el mismo cambio en la versión inglesa.**
5. Si el producto sale también en la portada o en «Visítanos» (cappuccino, iced matcha latte con fresas, tostada de huevos revueltos), cámbialo también allí. Están marcados con el comentario `PRODUCTOS DESTACADOS`.

Para añadir un producto, copia un bloque `<li>…</li>` entero de la carta y cambia nombre y precio.

## Antes de publicar (obligatorio)

Todo lo marcado como de ejemplo **no se puede publicar como real**:

- [ ] Carta y precios reales de QAWA (ahora son inventados).
- [ ] Tostador y cafés en grano reales (sustituir «Arrayán», que es inventado).
- [ ] Confirmar la historia del nombre con QAWA.
- [ ] Confirmar dirección y horario (salen de su ficha de Google).
- [ ] Teléfono: añadirlo en los datos para Google de la portada (`index.html` y `en/index.html`, busca `PENDIENTE`).
- [ ] Aviso legal y privacidad: razón social, NIF, domicilio y correo (busca `PENDIENTE`). Revisarlo con una asesoría.
- [ ] Dominio: buscar `DOMINIO-PENDIENTE` en **todos** los archivos y cambiarlo por el dominio real (por ejemplo `https://www.ejemplo.es`, sin barra final).
- [ ] Logotipo en buena calidad (ahora el icono «Q» sale de una captura).
- [ ] Cuando todo sea real: borrar la franja «Demo» de cada página (busca `FRANJA DEMO`) y cambiar el texto «Demo con contenido de ejemplo» del pie.

## Cosas que se han decidido

- **Sin cookies.** No hay analítica ni mapa incrustado: el botón «Cómo llegar» abre Google Maps. Así no hace falta banner de cookies. Si algún día se añade analítica, hará falta banner con «Aceptar» y «Rechazar» al mismo nivel.
- **Sin las cifras de la portada** («12 cafés en carta», etc.) que aparecían en el diseño: el kit indica que ya no se usan y salían de la carta de ejemplo.
- Las fotos no se han ampliado ni retocado: solo se han convertido a WebP y reducido de tamaño.

## Subirla a Hostinger

1. Entra en el panel de Hostinger → Administrador de archivos → carpeta `public_html` del dominio.
2. Sube **el contenido** de esta carpeta `web/` (no la carpeta en sí), incluido el archivo oculto `.htaccess`.
3. Abre el dominio y prueba el cambio de idioma y los botones.

## Verla en el ordenador antes de subirla

Al abrir los archivos con doble clic, los enlaces a carpetas (por ejemplo «Carta») no siempre funcionan. Para verla bien, en VS Code instala la extensión «Live Server» y pulsa «Go Live», o pídele a Claude Code que la arranque.
