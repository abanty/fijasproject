# Backend Architecture

## Style

Use DDD anemic + lightweight hexagonal architecture.

This means:

- Business modules are organized by domain.
- Entities are simple data structures.
- Use cases coordinate business actions.
- Repository and provider interfaces act as ports.
- Prisma, OpenAI and external APIs are adapters.

## Module structure

```txt
src/modules/{module}/
  domain/
    entities/
    enums/
    repositories/
    ports/
  application/
    use-cases/
    services/
  infrastructure/
    prisma/
    providers/
    mappers/
    openai/
  presentation/
    controllers/
    dto/
    guards/
```

## Current modules

- auth
- users
- plans
- subscriptions
- football
- predictions
- ai-analysis
- bankroll
- admin

## Dependency direction

```txt
presentation -> application -> domain -> infrastructure via interfaces
```

Controllers should not contain business logic. They should validate/request data and call use cases.

Use cases should not depend directly on Prisma or OpenAI SDKs.

Infrastructure adapters can depend on Prisma, OpenAI and external APIs.

## MVP strictness level

This is a lightweight implementation. Avoid heavy DDD patterns until needed:

- no microservices yet;
- no event sourcing yet;
- no CQRS unless a specific performance problem appears;
- no complex value objects unless a rule becomes repeated or fragile.
