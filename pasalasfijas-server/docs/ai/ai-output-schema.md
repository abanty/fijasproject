# AI output schema

Expected output must be valid JSON:

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
