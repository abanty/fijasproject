'use client'

// MUI Imports
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import {
  buildLinearGradient,
  getGradientAngleMeta,
  getNextGradientAngle
} from '@/lib/theme/gradientSurface'

const SurfaceGradientControls = ({
  enabled,
  gradient,
  solidColor,
  styles,
  onToggle,
  onAngleChange,
  onOpenEndColorPicker
}) => {
  const angle = gradient?.angle ?? 135
  const endColor = gradient?.to ?? solidColor
  const preview = enabled ? buildLinearGradient(solidColor, endColor, angle) : solidColor
  const angleMeta = getGradientAngleMeta(angle)

  return (
    <div className='flex flex-col gap-2 mbs-3 pt-3 border-t border-divider'>
      <FormControlLabel
        className='mie-0'
        control={<Switch size='small' checked={enabled} onChange={event => onToggle(event.target.checked)} />}
        label={
          <Typography variant='body2' color='text.secondary'>
            Gradiente
          </Typography>
        }
      />

      {enabled ? (
        <div className='flex items-center gap-2'>
          <div
            className='flex-1 bs-9 rounded-md border border-divider'
            style={{ background: preview ?? 'var(--mui-palette-action-selected)' }}
          />
          <Tooltip title={`Direccion: ${angleMeta.label}`}>
            <IconButton
              size='small'
              aria-label='Cambiar direccion del gradiente'
              onClick={() => onAngleChange(getNextGradientAngle(angle))}
              className='border border-divider'
            >
              <i className={classnames(angleMeta.icon, 'text-lg')} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Color final'>
            <button
              type='button'
              aria-label='Elegir color final del gradiente'
              className={classnames(styles.primaryColorWrapper, 'cursor-pointer p-0 border-0 bg-transparent')}
              onClick={onOpenEndColorPicker}
            >
              <span
                className={classnames(styles.primaryColor, 'block border border-divider')}
                style={{ backgroundColor: endColor }}
              />
            </button>
          </Tooltip>
        </div>
      ) : null}
    </div>
  )
}

export default SurfaceGradientControls
