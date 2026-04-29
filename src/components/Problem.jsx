import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONVERSION_HINTS = [
  { label: 'Restaurant / Beauty / Friseur', value: 75 },
  { label: 'Kfz / Handwerk', value: 40 },
  { label: 'Hotel / Fitness', value: 55 },
  { label: 'Bar / Club', value: 60 },
]

const PLANS = {
  3:  { setup: 4000, monthly: 500, total: 5500 },
  6:  { setup: 3500, monthly: 500, total: 6500 },
  12: { setup: 3000, monthly: 500, total: 9000 },
}

const DAYS_PER_MONTH = 22
const TAX_RATE = 0.30

function useCountUp(target, key) {
  const [count, setCount] = useState(0)
  const timerRef = useRef(null)
  const fromRef = useRef(0)

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const from = fromRef.current
    fromRef.current = target
    let step = 0
    const steps = 60
    timerRef.current = setInterval(() => {
      step++
      const ease = 1 - Math.pow(1 - step / steps, 3)
      setCount(Math.round(from + (target - from) * ease))
      if (step >= steps) { setCount(target); clearInterval(timerRef.current) }
    }, 1000 / 60)
    return () => clearInterval(timerRef.current)
  }, [target, key])

  return count
}

function AnimatedNumber({ value, prefix = '', suffix = '', animKey }) {
  const count = useCountUp(value, animKey)
  const formatted = count >= 1000 ? count.toLocaleString('de-DE') : count.toString()
  return <>{prefix}{formatted}{suffix}</>
}

function NumberInput({ label, value, onChange, suffix, max = 9999, step = 1 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
      <label style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
        letterSpacing: '0.2em', color: 'rgba(201,168,76,0.65)',
        textTransform: 'uppercase', textAlign: 'center',
      }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button onClick={() => onChange(Math.max(0, value - step))} style={btnStyle}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
        >−</button>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="number" min={0} max={max}
            value={value === 0 ? '' : value}
            placeholder="0"
            onChange={e => {
              if (e.target.value === '') { onChange(0); return }
              const v = parseInt(e.target.value)
              if (!isNaN(v)) onChange(Math.min(max, Math.max(0, v)))
            }}
            onFocus={e => e.target.select()}
            style={{
              width: '160px', textAlign: 'center',
              paddingLeft: '16px',
              paddingRight: suffix ? '36px' : '16px',
              paddingTop: '0.45rem', paddingBottom: '0.45rem',
              fontFamily: 'Playfair Display, serif',
              fontSize: '2rem', fontWeight: 800, color: '#c9a84c',
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '12px', outline: 'none',
              MozAppearance: 'textfield',
            }}
          />
          {suffix && (
            <span style={{
              position: 'absolute', right: '10px',
              fontFamily: 'Playfair Display, serif', fontSize: '1.3rem',
              color: 'rgba(201,168,76,0.55)', pointerEvents: 'none',
            }}>{suffix}</span>
          )}
        </div>

        <button onClick={() => onChange(Math.min(max, value + step))} style={btnStyle}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
        >+</button>
      </div>
    </div>
  )
}

const btnStyle = {
  width: '36px', height: '36px', borderRadius: '50%',
  border: '1px solid rgba(201,168,76,0.25)',
  background: 'rgba(201,168,76,0.05)',
  color: '#c9a84c', fontSize: '1.3rem',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background 0.2s',
}

