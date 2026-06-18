# Frontend MVP Changes

This package adds a frontend foundation for the football AI prediction MVP.

## Added
- Cursor rules in `.cursor/rules`.
- Product/frontend/AI docs in `docs`.
- Prediction mock data.
- API client and service layer prepared for NestJS backend.
- Prediction cards with confidence, risk, stake index, alternatives and combo bets.
- Locked premium prediction cards with blur.
- Dashboard, predictions, matches, history, bankroll and pricing pages.
- Updated navigation menus.
- Updated app metadata and login copy.

## Important
- Backend security still needs to enforce premium access.
- Frontend blur is visual only.
- Mock data is enabled by default unless `NEXT_PUBLIC_USE_MOCKS=false`.
- Configure `NEXT_PUBLIC_API_BASE_URL` when backend is ready.

## Suggested next step
Connect the frontend service layer to your NestJS endpoints after backend auth/subscription/prediction modules are ready.
