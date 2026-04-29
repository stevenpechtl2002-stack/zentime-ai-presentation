import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const setup = [
  'Komplett eingerichtet & konfiguriert',
  'Persönlicher Prompt für Ihr Unternehmen',
  'Ihre Stimme & Ihre Sprache',
  'Twilio Rufnummer inklusive',
  'Lieferung in 24 Stunden',
  'Testgespräch inklusive',
]

const monthly = [
  'Hosting & Wartung inklusive',
  'Alle Updates automatisch',
  'Persönlicher Support',
  'Jederzeit kündbar',
  'Keine Mindestlaufzeit',
]

function PricingCard({ title, price, period, features, highlight, delay }) {
  const [flipped, setFlipped] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 70%',
        onEnter: () => {
          setTimeout(() => setFlipped(true), delay)
        },
      })
    })
    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1000px', width: '100%', maxWidth: '420px' }}
    >
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(0deg)' : 'rotateY(90deg)',
          minHeight: '560px',
        }}
      >
        <div
          style={{
            backfaceVisibility: 'hidden',
            padding: '3rem',
            background: highlight
              ? 'linear-gradient(145deg, rgba(201,168,76,0.12) 0%, rgba(8,8,8,0.95) 100%)'
              : 'linear-gradient(145deg, rgba(201,168,76,0.05) 0%, rgba(8,8,8,0.9) 100%)',
            border: `1px solid ${highlight ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.12)'}`,
            borderRadius: '24px',
            boxShadow: highlight
              ? '0 0 40px rgba(201,168,76,0.12), 0 40px 80px rgba(0,0,0,0.5)'
              : '0 10px 40px rgba(0,0,0,0.4)',
            height: '100%',
          }}
        >
          {highlight && (
            <div style={{
              position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
              padding: '0.35rem 1.5rem',
              background: 'linear-gradient(90deg, #c9a84c, #e4c46e)',
              borderRadius: '999px',
              fontSize: '0.7rem', letterSpacing: '0.2em',
              color: '#080808', fontWeight: 700, textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
            }}>
              Empfohlen
            </div>
          )}

          <div style={{
            fontSize: '0.7rem', letterSpacing: '0.3em',
            color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '0.75rem',
          }}>
            {title}
          </div>

          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#c9a84c',
            lineHeight: 1,
            marginBottom: '0.25rem',
            background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {price}
          </div>
          <div style={{
            fontSize: '0.85rem', color: 'rgba(245,245,245,0.4)',
            marginBottom: '2rem', fontFamily: 'Inter, sans-serif',
          }}>
            {period}
          </div>

          <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.3)', marginBottom: '2rem' }} />

          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span style={{ color: '#22c55e', fontSize: '0.9rem', marginTop: '1px', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(245,245,245,0.7)', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0808 100%)' }}
    >
      <div className="max-w-5xl w-full">
        <div style={{
          fontSize: '0.75rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          Transparent & Fair
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '1.5rem',
        }}>
          Ihre Investition
        </h2>
        <p style={{
          textAlign: 'center', color: 'rgba(245,245,245,0.5)',
          fontFamily: 'Inter, sans-serif', fontSize: '1rem',
          marginBottom: '4rem',
        }}>
          Kein verstecktes Kleingedrucktes. Alles inklusive.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          <PricingCard
            title="Einmalig"
            price="3.000€"
            period="Setup & Konfiguration"
            features={setup}
            highlight={false}
            delay={0}
          />
          <PricingCard
            title="Monatlich"
            price="500€"
            period="pro Monat, jederzeit kündbar"
            features={monthly}
            highlight={true}
            delay={300}
          />
        </div>

        {/* ROI */}
        <div style={{
          marginTop: '4rem', textAlign: 'center',
          padding: '2rem',
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.12)',
          borderRadius: '16px',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</div>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#f5f5f5', fontStyle: 'italic',
          }}>
            "Bei nur einem gewonnenen Kunden
          </p>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#c9a84c', fontStyle: 'italic',
          }}>
            hat sich ZenTime AI bereits bezahlt gemacht."
          </p>
        </div>
      </div>
    </section>
  )
}
