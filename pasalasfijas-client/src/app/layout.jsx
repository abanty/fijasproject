// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'animate.css/animate.min.css'
import 'nprogress/nprogress.css'

// Component Imports
import ColorSchemeInitScript from '@components/theme/ColorSchemeInitScript'

// Config Imports
import { fontFamilyVariableClassNames } from '@configs/appFonts'

// Util Imports
import { getThemeCookieState } from '@core/utils/serverHelpers'
import { resolveThemeRootSnapshot } from '@/lib/theme/resolveThemeRootSnapshot'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Pasame La Fija - Predicciones de futbol con IA',
  description: 'Plataforma freemium de predicciones de futbol con IA, riesgo y control de valor.'
}

const RootLayout = async props => {
  const { children } = props

  const { settingsCookie, systemMode } = await getThemeCookieState()
  const themeRoot = resolveThemeRootSnapshot(settingsCookie, systemMode)

  const htmlDataAttributes = Object.fromEntries(
    Object.entries(themeRoot.dataAttributes).filter(([, value]) => value != null)
  )

  const direction = 'ltr'

  return (
    <html
      id='__next'
      lang='en'
      dir={direction}
      className={fontFamilyVariableClassNames}
      suppressHydrationWarning
      {...htmlDataAttributes}
      style={themeRoot.cssVars}
    >
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <ColorSchemeInitScript defaultMode={systemMode} />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
