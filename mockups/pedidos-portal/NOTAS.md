# Notas — Maqueta del Portal de Gestión de Pedidos

## Estado

URL real: `https://gestiondepedidos.sporting.com.ar/login`. Es una SPA (Quasar/Vue) — es el **portal de devoluciones/seguimiento orientado al cliente final** (confirmado con el usuario 2026-07-16), con login por DNI + N° de pedido.

Confirmado con el usuario que es efectivamente el sistema a maquetar para pasar a los agentes de PIM.

## Pantallas maquetadas (2026-07-16)

Fuente: `login.html` desde navegación en vivo (colores/tipografía con `getComputedStyle`); `menu.html`, `detalle-pedido.html`, `devolucion-opciones.html` desde capturas de pantalla que compartió el usuario con una sesión de prueba propia.

| Archivo | Pantalla real |
|---------|---------------|
| `login.html` | Login (DNI + N° de pedido) |
| `menu.html` | "¿Qué acción deseas realizar?" — menú Consultar estado / Cambios y devoluciones |
| `detalle-pedido.html` | Detalle del pedido: resumen, alerta de despacho múltiple, acordeón de paquetes (depósito, transporte, factura, producto, timeline logístico) |
| `devolucion-opciones.html` | "¿Qué querés hacer con el producto?" — Cambio / Devolución con reintegro / Devolución por garantía |

Estilos propios en `portal.css` — identidad separada del design system interno (teal `#007e9e`, Lato), igual criterio que el verde de Sporting en `marketplace-portal/public`.

## Pendiente / no capturado todavía

- [ ] Estado de un pedido que NO esté en "Entregado" (ej. En Preparación, En Camino) — solo se vio el caso "todo entregado"
- [ ] Flujo completo de generar una devolución/cambio (formulario posterior a elegir una opción en `devolucion-opciones.html`)
- [ ] Vista mobile (solo se capturó desktop)
- [ ] Estados de error (ej. pedido no encontrado, DNI inválido)

## Al agregar pantallas nuevas

Reusar las clases de `portal.css` (`.pp-topbar`, `.pp-sidebar`, `.pp-option-list`, `.pp-info-card`, `.pp-package`, `.pp-timeline`, etc.) en vez de crear estilos nuevos. Registrar en `../../docs/cross-references.md` cualquier doc de proceso/pedidos que la maqueta empiece a reflejar.
