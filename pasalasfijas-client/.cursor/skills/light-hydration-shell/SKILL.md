---
name: light-hydration-shell
description: >-
  Shell rápido en F5: cookies de tema con React cache(), Providers síncrono,
  páginas con datos de API vía DynamicMount (ssr:false) + fetch en cliente + skeleton.
  Usar al optimizar refresh, reducir hidratación pesada, migrar page.jsx con await
  de servicios, o replicar patrón Manyas en pasalasfijas-client. Palabras clave:
  hydration, F5, first paint, DynamicMount, ssr false, getThemeCookieState, Providers,
  skeleton, shell, await page, predictionsService, serverHelpers cache.
---

# Hidratación ligera — shell primero, datos después

## Qué problema resuelve

En F5 el usuario debe ver **rápido** sidebar, navbar y tema. Los **datos de API/BD** pueden llegar después con skeleton.

No es “partial hydration” de React: es **menos trabajo RSC antes del primer byte** + **vistas de negocio sin SSR**.

Complementa `stable-first-paint-ui` (CSS/Emotion sin flash). Este skill es **arquitectura de layouts y páginas**.

---

## Cuándo aplicar

| Sí | No |
|----|-----|
| `page.jsx` hace `await getX()` de API o mock | Página estática (`about`, `pricing`) |
| F5 se siente lento por datos en servidor | Solo ajuste visual (usar `stable-first-paint-ui`) |
| Vista ya es o puede ser `'use client'` | Reemplazar snapshot de tema en `app/layout.jsx` raíz |
| Beneficio real con API lenta | `ssr: false` en todo por defecto |

---

## Paquete 1 — Tema sin lecturas duplicadas

### `getThemeCookieState` con `React cache()`

Una sola lectura de `cookies()` por request RSC.

Referencia: `src/@core/utils/serverHelpers.js`

```javascript
import { cache } from 'react'

export const getThemeCookieState = cache(async () => {
  const cookieStore = await cookies()
  // settingsCookie, mode, systemMode
  return { settingsCookie, mode, systemMode }
})
```

`getSettingsFromCookie`, `getMode`, `getSystemMode`, `getServerMode` deben delegar en `getThemeCookieState`.

### `Providers` síncrono

El layout del segmento **ya leyó** el tema; `Providers` solo recibe props.

Referencia: `src/components/Providers.jsx`, `src/app/(dashboard)/layout.jsx`, `src/app/(blank-layout-pages)/layout.jsx`

```jsx
const { mode, settingsCookie, systemMode } = await getThemeCookieState()

<Providers
  direction={direction}
  mode={mode}
  settingsCookie={settingsCookie}
  systemMode={systemMode}
>
```

**No** volver a `await getMode()` dentro de `Providers`.

### Layout raíz

Mantener `resolveThemeRootSnapshot` en `src/app/layout.jsx` si ya está — favorece primer paint del tema en `<html>`. Solo unificar lectura con `getThemeCookieState()`.

---

## Paquete 2 — Página con datos dinámicos

### Estructura de archivos

```
app/(dashboard)/[ruta]/
  page.jsx              ← Server Component mínimo (sin await de datos)
  [Ruta]DynamicMount.jsx ← 'use client' + dynamic ssr:false
src/views/[ruta]/index.jsx ← 'use client' + useEffect fetch
src/components/loading/PageLoading.jsx ← skeletons reutilizables
```

### `page.jsx`

```jsx
import DashboardDynamicMount from './DashboardDynamicMount'

export default function DashboardPage() {
  return <DashboardDynamicMount />
}
```

### `*DynamicMount.jsx`

```jsx
'use client'

import dynamic from 'next/dynamic'
import { DashboardPageLoading } from '@/components/loading/PageLoading'

const DashboardView = dynamic(() => import('@/views/dashboard'), {
  ssr: false,
  loading: () => <DashboardPageLoading />
})

export default function DashboardDynamicMount() {
  return <DashboardView />
}
```

### Vista — fetch en cliente

```jsx
'use client'

import { useEffect, useState } from 'react'
import { getTodayPredictions } from '@/services/predictionsService'
import { DashboardPageLoading } from '@/components/loading/PageLoading'

const DashboardView = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    getTodayPredictions().then(result => {
      if (active) setData(result)
    })
    return () => { active = false }
  }, [])

  if (!data) return <DashboardPageLoading />
  // render con data
}
```

**No** importar skeletons desde `app/` hacia `views/` — usar `components/loading/PageLoading.jsx`.

---

## Estado en pasalasfijas-client

| Ruta | Estado |
|------|--------|
| Paquete 1 (cache + Providers) | Hecho |
| `/dashboard` | Hecho (`DashboardDynamicMount`) |
| `/predictions` | Hecho (`PredictionsDynamicMount`) |
| `/history` | Pendiente — `await getPredictionHistory()` |
| `/matches`, `/matches/[slug]` | Pendiente — `competitionsService` |
| `/bankroll` | Pendiente — `await getBankrollSummary()` |

Migrar pendientes **solo si** el usuario lo pide o hay API real lenta.

---

## Auth (futuro)

Si se añade login como Manyas:

- Validar JWT en **middleware** (edge), no `await auth()` en layout privado.
- `AuthGuard` cliente: en `loading` mostrar contenido; solo redirigir en `unauthenticated`.
- No pasar `session={null}` a `SessionProvider`.

Referencia cruzada: proyecto `manyas/client`.

---

## Checklist al migrar una ruta

1. ¿`page.jsx` tiene `await` de servicio? → candidata.
2. Crear skeleton en `PageLoading.jsx` (o archivo dedicado si es muy distinto).
3. Crear `[Ruta]DynamicMount.jsx` con `ssr: false`.
4. Mover fetch a la vista (`useEffect`) o hook existente del módulo.
5. Dejar `page.jsx` como wrapper de una línea.
6. `pnpm run build` — verificar que compila.
7. Probar F5: shell visible antes que datos.

---

## Anti-patrones

- `await` datos + vista `'use client'` con props desde servidor (bloquea igual).
- `Providers` async leyendo cookies otra vez.
- LQIP/blur de wallpaper en el mismo cambio (tema aparte).
- `ssr: false` en layouts o Providers.
- Duplicar strings de loading en cada DynamicMount — centralizar en `PageLoading.jsx`.

---

## Referencias doradas en el repo

| Pieza | Archivo |
|-------|---------|
| Cache cookies | `src/@core/utils/serverHelpers.js` |
| Providers | `src/components/Providers.jsx` |
| Layout dashboard | `src/app/(dashboard)/layout.jsx` |
| DynamicMount ejemplo | `src/app/(dashboard)/dashboard/DashboardDynamicMount.jsx` |
| Vista con fetch | `src/views/dashboard/index.jsx` |
| Skeletons | `src/components/loading/PageLoading.jsx` |
| CSS primer paint | `.cursor/skills/stable-first-paint-ui/SKILL.md` |

Origen del patrón: **Manyas** (`client/src/app/[lang]/(menu)/(private)/*/ProductosDynamicMount.jsx`, comentarios en `(private)/layout.jsx`).
