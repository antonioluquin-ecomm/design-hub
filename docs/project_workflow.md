# Project Workflow — Design Hub

| Campo | Detalle |
|-------|---------|
| Versión | v1.0 |
| Actualizado | 2026-07-16 |
| Estado | Activo |
| Documentos relacionados | `../project-standards/ai_rules.md` · `../project-standards/style_guide.md` · `CLAUDE.md` |

---

## 1. Propósito de este documento

Define el workflow operativo de Design Hub: cómo se maqueta, qué está congelado y cómo se mantiene la alineación con la documentación de sitios y portales reales.

---

## 2. Documentos maestros — dónde vive cada regla

| Necesito saber... | Ir a... |
|-------------------|---------|
| Cómo trabaja cada IA (Claude, Codex, ChatGPT) | `../project-standards/ai_rules.md` |
| Colores, tipografía, componentes CSS | `../project-standards/style_guide.md` |
| Instrucciones específicas para Claude Code en este proyecto | `CLAUDE.md` |
| Qué maqueta depende de qué doc de sitio/portal | `docs/cross-references.md` |

---

## 3. Tipos de cambios y riesgo

| Tipo | Descripción | Riesgo | Requiere |
|------|-------------|--------|----------|
| **Documentación** | README, guías, changelogs, NOTAS.md | Bajo | Commit claro |
| **Design system** | `design-system/tokens.css`, `design-system/index.html` | Medio | Verificar que todas las maquetas sigan usando los tokens correctamente |
| **Maqueta nueva o modificada** | HTML/CSS de `mockups/` | Bajo–Medio | Smoke visual + actualizar `docs/cross-references.md` si depende de una doc externa |

---

## 7. Freeze zones del proyecto

### 7.1 Zonas congeladas

| Zona | Razón |
|------|-------|
| `design-system/tokens.css` | Es la fuente única de tokens para todas las maquetas — cambios sueltos rompen consistencia visual entre maquetas. Debe reflejar `../project-standards/style_guide.md`, no inventarse localmente. |
| `mockups/sites/*/public` (si en el futuro alguna maqueta de sitio replica una identidad visual propia, ej. verde de Sporting) | No alinear al azul institucional interno sin confirmación — ver `marketplace-portal/CLAUDE.md` sobre identidad visual dual |

---

## 12.5 Convenciones específicas del proyecto

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Carpeta de maqueta | kebab-case, un `index.html` por maqueta | `mockups/pedidos-portal/index.html` |
| Notas de estado de una maqueta | `NOTAS.md` en la misma carpeta | `mockups/pedidos-portal/NOTAS.md` |
| Fila nueva en cross-references | Agregar siempre que una maqueta pase a depender de una doc externa concreta | ver `docs/cross-references.md` |

---

## 13. Aprendizajes — Design Hub

### 13.1 Origen del proyecto

Nace para separar la etapa de maquetación (ajustes visuales, alineación con agentes de PIM) del desarrollo real de cada sistema. El precedente fue `marketplace-portal/internal/seller-center/maqueta-seller-center.html`, que ya simulaba la UI de una herramienta PIM genérica de forma aislada del design system del proyecto.
