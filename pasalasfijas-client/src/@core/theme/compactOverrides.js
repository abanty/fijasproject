const compactOverrides = () => ({
  MuiButton: {
    defaultProps: {
      size: 'small'
    },
    styleOverrides: {
      root: {
        minHeight: 32,
        paddingInline: 12
      }
    }
  },
  MuiIconButton: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiTextField: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiFormControl: {
    defaultProps: {
      margin: 'dense'
    }
  },
  MuiListItem: {
    defaultProps: {
      dense: true
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        height: 24,
        fontSize: '0.75rem',
        '&.match-of-day-badge-chip': {
          height: 24,
          fontSize: '0.8125rem',
          '& .MuiChip-avatar, & .MuiChip-icon': {
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 16,
            width: 16,
            marginInlineStart: '0.5rem',
            marginInlineEnd: '-0.125rem',
            fontSize: '13px',
            '& i, & svg': {
              fontSize: '13px',
              lineHeight: 1
            }
          },
          '& .MuiChip-label': {
            paddingInline: '12px'
          }
        }
      }
    }
  },
  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(4),
        '& + .MuiCardContent-root, & + .MuiCardActions-root': {
          paddingBlockStart: 0
        }
      }),
      title: {
        fontSize: '0.875rem',
        lineHeight: 1.43
      },
      subheader: ({ theme }) => ({
        ...theme.typography.caption
      })
    }
  },
  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(4),
        '&:last-child': {
          paddingBlockEnd: theme.spacing(4)
        }
      })
    }
  },
  MuiCardActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(4)
      })
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        padding: theme.spacing(2, 3)
      })
    }
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2, 3),
        fontSize: theme.typography.body2.fontSize
      }),
      message: {
        fontSize: '0.8125rem'
      }
    }
  }
})

export default compactOverrides
