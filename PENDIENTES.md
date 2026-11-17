# PENDIENTES · Taberna la New

Lista de todo lo que falta confirmar antes de publicar. En la web, lo pendiente aparece **en amarillo con borde de rayas**. Cuando completes un punto, márcalo con `[x]`.

## 🔴 Bloqueantes: no publicar sin resolverlos

- [ ] **Fotos de clientas sin permiso.** En "Platos estrella" se usan dos fotos subidas a Google Maps por clientas:
  - *Flor de alcachofas*: foto de **María Márquez Torres** → `img/alcachofas-*`
  - *Fideos tostados*: foto de **Carolina R.** → `img/fideos-tostados-*`

  Publicarlas sin su permiso infringe sus derechos de autor (Ley de Propiedad Intelectual, art. 17) y las condiciones de Google Maps. **Opciones:** (a) pedirles permiso por escrito, por ejemplo respondiendo a su reseña o por mensaje, y mantener el crédito; o (b) sustituirlas por fotos propias del local. Si se sustituyen, quita el campo `credito` en `datos/carta.js`.
- [ ] **Dirección exacta** (calle, número y código postal), copiada **tal cual** de la ficha de Google → `datos/contacto.js`
- [ ] **Nombre en Google.** La ficha de Google Maps lo escribe "Taberna **l**a New" (con *l* minúscula) y el logo "TABERNA LA NEW". La web usa ahora "Taberna la New", igual que Google. Decidid una forma y usadla igual en todas partes: Google, Instagram, web y directorios.
- [ ] **Dominio** → sustituir `https://DOMINIO-POR-CONFIRMAR` (ver LEEME, apartado 4)
- [ ] **Datos del titular para los textos legales:** razón social, CIF, domicilio y datos registrales → `aviso-legal.html` y `privacidad.html`
- [ ] **Revisión de los textos legales por el titular.** Son una estructura base, no asesoramiento legal.
- [ ] **Precios y platos.** La foto de la carta tiene unos 8 meses. Hay que repasar la carta completa con el local.

## 🟡 Datos del negocio

- [ ] Horario: confirmar "todos los días de 12:00 a 16:00 y de 20:00 a 24:00" → `datos/horario.js` (después, poner `pendienteConfirmar: false`)
- [ ] Número de reseñas en Google → `datos/contacto.js` (`numeroResenas`)
- [ ] Enlace para dejar reseña: Perfil de Empresa de Google → "Pedir reseñas" → `datos/contacto.js` (`enlaceResena`). *Mientras tanto, el botón lleva a la ficha de Google Maps.*
- [ ] Coordenadas (latitud y longitud) desde Google Maps → `datos/contacto.js`. Mejoran los datos para Google.
- [ ] Facebook: ¿existe la página? Enlace → `datos/contacto.js`
- [ ] WhatsApp: ¿se puede reservar por WhatsApp con el 611 672 197? → `datos/contacto.js`
- [ ] Hosting: ¿Hostinger u otro?
- [ ] Ezequiel: ¿quiere salir en la web con foto y nombre? ¿Apellido? (En el cartel del local hay una firma que no se lee bien; no se ha usado.) → `index.html`, sección "La casa"
- [ ] Grupos: capacidad máxima y si hay menú de grupo → `index.html`, sección "Grupos"

## 🟡 Carta

- [ ] **Platos estrella:** confirmar con el local cuáles son. Ahora mismo: huevos rotos, setas con langostinos, ensalada templada, flor de alcachofas, fideos tostados, tartar de atún y flamenquín. Se cambian con `estrella:` en `datos/carta.js`.
- [ ] [VERIFICAR] "Ensaladilla rusa con tartar…": ¿es tartar **de atún**? (no se leía en la foto)
- [ ] [VERIFICAR] "Presa ibérica a la…": ¿**a la brasa**? (no se leía en la foto)
- [ ] **Platos con dos precios** (Ensaladilla rusa 3,9 / 7,9 · Lomo de orza 4,5 / 8,5 · Carrillada 5,5 / 10,2): ¿qué significa cada precio? ¿Media y entera? ¿Pincho y plato? El prompt dice que hay un solo tamaño, pero la carta física muestra dos precios. Ahora salen como "3,90 € / 7,90 €", sin explicación.
- [ ] La foto de "gambas y setas con tenedor" se ha asignado a **Setas de temporada con espárragos y langostinos**. Confirmar que es ese plato.
- [ ] **Alérgenos:** pedir al local la información de los 14 alérgenos de cada plato. Es obligatoria (Reglamento UE 1169/2011 y Real Decreto 126/2015). Rellenar `alergenos: [...]` en `datos/carta.js`. Mientras tanto, se muestra el aviso "Si tienes alguna alergia o intolerancia, consulta a nuestro equipo."

## 🟡 Fotos

- [ ] **Pedir al local las fotos originales.** Las actuales son capturas de pantalla recortadas de Instagram y Google Maps (máximo unos 1.000–1.600 px de ancho). Se ven bien, pero las originales mejorarán la nitidez.
- [ ] La foto de las **ostras** está en la galería del local, pero las ostras **no están en la carta**. ¿Las sirven habitualmente, por encargo o fue algo puntual? Si no se sirven, conviene quitarla para no generar expectativas.
- [ ] Foto de la **terraza**: no hay ninguna propia. Ahora hay un hueco de texto.
- [ ] Foto de la **sala completa** o del botellero con más luz (opcional).

## 🟡 Opiniones

- [ ] Copiar 3–4 **reseñas reales** de Google, con el texto literal y el nombre tal como aparece → `datos/resenas.js`. No editarlas ni inventarlas.

## Después de publicar

- [ ] Dar de alta la web en Google Search Console y enviar el `sitemap.xml`
- [ ] Poner el enlace de la web en el Perfil de Empresa de Google y en la biografía de Instagram
- [ ] Probar el JSON-LD en https://search.google.com/test/rich-results
- [ ] Pasar Lighthouse con la web ya publicada (ver el informe de revisión)
