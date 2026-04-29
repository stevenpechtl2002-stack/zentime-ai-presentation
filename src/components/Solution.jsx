import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Waveform() {
  const bars = 32
  return (
    <div className="flex items-center justify-center gap-1" style={{ height: '60px' }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            borderRadius: '2px',
            background: 'linear-gradient(to top, #c9a84c, #e4c46e)',
            animation: `wave ${0.6 + (i % 5) * 0.15}s ease-in-out ${i * 0.04}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave {
          0% { height: 4px; opacity: 0.3; }
          100% { height: ${Math.floor(Math.random() * 40) + 20}px; opacity: 1; }
        }
        ${Array.from({ length: bars }).map((_, i) => `
          div:nth-child(${i + 1}) {
            animation-duration: ${0.5 + (i % 7) * 0.1}s;
          }
        `).join('')}
      `}</style>
    </div>
  )
}

function Phone() {
  return (
    <div
      style={{
        width: '180px',
        height: '320px',
        borderRadius: '30px',
        border: '2px solid rgba(201,168,76,0.4)',
        background: 'linear-gradient(145deg, rgba(201,168,76,0.08), rgba(8,8,8,0.9))',
        boxShadow: '0 0 40px rgba(201,168,76,0.2), 0 0 80px rgba(201,168,76,0.08), inset 0 0 30px rgba(201,168,76,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        gap: '1.5rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '40px', height: '4px',
        background: 'rgba(201,168,76,0.3)',
        borderRadius: '2px',
        position: 'absolute',
        top: '16px',
      }} />
      <div style={{ fontSize: '2.5rem', color: '#c9a84c' }}>☯</div>
      <Waveform />
      <div style={{
        fontSize: '0.75rem',
        color: 'rgba(201,168,76,0.7)',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.1em',
      }}>
        Verbunden...
      </div>
      <div style={{
        width: '50px', height: '50px',
        borderRadius: '50%',
        background: 'rgba(34,197,94,0.2)',
        border: '1px solid rgba(34,197,94,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem',
      }}>
        📞
      </div>
      <div style={{
        width: '40px', height: '4px',
        background: 'rgba(201,168,76,0.3)',
        borderRadius: '2px',
        position: 'absolute',
        bottom: '16px',
      }} />
    </div>
  )
}

export default function Solution() {
  const sectionRef = useRef(null)
  const phoneRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(phoneRef.current,
        { y: -150, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'bounce.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo(textRef.current.children,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 100%)' }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Phone visual */}
        <div className="flex justify-center" ref={phoneRef} style={{ opacity: 0 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-40px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'pulse 3s ease-in-out infinite',
            }} />
            <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.1);opacity:1} }`}</style>
            <Phone />
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="flex flex-col gap-6">
          <div style={{
            fontSize: '0.75rem', letterSpacing: '0.4em',
            color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}>
            Die Lösung
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800, color: '#f5f5f5', lineHeight: 1.2,
          }}>
            ZenTime AI <br />
            <span style={{ color: '#c9a84c' }}>antwortet für Sie</span>
          </h2>
          <p style={{
            fontSize: '1.1rem', color: 'rgba(245,245,245,0.6)',
            lineHeight: 1.7, fontFamily: 'Inter, sans-serif',
          }}>
            Ihr KI Mitarbeiter — <strong style={{ color: '#f5f5f5' }}>24 Stunden, 7 Tage, 365 Tage</strong>.
            Kein Urlaub, keine Krankheit, keine Pausen.
          </p>
          <div className="flex flex-wrap gap-4">
            {['Sofortige Antwort', 'Natürliche Sprache', 'Terminbuchung', 'Mehrsprachig'].map(tag => (
              <span
                key={tag}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  color: '#c9a84c',
                  fontFamily: 'Inter, sans-serif',
                  background: 'rgba(201,168,76,0.05)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
