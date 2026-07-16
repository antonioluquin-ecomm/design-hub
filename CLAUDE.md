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
