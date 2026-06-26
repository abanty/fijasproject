import { useCallback, useEffect, useRef } from 'react'

export const useHorizontalTouchScroll = () => {
  const ref = useRef(null)
  const touchAxisRef = useRef(null)

  const onTouchStart = useCallback(event => {
    const touch = event.touches[0]
    if (!touch) return

    touchAxisRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      axis: null
    }
  }, [])

  const onTouchMove = useCallback(event => {
    const state = touchAxisRef.current
    const touch = event.touches[0]

    if (!state || !touch) return

    const deltaX = touch.clientX - state.startX
    const deltaY = touch.clientY - state.startY

    if (!state.axis) {
      if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) return
      state.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
    }

    if (state.axis === 'x') {
      event.stopPropagation()
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    touchAxisRef.current = null
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const onMoveCapture = event => {
      if (touchAxisRef.current?.axis === 'x') {
        event.stopPropagation()
      }
    }

    node.addEventListener('touchmove', onMoveCapture, { capture: true, passive: true })

    return () => {
      node.removeEventListener('touchmove', onMoveCapture, { capture: true })
    }
  }, [])

  return {
    ref,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel: onTouchEnd
    }
  }
}
