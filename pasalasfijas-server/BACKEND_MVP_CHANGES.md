# Backend MVP Changes

This package prepares the backend for the PasalasFijas MVP.

## Current package focus

This ZIP is prepared to help Cursor AI continue the project without losing context.

It includes:

- Root `CURSOR_START_HERE.md`.
- Normalized `.cursor/rules` files.
- Backend documentation.
- AI documentation.
- Product/freemium documentation.
- Cursor prompt examples.
- Project-specific README.
- Updated `.env.example`.
- Existing NestJS modules and Prisma schema preserved.

## Architecture

The backend uses:

```txt
NestJS modular monolith
+ DDD anemic
+ lightweight hexagonal architecture
+ Prisma
+ PostgreSQL
+ pnpm
```

## Existing modules

- auth
- users
- plans
- subscriptions
- football
- predictions
- ai-analysis
- bankroll
- admin

## Current implemented base

- Auth register/login with JWT base.
- Users `/users/me`.
- Plans `/plans`.
- Subscriptions `/subscriptions/me`.
- Football `/matches/today`.
- Predictions `/predictions/today` and `/predictions/matches/:matchId`.
- AI output validation endpoint placeholder.
- OpenAI provider placeholder.
- Bankroll create/get endpoints.
- Admin health endpoint.
- Prisma schema for MVP domains.
- Seed for FREE and PREMIUM plans.

## Not implemented yet

- Real OpenAI SDK call.
- Real sports data provider.
- Real payment provider.
- Admin match creation workflow.
- Admin mock prediction workflow.
- Match sync jobs.
- Pick settlement jobs.
- Advanced performance metrics.

## Recommended next commands

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm db:seed
pnpm start:dev
```

If errors appear, fix those first. Do not implement new features before the base compiles and starts.

## Recommended next Cursor prompt

```txt
Lee CURSOR_START_HERE.md.
No modifiques codigo todavia. Primero dime que archivos leiste, que entendiste del producto, que entendiste de la arquitectura y que primer paso recomiendas.
```
