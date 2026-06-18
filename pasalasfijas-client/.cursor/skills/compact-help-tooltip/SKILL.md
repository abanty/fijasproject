---
name: compact-help-tooltip
description: >-
  Patron UI para ayudas contextuales en paneles estrechos (Customizer, drawers,
  formularios compactos): textos cortos inline, textos largos en icono info con
  Tooltip MUI. Usar al crear labels, descripciones, hints o copy de ayuda en
  espanol. Palabras clave: tooltip, ayuda, info icon, customizer, descripcion,
  texto largo, panel estrecho, HelpInfoTooltip.
---

# Ayuda compacta con Tooltip

## Regla

En vistas estrechas (Theme Customizer, drawers, side panels):

| Longitud | Patron |
|----------|--------|
| **≤ 50 caracteres** | Texto inline (`Typography`, `caption`, `text-xs`) |
| **> 50 caracteres** | **No** bloque de parrafo. Icono `i` + `Tooltip` MUI junto al titulo/label |

Umbral: `shouldUseHelpTooltip()` en `src/lib/ui/helpText.js` (`MAX_INLINE_HELP_LENGTH = 50`).

## Componente obligatorio

```jsx
import HelpInfoTooltip from '@components/shared/HelpInfoTooltip'
import { shouldUseHelpTooltip } from '@/lib/ui/helpText'
```

`HelpInfoTooltip` usa MUI `Tooltip` + trigger `<span>` (no `button`/`IconButton`) + `ri-information-line`. Obligatorio dentro de `AccordionSummary`, `<label>` u otros controles que ya son `<button>`. Incluye `stopPropagation` para no togglear acordeones al interactuar.

## Patrones

### Titulo de seccion con ayuda larga

```jsx
<div className='flex items-center gap-1'>
  <p className='font-medium'>Fondos internos</p>
  {shouldUseHelpTooltip(sectionHelp) ? <HelpInfoTooltip title={sectionHelp} /> : null}
</div>
{!shouldUseHelpTooltip(sectionHelp) ? (
  <p className='text-xs text-textSecondary'>{sectionHelp}</p>
) : null}
```

### Fila con switch + ayuda larga

```jsx
<div className='flex items-center gap-1'>
  <label className='font-medium' htmlFor='id'>Interfaz compacta</label>
  {shouldUseHelpTooltip(help) ? <HelpInfoTooltip title={help} placement='top' /> : null}
</div>
{!shouldUseHelpTooltip(help) ? <p className='text-xs text-textSecondary'>{help}</p> : null}
```

### Acordeon / campo del Customizer

```jsx
<AccordionSummary>
  <div className='flex items-center gap-3 min-is-0'>
    <div className='flex items-center gap-0.5 min-is-0'>
      <Typography className='font-medium'>{label}</Typography>
      {shouldUseHelpTooltip(description) ? <HelpInfoTooltip title={description} /> : null}
    </div>
  </div>
</AccordionSummary>
<AccordionDetails>
  {!shouldUseHelpTooltip(description) ? (
    <Typography variant='body2' color='text.secondary' className='mbe-3'>
      {description}
    </Typography>
  ) : null}
</AccordionDetails>
```

## Estilo del tooltip

Los tooltips de ayuda usan la paleta global `Tooltip.bg` (gris neutro, **no** morado primario).

- Override: `src/@core/theme/overrides/tooltip.js`
- Tokens: `src/@core/theme/colorSchemes.js` → `palette.Tooltip.bg`
- No usar `primary.main` ni `#8C57FF` en tooltips de ayuda.

## Copy

- Parrafos `body2` / `text-xs` multilinea en drawers estrechos cuando superan 50 caracteres.
- Tooltips custom con `title` HTML nativo.
- Duplicar el mismo texto inline **y** en tooltip.
- `IconButton` o `<button>` como trigger del tooltip dentro de `AccordionSummary`, `<label htmlFor>` o cualquier ancestro `<button>` (HTML invalido + hydration error). Usar siempre `HelpInfoTooltip`.

## Copy

- Espanol con tildes (`menú`, `tipografía`, `opción`, `márgenes`).
- Frases cortas en tooltip; evitar parrafos de mas de 2 lineas.
- `aria-label` del trigger: `Mas informacion`.

## Referencia en repo

- `src/components/shared/HelpInfoTooltip.jsx`
- `src/lib/ui/helpText.js`
- Uso: `ThemeSurfaceSection.jsx`, `customizer/index.jsx`
