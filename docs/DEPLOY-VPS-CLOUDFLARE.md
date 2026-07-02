# Despliegue en VPS — PasalasFijas (PM2 + Cloudflare Tunnel)

Guía práctica del setup en producción (`manyas.store`), incluyendo problemas que aparecieron y cómo se resolvieron.

---

## Arquitectura

```
Internet
   │
   ├─ https://fijas.manyas.store      → Cloudflare Tunnel → 127.0.0.1:3000  (Next.js / PM2)
   └─ https://api.manyas.store        → Cloudflare Tunnel → 127.0.0.1:5200  (NestJS / PM2)
```

- **No hay Nginx** en el VPS: el tráfico entra por **Cloudflare Tunnel** (`cloudflared`).
- El tunnel se llama **`manyas-store`** (ID: `70af21b5-9d32-4dfe-9469-89bce2309cff`).
- El tunnel está **configurado localmente** en `/etc/cloudflared/config.yml` (no se gestiona desde el panel Zero Trust sin migrar).

---

## Usuario del sistema (importante)

Todo el proyecto debe correr con el usuario normal **`abanty`**, no con **root**.

Si alguna vez compilaste o levantaste PM2 como root, `dist/` y `.next/` quedan con permisos de root y fallan builds con `EACCES`.

### Arreglar permisos

```bash
sudo chown -R abanty:abanty ~/proyectos/fijasproject
sudo rm -rf ~/proyectos/fijasproject/pasalasfijas-server/dist
sudo rm -rf ~/proyectos/fijasproject/pasalasfijas-client/.next
```

### Regla

- `sudo` solo para `chown`, `rm -rf` de carpetas bloqueadas o editar `/etc/cloudflared/`.
- `pnpm build`, `pm2 start`, etc. **siempre como `abanty`**.

---

## Usuarios de la aplicación (seed)

Definidos en `pasalasfijas-server/prisma/seed.ts`:

| Rol | Email | Contraseña |
|-----|--------|------------|
| Admin | `admin@pasalasfijas.com` | `Admin123456` |
| Dev (FREE) | `dev@pasalasfijas.com` | `Dev123456` |

Crear/actualizar datos de prueba:

```bash
cd ~/proyectos/fijasproject/pasalasfijas-server
pnpm db:seed
```

---

## Backend (NestJS)

### Rutas

- Prefijo global: **`/api`** (`src/main.ts` → `app.setGlobalPrefix('api')`).
- Login: **`POST /api/auth/login`** (no existe `GET` — un 404 en GET es normal).
- Admin health: `GET /api/admin/health` → requiere JWT + rol ADMIN.

### Variables de entorno (`.env`)

Ejemplo de producción:

```env
NODE_ENV=production
PORT=5200
TZ=America/Lima

DATABASE_URL="postgresql://postgres:postgres123@192.168.18.123:5432/picks_db?schema=public"

JWT_SECRET=clavesecretaparagenerartoken
JWT_EXPIRES_IN="7d"

OPENAI_API_KEY="change_me"
OPENAI_MODEL="gpt-4.1-mini"
OPENAI_PROMPT_VERSION="sports-agent-v1"

FREE_DAILY_PREDICTIONS_LIMIT=2
DEFAULT_TIMEZONE="America/Lima"

FOOTBALL_API_KEY=...
FOOTBALL_API_LEAGUE_ID=1
FOOTBALL_API_SEASON=2026
```

### Build y PM2

```bash
cd ~/proyectos/fijasproject/pasalasfijas-server
pnpm install
pnpm run build
ls dist/src/main.js    # el entry compilado está aquí, NO en dist/main.js
pm2 start dist/src/main.js --name pasalasfijas-api
pm2 save
pm2 startup            # ejecutar la línea sudo que imprime (una vez)
```

### Comprobar

```bash
pm2 logs pasalasfijas-api --lines 30
curl -X POST http://127.0.0.1:5200/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@pasalasfijas.com","password":"Dev123456"}'
```

Debe devolver JSON con `accessToken`.

---

## Frontend (Next.js)

### Variables de entorno (producción)

```env
NEXT_PUBLIC_APP_URL=https://fijas.manyas.store
BASEPATH=
PORT=3000
NODE_ENV=production

# URL pública del API (incluye /api al final)
NEXT_PUBLIC_API_BASE_URL=https://api.manyas.store/api
NEXT_PUBLIC_USE_MOCKS=false
```

**Errores que tuvimos:**

| Config incorrecta | Problema |
|-------------------|----------|
| `http://127.0.0.1:5500` | Puerto mal (backend es **5200**) y localhost no funciona desde el navegador del usuario |
| Sin `/api` en la base URL | Las rutas del cliente son `/auth/login` → debe quedar `.../api/auth/login` |
| `NEXT_PUBLIC_USE_MOCKS=true` | Partidos, banca, etc. usan datos falsos en lugar del backend |

