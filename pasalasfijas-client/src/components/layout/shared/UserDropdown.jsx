'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import Link from '@components/Link'
import { useSettings } from '@core/hooks/useSettings'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { adminNavigationItems } from '@/data/navigation/navigationCatalog'
import { logout } from '@/services/authService'

const DEFAULT_AVATAR = '/images/avatars/1.png'

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const getDisplayName = user => {
  if (!user) return ''
  if (user.name?.trim()) return user.name.trim()
  if (user.profile?.firstName?.trim()) return user.profile.firstName.trim()
  return user.email?.split('@')[0] || ''
}

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const router = useRouter()
  const { settings } = useSettings()
  const { user } = useCurrentUser()

  const displayName = getDisplayName(user)
  const avatarSrc = user?.profile?.avatarUrl || DEFAULT_AVATAR
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = () => {
    logout()
    setOpen(false)
    router.replace('/login')
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={displayName}
          src={avatarSrc}
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1300]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper
              elevation={settings.skin === 'bordered' ? 0 : 10}
              className={settings.skin === 'bordered' ? 'border shadow-none' : undefined}
            >
              <ClickAwayListener onClickAway={handleDropdownClose}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar alt={displayName} src={avatarSrc} />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {displayName}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          letterSpacing: 'normal',
                          fontWeight: 400,
                          lineHeight: 1.35,
                          maxWidth: 168,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {user?.email || ''}
                      </Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  {isAdmin ? (
                    <MenuItem component={Link} href='/admin' onClick={handleDropdownClose}>
                      <i className={`${adminNavigationItems.operationsHub.icon} mie-2`} />
                      {adminNavigationItems.operationsHub.label}
                    </MenuItem>
                  ) : null}
                  <div className='flex items-center plb-2 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={handleUserLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
