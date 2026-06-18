# API Routes

Global prefix:

```txt
/api
```

## Auth

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Users

```txt
GET /api/users/me
```

## Plans

```txt
GET /api/plans
```

## Subscriptions

```txt
GET /api/subscriptions/me
```

## Football

```txt
GET /api/matches/today
```

## Predictions

```txt
GET /api/predictions/today
GET /api/predictions/matches/:matchId
```

## AI Analysis

```txt
POST /api/ai-analysis/validate-output
```

Admin-only route used to validate candidate AI output.

## Bankroll

```txt
GET  /api/bankroll
POST /api/bankroll
```

## Admin

```txt
GET /api/admin/health
```

## Next API routes to add

```txt
POST  /api/admin/matches
POST  /api/admin/matches/:matchId/analyze
POST  /api/admin/analyses/:analysisId/publish
PATCH /api/admin/picks/:pickId/result
GET   /api/admin/performance
POST  /api/bankroll/track-pick
GET   /api/bankroll/performance
```
