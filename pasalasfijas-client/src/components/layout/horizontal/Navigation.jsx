// Third-party Imports
import styled from '@emotion/styled'
import classnames from 'classnames'

// Component Imports
import FrontMenu from './FrontMenu'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const StyledDiv = styled.div`
  ${({ isContentCompact, isBreakpointReached }) =>
    !isBreakpointReached &&
    `
    padding-inline: ${themeConfig.layoutPadding}px;
    padding-block: 0;

    ${
      isContentCompact &&
      `
      margin-inline: auto;
      max-inline-size: ${themeConfig.compactContentWidth}px;
    `
    }
  `}
`

const Navigation = () => {
  const { settings } = useSettings()
  const { isBreakpointReached } = useHorizontalNav()
  const headerContentCompact = settings.navbarContentWidth === 'compact'

  return (
    <div
      className={classnames({
        [horizontalLayoutClasses.navigation]: !isBreakpointReached,
        'header-nav-band relative flex': !isBreakpointReached,
        'header-nav-band header-nav-band--detached flex': isBreakpointReached
      })}
    >
      <StyledDiv
        isContentCompact={headerContentCompact}
        isBreakpointReached={isBreakpointReached}
        {...(!isBreakpointReached && {
          className: classnames(
            horizontalLayoutClasses.navigationContentWrapper,
            'header-nav-band__inner flex items-center is-full'
          )
        })}
      >
        <FrontMenu />
      </StyledDiv>
    </div>
  )
}

export default Navigation
