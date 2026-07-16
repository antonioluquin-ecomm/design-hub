# Design Hub

Espacio central de maquetación y alineación visual entre el portal de gestión de pedidos, los sitios propios (Sporting, Woker) y su documentación.

## Qué es

No es un producto en desarrollo — es una herramienta de trabajo interna para proponer y validar cambios de UI **antes** de pasarlos a desarrollo real (agentes de PIM u otros equipos). Sirve como punto único donde:

- Se replica visualmente el portal de gestión de pedidos para maquetar ajustes.
- (Fase 2) Se replican las páginas de los sitios propios para maquetar mejoras.
- Se mantiene una base única de design tokens (colores, tipografía, botones) usada por todas las maquetas.
- Se documenta explícitamente qué maqueta depende de qué sección de la documentación de cada sitio/portal (`docs/cross-references.md`), para poder señalar impactos cruzados cuando se edita una doc.

## Stack

- Frontend: HTML/CSS/Vanilla JS · sin build step
- Sin backend — todo el contenido es estático (maquetas, no funcionalidad real)

## Cómo usar

- `design-system/index.html` — referencia visual de colores, tipografía, botones, cards y tablas vigentes.
- `mockups/pedidos-portal/` — maqueta del portal de gestión de pedidos.
- `mockups/sites/` — maquetas de sitios propios (una carpeta por sitio).
- `docs/cross-references.md` — antes de tocar una doc de sitio o portal, revisar si hay una maqueta relacionada acá.

## Cómo validar

Abrir cada `index.html` en el preview local (`.claude/launch.json`) y confirmar que los componentes usan las variables de `design-system/tokens.css`, no colores hardcodeados.
