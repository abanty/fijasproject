'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import AppScrollRoot from '@components/layout/shared/AppScrollRoot'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'

// Util Imports
import { blankLayoutClasses } from './utils/layoutClasses'

const BlankLayout = props => {
  // Props
  const { children, systemMode } = props

  // Hooks
  const { settings } = useSettings()

  useLayoutInit(systemMode)

  return (
    <AppScrollRoot>
      <div
        className={classnames(blankLayoutClasses.root, 'is-full bs-full min-bs-[100dvh] w-full flex flex-col flex-auto')}
        data-skin={settings.skin}
      >
        {children}
      </div>
    </AppScrollRoot>
  )
}

export default BlankLayout
