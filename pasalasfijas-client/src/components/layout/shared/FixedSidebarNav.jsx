'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'

// Context Imports
import { useSidebarNav } from '@/contexts/sidebarNavContext'

// Data Imports
import sidebarMenuData from '@/data/navigation/sidebarMenuData'

// Util Imports
import { isSidebarNavActive } from '@/lib/navigation/isNavActive'

const SidebarNavContent = ({ onNavigate }) => {
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const sections = useMemo(() => sidebarMenuData(), [])

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) return sections

    return sections
      .map(section => ({
        ...section,
        items: section.items.filter(item => item.label.toLowerCase().includes(normalized))
      }))
      .filter(section => section.items.length > 0)
  }, [query, sections])

  return (
    <>
      {/* <div className='app-sidebar-search-bar'>
        <TextField
          size='small'
          className='app-sidebar-nav-search'
          placeholder='Buscar seccion...'
          value={query}
          onChange={event => setQuery(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <i className='ri-search-line remix-icon remix-icon--md sidebar-search-icon' />
                </InputAdornment>
              )
            }
          }}
        />
      </div> */}

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
        {filteredSections.map(section => (
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
                    onClick={onNavigate}
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
    </>
  )
}

const FixedSidebarNav = () => {
  const { mobileOpen, closeMobile } = useSidebarNav()

  return (
    <>
      <div className='app-sidebar-column hidden lg:flex'>
        <aside className='app-sidebar'>
          <SidebarNavContent />
        </aside>
      </div>

      <Drawer
        anchor='left'
        open={mobileOpen}
        onClose={closeMobile}
        slotProps={{ root: { keepMounted: true } }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            inlineSize: 'var(--sidebar-width)',
            boxSizing: 'border-box',
            blockSize: '100dvh',
            maxBlockSize: '100dvh'
          }
        }}
        className='app-sidebar-drawer'
      >
        <SidebarNavContent onNavigate={closeMobile} />
      </Drawer>
    </>
  )
}

export default FixedSidebarNav
