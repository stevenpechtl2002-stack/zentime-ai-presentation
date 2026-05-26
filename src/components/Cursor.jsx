import { useEffect, useRef } from 'react'

export default function Cursor() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[9998]"
      style={{
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  )
}
