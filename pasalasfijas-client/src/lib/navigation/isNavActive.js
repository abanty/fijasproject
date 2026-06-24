export const isNavActive = (pathname, href) => {
  if (pathname === href) return true

  if (href === '/dashboard' && (pathname === '/home' || pathname === '/')) {
    return true
  }

  if (href === '/matches' && pathname.startsWith('/matches')) {
    return true
  }

  if (href === '/admin' && pathname.startsWith('/admin')) {
    return true
  }

  return false
}

export const isNavGroupActive = (pathname, item) => {
  if (!item?.children?.length) return false

  return item.children.some(child => isNavActive(pathname, child.href))
}

export const isSidebarNavActive = (pathname, item) => {
  if (!item?.active) return false

  return isNavActive(pathname, item.href)
}
