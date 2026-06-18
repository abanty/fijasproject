// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const HorizontalWithSubtitle = props => {
  const {
    title,
    stats,
    avatarIcon,
    avatarColor,
    trend,
    trendNumber,
    subtitle,
    avatarSize = 42
  } = props

  return (
    <Card className='bs-full'>
      <CardContent className='flex justify-between gap-3 pbe-4'>
        <div className='flex flex-col gap-0.5 flex-grow min-is-0'>
          <Typography color='text.primary' variant='body2'>
            {title}
          </Typography>
          <div className='flex items-center gap-2 flex-wrap'>
            <Typography variant='h5'>{stats}</Typography>
            {trendNumber != null && trendNumber !== '' ? (
              <Typography color={trend === 'negative' ? 'error.main' : 'success.main'} variant='body2'>
                {`(${trend === 'negative' ? '-' : '+'}${trendNumber})`}
              </Typography>
            ) : null}
          </div>
          {subtitle ? (
            <Typography variant='caption' color='text.secondary'>
              {subtitle}
            </Typography>
          ) : null}
        </div>
        <CustomAvatar color={avatarColor} skin='light' variant='rounded' size={avatarSize} className='shrink-0'>
          <i className={classnames(avatarIcon, avatarSize <= 36 ? 'text-[20px]' : 'text-[26px]')} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

export default HorizontalWithSubtitle
