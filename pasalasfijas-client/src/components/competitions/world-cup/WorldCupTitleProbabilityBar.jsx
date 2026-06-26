'use client'

import { useState } from 'react'

import IconButton from '@mui/material/IconButton'

import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'
import CountryFlag from '@/components/shared/CountryFlag'
import { worldCupTitleProbabilities } from '@/data/competitions/worldCupHub'

const SESSION_KEY = 'pasalasfijas:wc-title-prob-bar-dismissed'

const readDismissed = () => {
  if (typeof window === 'undefined') return false

  try {
    window.localStorage.removeItem(SESSION_KEY)

    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

const formatPercent = value => {
  const rounded = Math.round(value * 10) / 10

  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`
}

const WorldCupTitleProbabilityBar = () => {
  const [dismissed, setDismissed] = useState(readDismissed)

  const handleDismiss = () => {
    setDismissed(true)

    try {
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (dismissed) return null

  const renderSequence = (suffix, { hidden = false } = {}) => (
    <>
      {worldCupTitleProbabilities.map(item => (
        <span
          key={`${item.code}${suffix}`}
          className='world-cup-title-prob-bar__item'
          aria-hidden={hidden || undefined}
        >
          <CountryFlag code={item.code} size={14} variant='sphere' />
          <span className='world-cup-title-prob-bar__item-name'>{item.name}</span>
          <span className='world-cup-title-prob-bar__item-pct'>{formatPercent(item.value)}</span>
        </span>
      ))}
      <span className='world-cup-title-prob-bar__gap' aria-hidden />
    </>
  )

  return (
    <div className='world-cup-title-prob-bar'>
      <div className='world-cup-title-prob-bar__lead'>
        <RemixIcon icon='ri-trophy-line' size='sm' className='world-cup-title-prob-bar__icon' />
        <span className='world-cup-title-prob-bar__label'>Probabilidad de título</span>
      </div>

      <div className='world-cup-title-prob-bar__marquee'>
        <div className='world-cup-title-prob-bar__marquee-track'>
          {renderSequence('-a')}
          {renderSequence('-b', { hidden: true })}
        </div>
      </div>

      <Link href='/predictions' className='world-cup-title-prob-bar__cta'>
        Haz tu pronóstico →
      </Link>

      <IconButton
        size='small'
        aria-label='Cerrar'
        onClick={handleDismiss}
        className='world-cup-title-prob-bar__close'
      >
        <RemixIcon icon='ri-close-line' size='sm' />
      </IconButton>
    </div>
  )
}

export default WorldCupTitleProbabilityBar
