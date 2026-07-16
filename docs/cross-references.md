# Cross-references — Documentación de sitios/portal ↔ Maquetas

Mapa explícito de qué maqueta de este repo depende de qué documentación externa. Se actualiza cada vez que se crea o modifica una maqueta con una dependencia clara. Es la pieza que permite avisar "esto también hay que revisarlo en la maqueta" cuando se edita una doc de sitio o portal.

| Doc origen (sitio/portal) | Sección | Maqueta afectada | Nota |
|---------------------------|---------|-------------------|------|
| `../project-standards/style_guide.md` | §3 Colores, §4 Tipografía, §8 Botones | `design-system/tokens.css` + todas las maquetas | Fuente única de tokens visuales — cualquier cambio acá debe reflejarse en `tokens.css` |
| `gestiondepedidos.sporting.com.ar` (portal en vivo, sin doc propia todavía) | Login, menú de acciones, detalle de pedido, cambios y devoluciones, flujo de devolución por garantía | `mockups/pedidos-portal/{login,menu,detalle-pedido,devolucion-opciones,garantia-terminos,garantia-productos,garantia-confirmar,motivo-devolucion,devolucion-productos}.html` | Réplica visual confirmada con el usuario 2026-07-16. Si el proceso de devoluciones/cambios cambia en el sitio real, revisar estas maquetas. |
| Regla de negocio: sellers sin opción "Cambio" (sin doc propia todavía — solo confirmada por el usuario en el chat 2026-07-16) | Seller Adidas | `mockups/pedidos-portal/devolucion-opciones-adidas.html` | Si aparece documentación formal de reglas por seller, o un nuevo seller con reglas propias, actualizar esta fila y agregar la variante correspondiente (ver `NOTAS.md` §"Regla de negocio"). |

> Formato de fila: **Doc origen** = archivo y ruta relativa · **Sección** = encabezado o § concreto · **Maqueta afectada** = carpeta bajo `mockups/` · **Nota** = por qué están relacionados o qué falta.
