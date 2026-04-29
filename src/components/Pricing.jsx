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

const plans = [
  {
    months: 3,
    setup: 4000,
    monthly: 500,
    total: 5500,
    highlight: false,
    badge: null,
  },
  {
    months: 6,
    setup: 3500,
    monthly: 500,
    total: 6500,
    highlight: true,
    badge: 'Beliebt',
  },
  {
    months: 12,
    setup: 3000,
    monthly: 500,
    total: 9000,
    highlight: false,
    badge: 'Bestes Angebot',
  },
]

const planFeatures = [
  'Komplett eingerichtet & konfiguriert',
  'Hosting & Wartung inklusive',
  'Alle Updates automatisch',
  'Persönlicher Support',
  'Danach monatlich kündbar',
]

function SetupCard({ flipped }) {
  return (
    <div style={{ perspective: '1000px', width: '100%', maxWidth: '560px', margin: '0 auto' }}>
      <div style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: flipped ? 'rotateY(0deg)' : 'rotateY(90deg)',
      }}>
        <div style={{
          padding: '2.5rem 3rem',
          background: 'linear-gradient(145deg, rgba(201,168,76,0.05) 0%, rgba(8,8,8,0.9) 100%)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontSize: '0.7rem', letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem',
            }}>
              Einmalig · Setup & Konfiguration
            </div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 900, lineHeight: 1,
              background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              3.000€
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 2rem' }}>
            {setup.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px' }}>
                <span style={{ color: '#22c55e', fontSize: '0.85rem', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(245,245,245,0.65)', fontFamily: 'Inter, sans-serif' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PlanCard({ plan, delay, flipped, active }) {
  const fmt = (n) => n.toLocaleString('de-DE')
  const isHighlighted = plan.highlight || active

  return (
    <div style={{ perspective: '1000px', flex: 1, minWidth: '220px' }}>
      <div style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: `transform 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        transform: flipped ? 'rotateY(0deg)' : 'rotateY(90deg)',
      }}>
        {(plan.badge || active) && (
          <div style={{
            position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
            padding: '0.3rem 1.2rem',
            background: isHighlighted
              ? 'linear-gradient(90deg, #c9a84c, #e4c46e)'
              : 'rgba(201,168,76,0.12)',
            border: isHighlighted ? 'none' : '1px solid rgba(201,168,76,0.3)',
            borderRadius: '999px',
            fontSize: '0.65rem', letterSpacing: '0.2em',
            color: isHighlighted ? '#080808' : '#c9a84c',
            fontWeight: 700, textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap', zIndex: 1,
          }}>
            {active ? '← Ihre Auswahl' : plan.badge}
          </div>
        )}

        <div style={{
          padding: '2.5rem 1.8rem',
          background: isHighlighted
            ? 'linear-gradient(145deg, rgba(201,168,76,0.14) 0%, rgba(8,8,8,0.95) 100%)'
            : 'linear-gradient(145deg, rgba(201,168,76,0.04) 0%, rgba(8,8,8,0.9) 100%)',
          border: `1px solid ${isHighlighted ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.12)'}`,
          borderRadius: '24px',
          boxShadow: isHighlighted
            ? '0 0 50px rgba(201,168,76,0.15), 0 20px 60px rgba(0,0,0,0.5)'
            : '0 10px 40px rgba(0,0,0,0.3)',
          transition: 'all 0.4s ease',
          textAlign: 'center',
        }}>
          {/* Duration label */}
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.3em',
            color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            {plan.months} Monate Mindestlaufzeit
          </div>

          {/* Setup */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(245,245,245,0.35)', fontFamily: 'Inter, sans-serif', marginBottom: '0.2rem' }}>
              Setup (einmalig)
            </div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.9rem', fontWeight: 900, lineHeight: 1,
              background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {fmt(plan.setup)}€
            </div>
          </div>

          {/* Monthly */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(245,245,245,0.35)', fontFamily: 'Inter, sans-serif', marginBottom: '0.2rem' }}>
              Monatlich
            </div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.9rem', fontWeight: 900, lineHeight: 1,
              background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {fmt(plan.monthly)}€
            </div>
          </div>

          {/* Total */}
          <div style={{
            padding: '0.6rem 1rem',
            background: 'rgba(201,168,76,0.07)',
            border: '1px solid rgba(201,168,76,0.18)',
            borderRadius: '10px',
            marginBottom: '1.5rem',
          }}>
            <div style={{ fontSize: '0.65rem', color: 'rgba(245,245,245,0.35)', fontFamily: 'Inter, sans-serif', marginBottom: '0.15rem' }}>
              Gesamt ({plan.months} Monate)
            </div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.4rem', fontWeight: 900,
              color: '#f5f5f5',
            }}>
              {fmt(plan.total)}€
            </div>
          </div>

          <div style={{ width: '30px', height: '1px', background: 'rgba(201,168,76,0.2)', margin: '0 auto 1.5rem' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', textAlign: 'left' }}>
            {planFeatures.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#22c55e', fontSize: '0.85rem', flexShrink: 0, marginTop: '1px' }}>✓</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(245,245,245,0.6)', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Pricing({ minTerm = 6, calcResults = null }) {
  const sectionRef = useRef(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        onEnter: () => setFlipped(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pricing"
      ref={sectionRef}
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
          textAlign: 'center', marginBottom: '1rem',
        }}>
          Ihre Investition
        </h2>
        <p style={{
          textAlign: 'center', color: 'rgba(245,245,245,0.4)',
          fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
          marginBottom: '3rem',
        }}>
          Kein verstecktes Kleingedrucktes. Alles inklusive.
        </p>

        {/* Plan cards */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.months}
              plan={plan}
              delay={i * 150}
              flipped={flipped}
              active={plan.months === minTerm}
            />
          ))}
        </div>

        {/* Personalized banner from calculator */}
        {calcResults && calcResults.revenueLoss > 0 ? (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem 2rem',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '16px',
            display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.3em', color: 'rgba(201,168,76,0.55)',
                textTransform: 'uppercase', marginBottom: '0.3rem',
              }}>
                Basierend auf Ihrer Berechnung · {minTerm} Monate
              </div>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                color: '#f5f5f5', fontStyle: 'italic',
              }}>
                Umsatzverlust:{' '}
                <span style={{ color: '#e53e3e' }}>
                  {calcResults.revenueLoss.toLocaleString('de-DE')}€
                </span>
                {' '}· ZenTime AI Investition:{' '}
                <span style={{ color: '#c9a84c' }}>
                  {calcResults.zenCost.toLocaleString('de-DE')}€
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)',
                textTransform: 'uppercase', marginBottom: '0.2rem',
              }}>
                Ihr Nettogewinn
              </div>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 900, color: '#c9a84c',
                textShadow: '0 0 20px rgba(201,168,76,0.4)',
              }}>
                {calcResults.netGain.toLocaleString('de-DE')}€
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            marginTop: '2rem', textAlign: 'center',
            padding: '1.5rem 2rem',
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '16px',
          }}>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#f5f5f5', fontStyle: 'italic',
            }}>
              "Bei nur einem gewonnenen Kunden hat sich{' '}
              <span style={{ color: '#c9a84c' }}>ZenTime AI bereits bezahlt gemacht.</span>"
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
