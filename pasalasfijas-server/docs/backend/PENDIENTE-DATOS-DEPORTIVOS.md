# Pendiente — Datos deportivos y sync Mundial 2026

Documento para retomar mañana. Resume lo hecho, lo probado y los siguientes pasos sobre proveedores de partidos.

---

## Estado actual (hecho)

### Backend
- `ApiFootballProvider` → `https://v3.football.api-sports.io`
- `SyncCompetitionMatchesUseCase` → upsert competición, equipos y partidos en PostgreSQL
- `POST /api/admin/sync/competition` (body opcional: `leagueId`, `season`)
- `GET /api/admin/sports-data/status`
- Variables en `.env`:
  - `FOOTBALL_API_KEY`
  - `FOOTBALL_API_LEAGUE_ID=1`
  - `FOOTBALL_API_SEASON=2026`

### Frontend admin
- Ruta `/admin` → pestañas: Sincronizar torneo, Crear partido, Publicar fija
- Sidebar **Administración** (sección aparte de **Tu espacio**) → **Datos y operaciones**
- Presets de sync en UI:
  - Mundial 2026 (objetivo prod) — **no funciona en plan free**
  - Mundial 2022 (prueba plan free) — **probado OK: 64 partidos**
  - Premier League 2024 (prueba plan free)

### Sync verificado
```
Sincronizados 64 partidos (league=1, season=2022). Creados: 64, actualizados: 0.
```

---

## API-Football (dashboard.api-football.com)

| Plan | Precio | Requests/día | Mundial 2026 |
|------|--------|--------------|--------------|
| Free | $0 | 100 | **No** (solo temporadas 2022–2024) |
| Pro | ~$19/mes | 7.500 | Sí |

**Error real del plan free al pedir 2026:**
```json
"errors": { "plan": "Free plans do not have access to this season, try from 2022 to 2024." }
```

**Uso recomendado hoy:** desarrollo con 2022 o Premier 2024. Para Mundial 2026 en prod → plan pago o segundo proveedor.

---

## Proveedores alternativos investigados (pendiente integrar)

### 1. Open Football — recomendado para fixtures 2026 gratis

| | |
|---|---|
| Repo | https://github.com/openfootball/worldcup.json |
| Licencia | CC0 / dominio público |
| URL directa 2026 | https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json |
| API key | No |
| Live | No (comunidad actualiza JSON) |
| Incluye | fecha, hora, equipos, grupo, sede, goles cuando hay resultado |

**Tarea pendiente:** crear `OpenFootballProvider` + preset en admin **“Mundial 2026 (Open Football)”**.

---

### 2. TheStatsAPI — JSON/CSV estático 2026

| | |
|---|---|
| Fixtures JSON | https://www.thestatsapi.com/world-cup/data/fixtures.json |
| Fixtures CSV | https://www.thestatsapi.com/world-cup/data/fixtures.csv |
| API key | No |
| Live | No |
| Notas | 104 partidos, metadata clara (estadio, fase, UTC) |

**Tarea pendiente (opcional):** segundo provider o fallback si openfootball falla.

---

### 3. rezarahiminia/worldcup2026 — API REST + “live”

| | |
|---|---|
| Repo | https://github.com/rezarahiminia/worldcup2026 |
| API pública | https://worldcup26.ir |
| Swagger | https://worldcup26.ir/api-docs |
| Health | `GET /health` (sin auth) |
| Partidos | `GET /get/games` (hoy responde sin JWT; README dice auth en otros casos) |
| Equipos | `GET /get/teams` |
| Grupos | `GET /get/groups` |

**Cómo consigue el “tiempo real”:** no es el JSON del repo. Script `scripts/auto-updater.js` hace polling cada **3 s** a **Varzesh3** (`web-api.varzesh3.com`) y actualiza MongoDB. Ver `AUTO-UPDATER.md` en el repo.

**Pros:** Mundial 2026, REST listo, probado (`/get/games` devuelve scores, ej. México 2–0 Sudáfrica).

**Contras:**
- Dependencia de tercero (`worldcup26.ir`)
- Live = scraping, no oficial FIFA
- Solo WC 2026
- Rate limit (~300 req/min en su `.env.example`)
- JWT puede ser obligatorio en el futuro

