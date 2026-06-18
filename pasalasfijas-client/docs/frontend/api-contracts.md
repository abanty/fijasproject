# Future API Contracts

## GET /predictions/today
Expected frontend shape:

```json
{
  "items": [
    {
      "id": "match_1",
      "homeTeam": "Argentina",
      "awayTeam": "Mexico",
      "competition": "World Cup",
      "kickoffAt": "2026-06-16T20:00:00.000Z",
      "isLocked": false,
      "analysis": {
        "confidence": "MEDIUM",
        "riskScore": 48,
        "mainPick": {
          "market": "OVER_UNDER_GOALS",
          "selection": "Over 1.5",
          "stakeIndex": 45,
          "odd": 1.55
        }
      }
    }
  ],
  "freeUnlocksUsed": 1,
  "freeUnlocksLimit": 2
}
```

## GET /predictions/history
Returns settled picks with resultStatus, profitLoss and market.

## GET /bankroll
Returns current bankroll summary and performance.
