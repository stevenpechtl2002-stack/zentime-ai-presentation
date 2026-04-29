import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Demo() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

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
          Live Demo
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '1rem',
        }}>
          Testen Sie ZenTime AI
        </h2>
        <p style={{
          textAlign: 'center', color: 'rgba(245,245,245,0.4)',
          fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
          marginBottom: '3rem',
        }}>
          Sprechen Sie direkt mit dem KI Assistenten — so klingt es für Ihre Kunden.
        </p>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(201,168,76,0.15)',
            boxShadow: '0 0 40px rgba(201,168,76,0.08), 0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <iframe
            src="https://www.zentime.io/embed/app/e933d6ac-2a92-4245-9ed5-58e1679aa974"
            width="100%"
            height="800"
            frameBorder="0"
            style={{ borderRadius: '16px', display: 'block' }}
            allow="clipboard-write; microphone"
          />
        </div>
      </div>
    </section>
  )
}
