# Development Flow

## Package manager

Use pnpm only.

Do not use npm or yarn.

## First local validation

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm db:seed
pnpm start:dev
```

## MVP implementation order

1. Validate installation and TypeScript compilation.
2. Validate Prisma schema and migration.
3. Seed FREE and PREMIUM plans.
4. Test auth register/login.
5. Test `/auth/me`.
6. Test `/users/me`.
7. Test `/plans`.
8. Test `/subscriptions/me`.
9. Add/admin-load football matches manually or with seed.
10. Test `/matches/today`.
11. Test predictions mock flow.
12. Implement OpenAI adapter.
13. Implement strong AI output validation.
14. Implement sports data provider.
15. Implement payment provider later.

## Working rules

- Do not implement everything at once.
- Do not install new libraries without a reason.
- Do not rewrite the module structure.
- Keep changes focused.
- After changes, list modified files and testing steps.
