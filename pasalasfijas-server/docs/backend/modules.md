# Backend modules

Use a modular monolith with DDD anemic and lightweight hexagonal architecture.

Modules:
- auth
- users
- plans
- subscriptions
- football
- predictions
- ai-analysis
- bankroll
- admin

Layer direction:

presentation -> application -> domain ports/repositories -> infrastructure

Controllers should not depend directly on Prisma, OpenAI or external APIs.
