import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MAIN_STEPS = [
  { icon: '👋', label: 'Dieser Zoom Call', desc: 'Wir schauen gemeinsam ob ZenTime AI zu Ihnen passt' },
]

const PATH_A = [
  { icon: '🤔', label: 'Bedenkzeit?', desc: 'Kein Problem — wir vereinbaren einen 2. Call' },
  { icon: '📅', label: '2. Call', desc: 'Offene Fragen klären, dann gemeinsam entscheiden' },
]

const PATH_B = [
  { icon: '📋', label: 'Infos zum Personalisieren', desc: 'Name, Stimme, Sprache, Branchenspezifik, typische Anfragen' },
  { icon: '🎧', label: 'Test Demo anhören', desc: 'Sie hören wie Ihr KI Assistent klingen wird' },
  { icon: '💳', label: 'Zahlung via SEPA', desc: 'Sichere Einmalzahlung Setup + erstes Monat Abo' },
  { icon: '⚙️', label: 'Personalisierung startet', desc: 'Bei Zahlungseingang beginnen wir sofort mit der Einrichtung' },
  { icon: '🚀', label: 'Live in 24 Stunden', desc: 'Ihr KI Assistent ist aktiv — Abo läuft ab jetzt' },
]

function Step({ icon, label, desc, index, visible, accent }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', minWidth: '140px', maxWidth: '160px',
    }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        background: accent
          ? 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.08))'
          : 'rgba(201,168,76,0.06)',
        border: `1px solid ${accent ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', marginBottom: '0.6rem',
        boxShadow: accent ? '0 0 20px rgba(201,168,76,0.2)' : 'none',
      }}>
        {icon}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600,
        color: accent ? '#c9a84c' : '#f5f5f5', marginBottom: '0.3rem',
        lineHeight: 1.3,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.68rem',
        color: 'rgba(245,245,245,0.35)', lineHeight: 1.4,
      }}>
        {desc}
      </div>
    </div>
  )
}

function Arrow({ visible, index }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transition: `opacity 0.4s ease ${index * 0.12 + 0.1}s`,
      color: 'rgba(201,168,76,0.35)', fontSize: '1.2rem',
      flexShrink: 0, paddingTop: '1rem',
    }}>
      →
    </div>
  )
}

export default function CallFlow() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        onEnter: () => setVisible(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="callflow"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #090909 100%)' }}
    >
      <div className="max-w-6xl w-full">
        <div style={{
          fontSize: '0.72rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          Ablauf dieses Gesprächs
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '4rem',
        }}>
          Wie geht es heute weiter?
        </h2>

        {/* Start */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <Step icon="👋" label="Dieser Zoom Call" desc="Wir schauen gemeinsam ob ZenTime AI zu Ihnen passt" index={0} visible={visible} accent />
        </div>

        {/* Branch point */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0',
          position: 'relative', marginBottom: '2rem',
        }}>
          {/* Vertical line down */}
          <div style={{
            position: 'absolute', top: '-2.5rem', left: '50%',
            width: '1px', height: '2.5rem',
            background: 'linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.1))',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.3s',
          }} />

          {/* Two branch labels */}
          <div style={{
            display: 'flex', gap: '8rem', flexWrap: 'wrap', justifyContent: 'center',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.4s',
          }}>
            <div style={{
              padding: '0.35rem 1.2rem', borderRadius: '999px',
              border: '1px solid rgba(229,62,62,0.25)',
              background: 'rgba(229,62,62,0.05)',
              fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
              color: 'rgba(229,62,62,0.7)', letterSpacing: '0.1em',
            }}>
              Bedenkzeit gewünscht
            </div>
            <div style={{
              padding: '0.35rem 1.2rem', borderRadius: '999px',
              border: '1px solid rgba(34,197,94,0.25)',
              background: 'rgba(34,197,94,0.05)',
              fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
              color: 'rgba(34,197,94,0.7)', letterSpacing: '0.1em',
            }}>
              Direkt entschieden ✓
            </div>
          </div>
        </div>

        {/* Two paths side by side */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>

          {/* Path A — Bedenkzeit */}
          <div style={{
            flex: 1, minWidth: '260px', maxWidth: '340px',
            padding: '2rem',
            background: 'rgba(229,62,62,0.03)',
            border: '1px solid rgba(229,62,62,0.1)',
            borderRadius: '20px',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.25em', color: 'rgba(229,62,62,0.5)',
              textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center',
            }}>
              Option A
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              {PATH_A.map((step, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '0.5rem' }}>
                  <Step icon={step.icon} label={step.label} desc={step.desc} index={i + 1} visible={visible} />
                  {i < PATH_A.length - 1 && (
                    <div style={{
                      width: '1px', height: '20px',
                      background: 'rgba(229,62,62,0.2)',
                      opacity: visible ? 1 : 0,
                      transition: 'opacity 0.5s ease 0.4s',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Path B — Direkt */}
          <div style={{
            flex: 1, minWidth: '260px', maxWidth: '580px',
            padding: '2rem',
            background: 'rgba(34,197,94,0.03)',
            border: '1px solid rgba(34,197,94,0.12)',
            borderRadius: '20px',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.25em', color: 'rgba(34,197,94,0.5)',
              textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center',
            }}>
              Option B — Heute starten
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start' }}>
              {PATH_B.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Step icon={step.icon} label={step.label} desc={step.desc} index={i + 1} visible={visible} accent={i === PATH_B.length - 1} />
                  {i < PATH_B.length - 1 && (
                    <Arrow visible={visible} index={i + 1} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
