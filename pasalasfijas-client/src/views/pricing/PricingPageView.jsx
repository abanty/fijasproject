'use client'

import { useCallback, useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

import Pricing from '@components/pricing'
import { getPlans, getPricingPageData, mapPlansToPricingUI, upgradeSubscription } from '@/services/plansService'

const PricingPageView = () => {
  const [plans, setPlans] = useState(null)
  const [upgrading, setUpgrading] = useState(false)
  const [error, setError] = useState('')

  const loadPlans = useCallback(() => getPricingPageData().then(setPlans), [])

  useEffect(() => {
    let active = true

    loadPlans()
      .catch(() => {
        if (active) setPlans([])
      })

    return () => {
      active = false
    }
  }, [loadPlans])

  const handleUpgrade = async planCode => {
    setError('')
    setUpgrading(true)
    try {
      const subscriptionData = await upgradeSubscription(planCode)
      const { items } = await getPlans()
      setPlans(mapPlansToPricingUI(items, subscriptionData.tier))
    } catch {
      setError('No pudimos activar Premium. Intenta de nuevo.')
    } finally {
      setUpgrading(false)
    }
  }

  if (!plans) {
    return (
      <Card>
        <CardContent className='xl:!plb-16 xl:pli-[6.25rem] !pbs-10 !pbe-5 pli-5 sm:!p-16 flex flex-col gap-6'>
          <Skeleton variant='rounded' animation='wave' height={40} width='30%' className='self-center' />
          <Skeleton variant='rounded' animation='wave' height={360} />
          <Skeleton variant='rounded' animation='wave' height={360} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className='xl:!plb-16 xl:pli-[6.25rem] !pbs-10 !pbe-5 pli-5 sm:!p-16'>
        <Pricing data={plans} onUpgrade={handleUpgrade} upgrading={upgrading} error={error} />
      </CardContent>
    </Card>
  )
}

export default PricingPageView
