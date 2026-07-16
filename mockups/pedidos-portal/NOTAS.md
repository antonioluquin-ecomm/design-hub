# Notas — Maqueta del Portal de Gestión de Pedidos

## Estado

URL real: `https://gestiondepedidos.sporting.com.ar/login`. Es una SPA (Quasar/Vue) — parece ser el **portal de devoluciones/seguimiento orientado al cliente final** (meta description: "Aplicación para solicitar devoluciones de compra"), con login por DNI + N° de pedido. Pendiente confirmar con el usuario si es efectivamente el sistema que se quiere maquetar para pasar a los agentes de PIM, o si hay un panel administrativo distinto detrás.

`login.html` ya está maquetado 1:1 con el real (colores y tipografía tomados con `getComputedStyle` del sitio en vivo el 2026-07-16): fondo `#ebebeb`, botón/acento `#007e9e`, tipografía Lato, banner con degradé y logos Sporting/Woker.

## Bloqueo para avanzar con las pantallas internas

El login pide **DNI**, que es un documento de identidad — no se puede completar ese campo (regla de no ingresar credenciales/IDs gubernamentales), así que no se pudo pasar de la pantalla de login navegando directo. Para maquetar el detalle de pedido, estados, etc. hace falta una de estas dos vías:

- [ ] El usuario comparte capturas de pantalla de las pantallas internas (detalle de pedido, listado, estados)
- [ ] El usuario ya tiene sesión iniciada en su Chrome real → usar la herramienta "Claude in Chrome" para verla sin ingresar credenciales

## Una vez con el insumo

Construir las pantallas siguientes (detalle de pedido, estados, etc.) reusando el banner/tipografía/colores ya capturados acá. Registrar en `../../docs/cross-references.md` cualquier doc de proceso/pedidos que la maqueta empiece a reflejar.
