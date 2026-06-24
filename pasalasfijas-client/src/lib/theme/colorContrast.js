export const parseCssColor = color => {
  if (!color) return null

  const value = String(color).trim()

  if (value.startsWith('#')) {
    let hex = value.slice(1)

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(char => char + char)
        .join('')
    }

    if (hex.length === 6) {
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16)
      }
    }
  }

  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i)

  if (rgbMatch) {
    const parts = rgbMatch[1].split(/[\s,/]+/).filter(Boolean)

    return {
      r: Number(parts[0]),
      g: Number(parts[1]),
      b: Number(parts[2])
    }
  }

  return null
}

export const getRelativeLuminance = color => {
  const rgb = parseCssColor(color)

  if (!rgb) return 0

  const channels = [rgb.r, rgb.g, rgb.b].map(channel => {
    const normalized = channel / 255

    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

export const isLightBackground = color => getRelativeLuminance(color) > 0.55

export const getContrastText = (backgroundColor, { light = 'rgba(15, 23, 42, 0.95)', dark = '#FFFFFF' } = {}) =>
  isLightBackground(backgroundColor) ? light : dark

export const getSurfaceContrastTokens = backgroundColor => {
  if (!backgroundColor || backgroundColor === 'transparent') return null

  if (isLightBackground(backgroundColor)) {
    return {
      fg: 'rgba(15, 23, 42, 0.95)',
      fgMuted: 'rgba(15, 23, 42, 0.68)',
      hoverBg: 'rgba(15, 23, 42, 0.06)',
      border: 'rgba(15, 23, 42, 0.12)',
      inputBg: 'rgba(15, 23, 42, 0.04)'
    }
  }

  return {
    fg: 'rgba(255, 255, 255, 0.95)',
    fgMuted: 'rgba(255, 255, 255, 0.72)',
    hoverBg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.12)',
    inputBg: 'rgba(255, 255, 255, 0.06)'
  }
}

export const hexToRgbChannels = color => {
  const rgb = parseCssColor(color)

  if (!rgb) return null

  return `${rgb.r} ${rgb.g} ${rgb.b}`
}

/** Tono del drawer customizer: ligeramente más oscuro que paper (se distingue del header). */
export const liftSurfaceTone = (color, mode = 'dark') => {
  if (!color || color === 'transparent') return null

  if (mode === 'dark') {
    return `color-mix(in srgb, ${color} 82%, black 18%)`
  }

  return `color-mix(in srgb, ${color} 90%, black 10%)`
}
