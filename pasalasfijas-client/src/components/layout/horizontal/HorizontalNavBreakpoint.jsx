'use client'

import { useEffect, useRef } from 'react'

import useMediaQuery from '@mui/material/useMediaQuery'

import useHorizontalNav from '@menu/hooks/useHorizontalNav'

const HorizontalNavBreakpoint = () => {
  const { updateIsBreakpointReached } = useHorizontalNav()
  const isBelowLg = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const prev = useRef(isBelowLg)

  useEffect(() => {
    if (prev.current === isBelowLg) return
    prev.current = isBelowLg
    updateIsBreakpointReached(isBelowLg)
  }, [isBelowLg, updateIsBreakpointReached])

  useEffect(() => {
    updateIsBreakpointReached(isBelowLg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default HorizontalNavBreakpoint
