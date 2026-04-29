import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 62, suffix: '%', label: 'der Anrufe werden verpasst', desc: 'Während Sie beschäftigt sind, klingelt das Telefon — und niemand nimmt ab.' },
  { value: 126000, suffix: '€', label: 'Umsatzverlust pro Jahr', desc: 'Jeder verpasste Anruf ist ein potenzieller Kunde, der zur Konkurrenz geht.' },
  { value: 85, suffix: '%', label: 'legen auf ohne Nachricht', desc: 'Nur 15% der Anrufer hinterlassen eine Nachricht. Der Rest ist weg.' },
]

function useCountUp(target, trigger, duration = 2) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [trigger, target, duration])
  return count
}

function StatCard({ stat, index, triggered }) {
  const count = useCountUp(stat.value, triggered, 2 + index * 0.3)

  const formatted = count >= 1000
    ? count.toLocaleString('de-DE')
    : count.toString()

  return (
    <div
      className="flex flex-col items-center text-center px-8 py-12"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 0.8s ease ${index * 0.3}s, transform 0.8s ease ${index * 0.3}s`,
      }}
    >
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          fontWeight: 900,
          color: '#e53e3e',
          textShadow: '0 0 30px rgba(229,62,62,0.6), 0 0 60px rgba(229,62,62,0.3)',
          lineHeight: 1,
        }}
      >
        {formatted}{stat.suffix}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: '#f5f5f5',
          marginTop: '0.75rem',
          marginBottom: '0.5rem',
          fontWeight: 600,
        }}
      >
        {stat.label}
      </div>
      <div
        style={{
          fontSize: '0.9rem',
          color: 'rgba(245,245,245,0.5)',
          maxWidth: '280px',
          lineHeight: 1.6,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {stat.desc}
      </div>
    </div>
  )
}

export default function Problem() {
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
          Die Realität
        </div>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#f5f5f5',
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          Das kostet Sie <span style={{ color: '#e53e3e' }}>Geld</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} triggered={triggered} />
          ))}
        </div>

        <div
          style={{
            marginTop: '4rem',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            color: 'rgba(245,245,245,0.5)',
            textAlign: 'center',
            opacity: triggered ? 1 : 0,
            transition: 'opacity 1s ease 1.5s',
          }}
        >
          "Jeder verpasste Anruf ist verlorener Umsatz"
        </div>
      </div>
    </section>
  )
}
