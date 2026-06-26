// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import NavigationProgress from '@components/NavigationProgress'
import { CurrentUserProvider } from '@/contexts/CurrentUserProvider'

/**
 * Síncrono: el tema ya se leyó en el layout del segmento.
 */
const Providers = ({ children, direction, mode, settingsCookie, systemMode, initialUser = null }) => {
  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode} systemMode={systemMode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          <CurrentUserProvider initialUser={initialUser}>
            <NavigationProgress />
            {children}
          </CurrentUserProvider>
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
