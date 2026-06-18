'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

const HeaderSearch = ({ className }) => {
  const [query, setQuery] = useState('')

  return (
    <TextField
      size='small'
      className={className ? `header-search ${className}` : 'header-search'}
      placeholder='Buscar: Partidos, Predicciones, Ligas...'
      value={query}
      onChange={event => setQuery(event.target.value)}
      slotProps={{
        input: {
          'aria-label': 'Buscar',
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-search-line header-search-icon' />
            </InputAdornment>
          )
        }
      }}
    />
  )
}

export default HeaderSearch
