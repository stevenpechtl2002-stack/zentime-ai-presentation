import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const industries = [
  { icon: '🚗', title: 'Kfz-Werkstätten', desc: 'Terminbuchung & Fahrzeugannahme rund um die Uhr' },
  { icon: '🔧', title: 'Autowäschen & Tuning', desc: 'Termine & Anfragen automatisch entgegennehmen' },
  { icon: '💅', title: 'Beauty Salons', desc: 'Buchungen verwalten ohne Unterbrechung beim Kunden' },
  { icon: '💇', title: 'Friseure & Barbershops', desc: 'Kein verpasster Anruf mehr während der Arbeit am Kunden' },
  { icon: '💆', title: 'Massage & Wellness', desc: 'Termine buchen & Rückfragen automatisch beantworten' },
  { icon: '🏋️', title: 'Fitnessstudios', desc: 'Probetrainings buchen & Mitglieder betreuen' },
  { icon: '🍕', title: 'Restaurants', desc: 'Reservierungen & Lieferanfragen rund um die Uhr' },
  { icon: '🍺', title: 'Bars & Clubs', desc: 'Tischreservierungen & Event-Anfragen automatisch' },
  { icon: '🏨', title: 'Hotels & Pensionen', desc: 'Buchungsanfragen & Check-in-Infos automatisieren' },
  { icon: '⚡', title: 'Handwerksbetriebe', desc: 'Kostenvoranfragen annehmen & Termine koordinieren' },
]

function IndustryCard({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: '220px',
        padding: '2rem 1.5rem',
        background: hovered
          ? 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(8,8,8,0.9) 100%)'
          : 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, rgba(8,8,8,0.7) 100%)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.1)'}`,
        borderRadius: '18px',
        textAlign: 'center',
        boxShadow: hovered ? '0 0 25px rgba(201,168,76,0.12)' : 'none',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.1rem', fontWeight: 700,
        color: hovered ? '#c9a84c' : '#f5f5f5',
        marginBottom: '0.5rem',
        transition: 'color 0.3s ease',
      }}>
        {item.title}
      </h3>
      <p style={{
        fontSize: '0.8rem',
        color: 'rgba(245,245,245,0.5)',
        lineHeight: 1.5,
        fontFamily: 'Inter, sans-serif',
      }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

export default function Industries() {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - containerRef.current.offsetLeft
    scrollLeft.current = containerRef.current.scrollLeft
  }
  const onMouseUp = () => { isDragging.current = false }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    containerRef.current.scrollLeft = scrollLeft.current - (x - startX.current)
  }

  return (
    <section
      id="industries"
      className="min-h-screen flex flex-col items-center justify-center py-24"
      style={{ background: '#080808', overflow: 'hidden' }}
    >
      <div className="w-full max-w-6xl px-8 mb-12">
        <div style={{
          fontSize: '0.75rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          Für wen ist es?
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center',
        }}>
          Ihre Branche ist dabei
        </h2>
      </div>

      {/* Gradient fade edges */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(90deg, #080808, transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(-90deg, #080808, transparent)',
          pointerEvents: 'none',
        }} />

        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          style={{
            display: 'flex',
            gap: '1.5rem',
            padding: '2rem 6vw',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            userSelect: 'none',
          }}
        >
          <div ref={trackRef} style={{ display: 'flex', gap: '1.5rem' }}>
            {industries.map((item, i) => (
              <IndustryCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      <p style={{
        marginTop: '2rem',
        fontSize: '0.8rem',
        color: 'rgba(245,245,245,0.3)',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.15em',
      }}>
        ← Ziehen zum Scrollen →
      </p>
    </section>
  )
}
