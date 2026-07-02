import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

export const DashboardPageLoading = () => (
  <div className='page-stack flex flex-col gap-6'>
    <div className='page-stack-sm flex flex-col gap-2'>
      <Skeleton variant='rounded' animation='wave' height={36} width='40%' />
      <Skeleton variant='rounded' animation='wave' height={20} width='70%' />
    </div>
    <Skeleton variant='rounded' animation='wave' height={72} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation='wave' height={320} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation='wave' height={280} sx={{ borderRadius: 2 }} />
  </div>
)

export const PredictionsPageLoading = () => (
  <div className='page-stack flex flex-col gap-6'>
    <Skeleton variant='rounded' animation='wave' height={36} width='45%' />
    <Skeleton variant='rounded' animation='wave' height={64} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation='wave' height={220} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation='wave' height={220} sx={{ borderRadius: 2 }} />
  </div>
)

export const WorldCupMatchesTabLoading = () => (
  <Stack spacing={2} className='world-cup-matches-tab-loading world-cup-matches-tab__day-group'>
    <Skeleton
      variant='rounded'
      animation='wave'
      className='world-cup-matches-tab-loading__day'
      height={28}
      width='42%'
    />
    <Skeleton
      variant='rounded'
      animation='wave'
      className='world-cup-matches-tab-loading__card'
      height={188}
      sx={{ borderRadius: '1.25rem', width: '100%' }}
    />
    <Skeleton
      variant='rounded'
      animation='wave'
      className='world-cup-matches-tab-loading__card'
      height={188}
      sx={{ borderRadius: '1.25rem', width: '100%' }}
    />
  </Stack>
)

export const WorldCupHubPageLoading = () => (
  <div className='page-stack world-cup-hub-page world-cup-hub-page-loading flex flex-col'>
    <Skeleton
      variant='rounded'
      animation='wave'
      className='world-cup-hub-page-loading__back'
      height={24}
      width='38%'
    />

    <Skeleton
      variant='rounded'
      animation='wave'
      className='world-cup-hub-page-loading__tabs'
      height={40}
      sx={{ width: '100%', borderRadius: 1 }}
    />

    <Skeleton
      variant='rounded'
      animation='wave'
      className='world-cup-hub-page-loading__prob-bar'
      height={32}
      sx={{ width: '100%', borderRadius: 999 }}
    />

    <Stack spacing={0} className='world-cup-matches-tab world-cup-hub-page-loading__matches'>
      <Stack spacing={0.75} className='world-cup-matches-tab__header world-cup-hub-page-loading__header'>
        <Skeleton
          variant='rounded'
          animation='wave'
          className='world-cup-matches-tab-loading__title'
          height={28}
          width='38%'
        />
        <Skeleton
          variant='rounded'
          animation='wave'
          className='world-cup-matches-tab-loading__count'
          height={16}
          width='28%'
        />
        <Skeleton
          variant='rounded'
          animation='wave'
          className='world-cup-matches-tab-loading__filters-btn'
          height={32}
          width={108}
          sx={{ borderRadius: 999 }}
        />
      </Stack>

      <Skeleton
        variant='rounded'
        animation='wave'
        className='world-cup-hub-page-loading__quick-filters'
        height={36}
        sx={{ width: '100%', maxWidth: 360, borderRadius: 999 }}
      />

      <WorldCupMatchesTabLoading />
    </Stack>
  </div>
)
