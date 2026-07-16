# Notas — Maqueta del sitio Sporting

## Estado

Kickoff hecho 2026-07-16. Fuente: `https://www.sporting.com.ar/` navegado en vivo (home). Es un sitio VTEX IO (clases `vtex-*` en el DOM).

Identidad propia capturada con `getComputedStyle` y lectura de DOM: verde institucional `#25b60c`, negro `#111111` (announcement bar), tipografía **Poppins**. Estilos en `sporting.css` — separados del design system interno, mismo criterio que `marketplace-portal/public` (no alinear al azul institucional sin confirmar).

### Corrección 2026-07-16 — Footer real

El footer original de la maqueta (barra "Envío gratis" + 3 columnas de links Ayuda/Sporting/Seguinos + copyright) era una **estructura genérica inventada**, nunca confirmada contra el sitio real (quedaba anotado en "Pendiente"). Se navegó en vivo `https://www.sporting.com.ar/zapatillas-adidas-runblaze-de-hombre-6ih6705-000/p` y se leyó el footer real con `getComputedStyle`: el footer completo del sitio (VTEX IO) son solo **dos franjas**, sin columnas de links ni iconos sociales ni barra de copyright:

1. Banda verde (`--sp-green`, `rgb(37,182,12)` confirmado) con "Suscribite a nuestro newsletter" + input de email + botón "Enviar" (negro) + checkbox de opt-in.
2. Banda gris clara (`#f0f0f0` confirmado) con "Términos más buscados" + lista numerada de 10 términos (links de búsqueda).

Se corrigieron las clases `.sp-footer-*` en `sporting.css` y el markup en las 4 pantallas que usan `sporting.css` (`index.html`, `producto-modular.html`, y las dos snapshot históricas `producto-adidas.html`/`producto-sporting.html`, que comparten el mismo footer global aunque estén congeladas en su contenido de PDP).

### Corrección 2026-07-16 — Header real

El header de `index.html` (home) usaba un header **inventado**: barra verde con hamburger + logo + iconos, más un `.sp-announce` negro separado y una `.sp-locationbar` propia — nunca confirmado contra el sitio real. El header "completo" que ya usaban las PDP (`.sp-topline` + `.sp-header-full` + `.sp-navbar`) sí venía de una captura real, pero con datos inventados en el navbar (iconos ⚫🇦🇷 al final, sin "Adidas Seller", colores no confirmados).

Se navegó en vivo la home y la PDP y se leyó el header real con `getComputedStyle`/`getBoundingClientRect`. Confirmado: **el header es idéntico en todas las páginas del sitio** (mismo componente VTEX), 3 filas:

1. `.sp-topline` (negro): carrusel de banners promocionales (se simplifica a uno estático, como ya estaba) + link "Segui tu pedido ⬅" (sin acento, flecha a la izquierda — así está en el sitio real) a `gestiondepedidos.sporting.com.ar/login`.
2. `.sp-header-full` (blanco): logo, buscador, "Ingresá: Tu ubicación", **"Entrar"** (no hay ícono de usuario suelto — es un link de texto), ícono de wishlist, ícono de carrito.
3. `.sp-navbar`: **8 categorías** confirmadas — Hombre, Mujer, Niños, Deportes, Marcas, OFERTAS (rojo `#ff0033`, bold), Novedades (verde `--sp-green`, bold), **Adidas Seller** (faltaba). El resto pesa normal (400), no 600. Sin iconos de marca/bandera al final — eso era inventado.

Se unificó `index.html` (home) para usar el mismo header de 3 filas que las PDP (antes tenía uno propio, simplificado e inventado) y se sacó el toggle "Announcement bar" del panel de control de la home — el topline es chrome fijo del sitio real, no un módulo opcional. Se eliminaron de `sporting.css` las clases `.sp-announce`, `.sp-header` (versión simple) y `.sp-locationbar`, que quedaron sin uso.

## Pantallas maquetadas

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Home, con **panel de control** (mismo patrón que `producto-modular.html`) que prende/apaga cada sección: hero banner promocional, categorías ("Elegí tu categoría"), Novedades (grid de productos con swatches de color, precio, cuotas, envío gratis, botón "Seleccionar talle"), disciplinas ("Preparate para rendir en cada disciplina"). Header (topline + buscador/ubicación + navbar de categorías, igual que en las PDP) y footer (newsletter + términos más buscados) quedan siempre visibles — son chrome fijo del sitio real, no módulos opcionales. El estado queda codificado en el hash de la URL para compartir el link de una combinación puntual |
| `producto-modular.html` | **PDP vigente — mantener acá los cambios de PDP a partir de ahora.** Producto genérico con panel de control lateral que prende/apaga cada módulo: vendedor (marketplace/propio), video, precio con/sin descuento, talle único/varios, última unidad, cupón no aplica. El estado queda codificado en el hash de la URL para poder compartir el link de una combinación puntual. Usa `design-system/tokens.css` solo para el chrome del panel (no para el contenido de la PDP, que sigue la fidelidad de `sporting.css`) |
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

## Al agregar pantallas nuevas

Reusar las clases de `sporting.css` (`.sp-topline`, `.sp-header-full`, `.sp-navbar`, `.sp-product-card`, `.sp-cat-card`, `.sp-footer-*`, etc.) — el header y el footer son los mismos en todas las páginas del sitio, no crear variantes nuevas. Si el usuario comparte capturas de otras páginas, actualizar esta tabla y registrar en `../../../docs/cross-references.md` si empieza a reflejar una doc específica del sitio.

**PDP:** cualquier variante o módulo nuevo de PDP (nuevo estado de precio, nuevo aviso de stock, nueva regla de seller, etc.) se agrega como módulo togglable en `producto-modular.html`, no como archivo nuevo. `producto-adidas.html` y `producto-sporting.html` quedan congelados como snapshot de las capturas reales originales — no se les suman módulos nuevos.

**Home:** cualquier sección nueva o variante de una sección existente se agrega como módulo togglable en `index.html` (clase `mod-<nombre>` + entrada en el objeto `MODULES` del script), siguiendo el mismo patrón que la PDP modular.
