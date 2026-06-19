import Typography from '@mui/material/Typography'

const ComingSoonView = ({ title, description }) => (
  <div className='page-stack flex flex-col gap-4'>
    <div className='page-stack-sm flex flex-col gap-2'>
      <Typography variant='h4'>{title}</Typography>
      {description ? (
        <Typography color='text.secondary'>{description}</Typography>
      ) : null}
    </div>
    <Typography color='text.secondary' variant='body2'>
      Sección en desarrollo. Próximamente disponible.
    </Typography>
  </div>
)

export default ComingSoonView
