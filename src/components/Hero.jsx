import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

const TITLE = 'ZenTime AI'
const PARTICLES_COUNT = 60

function Particle({ delay }) {
  const style = {
    position: 'absolute',
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
    borderRadius: '50%',
    background: '#c9a84c',
    boxShadow: '0 0 6px rgba(201,168,76,0.8)',
    opacity: 0,
    pointerEvents: 'none',
  }

  return (
    <motion.div
      style={style}
      animate={{
        opacity: [0, 0.8, 0],
        y: [0, -40 - Math.random() * 60],
        x: [0, (Math.random() - 0.5) * 40],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 3,
        delay: delay + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

export default function Hero() {
  const zenRef = useRef(null)
  const bgRef = useRef(null)
  const [lettersVisible, setLettersVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [scrollVisible, setScrollVisible] = useState(false)

  useEffect(() => {
    // Zen symbol spin on load
    gsap.fromTo(zenRef.current,
      { rotation: -180, opacity: 0, scale: 0.5 },
      { rotation: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)', delay: 0.5 }
    )

    // Sequence
    const t1 = setTimeout(() => setLettersVisible(true), 1200)
    const t2 = setTimeout(() => setSubtitleVisible(true), 2200)
    const t3 = setTimeout(() => setScrollVisible(true), 3000)

    // Parallax
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Parallax bg radial */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: PARTICLES_COUNT }).map((_, i) => (
          <Particle key={i} delay={i * 0.1} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Zen symbol */}
        <motion.div
          ref={zenRef}
          style={{
            fontSize: '5rem',
            color: '#c9a84c',
            filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.7)) drop-shadow(0 0 60px rgba(201,168,76,0.3))',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          ☯
        </motion.div>

        {/* Title letter by letter */}
        <h1
          className="flex flex-wrap justify-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: '#f5f5f5',
            marginBottom: '1.5rem',
          }}
        >
          {lettersVisible && TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
              style={{ display: 'inline-block', color: char === ' ' ? 'transparent' : '#f5f5f5' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <AnimatePresence>
          {subtitleVisible && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                fontWeight: 300,
                letterSpacing: '0.2em',
                color: '#c9a84c',
                textTransform: 'uppercase',
              }}
            >
              Nie wieder einen Anruf verpassen
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {scrollVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, #c9a84c, transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
