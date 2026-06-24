'use client'

import { useState } from 'react'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

import AdminGuard from '@/components/auth/AdminGuard'
import CreateMatchForm from '@/components/admin/CreateMatchForm'
import PublishPredictionForm from '@/components/admin/PublishPredictionForm'
import SyncCompetitionPanel from '@/components/admin/SyncCompetitionPanel'

const AdminPageView = () => {
  const [tab, setTab] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  const bumpRefresh = () => setRefreshKey(value => value + 1)

  return (
    <AdminGuard>
      <div className='page-stack flex flex-col gap-6'>
        <div>
          <Typography variant='h4'>Administración</Typography>
          <Typography color='text.secondary'>
            Datos deportivos, partidos y publicación de fijas.
          </Typography>
        </div>

        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label='Sincronizar torneo' />
          <Tab label='Crear partido' />
          <Tab label='Publicar fija' />
        </Tabs>

        {tab === 0 ? <SyncCompetitionPanel onSynced={bumpRefresh} /> : null}
        {tab === 1 ? <CreateMatchForm onCreated={bumpRefresh} /> : null}
        {tab === 2 ? <PublishPredictionForm refreshKey={refreshKey} /> : null}
      </div>
    </AdminGuard>
  )
}

export default AdminPageView
