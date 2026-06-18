'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'

// Third-party Imports
import classnames from 'classnames'
import { useMedia } from 'react-use'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import ThemeSurfaceSection from '@core/components/customizer/ThemeSurfaceSection'
import ThemeSettingsTransfer from '@core/components/customizer/ThemeSettingsTransfer'
import HelpInfoTooltip from '@components/shared/HelpInfoTooltip'

// Icon Imports
import SkinDefault from '@core/svg/SkinDefault'
import SkinBordered from '@core/svg/SkinBordered'
import LayoutVertical from '@core/svg/LayoutVertical'
import LayoutCollapsed from '@core/svg/LayoutCollapsed'
import LayoutHorizontal from '@core/svg/LayoutHorizontal'
import ContentCompact from '@core/svg/ContentCompact'
import ContentWide from '@core/svg/ContentWide'
import DirectionLtr from '@core/svg/DirectionLtr'
import DirectionRtl from '@core/svg/DirectionRtl'

// Config Imports
import themeConfig from '@configs/themeConfig'
import themePresets from '@configs/themePresets'
import { fontFamilyCatalog, getFontFamilyOption } from '@configs/fontFamilyOptions'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { shouldUseHelpTooltip } from '@/lib/ui/helpText'

// Style Imports
import styles from './styles.module.css'

const WORLD_CUP_PRESET_HELP =
  'Base Flashscore editable: ajusta color primario, modo y fondos internos abajo.'

const COMPACT_UI_HELP =
  'Tipografía más pequeña y filas mejor distribuidas, sin apretar el padding.'

const getLocalePath = (pathName, locale) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')

  segments[1] = locale

  return segments.join('/')
}

