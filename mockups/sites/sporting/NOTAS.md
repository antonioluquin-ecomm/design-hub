# Notas — Maqueta del sitio Sporting

## Estado

Kickoff hecho 2026-07-16. Fuente: `https://www.sporting.com.ar/` navegado en vivo (home). Es un sitio VTEX IO (clases `vtex-*` en el DOM).

Identidad propia capturada con `getComputedStyle` y lectura de DOM: verde institucional `#25b60c`, negro `#111111` (announcement bar), tipografía **Poppins**. Estilos en `sporting.css` — separados del design system interno, mismo criterio que `marketplace-portal/public` (no alinear al azul institucional sin confirmar).

**Herramienta disponible desde 2026-07-18:** cuando el scraping en vivo automatizado no llega a medir un módulo (lazy-load que no monta, secciones que no aparecen pese a scrollear), el usuario puede correr el bookmarklet `layout-inspector` (`../../../../vtex-bookmarklets/layout-inspector/`) en su propio navegador y pasar el JSON resultante acá — ver el fix de "Elegí viendo" (2026-07-18) más abajo como ejemplo del flujo completo. Ver `../../CLAUDE.md` para el criterio general de uso.

### Revisión módulo por módulo 2026-07-16 — en curso

A pedido del usuario, se está revisando la home módulo por módulo contra el sitio real (no solo "a ojo", sino con `getBoundingClientRect`/`getComputedStyle` en vivo) para llegar a fidelidad exacta, no aproximada. Se va dejando registro acá por módulo a medida que se confirma.

**Topline (barra negra superior) — confirmado:**
- Sin padding horizontal: el logo W WOKER queda en `left:0` y "Segui tu pedido" en el borde derecho exacto de la franja (`right` = ancho total), no a 28px del borde como tenía la maqueta. Se dejó un padding chico (10px) a cada punta como aproximación razonable ya que el logo real es una imagen (con margen interno propio que no podemos medir) y acá se representa como texto.
- Alto real de la franja: ~37px.
- El mensaje promocional central es **bold** (700), el link "Ver términos" dentro es weight 400 subrayado.
- "Segui tu pedido ⬅" es weight 600, **sin** subrayado (no es un link subrayado como el resto).

**Header-full (fila verde) — confirmado:**
- Padding horizontal real ~32px (no 28), alto ~72px.
- Logo: `left:32, width:150`. Buscador: `left:285, width:552, height:44, border-radius:6px` (rectángulo redondeado, **no** píldora — la maqueta tenía `border-radius:24px`, mal).
- Gaps medidos: logo→buscador 103px, buscador→ubicación 66px, ubicación→"Entrar" 64px, "Entrar"→ícono wishlist 0px (pegados), wishlist→carrito 10px.
- **"Entrar" es gris** (`rgb(151,152,153)` / `#979899`), no blanco como tenía la maqueta — llamativo tratándose de texto sobre fondo verde, pero así está confirmado por `getComputedStyle`.
- Se fijó el logo a `width:150px` (en vez de auto por el texto "SPORTING") para que los gaps posteriores anclen en la posición absoluta real — con eso el buscador cae exactamente en `left:285` como el sitio real. La posición de ubicación/Entrar/iconos queda ~13-17px corrida por la diferencia de ancho entre nuestro texto de ubicación y el real (166px vs ~147px), diferencia menor que no vale la pena perseguir pixel a pixel.

**Navbar (fila blanca de categorías) — confirmado:**
- Gap real entre **todos** los items (las 8 categorías + los 2 badges finales) es parejo: 32px (no 26). Font-size 14px (no 13), alto de fila 46px — coincide exacto en la maqueta ahora.
- El sitio real usa `justify-content:center` en la lista, pero el "centrado" queda roto por varios links del mega-menú con ancho 0 que igual cuentan para el cálculo — el resultado visual real es un bloque compacto corrido bien a la izquierda (las categorías arrancan en `x:145` de un contenedor de 1265px, y el último badge termina en `x:960`, dejando ~305px vacíos a la derecha; no está centrado a pesar del CSS). Se decidió alinear todo a la izquierda con el mismo padding de 32px que el resto del header en vez de imitar ese corrimiento accidental — da un resultado más prolijo y consistente, y el efecto visual (bloque compacto, no estirado a los bordes) es el mismo.
- Corregido un bug propio: los 2 badges finales (`ADIDAS`/`EVENTO`) tenían `margin-left:auto`, que los empujaba al borde derecho de la fila — el real los tiene pegados al resto de la lista (mismo gap de 32px después de Novedades), no separados al extremo opuesto.

**Slider principal — confirmado, con 2 correcciones importantes de diseño:**
- Las flechas van superpuestas en la imagen (eso ya estaba bien), pero son **rectángulos redondeados negro semitransparente** (`rgba(0,0,0,.6)`, radius 8px, ~31x35px) — la maqueta tenía círculos blancos, mal.
- Los **puntos de paginación NO van superpuestos en la imagen** — van en una fila aparte **debajo**, separados por `margin-top` (~10px). Son grises claro (`#cacbcc`) los inactivos y gris oscuro casi negro (`#333`) el activo, 10px cada uno, gap 18px. La maqueta los tenía overlay blancos sobre la imagen, mal en posición y en color.
- Imagen: `1265x296px`, sin bordes redondeados.

**Tira de cuotas/financiación — confirmado, cambio de diseño:**
- No es una tira continua con separadores verticales (así estaba maquetada) — son **tarjetas individuales con borde propio**: 296×122px, blancas, borde `1px solid #d2d2d2`, radius 6px, padding 16px, gap 12px entre tarjetas, ícono de banco (33×33) a la izquierda.
- El número grande y "Cuotas sin interés" van en **azul marino** (`#232b54`), no en el color de texto genérico del sitio. El sub-label (nombre del banco/condición) es negro 12px. "Ver legales" es azul marino subrayado (`#28345f`), no verde como el resto de los links del sitio.
- Es un carrusel real de 8 tarjetas (4 visibles a 1280px) — la maqueta muestra las 4 que entran, sin lógica de slide (mismo criterio que el resto de los carruseles).

**Categorías (Calzado/Indumentaria/Accesorios/Ofertas) — confirmado:**
- Tarjeta 294px de ancho, imagen 172px alto (no 160), sin fondo/radius propio (`background: var(--sp-bg)` y `border-radius:8px` que tenía la maqueta eran inventados — la tarjeta real no tiene ni uno ni otro).
- Título 18px bold negro centrado (no 16px). Botón "VER MÁS" verde con radius **3px** (no 6) y padding 13px 32px, font-size 16px (no 12.5px) — bastante más grande de lo que tenía la maqueta.
- Gap real entre tarjetas 16px, padding izquierdo de la fila ~21-22px — mismo criterio que la tira de cuotas, así que se overridea puntualmente el padding de `.sp-section` (32px 28px) para esta sección en vez de tocar la regla compartida.

**Carruseles de producto (Novedades / ⭐ Tienda Oficial Adidas / 🧭 Ultimas!!) — confirmado, un solo componente compartido (`.sp-carousel-row`/`.sp-carousel-arrow`/`.sp-carousel-track`):**
- Es un slick-carousel real. La flecha **no es un botón con círculo y borde** (así estaba maquetada) — es un caret fino sin fondo ni borde, ícono ~15x25 color `#111` (`--sp-black`), apoyado en el borde de la fila. A diferencia de las flechas del slider principal (que sí llevan círculo oscuro semitransparente porque están sobre una foto), estas van sobre fondo blanco así que no necesitan esa placa de contraste.
- **Sin paginación por puntos** en estos carruseles de producto (a diferencia del slider principal, que sí tiene) — se sacó `.sp-carousel-dots` de las 4 secciones que lo usan (Novedades, Tienda Oficial Adidas, Ultimas!!, Clubes y Selecciones) y también de `producto-modular.html` ("Productos similares" / "También te puede interesar"), que comparte el mismo componente.
- El espaciado real entre tarjetas del sitio muestra huecos de ~380px que parecen un artefacto de breakpoint del slick real (measurable pero no se ve así al ojo en un uso normal) — no se reprodujo, se dejó un gap prolijo estándar (16px) en su lugar. Mismo criterio ya aplicado: reproducir el diseño real, no bugs de implementación de un breakpoint puntual.
- Este componente es compartido por las 3 secciones del pedido + "Productos similares"/"También te puede interesar" de la PDP — al ajustar `.sp-carousel-arrow`/`.sp-carousel-dots` en `sporting.css` se corrigen todas a la vez, no hace falta repetir por sección.

**Disciplinas — confirmado por captura del usuario (el scraping en vivo no la renderizaba esa sesión):**
- **Es un carrusel** (flechas + puntos de paginación), no una grilla estática de 6 tarjetas fijas como estaba maquetada.
- El título de sección **no lleva el emoji 🏆** — era invención.
- Tarjeta sin fondo ni `border-radius` propio: label bold uppercase (15px) directamente arriba de la imagen sin caja, imagen simple con radius chico, lista de links (Hombre/Mujer/Niños/Ver Todo) abajo sin caja ni padding extra, en negro.
- Reusa el mismo componente `.sp-carousel-row`/`.sp-carousel-arrow` que Novedades/Adidas/Ultimas, más los puntos de paginación (`.sp-hero-dots`, mismo estilo gris/negro del slider principal — a diferencia de los carruseles de producto, esta sección sí tiene puntos).

**Nota de proceso:** esta sección (y "Elegí viendo"/"Ultimas!!"/"Clubes y Selecciones"/barra de beneficios) dejaron de aparecer en varios intentos de scraping en vivo en la misma sesión — recarga completa + scroll forzado con eventos de wheel, 6+ intentos, contenido cortaba siempre después del carrusel de Tienda Oficial Adidas y saltaba al footer. El usuario confirmó con captura de pantalla que la sección sí existe en el sitio real — el problema fue de la sesión de scraping (probablemente un lazy-load que no se disparó), no del sitio. **Para las secciones restantes (Elegí viendo/Ultimas/Clubes/beneficios) se van a pedir capturas al usuario en vez de forzar más reintentos automatizados.**

**"Elegí viendo" — reconstruido con capturas del usuario, era otro módulo completamente distinto:**
- **No son banners de categoría con botón "VER PRODUCTOS"** (así estaba maquetada) — es un **carrusel de video estilo Reels/TikTok**: tarjetas verticales 296×395 (aspect-ratio 3:4), con:
  - Arriba: avatar circular blanco "S" + nombre de cuenta "Sporting" + un caption corto por video (ej. "La camiseta que nos une", "🎾 Elegir la paleta justa" — algunos con emoji, otros no).
  - Centro: botón de play grande, rectángulo rojo redondeado (no círculo).
  - Abajo-izquierda: píldora verde "🛍 VER PRODUCTOS" (bastante más chica que un botón normal del sitio).
  - Abajo-derecha: marca de agua "S" semitransparente.
- Flechas de carrusel **oscuras semitransparentes** (mismo componente `.sp-hero-arrow` que el slider principal, por estar superpuestas sobre foto — NO el caret plano de los carruseles de producto).
- Paginación por puntos: **14 puntos**, gris inactivo / **verde** activo (no gris oscuro como el slider principal) — nuevo componente `.sp-video-dots`.

**Novedades / Tienda Oficial Adidas / Ultimas!! — corrección con capturas del usuario:**
- Cada tarjeta de producto **es igual a las de la PLP**: tiene su propio mini-carrusel de imágenes con flechas (`.sp-plp-card-nav`) y puntos (`.sp-plp-card-dots`) — se agregó ese mismo markup a las tarjetas de estas 3 secciones (antes no lo tenían).
- **El carrusel completo sí tiene paginación por puntos** (verde activo/gris inactivo, pocos puntos — 2 en la captura) — corrección sobre lo que se había concluido antes por inspección en vivo (que decía que no había puntos). Nuevo componente `.sp-shelf-dots`, no confundir con los puntos internos de cada tarjeta.
- Las tarjetas muestran chips/píldoras de estado ("Envío Gratis" outline verde, "Nuevo" sólido verde, "Tienda Adidas" sólido negro) entre las cuotas y el botón — nuevo componente `.sp-product-tags .tag`.

