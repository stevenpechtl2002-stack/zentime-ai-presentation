import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  { icon: '💰', title: 'Kein verpasster Umsatz mehr', desc: 'Jeder Anruf wird beantwortet. Kein Kunde geht verloren.' },
  { icon: '⏰', title: '24/7 erreichbar', desc: 'Nachts, am Wochenende, an Feiertagen — immer da.' },
  { icon: '🤖', title: 'Kein extra Personal nötig', desc: 'Spart bis zu 3.000€/Monat im Vergleich zu einer Rezeptionistin.' },
  { icon: '📅', title: 'Automatische Terminbuchung', desc: 'Termine werden direkt in Ihren Kalender gebucht.' },
  { icon: '🌍', title: 'Mehrsprachig verfügbar', desc: 'Deutsch, Englisch, Türkisch und viele weitere Sprachen.' },
  { icon: '📊', title: 'Alle Gespräche aufgezeichnet', desc: 'Vollständige Transkripte und Zusammenfassungen jedes Anrufs.' },
]

const directions = [
  { x: -100, y: 0 },
  { x: 0, y: -100 },
  { x: 100, y: 0 },
  { x: -100, y: 0 },
  { x: 0, y: 100 },
  { x: 100, y: 0 },
]

function BenefitCard({ benefit, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setTilt({
      x: (e.clientY - cy) / rect.height * 12,
      y: -(e.clientX - cx) / rect.width * 12,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: directions[index].x, y: directions[index].y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={onMouseMove}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
          : 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: 'transform 0.2s ease',
        padding: '2.5rem',
        background: hovered
          ? 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(8,8,8,0.9) 100%)'
          : 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(8,8,8,0.8) 100%)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
        borderRadius: '20px',
        cursor: 'default',
        boxShadow: hovered
          ? '0 0 30px rgba(201,168,76,0.15), 0 20px 60px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>{benefit.icon}</div>
      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.25rem', fontWeight: 700,
        color: '#f5f5f5', marginBottom: '0.75rem',
      }}>
        {benefit.title}
      </h3>
      <p style={{
        fontSize: '0.9rem',
        color: 'rgba(245,245,245,0.55)',
        lineHeight: 1.6,
        fontFamily: 'Inter, sans-serif',
      }}>
        {benefit.desc}
      </p>
    </motion.div>
  )
}

export default function Benefits() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => setInView(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{ background: '#080808' }}
    >
      <div className="max-w-6xl w-full">
        <div style={{
          fontSize: '0.75rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          Ihre Vorteile
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '4rem',
        }}>
          Was Sie bekommen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <BenefitCard key={i} benefit={b} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
