# Notas — Maqueta del sitio Sporting

## Estado

Kickoff hecho 2026-07-16. Fuente: `https://www.sporting.com.ar/` navegado en vivo (home). Es un sitio VTEX IO (clases `vtex-*` en el DOM).

Identidad propia capturada con `getComputedStyle` y lectura de DOM: verde institucional `#25b60c`, negro `#111111` (announcement bar), tipografía **Poppins**. Estilos en `sporting.css` — separados del design system interno, mismo criterio que `marketplace-portal/public` (no alinear al azul institucional sin confirmar).

### Corrección 2026-07-16 — Footer real (v1, INCOMPLETA — ver v2 abajo)

El footer original de la maqueta (barra "Envío gratis" + 3 columnas de links Ayuda/Sporting/Seguinos + copyright) era una **estructura genérica inventada**, nunca confirmada contra el sitio real (quedaba anotado en "Pendiente"). Se navegó en vivo `https://www.sporting.com.ar/zapatillas-adidas-runblaze-de-hombre-6ih6705-000/p` y se leyó el footer con `getComputedStyle`, concluyendo (mal, ver corrección de abajo) que el footer eran solo dos franjas sin columnas ni copyright.

### Corrección 2026-07-16 — Footer real (v2, la buena)

La lectura anterior se quedó corta: el contenido de abajo del footer es **lazy-load** (3 `vtex-render__lazy-container` sin montar) y un solo scroll-al-fondo con espera corta no alcanza para que termine de renderizar. Se repitió la captura forzando scroll incremental completo (ida y vuelta) tanto en home como en la PDP, y **sí** hay columnas y copyright. Estructura real completa, de arriba a abajo:

1. Banda verde (`--sp-green`, `rgb(37,182,12)`) — "Suscribite a nuestro newsletter" + input de email + botón "Enviar" (negro) + checkbox de opt-in.
2. Banda negra (`#111111`) — 4 columnas de links: **Nosotros** (Acerca de Nosotros, Sucursales, Contacto, Trabaja con Nosotros, Términos y Condiciones), **Información** (Como comprar, Medios de pago, Preguntas frecuentes, Guía de Talles, Politicas de envio/privacidad/cambio y devolución, Defensa del Consumidor, Blog Informativo, Mapa del Sitio), **Ayuda** (WhatsApp/teléfono de contacto, Cambios y devoluciones, Botón de Arrepentimiento, Gestión de Pedidos, Compra segura, Sugerencias y reclamos), **Seguinos** (Instagram, Facebook, Youtube, Twitter) — y debajo, línea de copyright "Sporting © | Todos los derechos reservados." (11px, blanco sobre negro).
3. Banda gris clara (`#f0f0f0`) — "Términos más buscados" + lista numerada de 10 términos.

Se corrigieron las clases `.sp-footer-*` en `sporting.css` (se agregaron `.sp-footer-columns` y `.sp-footer-copyright`) y el markup en las 4 pantallas que usan `sporting.css` (`index.html`, `producto-modular.html`, y las dos snapshot históricas `producto-adidas.html`/`producto-sporting.html`, que comparten el mismo footer global aunque estén congeladas en su contenido de PDP).

**Lección para próximas capturas:** cuando el body/scrollHeight de una página VTEX no coincide con lo que se ve en el DOM, o el footer/final de página parece corto, forzar un scroll incremental completo (no solo `scrollTo(0, scrollHeight)` una vez) con esperas entre pasos antes de dar la captura por definitiva.

### Corrección 2026-07-16 — Header real

El header de `index.html` (home) usaba un header **inventado**: barra verde con hamburger + logo + iconos, más un `.sp-announce` negro separado y una `.sp-locationbar` propia — nunca confirmado contra el sitio real. El header "completo" que ya usaban las PDP (`.sp-topline` + `.sp-header-full` + `.sp-navbar`) sí venía de una captura real, pero con datos inventados en el navbar (iconos ⚫🇦🇷 al final, sin "Adidas Seller", colores no confirmados).

Se navegó en vivo la home y la PDP y se leyó el header real con `getComputedStyle`/`getBoundingClientRect`. Confirmado: **el header es idéntico en todas las páginas del sitio** (mismo componente VTEX), 3 filas:

