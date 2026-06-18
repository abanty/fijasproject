'use client'

import classnames from 'classnames'

import Link from '@components/Link'
import { adPromoThemes, defaultAdPromoTheme } from '@/components/ads/adPromoThemes'

const normalizeLines = value => {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (!value) return []

  return String(value)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
}

const AdPromoBanner = ({
  theme = defaultAdPromoTheme,
  headline = ['BONO CON SU PRIMER', 'DEPÓSITO'],
  amount,
  promoCode,
  promoCodeLabel = 'CÓDIGO:',
  brandMark = '1x',
  ctaLabel = 'REGÍSTRATE',
  disclaimer = '18+ | Aplican términos y condiciones',
  moreLink,
  href = '#',
  target = '_blank'
}) => {
  const headlineLines = normalizeLines(headline)
  const palette = adPromoThemes[theme] || adPromoThemes[defaultAdPromoTheme]

  return (
    <article
      className={classnames('ad-promo-banner', `ad-promo-banner--${theme}`)}
      style={{
        '--ad-promo-card-gradient': palette.cardGradient,
        '--ad-promo-border-gradient': palette.borderGradient,
        '--ad-promo-accent': palette.accent,
        '--ad-promo-brand-gradient': palette.brandGradient
      }}
    >
      <div className='ad-promo-banner__inner'>
        <div className='ad-promo-banner__main'>
          <div className='ad-promo-banner__copy'>
            {headlineLines.map(line => (
              <p key={line} className='ad-promo-banner__headline'>
                {line}
              </p>
            ))}
            {amount ? <p className='ad-promo-banner__amount'>{amount}</p> : null}
            {promoCode ? (
              <p className='ad-promo-banner__code'>
                {promoCodeLabel}{' '}
                <span className='ad-promo-banner__code-value'>{promoCode}</span>
              </p>
            ) : null}
          </div>

          <Link href={href} target={target} className='ad-promo-banner__cta'>
            <span className='ad-promo-banner__brand' aria-hidden='true'>
              {brandMark}
            </span>
            <span className='ad-promo-banner__cta-label'>{ctaLabel}</span>
          </Link>
        </div>

        {disclaimer ? (
          <div className='ad-promo-banner__footer'>
            <span className='ad-promo-banner__footer-text'>{disclaimer}</span>
            {moreLink ? (
              <Link href={moreLink.href || '#'} className='ad-promo-banner__footer-more'>
                {moreLink.label || 'More'}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default AdPromoBanner
