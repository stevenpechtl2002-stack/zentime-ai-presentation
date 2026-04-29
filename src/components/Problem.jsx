import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORK_DAYS = 300

function useCountUp(target, key) {
  const [count, setCount] = useState(0)
  const timerRef = useRef(null)
  const prevTarget = useRef(target)

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const from = prevTarget.current
    prevTarget.current = target
    const diff = target - from
    if (diff === 0) return
    const duration = 1.2 // seconds
    const steps = duration * 60
    let step = 0
    timerRef.current = setInterval(() => {
      step++
      // easeOut
      const progress = 1 - Math.pow(1 - step / steps, 3)
      setCount(Math.round(from + diff * progress))
      if (step >= steps) {
        setCount(target)
        clearInterval(timerRef.current)
      }
    }, 1000 / 60)
    return () => clearInterval(timerRef.current)
  }, [target, key])

  return count
}

function StatCard({ value, suffix, label, desc, index, animKey, highlight }) {
  const count = useCountUp(value, animKey)
  const formatted = count >= 1000 ? count.toLocaleString('de-DE') : count.toString()

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-8"
      style={{
        background: 'rgba(229,62,62,0.04)',
        border: '1px solid rgba(229,62,62,0.12)',
        borderRadius: '20px',
      }}
    >
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
        fontWeight: 900,
        color: '#e53e3e',
        textShadow: '0 0 30px rgba(229,62,62,0.5), 0 0 60px rgba(229,62,62,0.2)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {formatted}{suffix}
      </div>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
        color: '#f5f5f5',
        marginTop: '0.75rem',
        marginBottom: '0.5rem',
        fontWeight: 600,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '0.83rem',
        color: 'rgba(245,245,245,0.45)',
        maxWidth: '240px',
        lineHeight: 1.6,
        fontFamily: 'Inter, sans-serif',
      }}>
        {desc}
      </div>
    </div>
  )
}

function CallInput({ value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '3.5rem',
    }}>
      <label style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        letterSpacing: '0.2em',
        color: 'rgba(201,168,76,0.7)',
        textTransform: 'uppercase',
      }}>
        Wie viele Anrufe erhalten Sie täglich?
      </label>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          style={{
            width: '40px', height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'rgba(201,168,76,0.06)',
            color: '#c9a84c',
            fontSize: '1.4rem',
            lineHeight: 1,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.06)' }}
        >
          −
        </button>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="number"
            min={1}
            max={999}
            value={value}
            onChange={e => {
              const v = parseInt(e.target.value)
              if (!isNaN(v) && v >= 1 && v <= 999) onChange(v)
            }}
            style={{
              width: '110px',
              textAlign: 'center',
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#c9a84c',
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '12px',
              padding: '0.4rem 0.5rem',
              outline: 'none',
              MozAppearance: 'textfield',
            }}
          />
        </div>

        <button
          onClick={() => onChange(Math.min(999, value + 1))}
          style={{
            width: '40px', height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'rgba(201,168,76,0.06)',
            color: '#c9a84c',
            fontSize: '1.4rem',
            lineHeight: 1,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.06)' }}
        >
          +
        </button>
      </div>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.75rem',
        color: 'rgba(245,245,245,0.25)',
        letterSpacing: '0.05em',
      }}>
        Anrufe pro Tag — Rechnung passt sich live an
      </p>
    </div>
  )
}

export default function Problem({ industry }) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const [dailyCalls, setDailyCalls] = useState(20)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: pinRef.current,
        pinSpacing: true,
        onEnter: () => setTriggered(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const missedRate = (industry?.missed ?? 35) / 100
  const hangupRate = industry?.hangup ?? 82
  const avgOrder = industry?.avgOrder ?? 500
  const conversion = industry?.conversion ?? 0.45

  const missedPerDay = Math.round(dailyCalls * missedRate)
  const missedPerYear = missedPerDay * WORK_DAYS
  const annualLoss = Math.round(missedPerYear * conversion * avgOrder)

  const animKey = `${industry?.id ?? 'default'}-${dailyCalls}`

  const stats = [
    {
      value: missedPerDay,
      suffix: '',
      label: 'verpasste Anrufe pro Tag',
      desc: `Bei ${dailyCalls} Anrufen täglich gehen ${Math.round(missedRate * 100)}% ins Leere — ${missedPerYear.toLocaleString('de-DE')} verpasste Chancen pro Jahr.`,
    },
    {
      value: annualLoss,
      suffix: '€',
      label: 'Umsatzverlust pro Jahr',
      desc: industry?.lossDesc ?? 'Jeder verpasste Anruf ist ein potenzieller Kunde, der zur Konkurrenz geht.',
    },
    {
      value: hangupRate,
      suffix: '%',
      label: 'legen auf ohne Nachricht',
      desc: `Von ${missedPerDay} verpassten Anrufern heute hinterlassen nur ${Math.round(missedPerDay * (1 - hangupRate / 100))} eine Nachricht.`,
    },
  ]

  return (
    <section id="problem" ref={sectionRef} style={{ background: '#080808', minHeight: '300vh' }}>
      <div
        ref={pinRef}
        className="flex flex-col items-center justify-center min-h-screen px-8"
        style={{ background: '#080808' }}
      >
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.4em',
          color: 'rgba(229,62,62,0.7)',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          {industry ? `${industry.icon} ${industry.label}` : 'Die Realität'}
        </div>

        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          fontWeight: 800,
          color: '#f5f5f5',
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          Das kostet Sie <span style={{ color: '#e53e3e' }}>Geld</span>
        </h2>

        <CallInput value={dailyCalls} onChange={setDailyCalls} />

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl"
          style={{
            opacity: triggered ? 1 : 0,
            transform: triggered ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} animKey={`${animKey}-${i}`} />
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          fontSize: 'clamp(0.95rem, 2vw, 1.4rem)',
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          color: 'rgba(245,245,245,0.35)',
          textAlign: 'center',
          opacity: triggered ? 1 : 0,
          transition: 'opacity 1s ease 0.6s',
        }}>
          "Jeder verpasste Anruf ist verlorener Umsatz"
        </div>
      </div>
    </section>
  )
}
