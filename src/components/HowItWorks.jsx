import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../LanguageContext'
import { t } from '../translations'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
  const { lang } = useLang()
  const tr = t[lang].howItWorks
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

      gsap.utils.toArray('.how-card').forEach((card) => {
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
  }, [lang])

  return (
    <section id="how" ref={sectionRef} style={{ background: '#080808' }}>
      <div ref={wrapperRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute top-20 left-12 z-10">
          <div style={{
            fontSize: '0.75rem', letterSpacing: '0.4em',
            color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem',
          }}>
            {tr.tag}
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800, color: '#f5f5f5',
          }}>
            {tr.title}
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="flex items-center"
          style={{ width: 'max-content', height: '100vh', paddingLeft: '12vw', paddingRight: '8vw', gap: '3rem' }}
        >
          {tr.steps.map((step, i) => (
            <div key={i} className="how-card flex flex-col" style={{ position: 'relative' }}>
              {i < tr.steps.length - 1 && (
                <div style={{
                  position: 'absolute', right: '-3rem', top: '50%',
                  width: '3rem', height: '1px',
                  background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)',
                  transform: 'translateY(-50%)',
                }} />
              )}
              <div style={{
                width: '360px', padding: '3rem',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(8,8,8,0.8) 100%)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '24px', backdropFilter: 'blur(10px)',
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{step.icon}</div>
                <div style={{
                  fontSize: '0.7rem', letterSpacing: '0.3em',
                  color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem',
                }}>
                  {lang === 'de' ? `Schritt ${i + 1}` : `Step ${i + 1}`}
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.6rem', fontWeight: 700,
                  color: '#f5f5f5', marginBottom: '1rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem', color: 'rgba(245,245,245,0.55)',
                  lineHeight: 1.7, fontFamily: 'Inter, sans-serif',
                }}>
                  {step.desc}
                </p>
                <div style={{
                  marginTop: '2rem', width: '40px', height: '2px',
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
