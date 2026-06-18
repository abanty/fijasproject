# Cursor Start Here - PasalasFijas API

This is the main entry point for Cursor AI.

Before modifying code, read:

1. `.cursor/rules/00-project-context.mdc`
2. `.cursor/rules/01-backend-architecture.mdc`
3. `.cursor/rules/02-clean-code.mdc`
4. `.cursor/rules/03-prisma-database.mdc`
5. `.cursor/rules/04-ai-prediction-engine.mdc`
6. `.cursor/rules/05-security-and-access.mdc`
7. `.cursor/rules/06-task-execution.mdc`
8. `docs/backend/CURSOR_START_HERE.md`
9. `docs/backend/ARCHITECTURE.md`
10. `docs/backend/DEVELOPMENT_FLOW.md`
11. `docs/backend/API_ROUTES.md`
12. `docs/ai/SPORTS_AGENT_RULES.md`
13. `docs/ai/AI_OUTPUT_SCHEMA.md`
14. `docs/ai/NO_BET_RULES.md`
15. `docs/product/MVP_SCOPE.md`
16. `docs/product/FREEMIUM_RULES.md`
17. `prisma/schema.prisma`
18. `src/modules/`

## One-line project summary

PasalasFijas API is a NestJS backend for a freemium football prediction platform that uses AI to recommend conservative, validated football picks or NO_BET.

## Stack

- NestJS
- TypeScript
- pnpm
- Prisma
- PostgreSQL
- OpenAI prepared
- DDD anemic
- Lightweight hexagonal architecture

## Current priority

Do not build everything at once. First validate the base:

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm db:seed
pnpm start:dev
```

If errors appear, fix them while preserving the existing architecture.

## Cursor response protocol

Before changing files, respond with:

1. Files read.
2. What you understood.
3. Task you will execute.
4. Files you expect to modify.

Do not make broad rewrites. Work in small, testable steps.
