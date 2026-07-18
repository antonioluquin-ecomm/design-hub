# Design Hub — Instrucciones para Claude Code y Codex

> Las reglas generales y los docs maestros están en `../project-standards/` (`ai_rules.md`, `style_guide.md`).
> Este archivo contiene solo lo específico de este proyecto.

---

## Reglas activas — específicas de este proyecto

- **Esto es solo maquetación.** Ningún archivo de este repo pega contra un backend real ni maneja datos reales. Si una maqueta necesita simular datos, usar JSON estático de ejemplo, nunca una llamada real.
- **Nunca hardcodear colores, tipografía ni espaciados.** Todo componente nuevo usa las variables de `design-system/tokens.css`, que es un espejo literal de `../project-standards/style_guide.md`. Si falta un token, agregarlo primero en `tokens.css` (y, si corresponde, proponer el alta en `style_guide.md`) antes de usarlo en una maqueta.
- **`docs/cross-references.md` es de actualización obligatoria.** Cada vez que se crea o modifica una maqueta que depende de una sección de documentación de un sitio o portal real, agregar/actualizar la fila correspondiente. Esta tabla es lo que permite avisar impactos cruzados cuando se edita una doc de sitio.
- **El portal de gestión de pedidos es una herramienta externa** (no hay código fuente propio). Su maqueta se construye a partir de capturas o navegación en vivo de la URL real — nunca inventar de memoria cómo se ve. Ver `mockups/pedidos-portal/NOTAS.md` para el estado de los insumos disponibles.
- **No hacer push** sin confirmación explícita del usuario.
- **El `index.html` de la raíz es de actualización obligatoria.** Cada vez que se crea una maqueta nueva (archivo `.html` nuevo bajo `mockups/`), sumar un link en la sección correspondiente de este landing — es lo que se ve en `antonioluquin-ecomm.github.io/design-hub/`. Quedó desactualizado 3 mockups seguidos (PLP, carrito, checkout) por no tener esta regla explícita.

---

## Medición en vivo de sitios reales — bookmarklet Layout Inspector

Para maquetar con fidelidad pixel-exacta (`mockups/sites/<sitio>/`) muchas veces hace falta la geometría exacta de un módulo real: ancho/alto de cada ítem, gap entre ítems, si un título está centrado. El navegador automatizado de esta sesión **no siempre puede lograrlo**: sitios VTEX IO cargan secciones por lazy-load al hacer scroll, y ese lazy-load depende de que la pestaña tenga foco real de sistema operativo — algo que el Browser pane no siempre garantiza (ver `mockups/sites/sporting/NOTAS.md`, casos donde el scraping en vivo no llegó a montar una sección pese a scrollear).

Para esos casos existe **`layout-inspector`**, un bookmarklet del repo hermano `../vtex-bookmarklets/`:

- El usuario lo corre en su propio navegador (con foco real, sin las limitaciones del Browser pane) sobre el sitio real, apuntando al título de la sección a medir.
- Devuelve ancho/alto/gap de los ítems (con estadística min/avg/max) y si el título está centrado — como JSON, listo para pegar acá y trasladar a la maqueta.
- Filtra automáticamente ítems ocultos de carruseles con loop infinito (slick con clones).
- Instalación y uso: [`../vtex-bookmarklets/layout-inspector/README.md`](../vtex-bookmarklets/layout-inspector/README.md).

Si una corrección de módulo se basó en este JSON, dejarlo asentado en el `NOTAS.md` del sitio correspondiente (qué se midió, valores crudos relevantes, y cualquier salvedad del viewport usado).

---

## Stack específico

- Sitio estático puro — HTML/CSS/Vanilla JS, sin build step, sin framework
- Sin autenticación, sin backend
- Cada maqueta vive en su propia carpeta bajo `mockups/`, con su propio `index.html`

---

## Estructura de archivos

| Carpeta | Responsabilidad |
|---------|-----------------|
| `design-system/` | Tokens visuales (`tokens.css`) y su referencia viva (`index.html`) — fuente única para todas las maquetas |
| `mockups/pedidos-portal/` | Réplica maquetable del portal de gestión de pedidos |
| `mockups/sites/<sitio>/` | Réplica maquetable de un sitio propio (una carpeta por sitio) |
| `docs/cross-references.md` | Mapa doc de sitio/portal ↔ maqueta afectada |

---

## Documentación estándar compartida

La documentación estándar compartida se encuentra en `../project-standards/`:

- [`../project-standards/ai_rules.md`](../project-standards/ai_rules.md) — reglas de colaboración con IA
- [`../project-standards/style_guide.md`](../project-standards/style_guide.md) — colores, tipografía, componentes CSS, Git
- [`../project-standards/application_shell.md`](../project-standards/application_shell.md) — shell de aplicación

### Entorno de trabajo

- El desarrollo se realiza desde `C:\Users\gluna\Documents\Repos`
- No usar OneDrive/SharePoint como carpeta de desarrollo
- GitHub es la fuente principal para versionado y colaboración
- OneDrive/SharePoint queda reservado para documentación funcional: archivos compartidos, PDFs, presentaciones, actas e imágenes
