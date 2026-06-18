# Freemium Rules

## FREE users

- Can view 2 complete predictions per day.
- Can see locked previews after the free limit.
- Cannot view all premium details.
- Cannot rely on frontend blur as security.

## PREMIUM users

- Can view all complete predictions.
- Can view combos.
- Can view stake index.
- Can view full history when implemented.

## Backend enforcement

The backend must decide whether a user can view a prediction.

Frontend blur is only visual.

Use `UserPredictionView` to track daily free unlocks.

## Upgrade trigger

After free limit is reached, backend should return a locked response with a safe preview:

```json
{
  "locked": true,
  "reason": "FREE_LIMIT_REACHED",
  "preview": {
    "matchId": "...",
    "confidence": "MEDIUM",
    "riskScore": 48,
    "marketsAnalyzed": 4
  }
}
```
