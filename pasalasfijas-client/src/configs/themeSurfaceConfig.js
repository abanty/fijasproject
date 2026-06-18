export const themeSurfaceGroups = [
  { id: 'light', label: 'Neutros claros' },
  { id: 'mui', label: 'Material UI' },
  { id: 'dark', label: 'Neutros oscuros' }
]

export const themeSurfaceSwatches = [
  { name: 'auto', label: 'Auto', color: null, group: null },
  { name: 'transparent', label: 'Transparente', color: 'transparent', group: null },
  { name: 'white', label: 'Blanco', color: '#FFFFFF', group: 'light' },
  { name: 'grey-50', label: 'Grey 50', color: '#FAFAFA', group: 'light' },
  { name: 'grey-100', label: 'Grey 100', color: '#F5F5F5', group: 'light' },
  { name: 'grey-200', label: 'Grey 200', color: '#EEEEEE', group: 'light' },
  { name: 'blue-grey-50', label: 'Blue grey 50', color: '#ECEFF1', group: 'light' },
  { name: 'blue-grey-100', label: 'Blue grey 100', color: '#CFD8DC', group: 'light' },
  { name: 'primary', label: 'Primary', color: '#8C57FF', group: 'mui' },
  { name: 'secondary', label: 'Secondary', color: '#8A8D93', group: 'mui' },
  { name: 'error', label: 'Error', color: '#FF4C51', group: 'mui' },
  { name: 'warning', label: 'Warning', color: '#FFB400', group: 'mui' },
  { name: 'info', label: 'Info', color: '#16B1FF', group: 'mui' },
  { name: 'success', label: 'Success', color: '#56CA00', group: 'mui' },
  { name: 'grey-700', label: 'Grey 700', color: '#616161', group: 'dark' },
  { name: 'grey-800', label: 'Grey 800', color: '#424242', group: 'dark' },
  { name: 'grey-900', label: 'Grey 900', color: '#212121', group: 'dark' },
  { name: 'blue-grey-800', label: 'Blue grey 800', color: '#37474F', group: 'dark' },
  { name: 'blue-grey-900', label: 'Blue grey 900', color: '#263238', group: 'dark' },
  { name: 'navy', label: 'Navy', color: '#0B161C', group: 'dark' },
  { name: 'card', label: 'Card', color: '#15232D', group: 'dark' },
  { name: 'charcoal', label: 'Carbón', color: '#141414', group: 'dark' }
]

export const themeSurfaceFields = [
  {
    field: 'primaryColor',
    label: 'Color primario',
    description: 'Acento de botones, pestañas activas e ítems seleccionados del menú.',
    kind: 'primary'
  },
  {
    field: 'headerBgColor',
    label: 'Header',
    description: 'Barra superior con pestañas. Color o imagen de fondo.',
    kind: 'header'
  },
  {
    field: 'themeBodyBg',
    label: 'Fondo de la app',
    description: 'Color o imagen de fondo general de la interfaz.'
  },
  {
    field: 'themePaperBg',
    label: 'Cards y paneles',
    description: 'Superficie de tarjetas, modales y paneles.'
  },
  {
    field: 'themeSidebarBg',
    label: 'Sidebar',
    description: 'Menú lateral fijo. Color, gradiente o imagen de fondo.'
  },
  {
    field: 'themeCardBorder',
    label: 'Borde de cards',
    description: 'Línea divisoria de tarjetas y paneles.'
  }
]

export const findThemeSurfaceSwatch = value => {
  if (!value || value === 'default') return themeSurfaceSwatches[0]

  return (
    themeSurfaceSwatches.find(item => item.color?.toLowerCase() === value.toLowerCase()) ?? {
      name: 'custom',
      label: 'Personalizado',
      color: value,
      group: null
    }
  )
}

export const isCustomThemeSurfaceColor = value => {
  if (!value || value === 'default') return false

  return !themeSurfaceSwatches.some(item => item.color?.toLowerCase() === value.toLowerCase())
}

export const isTransparentSurface = value => value === 'transparent'

const CHECKERBOARD_BG =
  'repeating-conic-gradient(rgb(var(--mui-mainColorChannels-light) / 0.12) 0% 25%, transparent 0% 50%) 50% /'

export const getSurfacePreviewStyle = (paint, { checkerSize = '8px', fallback } = {}) => {
  const fallbackColor = fallback ?? 'var(--mui-palette-background-paper)'

  if (paint === 'transparent') {
    return {
      backgroundColor: 'transparent',
      backgroundImage: `${CHECKERBOARD_BG} ${checkerSize} ${checkerSize})`
    }
  }

  if (typeof paint === 'string' && paint.startsWith('linear-gradient')) {
    return {
      backgroundColor: 'transparent',
      backgroundImage: paint
    }
  }

  return {
    backgroundColor: paint ?? fallbackColor,
    backgroundImage: 'none'
  }
}

export const getSwatchPreviewStyle = item => {
  if (!item.color) {
    return {
      backgroundColor: 'var(--mui-palette-background-paper)',
      backgroundImage: 'none'
    }
  }

  if (isTransparentSurface(item.color)) {
    return getSurfacePreviewStyle('transparent')
  }

  return {
    backgroundColor: item.color,
    backgroundImage: 'none'
  }
}

export const isCustomHeaderBgColor = (value, headerSwatches) => {
  if (!value || value === 'default') return false

  return !headerSwatches.some(item => item.color?.toLowerCase() === value.toLowerCase())
}

export const isCustomPrimaryColor = (value, primarySwatches) => {
  if (!value) return false

  return !primarySwatches.some(item => item.main.toLowerCase() === value.toLowerCase())
}

export const findHeaderBgSwatch = (value, headerSwatches) => {
  if (!value || value === 'default') return headerSwatches[0]

  return (
    headerSwatches.find(item => item.color?.toLowerCase() === value.toLowerCase()) ?? {
      name: 'custom',
      label: 'Personalizado',
      color: value,
      group: null
    }
  )
}

export default themeSurfaceSwatches
