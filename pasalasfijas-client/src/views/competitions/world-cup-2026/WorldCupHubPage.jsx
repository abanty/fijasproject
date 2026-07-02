'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'
import WorldCupHubTabs from '@/components/competitions/world-cup/WorldCupHubTabs'
import WorldCupTitleProbabilityBar from '@/components/competitions/world-cup/WorldCupTitleProbabilityBar'
import { worldCupTabs } from '@/data/competitions/worldCupHub'
import { useCachedQuery } from '@/hooks/useCachedQuery'
import { queryKeys } from '@/lib/query/queryKeys'
import { getCompetitionMatches } from '@/services/competitionsService'
import ComingSoonView from '@/views/shared/ComingSoonView'
import WorldCupMatchesTab from '@/views/competitions/world-cup-2026/WorldCupMatchesTab'

const tabIds = new Set(worldCupTabs.map(tab => tab.id))

const resolveTabId = tab => (tab && tabIds.has(tab) ? tab : 'partidos')

const WorldCupHubPage = ({ competition }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(() => resolveTabId(searchParams.get('tab')))
  const { data: matches, isLoading: matchesLoading } = useCachedQuery(
    queryKeys.competitions.matches(competition.slug),
    () => getCompetitionMatches(competition.slug).then(result => result.items),
    { onError: () => [] }
  )

  useEffect(() => {
    setActiveTab(resolveTabId(searchParams.get('tab')))
  }, [searchParams])

  const handleTabChange = useCallback(
    tabId => {
      setActiveTab(tabId)

      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', tabId)
      router.replace(`/matches/${competition.slug}?${params.toString()}`, { scroll: false })
    },
    [competition.slug, router, searchParams]
  )

  const comingSoonPanels = useMemo(
    () =>
      Object.fromEntries(
        worldCupTabs
          .filter(tab => tab.id !== 'partidos')
          .map(tab => [
            tab.id,
            <ComingSoonView
              key={tab.id}
              title={tab.label}
              description={`${competition.title} — esta vista estará disponible pronto.`}
            />
          ])
      ),
    [competition.title]
  )

  const panels = useMemo(
    () => ({
      partidos: (
        <>
          <WorldCupTitleProbabilityBar />
          <WorldCupMatchesTab matches={matches} loading={matchesLoading} />
        </>
      ),
      ...comingSoonPanels
    }),
    [comingSoonPanels, matches, matchesLoading]
  )

  return (
    <Stack spacing={0} className='page-stack world-cup-hub-page' sx={{ minWidth: 0, width: '100%' }}>
      <Button
        component={Link}
        href='/matches'
        size='small'
        variant='text'
        className='world-cup-hub-back'
        startIcon={<RemixIcon icon='ri-arrow-left-line' size='sm' />}
        sx={{
          alignSelf: 'flex-start',
          ml: { xs: -0.5, md: -1 },
          py: 0,
          px: { xs: 0.5, md: 1 },
          minHeight: { xs: 28, md: 36 }
        }}
      >
        Torneos activos
      </Button>

      <WorldCupHubTabs activeTab={activeTab} onTabChange={handleTabChange} panels={panels} />
    </Stack>
  )
}

export default WorldCupHubPage
