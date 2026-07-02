'use client'

import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import { worldCupTabs } from '@/data/competitions/worldCupHub'
import { useHorizontalTouchScroll } from '@/hooks/useHorizontalTouchScroll'

const WorldCupHubTabs = ({ activeTab, onTabChange, panels }) => {
  const { ref: scrollRef, touchHandlers } = useHorizontalTouchScroll()

  return (
    <TabContext value={activeTab}>
      <Box className='world-cup-hub-tabs'>
        <div ref={scrollRef} className='world-cup-hub-tab-scroll' {...touchHandlers}>
          <div className='world-cup-hub-tab-track' role='tablist' aria-label='Secciones del torneo'>
            {worldCupTabs.map(tab => {
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type='button'
                  role='tab'
                  aria-selected={isActive}
                  className={`world-cup-hub-tab${isActive ? ' world-cup-hub-tab--active' : ''}`}
                  onClick={() => onTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {worldCupTabs.map(tab => (
          <TabPanel
            key={tab.id}
            value={tab.id}
            keepMounted
            sx={{
              px: 0,
              pt: 0,
              pb: 0,
              display: activeTab === tab.id ? 'block' : 'none'
            }}
          >
            {panels[tab.id]}
          </TabPanel>
        ))}
      </Box>
    </TabContext>
  )
}

export default WorldCupHubTabs
