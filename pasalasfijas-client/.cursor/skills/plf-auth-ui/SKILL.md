---
name: plf-auth-ui
description: >-
  Pantallas de autenticación en pasalasfijas-client: módulo tipo Manyas Autenticacion
  (index + hooks + componentes), LoginV1 centrado MUI, blank layout, sin i18n.
  Usar al crear login, registro, forgot password, conectar formularios con hooks,
  o migrar views/Login.jsx a views/auth/. Palabras clave: auth, login, registro,
  Autenticacion, iniciar sesion, blank layout, TextField medium, useLogin.
---

# Auth UI — Pasame La Fija

Patrón de referencia: **Manyas** `client/src/views/Autenticacion/` (separación vista / hook / servicio).
Implementación actual: **`src/views/Login.jsx`** (LoginV1 centrado, submit mock).

**No copiar** de Manyas: NextAuth, Server Actions, segmento `[lang]`, Redux login slice.

---

## Cuándo usar

| Sí | No |
|----|-----|
| Login, registro, recuperar contraseña | Guards JWT en Nest (usar `plf-auth-api`) |
| Extraer hook desde formulario | OTP / onboarding multi-tenant (Manyas; no aplica a PLF v1) |
| Nueva ruta en `(blank-layout-pages)/` | Lógica HTTP en el componente |

Al conectar API → leer también **`plf-auth-api`**.

---

## Layout y rutas

- Segmento: `src/app/(blank-layout-pages)/`
- Página: `login/page.jsx` → `getServerMode()` + `<Login mode={mode} />`
- Layout blank: `src/app/(blank-layout-pages)/layout.jsx` (sin dashboard shell)
- Home post-login: `themeConfig.homePageUrl` → `/dashboard`
- **Sin i18n** — copy en español inline
- Links: `@components/Link` (no `next/link` directo en Typography)

Rutas previstas:

```
/login          → iniciar sesión
/register       → crear cuenta (pendiente)
/forgot-password → recuperar (pendiente)
```

---

## Estructura del módulo (objetivo)

Inspirado en Manyas `Autenticacion/index.jsx` + hooks; carpetas en **inglés**, UI en **español**.

```
src/views/auth/
├── index.jsx                 # switch por prop view: 'login' | 'register'
├── hooks/
│   ├── useLogin.js           # estado UI + llama authService.login
│   └── useRegister.js
└── components/
    ├── LoginForm.jsx         # solo MUI + react-hook-form
    └── RegisterForm.jsx
```

**Fase actual (válida):** un solo `src/views/Login.jsx` hasta que exista registro; entonces migrar sin cambiar URLs.

Regla: **componente delgado**, **hook** orquesta submit/errores/loading, **servicio** hace HTTP (`plf-auth-api`).

---

## Plantilla visual — LoginV1 centrado

Referencia dorada: `src/views/Login.jsx`

| Elemento | Convención |
|----------|------------|
| Contenedor | `min-bs-[100dvh]`, card `sm:is-[450px]`, centrada |
| Fondo | `Illustrations` + `auth-v1-mask-{light\|dark}.png` vía `useImageVariant(mode, …)` |
| Logo | centrado en card, link a `themeConfig.homePageUrl` |
| Inputs | `TextField size='medium'` (obligatorio: `componentDensity: compact` achica inputs) |
| Botón principal | `Button size='medium' variant='contained' fullWidth` |
| Password | `slotProps.input.endAdornment` + icono ojo RemixIcon |
| Social | IconButtons decorativos (sin wire hasta definir OAuth) |

No usar LoginV2 (dos columnas) salvo pedido explícito.

---

## Hook `useLogin` (patrón)

Adaptar idea de Manyas `useIniciarSesion.js` sin NextAuth/Redux:

```javascript
// src/views/auth/hooks/useLogin.js
'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login as loginRequest } from '@/services/authService'
import themeConfig from '@configs/themeConfig'

export const useLogin = () => {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClickShowPassword = useCallback(() => {
    setIsPasswordShown(v => !v)
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setErrorMessage('')
    if (!email?.trim() || !password) {
      setErrorMessage('Email y contraseña son requeridos')
      return { success: false }
    }
    setLoading(true)
    try {
      await loginRequest({ email: email.trim(), password })
      router.replace(themeConfig.homePageUrl)
      return { success: true }
    } catch (e) {
      setErrorMessage(e.message || 'Error al iniciar sesión')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }, [router])

  return { isPasswordShown, errorMessage, loading, handleClickShowPassword, login, clearError: () => setErrorMessage('') }
}
```

---

## Formulario en componente

- `react-hook-form` + MUI `Controller` (como Manyas `IniciarSesion.jsx`)
- Mostrar `errorMessage` del hook (`Alert` o `Typography color='error'`)
- `loading` → `disabled` en inputs + `CircularProgress` en botón
- Limpiar error al tipear (`clearError` en `onChange`)

```jsx
<form onSubmit={handleSubmit(values => login(values))} className='flex flex-col gap-5'>
  {/* TextField size='medium' ... */}
  {errorMessage ? <Typography color='error' variant='body2'>{errorMessage}</Typography> : null}
  <Button type='submit' disabled={loading} size='medium' fullWidth variant='contained'>
    {loading ? 'Ingresando…' : 'Ingresar'}
  </Button>
</form>
```

---

## Checklist nueva pantalla auth

```
- [ ] Ruta en (blank-layout-pages)/…/page.jsx con getServerMode()
- [ ] 'use client' solo donde haya interactividad
- [ ] size='medium' en TextField y Button submit
- [ ] Hook dedicado; sin fetch en JSX
- [ ] Estados: loading, error, (empty N/A en login)
- [ ] Copy español; themeConfig.templateName en título
- [ ] Links internos con @components/Link
```

---

## Referencias

| Qué | Dónde |
|-----|--------|
| Login actual PLF | `src/views/Login.jsx` |
| Patrón módulo Manyas | `manyas/client/src/views/Autenticacion/` |
| Form + hook Manyas | `…/componentes/iniciarSesion/IniciarSesion.jsx`, `…/hooks/useIniciarSesion.js` |
| Reglas front | `.cursor/rules/01-frontend-architecture.mdc` |
| API / token | skill `plf-auth-api` |
