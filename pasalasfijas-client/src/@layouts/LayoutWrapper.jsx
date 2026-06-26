'use client'

// Component Imports
import AppScrollRoot from '@components/layout/shared/AppScrollRoot'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'

const LayoutWrapper = props => {
  // Props
  const { systemMode, verticalLayout, horizontalLayout } = props

  // Hooks
  const { settings } = useSettings()

  useLayoutInit(systemMode)

  // Return the layout based on the layout context
  const isHorizontal = settings.layout === 'horizontal'

  return (
    <div className='flex flex-col flex-auto min-bs-0 is-full' data-skin={settings.skin}>
      {isHorizontal ? horizontalLayout : <AppScrollRoot>{verticalLayout}</AppScrollRoot>}
    </div>
  )
}

export default LayoutWrapper
