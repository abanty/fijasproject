'use client'

import { useEffect, useRef, useState } from 'react'

import styled from '@emotion/styled'
import classnames from 'classnames'
import { useColorScheme } from '@mui/material/styles'

import themeConfig from '@configs/themeConfig'

import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

const BRAND_BASE = 'Pasalas'
const BRAND_ACCENT = 'Fijas'
const BRAND_BASE_COLOR_DARK = '#F5F0E6'
const BRAND_BASE_COLOR_LIGHT = '#3D3B45'
const SHINE_HIGHLIGHT_DARK = '#fff0b8'
const SHINE_HIGHLIGHT_LIGHT = '#ffffff'

const LOGO_SIZES = {
  default: { ball: 32, fontSize: '1.375rem', minBlock: 32 },
  lg: { ball: 48, fontSize: '1.875rem', minBlock: 48 }
}

const BALL_BOUNCE_FALLBACK_MS = 1000
const BALL_SPIN_DURATION_MS = 750
const BALL_SPIN_DEG = 180
const BALL_SPIN_SHINE_LEAD_MS = 350
const WORDMARK_SHINE_MS = 700

const wordShineStyles = (baseColor, highlightColor) => `
  background-image: linear-gradient(
    90deg,
    ${baseColor} 0%,
    ${baseColor} 42%,
    ${highlightColor} 50%,
    ${baseColor} 58%,
    ${baseColor} 100%
  );
  background-size: 400% 100%;
  background-repeat: no-repeat;
  background-position: 0% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${baseColor};
  animation: logoTextShine ${WORDMARK_SHINE_MS}ms ease-in-out forwards;
`

const LogoBall = styled.img`
  transform: ${({ $settledRotation }) =>
    $settledRotation != null ? `rotate(${$settledRotation}deg)` : undefined};

  &.is-spinning {
    animation: logoBallSpin ${BALL_SPIN_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes logoBallSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(${BALL_SPIN_DEG}deg);
    }
  }
`

const LogoWordmark = styled.span`
  display: inline-flex;
  align-items: baseline;
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  white-space: nowrap;
  transition: ${({ transitionDuration }) =>
    `margin-inline-start ${transitionDuration}ms ease-in-out, opacity ${transitionDuration}ms ease-in-out`};

  ${({ isHovered, isCollapsed, isBreakpointReached }) =>
    !isBreakpointReached && isCollapsed && !isHovered
      ? 'opacity: 0; margin-inline-start: 0;'
      : 'opacity: 1; margin-inline-start: 1px;'}

  @keyframes logoTextShine {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
`

const LogoWordBase = styled.span`
  color: ${({ color }) => color};

  ${({ $isLight, color, $isShining }) =>
    $isLight &&
    !$isShining &&
    `
      text-shadow: 0 1px 1px rgba(255, 255, 255, 0.45);
    `}

  ${({ $isShining, color, $shineHighlight }) =>
    $isShining && wordShineStyles(color, $shineHighlight)}
`

const LogoWordAccent = styled.span`
  color: ${({ $accentColor }) => $accentColor};
  text-shadow: 0 0 18px color-mix(in srgb, ${({ $accentColor }) => $accentColor} 35%, transparent);
  transition: color 200ms ease, text-shadow 200ms ease;

  ${({ $isShining, $accentColor, $shineHighlight }) =>
    $isShining &&
    `
      ${wordShineStyles($accentColor, $shineHighlight)}
      text-shadow: none;
    `}
`

