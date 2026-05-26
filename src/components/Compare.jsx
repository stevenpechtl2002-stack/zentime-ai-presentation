import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../LanguageContext'
import { t } from '../translations'

gsap.registerPlugin(ScrollTrigger)

export default function Compare() {
  const { lang } = useLang()
  const tr = t[lang].compare
  const rows = tr.rows
  const sectionRef = useRef(null)
  const [visibleRows, setVisibleRows] = useState(0)

  useEffect(() => {
    setVisibleRows(0)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          let count = 0
          const interval = setInterval(() => {
            count++
            setVisibleRows(count)
            if (count >= rows.length) clearInterval(interval)
          }, 250)
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <section
      id="compare"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0a0a 100%)' }}
    >
      <div className="max-w-5xl w-full">
        <div style={{
          fontSize: '0.75rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          {tr.tag}
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '4rem',
        }}>
          {tr.title.split(' vs. ')[0]} vs. <span style={{ color: 'rgba(245,245,245,0.4)' }}>{tr.title.split(' vs. ')[1]}</span>
        </h2>

        {/* Table */}
        <div style={{
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div className="grid grid-cols-3" style={{
            background: 'rgba(201,168,76,0.05)',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
          }}>
            <div style={{ padding: '1.5rem 2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(245,245,245,0.4)', textTransform: 'uppercase' }}>
              {lang === 'de' ? 'Kriterium' : 'Criteria'}
            </div>
            <div style={{
              padding: '1.5rem 2rem', textAlign: 'center',
              fontFamily: 'Playfair Display, serif', fontSize: '1.1rem',
              color: '#c9a84c', fontWeight: 700,
              background: 'rgba(201,168,76,0.06)',
              borderLeft: '1px solid rgba(201,168,76,0.15)',
              borderRight: '1px solid rgba(201,168,76,0.15)',
            }}>
              ☯ {tr.zenCol}
            </div>
            <div style={{ padding: '1.5rem 2rem', textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'rgba(245,245,245,0.5)', fontWeight: 600 }}>
              {tr.humanCol}
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3"
              style={{
                borderBottom: i < rows.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none',
                opacity: visibleRows > i ? 1 : 0,
                transform: visibleRows > i ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div style={{
                padding: '1.25rem 2rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(245,245,245,0.7)',
                display: 'flex', alignItems: 'center',
              }}>
                {row.label}
              </div>
              <div style={{
                padding: '1.25rem 2rem',
                background: 'rgba(201,168,76,0.04)',
                borderLeft: '1px solid rgba(201,168,76,0.1)',
                borderRight: '1px solid rgba(201,168,76,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}>
                <span style={{ color: '#22c55e', fontSize: '1rem' }}>✓</span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#c9a84c',
                }}>
                  {row.zen}
                </span>
              </div>
              <div style={{
                padding: '1.25rem 2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(245,245,245,0.4)',
              }}>
                {row.human}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '2.5rem', textAlign: 'center',
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.1rem', fontStyle: 'italic',
          color: 'rgba(201,168,76,0.7)',
          opacity: visibleRows >= rows.length ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}>
          {lang === 'de' ? '7× günstiger · 3× mehr verfügbar · 0× Ausfall' : '7× cheaper · 3× more available · 0× downtime'}
        </div>
      </div>
    </section>
  )
}
