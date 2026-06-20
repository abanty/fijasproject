---
name: plf-auth-api
description: >-
  Auth API Pasame La Fija: NestJS modules/auth (login, register, JWT Bearer),
  authService + apiClient en cliente, token en memoria/localStorage.
  Usar al conectar login al backend, crear endpoints auth, guards, DTOs,
  extender apiClient con Authorization. Palabras clave: auth, JWT, login,
  register, apiClient, authService, NestJS, Bearer, pasalasfijas-server.
---

# Auth API — Pasame La Fija

Backend: **`pasalasfijas-server/src/modules/auth/`**  
Cliente: **`src/lib/apiClient.js`** + **`src/services/authService.js`** (crear/ampliar)

Referencia cruzada Manyas (solo consulta): cookies httpOnly + OTP → `manyas/server/.../autenticacion/`. **PLF v1 usa Bearer JSON**, no replicar cookies salvo decisión explícita.

Al trabajar UI → skill **`plf-auth-ui`**.

---

## Endpoints actuales (Nest, prefijo global `api`)

| Método | Ruta | Auth | Body | Respuesta |
|--------|------|------|------|-----------|
| POST | `/auth/login` | — | `{ email, password }` | `{ accessToken, user: { id, email, name, role } }` |
| POST | `/auth/register` | — | `{ email, password, name? }` | `{ id, email, name, role }` (sin token) |
| GET | `/auth/me` | Bearer | — | payload JWT `{ sub, email, role }` |
| GET | `/users/me` | Bearer | — | usuario completo desde DB |

Controller: `pasalasfijas-server/src/modules/auth/presentation/controllers/auth.controller.ts`  
Login use case: `…/application/use-cases/login-user.use-case.ts`  
JWT: `…/infrastructure/strategies/jwt.strategy.ts` (**Bearer header**, no cookie)

Validación DTO:

- Login: email + password (`login.dto.ts`)
- Register: email, password min **8**, name opcional (`register.dto.ts`)

Errores Nest: `401 Invalid credentials`, `409` en email duplicado — mensaje en `response.message` (array o string).

---

## Capas backend (añadir endpoints)

```
modules/auth/
├── auth.module.ts
├── application/use-cases/     # una clase @Injectable por flujo
├── presentation/
│   ├── controllers/auth.controller.ts
│   ├── dto/
│   └── guards/jwt-auth.guard.ts
└── infrastructure/strategies/jwt.strategy.ts
```

Reglas:

- Controller delgado → delega en use case
- Use case usa `USER_REPOSITORY` / Prisma vía users module — **no Prisma directo en controller**
- Nuevo flujo = nuevo use case + ruta en controller + DTO con `class-validator`
- No duplicar lógica login en `users` salvo `GET /users/me`

Pendiente habitual v1: `POST /auth/logout` (client-side basta borrar token), refresh token (no existe aún).

---

## Cliente — capa servicio

Reglas: `.cursor/rules/02-api-integration.mdc`

```
src/lib/apiClient.js      → fetch wrapper + ApiError
src/lib/authToken.js      → get/set/clear accessToken (localStorage)
src/services/authService.js → login, register, getMe, logout
```

### Token store (mínimo)

```javascript
// src/lib/authToken.js
const KEY = 'plf_access_token'

export const getAccessToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem(KEY)

export const setAccessToken = token => localStorage.setItem(KEY, token)

export const clearAccessToken = () => localStorage.removeItem(KEY)
```

### Extender apiClient

Parsear mensaje Nest y adjuntar Bearer si hay token:

```javascript
// Añadir en apiClient.js — patrón mínimo
import { getAccessToken } from '@/lib/authToken'

const parseErrorMessage = async response => {
  try {
    const body = await response.json()
    const msg = body?.message
    return Array.isArray(msg) ? msg.join(', ') : msg || `Error ${response.status}`
  } catch {
    return `API request failed: ${response.status}`
  }
}

export const apiClient = async (path, options = {}) => {
  const token = options.skipAuth ? null : getAccessToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    cache: options.cache || 'no-store'
  })
  if (!response.ok) {
    throw new ApiError(await parseErrorMessage(response), response.status)
  }
  return response.json()
}
```

### authService

```javascript
// src/services/authService.js
import { apiClient } from '@/lib/apiClient'
import { setAccessToken, clearAccessToken } from '@/lib/authToken'

export const login = async ({ email, password }) => {
  const data = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true
  })
  setAccessToken(data.accessToken)
  return data
}

export const register = async ({ email, password, name }) => {
  return apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
    skipAuth: true
  })
}

export const getMe = () => apiClient('/users/me')

export const logout = () => {
  clearAccessToken()
}
```

Tras **register**, llamar `login` en el hook si se quiere sesión inmediata (Manyas auto-login; register PLF no devuelve token).

Mock: opcional `NEXT_PUBLIC_USE_MOCKS` como `predictionsService.js` — auth **no** debería mockearse en prod; solo dev si hace falta.

---

## Flujo login end-to-end

```
LoginForm → useLogin.login({ email, password })
  → authService.login → POST /api/auth/login
  → setAccessToken(accessToken)
  → router.replace('/dashboard')

Peticiones autenticadas → apiClient añade Authorization: Bearer …
GET /api/users/me → datos usuario para header / perfil
```

Protección rutas dashboard (pendiente): middleware Next o layout client que redirija a `/login` si `!getAccessToken()`.

---

## Env

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

Backend: `JWT_SECRET`, `JWT_EXPIRES_IN` en `.env` del server. CORS con `credentials: true` en `main.ts` (ya preparado; Bearer no requiere cookies).

---

## Qué NO portar de Manyas (v1 PLF)

| Manyas | PLF |
|--------|-----|
| Cookie httpOnly `token` | Bearer en localStorage |
| Server Actions `fetchApi` | `authService` + `apiClient` |
| OTP / verificar cuenta | No en scope inicial |
| Onboarding tenant | No |
| NextAuth `signIn('credentials')` | Token + redirect |

---

## Checklist integración

```
- [ ] NEXT_PUBLIC_API_BASE_URL apunta al Nest
- [ ] apiClient parsea message de Nest
- [ ] authToken + authService creados
- [ ] useLogin llama authService (no fetch en vista)
- [ ] Quitar router.push mock de Login.jsx
- [ ] Probar 401 con credenciales inválidas → mensaje en UI
- [ ] GET /users/me con token tras login
```

---

## Referencias

| Qué | Dónde |
|-----|--------|
| Auth module | `pasalasfijas-server/src/modules/auth/` |
| Users me | `pasalasfijas-server/src/modules/users/presentation/controllers/users.controller.ts` |
| Patrón service | `pasalasfijas-client/src/services/predictionsService.js` |
| Manyas HTTP (cookies) | `manyas/client/src/app/server/server_actions/_helpers/fetch-api.js` |
| UI forms | skill `plf-auth-ui` |