function Toggle({ options, value, onChange }) {
  return (
    <div style={{
      display: 'inline-flex',
      background: 'rgba(201,168,76,0.05)',
      border: '1px solid rgba(201,168,76,0.18)',
      borderRadius: '999px', padding: '3px', gap: '2px',
    }}>
      {options.map(([val, label]) => (
        <button key={val} onClick={() => onChange(val)} style={{
          padding: '0.4rem 1.4rem', borderRadius: '999px', border: 'none',
          background: value === val ? 'linear-gradient(135deg, #c9a84c, #e4c46e)' : 'transparent',
          color: value === val ? '#080808' : 'rgba(245,245,245,0.4)',
          fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
          fontWeight: value === val ? 700 : 400,
          cursor: 'pointer', transition: 'all 0.25s ease',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </button>
      ))}
    </div>
  )
}

function ResultCard({ icon, label, value, suffix = '', animKey, accent, large, sub }) {
  const count = useCountUp(value, animKey)
  const formatted = count >= 1000 ? count.toLocaleString('de-DE') : count.toString()

  return (
    <div style={{
      flex: 1, padding: large ? '1.6rem' : '1.25rem',
      background: accent
        ? 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))'
        : 'rgba(229,62,62,0.04)',
      border: `1px solid ${accent ? 'rgba(201,168,76,0.28)' : 'rgba(229,62,62,0.14)'}`,
      borderRadius: '14px', textAlign: 'center',
      minWidth: '140px',
    }}>
      <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{icon}</div>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: large ? 'clamp(1.6rem, 3vw, 2.4rem)' : 'clamp(1.2rem, 2.2vw, 1.8rem)',
        fontWeight: 900, lineHeight: 1, marginBottom: '0.3rem',
        color: accent ? '#c9a84c' : '#e53e3e',
        textShadow: accent ? '0 0 20px rgba(201,168,76,0.35)' : '0 0 20px rgba(229,62,62,0.35)',
      }}>
        {formatted}{suffix}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
        color: accent ? 'rgba(201,168,76,0.6)' : 'rgba(245,245,245,0.45)',
        lineHeight: 1.3,
      }}>
        {label}
      </div>
      {sub && (
        <div style={{
          marginTop: '0.4rem', fontFamily: 'Inter, sans-serif',
          fontSize: '0.68rem', color: 'rgba(34,197,94,0.7)',
        }}>
          {sub}
        </div>
      )}
    </div>
  )
}

