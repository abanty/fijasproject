import { getRelativeLuminance, isLightBackground, parseCssColor } from '@/lib/theme/colorContrast'

export const GRADIENT_ANGLES = [
  { value: 180, icon: 'ri-arrow-down-line', label: 'Vertical' },
  { value: 90, icon: 'ri-arrow-right-line', label: 'Horizontal' },
  { value: 135, icon: 'ri-arrow-right-down-line', label: 'Diagonal' }
]

export const DEFAULT_GRADIENT_ANGLE = 135

export const surfaceGradientFields = {
  themeBodyBg: 'themeBodyBgGradient',
  themePaperBg: 'themePaperBgGradient',
  themeSidebarBg: 'themeSidebarBgGradient',
  headerBgColor: 'headerBgGradient'
}

export const getSurfaceGradientField = field => surfaceGradientFields[field] ?? null

export const buildLinearGradient = (from, to, angle = DEFAULT_GRADIENT_ANGLE) => {
  if (!from || !to) return from || to || null

  return `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`
}

export const resolveSurfacePaint = (solidColor, gradientSetting) => {
  if (!solidColor) return null
  if (!gradientSetting?.to) return solidColor

  return buildLinearGradient(solidColor, gradientSetting.to, gradientSetting.angle ?? DEFAULT_GRADIENT_ANGLE)
}

export const resolveSurfaceLayers = (solidColor, gradientSetting) => {
  const gradientLayer =
    solidColor && gradientSetting?.to
      ? buildLinearGradient(solidColor, gradientSetting.to, gradientSetting.angle ?? DEFAULT_GRADIENT_ANGLE)
      : null

  return {
    solid: solidColor,
    paint: gradientLayer ?? solidColor,
    gradientLayer
  }
}

export const suggestGradientEndColor = fromColor => {
  const rgb = parseCssColor(fromColor)

  if (!rgb) return '#6B3FD4'

  const shift = isLightBackground(fromColor) ? -36 : 36

  const channel = value => Math.max(0, Math.min(255, value + shift)).toString(16).padStart(2, '0')

  return `#${channel(rgb.r)}${channel(rgb.g)}${channel(rgb.b)}`
}

export const getNextGradientAngle = currentAngle => {
  const angles = GRADIENT_ANGLES.map(item => item.value)
  const index = angles.indexOf(currentAngle ?? DEFAULT_GRADIENT_ANGLE)

  return angles[(index + 1) % angles.length]
}

export const getGradientAngleMeta = angle =>
  GRADIENT_ANGLES.find(item => item.value === (angle ?? DEFAULT_GRADIENT_ANGLE)) ?? GRADIENT_ANGLES[2]

export const getContrastColorFromPaint = paint => {
  if (!paint) return null

  if (String(paint).startsWith('linear-gradient')) {
    const match = paint.match(/linear-gradient\([^,]+,\s*(#[0-9a-f]{3,8}|rgba?\([^)]+\))/i)

    return match?.[1] ?? null
  }

  return paint
}

export const getAverageContrastColor = (from, to) => {
  const fromRgb = parseCssColor(from)
  const toRgb = parseCssColor(to)

  if (!fromRgb || !toRgb) return from || to

  const mix = channel =>
    Math.round((fromRgb[channel] + toRgb[channel]) / 2)

  return `rgb(${mix('r')} ${mix('g')} ${mix('b')})`
}

export const getContrastColorForGradient = (from, to) => {
  const fromLum = getRelativeLuminance(from)
  const toLum = getRelativeLuminance(to)

  return fromLum <= toLum ? from : to
}
