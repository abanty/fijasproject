'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import ClickAwayListener from '@mui/material/ClickAwayListener'
import Fade from '@mui/material/Fade'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import Link from '@components/Link'
import NavItemBadge from '@/components/navigation/NavItemBadge'
import RemixIcon from '@/components/shared/RemixIcon'

import { useSettings } from '@core/hooks/useSettings'

import horizontalMenuData from '@/data/navigation/horizontalMenuData'

import { isNavActive, isNavGroupActive } from '@/lib/navigation/isNavActive'

const HeaderNavLink = ({ item, pathname }) => {
  const isActive = isNavActive(pathname, item.href)
  const highlightText = item.highlight?.badge ?? item.highlight?.label
  const ariaLabel = highlightText ? `${item.label}, ${highlightText}` : item.label

  return (
    <Typography
      component={Link}
      href={item.href}
      aria-label={ariaLabel}
      className={classnames(
        'header-nav-link inline-flex max-is-full font-medium plb-3 pli-1.5 hover:text-primary',
        {
          'text-primary': isActive,
          'header-nav-link--badged': item.highlight
        }
      )}
      color='text.primary'
    >
      <NavItemBadge highlight={item.highlight}>
        <RemixIcon icon={item.icon} size='lg' />
        {item.label}
      </NavItemBadge>
    </Typography>
  )
}

const HeaderNavGroup = ({ item, pathname }) => {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { settings } = useSettings()
  const isActive = isNavGroupActive(pathname, item)

  const handleToggle = () => setOpen(prev => !prev)

  const handleClose = event => {
    if (anchorRef.current?.contains(event?.target)) return
    setOpen(false)
  }

  return (
    <>
      <Typography
        ref={anchorRef}
        component='button'
        type='button'
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={handleToggle}
        className={classnames(
          'header-nav-link inline-flex max-is-full items-center gap-1 font-medium plb-3 pli-1.5 hover:text-primary border-0 bg-transparent cursor-pointer',
          { 'text-primary': isActive }
        )}
        color='text.primary'
      >
        <RemixIcon icon={item.icon} size='lg' />
        {item.label}
        <i className={classnames('ri-arrow-down-s-line text-lg transition-transform', { 'rotate-180': open })} />
      </Typography>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-start'
        anchorEl={anchorRef.current}
        modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
        className='header-nav-dropdown z-[1300]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper
              elevation={settings.skin === 'bordered' ? 0 : 10}
              className={classnames(
                'header-nav-dropdown-paper',
                settings.skin === 'bordered' && 'border shadow-none'
              )}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList className='header-nav-dropdown-list'>
                  {item.children.map(child => (
                    <MenuItem
                      key={child.href}
                      component={Link}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      selected={isNavActive(pathname, child.href)}
                      className='header-nav-dropdown-item gap-3'
                    >
                      <RemixIcon icon={child.icon} size='md' />
                      {child.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

const FrontMenu = () => {
  const pathname = usePathname()
  const items = horizontalMenuData()

  return (
    <div className='header-nav-row flex items-center flex-wrap gap-x-6 gap-y-3'>
      {items.map(item =>
        item.children?.length ? (
          <HeaderNavGroup key={item.id} item={item} pathname={pathname} />
        ) : (
          <HeaderNavLink key={item.href} item={item} pathname={pathname} />
        )
      )}
    </div>
  )
}

export default FrontMenu
