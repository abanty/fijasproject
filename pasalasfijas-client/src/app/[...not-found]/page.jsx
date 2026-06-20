// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

// Util Imports
import { getServerMode, getThemeCookieState } from '@core/utils/serverHelpers'

const NotFoundPage = async () => {
  const direction = 'ltr'
  const { mode, settingsCookie, systemMode } = await getThemeCookieState()
  const resolvedMode = await getServerMode()

  return (
    <Providers
      direction={direction}
      mode={mode}
      settingsCookie={settingsCookie}
      systemMode={systemMode}
    >
      <BlankLayout systemMode={systemMode}>
        <NotFound mode={resolvedMode} />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
