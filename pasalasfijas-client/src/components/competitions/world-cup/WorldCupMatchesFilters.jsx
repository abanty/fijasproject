'use client'

import { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

import RemixIcon from '@components/shared/RemixIcon'
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

const mobileAutocompleteSx = {
  width: '100%',
  '& .MuiOutlinedInput-root': { borderRadius: 2 }
}

const drawerAutocompleteSlotProps = {
  popper: {
    className: 'world-cup-filters-drawer__popper',
    placement: 'top-start',
    modifiers: [
      { name: 'offset', options: { offset: [0, 6] } },
      { name: 'flip', enabled: false },
      { name: 'preventOverflow', options: { padding: 12, altAxis: true } }
    ]
  },
  listbox: {
    sx: { maxHeight: 240 }
  }
}

const phaseLabel = value => (value === 'all' ? 'Todas las fases' : value)
const stadiumLabel = value => (value === 'all' ? 'Todos los estadios' : value)
const teamLabel = team => {
  if (!team || team.code === 'all') return 'Todas las selecciones'

  return `${getFifaDisplayCode(team.code)} · ${team.name}`
}

const countAdvancedFilters = (phase, stadium, teamCode) =>
  [phase !== 'all', stadium !== 'all', teamCode !== 'all'].filter(Boolean).length

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
  onQuickFilterChange,
  filtersOpen,
  onFiltersOpenChange
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const modalOpen = filtersOpen ?? internalOpen
  const setModalOpen = onFiltersOpenChange ?? setInternalOpen

  const quickOptions = worldCupQuickFilters.filter(option => option.id !== 'all')
  const phaseOptions = ['all', ...phases]
  const stadiumOptions = ['all', ...stadiums]
  const teamOptions = [ALL_TEAMS, ...teams]
  const selectedTeam =
    teamCode === 'all' ? ALL_TEAMS : teams.find(team => team.code === teamCode) ?? ALL_TEAMS
  const activeAdvancedCount = countAdvancedFilters(phase, stadium, teamCode)

  const renderAutocompleteFields = (layout = 'desktop') => {
    const fieldSx = layout === 'mobile' ? mobileAutocompleteSx : autocompleteSx
    const mobileProps =
      layout === 'mobile' ? { size: 'small', slotProps: drawerAutocompleteSlotProps } : { size: 'small' }

    const fieldProps = {
      disableClearable: true,
      sx: fieldSx,
      ...mobileProps
    }

    return (
      <>
        <Autocomplete
          {...fieldProps}
          options={phaseOptions}
          value={phase}
          onChange={(_, value) => onPhaseChange(value ?? 'all')}
          getOptionLabel={phaseLabel}
          isOptionEqualToValue={(a, b) => a === b}
          renderInput={params => <TextField {...params} label='Fase' />}
        />

        <Autocomplete
          {...fieldProps}
          options={stadiumOptions}
          value={stadium}
          onChange={(_, value) => onStadiumChange(value ?? 'all')}
          getOptionLabel={stadiumLabel}
          isOptionEqualToValue={(a, b) => a === b}
          renderInput={params => <TextField {...params} label='Estadio' />}
        />

        <Autocomplete
          {...fieldProps}
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
          renderInput={params => (
            <TextField {...params} label='Selección' placeholder='Buscar selección' />
          )}
        />
      </>
    )
  }

  const quickFilters = (
    <ToggleButtonGroup
      exclusive
      size='small'
      color='primary'
      value={quickFilter === 'all' ? null : quickFilter}
      onChange={(_, value) => onQuickFilterChange(value ?? 'all')}
      className='world-cup-quick-filters'
      sx={{ flexWrap: { xs: 'nowrap', sm: 'wrap' }, gap: 0.5 }}
    >
      {quickOptions.map(option => (
        <ToggleButton
          key={option.id}
          value={option.id}
          sx={{
            fontWeight: 700,
            textTransform: 'none',
            px: { xs: 2, sm: 3.5 },
            flexShrink: 0
          }}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )

  const resetAdvancedFilters = () => {
    onPhaseChange('all')
    onStadiumChange('all')
    onTeamChange('all')
  }

  return (
    <Stack spacing={{ xs: 0, md: 2.5 }} className='world-cup-matches-filters' sx={{ mb: { md: 3 } }}>
      <Stack
        direction='row'
        spacing={1.5}
        sx={{ display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap' }}
      >
        {renderAutocompleteFields('desktop')}
      </Stack>

      <Drawer
        anchor='bottom'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className='world-cup-filters-drawer'
        slotProps={{
          paper: { className: 'world-cup-filters-drawer__paper' },
          backdrop: { className: 'world-cup-filters-drawer__backdrop' }
        }}
      >
        <Box className='world-cup-filters-drawer__handle' aria-hidden />

        <Box className='world-cup-filters-drawer__header'>
          <Box className='world-cup-filters-drawer__header-row'>
            <Box sx={{ minWidth: 0, pr: 1 }}>
              <Typography variant='h6' fontWeight={700} sx={{ lineHeight: 1.25 }}>
                Filtros
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                Fase, estadio o selección
              </Typography>
            </Box>
            <IconButton
              size='small'
              onClick={() => setModalOpen(false)}
              aria-label='Cerrar filtros'
              className='world-cup-filters-drawer__close'
            >
              <RemixIcon icon='ri-close-line' size='sm' />
            </IconButton>
          </Box>
        </Box>

        <Box className='world-cup-filters-drawer__fields'>{renderAutocompleteFields('mobile')}</Box>

        <Box className='world-cup-filters-drawer__actions'>
          <Button
            variant='outlined'
            fullWidth
            onClick={resetAdvancedFilters}
            disabled={activeAdvancedCount === 0}
            className='world-cup-filters-drawer__clear'
          >
            Limpiar
          </Button>
          <Button variant='contained' fullWidth onClick={() => setModalOpen(false)}>
            Ver resultados
          </Button>
        </Box>
      </Drawer>

      <Box className='world-cup-quick-filters-scroll'>{quickFilters}</Box>
    </Stack>
  )
}

export const WorldCupMatchesFiltersButton = ({
  phase,
  stadium,
  teamCode,
  onOpen
}) => {
  const activeAdvancedCount = countAdvancedFilters(phase, stadium, teamCode)

  return (
    <Badge
      color='primary'
      badgeContent={activeAdvancedCount}
      invisible={activeAdvancedCount === 0}
      overlap='circular'
    >
      <Button
        size='small'
        variant='outlined'
        color='inherit'
        onClick={onOpen}
        startIcon={<RemixIcon icon='ri-filter-3-line' size='sm' />}
        sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
      >
        Filtros
      </Button>
    </Badge>
  )
}

export default WorldCupMatchesFilters
