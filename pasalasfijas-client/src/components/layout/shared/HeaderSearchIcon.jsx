'use client'

import IconButton from '@mui/material/IconButton'

const HeaderSearchIcon = ({ className }) => (
  <IconButton
    type='button'
    aria-label='Buscar'
    className={className ? `header-search-icon-btn ${className}` : 'header-search-icon-btn'}
    size='medium'
  >
    <i className='ri-search-line text-xl' />
  </IconButton>
)

export default HeaderSearchIcon
