const captionSidebarByDensity = {
  compact: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.05em',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  default: {
    fontSize: '0.875rem',
    lineHeight: 1.4,
    letterSpacing: '0.05em',
    fontWeight: 700,
    textTransform: 'uppercase'
  }
}

export const getCaptionSidebarTypography = (density = 'compact') =>
  captionSidebarByDensity[density === 'compact' ? 'compact' : 'default']

export const captionSidebarCssVarNames = {
  fontSize: '--typography-caption-sidebar-size',
  lineHeight: '--typography-caption-sidebar-line-height',
  letterSpacing: '--typography-caption-sidebar-letter-spacing',
  fontWeight: '--typography-caption-sidebar-font-weight'
}

export const applyCaptionSidebarCssVars = (cssVars, density = 'compact') => {
  const tokens = getCaptionSidebarTypography(density)

  cssVars[captionSidebarCssVarNames.fontSize] = tokens.fontSize
  cssVars[captionSidebarCssVarNames.lineHeight] = String(tokens.lineHeight)
  cssVars[captionSidebarCssVarNames.letterSpacing] = tokens.letterSpacing
  cssVars[captionSidebarCssVarNames.fontWeight] = String(tokens.fontWeight)
}
