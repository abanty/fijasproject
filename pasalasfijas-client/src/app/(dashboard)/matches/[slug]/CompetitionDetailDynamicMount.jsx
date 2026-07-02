'use client'

import CompetitionDetailPage from '@/views/competitions/CompetitionDetailPage'

export default function CompetitionDetailDynamicMount({ slug }) {
  return <CompetitionDetailPage slug={slug} />
}
