'use client'

// React Imports
import { useMemo } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// MUI Imports
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'

// Hook Imports
import { useCurrentUser } from '@/hooks/useCurrentUser'

// Data Imports
import { getSidebarMenuData } from '@/data/navigation/navigationCatalog'

// Util Imports
import { isSidebarNavActive } from '@/lib/navigation/isNavActive'

const isAdminRole = role => role === 'ADMIN' || role === 'SUPER_ADMIN'

const SidebarNavContent = () => {
  const pathname = usePathname()
  const { user } = useCurrentUser()
  const isAdmin = isAdminRole(user?.role)
  const sections = useMemo(() => getSidebarMenuData({ isAdmin }), [isAdmin])

  return (
    <div className='app-sidebar-nav-scroll'>
      <PerfectScrollbar
        className='flex flex-col gap-5'
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
        options={{ wheelPropagation: false, suppressScrollX: true }}
      >
        {sections.map(section => (
          <div key={section.section} className='flex flex-col gap-3'>
            <Typography variant='captionSidebar' className='sidebar-section-label px-2'>
              {section.section}
            </Typography>
            <List disablePadding className='flex flex-col gap-1.5'>
              {section.items.map(item => {
                const active = isSidebarNavActive(pathname, item)

                return (
                  <ListItemButton
                    key={item.id}
                    component={Link}
                    href={item.href}
                    selected={active}
                    className={classnames('sidebar-nav-item', {
                      'sidebar-nav-item-active': active
                    })}
                  >
                    <ListItemIcon className='min-is-9'>
                      <RemixIcon icon={item.icon} size='md' />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          variant: 'body2',
                          className: 'sidebar-nav-item-label',
                          sx: { color: 'inherit' }
                        }
                      }}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          </div>
        ))}
      </PerfectScrollbar>
    </div>
  )
}

const FixedSidebarNav = () => (
  <div className='app-sidebar-column hidden min-[1200px]:flex'>
    <aside className='app-sidebar'>
      <SidebarNavContent />
    </aside>
  </div>
)

export default FixedSidebarNav
