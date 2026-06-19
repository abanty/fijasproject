'use client'

import { formatProbability } from '@/lib/predictionFormatters'

const segments = probabilities => [
  { key: 'home', value: probabilities?.home ?? 0, code: null, tone: 'home' },
  { key: 'draw', value: probabilities?.draw ?? 0, code: 'X', tone: 'draw' },
  { key: 'away', value: probabilities?.away ?? 0, code: null, tone: 'away' }
]

const segmentFlex = value => ({
  flexGrow: value,
  flexBasis: 0,
  minWidth: 0
})

const MatchOutcomeBar = ({ probabilities }) => {
  const items = segments(probabilities)

  return (
    <div className='match-outcome-bar flex flex-col gap-1.5'>
      <div className='match-outcome-bar__track flex overflow-hidden rounded-md'>
        {items.map(
          item =>
            item.value > 0 && (
              <span
                key={item.key}
                className={`match-outcome-bar__segment match-outcome-bar__segment--${item.tone}`}
                style={segmentFlex(item.value)}
                title={item.code ? `${item.code} ${formatProbability(item.value)}` : formatProbability(item.value)}
              />
            )
        )}
      </div>
      <div className='match-outcome-bar__labels flex'>
        {items.map(item => (
          <div
            key={item.key}
            className={`match-outcome-bar__label match-outcome-bar__label--${item.tone}`}
            style={segmentFlex(item.value)}
          >
            <span className='match-outcome-bar__pct tabular-nums'>{formatProbability(item.value)}</span>
            {item.code ? <span className='match-outcome-bar__code'>{item.code}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchOutcomeBar
