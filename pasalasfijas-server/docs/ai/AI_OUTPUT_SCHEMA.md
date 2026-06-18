# AI Output Schema

The AI must return valid JSON only.

## Required top-level shape

```json
{
  "confidence": "HIGH | MEDIUM | LOW | NO_BET",
  "riskScore": 0,
  "summary": "",
  "reasonToBet": "",
  "reasonToAvoid": "",
  "conclusion": "",
  "noBetReason": null,
  "mainPick": null,
  "alternativePicks": [],
  "comboBet": null,
  "dataQuality": {
    "recentForm": true,
    "homeAway": true,
    "standings": true,
    "absences": true,
    "xg": true,
    "odds": true,
    "h2h": true
  }
}
```

## Pick shape

```json
{
  "market": "OVER_UNDER_GOALS",
  "selection": "OVER_1_5",
  "confidence": "MEDIUM",
  "riskScore": 42,
  "valueScore": 63,
  "suggestedStakePercent": 45,
  "odd": 1.55,
  "probabilityEstimated": 0.69,
  "expectedValue": 0.0695,
  "rationale": "Short reason based on data."
}
```

## Allowed markets

- MATCH_WINNER
- DOUBLE_CHANCE
- OVER_UNDER_GOALS
- BTTS
- HANDICAP
- CORNERS
- CARDS

## Allowed confidence

- HIGH
- MEDIUM
- LOW
- NO_BET

## Backend validation rules

- JSON must be valid.
- market must be allowed.
- confidence must be allowed.
- riskScore must be 0-100.
- valueScore must be 0-100.
- suggestedStakePercent must be 0-100.
- If confidence is NO_BET, do not publish mainPick.
- If riskScore > 75, confidence cannot be HIGH.
- If valueScore < 45, a pick cannot be MAIN.
- If critical data quality is false, confidence cannot be HIGH.
