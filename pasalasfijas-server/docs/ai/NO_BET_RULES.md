# NO_BET Rules

NO_BET is a valid and important recommendation.

The system must prefer NO_BET over a weak forced pick.

## Force NO_BET when

- Critical data is missing.
- Recent form cannot be verified.
- Home/away performance cannot be verified.
- Table or competitive context is unclear.
- Important absences cannot be verified.
- Odds/value are unavailable or do not compensate risk.
- riskScore > 75.
- valueScore < 45.
- There are 3 or more strong contradictory signals.
- The pick depends mainly on local advantage.
- The pick depends mainly on team reputation.
- The match looks like a trap game.

## Avoid local 1X when

- The home team lost 2 or more recent home matches.
- The away team has a strong unbeaten run.
- Both teams are similar in table and form.
- The home team concedes often.
- The home team has important defensive absences.
- The odds do not compensate risk.

## Consider X2 away when

- The away team is unbeaten in 4+ matches.
- The home team is weak at home.
- The away team scores regularly.
- The away team concedes little.
- Table and recent form favor the away team.

## Stake rule

`suggestedStakePercent` is a stake index, not direct bankroll percentage.

Suggested interpretation:

- 0-20: symbolic stake.
- 21-40: low stake.
- 41-60: moderate stake.
- 61-80: controlled high stake.
- 81-100: maximum system confidence, still capped by bankroll rules.
