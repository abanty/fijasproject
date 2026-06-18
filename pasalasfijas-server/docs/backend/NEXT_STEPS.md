# Next Steps

## Step 1 - Validate base

Run:

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm db:seed
pnpm start:dev
```

Fix compile/runtime errors before adding features.

## Step 2 - Test base endpoints

Use these routes:

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/users/me
GET  /api/plans
GET  /api/subscriptions/me
GET  /api/matches/today
GET  /api/predictions/today
```

## Step 3 - Add minimal admin match creation

Before sports API integration, create an admin endpoint to manually add teams, competitions and matches for local testing.

## Step 4 - Add mock prediction publishing

Before OpenAI, create an admin use case that publishes a mock AiAnalysis/Pick for a match.

## Step 5 - Connect frontend

Connect the existing Next.js frontend to these backend routes using `NEXT_PUBLIC_API_BASE_URL`.

## Step 6 - Add OpenAI

Only after the base works, implement `OpenAiPredictionProvider` using the official OpenAI SDK.
