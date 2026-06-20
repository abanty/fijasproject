import Skeleton from '@mui/material/Skeleton'

export const DashboardPageLoading = () => (  <div className='page-stack flex flex-col gap-6'>
    <div className='page-stack-sm flex flex-col gap-2'>
      <Skeleton variant='rounded' animation="wave" height={36} width='40%' />
      <Skeleton variant='rounded' animation="wave" height={20} width='70%' />
    </div>
    <Skeleton variant='rounded' animation="wave" height={72} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation="wave" height={320} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation="wave" height={280} sx={{ borderRadius: 2 }} />
  </div>
)

export const PredictionsPageLoading = () => (
  <div className='page-stack flex flex-col gap-6'>
    <Skeleton variant='rounded' animation="wave" height={36} width='45%' />
    <Skeleton variant='rounded' animation="wave" height={64} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation="wave" height={220} sx={{ borderRadius: 2 }} />
    <Skeleton variant='rounded' animation="wave" height={220} sx={{ borderRadius: 2 }} />
  </div>
)
