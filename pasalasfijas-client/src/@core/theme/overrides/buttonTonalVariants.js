const tonalHover =
  '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))'

const buttonTonalVariants = [
  {
    props: { variant: 'tonal' },
    style: {
      border: 'none',
      boxShadow: 'none'
    }
  },
  {
    props: { variant: 'tonal', color: 'primary' },
    style: {
      backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
      color: 'var(--mui-palette-primary-main)',
      [tonalHover]: {
        backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
      },
      '&.Mui-disabled': {
        opacity: 0.45,
        color: 'var(--mui-palette-primary-main)',
        backgroundColor: 'var(--mui-palette-primary-lightOpacity)'
      }
    }
  },
  {
    props: { variant: 'tonal', color: 'secondary' },
    style: {
      backgroundColor: 'var(--mui-palette-secondary-lightOpacity)',
      color: 'var(--mui-palette-secondary-main)',
      [tonalHover]: {
        backgroundColor: 'var(--mui-palette-secondary-mainOpacity)'
      },
      '&.Mui-disabled': {
        opacity: 0.45,
        color: 'var(--mui-palette-secondary-main)',
        backgroundColor: 'var(--mui-palette-secondary-lightOpacity)'
      }
    }
  },
  {
    props: { variant: 'tonal', color: 'error' },
    style: {
      backgroundColor: 'var(--mui-palette-error-lightOpacity)',
      color: 'var(--mui-palette-error-main)',
      [tonalHover]: {
        backgroundColor: 'var(--mui-palette-error-mainOpacity)'
      },
      '&.Mui-disabled': {
        opacity: 0.45,
        color: 'var(--mui-palette-error-main)',
        backgroundColor: 'var(--mui-palette-error-lightOpacity)'
      }
    }
  },
  {
    props: { variant: 'tonal', color: 'warning' },
    style: {
      backgroundColor: 'var(--mui-palette-warning-lightOpacity)',
      color: 'var(--mui-palette-warning-main)',
      [tonalHover]: {
        backgroundColor: 'var(--mui-palette-warning-mainOpacity)'
      },
      '&.Mui-disabled': {
        opacity: 0.45,
        color: 'var(--mui-palette-warning-main)',
        backgroundColor: 'var(--mui-palette-warning-lightOpacity)'
      }
    }
  },
  {
    props: { variant: 'tonal', color: 'info' },
    style: {
      backgroundColor: 'var(--mui-palette-info-lightOpacity)',
      color: 'var(--mui-palette-info-main)',
      [tonalHover]: {
        backgroundColor: 'var(--mui-palette-info-mainOpacity)'
      },
      '&.Mui-disabled': {
        opacity: 0.45,
        color: 'var(--mui-palette-info-main)',
        backgroundColor: 'var(--mui-palette-info-lightOpacity)'
      }
    }
  },
  {
    props: { variant: 'tonal', color: 'success' },
    style: {
      backgroundColor: 'var(--mui-palette-success-lightOpacity)',
      color: 'var(--mui-palette-success-main)',
      [tonalHover]: {
        backgroundColor: 'var(--mui-palette-success-mainOpacity)'
      },
      '&.Mui-disabled': {
        opacity: 0.45,
        color: 'var(--mui-palette-success-main)',
        backgroundColor: 'var(--mui-palette-success-lightOpacity)'
      }
    }
  }
]

export default buttonTonalVariants
