'use client'

// React Imports
import { useCallback, useEffect, useRef, useState } from 'react'

// MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import ClickAwayListener from '@mui/material/ClickAwayListener'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomColorPickerPanel from '@core/components/customizer/CustomColorPickerPanel'
import SurfaceGradientControls from '@core/components/customizer/SurfaceGradientControls'
import HelpInfoTooltip from '@components/shared/HelpInfoTooltip'

// Config Imports
import headerBackgroundConfig from '@configs/headerBackgroundConfig'
import { getDefaultThemeImagesForMode } from '@configs/modeThemeDefaults'
import primaryColorConfig from '@configs/primaryColorConfig'
import {
  findHeaderBgSwatch,
  findThemeSurfaceSwatch,
  isCustomHeaderBgColor,
  isCustomPrimaryColor,
  isCustomThemeSurfaceColor,
  themeSurfaceFields,
  themeSurfaceGroups,
  themeSurfaceSwatches,
  isTransparentSurface,
  getSurfacePreviewStyle,
  getSwatchPreviewStyle
} from '@configs/themeSurfaceConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import {
  BODY_BG_IMAGE_CHANGED,
  clearBodyBackgroundImage,
  getBodyBackgroundImage,
  setBodyBackgroundImage
} from '@core/utils/bodyBackgroundStorage'
import {
  HEADER_BG_IMAGE_CHANGED,
  clearHeaderBackgroundImage,
  getHeaderBackgroundImage,
  setHeaderBackgroundImage
} from '@core/utils/headerBackgroundStorage'
import {
  SIDEBAR_BG_IMAGE_CHANGED,
  clearSidebarBackgroundImage,
  getSidebarBackgroundImage,
  setSidebarBackgroundImage
} from '@core/utils/sidebarBackgroundStorage'
import { resolveThemeSurface } from '@/lib/theme/resolveThemeSurface'
import {
  DEFAULT_GRADIENT_ANGLE,
  getSurfaceGradientField,
  resolveSurfacePaint,
  suggestGradientEndColor
} from '@/lib/theme/gradientSurface'
import { shouldUseHelpTooltip } from '@/lib/ui/helpText'

const SURFACES_SECTION_HELP =
  'Color primario, header, app, cards y sidebar. Expande cada opción para presets o color personalizado.'

const IMAGE_CONTROLS_HELP =
  'Se combina con el color elegido. Se guarda en localStorage (máx. 3 MB).'

const surfaceKeyMap = {
  themeBodyBg: 'body',
  themePaperBg: 'paper',
  themeSidebarBg: 'sidebar',
  themeCardBorder: 'cardBorder'
}

const DebouncedSurfaceColorPicker = ({ color, onChange, inputClassName }) => (
  <CustomColorPickerPanel color={color} onChange={onChange} inputClassName={inputClassName} />
)

