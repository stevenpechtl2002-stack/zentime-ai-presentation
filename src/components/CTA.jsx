import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT = 80

function Particle({ delay, triggered }) {
  const angle = Math.random() * Math.PI * 2
  const dist = 100 + Math.random() * 300
  const tx = Math.cos(angle) * dist
  const ty = Math.sin(angle) * dist

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={triggered ? {
        opacity: [0, 1, 1, 0],
        x: tx,
        y: ty,
        scale: [0, 1.5, 1, 0],
      } : {}}
      transition={{
        duration: 2 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 2,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        borderRadius: '50%',
        background: '#c9a84c',
        boxShadow: '0 0 6px rgba(201,168,76,0.9)',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function CTA() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => setInView(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, #080808 70%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Particles */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <Particle key={i} delay={i * 0.05} triggered={inView} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'backOut' }}
          style={{
            fontSize: '5rem',
            color: '#c9a84c',
            filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.7)) drop-shadow(0 0 60px rgba(201,168,76,0.3))',
            marginBottom: '1.5rem',
            animation: inView ? 'zenPulse 3s ease-in-out infinite' : 'none',
          }}
        >
          ☯
        </motion.div>
        <style>{`@keyframes zenPulse { 0%,100%{filter:drop-shadow(0 0 20px rgba(201,168,76,0.5)) drop-shadow(0 0 40px rgba(201,168,76,0.2))} 50%{filter:drop-shadow(0 0 40px rgba(201,168,76,0.9)) drop-shadow(0 0 80px rgba(201,168,76,0.4))} }`}</style>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            color: '#f5f5f5',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          Ihr KI Assistent wartet
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(245,245,245,0.6)',
            marginBottom: '3rem',
            lineHeight: 1.6,
          }}
        >
          In 24 Stunden live — Kein Risiko, jederzeit kündbar
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: 'backOut' }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            padding: '1.25rem 3.5rem',
            background: btnHovered
              ? 'linear-gradient(135deg, #e4c46e 0%, #c9a84c 50%, #a07828 100%)'
              : 'linear-gradient(135deg, #c9a84c 0%, #e4c46e 50%, #a07828 100%)',
            border: 'none',
            borderRadius: '999px',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#080808',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.05em',
            boxShadow: btnHovered
              ? '0 0 40px rgba(201,168,76,0.6), 0 0 80px rgba(201,168,76,0.3), 0 20px 60px rgba(0,0,0,0.4)'
              : '0 0 20px rgba(201,168,76,0.3), 0 10px 40px rgba(0,0,0,0.3)',
            transform: btnHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
            transition: 'all 0.3s ease',
            animation: inView ? 'btnPulse 2s ease-in-out infinite' : 'none',
          }}
        >
          Kostenlose Demo anfragen
        </motion.button>
        <style>{`@keyframes btnPulse { 0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.3), 0 10px 40px rgba(0,0,0,0.3)} 50%{box-shadow:0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2), 0 10px 40px rgba(0,0,0,0.3)} }`}</style>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-6 mt-6"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(245,245,245,0.5)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
            <span style={{ fontSize: '1.2rem' }}>📱</span>
            WhatsApp
          </div>
          <div style={{ width: '1px', height: '16px', background: 'rgba(245,245,245,0.15)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(245,245,245,0.5)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
            <span style={{ fontSize: '1.2rem' }}>📞</span>
            Telefon
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{
            marginTop: '5rem',
            fontSize: '0.75rem',
            color: 'rgba(245,245,245,0.2)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.1em',
          }}
        >
          ☯ ZenTime AI · KI Telefon Assistent · Datenschutz · Impressum
        </motion.div>
      </div>
    </section>
  )
}
