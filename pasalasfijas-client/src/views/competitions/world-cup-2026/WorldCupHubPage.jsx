'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'
import WorldCupHubTabs from '@/components/competitions/world-cup/WorldCupHubTabs'
import WorldCupTitleProbabilityBar from '@/components/competitions/world-cup/WorldCupTitleProbabilityBar'
import { worldCupTabs } from '@/data/competitions/worldCupHub'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import { getCompetitionMatches } from '@/services/competitionsService'
import ComingSoonView from '@/views/shared/ComingSoonView'
import WorldCupMatchesTab from '@/views/competitions/world-cup-2026/WorldCupMatchesTab'

const tabIds = new Set(worldCupTabs.map(tab => tab.id))

const WorldCupHubPage = ({ competition }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestedTab = searchParams.get('tab') ?? 'partidos'
  const activeTab = tabIds.has(requestedTab) ? requestedTab : 'partidos'
  const [matches, setMatches] = useState(null)

  useEffect(() => {
    let active = true

    getCompetitionMatches(competition.slug)
      .then(result => {
        if (active) setMatches(result.items)
      })
      .catch(() => {
        if (active) setMatches([])
      })

    return () => {
      active = false
    }
  }, [competition.slug])

  const handleTabChange = useCallback(
    tabId => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', tabId)
      router.replace(`/matches/${competition.slug}?${params.toString()}`, { scroll: false })
    },
    [competition.slug, router, searchParams]
  )

  if (!matches) return <DashboardPageLoading />

  const activeTabMeta = worldCupTabs.find(tab => tab.id === activeTab)

  return (
    <Stack spacing={3} className='page-stack'>
      <Button
        component={Link}
        href='/matches'
        size='small'
        variant='text'
        startIcon={<RemixIcon icon='ri-arrow-left-line' size='sm' />}
        sx={{ alignSelf: 'flex-start', ml: -1 }}
      >
        Torneos activos
      </Button>

      <WorldCupHubTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        topContent={activeTab === 'partidos' ? <WorldCupTitleProbabilityBar /> : null}
      >
        {activeTab === 'partidos' ? <WorldCupMatchesTab matches={matches} /> : null}
        {activeTab !== 'partidos' ? (
          <ComingSoonView
            title={activeTabMeta?.label ?? 'Sección'}
            description={`${competition.title} — esta vista estará disponible pronto.`}
          />
        ) : null}
      </WorldCupHubTabs>
    </Stack>
  )
}

export default WorldCupHubPage
