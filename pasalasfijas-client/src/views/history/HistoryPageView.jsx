'use client'

import { useEffect, useState } from 'react'

import HistoryView from '@/views/history'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { getPredictionHistory } from '@/services/predictionsService'

const HistoryPageView = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true

    getPredictionHistory()
      .then(result => {
        if (active) setData(result)
      })
      .catch(() => {
        if (active) setData({ locked: true, reason: 'PREMIUM_REQUIRED', items: [] })
      })

    return () => {
      active = false
    }
  }, [])

  if (!data) return <DashboardPageLoading />

  return <HistoryView historyData={data} />
}

export default HistoryPageView
