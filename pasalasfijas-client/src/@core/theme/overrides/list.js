const list = {
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: theme.spacing(4)
      }),
      padding: ({ theme, ownerState }) => ({
        ...(!ownerState.dense && {
          paddingBlock: theme.spacing(2),
          paddingInlineStart: theme.spacing(5)
        })
      })
    }
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: {
        minWidth: 'unset'
      }
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
        color: 'var(--mui-palette-text-primary)',
        fontSize: '1.375rem',
        '& > svg, & > i': {
          fontSize: 'inherit'
        },
        '.sidebar-nav-item &': {
          minWidth: '2.25rem',
          color: 'inherit',
          fontSize: 'inherit'
        }
      }
    }
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        gap: theme.spacing(4),
        ...(!ownerState.dense && {
          paddingBlock: theme.spacing(2)
        }),
        '&:not(.sidebar-nav-item)': {
          paddingInlineStart: theme.spacing(5),
          '&.Mui-selected': {
            backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
            '&:hover, &.Mui-focused, &.Mui-focusVisible': {
              backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
            },
            '& .MuiTypography-root': {
              color: 'var(--mui-palette-primary-main)'
            },
            '& + .MuiListItemSecondaryAction-root .MuiIconButton-root': {
              color: 'var(--mui-palette-primary-main)'
            }
          }
        },
        '&.sidebar-nav-item': {
          gap: theme.spacing(2),
          paddingBlock: theme.spacing(1.25),
          paddingInlineStart: theme.spacing(2),
          paddingInlineEnd: theme.spacing(2.5)
        }
      })
    }
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        margin: 0,
        '.sidebar-nav-item &': {
          '& .MuiTypography-root': {
            color: 'inherit'
          }
        }
      },
      primary: {
        color: 'var(--mui-palette-text-primary)'
      }
    }
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.subtitle2,
        paddingBlock: 10,
        paddingInline: theme.spacing(5)
      })
    }
  }
}

export default list
