import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const spring = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(pct)
      spring.set(pct)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [spring])

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100]" style={{ background: 'rgba(201,168,76,0.1)' }}>
      <motion.div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #c9a84c, #e4c46e)',
          boxShadow: '0 0 10px rgba(201,168,76,0.8)',
        }}
      />
    </div>
  )
}
