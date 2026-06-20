// MUI Imports
import Button from '@mui/material/Button'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import Customizer from '@core/components/customizer'
import ScrollToTop from '@core/components/scroll-to-top'

// Util Imports
import { getThemeCookieState } from '@core/utils/serverHelpers'

const Layout = async props => {
  const { children } = props

  const direction = 'ltr'
  const { mode, settingsCookie, systemMode } = await getThemeCookieState()

  return (
    <Providers
      direction={direction}
      mode={mode}
      settingsCookie={settingsCookie}
      systemMode={systemMode}
    >
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
          <VerticalLayout navigation={<Navigation mode={mode} />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
        }
        horizontalLayout={
          <HorizontalLayout header={<Header />} footer={<HorizontalFooter />}>
            {children}
          </HorizontalLayout>
        }
      />
      <ScrollToTop className='mui-fixed'>
        <Button
          variant='contained'
          sx={{
            inlineSize: 40,
            blockSize: 40,
            minInlineSize: 40,
            padding: 0,
            borderRadius: '50%'
          }}
        >
          <i className='ri-arrow-up-line text-xl' />
        </Button>
      </ScrollToTop>
      <Customizer dir={direction} />
    </Providers>
  )
}

export default Layout
