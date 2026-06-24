'use client'

import dynamic from 'next/dynamic'

import { DashboardPageLoading } from '@/components/loading/PageLoading'

const AdminPageView = dynamic(() => import('@/views/admin/AdminPageView'), {
  ssr: false,
  loading: () => <DashboardPageLoading />
})

export default function AdminDynamicMount() {
  return <AdminPageView />
}
