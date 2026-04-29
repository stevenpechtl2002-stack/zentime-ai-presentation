import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prompts = [
  'Können Sie sich vorstellen, wie das bei Ihnen klingt?',
  'Welche Fragen haben Sie noch?',
  'Was hält Sie bisher davon ab?',
  'Sehen Sie den ROI für Ihr Unternehmen?',
]

export default function Opinion() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

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

  return (
    <section
      id="opinion"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, #080808 70%)',
      }}
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center">

        {/* Zen symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'backOut' }}
          style={{
            fontSize: '3.5rem', color: '#c9a84c', marginBottom: '2rem',
            filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.5))',
          }}
        >
          ☯
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: '0.72rem', letterSpacing: '0.4em',
            color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '1rem',
          }}
        >
          Ihre Meinung
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800, color: '#f5f5f5',
            lineHeight: 1.15, marginBottom: '1.5rem',
          }}
        >
          Was denken{' '}
          <span style={{
            background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Sie?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1.05rem',
            color: 'rgba(245,245,245,0.45)', lineHeight: 1.7,
            maxWidth: '560px', marginBottom: '3rem',
          }}
        >
          Ihr Eindruck, Ihre Fragen, Ihre Bedenken —
          jetzt ist der richtige Moment.
        </motion.p>

        {/* Question prompts */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
          justifyContent: 'center', maxWidth: '680px',
        }}>
          {prompts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '999px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                color: 'rgba(245,245,245,0.5)',
                fontStyle: 'italic',
              }}
            >
              "{p}"
            </motion.div>
          ))}
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          style={{
            marginTop: '3.5rem',
            width: '120px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </section>
  )
}
