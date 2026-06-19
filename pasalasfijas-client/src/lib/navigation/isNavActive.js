export const isNavActive = (pathname, href) => {
  if (pathname === href) return true

  if (href === '/dashboard' && (pathname === '/home' || pathname === '/')) {
    return true
  }

  if (href === '/matches' && pathname.startsWith('/matches')) {
    return true
  }

  return false
}

export const isSidebarNavActive = (pathname, item) => {
  if (!item?.active) return false

  return isNavActive(pathname, item.href)
}
