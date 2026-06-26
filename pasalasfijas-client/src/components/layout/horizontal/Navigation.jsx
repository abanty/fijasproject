// Third-party Imports
import classnames from 'classnames'

// Component Imports
import FrontMenu from './FrontMenu'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const Navigation = () => {
  const { settings } = useSettings()
  const headerContentCompact = settings.navbarContentWidth === 'compact'

  return (
    <div
      className={classnames(
        horizontalLayoutClasses.navigation,
        'header-nav-band header-nav-band--adaptive relative flex'
      )}
    >
      <div
        className={classnames(
          horizontalLayoutClasses.navigationContentWrapper,
          'header-nav-band__inner header-nav-band__inner--adaptive flex items-center is-full',
          headerContentCompact && 'header-nav-band__inner--compact'
        )}
      >
        <FrontMenu />
      </div>
    </div>
  )
}

export default Navigation
