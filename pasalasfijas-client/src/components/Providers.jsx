// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import NavigationProgress from '@components/NavigationProgress'

/**
 * Síncrono: el tema ya se leyó en el layout del segmento.
 */
const Providers = ({ children, direction, mode, settingsCookie, systemMode }) => {
  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode} systemMode={systemMode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          <NavigationProgress />
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
