'use client'

import Typography from '@mui/material/Typography'

import HelpInfoTooltip from '@components/shared/HelpInfoTooltip'

const SectionHeading = ({ title, help, variant = 'h5', action = null, className = '' }) => (
  <div className={`section-heading flex flex-wrap items-center justify-between gap-2 ${className}`}>
    <div className='flex min-is-0 items-center gap-1'>
      <Typography variant={variant} component='h2'>
        {title}
      </Typography>
      {help ? <HelpInfoTooltip title={help} placement='top' /> : null}
    </div>
    {action}
  </div>
)

export default SectionHeading
