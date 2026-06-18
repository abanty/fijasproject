---
name: stable-first-paint-ui
description: >-
  Evita saltos visuales al refrescar o hidratar (flash de layout/estilos): shell
  CSS estable, alinear globals + MUI Emotion + librerías de terceros, Remix icons.
  Usar cuando un componente "se pisa" al montar, el icono cambia de posición, el
  scrollbar o sidebar se ve mal un instante, o PerfectScrollbar/MUI Chip parpadean.
  Palabras clave: hydration, first paint, flash, pisar estilos, scrollbar-container,
  react-perfect-scrollbar, Emotion, remix icon, ri-, layout jump.
---

# UI estable — primer paint sin flash

## Síntoma

Algo se ve bien un instante y luego **cambia** (icono se mueve, padding salta, scrollbar pegado, fondo del item se corre). Casi siempre es **cascada CSS desalineada** entre primer paint y post-mount/hydration — no un bug de React "random".

## Principio (shell + valores idénticos)

1. **Shell exterior** (wrapper con clase de dominio): layout que debe existir desde el HTML inicial — `flex`, `min-height`, `z-index`, `align-self`, `min-block-size` reservado. Solo en `globals.css` o clases Tailwind que **no** dependen de JS al montar.
2. **Hijo que la librería toca** (PerfectScrollbar, MUI con Emotion): medidas críticas repetidas en **tres sitios con el mismo valor**:
   - `globals.css` (especificidad suficiente vs reglas globales)
   - overrides del tema MUI (`@core/theme/overrides/*`, `compactOverrides.js` si `data-density=compact`)
   - `sx` / `slotProps` / `style` inline en el componente (primer render del cliente)
3. **No reemplazar** componentes MUI con HTML plano para "arreglar" el flash salvo que el usuario lo pida. Mantener `Chip`, `Button`, etc. y fijar la cascada.
4. **Una fuente de verdad para números**: si el icono debe ser `13px` y margin `-0.125rem`, ese valor en globals, tema y `sx` — nunca mezclar `theme.spacing(-2)` (-16px) con `-0.125rem` en otro archivo.

## Causas frecuentes en este repo

### `react-perfect-scrollbar`

- **No aplica `className` en el primer render**; en `componentDidMount` reescribe a `scrollbar-container` + tu clase + `ps`.
- Siempre inyecta `.scrollbar-container { height: 100% }`.
- El rail (`ps__rail-y`) se ancla al borde del contenedor **interior**, no del wrapper.

**Patrón:**

```jsx
<div className='app-sidebar-nav-scroll'>
  <PerfectScrollbar
    className='flex flex-col gap-5'
    style={{
      flex: '1 1 auto',
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      paddingInlineEnd: 'var(--app-sidebar-nav-scroll-padding-inline-end, 1.625rem)'
    }}
    options={{ wheelPropagation: false, suppressScrollX: true }}
  >
    ...
  </PerfectScrollbar>
</div>
```

- Shell: flex + padding lateral (sin padding-inline-end extra si va en el PS).
- `padding-inline-end` en el contenedor PS (corredor del rail), no solo en el shell exterior.
- CSS: anular `height: 100%` del hijo con `height: auto !important` + flex en `.app-sidebar-nav-scroll > .scrollbar-container`.

Referencia: `FixedSidebarNav.jsx`, `globals.css` (`.app-sidebar-nav-scroll`).

### Remix icons globales

En `globals.css`:

```css
:where([class^='ri-']) {
  font-size: 1.5rem;
}
```

Afecta **todos** los `ri-*` hasta que algo más específico gane. Iconos dentro de `MuiChip-icon`, sidebar, badges arrancan enormes y luego el tema los achica.

**Patrón:** regla de dominio con mayor especificidad:

```css
.match-of-day-badge .MuiChip-icon [class^='ri-'] {
  font-size: 13px;
  line-height: 1;
}
```

No usar `text-sm` / `text-lg` en el `<i>` si el tema ya fija tamaño — duplica conflictos.

### MUI Chip + Emotion + `compactOverrides`

- Estilos del tema llegan **después** que globals y pueden pisar márgenes/tamaños.
- Con `componentDensity === 'compact'`, `deepmerge` en `overrides/index.js` fusiona `compactOverrides` sobre `chip.js`; el bloque `&.match-of-day-badge-chip` debe existir también en `compactOverrides.js`.
- Márgenes del icono en chips pequeños del tema: `marginInlineEnd: theme.spacing(-2)` (-16px) — no mezclar con `-0.125rem` en globals.

**Patrón para badge Chip:**

```jsx
<div className='match-of-day-badge'>
  <Chip
    size='small'
    color='secondary'
    className='match-of-day-badge-chip'
    icon={<i className='ri-football-line' />}
    label='Partido del dia'
    slotProps={{
      icon: {
        className: 'match-of-day-badge-chip-icon',
        sx: { height: 16, width: 16, marginInlineStart: '0.5rem', marginInlineEnd: '-0.125rem', fontSize: '13px', '& i': { fontSize: '13px', lineHeight: 1 } }
      }
    }}
    sx={{ height: 24, fontSize: '0.8125rem', '& .MuiChip-label': { paddingInline: '12px' } }}
  />
</div>
```

Referencia: `MatchOfTheDay.jsx`, `chip.js`, `compactOverrides.js`, `globals.css` (`.match-of-day-badge*`).

### Reglas globales de Perfect Scrollbar al final de `globals.css`

`.ps__rail-y` global puede pisar overrides del sidebar si van **antes** en el archivo. Overrides de sidebar/drawer deben ir **después** del bloque global o usar variables (`--app-sidebar-ps-rail-inline-end`).

## Checklist al depurar un flash

- [ ] ¿La librería modifica `className` o estilos solo tras `mount`? → shell + `style`/`sx` en el primer render.
- [ ] ¿Hay regla global (`ri-`, `.ps__rail-y`, `MuiListItemButton`) que gana al inicio? → especificidad de dominio o mover orden en `globals.css`.
- [ ] ¿`globals.css` y tema MUI usan **los mismos px/rem**? → alinear o eliminar duplicado conflictivo.
- [ ] ¿`compactOverrides` pisa el override de función en `chip.js`? → duplicar bloque en `compactOverrides` para esa clase.
- [ ] ¿Tailwind en el hijo (`text-sm`, `gap-5`) pelea con tema? → quitar o igualar valor.
- [ ] ¿Reservé altura mínima en el shell (`min-block-size: 24px`) para que el layout no colapse antes del mount?

## Anti-patrones

- Sustituir `Chip`/`Button` MUI por `<span>` sin que el usuario lo pida.
- Poner `padding-inline-end` solo en wrapper exterior cuando el rail está en el hijo PS.
- Confiar solo en `globals.css` para componentes MUI (Emotion gana al hidratar).
- Añadir `!important` en cadena sin alinear valores en tema y componente.

## Referencias en repo

| Caso | Archivos |
|------|----------|
| Sidebar scroll | `FixedSidebarNav.jsx`, `globals.css` (`app-sidebar-nav-scroll`) |
| Badge Chip | `MatchOfTheDay.jsx`, `chip.js`, `compactOverrides.js` |
| Remix global | `globals.css` (`:where([class^='ri-'])`) |
| Tema density | `@core/theme/overrides/index.js`, `compactOverrides.js` |
| Variables sidebar SSR | `themeRootSurfaces.js` |
