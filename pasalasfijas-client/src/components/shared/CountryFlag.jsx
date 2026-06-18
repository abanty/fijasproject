'use client'

import classnames from 'classnames'

const CountryFlag = ({ code, size = 20, variant = 'sphere', className }) => {
  if (!code) return null

  const normalized = String(code).trim().toLowerCase()

  if (!/^[a-z]{2}$/.test(normalized)) {
    return null
  }

  if (variant === 'sphere') {
    return (
      <span
        className={classnames('country-flag-sphere shrink-0', className)}
        style={{ width: size, height: size }}
        title={normalized.toUpperCase()}
        aria-hidden
      >
        <span className={classnames(`fi fi-${normalized}`, 'country-flag-sphere__flag')} />
      </span>
    )
  }

  return (
    <span
      className={classnames(
        `fi fi-${normalized}`,
        'inline-block shrink-0 bg-cover bg-center border border-divider rounded-sm',
        className
      )}
      style={{
        width: size,
        height: Math.round(size * 0.75)
      }}
      title={normalized.toUpperCase()}
      aria-hidden
    />
  )
}

export default CountryFlag
