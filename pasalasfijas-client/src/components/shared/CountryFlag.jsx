'use client'

import { useState } from 'react'

import classnames from 'classnames'

import { getCustomCountryFlagSrc } from '@/lib/country/countryFlagAsset'

const LibraryFlag = ({ normalized, className }) => (
  <span className={classnames(`fi fi-${normalized}`, className)} aria-hidden />
)

const CountryFlag = ({ code, size = 20, variant = 'sphere', className, source = 'auto' }) => {
  const [customFailed, setCustomFailed] = useState(false)

  if (!code) return null

  const normalized = String(code).trim().toLowerCase()

  if (!/^[a-z]{2}$/.test(normalized)) {
    return null
  }

  const customSrc = getCustomCountryFlagSrc(normalized)
  const useCustom = source === 'custom' || (source === 'auto' && customSrc && !customFailed)
  const title = normalized.toUpperCase()

  if (variant === 'sphere' && useCustom && customSrc) {
    return (
      <span
        className={classnames('country-flag-asset-frame shrink-0', className)}
        style={{ width: size, height: size }}
        title={title}
        aria-hidden
      >
        <img
          src={customSrc}
          alt=''
          className='country-flag-asset'
          onError={() => setCustomFailed(true)}
        />
      </span>
    )
  }

  const flagClassName = classnames(variant === 'sphere' ? 'country-flag-sphere__flag' : null)

  const flagGraphic = (
    <LibraryFlag
      normalized={normalized}
      className={classnames(
        flagClassName,
        variant !== 'sphere' && 'inline-block shrink-0 bg-cover bg-center border border-divider rounded-sm'
      )}
    />
  )

  if (variant === 'sphere') {
    return (
      <span
        className={classnames('country-flag-sphere shrink-0', className)}
        style={{ width: size, height: size }}
        title={title}
        aria-hidden
      >
        {flagGraphic}
      </span>
    )
  }

  return (
    <span
      className={classnames('inline-flex shrink-0', className)}
      style={{
        width: size,
        height: Math.round(size * 0.75)
      }}
      title={title}
      aria-hidden
    >
      {flagGraphic}
    </span>
  )
}

export default CountryFlag
