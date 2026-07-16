# Notas — Maqueta del sitio Sporting

## Estado

Kickoff hecho 2026-07-16. Fuente: `https://www.sporting.com.ar/` navegado en vivo (home). Es un sitio VTEX IO (clases `vtex-*` en el DOM).

Identidad propia capturada con `getComputedStyle` y lectura de DOM: verde institucional `#25b60c`, negro `#111111` (announcement bar y footer), tipografía **Poppins**. Estilos en `sporting.css` — separados del design system interno, mismo criterio que `marketplace-portal/public` (no alinear al azul institucional sin confirmar).

## Pantallas maquetadas

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Home: announcement bar, header (hamburger + logo + search/user/cart), barra de ubicación, hero banner promocional, categorías ("Elegí tu categoría"), Novedades (grid de productos con swatches de color, precio, cuotas, envío gratis, botón "Seleccionar talle"), disciplinas ("Preparate para rendir en cada disciplina"), footer (beneficio + links + bottom bar) |
| `producto-adidas.html` | PDP del producto seller Adidas (`camisetas-de-equipos-adidas-camiseta-titular-seleccion-argentina-26-hombre-59135/p`): header completo (topline WOKER + buscador + navbar de categorías), breadcrumb, galería con miniaturas, badges Envío Gratis/Tienda Adidas, precio con impuestos, cuotas, selector de talle, stepper + agregar al carrito, "Vendido y distribuido por adidas", código postal, acordeón (Descripción, Especificaciones, Detalles, Envíos, **No se admiten cambios directos**, Cuotas y Promociones, Reseñas), productos similares |
| `producto-sporting.html` | PDP del producto seller **Sporting** (tienda propia) con video (`bicicleta-trek-slash-9-7-slx-xt-rodado-29-talle-ml-1501767-000/p`): mismos componentes base que la de Adidas, más los que no estaban en esa captura — precio con descuento (tachado + badge `-15%`), aviso de stock urgente ("¡Última unidad disponible!"), badge "NO APLICA CUPONES" + nota, **video embed** debajo de la galería de imágenes (miniatura + play + info de canal), talle único, **sin** box de "Vendido y distribuido por" (por ser tienda propia), y acordeón **"Cambios y devoluciones"** (en vez de "No se admiten cambios directos") |

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
- [ ] Footer completo real (se armó con estructura genérica de 3 columnas — no se llegó a ver el footer real completo en la navegación)
- [ ] Contenido real de "Especificaciones" y "Detalles" (se maquetaron con placeholder — no se expandieron en la captura)

## Al agregar pantallas nuevas

Reusar las clases de `sporting.css` (`.sp-header`, `.sp-product-card`, `.sp-cat-card`, `.sp-footer`, etc.). Si el usuario comparte capturas del footer real completo o de otras páginas, actualizar esta tabla y registrar en `../../../docs/cross-references.md` si empieza a reflejar una doc específica del sitio.