const Logo = ({ color, size = 'default' }) => {
  const logoTextRef = useRef(null)
  const ballRef = useRef(null)
  const bounceFallbackRef = useRef(null)
  const prefersReducedMotionRef = useRef(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [settledRotation, setSettledRotation] = useState(null)
  const [isWordmarkShining, setIsWordmarkShining] = useState(false)
  const { isHovered, transitionDuration, isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()
  const { mode: colorSchemeMode } = useColorScheme()
  const { layout } = settings
  const logoSize = LOGO_SIZES[size] ?? LOGO_SIZES.default
  const isDarkMode = (colorSchemeMode ?? settings.mode ?? 'dark') === 'dark'
  const brandBaseColor = color ?? (isDarkMode ? BRAND_BASE_COLOR_DARK : BRAND_BASE_COLOR_LIGHT)
  const shineHighlight = isDarkMode ? SHINE_HIGHLIGHT_DARK : SHINE_HIGHLIGHT_LIGHT

  const startSpinning = () => {
    if (bounceFallbackRef.current) {
      clearTimeout(bounceFallbackRef.current)
      bounceFallbackRef.current = null
    }

    setIsBouncing(false)
    setIsSpinning(true)
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      prefersReducedMotionRef.current = true

      return undefined
    }

    setIsBouncing(true)
    bounceFallbackRef.current = setTimeout(startSpinning, BALL_BOUNCE_FALLBACK_MS)

    return () => {
      if (bounceFallbackRef.current) {
        clearTimeout(bounceFallbackRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const ball = ballRef.current

    if (!ball || !isBouncing) {
      return undefined
    }

    const handleAnimationEnd = event => {
      if (event.target !== ball || event.animationName !== 'bounce') {
        return
      }

      startSpinning()
    }

    ball.addEventListener('animationend', handleAnimationEnd)

    return () => ball.removeEventListener('animationend', handleAnimationEnd)
  }, [isBouncing])

  useEffect(() => {
    const ball = ballRef.current

    if (!ball || !isSpinning) {
      return undefined
    }

    const stopSpinning = () => {
      setIsSpinning(false)
      setSettledRotation(BALL_SPIN_DEG)
    }

    const shineStartId = setTimeout(() => {
      if (!prefersReducedMotionRef.current) {
        setIsWordmarkShining(true)
      }
    }, Math.max(0, BALL_SPIN_DURATION_MS - BALL_SPIN_SHINE_LEAD_MS))

    const handleAnimationEnd = event => {
      if (event.target !== ball || event.animationName !== 'logoBallSpin') {
        return
      }

      stopSpinning()
    }

    const fallbackTimeoutId = setTimeout(stopSpinning, BALL_SPIN_DURATION_MS)

    ball.addEventListener('animationend', handleAnimationEnd)

    return () => {
      clearTimeout(shineStartId)
      clearTimeout(fallbackTimeoutId)
      ball.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [isSpinning])

  useEffect(() => {
    if (!isWordmarkShining) {
      return undefined
    }

    const shineTimeoutId = setTimeout(() => setIsWordmarkShining(false), WORDMARK_SHINE_MS)

    return () => clearTimeout(shineTimeoutId)
  }, [isWordmarkShining])

  useEffect(() => {
    if (layout !== 'collapsed') {
      return
    }

    if (logoTextRef?.current) {
      if (!isBreakpointReached && layout === 'collapsed' && !isHovered) {
        logoTextRef.current.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
  }, [isHovered, layout, isBreakpointReached])

  return (
    <div
      className='flex items-center'
      style={{ minBlockSize: logoSize.minBlock }}
    >
      <LogoBall
        ref={ballRef}
        src='/images/logos/logoball.png'
        alt={themeConfig.templateName}
        $settledRotation={settledRotation}
        className={classnames('block shrink-0 object-contain', {
          'animate__animated animate__bounce animate__faster': isBouncing,
          'is-spinning': isSpinning
        })}
        style={{ width: logoSize.ball, height: logoSize.ball }}
      />
      <LogoWordmark
        ref={logoTextRef}
        $fontSize={logoSize.fontSize}
        isHovered={isHovered}
        isCollapsed={layout === 'collapsed'}
        transitionDuration={transitionDuration}
        isBreakpointReached={isBreakpointReached}
      >
        <LogoWordBase
          color={brandBaseColor}
          $isLight={!isDarkMode}
          $shineHighlight={shineHighlight}
          $isShining={isWordmarkShining}
        >
          {BRAND_BASE}
        </LogoWordBase>
        <LogoWordAccent
          $accentColor={settings.primaryColor}
          $shineHighlight={shineHighlight}
          $isShining={isWordmarkShining}
        >
          {BRAND_ACCENT}
        </LogoWordAccent>
      </LogoWordmark>
    </div>
  )
}

export default Logo
