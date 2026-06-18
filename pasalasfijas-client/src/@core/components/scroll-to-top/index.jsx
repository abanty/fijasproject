'use client'

// MUI Imports
import Zoom from '@mui/material/Zoom'
import { styled } from '@mui/material/styles'

// Component Imports
import { getAppScrollElement, useAppScrollTrigger } from '@components/layout/shared/AppScrollRoot'

const ScrollToTopStyled = styled('div')(({ theme }) => ({
  zIndex: 'var(--mui-zIndex-fab)',
  position: 'fixed',
  insetInlineEnd: theme.spacing(10),
  insetBlockEnd: theme.spacing(14)
}))

const ScrollToTop = props => {
  // Props
  const { children, className } = props

  const trigger = useAppScrollTrigger({ threshold: 400, disableHysteresis: true })

  const handleClick = () => {
    getAppScrollElement()?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Zoom in={trigger}>
      <ScrollToTopStyled className={className} onClick={handleClick} role='presentation'>
        {children}
      </ScrollToTopStyled>
    </Zoom>
  )
}

export default ScrollToTop
