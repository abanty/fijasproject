'use client'

// Next Imports
import { usePathname } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import HeaderDropdownMenu from './HeaderDropdownMenu'

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

        return (
          <Typography
            key={item.href}
            component={Link}
            href={item.href}
            className={classnames('flex items-center gap-2 font-medium plb-3 pli-1.5 hover:text-primary', {
              'text-primary': isActive
            })}
            color='text.primary'
          >
            <i className={classnames(item.icon, 'text-lg')} />
            {item.label}
          </Typography>
        )
      })}
      <HeaderDropdownMenu />
    </div>
  )
}

export default FrontMenu
