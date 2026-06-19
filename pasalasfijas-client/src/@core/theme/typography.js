import { getCaptionSidebarTypography } from './typographyTokens'

const typography = (fontFamily, density = 'default') => {
  const isCompact = density === 'compact'

  return {
    fontFamily:
      typeof fontFamily === 'undefined' || fontFamily === ''
        ? 'var(--app-font-family, Roboto, sans-serif)'
        : fontFamily,
    fontSize: isCompact ? 12 : 13.125,
    h1: {
      fontSize: isCompact ? '2.5rem' : '2.875rem',
      fontWeight: 500,
      lineHeight: 1.478261
    },
    h2: {
      fontSize: isCompact ? '2rem' : '2.375rem',
      fontWeight: 500,
      lineHeight: 1.47368421
    },
    h3: {
      fontSize: isCompact ? '1.5rem' : '1.75rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    h4: {
      fontSize: isCompact ? '1.3125rem' : '1.5rem',
      fontWeight: 500,
      lineHeight: 1.58334
    },
    h5: {
      fontSize: isCompact ? '1rem' : '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5556
    },
    h6: {
      fontSize: isCompact ? '0.875rem' : '0.9375rem',
      fontWeight: 500,
      lineHeight: 1.46667
    },
    subtitle1: {
      fontSize: isCompact ? '0.875rem' : '0.9375rem',
      lineHeight: 1.46667
    },
    subtitle2: {
      fontSize: isCompact ? '0.8125rem' : '0.8125rem',
      fontWeight: 400,
      lineHeight: 1.53846154
    },
    body1: {
      fontSize: isCompact ? '0.875rem' : '0.9375rem',
      lineHeight: 1.46667
    },
    body2: {
      fontSize: isCompact ? '0.8125rem' : '0.8125rem',
      lineHeight: 1.53846154
    },
    button: {
      fontSize: isCompact ? '0.8125rem' : '0.9375rem',
      lineHeight: 1.46667,
      textTransform: 'none'
    },
    caption: {
      fontSize: isCompact ? '0.6875rem' : '0.8125rem',
      lineHeight: 1.38462,
      letterSpacing: '0.4px'
    },
    captionSidebar: getCaptionSidebarTypography(density),
    overline: {
      fontSize: isCompact ? '0.6875rem' : '0.75rem',
      lineHeight: 1.16667,
      letterSpacing: '0.8px'
    }
  }
}

export default typography
