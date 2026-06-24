import Typography from '@mui/material/Typography'

import BankrollSummary from '@/components/bankroll/BankrollSummary'

const BankrollView = ({ bankroll }) => (
  <div className='page-stack flex flex-col gap-6'>
    <div>
      <Typography variant='h4'>Mi banca</Typography>
      <Typography color='text.secondary'>
        Vista inicial para tracking interno. La app no procesa apuestas reales.
      </Typography>
    </div>

    <BankrollSummary bankroll={bankroll} />
  </div>
)

export default BankrollView
