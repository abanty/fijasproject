# Cursor Start Here - Backend

This backend belongs to **PasalasFijas**, a freemium football prediction platform with AI.

Cursor must first read the root file:

```txt
CURSOR_START_HERE.md
```

Then read the `.cursor/rules` files and the documentation folders.

## Product

PasalasFijas is not a bookmaker. It does not process real-money bets. It provides football prediction analysis and conservative betting-market recommendations.

Free users can view 2 full predictions per day. Premium users can view all predictions.

## Architecture

Use:

```txt
NestJS modular monolith
+ DDD anemic
+ lightweight hexagonal architecture
+ Prisma
+ PostgreSQL
```

Main layer flow:

```txt
Controller -> UseCase -> Port/Repository interface -> Adapter/Prisma/OpenAI
```

## Main business rule

Never force a pick.

If data is missing, risk is high, odds have no value, or signals contradict each other, return or force:

```txt
NO_BET
```

## Recommended first task for Cursor

Validate that the backend installs, generates Prisma client, migrates, seeds and starts.

Do not implement OpenAI, sports APIs or payments until the base compiles and runs.
