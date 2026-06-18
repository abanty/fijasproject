import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import CharacterFigure from './CharacterFigure'

const CardStatWithImage = ({
  title,
  src,
  stats,
  trendNumber,
  trend = 'positive',
  chipText,
  chipColor = 'primary',
  imageAlt
}) => (
  <Card className='relative overflow-visible'>
    <CardContent className='relative p-4 sm:p-5'>
      <div className='max-is-[calc(100%-6rem)] sm:max-is-[calc(100%-8rem)]'>
        <Typography color='text.primary' className='font-medium'>
          {title}
        </Typography>
        {stats != null ? (
          <div className='flex items-center gap-2 flex-wrap pbs-3 pbe-1.5'>
            <Typography variant='h4'>{stats}</Typography>
            {trendNumber != null && trendNumber !== '' ? (
              <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
                {`${trend === 'negative' ? '-' : '+'}${trendNumber}`}
              </Typography>
            ) : null}
          </div>
        ) : null}
        {chipText ? <Chip label={chipText} color={chipColor} variant='tonal' size='small' /> : null}
      </div>
      {src ? <CharacterFigure src={src} alt={imageAlt ?? title} /> : null}
    </CardContent>
  </Card>
)

export default CardStatWithImage
