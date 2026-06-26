'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import FixedSidebarNav from '@components/layout/shared/FixedSidebarNav'
import FixedRightPanel from '@components/layout/shared/FixedRightPanel'
import MobileBottomNav from '@components/layout/shared/MobileBottomNav'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

const AppBodyShell = ({ children }) => {
  const { settings } = useSettings()
  const isBoxed = settings.bodyShellWidth === 'boxed'
  const showRightPanel = settings.rightPanelEnabled === true

  return (
    <>
      <div
        className={classnames('app-body-shell-outer flex flex-auto min-bs-0 is-full', {
          'app-body-shell-outer--boxed': isBoxed,
          'app-body-shell-outer--with-right-panel': showRightPanel
        })}
      >
        <div className='app-body-shell flex flex-auto min-bs-0 is-full'>
          <FixedSidebarNav />
          <div className='app-main-content flex flex-col flex-auto min-is-0 is-full'>{children}</div>
          {showRightPanel ? <FixedRightPanel /> : null}
        </div>
      </div>
      <MobileBottomNav />
    </>
  )
}

export default AppBodyShell
