const tooltip = {
  MuiTooltip: {
    styleOverrides: {
      popper: {
        '&[data-popper-placement*="bottom"] .MuiTooltip-tooltip': {
          marginTop: '6px !important'
        },
        '&[data-popper-placement*="top"] .MuiTooltip-tooltip': {
          marginBottom: '6px !important'
        },
        '&[data-popper-placement*="left"] .MuiTooltip-tooltip': {
          marginRight: '6px !important'
        },
        '&[data-popper-placement*="right"] .MuiTooltip-tooltip': {
          marginLeft: '6px !important'
        },
        '& .MuiTooltip-arrow': {
          color: 'var(--mui-palette-Tooltip-bg)'
        }
      },
      tooltip: ({ theme }) => ({
        borderRadius: 'var(--mui-shape-customBorderRadius-sm)',
        fontSize: theme.typography.caption.fontSize,
        lineHeight: 1.5,
        maxWidth: 280,
        backgroundColor: 'var(--mui-palette-Tooltip-bg)',
        color: 'var(--mui-palette-customColors-tooltipText)',
        paddingInline: theme.spacing(2.5),
        paddingBlock: theme.spacing(1.5)
      })
    }
  }
}

export default tooltip