const Customizer = ({ breakpoint = 'lg', dir = 'ltr', disableDirection = false }) => {
  // States
  const [isOpen, setIsOpen] = useState(false)
  const [direction, setDirection] = useState(dir)

  // Hooks
  const theme = useTheme()
  const pathName = usePathname()
  const { settings, updateSettings, resetSettings, isSettingsChanged } = useSettings()
  const isSystemDark = useMedia('(prefers-color-scheme: dark)', false)

  // Vars
  let breakpointValue

  switch (breakpoint) {
    case 'xxl':
      breakpointValue = '1920px'
      break
    case 'xl':
      breakpointValue = `${theme.breakpoints.values.xl}px`
      break
    case 'lg':
      breakpointValue = `${theme.breakpoints.values.lg}px`
      break
    case 'md':
      breakpointValue = `${theme.breakpoints.values.md}px`
      break
    case 'sm':
      breakpointValue = `${theme.breakpoints.values.sm}px`
      break
    case 'xs':
      breakpointValue = `${theme.breakpoints.values.xs}px`
      break
    default:
      breakpointValue = breakpoint
  }

  const breakpointReached = useMedia(`(max-width: ${breakpointValue})`, false)
  const isMobileScreen = useMedia('(max-width: 600px)', false)
  const isBelowLgScreen = useMedia('(max-width: 1200px)', false)
  const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // Update Settings
  const handleChange = (field, value) => {
    // Update direction state
    if (field === 'direction') {
      setDirection(value)
    } else if (field === 'primaryColor') {
      updateSettings({ primaryColor: value })
    } else {
      // Update settings in cookie
      updateSettings({ [field]: value })
    }
  }

  const handlePresetChange = preset => {
    const updates = { themePreset: preset.id }

    if (preset.primaryColor) {
      updates.primaryColor = preset.primaryColor
    }

    if (preset.id === 'world-cup' && settings.mode === 'light') {
      updates.mode = 'dark'
    }

    updateSettings(updates)
  }

  const handleThemeSurfaceColor = (field, color) => {
    if (field === 'primaryColor') {
      updateSettings({ primaryColor: color })

      return
    }

    updateSettings({ [field]: color ?? 'default' })
  }

  return (
    !breakpointReached && (
      <div
        className={classnames('customizer', styles.customizer, {
          [styles.show]: isOpen,
          [styles.smallScreen]: isMobileScreen
        })}
      >
        <div className={styles.toggler} onClick={handleToggle}>
          <i className='ri-settings-5-line text-[22px]' />
        </div>
        <div className={styles.header}>
          <div className='flex flex-col'>
            <h6 className={styles.customizerTitle}>Personalizar el tema</h6>
            <p className={styles.customizerSubtitle}>Personaliza y visualiza en tiempo real</p>
          </div>
          <div className='flex gap-4'>
            <div onClick={resetSettings} className='relative flex cursor-pointer'>
              <i className='ri-refresh-line text-actionActive' />
              <div className={classnames(styles.dotStyles, { [styles.show]: isSettingsChanged })} />
            </div>
            <i className='ri-close-line text-actionActive cursor-pointer' onClick={handleToggle} />
          </div>
        </div>
        <ScrollWrapper
          {...(isBelowLgScreen
            ? { className: 'bs-full overflow-y-auto overflow-x-hidden' }
            : { options: { wheelPropagation: false, suppressScrollX: true } })}
        >
          <div className={styles.customizerBody}>
            <div className='flex flex-col gap-6'>
              <ThemeSettingsTransfer />
              <hr className={styles.hr} />
              <Chip label='Theming' size='small' color='primary' variant='tonal' className='self-start rounded-sm' />
              <div className='flex flex-col gap-2.5'>
                <p className='font-medium'>Temas especiales</p>
                <div className='flex items-center gap-4 flex-wrap'>
                  {themePresets.map(preset => (
                    <div key={preset.id} className='flex flex-col items-start gap-0.5'>
                      <div
                        className={classnames(styles.presetWrapper, {
                          [styles.active]: settings.themePreset === preset.id
                        })}
                        onClick={() => handlePresetChange(preset)}
                      >
                        <div
                          className={styles.presetPreview}
                          style={{
                            background: preset.preview.via
                              ? `linear-gradient(135deg, ${preset.preview.from} 0%, ${preset.preview.via} 45%, ${preset.preview.to} 100%)`
                              : `linear-gradient(135deg, ${preset.preview.from} 0%, ${preset.preview.to} 100%)`
                          }}
                        >
                          <i className={classnames(preset.icon, 'text-[22px] text-white drop-shadow-sm')} />
                        </div>
                      </div>
                      <p className={styles.itemLabel} onClick={() => handlePresetChange(preset)}>
                        {preset.label}
                      </p>
                    </div>
                  ))}
                </div>
                {settings.themePreset === 'world-cup' ? (
                  shouldUseHelpTooltip(WORLD_CUP_PRESET_HELP) ? (
                    <div className='flex items-center gap-1'>
                      <p className='text-xs text-textSecondary'>Preset Mundial</p>
                      <HelpInfoTooltip title={WORLD_CUP_PRESET_HELP} />
                    </div>
                  ) : (
                    <p className='text-xs text-textSecondary'>{WORLD_CUP_PRESET_HELP}</p>
                  )
                ) : null}
              </div>
              <ThemeSurfaceSection settings={settings} onChange={handleThemeSurfaceColor} styles={styles} />
              <div className='flex flex-col gap-2.5'>
                <p className='font-medium'>Mode</p>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, styles.modeWrapper, {
                        [styles.active]: settings.mode === 'light'
                      })}
                      onClick={() => handleChange('mode', 'light')}
                    >
                      <i className='ri-sun-line text-[30px]' />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('mode', 'light')}>
                      Light
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, styles.modeWrapper, {
                        [styles.active]: settings.mode === 'dark'
                      })}
                      onClick={() => handleChange('mode', 'dark')}
                    >
                      <i className='ri-moon-clear-line text-[30px]' />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('mode', 'dark')}>
                      Dark
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, styles.modeWrapper, {
                        [styles.active]: settings.mode === 'system'
                      })}
                      onClick={() => handleChange('mode', 'system')}
                    >
                      <i className='ri-computer-line text-[30px]' />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('mode', 'system')}>
                      System
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2.5'>
                <p className='font-medium'>Skin</p>
                <div className='flex items-center gap-4'>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.skin === 'default' })}
                      onClick={() => handleChange('skin', 'default')}
                    >
                      <SkinDefault />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('skin', 'default')}>
                      Default
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.skin === 'bordered' })}
                      onClick={() => handleChange('skin', 'bordered')}
                    >
                      <SkinBordered />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('skin', 'bordered')}>
                      Bordered
                    </p>
                  </div>
                </div>
              </div>
              {settings.mode === 'dark' ||
              (settings.mode === 'system' && isSystemDark) ||
              settings.layout === 'horizontal' ? null : (
                <div className='flex items-center justify-between'>
                  <label className='font-medium cursor-pointer' htmlFor='customizer-semi-dark'>
                    Semi Dark
                  </label>
                  <Switch
                    id='customizer-semi-dark'
                    checked={settings.semiDark === true}
                    onChange={() => handleChange('semiDark', !settings.semiDark)}
                  />
                </div>
              )}
              <div className='flex items-center justify-between'>
                <div>
                  <div className='flex items-center gap-1'>
                    <label className='font-medium cursor-pointer' htmlFor='customizer-compact-ui'>
                      Interfaz compacta
                    </label>
                    {shouldUseHelpTooltip(COMPACT_UI_HELP) ? <HelpInfoTooltip title={COMPACT_UI_HELP} /> : null}
                  </div>
                  {!shouldUseHelpTooltip(COMPACT_UI_HELP) ? (
                    <p className='text-xs text-textSecondary mbs-0.5'>{COMPACT_UI_HELP}</p>
                  ) : null}
                </div>
                <Switch
                  id='customizer-compact-ui'
                  checked={settings.componentDensity === 'compact'}
                  onChange={() =>
                    handleChange('componentDensity', settings.componentDensity === 'compact' ? 'default' : 'compact')
                  }
                />
              </div>
              <div className='flex items-center justify-between gap-3'>
                <label className='font-medium shrink-0' htmlFor='customizer-font-family'>
                  Tipografía
                </label>
                <FormControl size='small' className={styles.fontFamilySelect}>
                  <Select
                    id='customizer-font-family'
                    value={settings.fontFamily || 'roboto'}
                    onChange={event => handleChange('fontFamily', event.target.value)}
                    renderValue={value => {
                      const option = getFontFamilyOption(value)

                      return (
                        <span className={styles.fontFamilySelectValue} style={{ fontFamily: option.stack }}>
                          {option.label}
                        </span>
                      )
                    }}
                    MenuProps={{ className: styles.fontFamilyMenu }}
                  >
                    {fontFamilyCatalog.map(option => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                        className={styles.fontFamilyMenuItem}
                        style={{ fontFamily: option.stack }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <hr className={styles.hr} />
            <div className='flex flex-col gap-6'>
              <Chip label='Layout' size='small' color='primary' variant='tonal' className='self-start rounded-sm' />
              <div className='flex flex-col gap-2.5'>
                <p className='font-medium'>Layouts</p>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'vertical' })}
                      onClick={() => handleChange('layout', 'vertical')}
                    >
                      <LayoutVertical />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('layout', 'vertical')}>
                      Vertical
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'collapsed' })}
                      onClick={() => handleChange('layout', 'collapsed')}
                    >
                      <LayoutCollapsed />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('layout', 'collapsed')}>
                      Collapsed
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'horizontal' })}
                      onClick={() => handleChange('layout', 'horizontal')}
                    >
                      <LayoutHorizontal />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('layout', 'horizontal')}>
                      Horizontal
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2.5'>
                <p className='font-medium'>Content</p>
                <div className='flex items-center gap-4'>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, {
                        [styles.active]: settings.contentWidth === 'compact'
                      })}
                      onClick={() =>
                        updateSettings({
                          navbarContentWidth: 'compact',
                          contentWidth: 'compact',
                          footerContentWidth: 'compact'
                        })
                      }
                    >
                      <ContentCompact />
                    </div>
                    <p
                      className={styles.itemLabel}
                      onClick={() =>
                        updateSettings({
                          navbarContentWidth: 'compact',
                          contentWidth: 'compact',
                          footerContentWidth: 'compact'
                        })
                      }
                    >
                      Compact
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.contentWidth === 'wide' })}
                      onClick={() =>
                        updateSettings({ navbarContentWidth: 'wide', contentWidth: 'wide', footerContentWidth: 'wide' })
                      }
                    >
                      <ContentWide />
                    </div>
                    <p
                      className={styles.itemLabel}
                      onClick={() =>
                        updateSettings({ navbarContentWidth: 'wide', contentWidth: 'wide', footerContentWidth: 'wide' })
                      }
                    >
                      Wide
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='flex items-center gap-1'>
                    <label className='font-medium cursor-pointer' htmlFor='customizer-right-panel-enabled'>
                      Panel derecho (publicidad)
                    </label>
                    {shouldUseHelpTooltip(
                      'Muestra una columna lateral derecha con espacio promocional, similar al sidebar izquierdo.'
                    ) ? (
                      <HelpInfoTooltip
                        title='Muestra una columna lateral derecha con espacio promocional, similar al sidebar izquierdo.'
                      />
                    ) : null}
                  </div>
                </div>
                <Switch
                  id='customizer-right-panel-enabled'
                  checked={settings.rightPanelEnabled === true}
                  onChange={() => handleChange('rightPanelEnabled', !settings.rightPanelEnabled)}
                />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='flex items-center gap-1'>
                    <label className='font-medium cursor-pointer' htmlFor='customizer-body-shell-boxed'>
                      Contenedor centrado
                    </label>
                    {shouldUseHelpTooltip(
                      `Reduce el ancho del sidebar y contenido (máx. ${themeConfig.compactContentWidth}px) y deja márgenes laterales.`
                    ) ? (
                      <HelpInfoTooltip
                        title={`Reduce el ancho del sidebar y contenido (máx. ${themeConfig.compactContentWidth}px) y deja márgenes laterales.`}
                      />
                    ) : null}
                  </div>
                </div>
                <Switch
                  id='customizer-body-shell-boxed'
                  checked={settings.bodyShellWidth === 'boxed'}
                  onChange={() =>
                    handleChange('bodyShellWidth', settings.bodyShellWidth === 'boxed' ? 'full' : 'boxed')
                  }
                />
              </div>
              {!disableDirection && (
                <div className='flex flex-col gap-2.5'>
                  <p className='font-medium'>Direction</p>
                  <div className='flex items-center gap-4'>
                    <Link href={getLocalePath(pathName, 'en')}>
                      <div className='flex flex-col items-start gap-0.5'>
                        <div
                          className={classnames(styles.itemWrapper, {
                            [styles.active]: direction === 'ltr'
                          })}
                        >
                          <DirectionLtr />
                        </div>
                        <p className={styles.itemLabel}>
                          Left to Right <br />
                          (English)
                        </p>
                      </div>
                    </Link>
                    <Link href={getLocalePath(pathName, 'ar')}>
                      <div className='flex flex-col items-start gap-0.5'>
                        <div
                          className={classnames(styles.itemWrapper, {
                            [styles.active]: direction === 'rtl'
                          })}
                        >
                          <DirectionRtl />
                        </div>
                        <p className={styles.itemLabel}>
                          Right to Left <br />
                          (Arabic)
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollWrapper>
      </div>
    )
  )
}

export default Customizer
