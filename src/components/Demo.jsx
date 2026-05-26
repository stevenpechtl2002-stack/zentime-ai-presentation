import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../LanguageContext'
import { t } from '../translations'

gsap.registerPlugin(ScrollTrigger)

export default function Demo() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const { lang } = useLang()
  const tr = t[lang].demo

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setVisible(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0a0a 100%)' }}
    >
      <div className="max-w-5xl w-full">
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
          textAlign: 'center', marginBottom: '1rem',
        }}>
          {tr.title}
        </h2>
        <p style={{
          textAlign: 'center', color: 'rgba(245,245,245,0.4)',
          fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
          marginBottom: '3rem',
        }}>
          {tr.sub}
        </p>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <elevenlabs-convai agent-id="agent_5101ksjdr0xgf50a587wvrd2cnrg" />
        </div>
      </div>
    </section>
  )
}
