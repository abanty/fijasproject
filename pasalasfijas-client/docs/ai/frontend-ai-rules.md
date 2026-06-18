# AI Prediction Display Rules

The frontend displays AI outputs but does not decide picks.

Allowed confidence labels:
- HIGH
- MEDIUM
- LOW
- NO_BET

Allowed markets:
- MATCH_WINNER
- DOUBLE_CHANCE
- OVER_UNDER_GOALS
- BTTS
- HANDICAP
- CORNERS
- CARDS

Display rules:
- Show NO_BET as a professional decision.
- Do not hide risk.
- Do not display absolute certainty.
- Stake index must be explained as 0-100, not a direct bankroll percentage.
- Locked cards must hide pick, stake, odd and rationale.
