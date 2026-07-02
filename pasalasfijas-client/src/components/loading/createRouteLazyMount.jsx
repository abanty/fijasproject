'use client'

import { Suspense, lazy, useEffect } from 'react'

import { hasVisitedRoute, markRouteVisited } from '@/lib/navigation/routeVisit'
import { hasCachedData } from '@/lib/query/queryCache'

export const createRouteLazyMount = ({ routeKey, cacheKey, getCacheKey, getLoading, loadView, Loading }) => {
  const LazyView = lazy(loadView)

  const RouteLazyMount = props => {
    const resolvedRouteKey = typeof routeKey === 'function' ? routeKey(props) : routeKey
    const resolvedCacheKey = getCacheKey?.(props) ?? cacheKey
    const hasCache = resolvedCacheKey ? hasCachedData(resolvedCacheKey) : false
    const firstVisit = !hasVisitedRoute(resolvedRouteKey)
    const showFallback = resolvedCacheKey ? firstVisit && !hasCache : firstVisit
    const Fallback = getLoading?.(props) ?? Loading

    useEffect(() => {
      markRouteVisited(resolvedRouteKey)
    }, [resolvedRouteKey])

    return (
      <Suspense fallback={showFallback ? <Fallback /> : null}>
        <LazyView {...props} />
      </Suspense>
    )
  }

  return RouteLazyMount
}
