# Cursor Prompts

## 1. First validation prompt

```txt
Lee primero CURSOR_START_HERE.md y docs/backend/CURSOR_START_HERE.md.

No modifiques código todavía. Primero dime:
1. Qué archivos leíste.
2. Qué entendiste del producto.
3. Qué entendiste de la arquitectura.
4. Qué riesgos ves en el estado actual.
5. Qué primer paso recomiendas.
```

## 2. Base install/build prompt

```txt
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
```

## 3. Admin match creation prompt

```txt
Actúa como Backend Architect.

Objetivo: crear flujo admin mínimo para cargar partidos manualmente antes de integrar una API deportiva.

Antes de modificar, lee CURSOR_START_HERE.md, docs/backend/API_ROUTES.md y prisma/schema.prisma.

Implementa:
1. DTOs para crear Competition, Team y Match o un endpoint simple que cree un Match con equipos existentes.
2. Use cases en application.
3. Repository interfaces en domain si hacen falta.
4. Prisma adapters en infrastructure.
5. Controllers delgados en presentation.
6. Rutas protegidas por JWT + roles ADMIN/SUPER_ADMIN.

No agregues API deportiva todavía.
```

## 4. Mock prediction prompt

```txt
Actúa como AI Prediction Engineer.

Objetivo: crear un flujo admin para publicar una predicción mock antes de conectar OpenAI.

Implementa:
1. Admin endpoint POST /api/admin/matches/:matchId/mock-analysis.
2. Use case que cree AiAnalysis COMPLETED.
3. Crear al menos un Pick MAIN.
4. Opcionalmente crear alternativePicks y ComboBet.
5. Respetar enums de Prisma.
6. Permitir probar /api/predictions/today y /api/predictions/matches/:matchId.

No llames OpenAI todavía.
```

## 5. OpenAI implementation prompt

```txt
Actúa como AI Prediction Engineer.

Objetivo: implementar OpenAiPredictionProvider usando el SDK oficial de OpenAI.

Antes de modificar:
1. Lee docs/ai/SPORTS_AGENT_RULES.md.
2. Lee docs/ai/AI_OUTPUT_SCHEMA.md.
3. Lee docs/ai/NO_BET_RULES.md.
4. Lee docs/ai/PROMPT_VERSIONING.md.
5. Revisa src/modules/ai-analysis.

Implementa:
1. Instalar dependencia oficial de OpenAI con pnpm.
2. OpenAiPredictionProvider real.
3. Prompt versionado sports-agent-v1.
4. JSON-only response.
5. Guardar rawInputJson y rawOutputJson.
6. Validar salida antes de publicar.
7. Si falla validación, no publicar picks.
```
