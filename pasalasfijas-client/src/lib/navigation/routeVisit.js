const visitedRoutes = new Set()

export const hasVisitedRoute = routeKey => visitedRoutes.has(routeKey)

export const markRouteVisited = routeKey => {
  if (routeKey) visitedRoutes.add(routeKey)
}
