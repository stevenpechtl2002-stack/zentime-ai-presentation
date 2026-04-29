import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target, key, duration = 1.6) {
  const [count, setCount] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    let start = 0
    const step = target / (duration * 60)
    timerRef.current = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timerRef.current) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timerRef.current)
  }, [target, key])

  return count
}

function StatCard({ value, suffix, label, desc, index, industry }) {
  const count = useCountUp(value, `${industry}-${index}`)
  const formatted = count >= 1000 ? count.toLocaleString('de-DE') : count.toString()

  return (
    <div className="flex flex-col items-center text-center px-6 py-10">
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          fontWeight: 900,
          color: '#e53e3e',
          textShadow: '0 0 30px rgba(229,62,62,0.6), 0 0 60px rgba(229,62,62,0.3)',
          lineHeight: 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {formatted}{suffix}
      </div>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
        color: '#f5f5f5',
        marginTop: '0.75rem',
        marginBottom: '0.5rem',
        fontWeight: 600,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '0.88rem',
        color: 'rgba(245,245,245,0.5)',
        maxWidth: '260px',
        lineHeight: 1.6,
        fontFamily: 'Inter, sans-serif',
      }}>
        {desc}
      </div>
    </div>
  )
}

export default function Problem({ industry }) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

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

  const stats = [
    {
      value: industry?.missed ?? 62,
      suffix: '%',
      label: 'der Anrufe werden verpasst',
      desc: 'Während Sie beschäftigt sind, klingelt das Telefon — und niemand nimmt ab.',
    },
    {
      value: industry?.loss ?? 126000,
      suffix: '€',
      label: 'Umsatzverlust pro Jahr',
      desc: industry?.lossDesc ?? 'Jeder verpasste Anruf ist ein potenzieller Kunde, der zur Konkurrenz geht.',
    },
    {
      value: industry?.hangup ?? 85,
      suffix: '%',
      label: 'legen auf ohne Nachricht',
      desc: 'Nur wenige Anrufer hinterlassen eine Nachricht. Der Rest ist für immer weg.',
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
          marginBottom: '1rem',
        }}>
          {industry ? `${industry.icon} ${industry.label}` : 'Die Realität'}
        </div>

        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#f5f5f5',
          textAlign: 'center',
          marginBottom: '4rem',
          transition: 'opacity 0.3s ease',
        }}>
          Das kostet Sie <span style={{ color: '#e53e3e' }}>Geld</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl"
          style={{
            opacity: triggered ? 1 : 0,
            transform: triggered ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              {...stat}
              index={i}
              industry={industry?.id ?? 'default'}
            />
          ))}
        </div>

        <div style={{
          marginTop: '3.5rem',
          fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          color: 'rgba(245,245,245,0.4)',
          textAlign: 'center',
          opacity: triggered ? 1 : 0,
          transition: 'opacity 1s ease 0.8s',
        }}>
          "Jeder verpasste Anruf ist verlorener Umsatz"
        </div>
      </div>
    </section>
  )
}
