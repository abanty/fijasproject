# PasalasFijas API

Backend NestJS para **PasalasFijas**, una plataforma freemium de predicciones deportivas de fútbol con IA.

## Importante para Cursor

Antes de modificar código, leer:

```txt
CURSOR_START_HERE.md
```

Ese archivo contiene el contexto principal del producto, arquitectura, reglas de negocio, reglas IA y orden de implementación.

## Stack

- NestJS
- TypeScript
- pnpm
- Prisma
- PostgreSQL
- OpenAI preparado
- DDD anémico
- Arquitectura hexagonal ligera

## Producto

PasalasFijas no es una casa de apuestas. No procesa apuestas reales.

El backend permite construir una plataforma donde:

- usuarios FREE ven 2 predicciones completas por día;
- usuarios PREMIUM ven todas las predicciones;
- las predicciones se generan con IA y reglas de riesgo;
- el sistema puede devolver `NO_BET` cuando el partido no tiene valor o es riesgoso.

## Instalación local

Crear `.env` a partir de `.env.example`.

Luego ejecutar:

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm db:seed
pnpm start:dev
```

La API usa prefijo global:

```txt
/api
```

## Scripts

```bash
pnpm start:dev
pnpm build
pnpm lint
pnpm test
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:studio
pnpm db:seed
```

## Documentación

```txt
docs/backend/CURSOR_START_HERE.md
docs/backend/ARCHITECTURE.md
docs/backend/DEVELOPMENT_FLOW.md
docs/backend/API_ROUTES.md
docs/backend/NEXT_STEPS.md
docs/ai/SPORTS_AGENT_RULES.md
docs/ai/AI_OUTPUT_SCHEMA.md
docs/ai/NO_BET_RULES.md
docs/ai/PROMPT_VERSIONING.md
docs/product/MVP_SCOPE.md
docs/product/FREEMIUM_RULES.md
docs/product/GLOSSARY.md
docs/cursor/PROMPTS.md
```

## Arquitectura

Cada módulo debe tender a esta estructura:

```txt
src/modules/{module}/
  domain/
  application/
  infrastructure/
  presentation/
```

Flujo recomendado:

```txt
Controller -> UseCase -> Port/Repository -> Adapter
```

## Reglas principales

- No forzar picks.
- Si faltan datos o el riesgo es alto, usar `NO_BET`.
- No usar Prisma directamente en controllers.
- No usar OpenAI directamente en controllers ni use cases.
- No confiar en frontend para bloquear contenido premium.
- No guardar secretos reales en el repo.

## Estado actual

Preparado para iniciar MVP con:

- Auth base.
- Users.
- Plans.
- Subscriptions.
- Football matches.
- Predictions.
- AI analysis placeholder.
- Bankroll básico.
- Admin health.
- Prisma schema.
- Seed FREE/PREMIUM.

Aún pendiente:

- OpenAI real.
- API deportiva real.
- Pagos reales.
- Admin completo.
- Settlement de picks.
- Métricas avanzadas.


# Que decir primero: 

Lee primero CURSOR_START_HERE.md.

No modifiques código todavía. Primero dime:
1. Qué archivos leíste.
2. Qué entendiste del producto.
3. Qué entendiste de la arquitectura.
4. Qué riesgos ves en el estado actual.
5. Qué primer paso recomiendas.

Después, cuando confirme que entendió, le das este:

Actúa como Backend Architect NestJS + Prisma.

Objetivo: validar que el backend actual levante correctamente.

Tareas:
1. Ejecuta pnpm install.
2. Ejecuta pnpm prisma generate.
3. Ejecuta pnpm prisma migrate dev --name init.
4. Ejecuta pnpm db:seed.
5. Ejecuta pnpm start:dev.
6. Si hay errores, corrígelos respetando DDD anémico + hexagonal ligera.
7. No implementes OpenAI todavía.
8. No implementes pagos todavía.
9. Resume archivos modificados y cómo probar.