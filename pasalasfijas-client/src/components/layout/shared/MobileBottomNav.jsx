'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { getBottomNavConfig } from '@/data/navigation/navigationCatalog'
import { isNavActive } from '@/lib/navigation/isNavActive'

const isAdminRole = role => role === 'ADMIN' || role === 'SUPER_ADMIN'

const navShortLabel = item => item.shortLabel ?? item.label

const MobileBottomNav = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useCurrentUser()
  const [moreOpen, setMoreOpen] = useState(false)

  const { primary, moreItems, moreAction } = useMemo(
    () => getBottomNavConfig({ isAdmin: isAdminRole(user?.role) }),
    [user?.role]
  )

  const activeId = useMemo(() => {
    const primaryMatch = primary.find(item => isNavActive(pathname, item.href))
    if (primaryMatch) return primaryMatch.id

    if (moreItems.some(item => isNavActive(pathname, item.href))) return moreAction.id

    return false
  }, [primary, moreItems, moreAction.id, pathname])

  const handleChange = (_, newValue) => {
    if (newValue === moreAction.id) {
      setMoreOpen(true)
      return
    }

    const target = primary.find(item => item.id === newValue)
    if (target?.href) router.push(target.href)
  }

  const handleMoreNavigate = href => {
    setMoreOpen(false)
    router.push(href)
  }

  return (
    <>
      <nav className='mobile-bottom-nav' aria-label='Navegación principal'>
        <BottomNavigation
          className='mobile-bottom-nav__bar'
          value={activeId}
          onChange={handleChange}
          showLabels
        >
          {primary.map(item => (
            <BottomNavigationAction
              key={item.id}
              className='mobile-bottom-nav__action'
              label={navShortLabel(item)}
              value={item.id}
              icon={<i className={`${item.icon} text-xl`} aria-hidden />}
            />
          ))}
          <BottomNavigationAction
            key={moreAction.id}
            className='mobile-bottom-nav__action'
            label={navShortLabel(moreAction)}
            value={moreAction.id}
            icon={<i className={`${moreAction.icon} text-xl`} aria-hidden />}
          />
        </BottomNavigation>
      </nav>

      <Drawer
        anchor='bottom'
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        className='mobile-bottom-nav-more'
        slotProps={{
          backdrop: { className: 'mobile-bottom-nav-more__backdrop' },
          paper: { className: 'mobile-bottom-nav-more__sheet', elevation: 8 }
        }}
      >
        <div className='mobile-bottom-nav-more__handle' aria-hidden />
        <List className='mobile-bottom-nav-more__list' disablePadding>
          {moreItems.map(item => (
            <ListItemButton
              key={item.id}
              selected={isNavActive(pathname, item.href)}
              onClick={() => handleMoreNavigate(item.href)}
              className='mobile-bottom-nav-more__item'
            >
              <ListItemIcon className='mobile-bottom-nav-more__icon'>
                <i className={item.icon} aria-hidden />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default MobileBottomNav
