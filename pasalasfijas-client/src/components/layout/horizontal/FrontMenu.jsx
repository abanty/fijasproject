'use client'

// Next Imports
import { usePathname } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import NavItemBadge from '@/components/navigation/NavItemBadge'
import RemixIcon from '@/components/shared/RemixIcon'

// Data Imports
import horizontalMenuData from '@/data/navigation/horizontalMenuData'

// Util Imports
import { isNavActive } from '@/lib/navigation/isNavActive'

const FrontMenu = () => {
  const pathname = usePathname()
  const items = horizontalMenuData()

  return (
    <div className='header-nav-row flex items-center flex-wrap gap-x-4 gap-y-3'>
      {items.map(item => {
        const isActive = isNavActive(pathname, item.href)
        const highlightText = item.highlight?.badge ?? item.highlight?.label
        const ariaLabel = highlightText ? `${item.label}, ${highlightText}` : item.label

        return (
          <Typography
            key={item.href}
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
      })}
    </div>
  )
}

export default FrontMenu
