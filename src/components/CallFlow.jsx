import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../LanguageContext'
import { t } from '../translations'

gsap.registerPlugin(ScrollTrigger)

function Step({ icon, label, desc, index, visible, accent, large }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', minWidth: large ? '120px' : '100px', maxWidth: large ? '150px' : '130px',
    }}>
      <div style={{
        width: large ? '64px' : '48px', height: large ? '64px' : '48px', borderRadius: '50%',
        background: accent
          ? 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))'
          : 'rgba(201,168,76,0.06)',
        border: `1px solid ${accent ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.18)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: large ? '1.8rem' : '1.3rem', marginBottom: '0.6rem',
        boxShadow: accent ? '0 0 24px rgba(201,168,76,0.25)' : 'none',
        animation: accent ? 'orbPulse 2.5s ease-in-out infinite' : 'none',
      }}>
        {icon}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: large ? '0.82rem' : '0.72rem', fontWeight: 600,
        color: accent ? '#c9a84c' : '#f5f5f5', marginBottom: '0.25rem', lineHeight: 1.3,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
        color: 'rgba(245,245,245,0.3)', lineHeight: 1.4,
      }}>
        {desc}
      </div>
    </div>
  )
}

function Arrow({ visible, index, color = 'rgba(201,168,76,0.35)' }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transition: `opacity 0.4s ease ${index * 0.12 + 0.1}s`,
      color, fontSize: '1.1rem', flexShrink: 0, paddingTop: '0.9rem',
    }}>
      →
    </div>
  )
}

export default function CallFlow() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const { lang } = useLang()
  const tr = t[lang].callflow
  const PATH_A = tr.steps.pathA
  const PATH_B = tr.steps.pathB
  const isDE = lang === 'de'

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

  const scrollToForm = () => {
    document.getElementById('personalization')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="callflow"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #090909 100%)' }}
    >
      <style>{`
        @keyframes orbPulse {
          0%, 100% { box-shadow: 0 0 24px rgba(201,168,76,0.25); }
          50% { box-shadow: 0 0 40px rgba(201,168,76,0.5); }
        }
        @keyframes greenPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(34,197,94,0.2), 0 4px 20px rgba(0,0,0,0.4); }
          50% { box-shadow: 0 0 50px rgba(34,197,94,0.4), 0 4px 20px rgba(0,0,0,0.4); }
        }
      `}</style>

      <div className="max-w-6xl w-full">
        <div style={{
          fontSize: '0.72rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          {tr.tag}
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '4rem',
        }}>
          {tr.title}
        </h2>

        {/* Start node */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <Step icon={tr.steps.main.icon} label={tr.steps.main.label} desc={tr.steps.main.desc} index={0} visible={visible} accent large />
        </div>

        {/* Vertical connector */}
        <div style={{
          display: 'flex', justifyContent: 'center', marginBottom: '1.5rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.3s',
        }}>
          <div style={{
            width: '1px', height: '2.5rem',
            background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0.1))',
          }} />
        </div>

        {/* Branch labels */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '6rem',
          flexWrap: 'wrap', marginBottom: '1.5rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.4s',
        }}>
          <div style={{
            padding: '0.35rem 1.2rem', borderRadius: '999px',
            border: '1px solid rgba(229,62,62,0.2)',
            background: 'rgba(229,62,62,0.04)',
            fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
            color: 'rgba(229,62,62,0.55)', letterSpacing: '0.1em',
          }}>
            {tr.thinkingTime}
          </div>
          <div style={{
            padding: '0.35rem 1.2rem', borderRadius: '999px',
            border: '1px solid rgba(34,197,94,0.35)',
            background: 'rgba(34,197,94,0.08)',
            fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
            color: 'rgba(34,197,94,0.85)', letterSpacing: '0.1em', fontWeight: 600,
          }}>
            {tr.directDecision}
          </div>
        </div>

        {/* Two paths */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>

          {/* Path A — small, muted */}
          <div style={{
            flex: '0 1 320px',
            padding: '1.75rem',
            background: 'rgba(229,62,62,0.02)',
            border: '1px solid rgba(229,62,62,0.08)',
            borderRadius: '20px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.62rem',
              letterSpacing: '0.25em', color: 'rgba(229,62,62,0.4)',
              textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center',
            }}>
              {tr.optionA}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              {PATH_A.map((step, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '0.5rem' }}>
                  <Step icon={step.icon} label={step.label} desc={step.desc} index={i + 1} visible={visible} />
                  {i < PATH_A.length - 1 && (
                    <div style={{ width: '1px', height: '16px', background: 'rgba(229,62,62,0.15)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Path B — large, gold/green, dominant */}
          <div style={{
            flex: '0 1 580px',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(201,168,76,0.04) 100%)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '24px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
            position: 'relative',
          }}>
            {/* "Empfohlen" badge */}
            <div style={{
              position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
              padding: '0.25rem 1.2rem', borderRadius: '999px',
              background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              fontWeight: 700, color: '#080808', letterSpacing: '0.15em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              {isDE ? '⚡ Empfohlen' : '⚡ Recommended'}
            </div>

            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.25em', color: 'rgba(34,197,94,0.7)',
              textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center',
            }}>
              {tr.optionB}
            </div>

            {/* Steps horizontal */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
              {PATH_B.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Step
                    icon={step.icon}
                    label={step.label}
                    desc={step.desc}
                    index={i + 1}
                    visible={visible}
                    accent={i === PATH_B.length - 1}
                    large={i === PATH_B.length - 1}
                  />
                  {i < PATH_B.length - 1 && (
                    <Arrow visible={visible} index={i + 1} color="rgba(34,197,94,0.3)" />
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={scrollToForm}
                style={{
                  padding: '0.9rem 2.5rem',
                  background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
                  border: 'none', borderRadius: '999px',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.05rem', fontWeight: 700,
                  color: '#080808', cursor: 'pointer',
                  animation: 'greenPulse 2.5s ease-in-out infinite',
                  transition: 'transform 0.2s ease',
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.6s ease 1s, transform 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isDE ? 'Jetzt starten →' : 'Get started now →'}
              </button>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
                color: 'rgba(245,245,245,0.25)', letterSpacing: '0.1em',
              }}>
                {isDE ? 'In 24 Stunden live · jederzeit kündbar' : 'Live in 24 hours · cancel anytime'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
