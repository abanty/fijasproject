'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// Third-party Imports
import { useDebounce } from 'react-use'
import { HexColorPicker, HexColorInput } from 'react-colorful'

// Component Imports
import EyeDropperIcon from '@core/svg/EyeDropper'

// Util Imports
import { isEyeDropperSupported, pickScreenColor } from '@/lib/theme/eyeDropper'

const CustomColorPickerPanel = ({ color, onChange, inputClassName, debounceMs = 200 }) => {
  const [localColor, setLocalColor] = useState(color)

  useEffect(() => {
    setLocalColor(color)
  }, [color])

  useDebounce(() => onChange(localColor), debounceMs, [localColor])

  const handleEyedropper = async () => {
    try {
      const picked = await pickScreenColor()

      if (picked) {
        setLocalColor(picked)
        onChange(picked)
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        window.alert('No se pudo usar el cuentagotas en este navegador.')
      }
    }
  }

  return (
    <>
      <HexColorPicker color={localColor} onChange={setLocalColor} />
      <div className='flex items-center gap-2 mbs-4'>
        <HexColorInput
          className={inputClassName}
          color={localColor}
          onChange={setLocalColor}
          prefixed
          placeholder='Color hex'
        />
        {isEyeDropperSupported() ? (
          <Tooltip title='Cuentagotas: elige un color en pantalla'>
            <IconButton
              size='small'
              aria-label='Cuentagotas'
              onClick={handleEyedropper}
              className='shrink-0 border border-divider'
            >
              <EyeDropperIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </>
  )
}

export default CustomColorPickerPanel
