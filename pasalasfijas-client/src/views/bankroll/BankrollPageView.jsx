'use client'

import { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'

import BankrollSetup from '@/components/bankroll/BankrollSetup'
import { DashboardPageLoading } from '@/components/loading/PageLoading'
import BankrollView from '@/views/bankroll'
import { getBankrollSummary } from '@/services/bankrollService'

const BankrollPageView = () => {
  const [bankroll, setBankroll] = useState(undefined)

  useEffect(() => {
    let active = true

    getBankrollSummary()
      .then(result => {
        if (active) setBankroll(result)
      })
      .catch(() => {
        if (active) setBankroll(null)
      })

    return () => {
      active = false
    }
  }, [])

  if (bankroll === undefined) return <DashboardPageLoading />

  if (!bankroll) {
    return (
      <div className='page-stack flex flex-col gap-6'>
        <div>
          <Typography variant='h4'>Mi banca</Typography>
          <Typography color='text.secondary'>
            Vista inicial para tracking interno. La app no procesa apuestas reales.
          </Typography>
        </div>
        <BankrollSetup onCreated={setBankroll} />
      </div>
    )
  }

  return <BankrollView bankroll={bankroll} />
}

export default BankrollPageView
