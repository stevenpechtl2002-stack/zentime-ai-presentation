import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const glow = glowRef.current
    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
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
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[9998]"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9999]"
        style={{
          background: '#c9a84c',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(201,168,76,0.8), 0 0 20px rgba(201,168,76,0.4)',
          transition: 'transform 0.05s linear',
        }}
      />
    </>
  )
}
