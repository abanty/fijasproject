'use client'

// React Imports
import { useRef } from 'react'

// MUI Imports
import Button from '@mui/material/Button'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import {
  applyThemeImport,
  buildThemeExport,
  downloadThemeExport,
  parseThemeImportFile
} from '@/lib/theme/themeSettingsTransfer'

const ThemeSettingsTransfer = () => {
  const { settings, updateSettings } = useSettings()
  const fileInputRef = useRef(null)

  const handleExport = () => {
    const name = window.prompt('Nombre del tema (opcional):', '') ?? ''
    const payload = buildThemeExport(settings, { name })
    downloadThemeExport(payload, name)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleImportFile = async event => {
    const file = event.target.files?.[0]

    event.target.value = ''

    if (!file) return

    try {
      const payload = await parseThemeImportFile(file)
      const importedSettings = applyThemeImport(payload)

      updateSettings(importedSettings)
      window.alert(payload.name ? `Tema "${payload.name}" importado.` : 'Tema importado correctamente.')
    } catch (error) {
      window.alert(error?.message || 'No se pudo importar el tema.')
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <p className='font-medium'>Respaldo de tema</p>
      <p className='text-xs text-textSecondary'>Guarda y restaura temas en JSON.</p>
      <div className='flex flex-wrap gap-2'>
        <Button size='small' variant='outlined' onClick={handleExport}>
          Exportar JSON
        </Button>
        <Button size='small' variant='outlined' onClick={handleImportClick}>
          Importar JSON
        </Button>
        <input
          ref={fileInputRef}
          hidden
          type='file'
          accept='application/json,.json'
          onChange={handleImportFile}
        />
      </div>
    </div>
  )
}

export default ThemeSettingsTransfer