1. `.sp-topline` (negro): carrusel de banners promocionales (se simplifica a uno estático, como ya estaba) + link "Segui tu pedido ⬅" (sin acento, flecha a la izquierda — así está en el sitio real) a `gestiondepedidos.sporting.com.ar/login`.
2. `.sp-header-full` (blanco): logo, buscador, "Ingresá: Tu ubicación", **"Entrar"** (no hay ícono de usuario suelto — es un link de texto), ícono de wishlist, ícono de carrito.
3. `.sp-navbar`: **8 categorías** confirmadas — Hombre, Mujer, Niños, Deportes, Marcas, OFERTAS (rojo `#ff0033`, bold), Novedades (verde `--sp-green`, bold), **Adidas Seller** (faltaba). El resto pesa normal (400), no 600. Sin iconos de marca/bandera al final — eso era inventado.

Se unificó `index.html` (home) para usar el mismo header de 3 filas que las PDP (antes tenía uno propio, simplificado e inventado) y se sacó el toggle "Announcement bar" del panel de control de la home — el topline es chrome fijo del sitio real, no un módulo opcional. Se eliminaron de `sporting.css` las clases `.sp-announce`, `.sp-header` (versión simple) y `.sp-locationbar`, que quedaron sin uso.

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
- **Orden real del acordeón:** Descripción, Detalles, Especificaciones, Envíos gratis, *(ítem de cambios, ver abajo)*, Cuotas y Promociones, Reseñas. La maqueta tenía Especificaciones antes que Detalles — reordenado.
- **Tercer estado de "Vendedor":** este producto puntual (Adidas de marca, pero sin ningún seller marketplace explícito) muestra un acordeón genérico **"Primer cambio | gratis"** en vez de la caja "Vendido y distribuido por" o la regla de "no cambios" — no es lo mismo que el seller Adidas marketplace de `producto-adidas.html` (que es otro producto distinto: la camiseta de la Selección). Se agregó un tercer valor al toggle "Vendedor" — **Genérico (sin seller especial)**, ahora el default — que muestra este ítem y no muestra badge/caja de seller. Los otros dos valores (marketplace/propio) siguen documentando la regla de negocio ya confirmada por el usuario para sellers con reglas propias.
- **"Productos similares" es un carrusel** (Previous/Next + paginación), no estaba maquetado en `producto-modular.html` en absoluto — se agregó con el mismo componente de carrusel que ya se usa en la home (`.sp-carousel-row`), con 3 productos de ejemplo.
- Galería: la real tiene 6 miniaturas, la maqueta tenía 4 — se completó a 6.

**Nota metodológica:** la regla "sellers sin opción Cambio" se había confirmado sobre la PDP de una **camiseta** (`camisetas-de-equipos-adidas-...-59135/p`), no sobre esta zapatilla — son productos distintos y no todos los productos "adidas" tienen la misma marca de seller. No generalizar reglas de un producto a todo el catálogo sin confirmar por producto.

