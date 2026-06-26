// Third-party Imports
import classnames from 'classnames'

// Context Imports
import { HorizontalNavProvider } from '@menu/contexts/horizontalNavContext'

// Component Imports
import LayoutContent from './components/horizontal/LayoutContent'
import AppBodyShell from '@components/layout/shared/AppBodyShell'
import AppScrollRoot from '@components/layout/shared/AppScrollRoot'
import HeaderHeightSync from '@components/layout/shared/HeaderHeightSync'

// Context Imports
import { SidebarNavProvider } from '@/contexts/sidebarNavContext'

// Util Imports
import { horizontalLayoutClasses } from './utils/layoutClasses'

// Styled Component Imports
import StyledContentWrapper from './styles/horizontal/StyledContentWrapper'

const HorizontalLayout = props => {
  // Props
  const { header, footer, children } = props

  return (
    <div
      className={classnames(horizontalLayoutClasses.root, 'flex flex-col flex-auto min-bs-0 is-full')}
      data-header-scroll-mode='isolated'
    >
      <HorizontalNavProvider>
        <SidebarNavProvider>
          <HeaderHeightSync />
          {header || null}
          <AppScrollRoot>
            <StyledContentWrapper
              className={classnames(horizontalLayoutClasses.contentWrapper, 'flex flex-col flex-auto min-bs-0 is-full')}
            >
              <AppBodyShell>
                <LayoutContent>{children}</LayoutContent>
              </AppBodyShell>
              {/* {footer || null} (No se muestra el footer en la versión horizontal) */}
            </StyledContentWrapper>
          </AppScrollRoot>
        </SidebarNavProvider>
      </HorizontalNavProvider>
    </div>
  )
}

export default HorizontalLayout
