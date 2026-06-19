'use client'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import HelpInfoTooltip from '@components/shared/HelpInfoTooltip'
import MatchHeader from '@/components/matches/MatchHeader'
import { useCompactDensity } from '@core/hooks/useCompactDensity'
import { predictionsHelp } from '@/lib/ui/predictionsHelp'
import ComboBetCard from './ComboBetCard'
import ConfidenceBadge from './ConfidenceBadge'
import PickBadge from './PickBadge'
import RiskScoreBadge from './RiskScoreBadge'
import StakeIndicator from './StakeIndicator'
import { formatMarket, formatOdd } from '@/lib/predictionFormatters'

const PredictionCard = ({ prediction, showCombo = true }) => {
  const compact = useCompactDensity()
  const analysis = prediction.analysis || {}
  const mainPick = analysis.mainPick
  const isNoBet = analysis.confidence === 'NO_BET' || !mainPick

  return (
    <Card>
      <CardHeader
        title={
          <MatchHeader
            homeTeam={prediction.homeTeam}
            awayTeam={prediction.awayTeam}
            homeCountryCode={prediction.homeCountryCode}
            awayCountryCode={prediction.awayCountryCode}
            competition={prediction.competition}
            kickoffAt={prediction.kickoffAt}
            titleVariant='h6'
            flagSize={compact ? 44 : 48}
          />
        }
        action={
          <div className='flex flex-wrap justify-end gap-2'>
            <ConfidenceBadge confidence={analysis.confidence} />
            <RiskScoreBadge riskScore={analysis.riskScore} />
          </div>
        }
      />
      <CardContent className={compact ? 'flex flex-col gap-4' : 'flex flex-col gap-5'}>
        <Typography color='text.secondary'>{analysis.summary}</Typography>

        {isNoBet ? (
          <Alert severity='warning' icon={<i className='ri-forbid-line' />}>
            <AlertTitle className='flex items-center gap-1'>
              NO BET
              <HelpInfoTooltip title={predictionsHelp.noBet} iconClassName='ri-question-line' />
            </AlertTitle>
          </Alert>
        ) : (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <div className='rounded bg-actionHover p-4 flex flex-col gap-3'>
                <div className='flex flex-wrap items-center gap-2'>
                  <PickBadge market={mainPick.market} />
                  <Chip size='small' variant='tonal' color='info' label={formatOdd(mainPick.odd)} />
                  <Chip size='small' variant='tonal' label={`EV ${mainPick.valueScore || 0}`} />
                </div>
                <Typography variant='h6'>{mainPick.selection}</Typography>
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <div className='rounded border p-4 bs-full'>
                <StakeIndicator stakeIndex={mainPick.stakeIndex} />
              </div>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className='rounded border p-4 bs-full'>
              <div className='flex items-center gap-1 mbe-2'>
                <Typography variant='subtitle2' className='font-medium'>
                  A favor
                </Typography>
                <HelpInfoTooltip title={predictionsHelp.reasonBet} iconClassName='ri-question-line' />
              </div>
              <Typography variant='body2' color='text.secondary'>
                {analysis.reasonToBet || '—'}
              </Typography>
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className='rounded border p-4 bs-full'>
              <div className='flex items-center gap-1 mbe-2'>
                <Typography variant='subtitle2' className='font-medium'>
                  Riesgos
                </Typography>
                <HelpInfoTooltip title={predictionsHelp.reasonAvoid} iconClassName='ri-question-line' />
              </div>
              <Typography variant='body2' color='text.secondary'>
                {analysis.reasonToAvoid || '—'}
              </Typography>
            </div>
          </Grid>
        </Grid>

        {!!analysis.alternativePicks?.length && (
          <>
            <Divider />
            <div className='flex flex-col gap-3'>
              <Typography variant='subtitle1' className='font-medium'>
                Alternativas
              </Typography>
              <div className='flex flex-wrap gap-2'>
                {analysis.alternativePicks.map(pick => (
                  <Chip
                    key={`${pick.market}-${pick.selection}`}
                    variant='tonal'
                    color='secondary'
                    size='small'
                    label={`${formatMarket(pick.market)} · ${pick.selection}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {showCombo && <ComboBetCard comboBet={analysis.comboBet} />}

        <div className='flex justify-end'>
          <Button variant='outlined' size='small' component={Link} href={`/matches?selected=${prediction.id}`}>
            Ver partido
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PredictionCard