**Tarea pendiente:** provider opcional `WorldCup26Provider` que consuma `worldcup26.ir/get/games` **solo como backup live**, no como única fuente.

---

## Arquitectura objetivo (recomendada)

```
Fixtures Mundial 2026  →  Open Football (GitHub, gratis, estable)
Sync diario            →  job/cron en Nest (1 request, sin límite API-Football)
Live / resultados      →  API-Football (pocos requests) 
                         o  worldcup26.ir (backup)
                         o  self-host auto-updater (solo si se valida Varzesh3)
IA / fijas               →  OpenAI (pendiente automatizar)
Producto               →  picks_db → UI freemium
```

**No depender de un solo proveedor en producción.**

---

## Pendiente para mañana (orden sugerido)

### Prioridad 1 — Mundial 2026 sin pagar API-Football
- [ ] Implementar `OpenFootballProvider` en `src/modules/football/infrastructure/providers/`
- [ ] Registrar provider (composite o selector por preset en sync)
- [ ] Nuevo preset en `SyncCompetitionPanel`: **Mundial 2026 (Open Football)**
- [ ] Probar sync → ver partidos en `/matches`
- [ ] Revisar `competitionSlug` / `externalId` vs catálogo del front (`world-cup-2026` vs `api-football-league-1`)

### Prioridad 2 — Ver datos en producto
- [ ] Confirmar que `/matches` y `/predictions/today` muestran partidos sincronizados
- [ ] Publicar fija de prueba desde admin (tab Publicar fija)
- [ ] Filtro por competición en Torneos activos (si hace falta)

### Prioridad 3 — Live scores (después de fixtures)
- [ ] Job/cron: re-sync resultados (`FINISHED` → bitácora)
- [ ] Evaluar `worldcup26.ir` como fuente live vs API-Football Pro
- [ ] Documentar decisión en este archivo

### Prioridad 4 — IA automática
- [ ] `OpenAiPredictionProvider` + job post-sync (sin publicar manual)
- [ ] `OPENAI_API_KEY` en `.env`

### Prioridad 5 — Opcional
- [ ] Integrar preset **WorldCup26 API** (`worldcup26.ir`)
- [ ] Self-host fork de worldcup2026 (solo si se necesita control total)

---

## Comandos útiles

```bash
# Server
cd pasalasfijas-server
pnpm run serve

# Probar API-Football desde terminal (con .env cargado)
curl -s "https://v3.football.api-sports.io/fixtures?league=1&season=2022" \
  -H "x-apisports-key: $FOOTBALL_API_KEY"

# Open Football 2026
curl -s "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json" | head -c 500

# WorldCup26 API
curl -s "https://worldcup26.ir/health"
curl -s "https://worldcup26.ir/get/games" | head -c 500

# Sync admin (con token JWT admin)
curl -X POST http://localhost:5200/api/admin/sync/competition \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"leagueId":1,"season":2022}'
```

---

## Credenciales de prueba

| Rol | Email | Password |
|-----|-------|----------|
| Admin | admin@pasalasfijas.com | Admin123456 |
| Dev (FREE) | dev@pasalasfijas.com | Dev123456 |

---

## Archivos clave del repo

| Área | Ruta |
|------|------|
| Provider API-Football | `src/modules/football/infrastructure/providers/api-football.provider.ts` |
| Sync use case | `src/modules/football/application/use-cases/sync-competition-matches.use-case.ts` |
| Admin controller | `src/modules/admin/presentation/controllers/admin.controller.ts` |
| Panel sync UI | `pasalasfijas-client/src/components/admin/SyncCompetitionPanel.jsx` |
| Nav administración | `pasalasfijas-client/src/data/navigation/navigationCatalog.js` |
| Env ejemplo | `pasalasfijas-server/.env.example` |

---

## Notas de sesión

- Login: corregido flash blanco en card al cerrar sesión (`auth-card` + `data-auth-page` en `globals.css`).
- API-Football free **sí funciona**; el 0 partidos en 2026 es **límite del plan**, no bug de integración.
- Mundial 2022 sync = prueba válida de que el pipeline BD → admin → app está OK.

---

*Última actualización: 22 jun 2026*
