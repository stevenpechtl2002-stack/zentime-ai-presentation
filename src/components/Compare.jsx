import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const rows = [
  { label: 'Kosten', zen: '500€ / Monat', human: '3.500€ / Monat', zenCheck: true },
  { label: 'Verfügbarkeit', zen: '24 / 7 / 365', human: '8 Std / Tag', zenCheck: true },
  { label: 'Urlaub', zen: 'Nie', human: '30 Tage / Jahr', zenCheck: true },
  { label: 'Krankheit', zen: 'Nie', human: 'Mehrmals / Jahr', zenCheck: true },
  { label: 'Fehler', zen: 'Minimal', human: 'Menschlich', zenCheck: true },
  { label: 'Setup-Zeit', zen: '24 Stunden', human: 'Wochen', zenCheck: true },
]

export default function Compare() {
  const sectionRef = useRef(null)
  const [visibleRows, setVisibleRows] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          let count = 0
          const interval = setInterval(() => {
            count++
            setVisibleRows(count)
            if (count >= rows.length) clearInterval(interval)
          }, 250)
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="compare"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0a0a 100%)' }}
    >
      <div className="max-w-5xl w-full">
        <div style={{
          fontSize: '0.75rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          Der Vergleich
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '4rem',
        }}>
          ZenTime AI vs. <span style={{ color: 'rgba(245,245,245,0.4)' }}>Mensch</span>
        </h2>

        {/* Table */}
        <div style={{
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div className="grid grid-cols-3" style={{
            background: 'rgba(201,168,76,0.05)',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
          }}>
            <div style={{ padding: '1.5rem 2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(245,245,245,0.4)', textTransform: 'uppercase' }}>
              Kriterium
            </div>
            <div style={{
              padding: '1.5rem 2rem', textAlign: 'center',
              fontFamily: 'Playfair Display, serif', fontSize: '1.1rem',
              color: '#c9a84c', fontWeight: 700,
              background: 'rgba(201,168,76,0.06)',
              borderLeft: '1px solid rgba(201,168,76,0.15)',
              borderRight: '1px solid rgba(201,168,76,0.15)',
            }}>
              ☯ ZenTime AI
            </div>
            <div style={{ padding: '1.5rem 2rem', textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'rgba(245,245,245,0.5)', fontWeight: 600 }}>
              Mensch
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3"
              style={{
                borderBottom: i < rows.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none',
                opacity: visibleRows > i ? 1 : 0,
                transform: visibleRows > i ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div style={{
                padding: '1.25rem 2rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(245,245,245,0.7)',
                display: 'flex', alignItems: 'center',
              }}>
                {row.label}
              </div>
              <div style={{
                padding: '1.25rem 2rem',
                background: 'rgba(201,168,76,0.04)',
                borderLeft: '1px solid rgba(201,168,76,0.1)',
                borderRight: '1px solid rgba(201,168,76,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}>
                <span style={{ color: '#22c55e', fontSize: '1rem' }}>✓</span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#c9a84c',
                }}>
                  {row.zen}
                </span>
              </div>
              <div style={{
                padding: '1.25rem 2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(245,245,245,0.4)',
              }}>
                {row.human}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '2.5rem', textAlign: 'center',
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.1rem', fontStyle: 'italic',
          color: 'rgba(201,168,76,0.7)',
          opacity: visibleRows >= rows.length ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}>
          7× günstiger · 3× mehr verfügbar · 0× Ausfall
        </div>
      </div>
    </section>
  )
}
