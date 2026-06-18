'use client'

// MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

const HelpInfoTooltip = ({
  title,
  placement = 'top',
  iconClassName = 'ri-information-line',
  className = 'text-textSecondary'
}) => {
  if (!title) return null

  const stopToggle = event => {
    event.stopPropagation()
  }

  return (
    <Tooltip
      title={title}
      arrow
      placement={placement}
      slotProps={{
        tooltip: {
          sx: {
            maxWidth: 280,
            textAlign: 'left'
          }
        }
      }}
    >
      <Box
        component='span'
        role='button'
        tabIndex={0}
        aria-label='Mas informacion'
        className={`inline-flex items-center justify-center cursor-help p-0.5 ${className}`}
        onClick={stopToggle}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            stopToggle(event)
          }
        }}
      >
        <i className={`${iconClassName} text-base leading-none`} aria-hidden='true' />
      </Box>
    </Tooltip>
  )
}

export default HelpInfoTooltip
