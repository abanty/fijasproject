'use client'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import CountryFlag from '@/components/shared/CountryFlag'
import { getFifaDisplayCode } from '@/lib/country/fifaDisplayCode'
import { worldCupQuickFilters } from '@/data/competitions/worldCupHub'

const ALL_TEAMS = { code: 'all', name: 'Todas las selecciones' }

const autocompleteSx = {
  flex: { sm: '1 1 200px' },
  minWidth: { xs: '100%', sm: 188 },
  maxWidth: { sm: 420 },
  '& .MuiOutlinedInput-root': { borderRadius: 2 }
}

const phaseLabel = value => (value === 'all' ? 'Todas las fases' : value)
const stadiumLabel = value => (value === 'all' ? 'Todos los estadios' : value)
const teamLabel = team => {
  if (!team || team.code === 'all') return 'Todas las selecciones'

  return `${getFifaDisplayCode(team.code)} · ${team.name}`
}

const WorldCupMatchesFilters = ({
  phases,
  phase,
  onPhaseChange,
  stadiums,
  stadium,
  onStadiumChange,
  teams,
  teamCode,
  onTeamChange,
  quickFilter,
  onQuickFilterChange
}) => {
  const quickOptions = worldCupQuickFilters.filter(option => option.id !== 'all')
  const phaseOptions = ['all', ...phases]
  const stadiumOptions = ['all', ...stadiums]
  const teamOptions = [ALL_TEAMS, ...teams]
  const selectedTeam =
    teamCode === 'all' ? ALL_TEAMS : teams.find(team => team.code === teamCode) ?? ALL_TEAMS

  return (
    <Stack spacing={2.5} sx={{ mb: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ flexWrap: 'wrap' }}>
        <Autocomplete
          size='small'
          disableClearable
          sx={autocompleteSx}
          options={phaseOptions}
          value={phase}
          onChange={(_, value) => onPhaseChange(value ?? 'all')}
          getOptionLabel={phaseLabel}
          isOptionEqualToValue={(a, b) => a === b}
          renderInput={params => <TextField {...params} label='Fase' />}
        />

        <Autocomplete
          size='small'
          disableClearable
          sx={autocompleteSx}
          options={stadiumOptions}
          value={stadium}
          onChange={(_, value) => onStadiumChange(value ?? 'all')}
          getOptionLabel={stadiumLabel}
          isOptionEqualToValue={(a, b) => a === b}
          renderInput={params => <TextField {...params} label='Estadio' />}
        />

        <Autocomplete
          size='small'
          disableClearable
          sx={autocompleteSx}
          options={teamOptions}
          value={selectedTeam}
          onChange={(_, option) => onTeamChange(option?.code ?? 'all')}
          getOptionLabel={teamLabel}
          isOptionEqualToValue={(a, b) => a.code === b.code}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props

            return (
              <li key={key} {...optionProps}>
                {option.code === 'all' ? (
                  option.name
                ) : (
                  <Box component='span' sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    <CountryFlag code={option.code} size={18} variant='sphere' />
                    {teamLabel(option)}
                  </Box>
                )}
              </li>
            )
          }}
          renderInput={params => <TextField {...params} label='Selección' placeholder='Buscar selección' />}
        />
      </Stack>

      <ToggleButtonGroup
        exclusive
        size='small'
        color='primary'
        value={quickFilter === 'all' ? null : quickFilter}
        onChange={(_, value) => onQuickFilterChange(value ?? 'all')}
        sx={{ flexWrap: 'wrap', gap: 0.5 }}
      >
        {quickOptions.map(option => (
          <ToggleButton key={option.id} value={option.id} sx={{ fontWeight: 700, textTransform: 'none', px: 3.5 }}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  )
}

export default WorldCupMatchesFilters
