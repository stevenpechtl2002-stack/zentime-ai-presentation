import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { icon: '📞', title: 'Kunde ruft an', desc: 'Ihr Telefon klingelt — ZenTime AI nimmt innerhalb von Sekunden ab, egal zu welcher Uhrzeit.' },
  { icon: '🤖', title: 'ZenTime AI antwortet sofort', desc: 'Die KI begrüßt den Anrufer mit Ihrer Stimme und Sprache — professionell und natürlich.' },
  { icon: '📅', title: 'Termin wird gebucht', desc: 'ZenTime AI fragt nach dem Anliegen, prüft Verfügbarkeiten und bucht direkt einen Termin.' },
  { icon: '✅', title: 'Sie werden benachrichtigt', desc: 'Sie erhalten sofort eine Zusammenfassung des Gesprächs und alle Kundendaten per SMS/E-Mail.' },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = stepsRef.current.scrollWidth - window.innerWidth

      gsap.to(stepsRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: `+=${totalWidth + window.innerWidth}`,
          pin: true,
          scrub: 1,
        },
      })

      // Animate each card as it comes into view
      gsap.utils.toArray('.how-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.to(stepsRef.current, { x: -totalWidth }),
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how" ref={sectionRef} style={{ background: '#080808' }}>
      <div ref={wrapperRef} className="relative min-h-screen overflow-hidden">
        {/* Static header */}
        <div className="absolute top-20 left-12 z-10">
          <div style={{
            fontSize: '0.75rem', letterSpacing: '0.4em',
            color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem',
          }}>
            Der Prozess
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800, color: '#f5f5f5',
          }}>
            Wie es funktioniert
          </h2>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={stepsRef}
          className="flex items-center"
          style={{ width: 'max-content', height: '100vh', paddingLeft: '12vw', paddingRight: '8vw', gap: '3rem' }}
        >
          {steps.map((step, i) => (
            <div key={i} className="how-card flex flex-col" style={{ position: 'relative' }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', right: '-3rem', top: '50%',
                  width: '3rem', height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)',
                  transform: 'translateY(-50%)',
                }} />
              )}
              <div
                style={{
                  width: '360px',
                  padding: '3rem',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(8,8,8,0.8) 100%)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '24px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{step.icon}</div>
                <div style={{
                  fontSize: '0.7rem', letterSpacing: '0.3em',
                  color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem',
                }}>
                  Schritt {i + 1}
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.6rem', fontWeight: 700,
                  color: '#f5f5f5', marginBottom: '1rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(245,245,245,0.55)',
                  lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {step.desc}
                </p>
                <div style={{
                  marginTop: '2rem',
                  width: '40px', height: '2px',
                  background: 'linear-gradient(90deg, #c9a84c, transparent)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
