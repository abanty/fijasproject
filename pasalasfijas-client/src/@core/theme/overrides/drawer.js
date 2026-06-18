const drawer = skin => ({
  MuiDrawer: {
    defaultProps: {
      ...(skin === 'bordered' && {
        slotProps: {
          paper: {
            elevation: 0
          }
        }
      })
    },
    styleOverrides: {
      paper: {
        ...(skin !== 'bordered' && {
          boxShadow: 'var(--mui-customShadows-lg)'
        })
      }
    }
  }
})

export default drawer