const ThemeSurfaceSection = ({ settings, onChange, styles }) => {
  const { updateSettings } = useSettings()
  const [pickerField, setPickerField] = useState(null)
  const pickerAnchorRef = useRef(null)

  const [imageUrls, setImageUrls] = useState({
    body: null,
    header: null,
    sidebar: null
  })

  const syncImageUrls = useCallback(() => {
    const effectiveMode = settings.mode === 'dark' ? 'dark' : 'light'
    const defaultImages = getDefaultThemeImagesForMode(effectiveMode)
    const storedBody = getBodyBackgroundImage()
    const storedHeader = getHeaderBackgroundImage()
    const storedSidebar = getSidebarBackgroundImage()

    setImageUrls({
      body: storedBody ?? (settings.themeBodyBgImageEnabled ? defaultImages.body : null),
      header: storedHeader ?? (settings.headerBgImageEnabled ? defaultImages.header : null),
      sidebar: storedSidebar ?? (settings.themeSidebarBgImageEnabled ? defaultImages.sidebar : null)
    })
  }, [
    settings.mode,
    settings.themeBodyBgImageEnabled,
    settings.headerBgImageEnabled,
    settings.themeSidebarBgImageEnabled
  ])

  useEffect(() => {
    syncImageUrls()

    window.addEventListener(BODY_BG_IMAGE_CHANGED, syncImageUrls)
    window.addEventListener(HEADER_BG_IMAGE_CHANGED, syncImageUrls)
    window.addEventListener(SIDEBAR_BG_IMAGE_CHANGED, syncImageUrls)

    return () => {
      window.removeEventListener(BODY_BG_IMAGE_CHANGED, syncImageUrls)
      window.removeEventListener(HEADER_BG_IMAGE_CHANGED, syncImageUrls)
      window.removeEventListener(SIDEBAR_BG_IMAGE_CHANGED, syncImageUrls)
    }
  }, [syncImageUrls])

  const hasBodyImage = settings.themeBodyBgImageEnabled && imageUrls.body
  const hasHeaderImage = settings.headerBgImageEnabled && imageUrls.header
  const hasSidebarImage = settings.themeSidebarBgImageEnabled && imageUrls.sidebar

  const closePicker = () => setPickerField(null)

  const openPicker = (field, event) => {
    pickerAnchorRef.current = event.currentTarget
    setPickerField(field)
  }

  const getGradientSetting = field => {
    const gradientField = getSurfaceGradientField(field)

    return gradientField ? settings[gradientField] : null
  }

  const handleGradientToggle = (field, kind, enabled) => {
    const gradientField = getSurfaceGradientField(field)

    if (!gradientField) return

    if (!enabled) {
      updateSettings({ [gradientField]: null })

      return
    }

    const solidColor = getFieldPreviewColor(field, kind) || '#8C57FF'

    updateSettings({
      [gradientField]: {
        to: suggestGradientEndColor(solidColor),
        angle: DEFAULT_GRADIENT_ANGLE
      }
    })
  }

  const handleGradientAngleChange = (field, angle) => {
    const gradientField = getSurfaceGradientField(field)
    const gradient = settings[gradientField]

    if (!gradientField || !gradient) return

    updateSettings({
      [gradientField]: {
        ...gradient,
        angle
      }
    })
  }

  const renderGradientControls = (field, kind) => {
    const gradientField = getSurfaceGradientField(field)

    if (!gradientField) return null

    const solidColor = getFieldPreviewColor(field, kind)
    const gradient = settings[gradientField]

    if (!solidColor) {
      return (
        <Typography variant='caption' color='text.secondary' className='mbs-3 pt-3 border-t border-divider'>
          Elige un color base antes de activar gradiente.
        </Typography>
      )
    }

    return (
      <SurfaceGradientControls
        enabled={Boolean(gradient?.to)}
        gradient={gradient}
        solidColor={solidColor}
        styles={styles}
        onToggle={enabled => handleGradientToggle(field, kind, enabled)}
        onAngleChange={angle => handleGradientAngleChange(field, angle)}
        onOpenEndColorPicker={event => openPicker(`${field}::gradientTo`, event)}
      />
    )
  }

  const handleBodyImageUpload = event => {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 3 * 1024 * 1024) {
      window.alert('La imagen debe pesar menos de 3 MB.')

      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBodyBackgroundImage(reader.result)
        updateSettings({ themeBodyBgImageEnabled: true })
      }
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleBodyImageClear = () => {
    clearBodyBackgroundImage()
    updateSettings({ themeBodyBgImageEnabled: false })
  }

  const handleHeaderImageClear = () => {
    clearHeaderBackgroundImage()
    updateSettings({ headerBgImageEnabled: false })
  }

  const handleHeaderImageUpload = event => {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 3 * 1024 * 1024) {
      window.alert('La imagen debe pesar menos de 3 MB.')

      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setHeaderBackgroundImage(reader.result)
        updateSettings({ headerBgImageEnabled: true })
      }
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleSidebarImageUpload = event => {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 3 * 1024 * 1024) {
      window.alert('La imagen debe pesar menos de 3 MB.')

      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSidebarBackgroundImage(reader.result)
        updateSettings({ themeSidebarBgImageEnabled: true })
      }
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleSidebarImageClear = () => {
    clearSidebarBackgroundImage()
    updateSettings({ themeSidebarBgImageEnabled: false })
  }

  const renderImageControls = ({ label, hasImage, onUpload, onClear, previewUrl }) => (
    <div className='flex flex-col gap-2 mbs-4 pt-4 border-t border-divider'>
      <div className='flex items-center gap-0.5'>
        <Typography variant='caption' className='uppercase tracking-wide text-textSecondary'>
          {label}
        </Typography>
        {shouldUseHelpTooltip(IMAGE_CONTROLS_HELP) ? <HelpInfoTooltip title={IMAGE_CONTROLS_HELP} /> : null}
      </div>
      {!shouldUseHelpTooltip(IMAGE_CONTROLS_HELP) ? (
        <Typography variant='body2' color='text.secondary'>
          {IMAGE_CONTROLS_HELP}
        </Typography>
      ) : null}
      <div className='flex flex-wrap items-center gap-2'>
        <Button component='label' size='small' variant='outlined'>
          Subir imagen
          <input hidden type='file' accept='image/*' onChange={onUpload} />
        </Button>
        {hasImage ? (
          <Button size='small' color='error' variant='tonal' onClick={onClear}>
            Quitar
          </Button>
        ) : null}
      </div>
      {hasImage ? (
        <div
          className='rounded-md border border-divider bs-16 is-full bg-cover bg-center'
          style={{ backgroundImage: `url("${previewUrl}")` }}
        />
      ) : null}
    </div>
  )

  const renderSwatch = (field, item) => {
    const value = item.color ?? 'default'
    const isActive = settings[field] === value
    const isTransparent = isTransparentSurface(item.color)

    return (
      <div
        key={`${field}-${item.name}`}
        className={classnames(styles.primaryColorWrapper, {
          [styles.active]: isActive
        })}
        onClick={() => onChange(field, item.color)}
        title={item.label}
      >
        <div
          className={classnames(styles.primaryColor, 'flex items-center justify-center text-xs font-medium')}
          style={{
            ...getSwatchPreviewStyle(item),
            color: item.color && !isTransparent ? '#fff' : 'var(--mui-palette-text-secondary)',
            border: !item.color || isTransparent ? '1px dashed var(--border-color)' : undefined
          }}
        >
          {!item.color ? 'Auto' : null}
          {isTransparent ? '∅' : null}
        </div>
      </div>
    )
  }

  const renderPrimarySwatchGroups = field => (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-center gap-2'>
        {primaryColorConfig.map(item => (
          <div
            key={item.main}
            className={classnames(styles.primaryColorWrapper, {
              [styles.active]: settings.primaryColor === item.main
            })}
            onClick={() => onChange(field, item.main)}
            title={item.main}
          >
            <div className={styles.primaryColor} style={{ backgroundColor: item.main }} />
          </div>
        ))}
        <div
          className={classnames(styles.primaryColorWrapper, {
            [styles.active]: isCustomPrimaryColor(settings.primaryColor, primaryColorConfig)
          })}
          onClick={event => openPicker(field, event)}
        >
          <div
            className={classnames(styles.primaryColor, 'flex items-center justify-center')}
            style={{
              backgroundColor: isCustomPrimaryColor(settings.primaryColor, primaryColorConfig)
                ? settings.primaryColor
                : 'var(--mui-palette-action-selected)',
              color: isCustomPrimaryColor(settings.primaryColor, primaryColorConfig)
                ? '#fff'
                : 'var(--mui-palette-text-primary)'
            }}
          >
            <i className='ri-palette-line text-xl' />
          </div>
        </div>
      </div>
    </div>
  )

  const renderHeaderSwatchGroups = field => (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-center gap-2'>
        {headerBackgroundConfig.map(item => renderSwatch(field, item))}
      </div>

      <div className='flex flex-col gap-2'>
        <Typography variant='caption' className='uppercase tracking-wide text-textSecondary'>
          Personalizado
        </Typography>
        <div className='flex flex-wrap items-center gap-2'>
          <div
            className={classnames(styles.primaryColorWrapper, {
              [styles.active]: isCustomHeaderBgColor(settings[field], headerBackgroundConfig)
            })}
            onClick={event => openPicker(field, event)}
          >
            <div
              className={classnames(styles.primaryColor, 'flex items-center justify-center')}
              style={{
                backgroundColor: isCustomHeaderBgColor(settings[field], headerBackgroundConfig)
                  ? settings[field]
                  : 'var(--mui-palette-action-selected)',
                color: isCustomHeaderBgColor(settings[field], headerBackgroundConfig)
                  ? '#fff'
                  : 'var(--mui-palette-text-primary)'
              }}
            >
              <i className='ri-palette-line text-xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const baseSurfaceSwatches = themeSurfaceSwatches.filter(item => item.group === null)

  const renderSwatchGroups = field => (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-center gap-2'>
        {baseSurfaceSwatches.map(item => renderSwatch(field, item))}
      </div>

      {themeSurfaceGroups.map(group => {
        const items = themeSurfaceSwatches.filter(item => item.group === group.id)

        if (!items.length) return null

        return (
          <div key={`${field}-${group.id}`} className='flex flex-col gap-2'>
            <Typography variant='caption' className='uppercase tracking-wide text-textSecondary'>
              {group.label}
            </Typography>
            <div className='flex flex-wrap items-center gap-2'>{items.map(item => renderSwatch(field, item))}</div>
          </div>
        )
      })}

      <div className='flex flex-col gap-2'>
        <Typography variant='caption' className='uppercase tracking-wide text-textSecondary'>
          Personalizado
        </Typography>
        <div className='flex flex-wrap items-center gap-2'>
          <div
            className={classnames(styles.primaryColorWrapper, {
              [styles.active]: isCustomThemeSurfaceColor(settings[field])
            })}
            onClick={event => openPicker(field, event)}
          >
            <div
              className={classnames(styles.primaryColor, 'flex items-center justify-center')}
              style={{
                backgroundColor: isCustomThemeSurfaceColor(settings[field])
                  ? settings[field]
                  : 'var(--mui-palette-action-selected)',
                color: isCustomThemeSurfaceColor(settings[field])
                  ? '#fff'
                  : 'var(--mui-palette-text-primary)'
              }}
            >
              <i className='ri-palette-line text-xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const getFieldPreviewColor = (field, kind) => {
    if (kind === 'primary') {
      return settings.primaryColor
    }

    if (kind === 'header') {
      const value = settings.headerBgColor

      return value && value !== 'default' ? value : null
    }

    return resolveThemeSurface(settings[field], settings.themePreset, surfaceKeyMap[field])
  }

  const getFieldSwatchLabel = (field, kind) => {
    if (kind === 'primary') {
      return isCustomPrimaryColor(settings.primaryColor, primaryColorConfig)
        ? 'Personalizado'
        : settings.primaryColor?.toUpperCase()
    }

    if (kind === 'header') {
      return findHeaderBgSwatch(settings[field], headerBackgroundConfig).label
    }

    return findThemeSurfaceSwatch(settings[field]).label
  }

  const getPickerDefaultColor = (field, kind) => {
    if (kind === 'primary') {
      return isCustomPrimaryColor(settings.primaryColor, primaryColorConfig)
        ? settings.primaryColor
        : (settings.primaryColor ?? primaryColorConfig[0].main)
    }

    if (kind === 'header') {
      return isCustomHeaderBgColor(settings[field], headerBackgroundConfig) ? settings[field] : '#0B161C'
    }

    return isCustomThemeSurfaceColor(settings[field]) ? settings[field] : '#8C57FF'
  }

  const renderFieldControls = (field, kind) => {
    if (kind === 'primary') return renderPrimarySwatchGroups(field)
    if (kind === 'header') return renderHeaderSwatchGroups(field)

    return renderSwatchGroups(field)
  }

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <div className='flex items-center gap-1'>
          <p className='font-medium'>Fondos internos</p>
          {shouldUseHelpTooltip(SURFACES_SECTION_HELP) ? (
            <HelpInfoTooltip title={SURFACES_SECTION_HELP} />
          ) : null}
        </div>
        {!shouldUseHelpTooltip(SURFACES_SECTION_HELP) ? (
          <p className='text-xs text-textSecondary mbs-1'>{SURFACES_SECTION_HELP}</p>
        ) : null}
      </div>

      {themeSurfaceFields.map(({ field, label, description, kind }) => {
        const resolvedPreview = getFieldPreviewColor(field, kind)
        const gradient = getGradientSetting(field)
        const previewPaint = resolveSurfacePaint(resolvedPreview, gradient)
        const currentLabel = gradient?.to ? 'Gradiente' : getFieldSwatchLabel(field, kind)

        const accordionPreviewStyle = getSurfacePreviewStyle(
          isTransparentSurface(resolvedPreview) && !gradient?.to ? 'transparent' : previewPaint ?? resolvedPreview,
          { checkerSize: '6px' }
        )

        return (
          <Accordion
            key={field}
            disableGutters
            elevation={0}
            className='border border-divider rounded-md before:hidden mbe-0'
          >
            <AccordionSummary expandIcon={<i className='ri-arrow-down-s-line text-lg' />}>
              <div className='flex items-center gap-3 min-is-0'>
                <span
                  className='is-6 bs-6 rounded-sm border border-divider shrink-0'
                  style={accordionPreviewStyle}
                />
                <div className='flex flex-col min-is-0'>
                  <div className='flex items-center gap-0.5 min-is-0'>
                    <Typography className='font-medium'>{label}</Typography>
                    {shouldUseHelpTooltip(description) ? <HelpInfoTooltip title={description} /> : null}
                  </div>
                  <Typography variant='caption' color='text.secondary' className='truncate'>
                    {currentLabel}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className='pt-0'>
              {!shouldUseHelpTooltip(description) ? (
                <Typography variant='body2' color='text.secondary' className='mbe-3'>
                  {description}
                </Typography>
              ) : null}
              {renderFieldControls(field, kind)}
              {renderGradientControls(field, kind)}
              {field === 'themeBodyBg'
                ? renderImageControls({
                    label: 'Imagen de fondo',
                    hasImage: hasBodyImage,
                    onUpload: handleBodyImageUpload,
                    onClear: handleBodyImageClear,
                    previewUrl: imageUrls.body
                  })
                : null}
              {kind === 'header'
                ? renderImageControls({
                    label: 'Imagen de fondo',
                    hasImage: hasHeaderImage,
                    onUpload: handleHeaderImageUpload,
                    onClear: handleHeaderImageClear,
                    previewUrl: imageUrls.header
                  })
                : null}
              {field === 'themeSidebarBg'
                ? renderImageControls({
                    label: 'Imagen de fondo',
                    hasImage: hasSidebarImage,
                    onUpload: handleSidebarImageUpload,
                    onClear: handleSidebarImageClear,
                    previewUrl: imageUrls.sidebar
                  })
                : null}
            </AccordionDetails>
          </Accordion>
        )
      })}

      <Popper
        transition
        open={Boolean(pickerField)}
        disablePortal
        anchorEl={pickerAnchorRef.current}
        placement='bottom-end'
        className='z-[1]'
      >
        {({ TransitionProps }) => {
          if (!pickerField) return null

          const isGradientToPicker = pickerField.endsWith('::gradientTo')
          const basePickerField = isGradientToPicker ? pickerField.replace('::gradientTo', '') : pickerField
          const pickerKind = themeSurfaceFields.find(item => item.field === basePickerField)?.kind
          const gradientField = getSurfaceGradientField(basePickerField)
          const gradientSetting = gradientField ? settings[gradientField] : null

          const pickerColor = isGradientToPicker
            ? (gradientSetting?.to ?? getFieldPreviewColor(basePickerField, pickerKind) ?? '#8C57FF')
            : getPickerDefaultColor(basePickerField, pickerKind)

          return (
            <Fade {...TransitionProps} style={{ transformOrigin: 'right top' }}>
              <Paper elevation={6} className={styles.colorPopup}>
                <ClickAwayListener onClickAway={closePicker}>
                  <div>
                    <DebouncedSurfaceColorPicker
                      color={pickerColor}
                      onChange={color => {
                        if (isGradientToPicker && gradientField) {
                          updateSettings({
                            [gradientField]: {
                              ...gradientSetting,
                              to: color,
                              angle: gradientSetting?.angle ?? DEFAULT_GRADIENT_ANGLE
                            }
                          })

                          return
                        }

                        onChange(basePickerField, color)
                      }}
                      inputClassName={styles.colorInput}
                    />
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )
        }}
      </Popper>
    </div>
  )
}

export default ThemeSurfaceSection