Tras cambiar `.env`:

```bash
cd ~/proyectos/fijasproject/pasalasfijas-client
pnpm run build
pm2 start pnpm --name pasalasfijas-client -- start
# o si ya existe:
pm2 restart pasalasfijas-client
pm2 save
```

---

## Cloudflare Tunnel

### Archivo de configuración

`/etc/cloudflared/config.yml`:

```yaml
tunnel: 70af21b5-9d32-4dfe-9469-89bce2309cff
credentials-file: /root/.cloudflared/70af21b5-9d32-4dfe-9469-89bce2309cff.json

ingress:
  - hostname: fijas.manyas.store
    service: http://127.0.0.1:3000
  - hostname: api.manyas.store
    service: http://127.0.0.1:5200
  - hostname: manyas.store
    service: http://127.0.0.1:3100
  - hostname: www.manyas.store
    service: http://127.0.0.1:3100
  - service: http_status:404
```

Reiniciar tras cambios:

```bash
sudo systemctl restart cloudflared
sudo systemctl status cloudflared
```

### DNS (registros tipo Túnel)

En **Cloudflare → manyas.store → DNS**:

| Nombre | Tipo | Destino |
|--------|------|---------|
| `fijas` | Túnel | manyas-store |
| `api` | Túnel | manyas-store |

Crear ruta DNS desde el VPS:

```bash
sudo cloudflared tunnel route dns manyas-store fijas.manyas.store
sudo cloudflared tunnel route dns manyas-store api.manyas.store
```

### Zero Trust

El tunnel fue creado **localmente**. En Zero Trust aparece el mensaje de que no se puede gestionar desde el panel sin **migrar** (irreversible). **No hace falta migrar**: se edita `config.yml` + DNS.

---

## SSL: por qué NO usar `api.fijas.manyas.store`

Error en navegador: `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`.

**Causa:** el certificado SSL gratis de Cloudflare cubre `*.manyas.store` (un nivel: `fijas.manyas.store`, `api.manyas.store`), pero **no** subdominios de dos niveles como `api.fijas.manyas.store`.

**Solución adoptada:** API en **`https://api.manyas.store`** (un solo nivel bajo `manyas.store`).

Alternativa sin subdominio de API: enrutar por path en el mismo host:

```yaml
  - hostname: fijas.manyas.store
    path: ^/api
    service: http://127.0.0.1:5200
  - hostname: fijas.manyas.store
    service: http://127.0.0.1:3000
```

Con `NEXT_PUBLIC_API_BASE_URL=https://fijas.manyas.store/api`.

---

## Pruebas desde fuera del VPS

Desde tu PC (no desde el VPS — `curl https` desde el mismo servidor a veces falla TLS):

```bash
curl -X POST https://api.manyas.store/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@pasalasfijas.com","password":"Dev123456"}'
```

En navegador, `GET https://api.manyas.store/api/auth/login` devuelve 404 — es correcto; el login es **POST**.

---

## PM2 — comandos útiles

```bash
pm2 list
pm2 logs pasalasfijas-api
pm2 logs pasalasfijas-client
pm2 restart pasalasfijas-api
pm2 restart pasalasfijas-client
pm2 save
```

---

## Cambios de frontend (layout / performance)

Resumen de ajustes en código (no despliegue):

1. **FOUC en móvil al refrescar (F5):** el SSR pintaba layout desktop y luego JS cambiaba a móvil. Solución: visibilidad por viewport con CSS (`.header-viewport-desktop-only` / `.header-viewport-mobile-only`) en menú; buscador con `useMediaQuery(..., { noSsr: true, defaultMatches: false })` para no montar el input en móvil.
2. **Script en `<head>`:** `buildInitNavViewportScript` en `layout.jsx` para `data-nav-viewport` antes del paint.
3. **Cards de partidos:** sombra ligera en `.world-cup-match-card` en `globals.css`.

Archivos principales: `NavbarContent.jsx`, `FrontMenu.jsx`, `Navigation.jsx`, `globals.css`, `layout.jsx`.

---

## Checklist rápido de despliegue

- [ ] Permisos `abanty` en `~/proyectos/fijasproject`
- [ ] Backend: `pnpm build` → `pm2 start dist/src/main.js`
- [ ] Frontend: `.env` con `api.manyas.store` y `USE_MOCKS=false` → `pnpm build` → PM2
- [ ] `config.yml` con `api.manyas.store` → `:5200`
- [ ] DNS tunnel para `api` y `fijas`
- [ ] `sudo systemctl restart cloudflared`
- [ ] `curl` POST login OK en local y desde PC
- [ ] Login en `https://fijas.manyas.store`

---

## Rutas del proyecto en el VPS

```
~/proyectos/fijasproject/pasalasfijas-client
~/proyectos/fijasproject/pasalasfijas-server
```
