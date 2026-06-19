const cardPadding = {
  paddingInline: 'var(--card-padding-inline)',
  paddingBlock: 'var(--card-padding-block)'
}

const card = skin => {
  return {
    MuiCard: {
      defaultProps: {
        ...(skin === 'bordered' && {
          variant: 'outlined'
        })
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant !== 'outlined' && {
            boxShadow: 'var(--mui-customShadows-md)'
          })
        })
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: () => ({
          ...cardPadding,
          '& + .MuiCardContent-root, & + .MuiCardActions-root': {
            paddingBlockStart: 0
          },
          '& + .MuiCollapse-root .MuiCardContent-root:first-child, & + .MuiCollapse-root .MuiCardActions-root:first-child':
            {
              paddingBlockStart: 0
            }
        }),
        subheader: ({ theme }) => ({
          ...theme.typography.subtitle1,
          color: 'rgb(var(--mui-palette-text-primaryChannel) / 0.55)'
        }),
        action: ({ theme }) => ({
          ...theme.typography.body1,
          color: 'var(--mui-palette-text-disabled)',
          marginBlock: 0,
          marginInlineEnd: 0,
          '& .MuiIconButton-root': {
            color: 'inherit'
          }
        })
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: () => ({
          ...cardPadding,
          color: 'var(--mui-palette-text-secondary)',
          '&:last-child': {
            paddingBlockEnd: 'var(--card-padding-block)'
          },
          '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
            paddingBlockStart: 0
          },
          '& + .MuiCollapse-root .MuiCardHeader-root:first-child, & + .MuiCollapse-root .MuiCardContent-root:first-child, & + .MuiCollapse-root .MuiCardActions-root:first-child':
            {
              paddingBlockStart: 0
            }
        })
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: () => ({
          ...cardPadding,
          '&:where(.card-actions-dense)': {
            padding: 'calc(var(--card-padding-block) * 0.5) calc(var(--card-padding-inline) * 0.625)',
            '& .MuiButton-text': {
              paddingInline: 'calc(var(--card-padding-inline) * 0.625)'
            }
          },
          '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
            paddingBlockStart: 0
          },
          '& + .MuiCollapse-root .MuiCardHeader-root:first-child, & + .MuiCollapse-root .MuiCardContent-root:first-child, & + .MuiCollapse-root .MuiCardActions-root:first-child':
            {
              paddingBlockStart: 0
            }
        })
      }
    }
  }
}

export default card
