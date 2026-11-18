# PENDIENTES · 11N Brasserie

Todo lo que hay que confirmar con el local antes de publicar. En la web, lo pendiente aparece **en amarillo con borde de rayas**. Cuando resuelvas un punto, márcalo con `[x]`.

## 🔴 Bloqueantes: no publicar sin resolverlos

- [ ] **Permiso escrito del dueño para usar las fotos de su Instagram** en la web (interior, vasos burbuja, cafés, brunch, pumpkin spice, galletas). Lo ideal es que nos pase los **archivos originales**: las actuales son capturas de pantalla recortadas.
- [ ] **Foto de la clienta con el matcha** (`img/chica-matcha-*`): el prompt dice que hay consentimiento. Guardarlo por escrito (captura del mensaje). Si no lo hay, se quita.
- [ ] **Datos del titular** para los textos legales: nombre y apellidos o razón social, NIF/CIF, domicilio fiscal, email y, si es sociedad, datos registrales → `aviso-legal.html` y `privacidad.html`.
- [ ] **Revisión de los textos legales** por el titular (y, si puede ser, por un profesional). Son una estructura base, no asesoramiento legal.
- [ ] **Dominio**: sustituir `https://DOMINIO-POR-CONFIRMAR` en todos los `.html`, `robots.txt` y `sitemap.xml` (ver README).
- [ ] **Alérgenos**: la información de los 14 alérgenos es obligatoria (Reglamento UE 1169/2011 y Real Decreto 126/2015). Hay que pedírsela al local. Ahora la carta dice "consulta al personal" y lleva un aviso `[COMPLETAR]`.

## 🟡 Precios y carta (`data/menu.js`)

- [ ] **¿Los precios incluyen IVA?** La carta de la web dice "Precios en euros [VERIFICAR: IVA incluido]".
- [ ] **Cheesecake casera de fresa**: 4,50 € en la carta española y 6,00 € en la inglesa. Ahora sale 4,50 € con aviso.
- [ ] **Fuze Tea**: la carta inglesa incluye el sabor frutos rojos y la española no.
- [ ] **Café Latte Español**: la carta (foto de Google Maps) dice "Leche y espresso". El prompt decía "con leche condensada". En la web se ha puesto lo que pone la carta.
- [ ] **Matcha de Plátano**: en inglés se ha llamado "Banana Bread Matcha", como en el prompt. La carta española dice "espuma de plátano". Confirmar el nombre.
- [ ] **Textos en inglés**: son una traducción provisional. Compararlos con la carta inglesa del local.
- [ ] **Best sellers**: son los 4 que llevan el sello "best seller" en la carta física (Iced Matcha Avena & Vainilla, Pink Matcha, Matcha de Plátano y Matcha Coco & Mango). Confirmar si hay más.
- [ ] La carta se tomó de las fotos de Google Maps (publicadas "hace 3 semanas" el 18/11/2026). Repasarla entera con el local.

## 🟡 Datos del negocio (`data/local.js`)

- [ ] **Vacaciones**: del 17 de noviembre al 8 de diciembre de 2026, ambos incluidos. ¿Siguen cerrados el 8 (festivo) o ya abren? La web dice ahora "Volvemos el miércoles 9 de diciembre".
- [ ] **Nota de Google**: 4,4 ★ con 135 reseñas (dato de noviembre de 2026). Actualizarla de vez en cuando.
- [ ] **Enlace para dejar reseña**: Perfil de Empresa de Google → "Pedir reseñas" (es lo que lleva el QR de su carta) → `enlaceResena`. Mientras tanto, el botón lleva a la ficha de Google Maps.
- [ ] **Reservas**: ¿aceptan? La web no dice nada.
- [ ] **Wifi, enchufes y zona de estudio**: no se anuncian hasta confirmarlo.
- [ ] **Terraza**: en las fotos se ve una terraza con mesas, pero no se anuncia hasta confirmarlo.
- [ ] **Email de contacto** (para la política de privacidad y los derechos de protección de datos).
- [ ] **Hosting**: ¿Hostinger u otro? (también hay que ponerlo en la política de privacidad).

## 🟡 Contenido

- [ ] **Historia de la marca** (`visitanos.html`): qué significa "11N", quién está detrás y por qué el matcha. *Pista:* el 7 de noviembre publicaron en Instagram "Noviembre es nuestro mes 🤍 pronto te diremos cómo". ¿Tiene que ver con el 11 de noviembre? **Preguntarlo, no suponerlo.**
- [ ] **Cómo llegar**: líneas de bus y paradas cercanas, aparcamiento (`visitanos.html`).
- [ ] **Reseñas reales**: 2–3 reseñas de Google copiadas tal cual, con el nombre como aparece, y mejor con permiso (`index.html`, sección "Lo que dice la gente"). No inventarlas.
- [ ] **Encargos** (`encargos.html` y `js/encargos.js`):
  - Qué se puede encargar exactamente.
  - Antelación mínima. Ahora está en 1 día (`ANTELACION_DIAS = 1`).
  - Precios o rangos de precio.

## 🟡 Fotos

- [ ] **Fachada** y **barra**: no hay fotos propias. Ahora hay un hueco con forma de arco que dice `[FOTO PENDIENTE]`.
- [ ] **Torre de croissants con flores**, para la página de encargos: no estaba entre las fotos recibidas. Hueco en `encargos.html`. En la home se ha usado la foto de las galletas.
- [ ] La foto de los **vasos burbuja** lleva escrito "ube latte", y el ube latte **no está en la carta**. Solo se usa en la cuadrícula de Instagram. Confirmar si lo sirven o cambiar la foto.
- [ ] **No se han usado** las fotos del interior subidas por clientes a Google Maps (Ana Miranda y Vivienne Lee): pertenecen a quien las hizo. Si el local quiere esas vistas (sofá curvo con ventanal), que haga sus propias fotos.

## Después de publicar

- [ ] Activar el **SSL** (https) en Hostinger y descomentar la redirección a https en `.htaccess`.
- [ ] Dar de alta la web en **Google Search Console** y enviar `sitemap.xml`.
- [ ] Poner el enlace de la web en el **Perfil de Empresa de Google** y en la **bio de Instagram**.
- [ ] Probar los datos estructurados en https://search.google.com/test/rich-results
- [ ] Pasar **Lighthouse** con la web ya publicada. En local (sin compresión del servidor) dio: rendimiento 92–97, y accesibilidad, buenas prácticas y SEO 100 en las 5 páginas principales.
