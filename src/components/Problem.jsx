import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const CONVERSION_HINTS = [
  { label: 'Restaurant / Beauty / Friseur', value: 75, note: 'Fast alle Anrufe sind Buchungsanfragen' },
  { label: 'Kfz / Handwerk', value: 40, note: 'Mix aus Anfragen, Preisvergleichen & Bestandskunden' },
  { label: 'Hotel / Fitness', value: 55, note: 'Überwiegend konkrete Buchungsabsicht' },
  { label: 'Bar / Club', value: 60, note: 'Meist Reservierungen & Event-Anfragen' },
]
const DAYS_MONTH = 22
const DAYS_YEAR = 264
const ZENTIME_MONTHLY = 500

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
      const t = step / steps
      const ease = 1 - Math.pow(1 - t, 3)
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

function NumberInput({ label, value, onChange, prefix, suffix, min = 1, max = 9999, step = 1 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '200px' }}>
      <label style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.75rem',
        letterSpacing: '0.25em',
        color: 'rgba(201,168,76,0.65)',
        textTransform: 'uppercase',
        textAlign: 'center',
      }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.25)',
            background: 'rgba(201,168,76,0.05)',
            color: '#c9a84c', fontSize: '1.3rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
        >−</button>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {prefix && (
            <span style={{ position: 'absolute', left: '10px', fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'rgba(201,168,76,0.6)', pointerEvents: 'none' }}>{prefix}</span>
          )}
          <input
            type="number"
            min={0} max={max} value={value === 0 ? '' : value}
            placeholder="0"
            onChange={e => {
              if (e.target.value === '') { onChange(0); return }
              const v = parseInt(e.target.value)
              if (!isNaN(v)) onChange(Math.min(max, Math.max(0, v)))
            }}
            onFocus={e => e.target.select()}
            style={{
              width: '160px',
              paddingLeft: prefix ? '32px' : '16px',
              paddingRight: suffix ? '40px' : '16px',
              paddingTop: '0.5rem', paddingBottom: '0.5rem',
              textAlign: 'center',
              fontFamily: 'Playfair Display, serif',
              fontSize: '2rem', fontWeight: 800,
              color: '#c9a84c',
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '12px',
              outline: 'none',
              MozAppearance: 'textfield',
            }}
          />
          {suffix && (
            <span style={{ position: 'absolute', right: '10px', fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'rgba(201,168,76,0.6)', pointerEvents: 'none' }}>{suffix}</span>
          )}
        </div>

        <button
          onClick={() => onChange(Math.min(max, value + step))}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.25)',
            background: 'rgba(201,168,76,0.05)',
            color: '#c9a84c', fontSize: '1.3rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
        >+</button>
      </div>
    </div>
  )
}

