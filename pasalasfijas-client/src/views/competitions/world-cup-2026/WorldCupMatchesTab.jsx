'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import WorldCupMatchCard from '@/components/competitions/world-cup/WorldCupMatchCard'
import WorldCupMatchesFilters, {
  WorldCupMatchesFiltersButton
} from '@/components/competitions/world-cup/WorldCupMatchesFilters'
import { WorldCupMatchesTabLoading } from '@/components/loading/PageLoading'
import { groupMatchesByDate } from '@/lib/matches/matchScheduleFormat'
import { useWorldCupMatchesFilters } from '@/views/competitions/world-cup-2026/hooks/useWorldCupMatchesFilters'

const WorldCupMatchesTab = ({ matches, loading = false }) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const safeMatches = matches ?? []

  const {
    phase,
    setPhase,
    phases,
    stadium,
    setStadium,
    stadiums,
    teamCode,
    setTeamCode,
    teams,
    quickFilter,
    setQuickFilter,
    filteredMatches
  } = useWorldCupMatchesFilters(safeMatches)

  const grouped = groupMatchesByDate(filteredMatches)
  const showMatchesSkeleton = loading && matches === undefined

  return (
    <Stack spacing={0} className='world-cup-matches-tab'>
      <Stack
        direction='row'
        spacing={1.5}
        className='world-cup-matches-tab__header'
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
          <Typography
            variant='h4'
            fontWeight={800}
            sx={{ lineHeight: 1.2, fontSize: { xs: '1.25rem', md: '2.125rem' } }}
          >
            Partidos
          </Typography>
          <Typography variant='caption' color='text.secondary' fontWeight={600}>
            {filteredMatches.length} partidos
          </Typography>
        </Stack>

        <Box sx={{ display: { xs: 'inline-flex', md: 'none' }, flexShrink: 0 }}>
          <WorldCupMatchesFiltersButton
            phase={phase}
            stadium={stadium}
            teamCode={teamCode}
            onOpen={() => setFiltersOpen(true)}
          />
        </Box>
      </Stack>

      <WorldCupMatchesFilters
        phases={phases}
        phase={phase}
        onPhaseChange={setPhase}
        stadiums={stadiums}
        stadium={stadium}
        onStadiumChange={setStadium}
        teams={teams}
        teamCode={teamCode}
        onTeamChange={setTeamCode}
        quickFilter={quickFilter}
        onQuickFilterChange={setQuickFilter}
        filtersOpen={filtersOpen}
        onFiltersOpenChange={setFiltersOpen}
      />

      {showMatchesSkeleton ? (
        <WorldCupMatchesTabLoading />
      ) : grouped.length === 0 ? (
        <Typography color='text.secondary'>No hay partidos con los filtros seleccionados.</Typography>
      ) : (
        grouped.map(group => (
          <Stack key={group.dayKey} spacing={2} className='world-cup-matches-tab__day-group'>
            <Typography variant='h6' fontWeight={700} sx={{ textTransform: 'capitalize' }}>
              {group.label}
            </Typography>

            <Grid container spacing={2}>
              {group.matches.map(match => (
                <Grid key={match.id} size={{ xs: 12, md: 6, xl: 4 }}>
                  <WorldCupMatchCard match={match} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ))
      )}
    </Stack>
  )
}

export default WorldCupMatchesTab
