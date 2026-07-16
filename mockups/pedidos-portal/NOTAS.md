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
| `garantia-terminos.html` | Checklist de condiciones antes de iniciar una devolución por garantía |
| `garantia-productos.html` | Tabla de productos a devolver por garantía — indicar motivo por producto |
| `garantia-confirmar.html` | Formulario "Verificá tus datos antes de confirmar" — **usa datos de ejemplo genéricos**, no los reales capturados en la sesión de prueba (ver nota de privacidad abajo) |
| `motivo-devolucion.html` | "¿Qué pasó con tu compra?" — lista de motivos predefinidos (Hay fallas en el producto / Es diferente a lo que pedí / No cumple mis expectativas / Fue enviado en malas condiciones / Talle incorrecto) |
| `devolucion-productos.html` | Variante de la tabla de productos a devolver **sin** "por garantía" — usada por el flujo de "Devolución" simple |
| `devolucion-opciones-adidas.html` | Variante de "¿Qué querés hacer con el producto?" para pedidos del **seller Adidas** — ver regla de negocio abajo |

### Corrección 2026-07-16 — "Indicar motivo" no es un input inline

La primera versión de `garantia-productos.html` simulaba "indicar motivo" con un input de texto libre inline. Capturas posteriores del usuario mostraron el comportamiento real: el ícono navega a una pantalla propia (`motivo-devolucion.html`) con una lista **cerrada** de motivos predefinidos, y vuelve a la tabla con el motivo ya cargado en esa fila. Se corrigió `garantia-productos.html` y se factorizó esa lógica de ida y vuelta (vía `sessionStorage`) en `portal.js`, compartida con `devolucion-productos.html`.

### Regla de negocio — seller Adidas sin opción "Cambio" (confirmado 2026-07-16)

En pedidos de productos **vendidos y distribuidos por el seller Adidas**, la pantalla "¿Qué querés hacer con el producto?" ofrece solo **Devolución** y **Devolución por garantía** (sin "Cambio"), con contenido y avisos distintos:

- Info cards con listas de viñetas (plazo 60 días para Devolución, 180 días para garantía) en vez de párrafos.
- Tres avisos grises adicionales: restricción de cambio para productos Adidas, proceso de retiro/inspección/reembolso, y contacto de atención al cliente.

Pedidos B2C / de otros sellers siguen mostrando las 3 opciones (`devolucion-opciones.html`, ya maquetado). **Si el usuario menciona otro seller con reglas propias, documentarlo acá siguiendo el mismo patrón** (nueva variante `devolucion-opciones-<seller>.html` + entrada en esta sección).

### Nota de privacidad — datos de ejemplo en `garantia-confirmar.html`

El usuario compartió una captura del formulario de confirmación con sus datos reales (nombre, DNI, teléfono, domicilio) de una sesión de prueba propia. Como `design-hub` es un **repo público** en GitHub, esa pantalla se maquetó con datos genéricos de ejemplo (Juan Pérez, DNI 00000000, dirección "Av. Ejemplo") en vez de reproducir la información real — evita exponer PII en un repo público. Si en algún momento se pasa el repo a privado, se podría considerar usar datos reales de prueba, pero no es necesario para el propósito de maquetación.

Estilos propios en `portal.css` — identidad separada del design system interno (teal `#007e9e`, Lato), igual criterio que el verde de Sporting en `marketplace-portal/public`.

## Pendiente / no capturado todavía

- [ ] Estado de un pedido que NO esté en "Entregado" (ej. En Preparación, En Camino) — solo se vio el caso "todo entregado"
- [ ] Flujo de "Cambio" (B2C) — solo se maquetó "Devolución" y "Devolución por garantía"
- [ ] Pantalla de confirmación final / éxito después de "Finalizar gestión" en `garantia-confirmar.html`
- [ ] Confirmar si otros sellers (más allá de Adidas y el caso B2C genérico) tienen reglas propias de opciones
- [ ] Vista mobile (solo se capturó desktop)
- [ ] Estados de error (ej. pedido no encontrado, DNI inválido)

## Al agregar pantallas nuevas

Reusar las clases de `portal.css` (`.pp-topbar`, `.pp-sidebar`, `.pp-option-list`, `.pp-info-card`, `.pp-package`, `.pp-timeline`, etc.) en vez de crear estilos nuevos. Registrar en `../../docs/cross-references.md` cualquier doc de proceso/pedidos que la maqueta empiece a reflejar.
