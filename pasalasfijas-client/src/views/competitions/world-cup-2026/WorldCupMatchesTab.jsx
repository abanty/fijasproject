'use client'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import WorldCupMatchCard from '@/components/competitions/world-cup/WorldCupMatchCard'
import WorldCupMatchesFilters from '@/components/competitions/world-cup/WorldCupMatchesFilters'
import { groupMatchesByDate } from '@/lib/matches/matchScheduleFormat'
import { useWorldCupMatchesFilters } from '@/views/competitions/world-cup-2026/hooks/useWorldCupMatchesFilters'

const WorldCupMatchesTab = ({ matches }) => {
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
  } = useWorldCupMatchesFilters(matches)

  const grouped = groupMatchesByDate(filteredMatches)

  return (
    <Stack spacing={0}>
      <Stack
        direction='row'
        spacing={2}
        sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: 2.5 }}
      >
        <Typography variant='h4' fontWeight={800}>
          Partidos
        </Typography>
        <Typography variant='body2' color='text.secondary' fontWeight={600}>
          {matches.length} partidos
        </Typography>
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
      />

      {grouped.length === 0 ? (
        <Typography color='text.secondary'>No hay partidos con los filtros seleccionados.</Typography>
      ) : (
        grouped.map(group => (
          <Stack key={group.dayKey} spacing={2} sx={{ mb: 4 }}>
            <Typography
              variant='h6'
              fontWeight={700}
              sx={{ textTransform: 'capitalize' }}
            >
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
