'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import RemixIcon from '@components/shared/RemixIcon'
import CountryFlag from '@/components/shared/CountryFlag'
import { worldCupTitleProbabilities } from '@/data/competitions/worldCupHub'

const TOP_COUNT = 5

const WorldCupTitleProbabilityBar = () => {
  const topTeams = worldCupTitleProbabilities.slice(0, TOP_COUNT)
  const maxValue = topTeams[0]?.value ?? 1

  return (
    <Card variant='outlined' sx={{ mb: 3, mt: 0.75 }}>
      <CardContent
        sx={{
          py: 3.25,
          px: { xs: 2.5, md: 4 },
          '&:last-child': { pb: 3.25 }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: { xs: 2, md: 2.5 },
            width: '100%',
            minWidth: 0
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              flexShrink: 0,
              color: 'primary.main'
            }}
          >
            <RemixIcon icon='ri-trophy-line' size='md' />
            <Typography variant='body2' fontWeight={600} sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
              Probabilidad de título
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: { xs: 2, md: 2.75 },
              flex: 1,
              minWidth: 0,
              overflowX: 'auto',
              flexWrap: 'nowrap',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {topTeams.map(item => (
              <Box
                key={item.code}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  flexShrink: 0
                }}
              >
                <CountryFlag code={item.code} size={18} variant='sphere' />
                <Typography variant='caption' fontWeight={700} color='text.secondary' sx={{ minWidth: 26 }}>
                  {item.label}
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 5,
                    borderRadius: 999,
                    bgcolor: 'action.hover',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(item.value / maxValue) * 100}%`,
                      borderRadius: 999,
                      bgcolor: 'primary.main'
                    }}
                  />
                </Box>
                <Typography variant='caption' color='text.secondary' sx={{ minWidth: 34, textAlign: 'right' }}>
                  {item.value}%
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ flexShrink: 0, ml: 'auto' }}>
            <Link
              href='/predictions'
              className='text-primary font-semibold text-sm whitespace-nowrap no-underline hover:underline'
            >
              Haz tu pronóstico →
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default WorldCupTitleProbabilityBar
