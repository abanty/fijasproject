'use client'

import { useEffect, useState } from 'react'

import CompetitionsView from '@/views/competitions'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { getCompetitionMatchCounts, getCompetitions } from '@/services/competitionsService'

const CompetitionsPage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true

    getCompetitionMatchCounts()
      .then(matchCounts => {
        if (active) {
          setData({
            competitions: getCompetitions(),
            matchCounts
          })
        }
      })
      .catch(() => {
        if (active) {
          setData({
            competitions: getCompetitions(),
            matchCounts: {}
          })
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (!data) return <DashboardPageLoading />

  return <CompetitionsView competitions={data.competitions} matchCounts={data.matchCounts} />
}

export default CompetitionsPage
