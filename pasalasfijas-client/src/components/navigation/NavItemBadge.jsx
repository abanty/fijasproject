'use client'

import Badge from '@mui/material/Badge'

const NavItemBadge = ({ highlight, children }) => {
  if (!highlight?.badge && !highlight?.label) return children

  const { badge, label, color = 'error' } = highlight
  const badgeText = badge ?? label

  return (
    <Badge
      className='nav-highlight-badge-root'
      color={color}
      overlap='rectangular'
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      badgeContent={badgeText}
      slotProps={{
        badge: {
          className: 'nav-highlight-badge'
        }
      }}
    >
      <span className='nav-highlight-badge__anchor'>
        <span className='nav-highlight-badge__content'>{children}</span>
      </span>
    </Badge>
  )
}

export default NavItemBadge