function ResultCard({ icon, label, value, prefix, suffix, animKey, accent, large }) {
  return (
    <div style={{
      padding: large ? '2rem' : '1.5rem',
      background: accent
        ? 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))'
        : 'rgba(229,62,62,0.04)',
      border: `1px solid ${accent ? 'rgba(201,168,76,0.3)' : 'rgba(229,62,62,0.15)'}`,
      borderRadius: '16px',
      textAlign: 'center',
      flex: 1,
    }}>
      <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: large ? 'clamp(1.8rem, 3.5vw, 2.8rem)' : 'clamp(1.4rem, 2.5vw, 2rem)',
        fontWeight: 900,
        color: accent ? '#c9a84c' : '#e53e3e',
        lineHeight: 1,
        marginBottom: '0.5rem',
        textShadow: accent
          ? '0 0 20px rgba(201,168,76,0.4)'
          : '0 0 20px rgba(229,62,62,0.4)',
      }}>
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} animKey={animKey} />
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8rem',
        color: accent ? 'rgba(201,168,76,0.7)' : 'rgba(245,245,245,0.5)',
        lineHeight: 1.4,
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Problem() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const [missedPerDay, setMissedPerDay] = useState(0)
  const [avgValue, setAvgValue] = useState(0)
  const [conversionPct, setConversionPct] = useState(0)
  const [period, setPeriod] = useState('month') // 'month' | 'year'

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

  const days = period === 'month' ? DAYS_MONTH : DAYS_YEAR
  const zenCost = period === 'month' ? ZENTIME_MONTHLY : ZENTIME_MONTHLY * 12

  const totalMissed = missedPerDay * days
  const lostCustomers = Math.round(totalMissed * (conversionPct / 100))
  const revenueLoss = lostCustomers * avgValue
  const netGain = revenueLoss - zenCost

  const animKey = `${missedPerDay}-${avgValue}-${conversionPct}-${period}`
  const periodLabel = period === 'month' ? 'pro Monat' : 'pro Jahr'

  return (
    <section id="problem" ref={sectionRef} style={{ background: '#080808', minHeight: '280vh' }}>
      <div
        ref={pinRef}
        className="flex flex-col items-center justify-center min-h-screen px-6"
        style={{ background: '#080808' }}
      >
        {/* Header */}
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
          letterSpacing: '0.4em', color: 'rgba(229,62,62,0.7)',
          textTransform: 'uppercase', marginBottom: '0.6rem',
        }}>
          Ihr persönlicher Verlust-Rechner
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '2.5rem',
        }}>
          Das kostet Sie <span style={{ color: '#e53e3e' }}>Geld</span>
        </h2>

        {/* Inputs */}
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '2.5rem',
            justifyContent: 'center', marginBottom: '1.5rem',
            opacity: triggered ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <NumberInput
            label="Verpasste Anrufe pro Tag"
            value={missedPerDay}
            onChange={setMissedPerDay}
            min={1} max={999} step={1}
          />
          <NumberInput
            label="Ø Wert pro Kunde"
            value={avgValue}
            onChange={setAvgValue}
            min={10} max={9999} step={10}
            suffix="€"
          />
          <NumberInput
            label="Konversionsrate"
            value={conversionPct}
            onChange={setConversionPct}
            min={1} max={100} step={5}
            suffix="%"
          />
        </div>

        {/* Conversion rate hints */}
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
            justifyContent: 'center', marginBottom: '1.8rem',
            opacity: triggered ? 1 : 0,
            transition: 'opacity 0.6s ease 0.1s',
            maxWidth: '700px',
          }}
        >
          {CONVERSION_HINTS.map((hint) => (
            <button
              key={hint.value}
              onClick={() => setConversionPct(hint.value)}
              title={hint.note}
              style={{
                padding: '0.3rem 0.9rem',
                borderRadius: '999px',
                border: `1px solid ${conversionPct === hint.value ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}`,
                background: conversionPct === hint.value ? 'rgba(201,168,76,0.12)' : 'transparent',
                color: conversionPct === hint.value ? '#c9a84c' : 'rgba(245,245,245,0.35)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (conversionPct !== hint.value) e.currentTarget.style.color = 'rgba(245,245,245,0.65)' }}
              onMouseLeave={e => { if (conversionPct !== hint.value) e.currentTarget.style.color = 'rgba(245,245,245,0.35)' }}
            >
              {hint.label} → {hint.value}%
            </button>
          ))}
        </div>

        {/* Period toggle */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '999px',
            padding: '4px',
            marginBottom: '2.5rem',
            opacity: triggered ? 1 : 0,
            transition: 'opacity 0.6s ease 0.1s',
          }}
        >
          {[['month', '1 Monat'], ['year', '12 Monate']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setPeriod(val)}
              style={{
                padding: '0.5rem 1.8rem',
                borderRadius: '999px',
                border: 'none',
                background: period === val
                  ? 'linear-gradient(135deg, #c9a84c, #e4c46e)'
                  : 'transparent',
                color: period === val ? '#080808' : 'rgba(245,245,245,0.45)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: period === val ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.05em',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div
          style={{
            width: '100%', maxWidth: '860px',
            opacity: triggered ? 1 : 0,
            transform: triggered ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <ResultCard
              icon="📞"
              label={`Verpasste Anrufe ${periodLabel}`}
              value={totalMissed}
              animKey={`missed-${animKey}`}
              accent={false}
            />
            <ResultCard
              icon="👤"
              label={`Verlorene Kunden ${periodLabel} (bei ${conversionPct}% Konversionsrate)`}
              value={lostCustomers}
              animKey={`customers-${animKey}`}
              accent={false}
            />
            <ResultCard
              icon="💸"
              label={`Umsatzverlust ${periodLabel}`}
              value={revenueLoss}
              suffix="€"
              animKey={`loss-${animKey}`}
              accent={false}
            />
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            marginBottom: '1rem',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase' }}>
              vs. ZenTime AI
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
          </div>

          {/* Bottom row — ROI */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ResultCard
              icon="☯"
              label={`ZenTime AI Investment ${periodLabel}`}
              value={zenCost}
              suffix="€"
              animKey={`cost-${animKey}`}
              accent={true}
            />
            <ResultCard
              icon="📈"
              label={`Ihr Gewinn mit ZenTime AI ${periodLabel}`}
              value={netGain}
              suffix="€"
              animKey={`gain-${animKey}`}
              accent={true}
              large={true}
            />
          </div>

          <p style={{
            textAlign: 'center', marginTop: '1.2rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(245,245,245,0.2)',
            letterSpacing: '0.05em',
          }}>
            Basis: {days} Arbeitstage · {conversionPct}% Konversionsrate verpasster Anrufe · ZenTime AI 500€/Monat
          </p>
        </div>
      </div>
    </section>
  )
}
