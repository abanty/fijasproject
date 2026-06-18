'use client'

import Typography from '@mui/material/Typography'

import AdPromoBanner from '@/components/ads/AdPromoBanner'
import { mockAdPromotions } from '@/data/mock/adPromotions'

const RIGHT_PANEL_WIDTH = 336

const RightPanelContent = () => (
  <div className='right-panel-nav-shell flex flex-col gap-3'>
    <div className='flex items-start gap-2'>
      <Typography variant='subtitle1' className='right-panel-title leading-snug flex-1' sx={{ fontWeight: 700 }}>
        Mejores bonos de apuestas
      </Typography>
      <span className='text-2xl leading-none' aria-hidden>
        ⚽
      </span>
    </div>
    <div className='right-panel-nav-scroll flex flex-col gap-3'>
      {mockAdPromotions.map(({ id, ...promo }) => (
        <AdPromoBanner key={id} {...promo} />
      ))}
    </div>
    <Typography variant='caption' color='text.disabled' className='text-center leading-snug'>
      Contenido promocional. Enlaces de afiliado configurables desde el backend.
    </Typography>
  </div>
)

const FixedRightPanel = () => (
  <div className='app-right-panel-column hidden xl:flex'>
    <aside className='app-right-panel'>
      <RightPanelContent />
    </aside>
  </div>
)

export { RIGHT_PANEL_WIDTH }
export default FixedRightPanel
