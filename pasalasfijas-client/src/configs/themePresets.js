const themePresets = [
  {
    id: 'default',
    label: 'Clásico',
    subtitle: 'Estilo Materio original',
    icon: 'ri-palette-line',
    primaryColor: null,
    forceMode: null,
    preview: {
      from: '#8C57FF',
      via: '#28243D',
      to: '#1A1625'
    }
  },
  {
    id: 'world-cup',
    label: 'Mundial',
    subtitle: 'Flashscore · navy oscuro + rojo activo',
    icon: 'ri-football-line',
    primaryColor: '#E02020',
    forceMode: null,
    surfaceDefaults: {
      body: '#0B161C',
      paper: '#15232D',
      sidebar: '#121E26',
      cardBorder: '#1E2D38'
    },
    preview: {
      from: '#E02020',
      via: '#15232D',
      to: '#0B161C'
    },
    mainColorChannels: {
      light: '11 22 28',
      dark: '255 255 255',
      lightShadow: '7 14 18',
      darkShadow: '5 10 13'
    },
    palette: {
      dark: {
        primary: {
          main: '#E02020',
          light: '#FF4444',
          dark: '#B81818',
          contrastText: '#FFFFFF'
        },
        secondary: {
          main: '#8F98A1',
          light: '#B0B8C0',
          dark: '#6B737C',
          contrastText: '#FFFFFF'
        },
        error: {
          main: '#E02020',
          light: '#FF4444',
          dark: '#B81818',
          contrastText: '#FFFFFF'
        },
        warning: {
          main: '#F5B731',
          light: '#FFD054',
          dark: '#D49A1A',
          contrastText: '#0B161C'
        },
        info: {
          main: '#1A73E8',
          light: '#4A90D9',
          dark: '#1557B0',
          contrastText: '#FFFFFF'
        },
        success: {
          main: '#59B203',
          light: '#7BC929',
          dark: '#459009',
          contrastText: '#FFFFFF'
        },
        text: {
          primary: 'rgb(255 255 255 / 0.96)',
          secondary: 'rgb(143 152 161 / 0.95)',
          disabled: 'rgb(143 152 161 / 0.45)',
          primaryChannel: '255 255 255',
          secondaryChannel: '143 152 161'
        },
        divider: '#1E2D38',
        dividerChannel: '30 45 56',
        background: {
          default: '#0B161C',
          paper: '#15232D'
        },
        action: {
          active: 'rgb(224 32 32 / 0.9)',
          hover: 'rgb(255 255 255 / 0.04)',
          selected: 'rgb(224 32 32 / 0.14)',
          disabled: 'rgb(143 152 161 / 0.35)',
          disabledBackground: 'rgb(255 255 255 / 0.05)',
          focus: 'rgb(224 32 32 / 0.18)',
          focusOpacity: 0.18,
          activeChannel: '224 32 32',
          selectedChannel: '224 32 32'
        },
        Avatar: {
          defaultBg: '#1E2D38'
        },
        Chip: {
          defaultBorder: '#243442'
        },
        FilledInput: {
          bg: 'rgb(255 255 255 / 0.04)',
          hoverBg: 'rgb(255 255 255 / 0.06)',
          disabledBg: 'rgb(255 255 255 / 0.03)'
        },
        SnackbarContent: {
          bg: '#E02020',
          color: '#FFFFFF'
        },
        Tooltip: {
          bg: '#1E2D38'
        },
        TableCell: {
          border: '#1E2D38'
        },
        customColors: {
          bodyBg: '#0B161C',
          chatBg: '#0F1D27',
          greyLightBg: '#111F28',
          inputBorder: '#243442',
          tableHeaderBg: '#111F28',
          tooltipText: '#FFFFFF',
          trackBg: '#1A2832'
        }
      }
    }
  }
]

export const getThemePreset = id => themePresets.find(preset => preset.id === id) ?? themePresets[0]

export default themePresets