**⚽ Clubes y Selecciones de Fútbol — corrección con capturas del usuario (2 rondas):**
- Ronda 1: **NO es un carrusel de tarjetas de producto** (así estaba maquetada, con precio y "Seleccionar talle") — es una tira de logos/escudos, sin precio ni botón, con flechas de carrusel a los costados. Nuevo componente `.sp-club-logo`.
- Ronda 2 (el usuario marcó "ver bien a detalle"): los escudos reales tienen **forma variada** — los clubes argentinos (AFA, Boca, River, Independiente, Talleres) son escudo/shield, los internacionales de la segunda captura (Manchester City, AC Milan, Inter Miami) son circulares — no todos círculos uniformes de un solo color con solo texto, como había quedado. No se pueden reproducir los escudos reales (marcas registradas de cada club), así que se aproxima con placeholders de 84px (antes 90px) más compactos (gap 20px, antes 28px) y dos siluetas — `.sp-club-logo.shield` (escudo, esquinas superiores redondeadas + base en punta) y circular por default — en vez de forzar todo al mismo molde genérico.

**Barra de beneficios:** se le agregó un ícono circular arriba de cada título (camión/tarjeta/paquete), visible en la captura pero que no estaba en la maqueta.

### Corrección 2026-07-16 — Footer real (v1, INCOMPLETA — ver v2 abajo)

El footer original de la maqueta (barra "Envío gratis" + 3 columnas de links Ayuda/Sporting/Seguinos + copyright) era una **estructura genérica inventada**, nunca confirmada contra el sitio real (quedaba anotado en "Pendiente"). Se navegó en vivo `https://www.sporting.com.ar/zapatillas-adidas-runblaze-de-hombre-6ih6705-000/p` y se leyó el footer con `getComputedStyle`, concluyendo (mal, ver corrección de abajo) que el footer eran solo dos franjas sin columnas ni copyright.

### Corrección 2026-07-16 — Footer real (v2, la buena)

La lectura anterior se quedó corta: el contenido de abajo del footer es **lazy-load** (3 `vtex-render__lazy-container` sin montar) y un solo scroll-al-fondo con espera corta no alcanza para que termine de renderizar. Se repitió la captura forzando scroll incremental completo (ida y vuelta) tanto en home como en la PDP, y **sí** hay columnas y copyright. Estructura real completa, de arriba a abajo:

1. Banda verde (`--sp-green`, `rgb(37,182,12)`) — "Suscribite a nuestro newsletter" + input de email + botón "Enviar" (negro) + checkbox de opt-in.
2. Banda negra (`#111111`) — 4 columnas de links: **Nosotros** (Acerca de Nosotros, Sucursales, Contacto, Trabaja con Nosotros, Términos y Condiciones), **Información** (Como comprar, Medios de pago, Preguntas frecuentes, Guía de Talles, Politicas de envio/privacidad/cambio y devolución, Defensa del Consumidor, Blog Informativo, Mapa del Sitio), **Ayuda** (WhatsApp/teléfono de contacto, Cambios y devoluciones, Botón de Arrepentimiento, Gestión de Pedidos, Compra segura, Sugerencias y reclamos), **Seguinos** (Instagram, Facebook, Youtube, Twitter) — y debajo, línea de copyright "Sporting © | Todos los derechos reservados." (11px, blanco sobre negro).
3. ~~Banda gris clara (`#f0f0f0`) — "Términos más buscados" + lista numerada de 10 términos.~~ **Corregido más abajo (2026-07-16, "Footer real v3") — esto no es parte del footer, ver esa corrección.**

Se corrigieron las clases `.sp-footer-*` en `sporting.css` (se agregaron `.sp-footer-columns` y `.sp-footer-copyright`) y el markup en las 4 pantallas que usan `sporting.css` (`index.html`, `producto-modular.html`, y las dos snapshot históricas `producto-adidas.html`/`producto-sporting.html`, que comparten el mismo footer global aunque estén congeladas en su contenido de PDP).

**Lección para próximas capturas:** cuando el body/scrollHeight de una página VTEX no coincide con lo que se ve en el DOM, o el footer/final de página parece corto, forzar un scroll incremental completo (no solo `scrollTo(0, scrollHeight)` una vez) con esperas entre pasos antes de dar la captura por definitiva.

### Corrección 2026-07-16 — Footer real (v3): "Términos más buscados" NO es del footer

El usuario reportó que la franja "Términos más buscados" se veía en el footer de la PLP y que eso estaba mal — "no va en ninguna página, solo se muestra cuando se abre el buscador". Se navegó en vivo para confirmar antes de tocar nada:

- El elemento con el texto "Términos más buscados" existe en el DOM, pero su cadena de ancestros es `vtex-search-2-x-itemListTitle` → `vtex-search-2-x-itemList--top-search` → `vtex-search-2-x-history-and-top-wrapper` → `vtex-search-2-x-biggy-autocomplete` — es decir, es el **autocomplete/sugerencias del buscador** ("términos más buscados" al enfocar la caja de búsqueda), no el footer.
- Se confirmó por separado que el contenedor real del footer (`vtex-store-footer-2-x-footerLayout`) **no incluye ese texto en absoluto** quedando su contenido limitado a lo documentado en columnas 1 y 2 de arriba.
- La confusión original (v2) vino de capturar con `scrollTo` + `innerText` del `document.body` completo: como el autocomplete del buscador se renderiza en un portal en el DOM (no necesariamente donde visualmente aparece en pantalla), su texto quedó mezclado con el del footer real, que en ese momento también estaba a la vista por el scroll forzado.

**Fix:** se sacó `.sp-footer-terms`/`.sp-terms-title`/`.sp-terms-list` (markup + CSS) de las 5 pantallas que lo tenían — `index.html`, `plp.html`, `producto-modular.html`, `producto-adidas.html`, `producto-sporting.html` (incluidas las dos snapshot congeladas, porque esto era un error de chrome compartido, no un módulo de PDP). El footer real de todas las páginas termina en la línea de copyright (banda negra), sin tercera banda gris. No se maquetó el autocomplete del buscador — si se pide en el futuro, es un componente nuevo (`vtex-search-2-x-*`), no parte del footer.

### Corrección 2026-07-16 — Header real

El header de `index.html` (home) usaba un header **inventado**: barra verde con hamburger + logo + iconos, más un `.sp-announce` negro separado y una `.sp-locationbar` propia — nunca confirmado contra el sitio real. El header "completo" que ya usaban las PDP (`.sp-topline` + `.sp-header-full` + `.sp-navbar`) sí venía de una captura real, pero con datos inventados en el navbar (iconos ⚫🇦🇷 al final, sin "Adidas Seller", colores no confirmados).

Se navegó en vivo la home y la PDP y se leyó el header real con `getComputedStyle`/`getBoundingClientRect`. Confirmado: **el header es idéntico en todas las páginas del sitio** (mismo componente VTEX), 3 filas:

1. `.sp-topline` (negro): carrusel de banners promocionales (se simplifica a uno estático, como ya estaba) + link "Segui tu pedido ⬅" (sin acento, flecha a la izquierda — así está en el sitio real) a `gestiondepedidos.sporting.com.ar/login`.
2. `.sp-header-full`: logo, buscador, "Ingresá: Tu ubicación", **"Entrar"** (no hay ícono de usuario suelto — es un link de texto), ícono de wishlist, ícono de carrito. ⚠️ Se dijo acá que el fondo era blanco — **mal, ver corrección 2026-07-16 más abajo, es verde**.
3. `.sp-navbar`: **8 categorías de texto** confirmadas — Hombre, Mujer, Niños, Deportes, Marcas, OFERTAS (rojo `#ff0033`, bold), Novedades (verde `--sp-green`, bold), **Adidas Seller**. El resto pesa normal (400), no 600. ⚠️ Se dijo acá que no había iconos al final — **mal, ver corrección 2026-07-16 más abajo, sí hay 2 badges-logo**.

Se unificó `index.html` (home) para usar el mismo header de 3 filas que las PDP (antes tenía uno propio, simplificado e inventado) y se sacó el toggle "Announcement bar" del panel de control de la home — el topline es chrome fijo del sitio real, no un módulo opcional. Se eliminaron de `sporting.css` las clases `.sp-announce`, `.sp-header` (versión simple) y `.sp-locationbar`, que quedaron sin uso.

### Corrección 2026-07-16 — Slider principal, color del header y badges del navbar

El usuario preguntó "¿en la home falta el slider principal?" — tenía razón. Se había pasado por alto porque las capturas anteriores buscaban texto en el DOM (`innerText`) y el slider principal es **puro gráfico**: banners de imagen sin `alt`, con el texto promocional incrustado en la imagen. Solo se detecta mirando la página (se usó `computer{action:"screenshot"}`, que en sesiones anteriores había estado fallando por timeout — retomarlo apenas vuelva a funcionar es la única forma de pescar este tipo de contenido).

Con el screenshot se confirmaron y corrigieron 3 cosas más:

