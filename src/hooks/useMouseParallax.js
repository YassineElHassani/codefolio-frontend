import { useEffect, useRef, useState } from 'react'

export const useMouseParallax = (strength = 18) => {
  const frame = useRef(0)
  const latest = useRef({ x: 0, y: 0 })
  const [style, setStyle] = useState({ transform: 'translate3d(0px, 0px, 0)' })

  useEffect(() => {
    const handlePointer = event => {
      const { innerWidth, innerHeight } = window
      const x = ((event.clientX / innerWidth) - 0.5) * strength
      const y = ((event.clientY / innerHeight) - 0.5) * strength
      latest.current = { x, y }
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          frame.current = 0
          setStyle({ transform: `translate3d(${latest.current.x}px, ${latest.current.y}px, 0)` })
        })
      }
    }

    window.addEventListener('pointermove', handlePointer)
    return () => {
      window.removeEventListener('pointermove', handlePointer)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [strength])

  return style
}
