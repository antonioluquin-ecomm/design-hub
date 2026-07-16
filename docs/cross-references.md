# Cross-references — Documentación de sitios/portal ↔ Maquetas

Mapa explícito de qué maqueta de este repo depende de qué documentación externa. Se actualiza cada vez que se crea o modifica una maqueta con una dependencia clara. Es la pieza que permite avisar "esto también hay que revisarlo en la maqueta" cuando se edita una doc de sitio o portal.

| Doc origen (sitio/portal) | Sección | Maqueta afectada | Nota |
|---------------------------|---------|-------------------|------|
| `../project-standards/style_guide.md` | §3 Colores, §4 Tipografía, §8 Botones | `design-system/tokens.css` + todas las maquetas | Fuente única de tokens visuales — cualquier cambio acá debe reflejarse en `tokens.css` |
| _(pendiente)_ | _(pendiente)_ | `mockups/pedidos-portal/` | Portal externo — falta doc propia del sitio/proceso de pedidos para mapear secciones concretas |

> Formato de fila: **Doc origen** = archivo y ruta relativa · **Sección** = encabezado o § concreto · **Maqueta afectada** = carpeta bajo `mockups/` · **Nota** = por qué están relacionados o qué falta.
