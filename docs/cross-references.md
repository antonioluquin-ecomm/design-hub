# Cross-references — Documentación de sitios/portal ↔ Maquetas

Mapa explícito de qué maqueta de este repo depende de qué documentación externa. Se actualiza cada vez que se crea o modifica una maqueta con una dependencia clara. Es la pieza que permite avisar "esto también hay que revisarlo en la maqueta" cuando se edita una doc de sitio o portal.

| Doc origen (sitio/portal) | Sección | Maqueta afectada | Nota |
|---------------------------|---------|-------------------|------|
| `../project-standards/style_guide.md` | §3 Colores, §4 Tipografía, §8 Botones | `design-system/tokens.css` + todas las maquetas | Fuente única de tokens visuales — cualquier cambio acá debe reflejarse en `tokens.css` |
| `gestiondepedidos.sporting.com.ar` (portal en vivo, sin doc propia todavía) | Login, menú de acciones, detalle de pedido, cambios y devoluciones, flujo de devolución por garantía | `mockups/pedidos-portal/{login,menu,detalle-pedido,devolucion-opciones,garantia-terminos,garantia-productos,garantia-confirmar,motivo-devolucion,devolucion-productos}.html` | Réplica visual confirmada con el usuario 2026-07-16. Si el proceso de devoluciones/cambios cambia en el sitio real, revisar estas maquetas. |
| Regla de negocio: sellers sin opción "Cambio" (confirmada en 2 lugares: portal de pedidos y la PDP real del producto Adidas — sin doc formal propia todavía) | Seller Adidas | `mockups/pedidos-portal/devolucion-opciones-adidas.html` **y** `mockups/sites/sporting/producto-adidas.html` (acordeón "No se admiten cambios directos", linkeado entre ambas) | Si aparece documentación formal de reglas por seller, o un nuevo seller con reglas propias, actualizar esta fila y ambas maquetas (ver `NOTAS.md` de cada carpeta). |
| `sporting.com.ar` (sitio en vivo, sin doc propia todavía) | Home: header, hero, categorías, novedades, disciplinas, footer | `mockups/sites/sporting/index.html` | Réplica visual confirmada con el usuario 2026-07-16. Sitio VTEX IO — si cambia el layout de la home real, revisar esta maqueta. |
| `sporting.com.ar` (sitio en vivo, sin doc propia todavía) | PDP: galería, precio/impuestos, cuotas, talles, "vendido y distribuido por", acordeón de info, similares | `mockups/sites/sporting/producto-adidas.html` | Réplica visual confirmada con el usuario 2026-07-16, sobre un producto del seller Adidas. Pendiente ver la variante seller Sporting para comparar. |

> Formato de fila: **Doc origen** = archivo y ruta relativa · **Sección** = encabezado o § concreto · **Maqueta afectada** = carpeta bajo `mockups/` · **Nota** = por qué están relacionados o qué falta.
