import { useEffect } from 'react'
import ContractForm from './ContractForm'

export default function FormModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.88)',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close button */}
      <div style={{
        width: '100%', maxWidth: '780px',
        display: 'flex', justifyContent: 'flex-end',
        padding: '1rem 1.5rem', flexShrink: 0,
        position: 'sticky', top: 0, zIndex: 1,
      }}>
        <button
          onClick={onClose}
          style={{
            padding: '0.5rem 1.25rem',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px', color: '#f5f5f5',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
          }}
        >
          ✕ Schließen
        </button>
      </div>

      {/* Contract form */}
      <div style={{
        width: '100%', maxWidth: '780px',
        background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)',
        borderRadius: '20px', marginBottom: '3rem',
        border: '1px solid rgba(201,168,76,0.12)',
      }}>
        <ContractForm onClose={onClose} />
      </div>
    </div>
  )
}
