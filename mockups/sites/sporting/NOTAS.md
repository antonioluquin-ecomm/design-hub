# Notas — Maqueta del sitio Sporting

## Estado

Kickoff hecho 2026-07-16. Fuente: `https://www.sporting.com.ar/` navegado en vivo (home). Es un sitio VTEX IO (clases `vtex-*` en el DOM).

Identidad propia capturada con `getComputedStyle` y lectura de DOM: verde institucional `#25b60c`, negro `#111111` (announcement bar y footer), tipografía **Poppins**. Estilos en `sporting.css` — separados del design system interno, mismo criterio que `marketplace-portal/public` (no alinear al azul institucional sin confirmar).

## Pantallas maquetadas

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Home: announcement bar, header (hamburger + logo + search/user/cart), barra de ubicación, hero banner promocional, categorías ("Elegí tu categoría"), Novedades (grid de productos con swatches de color, precio, cuotas, envío gratis, botón "Seleccionar talle"), disciplinas ("Preparate para rendir en cada disciplina"), footer (beneficio + links + bottom bar) |

## Pendiente / no capturado todavía

- [ ] Página de listado de categoría (PLP)
- [ ] Página de producto (PDP) — swatches, selector de talle, galería
- [ ] Carrito / checkout
- [ ] Vista mobile (solo se capturó desktop)
- [ ] Header con menú de categorías desplegado (el `☰` no se abrió en la captura)
- [ ] Footer completo real (se armó con estructura genérica de 3 columnas — no se llegó a ver el footer real completo en la navegación)

## Al agregar pantallas nuevas

Reusar las clases de `sporting.css` (`.sp-header`, `.sp-product-card`, `.sp-cat-card`, `.sp-footer`, etc.). Si el usuario comparte capturas del footer real completo o de otras páginas, actualizar esta tabla y registrar en `../../../docs/cross-references.md` si empieza a reflejar una doc específica del sitio.
