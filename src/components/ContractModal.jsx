import { useEffect } from 'react'
import { PLAN_DATA, buildPart1, buildPart2 } from '../contractBuilder'

export default function ContractModal({ form, onClose }) {
  const plan = form.plan || 'STARTER'
  const pd = PLAN_DATA[plan] || PLAN_DATA.STARTER
  const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const text1 = buildPart1(form, plan, pd, today)
  const text2 = buildPart2(form, plan, today)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <style>{`
        @media print {
          .contract-no-print { display: none !important; }
          .contract-overlay {
            position: static !important;
            background: white !important;
            overflow: visible !important;
          }
          .contract-scroll {
            max-height: none !important;
            overflow: visible !important;
            border-radius: 0 !important;
            padding: 1rem 2rem !important;
          }
          body { background: white !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div
        className="contract-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
        }}
      >
        {/* Top bar */}
        <div
          className="contract-no-print"
          style={{
            width: '100%', maxWidth: '940px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 1.5rem', flexShrink: 0, position: 'sticky', top: 0,
            background: 'rgba(8,8,8,0.95)', zIndex: 1, borderBottom: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <div style={{
            fontFamily: 'Playfair Display, serif', fontSize: '1rem',
            fontWeight: 700, color: '#c9a84c',
          }}>
            Zentime – Gesamtvertrag Tarif: {plan}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => window.print()}
              style={{
                padding: '0.5rem 1.25rem',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: '8px', color: '#c9a84c',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
              }}
            >
              Drucken / PDF speichern
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1.25rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px', color: '#f5f5f5',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
              }}
            >
              Schließen
            </button>
          </div>
        </div>

        {/* Contract content */}
        <div
          className="contract-scroll"
          style={{
            width: '100%', maxWidth: '940px',
            background: '#fff', padding: '3rem 3.5rem',
            borderRadius: '0 0 12px 12px',
            minHeight: '100vh',
          }}
        >
          <pre style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '0.72rem', lineHeight: 1.65,
            color: '#111', whiteSpace: 'pre-wrap',
            wordBreak: 'break-word', margin: 0,
          }}>
            {text1}
          </pre>

          <hr style={{ border: 'none', borderTop: '3px solid #111', margin: '2.5rem 0' }} />

          <pre style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '0.72rem', lineHeight: 1.65,
            color: '#111', whiteSpace: 'pre-wrap',
            wordBreak: 'break-word', margin: 0,
          }}>
            {text2}
          </pre>
        </div>
      </div>
    </>
  )
}
