'use client'

import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { worldCupTabs } from '@/data/competitions/worldCupHub'

const WorldCupHubTabs = ({ activeTab, onTabChange, topContent, children }) => (
  <TabContext value={activeTab}>
    <Box className='world-cup-hub-tabs'>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={(_, value) => onTabChange(value)}
        textColor='primary'
        indicatorColor='primary'
        sx={{ mb: 0 }}
      >
        {worldCupTabs.map(tab => (
          <Tab key={tab.id} value={tab.id} label={tab.label} />
        ))}
      </TabList>

      {topContent}

      <TabPanel value={activeTab} sx={{ px: 0, pt: 0, pb: 0 }}>
        {children}
      </TabPanel>
    </Box>
  </TabContext>
)

export default WorldCupHubTabs
