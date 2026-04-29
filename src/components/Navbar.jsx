import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Start' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Lösung' },
  { id: 'how', label: 'Wie es funktioniert' },
  { id: 'benefits', label: 'Vorteile' },
  { id: 'compare', label: 'Vergleich' },
  { id: 'industries', label: 'Branchen' },
  { id: 'pricing', label: 'Preise' },
  { id: 'cta', label: 'Kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      }}
    >
      <button
        onClick={() => scrollTo('hero')}
        className="flex items-center gap-2 text-xl font-bold"
        style={{ fontFamily: 'Playfair Display, serif', color: '#c9a84c' }}
      >
        <span style={{ fontSize: '1.4rem' }}>☯</span>
        <span>ZenTime AI</span>
      </button>

      <div className="hidden md:flex items-center gap-6">
        {sections.slice(1).map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="text-xs font-medium tracking-widest uppercase transition-colors duration-300"
            style={{ color: 'rgba(245,245,245,0.5)', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={(e) => (e.target.style.color = '#c9a84c')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(245,245,245,0.5)')}
          >
            {s.label}
          </button>
        ))}
      </div>
    </motion.nav>
  )
}