export default function Problem() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  const [missedPerDay, setMissedPerDay] = useState(0)
  const [avgValue, setAvgValue]         = useState(0)
  const [conversionPct, setConversionPct] = useState(0)
  const [minTerm, setMinTerm]           = useState(6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=180%',
        pin: pinRef.current,
        pinSpacing: true,
        onEnter: () => setTriggered(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const plan      = PLANS[minTerm]
  const days      = DAYS_PER_MONTH * minTerm
  const totalMissed    = missedPerDay * days
  const lostCustomers  = Math.round(totalMissed * (conversionPct / 100))
  const revenueLoss    = lostCustomers * avgValue
  const zenCost        = plan.total
  const taxSaving      = Math.round(zenCost * TAX_RATE)
  const netCost        = zenCost - taxSaving
  const netGain        = revenueLoss - netCost

  const animKey = `${missedPerDay}-${avgValue}-${conversionPct}-${minTerm}`

  return (
    <section id="problem" ref={sectionRef} style={{ background: '#080808', minHeight: '280vh' }}>
      <div
        ref={pinRef}
        className="flex flex-col items-center justify-center min-h-screen px-6"
        style={{ background: '#080808', gap: '0' }}
      >
        {/* Header */}
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
          letterSpacing: '0.4em', color: 'rgba(229,62,62,0.7)',
          textTransform: 'uppercase', marginBottom: '0.4rem',
        }}>
          Ihr persönlicher Verlust-Rechner
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '1.5rem',
        }}>
          Das kostet Sie <span style={{ color: '#e53e3e' }}>Geld</span>
        </h2>

        {/* Inputs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
          justifyContent: 'center', marginBottom: '1rem',
          opacity: triggered ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          <NumberInput label="Verpasste Anrufe pro Tag" value={missedPerDay} onChange={setMissedPerDay} max={999} step={1} />
          <NumberInput label="Ø Wert pro Kunde" value={avgValue} onChange={setAvgValue} max={9999} step={10} suffix="€" />
          <NumberInput label="Konversionsrate" value={conversionPct} onChange={setConversionPct} max={100} step={5} suffix="%" />
        </div>

        {/* Conversion hints */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
          justifyContent: 'center', marginBottom: '1.2rem',
          opacity: triggered ? 1 : 0, transition: 'opacity 0.6s ease 0.1s',
          maxWidth: '680px',
        }}>
          {CONVERSION_HINTS.map(hint => (
            <button key={hint.value} onClick={() => setConversionPct(hint.value)} style={{
              padding: '0.25rem 0.8rem', borderRadius: '999px',
              border: `1px solid ${conversionPct === hint.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}`,
              background: conversionPct === hint.value ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: conversionPct === hint.value ? '#c9a84c' : 'rgba(245,245,245,0.35)',
              fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
              cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { if (conversionPct !== hint.value) e.currentTarget.style.color = 'rgba(245,245,245,0.65)' }}
              onMouseLeave={e => { if (conversionPct !== hint.value) e.currentTarget.style.color = 'rgba(245,245,245,0.35)' }}
            >
              {hint.label} → {hint.value}%
            </button>
          ))}
        </div>

        {/* Mindestlaufzeit toggle */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          marginBottom: '1.5rem',
          opacity: triggered ? 1 : 0, transition: 'opacity 0.6s ease 0.15s',
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
            letterSpacing: '0.25em', color: 'rgba(201,168,76,0.55)',
            textTransform: 'uppercase',
          }}>
            Mindestlaufzeit
          </span>
          <Toggle
            options={[[3, '3 Monate'], [6, '6 Monate'], [12, '12 Monate']]}
            value={minTerm}
            onChange={setMinTerm}
          />
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.68rem',
            color: 'rgba(245,245,245,0.25)',
          }}>
            jederzeit reaktivierbar nach Laufzeitende
          </span>
        </div>

        {/* Results */}
        <div style={{
          width: '100%', maxWidth: '900px',
          opacity: triggered ? 1 : 0,
          transform: triggered ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}>
          {/* Loss row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <ResultCard icon="📞" label={`Verpasste Anrufe in ${minTerm} Monaten`} value={totalMissed} animKey={`m-${animKey}`} />
            <ResultCard icon="👤" label={`Verlorene Kunden (${conversionPct}% Rate)`} value={lostCustomers} animKey={`c-${animKey}`} />
            <ResultCard icon="💸" label={`Umsatzverlust in ${minTerm} Monaten`} value={revenueLoss} suffix="€" animKey={`l-${animKey}`} />
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase' }}>
              vs. ZenTime AI · {minTerm} Monate
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
          </div>

          {/* ROI row */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <ResultCard
              icon="☯"
              label={`ZenTime AI Gesamt (${minTerm} Mo.) — Setup ${plan.setup.toLocaleString('de-DE')}€ + ${plan.monthly * minTerm}.${plan.monthly * minTerm >= 1000 ? '' : ''}€ Abo`}
              value={zenCost}
              suffix="€"
              animKey={`z-${animKey}`}
              accent
            />
            <ResultCard
              icon="🧾"
              label="Steuerlicher Vorteil (ca. 30% absetzbar)"
              value={taxSaving}
              suffix="€"
              animKey={`t-${animKey}`}
              accent
              sub="Als Betriebsausgabe voll absetzbar"
            />
            <ResultCard
              icon="📈"
              label={`Ihr Nettogewinn nach Steuer in ${minTerm} Monaten`}
              value={netGain}
              suffix="€"
              animKey={`g-${animKey}`}
              accent
              large
            />
          </div>

          <p style={{
            textAlign: 'center', marginTop: '0.8rem',
            fontFamily: 'Inter, sans-serif', fontSize: '0.68rem',
            color: 'rgba(245,245,245,0.18)', letterSpacing: '0.05em',
          }}>
            Basis: {DAYS_PER_MONTH} Arbeitstage/Monat · {conversionPct}% Konversionsrate · 30% Steuersatz · Setup {plan.setup.toLocaleString('de-DE')}€ + {plan.monthly}€/Monat
          </p>
        </div>
      </div>
    </section>
  )
}
