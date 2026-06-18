import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import CharacterFigure from '@/components/card-statistics/CharacterFigure'

const PageIntroWithCharacter = ({ title, subtitle, imageSrc, imageAlt, children }) => (
  <Card className='relative overflow-visible'>
    <CardContent className='relative p-4 sm:p-5'>
      <div className='max-is-[calc(100%-6rem)] sm:max-is-[calc(100%-9rem)]'>
        <Typography variant='h4' component='h1'>
          {title}
        </Typography>
        {subtitle ? (
          <Typography color='text.secondary' className='mbs-1'>
            {subtitle}
          </Typography>
        ) : null}
        {children}
      </div>
      {imageSrc ? <CharacterFigure src={imageSrc} alt={imageAlt ?? title} className='md:bs-48' /> : null}
    </CardContent>
  </Card>
)

export default PageIntroWithCharacter
