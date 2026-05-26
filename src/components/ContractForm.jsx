import { useState } from 'react'
import ContractModal from './ContractModal'
import { buildFullContract } from '../contractBuilder'

const FORM_EMAIL = 'stevenpechtl2002@gmail.com'

const PLANS = [
  { key: 'STARTER',  monthly: '500€', calls: '200', label: 'Starter' },
  { key: 'BUSINESS', monthly: '600€', calls: '500', label: 'Business' },
  { key: 'PRO',      monthly: '650€', calls: '700', label: 'Pro' },
]

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
        letterSpacing: '0.2em', color: 'rgba(201,168,76,0.65)',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
  color: '#f5f5f5', background: 'rgba(201,168,76,0.05)',
  border: '1px solid rgba(201,168,76,0.2)',
  borderRadius: '10px', padding: '0.75rem 1rem',
  outline: 'none', width: '100%',
  transition: 'border-color 0.2s',
}

export default function ContractForm({ onClose }) {
  const [form, setForm] = useState({
    plan: 'STARTER', company: '', address: '',
    contact: '', email: '', phone: '',
    vatId: '', dsb: '',
  })
  const [status, setStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)
  const [showContract, setShowContract] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const contractText = buildFullContract(form)
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject:   `ZenTime Vertrag – ${form.plan} – ${form.company}`,
          Tarif:      form.plan,
          Firmenname: form.company,
          Adresse:    form.address,
          Kontakt:    form.contact,
          Email:      form.email,
          Telefon:    form.phone,
          'USt-IdNr': form.vatId,
          DSB:        form.dsb,
          Vertrag:    contractText,
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setStatus('success')
        setShowContract(true)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const focused = (key) => ({
    onFocus: () => setFocusedField(key),
    onBlur:  () => setFocusedField(null),
    style: { ...inputStyle, borderColor: focusedField === key ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.2)' },
  })

  return (
    <>
      <div style={{ padding: '2.5rem 2rem 3rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '0.72rem', letterSpacing: '0.4em',
            color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem',
          }}>
            Zentime Vertrag
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 800, color: '#f5f5f5', marginBottom: '0.5rem',
          }}>
            Vertrag erstellen
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
            color: 'rgba(245,245,245,0.4)',
          }}>
            Daten eingeben — Vertrag wird automatisch ausgefüllt und per E-Mail gesendet.
          </p>
        </div>

        {status === 'success' ? (
          <div style={{
            padding: '2.5rem', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))',
            border: '1px solid rgba(34,197,94,0.25)', borderRadius: '20px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#f5f5f5', marginBottom: '0.75rem' }}>
              Vertrag gesendet!
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(245,245,245,0.5)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Der ausgefüllte Vertrag wurde an Ihre E-Mail übermittelt.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowContract(true)}
                style={{
                  padding: '0.9rem 2rem',
                  background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
                  border: 'none', borderRadius: '999px',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1rem', fontWeight: 700,
                  color: '#080808', cursor: 'pointer',
                  boxShadow: '0 0 24px rgba(201,168,76,0.3)',
                }}
              >
                Vertrag ansehen →
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: '0.9rem 2rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                  color: '#f5f5f5', cursor: 'pointer',
                }}
              >
                Schließen
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Plan selector */}
            <Field label="Tarif wählen">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {PLANS.map(p => (
                  <div
                    key={p.key}
                    onClick={() => setForm(f => ({ ...f, plan: p.key }))}
                    style={{
                      flex: '1 1 130px', padding: '1rem', borderRadius: '12px', cursor: 'pointer',
                      border: `1px solid ${form.plan === p.key ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.15)'}`,
                      background: form.plan === p.key ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.02)',
                      textAlign: 'center', transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      fontFamily: 'Playfair Display, serif', fontWeight: 700,
                      color: form.plan === p.key ? '#c9a84c' : 'rgba(245,245,245,0.5)',
                      fontSize: '1rem', marginBottom: '0.2rem',
                    }}>
                      {p.label}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
                      color: form.plan === p.key ? 'rgba(201,168,76,0.7)' : 'rgba(245,245,245,0.3)',
                    }}>
                      {p.monthly}/Mo · {p.calls} Calls
                    </div>
                  </div>
                ))}
              </div>
            </Field>

            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="cf-grid">
              <Field label="Firmenname">
                <input required value={form.company} onChange={set('company')} placeholder="z.B. Salon Müller" {...focused('company')} />
              </Field>
              <Field label="Ansprechpartner">
                <input required value={form.contact} onChange={set('contact')} placeholder="Vor- & Nachname" {...focused('contact')} />
              </Field>
            </div>

            {/* Adresse */}
            <Field label="Adresse">
              <input required value={form.address} onChange={set('address')} placeholder="Straße, PLZ, Ort" {...focused('address')} />
            </Field>

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="cf-grid">
              <Field label="E-Mail">
                <input required type="email" value={form.email} onChange={set('email')} placeholder="name@firma.de" {...focused('email')} />
              </Field>
              <Field label="Telefon">
                <input value={form.phone} onChange={set('phone')} placeholder="+49 ..." {...focused('phone')} />
              </Field>
            </div>

            {/* Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="cf-grid">
              <Field label="USt-IdNr. (optional)">
                <input value={form.vatId} onChange={set('vatId')} placeholder="DE123456789" {...focused('vatId')} />
              </Field>
              <Field label="Datenschutzbeauftragter (optional)">
                <input value={form.dsb} onChange={set('dsb')} placeholder='Name oder "keiner"' {...focused('dsb')} />
              </Field>
            </div>

            {status === 'error' && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#e53e3e', textAlign: 'center' }}>
                Fehler beim Senden. Bitte versuchen Sie es erneut.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                padding: '1rem 2.5rem',
                background: status === 'sending'
                  ? 'rgba(201,168,76,0.3)'
                  : 'linear-gradient(135deg, #c9a84c, #e4c46e)',
                border: 'none', borderRadius: '999px',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.05rem', fontWeight: 700,
                color: '#080808', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                alignSelf: 'center', minWidth: '220px',
                boxShadow: '0 0 30px rgba(201,168,76,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {status === 'sending' ? 'Wird gesendet ...' : 'Vertrag erstellen →'}
            </button>
          </form>
        )}
      </div>

      {showContract && (
        <ContractModal form={form} onClose={() => setShowContract(false)} />
      )}

      <style>{`
        @media (max-width: 600px) {
          .cf-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder { color: rgba(245,245,245,0.2); }
      `}</style>
    </>
  )
}
