const compactOverrides = () => ({
  MuiButton: {
    defaultProps: {
      size: 'small'
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
  MuiCardHeader: {
    styleOverrides: {
      root: {
        '& + .MuiCardContent-root, & + .MuiCardActions-root': {
          paddingBlockStart: 0
        }
      },
      title: {
        fontSize: '0.875rem',
        lineHeight: 1.43
      },
      subheader: ({ theme }) => ({
        ...theme.typography.caption
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