## Pantallas maquetadas

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Home completa fiel al sitio real, con **panel de control** (mismo patrón que `producto-modular.html`) que prende/apaga cada sección: tira de cuotas/financiación, categorías (Calzado/Indumentaria/Accesorios/Ofertas), Novedades (carrusel), Tienda Oficial Adidas (carrusel), disciplinas (6: Hockey/Training/Moda/Running/Tenis/Outdoor), Elegí viendo (banners), Ultimas!! (carrusel), Clubes y Selecciones de Fútbol (carrusel), barra de beneficios. Header (topline + buscador/ubicación + navbar de categorías, igual que en las PDP) y footer (newsletter + columnas + copyright + términos más buscados) quedan siempre visibles — son chrome fijo del sitio real, no módulos opcionales. El estado queda codificado en el hash de la URL para compartir el link de una combinación puntual |
| `producto-modular.html` | **PDP vigente — mantener acá los cambios de PDP a partir de ahora.** Producto genérico con panel de control lateral que prende/apaga cada módulo: vendedor (genérico/marketplace/propio — genérico es el default, refleja un producto sin regla de seller especial), video, precio con/sin descuento, talle único/varios, última unidad, cupón no aplica. Breadcrumb de 4 niveles (Inicio › Sporting › Calzado › Zapatillas), acordeón en el orden real (Descripción, Detalles, Especificaciones, Envíos gratis, ítem de cambios según vendedor, Cuotas y Promociones, Reseñas), y sección "Productos similares" como carrusel. El estado queda codificado en el hash de la URL para poder compartir el link de una combinación puntual. Usa `design-system/tokens.css` solo para el chrome del panel (no para el contenido de la PDP, que sigue la fidelidad de `sporting.css`) |
| `producto-adidas.html` ⚠️ snapshot histórico, congelado | PDP del producto seller Adidas (`camisetas-de-equipos-adidas-camiseta-titular-seleccion-argentina-26-hombre-59135/p`), capturado 2026-07-16: header completo (topline WOKER + buscador + navbar de categorías), breadcrumb, galería con miniaturas, badges Envío Gratis/Tienda Adidas, precio con impuestos, cuotas, selector de talle, stepper + agregar al carrito, "Vendido y distribuido por adidas", código postal, acordeón (Descripción, Especificaciones, Detalles, Envíos, **No se admiten cambios directos**, Cuotas y Promociones, Reseñas), productos similares. **No se sigue actualizando** — reemplazado por `producto-modular.html` (estado seller=marketplace). Se conserva como referencia de la captura real original. |
| `producto-sporting.html` ⚠️ snapshot histórico, congelado | PDP del producto seller **Sporting** (tienda propia) con video (`bicicleta-trek-slash-9-7-slx-xt-rodado-29-talle-ml-1501767-000/p`), capturado 2026-07-16: mismos componentes base que la de Adidas, más los que no estaban en esa captura — precio con descuento (tachado + badge `-15%`), aviso de stock urgente ("¡Última unidad disponible!"), badge "NO APLICA CUPONES" + nota, **video embed** debajo de la galería de imágenes (miniatura + play + info de canal), talle único, **sin** box de "Vendido y distribuido por" (por ser tienda propia), y acordeón **"Cambios y devoluciones"** (en vez de "No se admiten cambios directos"). **No se sigue actualizando** — reemplazado por `producto-modular.html` (estado seller=propio, discount=on, stock=last, coupon=blocked). Se conserva como referencia de la captura real original. |

### Cruce con la regla de negocio del portal de pedidos

El acordeón de la PDP confirma en el sitio real la regla ya documentada desde el portal de pedidos:
- **Seller Adidas** (`producto-adidas.html`): acordeón "No se admiten cambios directos" → linkea a `mockups/pedidos-portal/devolucion-opciones-adidas.html` (sin opción "Cambio").
- **Seller Sporting** (`producto-sporting.html`): acordeón "Cambios y devoluciones" → linkea a `mockups/pedidos-portal/devolucion-opciones.html` (variante B2C, con las 3 opciones, incluyendo "Cambio").

Ver fila correspondiente en `docs/cross-references.md`.

## Pendiente / no capturado todavía

- [ ] Página de listado de categoría (PLP)
- [ ] Carrito / checkout
- [ ] Vista mobile (solo se capturó desktop)
- [ ] Header con menú de categorías desplegado (el `☰`/navbar no se abrió en la captura, solo se vieron los links del mega-menú en el DOM)
- [ ] Contenido real de "Especificaciones" y "Detalles" (se maquetaron con placeholder — no se expandieron en la captura)
- [ ] Contenido exacto de las tarjetas de "⚽ Clubes y Selecciones de Fútbol" (se infirió de los nombres de club/selección que aparecen en el mega-menú, no se llegó a abrir el carrusel real)
- [ ] "Últimos vistos" — deliberadamente no maquetado (es contenido personalizado por sesión, no hay un "real" fijo que capturar)

## Al agregar pantallas nuevas

Reusar las clases de `sporting.css` (`.sp-topline`, `.sp-header-full`, `.sp-navbar`, `.sp-product-card`, `.sp-cat-card`, `.sp-footer-*`, etc.) — el header y el footer son los mismos en todas las páginas del sitio, no crear variantes nuevas. Si el usuario comparte capturas de otras páginas, actualizar esta tabla y registrar en `../../../docs/cross-references.md` si empieza a reflejar una doc específica del sitio.

**PDP:** cualquier variante o módulo nuevo de PDP (nuevo estado de precio, nuevo aviso de stock, nueva regla de seller, etc.) se agrega como módulo togglable en `producto-modular.html`, no como archivo nuevo. `producto-adidas.html` y `producto-sporting.html` quedan congelados como snapshot de las capturas reales originales — no se les suman módulos nuevos.

**Home:** cualquier sección nueva o variante de una sección existente se agrega como módulo togglable en `index.html` (clase `mod-<nombre>` + entrada en el objeto `MODULES` del script), siguiendo el mismo patrón que la PDP modular.
