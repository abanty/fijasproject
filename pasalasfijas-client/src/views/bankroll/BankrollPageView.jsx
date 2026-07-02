'use client'

import { useState } from 'react'

import Typography from '@mui/material/Typography'

import BankrollSetup from '@/components/bankroll/BankrollSetup'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import BankrollView from '@/views/bankroll'
import { useCachedQuery } from '@/hooks/useCachedQuery'
import { queryKeys } from '@/lib/query/queryKeys'
import { getBankrollSummary } from '@/services/bankrollService'

const BankrollPageView = () => {
  const [createdBankroll, setCreatedBankroll] = useState(null)
  const { data: bankroll, isLoading } = useCachedQuery(queryKeys.bankroll.summary, getBankrollSummary, {
    onError: () => null
  })

  const activeBankroll = createdBankroll ?? bankroll

  if (isLoading && !createdBankroll) return <DashboardPageLoading />

  if (!activeBankroll) {
    return (
      <div className='page-stack flex flex-col gap-6'>
        <div>
          <Typography variant='h4'>Mi banca</Typography>
          <Typography color='text.secondary'>
            Vista inicial para tracking interno. La app no procesa apuestas reales.
          </Typography>
        </div>
        <BankrollSetup onCreated={setCreatedBankroll} />
      </div>
    )
  }

  return <BankrollView bankroll={activeBankroll} />
}

export default BankrollPageView