1. **Slider principal**: banner a todo el ancho (~300px alto) inmediatamente debajo del navbar, antes de la tira de cuotas — 11 slides confirmados por `getBoundingClientRect` + conteo de bullets de paginación, con flechas prev/next. Contenido real gráfico/rotativo (visto: promo Selección Argentina/Messi, promo "Los descuentos también jueGan" 10%/20% off) — se agregó como `.sp-hero-slider` con un banner de ejemplo + flechas + 11 puntos, toggle "Slider principal" nuevo en el panel.
2. **`.sp-header-full` es verde** (`--sp-green`), no blanco — error de la corrección de header anterior (se había asumido blanco sin confirmar, porque el bg computado daba transparente y no se llegó a mirar visualmente). Con fondo verde, buscador queda como pill blanca y el resto de los textos/iconos (ubicación, Entrar, wishlist, carrito) en blanco.
3. **El navbar SÍ tiene 2 badges-logo al final** de Novedades, además de las 8 categorías de texto — se habían sacado por error en la corrección de header anterior (la query de esa vez solo buscaba links con la clase de texto `categoryLabel` y no encontraba los links-logo, que no tienen texto visible). Son imágenes de fondo: `logo-menu-adidas.svg` (el link real de "Adidas Seller", que sí tiene el texto "Adidas Seller" en el DOM aunque se vea como logo) y `BotonEventoMenu.svg` (sin texto, href `/afa` — **probablemente una campaña estacional ligada al Mundial 2026**, dado que hoy es 2026-07-16 y el slider principal tiene banners de Selección Argentina/Messi. No usar los assets reales de terceros — se representan como badges de texto compactos "ADIDAS" / "EVENTO". **Revisar si sigue vigente en la próxima pasada de verificación** — si desapareció, sacar el badge "EVENTO".

**Lección para próximas capturas:** un `getBoundingClientRect`/`innerText` a secas no detecta contenido puramente gráfico (imágenes sin alt, texto incrustado en banners) ni backgrounds transparentes que heredan color de un ancestro con imagen de fondo. Para secciones "raras" o con mucho contenido visual, complementar siempre con un screenshot real antes de dar la verificación por cerrada.

### Reconstrucción 2026-07-16 — Home completa, fiel al sitio real

La home tenía un hero inventado (cupón + descuento + botón "Comprar") y solo 2 de las ~9 secciones reales. Se navegó en vivo `sporting.com.ar` con viewport desktop forzado (1280px — el tab había quedado en 515px de una sesión anterior, dato clave si algo no cierra: **siempre confirmar `window.innerWidth` antes de dar una captura por válida**) y con scroll incremental completo para destrabar el lazy-load. Estructura real de la home, de arriba a abajo:

1. Topline + header + navbar (sin cambios, ya corregidos antes).
2. **Tira de cuotas/financiación** — NO hay hero banner con cupón. Es un carrusel de tarjetas de bancos ("12 Cuotas sin interés Mastercard Banco del Sol", etc.). Se maqueta como fila estática de 4 tarjetas (`.sp-promo-strip`).
3. **Categorías** — reales: Calzado / Indumentaria / Accesorios / Ofertas (no "Futbol / Invierno").
4. **🆕 Novedades** — carrusel de productos (Previous/Next + paginación 1-5), no grilla estática.
5. **⭐ Tienda Oficial Adidas** — segundo carrusel de productos, no existía en la maqueta.
6. **🏆 Prepárate para rendir en cada disciplina** — 6 disciplinas confirmadas: Hockey, Training, Moda, Running, Tenis, Outdoor (la maqueta solo tenía 2: Hockey y Training). Nota: "Prepárate" lleva acento en el sitio real.
7. **Elegí viendo** — 4 banners de categoría con botón "VER PRODUCTOS", no existía.
8. **🧭 Ultimas!!** — tercer carrusel de productos (con ejemplos de descuento), no existía.
9. **⚽ Clubes y Selecciones de Fútbol** — carrusel de camisetas de clubes/selecciones, no existía. Contenido de ejemplo inferido de los nombres de clubes que sí aparecen en el mega-menú (Selección Argentina, Boca Juniors, River Plate) — no se llegó a capturar el detalle exacto de sus tarjetas.
10. **Barra de beneficios** (Envíos/Cuotas/Cambios, 3 columnas) — última sección antes del footer, no existía.
11. Footer (corregido arriba).
12. **"Últimos vistos"** (carrusel de recién vistos) aparece después del footer en el sitio real — **no se maquetó**: es contenido personalizado por sesión de cada usuario, no tiene sentido estático en una maqueta.

Todos los carruseles de producto se representan con 3 tarjetas de ejemplo (reusando `.sp-product-card`) + flechas decorativas + puntos de paginación (`.sp-carousel-row`/`.sp-carousel-track`/`.sp-carousel-dots`), no la lógica real de slide — alcanza para maquetación visual, no hace falta que funcione. Se agregaron 9 toggles al panel de control de la home (uno por sección nueva/existente).

### Corrección 2026-07-16 — PDP: breadcrumb, acordeón, "Primer cambio", productos similares

Se volvió a navegar en vivo `zapatillas-adidas-runblaze-de-hombre-6ih6705-000/p` (viewport desktop forzado + scroll incremental) para terminar de verificar la PDP contra el sitio real. Hallazgos sobre `producto-modular.html`:

- **Breadcrumb real:** Inicio (ícono) › SPORTING › CALZADO › Zapatillas › [producto] — la maqueta tenía "Inicio › Sporting › Running › [producto]" (3 niveles, categoría inventada). Corregido a 4 niveles con Calzado/Zapatillas.
- **Orden real del acordeón:** Descripción, Especificaciones, Envíos gratis, *(ítem de cambios, ver abajo)*, Cuotas y Promociones, Reseñas. La maqueta tenía Especificaciones antes que Detalles — reordenado. ⚠️ Corrección posterior: "Detalles" **no es un ítem propio** — es una subsección (subtítulo + bullets) dentro del cuerpo de "Descripción", confirmado por screenshot. Se había hecho separado por error al leer solo el `innerText` (que no distingue jerarquía visual). Fusionado de nuevo dentro de Descripción.
- **Tercer estado de "Vendedor":** este producto puntual (Adidas de marca, pero sin ningún seller marketplace explícito) muestra un acordeón genérico **"Primer cambio | gratis"** en vez de la caja "Vendido y distribuido por" o la regla de "no cambios" — no es lo mismo que el seller Adidas marketplace de `producto-adidas.html` (que es otro producto distinto: la camiseta de la Selección). Se agregó un tercer valor al toggle "Vendedor" — **Genérico (sin seller especial)**, ahora el default — que muestra este ítem y no muestra badge/caja de seller. Los otros dos valores (marketplace/propio) siguen documentando la regla de negocio ya confirmada por el usuario para sellers con reglas propias.
- **"Productos similares" es un carrusel** (Previous/Next + paginación), no estaba maquetado en `producto-modular.html` en absoluto — se agregó con el mismo componente de carrusel que ya se usa en la home (`.sp-carousel-row`), con 3 productos de ejemplo.
- Galería: la real tiene 6 miniaturas, la maqueta tenía 4 — se completó a 6.

**Nota metodológica:** la regla "sellers sin opción Cambio" se había confirmado sobre la PDP de una **camiseta** (`camisetas-de-equipos-adidas-...-59135/p`), no sobre esta zapatilla — son productos distintos y no todos los productos "adidas" tienen la misma marca de seller. No generalizar reglas de un producto a todo el catálogo sin confirmar por producto.

### Fix 2026-07-16 — Azul institucional filtrándose a los botones del sitio (no era del sitio real)

El usuario reportó "detalles en azul que no corresponden" en el selector de talles. Causa: `sporting.css` no importa `design-system/tokens.css` para el contenido del sitio (a propósito, ver cabecera del archivo), pero las páginas modulares (`producto-modular.html`, `index.html`) **sí** cargan `tokens.css` para el chrome del panel de control — y ese archivo define estilos globales de `<button>` (`button:hover:not(:disabled)`, `button:focus-visible`, `button:disabled`) que, por especificidad CSS, le ganaban a casi todas las reglas de hover propias de `sporting.css` (ej. `.sp-size-btn:hover` tenía menos especificidad que `button:hover:not(:disabled)` de tokens.css). Resultado: cualquier botón real del sitio (talles, agregar al carrito, flechas de carrusel, "Calcular envío", etc.) se ponía azul institucional al pasar el mouse, y mostraba un outline azul al hacer foco por teclado — nada de eso existe en el sitio real.

Fix: se agregó un reset en `sporting.css` para `button:focus-visible`/`button:disabled` excluyendo `.ctrl-panel` (que sí debe conservar el azul de tokens.css), usando el selector `:not(.ctrl-panel *)` para subir la especificidad por encima de tokens.css sin tocar ese archivo compartido. Cada regla de `:hover` de un botón del sitio (talles, agregar al carrito, flechas de carrusel/hero, botón de categoría, stepper de cantidad, "Calcular envío", newsletter) se reescribió con el mismo sufijo `:not(:disabled):not(.ctrl-panel *)` para que su color propio (o directamente "sin cambio") gane. Confirmado por inspección de `document.styleSheets` que las reglas parsean y ganan la cascada — no se pudo verificar con un hover real automatizado (los eventos de mouse sintéticos vía JS no disparan `:hover` real en el navegador).

Esto afecta a **todas** las páginas que usan `sporting.css` + `tokens.css` juntos (`index.html`, `producto-modular.html`) y, por herencia del mismo `sporting.css`, también a las snapshots congeladas que no cargan `tokens.css` (`producto-adidas.html`, `producto-sporting.html` no tienen este problema porque no importan `tokens.css`, pero se benefician igual de las reglas de hover ahora más explícitas).

**Para la próxima vez:** si se agrega `tokens.css` a una maqueta de sitio que ya tiene su propia hoja de estilos con componentes de `<button>`, revisar de entrada si los estados `:hover`/`:focus-visible`/`:disabled` de tokens.css tienen más especificidad que los del sitio — es un patrón que se va a repetir en cualquier maqueta modular nueva que combine ambas hojas.

### Corrección 2026-07-16 — PDP mobile + sección nueva "También te puede interesar"

Se navegó en vivo `zapatillas-adidas-runblaze-de-hombre-6ih6705-000/p` con viewport forzado a 375x812 (mobile) y scroll incremental completo. Diferencias reales confirmadas contra la versión desktop de `producto-modular.html`:

- **Layout de 1 sola columna:** el grid de 2 columnas (galería + info) se apila — galería arriba, info debajo. Sin cambios de contenido ni de orden respecto a desktop.
- **Galería como swiper** (confirmado por clase real `swiper-container`): la columna de miniaturas (`.sp-thumbs`) queda oculta (ancho 0 confirmado por `getBoundingClientRect`) y en su lugar hay paginación por puntos debajo de la imagen principal (clase real `swiper-pagination`) — se agregó `.sp-gallery-dots`, mismo patrón visual que `.sp-hero-dots` de la home.
- **Ícono de "compartir"** (confirmado por clase real `shareLabel`) se ubica junto al breadcrumb en mobile, no en la fila de badges de la info como en desktop — se agregó `.sp-breadcrumb-share`, visible solo ≤720px.
- El botón "Agregar al carrito" **no es sticky/fijo** al hacer scroll (confirmado `position: static`) — queda en el flujo normal.
- **Hallazgo nuevo, no específico de mobile:** debajo de "Productos similares" hay una segunda sección de carrusel real, **"También te puede interesar"**, con productos de categorías distintas (ej. remeras) y al menos un ejemplo con descuento (tachado + `-45%`). No estaba maquetada todavía en ninguna versión de la PDP — se agregó a `producto-modular.html` (visible siempre, no es un módulo togglable ni mobile-only) reusando `.sp-carousel-row`.
- El resto (precio, cuotas, selector de talle, acordeón y su orden, código postal) no cambia respecto a desktop.

Implementado con media query `@media (max-width: 720px)` en `sporting.css` (mismo breakpoint que se usó para la PLP mobile). Verificado en el navegador con `getComputedStyle` en ambos breakpoints (desktop: grid 2 columnas + miniaturas visibles + dots/share ocultos; mobile: grid 1 columna + miniaturas ocultas + dots/share visibles) — screenshot no disponible en esta sesión (timeout persistente de la herramienta).

### Corrección 2026-07-16 — Home mobile + header/footer mobile (chrome global)

Se navegó en vivo `sporting.com.ar/` con viewport forzado a 375x812 (mobile). El scroll incremental de un solo salto (`scrollTo(0, scrollHeight)`) no alcanzó para destrabar todos los `vtex-render__lazy-container` (quedó el texto de la página corto, 5121 caracteres) — hubo que scrollear en pasos de 500px con esperas entre cada uno, en varias tandas (la herramienta de scripting cortaba a los 30s con loops largos), hasta que el texto extraído dejó de crecer (6887 caracteres, estable). Diferencias reales confirmadas contra la versión desktop:

- **Header:** el navbar de categorías (`.sp-navbar`) no aparece — sus 8 categorías existen en el DOM pero dentro de un panel oculto fuera de pantalla (confirmado `getBoundingClientRect` con `x` negativo), es decir, viven en un menú hamburguesa. El `.sp-header-full` muestra en mobile: ícono ☰ + logo + ícono de lupa (el buscador expandido no aparece) + "Entrar" + carrito — **sin** texto de ubicación ni ícono de wishlist (♡), que no se encontraron visibles en la captura. Se agregó `.sp-hamburger-btn` y `.sp-search-icon-btn` (nuevos) al markup de `index.html`, `producto-modular.html` y `plp.html` (mismo header en las 3, consistente con la regla de "no crear variantes nuevas" de este archivo).
- **Footer:** en mobile **solo aparece la franja de newsletter** — las 4 columnas de links, el copyright y "Términos más buscados" no están. Confirmado que no es un fallo de carga: el contenedor del footer existe en el DOM con altura real (1330px) pero 0 links y 0 imágenes adentro, mientras que el resto de la página (carruseles con productos reales) sí había terminado de montar. Se interpreta como una decisión real de UX mobile, no una captura incompleta.
- **Slider principal:** sigue existiendo, pero más bajo (~220px confirmado por `getBoundingClientRect`, vs 300px en desktop).
- **Secciones ausentes en mobile** (no aparecieron en absoluto, ni colapsadas, tras confirmar que todos los lazy-containers habían montado): 🏆 Disciplinas, Elegí viendo, 🧭 Ultimas!!, ⚽ Clubes y Selecciones de Fútbol, y la barra de beneficios. Se ocultan siempre en mobile con `display:none !important`, **independiente del toggle del panel de control** (que sigue pensado para desktop — prender una de estas secciones en el panel no la muestra en viewport mobile, fiel al comportamiento real).
- **Categorías, Novedades y Tienda Oficial Adidas** sí están en mobile, mismo patrón de tarjetas/carrusel.
- **Dato curioso, no tratado como cambio estructural:** los nombres de categoría vistos en esta captura mobile ("Zapatillas / Futbol / Running / Invierno") fueron distintos a los de la captura desktop original ("Calzado / Indumentaria / Accesorios / Ofertas") — el contenido de esta sección parece rotar en vivo (posible personalización o campaña estacional). No se tocaron los ejemplos ya maquetados en `index.html` por esto.
- **Tira de cuotas/financiación:** no necesitó cambios — ya usaba `overflow-x:auto`, confirmado que en mobile los mismos elementos se despliegan en una fila que excede el ancho de pantalla (scroll horizontal).

Verificado en el navegador con `getComputedStyle` en ambos breakpoints, en las 3 páginas que comparten el header/footer (`index.html`, `producto-modular.html`, `plp.html`) — screenshot no disponible en esta sesión (timeout persistente de la herramienta).

### Creación 2026-07-16 — PLP (listado de categoría)

Se navegó en vivo `sporting.com.ar/sporting/calzado/zapatillas/hombre` (viewport 1280px forzado, scroll incremental completo) para maquetar por primera vez la página de listado de productos, marcada como pendiente desde el kickoff. Estructura real confirmada:

- **Breadcrumb de 5 niveles:** Inicio (ícono) › SPORTING › CALZADO › ZAPATILLAS › HOMBRE — un nivel más que la PDP (que llega hasta el producto).
- **Sidebar de filtros** (VTEX `search-result-3`): chips de filtro activo ("Calzado (881) ✕", "Zapatillas (881) ✕"), grupo **Vendido por** (Adidas 443 / Sporting 438 — mismo dato de sellers ya documentado en la PDP y el portal de pedidos), **Categoría**, **Tipo de producto** (Zapatillas/Botines/Ojotas y Chinelas/Zapatos con contador), y 7 grupos que en la captura real aparecían **colapsados sin opciones visibles** (Sub Tipo, Talle, Marca, Disciplina, Ofertas, Colores, Clubes — no se llegaron a abrir en la sesión de captura, quedan como acordeón vacío). Al final, **Rango de precio** con 2 inputs ($min/$max) + botón "Buscar" y el label del rango real ("$43.999 – $714.999").
- **Barra de resultados:** contador real "881 productos" + control de orden "Ordenar Por Relevancia" (no se abrió el dropdown, así que no se conocen el resto de las opciones de orden — no inventar hasta confirmar).
- **Grid de productos:** reutiliza `.sp-product-card` de la home/carruseles. Se agregó un detalle nuevo confirmado por captura: **cada tarjeta tiene su propio mini-carrusel de fotos** (flechas Previous/Next + paginación 1-5 por producto, visible al hover) — se maqueta con `.sp-plp-card-nav`/`.sp-plp-card-dots`, decorativo igual que los carruseles de la home. Un producto (Puma Flyer Lite 3) mostraba un badge de cupón **"PUMAON"** sobre la tarjeta — se agregó `.sp-coupon-tag` para representarlo.
- **Paginación real:** no es paginación numerada, es "Mostrando 24 de 881" + botón "MOSTRAR MÁS" (carga incremental).
- Header/navbar/footer: sin cambios, mismo chrome fijo que el resto del sitio.

Se creó `plp.html` como página estática (sin panel de control modular, a diferencia de `index.html`/`producto-modular.html`) con 8 tarjetas de ejemplo con datos reales de la categoría "Zapatillas Hombre". Se agregaron las clases `.sp-plp-*` y `.sp-filter-*` a `sporting.css`.

**Pendiente de esta pantalla:** contenido real de los 7 grupos de filtro colapsados, opciones del dropdown de orden, y el estado "sin resultados"/con filtros aplicados (solo se capturó el estado por defecto de la categoría).

### Fix 2026-08-03 — H1 agregado por pedido de SEO (no confirmado contra el sitio real)

El equipo de SEO pidió agregar el H1 de categoría, que faltaba en `plp.html`. **No se navegó en vivo para esto** — a diferencia del resto de las correcciones de este archivo, es una adición por requerimiento de SEO, no una corrección de fidelidad visual. No se verificó si el sitio real tiene un H1 (visualmente oculto o ausente) en esta URL — si en el futuro se confirma contra el sitio real, actualizar esta nota.

### Corrección 2026-08-03 — H1 confirmado en vivo + revisión a fondo de la PLP (tanda 1: financiación, badges, descuento, paginación)

Se navegó en vivo `sporting.com.ar` → Hombre → Calzado → Zapatillas (URL real usa query params VTEX intelligent search, no el path viejo `/sporting/calzado/zapatillas/hombre` que daba 404 — la ruta correcta se resuelve navegando desde el mega-menú). Aprovechando la visita se confirmó primero el H1: **`document.querySelectorAll('h1').length` da 0** — no existe, ni oculto. Confirma la premisa del fix anterior.

Se hizo una revisión módulo por módulo a pedido del usuario ("que se parezca más a productivo"), con `getComputedStyle`/`getBoundingClientRect` en vivo. Hallazgos de esta primera tanda, ya aplicados:

- **Tira de financiación entre navbar y breadcrumb**: no estaba maquetada — es una fila compacta de logos de banco + condición (ej. "Banco Galicia · 9 cuotas", "MODO · 20% off", "Banco Macro · 10 cuotas"), distinta de la "tira de cuotas" de tarjetas grandes ya documentada para la home (componente distinto, mismo criterio de "no es lo mismo aunque se parezca"). Se agregó `.sp-plp-promo-strip` con placeholders de texto/logo — contenido real de bancos no confirmado más allá de lo visto en esa sesión, puede variar.
- **Badges "Tienda adidas"/"Nuevo" van superpuestos en la esquina superior izquierda de la foto** (overlay, `position:absolute;top:0;left:0` sobre el contenedor de imagen) — la maqueta los tenía como texto aparte entre las cuotas y el botón (`.sp-product-envio`). Corregido con `.sp-plp-badge` (`.seller` negro, `.new` verde claro `#acdba3`, ambos texto blanco 12px), confirmado por `getComputedStyle` real. **Nota:** `.sp-product-envio` sigue existiendo en `sporting.css` sin tocar porque la usan `producto-adidas.html`/`producto-sporting.html` (snapshots congeladas) — no se auditó si esas páginas tienen el mismo error, queda pendiente si se retoman.
- **Paginación interna de cada tarjeta**: confirmado que son botones numerados de 6×6px con el número oculto (`font-size:0`), activo negro `#000`, inactivo gris claro `#d9d9d9` (antes: overlay blanco translúcido sobre foto, inventado). Corregido color en `.sp-plp-card-dots`. No se reconfirmó si el comportamiento de aparecer solo al hover es real o si están siempre visibles (el real usa `bottom:-15px`, fuera del hover-only que tiene la maqueta) — queda como aproximación.
- **Precio con descuento**: no había ningún ejemplo maquetado. Confirmado en vivo (tarjeta real "Puma Softride Enzo 5"): precio de lista arriba en gris `#2e2e2e` 13px **sin tachar** (no hay `text-decoration:line-through`, a diferencia del patrón típico de otros sitios), precio final abajo en rojo `#cb0900` bold, badge "-XX%" en píldora roja aparte. Se agregó el ejemplo en la tarjeta "Puma Dasher Lite" (`$109.999` → `$69.999`, `-36%`) con clases nuevas `.sp-product-price-row`/`.sp-price-list`/`.sp-price-sale`/`.sp-discount-badge`.
- **Contador real "878 productos"** al momento de la captura (antes 881) — no se tocó el número de la maqueta, es dato dinámico que cambia con el stock, no vale la pena perseguirlo exacto.

**Pendiente de esta revisión (tandas siguientes, no aplicadas todavía):**
- Contenido real de los 7 grupos de filtro (ya relevado, falta volcarlo a `plp.html`): Sub Tipo (Botines 227/Ojotas y Chinelas 32/Zapatos 7/Zapatillas Outdoor/Zapatillas Ciclismo), Talle (34.5 a 39+), Marca (Adidas/Puma/Nike/Fila/Topper/On/Salomon/Saucony/Under Armour/Joma), Disciplina (Boxeo/Ciclismo/Fútbol/Golf/Handball/Hockey/Moda/Motorsport/Outdoor/Padel), Colores (Amarillo/Azul/Azul Marino/Azul Oscuro/Beige/Blanco/Bordó/Celeste/Crudo/Dorado — checkboxes simples, sin swatch de color), Clubes (Argentina, Mercedes AMG Petronas F1 Team, No aplica — no son los clubes de fútbol argentino que se había asumido en otra sección de este documento; en esta categoría puntual el filtro trae otro dataset).
- El filtro de "Rangos de precio" real tiene un **slider de doble manija** (`vtex-slider-container`) debajo de los 2 inputs — la maqueta solo tiene los inputs + botón + texto estático, sin slider.
- Dropdown de "Ordenar Por" real tiene 6 opciones confirmadas: Relevancia, Más Vendidos, Fecha de Lanzamiento, Mejor Descuento, Mayor Precio, Menor Precio (la maqueta lo deja como decorativo, no es prioritario si no se pide).

### Corrección 2026-08-03 — Tanda 2: contenido real de los 7 grupos de filtro

Se volcó a `plp.html` el contenido real relevado en la tanda anterior, con un hallazgo adicional confirmado en vivo: los grupos con más de 10 opciones (**Talle, Marca, Disciplina, Colores**) no muestran la lista completa — VTEX corta en 10 y agrega un botón **"Mostrar X más"** (confirmado buscando ese texto en cada contenedor de filtro real). Sub Tipo (5 opciones), Ofertas (1) y Clubes (3) no lo tienen porque su lista completa ya entra en 10.

- **Sub Tipo:** Botines (242), Ojotas y Chinelas (38), Zapatos (6), Zapatillas Outdoor (29), Zapatillas Ciclismo (9) — lista completa.
- **Talle:** 34.5 a 39 (10 valores) + "Mostrar 18 más" — hay más talles por encima de 39, no confirmados (el botón no se expandió en esta sesión).
- **Marca:** Adidas, Puma, Nike, Fila, Topper, On, Salomon, Saucony, Under Armour, Joma (10) + "Mostrar 6 más" (16 marcas en total, las 6 restantes no confirmadas).
- **Disciplina:** Boxeo, Ciclismo, Fútbol, Golf, Handball, Hockey, Moda, Motorsport, Outdoor, Padel (10) + "Mostrar 5 más" (15 en total).
- **Ofertas:** un solo checkbox "Ofertas (77)".
- **Colores:** Amarillo, Azul, Azul Marino, Azul Oscuro, Beige, Blanco, Bordó, Celeste, Crudo, Dorado (10) + "Mostrar 15 más" (25 en total) — son checkboxes simples, **sin swatch de color** (confirmado por inspección de DOM, no hay elemento de color de fondo en el label).
- **Clubes:** Argentina (1), Mercedes AMG Petronas Formula One Team (7), No aplica (357) — dataset real de esta categoría puntual (zapatillas), distinto de los clubes de fútbol argentino (Boca/River/Selección) que aparecen en otras secciones del sitio (esos son de indumentaria/camisetas, no de esta categoría).
- **Rango de precio:** actualizado el label a `$ 49.899 – $ 714.999` (valor visto en esta sesión, dato dinámico que cambia con el stock — no perseguir el número exacto en el futuro).

Nuevo componente `.sp-filter-more` en `sporting.css` (link de texto, sin funcionalidad real de expandir — es decorativo, como el resto de los controles de esta maqueta).

**Pendiente:** el slider de doble manija (`vtex-slider`) del rango de precio, que sigue sin maquetar (ver tanda anterior). **Resuelto, ver tanda 3 abajo.**

### Corrección 2026-08-03 — Tanda 3: slider de rango de precio

Se agregó el slider de doble manija que faltaba debajo de los inputs de precio. Confirmado en vivo con `getComputedStyle` sobre `.vtex-slider__base`/`.vtex-slider__selector`: track 4px de alto, gris `#e3e4e6` sin filtro aplicado — pero con **ambas manijas en los extremos** (`left-0`/`right-0`, sin filtro seleccionado) el track queda completamente cubierto de negro (`rgb(0,0,0)`, no verde institucional pese a que el resto de botones del sitio sí lo son). Manijas circulares 12px negras sin borde.

Se maquetó `.sp-price-slider`/`.sp-price-slider-track`/`.sp-price-slider-handle` en `sporting.css` con el track ya en negro (representando el estado "sin filtro", igual al que se vio en vivo) y las 2 manijas en 0%/100%. Es decorativo, sin lógica de arrastre real — consistente con el resto de controles de esta maqueta.

**Nota técnica de esta sesión:** el Browser pane cacheó `sporting.css` entre ediciones — un cambio no se reflejaba hasta forzar la recarga de la hoja de estilos con un query string (`sporting.css?v=...`). Si en una futura sesión un cambio de CSS "no aparece" pese a estar bien guardado en el archivo, probar esto antes de asumir que la edición falló.

Con esto se cierran las 3 tandas de la revisión "que se parezca más a productivo" pedida por el usuario el 2026-08-03.

### Corrección 2026-08-04 — Banner informativo como imagen única + navbar centrado

El usuario señaló 2 cosas puntuales después de revisar el resultado:

1. **El "banner de financiaciones" es una sola imagen**, no logos de banco sueltos con texto como se había maqueta do en la tanda 1. Se volvió a navegar en vivo y se confirmó: es un componente `custom-banner-gallery` (carrusel VTEX, 1 sola slide activa en esta sesión) con un único `<img>` — un `.gif` (`Sporting_HeaderInformativoJul26_Desktop.gif`) de **1920×61px reales**, mostrado a **1265×40px** full-width (`getBoundingClientRect` confirmado). Se reemplazó `.sp-plp-promo-strip` (que tenía 3 logos + texto) por un único placeholder gris de `1265x40` a ancho completo, mismo criterio que el resto de banners gráficos de esta maqueta (slider principal, etc.) — no se puede reproducir el contenido real (rota con cada campaña), se deja como imagen de referencia con sus medidas.
2. **El navbar de categorías SÍ está centrado en desktop.** Se había documentado el 2026-07-16 que el centrado real quedaba roto por links ocultos del mega-menú y por eso se optó por alinear a la izquierda. Se volvió a medir en vivo (`getBoundingClientRect` del primer y último item del menú): margen izquierdo y derecho hoy son **exactamente iguales** (113px cada uno sobre 1265px de contenedor) — está centrado de verdad. Corregido `.sp-navbar` a `justify-content:center`. No se investigó si el sitio real corrigió ese bug entre el 16/07 y ahora, o si la lectura original estaba mal — quedó consignado por si alguna vez importa la diferencia.

### Corrección 2026-08-04 — Breadcrumb: bug de espaciado + minúsculas + ítem actual bold

El usuario notó que el breadcrumb "no se veía como en productivo" aunque estaba presente en el DOM. Se navegó en vivo y se encontró la causa real (`vtex-breadcrumb-1-x-container`):

- **El contenedor real es `display:block`** — los links fluyen pegados a la izquierda sin espaciarse entre sí. La maqueta tenía `.sp-breadcrumb` con `display:flex;justify-content:space-between`, y como cada `<a>`/`<span>` es un hijo directo del flex (no un solo grupo), ese `space-between` los desparramaba a lo largo de **todo el ancho de la fila** — un bug de layout propio, nunca existió en el sitio real. Se sacó `justify-content:space-between` y `gap:12px` (se mantuvo `display:flex;align-items:center` en vez de pasar a `block`, para no romper `.sp-breadcrumb-share` de PDP mobile, que depende de ser ítem de flex en la misma fila — ver nota en el CSS, ese ícono queda fuera del alcance de este fix y no se reverificó).
- **Todo el texto se ve en minúsculas**, confirmado por `getComputedStyle`: el HTML real trae "SPORTING"/"CALZADO" en mayúsculas pero un `text-transform:lowercase` lo fuerza visualmente. Se cambió el HTML de `plp.html` a case natural ("Sporting", "Calzado", "Zapatillas", "Hombre") + `text-transform:lowercase` en el CSS, mismo resultado visual que el real pero manteniendo el texto semánticamente correcto en el markup.
- **El último ítem (página actual) es negro bold** (`color:#000;font-weight:700`), el resto gris normal — antes todos los links tenían el mismo gris uniforme. Se agregó la clase `.current` al último `<a>` de `plp.html`.

Estilo actualizado en `.sp-breadcrumb`/`.sp-breadcrumb a`/`.sp-breadcrumb a.current`/`.sp-breadcrumb .sep` en `sporting.css`.

### Corrección 2026-08-04 — Switcher de grilla/lista faltante en la barra de resultados

El usuario notó que faltaba el botón para cambiar la vista de grilla en desktop. Confirmado en vivo: existe un control con 2 botones (`aria-label="Switch to grid layout"` / `"Switch to list layout"`, clase real `vtex-search-result-3-x-galleryLayoutSwitcher`), ubicado en la barra de resultados **entre el contador de productos y "Ordenar Por"**, con la opción de grilla activa por defecto (clase `--selected`). Botón grilla 60px de ancho, botón lista 44px, ambos 28px de alto, sin borde de contenedor.

Los íconos reales son un sprite SVG (`<use xlink:href="#mpa-gallery">`) que no llegó a renderizar visualmente en la sesión de captura (mismo problema ya visto con el ícono de "Inicio" del breadcrumb) — se aproximaron con glifos unicode ⊞ (grilla) / ☰ (lista) en vez de perseguir el ícono exacto, mismo criterio ya usado en otros badges de esta maqueta cuando el asset real no es reproducible. Nuevo markup `.sp-results-right`/`.sp-layout-switcher`/`.sp-layout-btn` en `plp.html`/`sporting.css`, decorativo (sin lógica real de alternar grilla/lista).

### Corrección 2026-08-04 — Módulo faltante: "globitos" de categoría

El usuario pidió comparar contra `sporting.com.ar/sporting` (PLP general de la marca, sin filtro de género/tipo — a diferencia de `plp.html`, que maqueta la vista filtrada "Zapatillas Hombre") y señaló un módulo ausente: una fila de categorías circulares justo debajo del breadcrumb.

Confirmado en vivo (`sportingio-store-components-1-x-slideItem*`): son **9 círculos de 100×100px contiguos** (gap 0 entre ítems, `getBoundingClientRect` confirmado) con imagen de categoría + título 14px negro regular centrado debajo (margin-top 7px) — **Argentina, Zapatillas, Botines, Camisetas, Remeras, Shorts, Bicicletas, Mochilas, Pelotas**. Sin título de sección arriba. Es un componente de carrusel VTEX (mismo patrón que el banner del punto anterior) pero en este ancho de contenido (898px) los 9 ítems entran exactos sin necesitar flechas — no se agregó lógica de carrusel.

**Alineación importante:** este módulo va dentro del área de contenido (`<main>`, mismo ancho que la grilla de productos), **no** a todo el ancho de la página como el breadcrumb o el banner informativo — confirmado comparando su `left` real (346px) contra el de "Filtros" del sidebar (que arranca en x:10) y el del contador "881 productos" (x:336, prácticamente el mismo borde). Se agregó como primer elemento de `<main>`, antes del H1.

**Nota de alcance:** esta categoría puntual (`/sporting`, sin filtro) es una PLP distinta de la que ya maqueta este archivo (`/hombre?...zapatillas/hombre`) — no se remidió si el resto de los módulos (filtros, tarjetas) cambian entre una y otra vista; se asume que comparten el mismo chrome ya documentado y que este módulo de categorías simplemente se agrega sin tocar el resto.

**Ajuste 2026-08-04 (mismo día):** las 9 imágenes se habían maquetado primero con texto abreviado por categoría (`Arg`, `Zap`, `Bot`...), mismo criterio que las tarjetas de producto (que sí llevan el nombre del producto de ejemplo en la imagen). Corregido a placeholder gris + medidas (`100x100`), igual criterio que el banner informativo — son fotos de contenido real (no productos de catálogo), y el nombre de cada categoría ya está en el label de texto debajo, así que repetirlo en la imagen era redundante. Criterio general para esta maqueta: **imagen de producto de catálogo → nombre de ejemplo en el placeholder; imagen de contenido/marketing no reproducible → gris + medidas.**

**Ajuste 2026-08-04 (revisión de imágenes restantes):** las 8 imágenes de tarjeta de producto usaban `placehold.co/300x300` como src, un tamaño arbitrario que nunca coincidió con la medida real ya confirmada en este mismo archivo (fix 2026-07-21: **243×243px exactos**, `object-fit:contain`). Se actualizaron las 8 a `243x243` para que el placeholder coincida con la medida real documentada — sin cambios visuales (ya se mostraban escaladas a 243px por CSS), pero ahora el src no queda desalineado con la medida que el resto del archivo da por confirmada.

**Ajuste 2026-08-04 (texto del placeholder de producto → medidas, no nombre):** el usuario notó que mostrar las medidas en vez del nombre de ejemplo sería más óptimo — y tenía razón: el nombre del producto **ya se repite** en `.sp-product-name` debajo de cada tarjeta, así que ponerlo también en la imagen era redundante (mismo caso que se corrigió recién en los globitos de categoría). Se ajustó el criterio general de la maqueta: se cambian las 8 imágenes de producto de `?text=<Nombre>` a `?text=243x243` (gris `#cccccc`/`#666666`, mismo esquema que el resto de placeholders de esta maqueta). **Criterio final, reemplaza el de la nota anterior:** cualquier imagen de esta maqueta que tenga su nombre/etiqueta ya visible en un texto aparte (nombre de producto, nombre de categoría) se maqueta como gris + medidas — el texto de ejemplo en el placeholder solo se justifica cuando no hay otro lugar en la pantalla donde identificar qué contenido va ahí.


Se agregó `<h1 class="sp-plp-title">Zapatillas de Hombre</h1>` como primer elemento de `<main>`, entre el breadcrumb y la barra de resultados (contador + orden) — ubicación estándar de PLP. Texto elegido para calzar con la última migaja del breadcrumb ("Hombre") sin repetir "Sporting". Estilo nuevo `.sp-plp-title` en `sporting.css` (20px bold), pensado para no romper el layout real ya confirmado del resto de la página. Se verificó que no hay conflicto con otro `<h1>` en la página (el logo es un `<a>`, no un heading).

### Corrección 2026-07-16 — PLP mobile

Se navegó en vivo la misma categoría con viewport forzado a 375x812 (mobile) y scroll incremental completo. Diferencias reales confirmadas contra la versión desktop:

- **No hay sidebar fija.** En su lugar hay una barra de 2 botones mitad y mitad arriba del contador de resultados: **"Ordenar Por / Relevancia"** y **"Filtrar"**.
- **"Filtrar" abre un panel deslizante desde la derecha** (confirmado por `getBoundingClientRect`: fixed, `top:0`, ancho ~230px de 375px totales — un ~61% de la pantalla, no un bottom-sheet), con los mismos grupos de filtro que el sidebar de desktop. El panel tiene un **footer fijo abajo** con dos botones — **"Limpiar"** (outline) y **"Aplicar"** (sólido) — y debajo un contador de productos en vivo ("882 productos" en el momento de la captura, cambia según filtros aplicados).
- **El grid de productos pasa a 2 columnas** (confirmado con `getBoundingClientRect` de 2 tarjetas contiguas, mismo ancho, misma fila).
- El resto (breadcrumb, tarjetas de producto, footer del sitio) no se re-verificó a fondo en mobile — se asume igual que desktop salvo lo documentado arriba.
- **No se encontró un botón de cierre (✕) explícito** en la captura del panel — puede ser un ícono SVG que no quedó en el volcado de texto/DOM que se usó para inspeccionar. Se agregó una ✕ en `plp.html` por usabilidad, pero es **inferido, no confirmado 1:1** contra el sitio real.

Se implementó en `plp.html` reusando el mismo markup de filtros (sin duplicar HTML): a ≤720px el `<aside>` se convierte en panel `position:fixed` fuera de pantalla (`translateX`), con clase `.open` togglable por JS (botón "Filtrar" abre, ✕/"Aplicar"/click en el fondo oscuro cierran). El acordeón de filtros (abrir/cerrar cada grupo) sigue funcionando igual dentro del panel. Verificado en el navegador con `getComputedStyle`/`getBoundingClientRect` en ambos breakpoints (mobile y desktop) — screenshot no disponible en esta sesión (timeout persistente de la herramienta), verificación hecha por inspección de layout computado.

### Fix 2026-07-17 — Carruseles de producto (Novedades / Tienda Oficial Adidas / Ultimas!!): tarjetas estiradas, no se parecían ni al sitio ni a la PLP

El usuario pidió una revisión crítica y detallista de estos 3 carruseles porque "no se parecen a las del sitio ni a las de la PLP". Causa encontrada: `.sp-carousel-track .sp-product-card` solo tenía `min-width:220px` (sin `width`), así que flexbox estiraba cada tarjeta a **~311.5px de ancho real** (medido con `getBoundingClientRect`) en vez de los 243px que la propia nota de arriba (línea "Carrusel de producto... confirmado") ya decía haber medido en vivo y haber descartado "por no aportar fidelidad relevante". Consecuencias del estiramiento:

- Las tarjetas quedaban **~40% más anchas que las mismas tarjetas en `plp.html`** (mismo componente `.sp-product-card`, pero ahí sí acotado por un grid de 4 columnas fijas — terminan en 243px también, coincide exacto con la medición real).
- Con solo 3 tarjetas de ejemplo estirándose para llenar el track completo, **no quedaba ninguna tarjeta cortada asomando en el borde** — la señal visual mínima de "esto es un carrusel, hay más para el costado" desaparecía. Disciplinas (`.sp-disc-card`, 204px fijo) y Elegí viendo (`.sp-video-card`, 296px fijo) sí tenían ese "peek" porque ya usaban ancho fijo — la inconsistencia era interna del propio archivo, no solo contra el sitio real.

**Fix:** `min-width:220px` → `width:243px` fijo en `.sp-carousel-track .sp-product-card` (`sporting.css`), y se sumaron 2 tarjetas de ejemplo más en cada una de las 3 secciones (5 en total por carrusel) para que el track exceda el ancho visible. Verificado en el navegador a 1280px: `scrollWidth` 1279px vs 1133px de ancho visible del track (overflow real) y `cardWidth` 243px exacto, igual en las 3 secciones de la home y en `plp.html`.

### Corrección 2026-07-21 — Tarjeta de producto: ancho/gap confirmados en vivo, imagen corregida a 243×243 `contain`

El usuario midió "Novedades" con `layout-inspector` v1.7 apuntando al título de la sección. El JSON crudo reportó **20 ítems**, pero solo **5 son tarjetas reales** (`<section class="...custom-shelf...product-card...">`, 242.6×529px, con imagen y texto) — los otros 15 son `<div>` vacíos de 243×243px sin texto, ruido de un patrón distinto al de los clones de slick ya conocidos: este carrusel en particular parece usar un contenedor con scroll (no `overflow:hidden` + transform), así que los slides todavía no hidratados (placeholders de imagen sin el componente completo montado) no quedan recortados por `isClippedAway()` — quedan "visibles" para el tool aunque un usuario real no los vea sin scrollear. Pendiente evaluar si vale la pena que el tool también filtre por uniformidad de alto (hoy solo pondera ancho para filas), no se tocó esta vez.

Filtrando a las 5 tarjetas reales:
- **Ancho 242.6–243px y gap 15.5–16px** — coinciden exactos con lo que ya estaba fijado (`width:243px`, gap 16px, fix del 2026-07-17) — confirma que ese fix seguía vigente y que aplica igual a Adidas/Ultimas!! (mismo componente, no hace falta remedirlas).
- **Alto de tarjeta 529px** — bastante más que los 388.1px que rendía la maqueta. El tool no desglosa sub-elementos de un ítem, así que no alcanzaba para saber qué parte explicaba la diferencia.

El usuario remidió apuntando el selector CSS avanzado directo a `img.sportingio-custom-shelf-0-x-image` de una tarjeta real (captura de DevTools): **243×243px exactos** (cuadrada, ratio 1:1 — no 200px de alto como estaba) y **`object-fit: contain`** (no `cover` — la imagen entra completa, no se recorta). Corregido en `.sp-product-media img`.

Con el fix de imagen la tarjeta pasa de 388.1px a **431.1px** de alto — más cerca del real (529px) pero **todavía quedan ~98px sin explicar** (otra sub-parte de la tarjeta, no identificada — candidatos: más padding en el body, tags en más de una fila, o espacio para los puntos de paginación interna que no se llegó a medir). Pendiente si se quiere cerrar la diferencia del todo: medir con el selector avanzado el `.sp-product-body` (o sub-partes) de una tarjeta real.

**Dato adicional confirmado el mismo día:** remidiendo el selector `section.sportingio-custom-shelf-0-x-container.sportingio-custom-shelf-0-x-container--product-card` a nivel de página (sin acotar a una sección), el tool devolvió 14 tarjetas reales de **3 carruseles distintos mezclados** (por eso los gaps calculados no tenían sentido, -529 a 134.9 — son 3 filas separadas, no una), pero reveló algo útil: **el alto real de la tarjeta no es un número fijo** — varía entre 482px y 529px según el carrusel/contenido (probablemente por cantidad de tags o líneas de texto). Esto pone un techo realista a cuánto vale la pena perseguir el número exacto: el propio sitio no converge en un solo valor.

**Sub-parte medida con éxito usando "Copiar selector" de Chrome** (alternativa al inspector manual, cuando cuesta encontrar la clase legible): `.sportingio-custom-shelf-0-x-container_installments` (línea de cuotas) mide **34px de alto real** — la maqueta rendía 17px, exactamente la mitad (probablemente el texto real ocupa 2 líneas dentro del ancho de la tarjeta). Corregido con `min-height: 34px` en `.sp-product-cuotas` (sin forzar el wrap del texto de ejemplo, que puede seguir en una línea). Tarjeta resultante: **448.1px** — verificado en el navegador. Sigue sin cerrar el 100% de la diferencia contra el rango real (482-529px), pero dado que ese rango en sí mismo es variable según contenido, se considera una aproximación razonable para una maqueta; no se seguirá persiguiendo el resto salvo pedido puntual.

### Fix 2026-07-18 — "⚽ Clubes y Selecciones de Fútbol": título centrado + escudos más grandes y espaciados

El usuario pidió comparar este módulo puntual contra una captura del sitio productivo, "muy al detalle". Se intentó remedir en vivo (`sporting.com.ar`, scroll incremental + eventos de wheel forzados, viewport 1280px) pero esta sección **volvió a no montar** en el scraping — mismo problema ya documentado arriba ("esta sección... dejaron de aparecer en varios intentos de scraping en vivo"), persiste en esta sesión. Se trabajó por comparación visual directa entre la captura del usuario (sitio real) y una captura equivalente de la maqueta, ambas al mismo zoom/viewport aproximado (se pudo calibrar la escala usando el header, que sí tiene medidas ya confirmadas — topline/header-full/navbar dieron la misma altura en píxeles en ambas capturas, confirmando que estaban a la misma escala).

Hallazgos y fix:
- **Título centrado**: a diferencia del resto de los títulos de sección de la home (que van alineados a la izquierda), el de este módulo va centrado. Se agregó `.sp-section-title-center` (solo `justify-content:center`, ya que `.sp-section-title` es `display:flex`) y se aplicó únicamente a este `<div class="sp-section-title">` — no se tocó la clase base para no afectar al resto de las secciones, que sí están confirmadas alineadas a la izquierda.
- **Escudos más grandes y con más aire**: el placeholder anterior (84px, gap 20px) se veía sensiblemente más chico y apretado que la fila real. Estimado por proporción visual a **100px de ancho/alto, gap 48px** — este valor no es 100% arbitrario: con 8 escudos a 100px + 7 gaps de 48px da 1136px, que calza casi exacto con los 1133px disponibles del track a 1280px de viewport, consistente con que la fila real se ve llena de punta a punta sin overflow visible en la captura. Nuevo modificador `.sp-club-track` (`gap:48px`) sobre `.sp-carousel-track` de esta sección; `.sp-club-logo` pasó de 84px a 100px y el radius de `.shield` se escaló proporcionalmente (42/6/30 → 50/7/36).
- **Fix menor de paso**: el título tenía el emoji ⚽ pegado al texto sin espacio (`⚽Clubes...`) — las demás secciones sí llevan espacio (`🆕 Novedades`). Corregido a `⚽ Clubes y Selecciones de Fútbol`.

Verificado con `getBoundingClientRect` en el navegador (no se pudo tomar screenshot esta sesión, timeout persistente de la herramienta — mismo problema ya recurrente en este proyecto): `justifyContent:"center"` en el título, 8 escudos de 100px exactos, `track.scrollWidth` 1136 vs `clientWidth` 1133.

**Pendiente:** esta corrección se hizo por proporción visual contra una captura, no por medición en vivo — cuando el scraping de esta sección puntual vuelva a funcionar (o el usuario pueda abrir el módulo y forzar el montado del lazy-load), remedir con `getBoundingClientRect`/`getComputedStyle` para confirmar el tamaño y gap exactos en vez de la estimación actual.

### Fix 2026-07-18 — "Elegí viendo": medido en vivo con el bookmarklet Layout Inspector

Primera medición real de este módulo con la herramienta nueva `layout-inspector` (repo `vtex-bookmarklets`, ver [su README](../../../../vtex-bookmarklets/layout-inspector/README.md)) — el usuario la corrió sobre `sporting.com.ar` apuntando al título "Elegí viendo" y pegó el JSON resultante.

Datos crudos: 23 "ítems" detectados porque el carrusel real es un slick con loop infinito — 4 slides visibles (`slide--visible`, con imagen y texto "VER PRODUCTOS") + 19 clones ocultos (`slide--hidden`, sin contenido) que arman el buffer del loop. Filtrando por los visibles:

- **Tarjeta: 316.8 × 546.2px** (la maqueta tenía 296×395, aspect-ratio 3:4) — bastante más angosta y sobre todo más alta de lo que estaba maquetado. Corregido a **317 × ~543px** (`aspect-ratio: 7/12`, que aproxima el ratio medido 316.8/546.2 con una fracción prolija).
- **Gap entre tarjetas: 0px** — van pegadas entre sí (edge-to-edge), no con el gap de 16px que usa `.sp-carousel-track` en el resto de los carruseles de la home. Nuevo modificador `.sp-video-track` que pisa el gap solo en esta sección.
- **Título "Elegí viendo"**: confirmado `text-align: start` (izquierda), no centrado — consistente con el resto de los títulos de la home (a diferencia de "Clubes y Selecciones", que sí va centrado).

**Dato con reserva:** la captura se hizo con el viewport a 1366×**607** (alto inusualmente bajo, probablemente devtools ocupando espacio en esa sesión). El ancho (316.8px) no depende de esto, pero el alto sí podría estar afectado si el componente real usa `vh` en vez de un alto fijo — no se tomó el 546.2 como dato duro por esto, se aproximó con una fracción prolija en vez de fijar el px exacto. Si se puede, remedir con el mismo bookmarklet en una ventana de ~900px de alto para confirmar si el alto es fijo o relativo al viewport.

Verificado en el navegador local: 4 tarjetas de 317×543.4px, gap 0px exacto entre las 3 uniones.

### Fix 2026-07-20 — "Prepárate para rendir en cada disciplina": medido en vivo, título centrado + tarjetas edge-to-edge

Segunda medición real con `layout-inspector` (entre esta y la anterior, la herramienta pasó por dos rondas de fix — v1.1 y v1.2 — porque no detectaba la fila cuando el título vive en un bloque separado del bloque de las cards, justo el caso de esta sección; ver changelog en `../../../../vtex-bookmarklets/layout-inspector/docs/release-v1.md`).

Datos crudos: 26 "ítems" detectados, mismo patrón de slick con loop infinito que "Elegí viendo" — 6 slides visibles (Hockey/Training/Moda/Running/Tenis/Outdoor, con imagen y texto) + 20 clones ocultos. Filtrando por los visibles:

- **Tarjeta: 219.8 × 349.8px** (la maqueta tenía 204px de ancho) — corregido a **220px**.
- **Gap entre tarjetas: 0px** (la maqueta tenía 16px, el gap por default de `.sp-carousel-track`) — mismo patrón edge-to-edge que ya se había visto en "Elegí viendo". Nuevo modificador `.sp-disc-track`.
- **Título centrado** (`text-align: center` confirmado en el `<h3>` real, clase `vtex-rich-text-0-x-heading--slider-title-recommended`) — la maqueta lo tenía a la izquierda, igual que el resto de los títulos. Se le agregó `.sp-section-title-center` (mismo modificador ya usado en "Clubes y Selecciones").

**Nota sobre el campo `looksCentered` del JSON:** dio `false` con un delta enorme (-879px) — es un falso negativo conocido del tool: el cálculo de centrado usa el centro de *todos* los ítems detectados (26, incluyendo los 20 clones ocultos del loop, que se extienden muy a la izquierda/derecha de la pantalla), no solo los 6 visibles. El dato confiable acá es `title.textAlign: "center"` directo sobre el `<h3>`, no el delta calculado contra la fila. Mismo caveat aplica a cualquier módulo slick con loop infinito — priorizar `textAlign`/`justifyContent` del título por sobre `looksCentered` cuando el carrusel tiene clones.

Verificado en el navegador local: 6 tarjetas de 220px, gap 0px exacto entre las 5 uniones, título con `justify-content: center`.

### Creación 2026-07-20 — Mega-menú "Hombre" del navbar, con medición en vivo de la columna "Calzado"

No existía en la maqueta — quedaba anotado como pendiente ("Header con menú de categorías desplegado", ver más abajo). Se construyó a partir de dos fuentes:

1. **Medido en vivo** con `layout-inspector` v1.7 (repo `vtex-bookmarklets`) sobre `sporting.com.ar`, apuntando al link "Calzado" dentro del menú desplegado de "Hombre" — esta fue la corrida que terminó de darle sentido a las correcciones v1.6/v1.7 del tool (colisión de título con la sección "Categorías" de la home + límite de altura al "subir" por el DOM buscando la fila/columna). Resultado limpio: columna de **11 ítems** (10 categorías + "Ver Todo"), cada uno **129.6×26.1px**, **gap 0** (van pegados, sin separación entre renglones), alineados exactos con el título de la columna (mismo ancho, mismo `left`).
2. **Captura de pantalla del usuario** para el resto del menú: qué columnas hay (Calzado, Indumentaria, Accesorios, Disciplinas, Destacados), el contenido de cada una, y el banner de la derecha (imagen + "Hombre" + botón "VER TODO").

**Qué es dato duro y qué es inferido — importante no confundir:**
- **Medido exacto:** geometría de ítem de la columna Calzado (129.6×26.1px redondeado a 130×26, gap 0) y su contenido completo (Zapatillas, Zapatillas Running, Zapatillas Training, Zapatillas Moda, Zapatillas Outdoor, Botines, Futbol 11, Futbol 5, Futbol Sala, Ojotas/Chinelas, Ver Todo).
- **Inferido de la captura, no remedido:** el contenido de Indumentaria/Accesorios/Disciplinas/Destacados y del banner. La geometría de ítem (130×26px, gap 0) se **asumió igual** en las 5 columnas por ser el mismo componente repetido — no se confirmó columna por columna con el bookmarklet.
- El título de columna ("Calzado", etc.) es un `<a>` real en el sitio (no un `<h4>` genérico) con el mismo ancho/alto de renglón que los links de abajo, sin gap extra — así quedó implementado (`.sp-mega-col-title` es un ítem más de la lista, solo en bold).
- "Ver Todo" va en verde (`--sp-green`), distinto del resto de los links — confirmado por captura, no aparece en todas las columnas (Disciplinas y Destacados no lo tenían visible en la captura, se dejó sin ese link en esas dos).

**Implementación:** `.sp-nav-item` (wrapper de "HOMBRE", `position:relative`) + `.sp-mega-menu` (`position:absolute`, oculto por default, `display:flex` en `:hover` real — igual que el sitio real) + `.sp-mega-col` (ancho fijo 130px) + `.sp-mega-banner`. Se agregó un toggle nuevo al panel de control ("Menú desplegado (Hombre) — fijo", `data-megamenu`) que **fuerza** el menú abierto sin necesitar hover — útil para revisar/capturar, no reemplaza el comportamiento real (que sigue siendo hover).

**Lección de proceso para la próxima vez:** al verificar este cambio en el Browser pane, la primera tanda de mediciones dio resultados sin sentido (anchos variables 58-130px, alto uniforme 45px en vez de 26px) pese a que el HTML/CSS en disco ya tenían el fix — la pestaña tenía **cacheada una versión vieja del HTML y el CSS** (confirmado: el script cargado en la pestaña ni siquiera contenía el texto "megamenu"). Ni un `navigate` con `force:true` ni un query-string de cache-bust en la URL lo destrabaron — hizo falta abrir una **pestaña nueva** (`tabs_create`) para que el Browser pane tomara el archivo actualizado. Si una verificación da números que no tienen ningún sentido con el CSS que se acaba de escribir, sospechar primero de esto antes de asumir un bug real.

**Pendiente:** remedir Indumentaria/Accesorios/Disciplinas/Destacados con el bookmarklet si se quiere confirmar que la geometría de ítem es 100% idéntica en las 5 columnas (razonablemente esperable al ser el mismo componente, pero no confirmado). Contenido exacto de "Ver Todo" en Disciplinas/Destacados sin confirmar (se asumió que no existe en esas 2, según lo que se veía en la captura).

### Corrección 2026-07-21 — Mega-menú: las 5 columnas medidas, ancho NO era uniforme

El usuario remidió las 4 columnas restantes con `layout-inspector` v1.7. El intento de reproducir la interacción en el navegador de esta sesión falló (el sitio mostró el menú **mobile** — `sportingio-drawer-menu-0-x-*`, oculto fuera de pantalla — en vez del mega-menú de escritorio `sportingio-custom-menu-0-x-*`, aparentemente porque esta sesión no logra que el sitio detecte viewport de escritorio; mismo tipo de limitación de scraping en vivo ya documentado para este sitio). El usuario lo hizo desde su propio navegador y pasó los 4 JSON.

Confirmado con los 4 JSON + el de Calzado ya tomado:

- **El ancho NO es uniforme entre columnas** (se había asumido 130px para las 5 por ser "el mismo componente") — cada columna tiene su propio ancho fijo, aparentemente dimensionado al texto más largo de esa columna: Calzado 129.6→**130px**, Indumentaria 100.2→**100px**, Accesorios 114.3→**114px**, Disciplinas 79.3→**79px**, Destacados 139.9→**140px**. Alto de ítem (26.1→26px) y gap vertical (0) sí son idénticos en las 5, eso sí se confirmó.
- **Gap entre columnas:** el tool no lo mide directamente (mide una columna a la vez), pero se derivó comparando la posición `left` de los 4 títulos entre sí — da **63.5px** exactos y consistentes en las 4 uniones (Calzado→Indumentaria, Indumentaria→Accesorios, Accesorios→Disciplinas, Disciplinas→Destacados). Corregido de los 40px estimados por captura.
- **"Ver Todo" en Accesorios:** SÍ está (16 ítems reales, el último es "Ver Todo") — se había asumido que no, por no verse completo en la captura de pantalla original. Confirmado que Disciplinas y Destacados siguen sin él (11 y 8 ítems reales respectivamente, ninguno termina en "Ver Todo").

Se agregaron clases modificadoras por columna (`.sp-mega-col.calzado/.indumentaria/.accesorios/.disciplinas/.destacados`, cada una con su `width` propio) en vez del `.sp-mega-col { width:130px }` único que había antes, se ajustó el gap del `.sp-mega-menu` a 63.5px, y se sumó el link "Ver Todo" faltante en Accesorios.

Verificado en el navegador (pestaña nueva, por el problema de caché ya documentado arriba): anchos 130/100/114/79/140px exactos por columna, gap entre columnas 63.5px en las 4 uniones, "Ver Todo" presente en Calzado/Indumentaria/Accesorios y ausente en Disciplinas/Destacados — todo coincide con lo medido.

**Pendiente actualizado:** el banner de la derecha sigue sin medir (no es una lista de ítems, el tool no aplica) — sigue basado en la captura de pantalla.

## Pantallas maquetadas

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Home completa fiel al sitio real, con **panel de control** (mismo patrón que `producto-modular.html`) que prende/apaga cada sección: slider principal de banners, tira de cuotas/financiación, categorías (Calzado/Indumentaria/Accesorios/Ofertas), Novedades (carrusel), Tienda Oficial Adidas (carrusel), disciplinas (6: Hockey/Training/Moda/Running/Tenis/Outdoor), Elegí viendo (banners), Ultimas!! (carrusel), Clubes y Selecciones de Fútbol (carrusel), barra de beneficios. Header (topline negro + header-full **verde** con buscador/ubicación/Entrar + navbar de categorías con 2 badges-logo al final, igual que en las PDP) y footer (newsletter + columnas + copyright) quedan siempre visibles — son chrome fijo del sitio real, no módulos opcionales. El estado queda codificado en el hash de la URL para compartir el link de una combinación puntual. **Responsive real** (agregado 2026-07-16): a ≤720px el navbar se oculta (categorías viven en un menú hamburguesa ☰, nuevo en el header), el buscador expandido/ubicación/wishlist desaparecen, el slider principal baja a 220px, el footer queda reducido a solo la franja de newsletter, y las secciones Disciplinas/Elegí viendo/Ultimas!!/Clubes y Selecciones/barra de beneficios no aparecen en absoluto (se ocultan siempre en mobile, sin importar el toggle del panel) — confirmado navegando el sitio real en viewport 375px. |
| `producto-modular.html` | **PDP vigente — mantener acá los cambios de PDP a partir de ahora.** Producto genérico con panel de control lateral que prende/apaga cada módulo: vendedor (genérico/marketplace/propio — genérico es el default, refleja un producto sin regla de seller especial), video, precio con/sin descuento, talle único/varios, última unidad, cupón no aplica. Breadcrumb de 4 niveles (Inicio › Sporting › Calzado › Zapatillas), acordeón en el orden real (Descripción, Detalles, Especificaciones, Envíos gratis, ítem de cambios según vendedor, Cuotas y Promociones, Reseñas), sección "Productos similares" y "También te puede interesar" como carruseles. El estado queda codificado en el hash de la URL para poder compartir el link de una combinación puntual. Usa `design-system/tokens.css` solo para el chrome del panel (no para el contenido de la PDP, que sigue la fidelidad de `sporting.css`). **Responsive real** (agregado 2026-07-16): a ≤720px la galería y la info se apilan en 1 columna, las miniaturas se reemplazan por paginación de puntos y aparece un ícono de compartir junto al breadcrumb — confirmado navegando el sitio real en viewport 375px. |
| `producto-adidas.html` ⚠️ snapshot histórico, congelado | PDP del producto seller Adidas (`camisetas-de-equipos-adidas-camiseta-titular-seleccion-argentina-26-hombre-59135/p`), capturado 2026-07-16: header completo (topline WOKER + buscador + navbar de categorías), breadcrumb, galería con miniaturas, badges Envío Gratis/Tienda Adidas, precio con impuestos, cuotas, selector de talle, stepper + agregar al carrito, "Vendido y distribuido por adidas", código postal, acordeón (Descripción, Especificaciones, Detalles, Envíos, **No se admiten cambios directos**, Cuotas y Promociones, Reseñas), productos similares. **No se sigue actualizando** — reemplazado por `producto-modular.html` (estado seller=marketplace). Se conserva como referencia de la captura real original. |
| `producto-sporting.html` ⚠️ snapshot histórico, congelado | PDP del producto seller **Sporting** (tienda propia) con video (`bicicleta-trek-slash-9-7-slx-xt-rodado-29-talle-ml-1501767-000/p`), capturado 2026-07-16: mismos componentes base que la de Adidas, más los que no estaban en esa captura — precio con descuento (tachado + badge `-15%`), aviso de stock urgente ("¡Última unidad disponible!"), badge "NO APLICA CUPONES" + nota, **video embed** debajo de la galería de imágenes (miniatura + play + info de canal), talle único, **sin** box de "Vendido y distribuido por" (por ser tienda propia), y acordeón **"Cambios y devoluciones"** (en vez de "No se admiten cambios directos"). **No se sigue actualizando** — reemplazado por `producto-modular.html` (estado seller=propio, discount=on, stock=last, coupon=blocked). Se conserva como referencia de la captura real original. |
| `plp.html` | Página de listado de categoría (PLP), fiel a `sporting.com.ar/sporting/calzado/zapatillas/hombre` capturado en vivo 2026-07-16: breadcrumb de 5 niveles, sidebar de filtros (chips activos, Vendido por, Categoría, Tipo de producto, 7 grupos colapsados, rango de precio), barra de resultados (contador + orden), grid de 8 tarjetas de producto con mini-carrusel de fotos por tarjeta y botón "Mostrar más". Sin panel de control modular (a diferencia de home/PDP) — es la primera captura, no tiene variantes togglables todavía. **Responsive real** (agregado 2026-07-16, ver corrección abajo): a ≤720px la sidebar se convierte en un panel deslizante desde la derecha (botón "Filtrar"), con barra "Ordenar Por/Filtrar" y grid de 2 columnas — confirmado navegando el sitio real en viewport 375px. |
| `carrito.html` | Carrito (minicart), fiel a la captura real en desktop (1280px) y mobile (375px): panel deslizante desde la derecha (415px fijos en desktop, ~85% del ancho en mobile) con mensaje de envío gratis, línea de producto (miniatura + talle + stepper + precio + quitar), fila de cross-sell horizontal de accesorios, total y botón "IR AL CHECKOUT" (no sticky). Botón 🛒 en el header reabre el panel si se cierra. Checkout completo sigue pendiente — ver Pendiente. |
| `checkout.html` | **Solo vista mobile** (pedido explícito) del primer paso del checkout ("Mi carrito"), fiel a la captura real en viewport 375px navegando `sporting.com.ar/checkout/#/cart`: header propio solo con logo (app VTEX aparte, no reusa el header del sitio), fondo gris con tarjetas blancas, línea de producto, cupón colapsado, tabla de totales, botón "FINALIZAR COMPRA" (verde institucional), cross-sell "Completa tu compra con..." y footer mínimo de una línea. No incluye los pasos siguientes del checkout (datos, envío, pago, confirmación) ni versión desktop — ver Pendiente. |

### Cruce con la regla de negocio del portal de pedidos

El acordeón de la PDP confirma en el sitio real la regla ya documentada desde el portal de pedidos:
- **Seller Adidas** (`producto-adidas.html`): acordeón "No se admiten cambios directos" → linkea a `mockups/pedidos-portal/devolucion-opciones-adidas.html` (sin opción "Cambio").
- **Seller Sporting** (`producto-sporting.html`): acordeón "Cambios y devoluciones" → linkea a `mockups/pedidos-portal/devolucion-opciones.html` (variante B2C, con las 3 opciones, incluyendo "Cambio").

Ver fila correspondiente en `docs/cross-references.md`.

### Creación 2026-07-16 — Carrito (minicart), solo vista mobile

Se agregó "Zapatillas adidas Runblaze De Hombre" al carrito desde la PDP en vivo, con viewport forzado a 375x812, y se capturó el panel que se abrió automáticamente. Es un **minicart tipo drawer** (VTEX `minicart-2-x-drawer`), no una página de carrito propia — se abre sobre un fondo oscuro al agregar un producto. Estructura real confirmada de arriba a abajo:

- **Header del panel:** título "Carrito" + botón de cierre ✕.
- **Mensaje de envío gratis:** "🚚 Te faltan $59.991 para tener envío gratis." — texto plano, se buscó explícitamente una barra de progreso visual y **no existe**.
- **Línea de producto:** miniatura 90×90, nombre, talle, selector de cantidad (stepper -/+, reusa `.sp-qty-stepper` ya existente de la PDP) y precio, con un botón de quitar (✕ chico) en la esquina superior derecha de la línea.
- **Fila de cross-sell horizontal** (scroll, sin título): accesorios (gorras, riñoneras) con miniatura chica (~64px), precio (algunos con descuento tachado) y botón "Agregar al carrito" propio por tarjeta — confirmado que hay más productos de los que entran en pantalla (imágenes con posición muy más allá del ancho real de 375px, o sea sigue de largo en scroll horizontal).
- **Total + botón "IR AL CHECKOUT"** ancho completo — confirmado que **no** es sticky/fijo (`position:static`), es parte del scroll normal del panel.
- **Nota al pie:** "Las promociones y costo de envío lo verás aplicado en el carrito".

El panel ocupa ~85% del ancho de pantalla (318.75px de 375px reales), deslizando desde la derecha — mismo patrón visual que el panel de filtros de `plp.html`, aunque son componentes VTEX distintos (minicart vs. search-result filter).

### Corrección 2026-07-16 — Carrito desktop (mismo componente, ancho fijo)

Se agregó el mismo producto al carrito en vivo con viewport forzado a 1280x900. Es **el mismo panel** (`vtex-minicart-2-x-drawer`) que en mobile, no una versión distinta — la diferencia real es solo el ancho: en desktop es **fijo, 415px** (confirmado por `getBoundingClientRect`), no proporcional a la pantalla como en mobile (~85%). El resto de la estructura (header, mensaje de envío gratis, cross-sell horizontal, total + botón, nota al pie) se mantiene igual. El fondo oscuro detrás también existe en desktop (overlay real con opacity 0.5, color base `rgb(3,4,78)` — un azul muy oscuro que a simple vista se ve casi negro, no se replicó ese tono exacto por ser indistinguible del negro semi-transparente ya usado).

**Nota metodológica:** en esta sesión, la línea de producto (miniatura + nombre + talle + stepper) no llegó a renderizarse en la captura de escritorio pese a que el Total sí reflejaba el producto agregado ($89.999) — posible carrera de renderizado async específica de esa sesión de captura, no algo que se pudiera reproducir de forma consistente en 2 intentos. Se reusó la estructura de esa línea ya confirmada en la captura mobile (mismo componente VTEX, `vtex-product-list-0-x-*`), en vez de inventarla de cero.

Se implementó como un único breakpoint en `sporting.css`: `.sp-cart-drawer` tiene 415px fijos por defecto (desktop) y se angosta a ~85%/340px máx. dentro de `@media (max-width: 720px)` (mismo breakpoint ya usado en el resto del sitio). No se creó un archivo nuevo — `carrito.html` ahora muestra ambas versiones según el ancho de ventana, igual que el resto de las maquetas responsive del sitio. Verificado en el navegador en los dos breakpoints (`getBoundingClientRect` del drawer: 1280px → x=865/width=415; 375px → x=56.25/width=318.75, sin cambios respecto a antes).

Se creó `carrito.html` como página nueva, **solo con la vista mobile** (pedido explícito del usuario) — muestra el header/navbar mobile ya existente de fondo, con el panel abierto por default y un botón 🛒 en el header para volver a abrirlo si se cierra. No se maquetó una versión desktop del carrito ni el checkout completo (quedan pendientes, ver abajo). Se agregaron las clases `.sp-cart-*` a `sporting.css`.

### Creación 2026-07-16 — Checkout (paso "Mi carrito"), solo vista mobile

Se agregó un producto al carrito y se clickeó "Ir al checkout" desde la PDP en vivo, con viewport forzado a 375x812, navegando hasta `sporting.com.ar/checkout/#/cart`. Hallazgo clave: **el checkout es una app VTEX aparte** ("checkout-v6", confirmado por el nombre del asset del logo `checkout-v6-logo.png`), no reutiliza el header/navbar/footer del resto del sitio. Estructura real confirmada de arriba a abajo:

- **Header propio:** blanco, 68px de alto, **solo el logo centrado** — sin buscador, navbar, wishlist ni ícono de carrito (confirmado por `offsetParent: null` en esos elementos, existen en el DOM pero ocultos en mobile).
- **Fondo de página gris claro** (`rgb(245,245,245)`, confirmado por `getComputedStyle`) con tarjetas blancas encima — look distinto al resto del sitio (blanco puro).
- **Tarjeta "Mi carrito":** línea de producto (nombre, "Color: Azul - Talle: 38", precio) + link "Seguir comprando".
- **Tarjeta de totales:** "Cupón de descuento" es un toggle colapsado por default (el input+botón "Añadir" existen en el DOM con `rect` en 0, se revelan al tocar — no se llegó a abrir en esta captura) + tabla Subtotal/Precio sin impuestos/IVA incluido/Total + botón "FINALIZAR COMPRA" ancho completo, **verde institucional exacto** (`rgb(37,182,12)` = mismo `--sp-green` del resto del sitio, confirmado por `getComputedStyle` — el checkout no tiene paleta propia pese a ser una app distinta).
- **"Completa tu compra con...":** cross-sell horizontal de accesorios (gorras, riñoneras), varios con descuento tachado + badge de porcentaje — reusa `.sp-cart-upsell-*` ya creado para el minicart de `carrito.html` (mismo patrón visual).
- **Footer mínimo:** una sola línea de copyright, sin columnas ni newsletter — confirmado que el checkout no carga el footer del sitio.
- Se detectaron (pero no se maquetaron, por ser **desktop-only**, `offsetParent: null` en mobile) un banner de MODO (medio de pago) y una fila de badges de confianza (tarjeta/cambios/envíos).

Se creó `checkout.html` como página nueva, **solo con la vista mobile** del primer paso del checkout ("Mi carrito"/resumen de compra) — los pasos siguientes (datos personales, envío, pago, confirmación) no se navegaron. Se agregaron las clases `.sp-checkout-*` a `sporting.css`, reusando `.sp-cart-upsell-*` para el cross-sell.

## Pendiente / no capturado todavía

- [x] Carrito de escritorio — capturado y maqueteado 2026-07-16, mismo componente que mobile con ancho fijo (415px)
- [ ] Checkout: solo se capturó el primer paso ("Mi carrito") en mobile — faltan datos personales, envío, medios de pago y confirmación, y toda la versión desktop
- [x] Vista mobile de home, PLP y PDP — capturadas y maquetadas (ver correcciones 2026-07-16 arriba). Header/footer mobile son chrome global, comparten CSS en las 3 páginas.
- [x] Header con menú de categorías desplegado — creado 2026-07-20, mega-menú de "Hombre" con 5 columnas + banner (ver corrección de esa fecha arriba). Solo el menú de "Hombre"; Mujer/Niños/Deportes/Marcas no se capturaron, quedan pendientes si hacen falta.
- [ ] Contenido real de "Especificaciones" y "Detalles" (se maquetaron con placeholder — no se expandieron en la captura)
- [ ] Contenido exacto de las tarjetas de "⚽ Clubes y Selecciones de Fútbol" (se infirió de los nombres de club/selección que aparecen en el mega-menú, no se llegó a abrir el carrusel real)
- [ ] "Últimos vistos" — deliberadamente no maquetado (es contenido personalizado por sesión, no hay un "real" fijo que capturar)
- [ ] Badge "EVENTO" del navbar (`BotonEventoMenu.svg`) — probablemente campaña estacional del Mundial 2026, confirmar si sigue vigente en la próxima verificación y sacarlo si no

## Al agregar pantallas nuevas

Reusar las clases de `sporting.css` (`.sp-topline`, `.sp-header-full`, `.sp-navbar`, `.sp-product-card`, `.sp-cat-card`, `.sp-footer-*`, etc.) — el header y el footer son los mismos en todas las páginas del sitio, no crear variantes nuevas. Si el usuario comparte capturas de otras páginas, actualizar esta tabla y registrar en `../../../docs/cross-references.md` si empieza a reflejar una doc específica del sitio.

**No olvidar:** cada vez que se agrega un archivo `.html` nuevo bajo `mockups/sites/sporting/` (o cualquier maqueta nueva en el repo), sumarlo también al `index.html` de la raíz del repo (la landing de Design Hub, sección "🏬 Sitios propios") — quedó desactualizado 3 mockups (PLP, carrito, checkout) porque nada lo recordaba.

**PDP:** cualquier variante o módulo nuevo de PDP (nuevo estado de precio, nuevo aviso de stock, nueva regla de seller, etc.) se agrega como módulo togglable en `producto-modular.html`, no como archivo nuevo. `producto-adidas.html` y `producto-sporting.html` quedan congelados como snapshot de las capturas reales originales — no se les suman módulos nuevos.

**Home:** cualquier sección nueva o variante de una sección existente se agrega como módulo togglable en `index.html` (clase `mod-<nombre>` + entrada en el objeto `MODULES` del script), siguiendo el mismo patrón que la PDP modular.
