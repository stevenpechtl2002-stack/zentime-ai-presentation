import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    stars: 5,
    quote: 'Seit ZenTime AI haben wir keinen einzigen Anruf mehr verpasst. Unsere Kunden sind begeistert und wir können uns endlich voll auf die Arbeit konzentrieren.',
    name: 'Thomas M.',
    role: 'Kfz-Werkstatt, München',
  },
  {
    stars: 5,
    quote: 'Die Stimme klingt echter als unsere alte Rezeptionistin! Patienten merken oft gar nicht, dass sie mit einer KI sprechen. Absolute Empfehlung.',
    name: 'Dr. Sarah K.',
    role: 'Zahnarztpraxis, Hamburg',
  },
  {
    stars: 5,
    quote: 'ROI bereits im ersten Monat erreicht. Allein durch die Termine, die früher ins Leere liefen, haben wir drei neue Objekte akquiriert.',
    name: 'Marco R.',
    role: 'Immobilienmakler, Berlin',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#c9a84c', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        onEnter: () => setInView(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
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
          Erfahrungen
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '4rem',
        }}>
          Was Kunden sagen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease: 'easeOut' }}
              style={{
                padding: '2.5rem',
                background: 'linear-gradient(145deg, rgba(201,168,76,0.06) 0%, rgba(8,8,8,0.9) 100%)',
                border: '1px solid rgba(201,168,76,0.12)',
                borderRadius: '20px',
              }}
            >
              <Stars count={r.stars} />
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'rgba(245,245,245,0.8)',
                lineHeight: 1.7,
                margin: '1.5rem 0',
              }}>
                "{r.quote}"
              </p>
              <div style={{ width: '30px', height: '1px', background: 'rgba(201,168,76,0.3)', marginBottom: '1rem' }} />
              <div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem', fontWeight: 600,
                  color: '#c9a84c',
                }}>
                  — {r.name}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(245,245,245,0.4)',
                  marginTop: '0.25rem',
                }}>
                  {r.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
