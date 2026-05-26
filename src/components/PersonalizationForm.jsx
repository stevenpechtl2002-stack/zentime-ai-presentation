import { useState } from 'react'
import { useLang } from '../LanguageContext'
import ContractModal from './ContractModal'
import { buildFullContract } from '../contractBuilder'

const FORM_EMAIL = 'stevenpechtl2002@gmail.com'

const INDUSTRIES_DE = ['Beauty Salon', 'Friseur / Barbershop', 'Kfz-Werkstatt', 'Fitnessstudio', 'Restaurant', 'Bar / Club', 'Hotel / Pension', 'Massage & Wellness', 'Autowäsche', 'IT / Software', 'Sonstiges']
const INDUSTRIES_EN = ['Beauty Salon', 'Hair / Barber Shop', 'Auto Workshop', 'Fitness Studio', 'Restaurant', 'Bar / Club', 'Hotel / Guesthouse', 'Massage & Wellness', 'Car Wash', 'IT / Software', 'Other']
const LANGUAGES = ['Deutsch', 'Englisch', 'Türkisch', 'Arabisch', 'Spanisch', 'Andere']

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

export default function PersonalizationForm() {
  const { lang } = useLang()
  const industries = lang === 'de' ? INDUSTRIES_DE : INDUSTRIES_EN
  const isDE = lang === 'de'

  const [form, setForm] = useState({
    company: '', industry: '', contact: '', email: '',
    phone: '', agentLang: 'Deutsch', hours: '',
    requests: '', notes: '',
    address: '', vatId: '', dsb: '',
    plan: 'STARTER',
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
          _subject:  `ZenTime AI – ${form.plan} – ${form.company}`,
          Tarif:     form.plan,
          Firmenname: form.company,
          Adresse:   form.address,
          Branche:   form.industry,
          Kontakt:   form.contact,
          Email:     form.email,
          Telefon:   form.phone,
          Sprache:   form.agentLang,
          Öffnungszeiten: form.hours,
          'USt-IdNr': form.vatId,
          DSB:       form.dsb,
          Typische_Anfragen: form.requests,
          Besonderheiten: form.notes,
          Vertrag:   contractText,
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
    <section
      id="personalization"
      className="flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0a0a 100%)' }}
    >
      <div className="max-w-3xl w-full">
        <div style={{
          fontSize: '0.72rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          {isDE ? 'Ihr KI Assistent' : 'Your AI Assistant'}
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '0.75rem',
        }}>
          {isDE ? 'Jetzt personalisieren' : 'Personalize now'}
        </h2>
        <p style={{
          textAlign: 'center', fontFamily: 'Inter, sans-serif',
          fontSize: '0.95rem', color: 'rgba(245,245,245,0.4)',
          marginBottom: '3rem',
        }}>
          {isDE
            ? 'Füllen Sie das Formular aus — wir richten Ihren KI Assistenten ein und melden uns.'
            : 'Fill out the form — we set up your AI assistant and get back to you.'}
        </p>

        {status === 'success' ? (
          <div style={{
            padding: '3rem', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))',
            border: '1px solid rgba(34,197,94,0.25)', borderRadius: '20px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#f5f5f5', marginBottom: '0.75rem' }}>
              {isDE ? 'Vielen Dank!' : 'Thank you!'}
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(245,245,245,0.5)', fontSize: '1rem', marginBottom: '2rem' }}>
              {isDE
                ? 'Ihre Angaben wurden übermittelt. Wir melden uns innerhalb von 24 Stunden.'
                : 'Your details have been submitted. We will get back to you within 24 hours.'}
            </p>
            <button
              onClick={() => setShowContract(true)}
              style={{
                padding: '0.9rem 2.5rem',
                background: 'linear-gradient(135deg, #c9a84c, #e4c46e)',
                border: 'none', borderRadius: '999px',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1rem', fontWeight: 700,
                color: '#080808', cursor: 'pointer',
                boxShadow: '0 0 24px rgba(201,168,76,0.3)',
              }}
            >
              {isDE ? 'Vertrag erneut öffnen →' : 'Open contract again →'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Plan selector */}
            <Field label={isDE ? 'Tarif wählen' : 'Select plan'}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {PLANS.map(p => (
                  <div
                    key={p.key}
                    onClick={() => setForm(f => ({ ...f, plan: p.key }))}
                    style={{
                      flex: '1 1 140px', padding: '1rem', borderRadius: '12px', cursor: 'pointer',
                      border: `1px solid ${form.plan === p.key ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.15)'}`,
                      background: form.plan === p.key ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.02)',
                      textAlign: 'center', transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      fontFamily: 'Playfair Display, serif', fontWeight: 700,
                      color: form.plan === p.key ? '#c9a84c' : 'rgba(245,245,245,0.5)',
                      fontSize: '1rem', marginBottom: '0.25rem',
                    }}>
                      {p.label}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
                      color: form.plan === p.key ? 'rgba(201,168,76,0.7)' : 'rgba(245,245,245,0.3)',
                    }}>
                      {p.monthly}/Mo · {p.calls} Calls
                    </div>
                  </div>
                ))}
              </div>
            </Field>

            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-grid">
              <Field label={isDE ? 'Firmenname' : 'Company name'}>
                <input required value={form.company} onChange={set('company')} placeholder={isDE ? 'z.B. Salon Müller' : 'e.g. Salon Miller'} {...focused('company')} />
              </Field>
              <Field label={isDE ? 'Branche' : 'Industry'}>
                <select required value={form.industry} onChange={set('industry')} {...focused('industry')} style={{ ...inputStyle, borderColor: focusedField === 'industry' ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.2)', cursor: 'pointer' }}>
                  <option value="" disabled style={{ background: '#111' }}>{isDE ? 'Bitte wählen' : 'Please select'}</option>
                  {industries.map(i => <option key={i} value={i} style={{ background: '#111' }}>{i}</option>)}
                </select>
              </Field>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-grid">
              <Field label={isDE ? 'Ansprechpartner' : 'Contact person'}>
                <input required value={form.contact} onChange={set('contact')} placeholder={isDE ? 'Vor- & Nachname' : 'First & last name'} {...focused('contact')} />
              </Field>
              <Field label="E-Mail">
                <input required type="email" value={form.email} onChange={set('email')} placeholder="name@firma.de" {...focused('email')} />
              </Field>
            </div>

            {/* Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-grid">
              <Field label={isDE ? 'Telefonnummer' : 'Phone number'}>
                <input value={form.phone} onChange={set('phone')} placeholder="+49 ..." {...focused('phone')} />
              </Field>
              <Field label={isDE ? 'Sprache des Assistenten' : 'Assistant language'}>
                <select value={form.agentLang} onChange={set('agentLang')} {...focused('agentLang')} style={{ ...inputStyle, borderColor: focusedField === 'agentLang' ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.2)', cursor: 'pointer' }}>
                  {LANGUAGES.map(l => <option key={l} value={l} style={{ background: '#111' }}>{l}</option>)}
                </select>
              </Field>
            </div>

            {/* Adresse */}
            <Field label={isDE ? 'Adresse (für Vertrag)' : 'Address (for contract)'}>
              <input value={form.address} onChange={set('address')} placeholder={isDE ? 'Straße, PLZ, Ort' : 'Street, ZIP, City'} {...focused('address')} />
            </Field>

            {/* Row 4 – VAT + DSB */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-grid">
              <Field label={isDE ? 'USt-IdNr. (optional)' : 'VAT ID (optional)'}>
                <input value={form.vatId} onChange={set('vatId')} placeholder="DE123456789" {...focused('vatId')} />
              </Field>
              <Field label={isDE ? 'Datenschutzbeauftragter (optional)' : 'Data protection officer (optional)'}>
                <input value={form.dsb} onChange={set('dsb')} placeholder={isDE ? 'Name oder "keiner"' : 'Name or "none"'} {...focused('dsb')} />
              </Field>
            </div>

            {/* Öffnungszeiten */}
            <Field label={isDE ? 'Öffnungszeiten' : 'Business hours'}>
              <input value={form.hours} onChange={set('hours')} placeholder={isDE ? 'z.B. Mo–Fr 9–18 Uhr, Sa 10–14 Uhr' : 'e.g. Mon–Fri 9am–6pm, Sat 10am–2pm'} {...focused('hours')} />
            </Field>

            {/* Typische Anfragen */}
            <Field label={isDE ? 'Typische Anruf-Anfragen' : 'Typical call requests'}>
              <textarea
                required
                rows={3}
                value={form.requests}
                onChange={set('requests')}
                placeholder={isDE
                  ? 'z.B. Terminbuchung, Preisanfragen, Öffnungszeiten, Stornierungen ...'
                  : 'e.g. Appointment booking, price inquiries, opening hours, cancellations ...'}
                {...focused('requests')}
                style={{ ...inputStyle, borderColor: focusedField === 'requests' ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.2)', resize: 'vertical' }}
              />
            </Field>

            {/* Besonderheiten */}
            <Field label={isDE ? 'Besonderheiten / Sonstige Wünsche' : 'Special notes / requests'}>
              <textarea
                rows={3}
                value={form.notes}
                onChange={set('notes')}
                placeholder={isDE
                  ? 'z.B. Bestimmte Begrüßung, spezielle Angebote, keine Anrufe Sonntags ...'
                  : 'e.g. Specific greeting, special offers, no calls on Sundays ...'}
                {...focused('notes')}
                style={{ ...inputStyle, borderColor: focusedField === 'notes' ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.2)', resize: 'vertical' }}
              />
            </Field>

            {status === 'error' && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#e53e3e', textAlign: 'center' }}>
                {isDE ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' : 'Error sending. Please try again.'}
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
                fontSize: '1.1rem', fontWeight: 700,
                color: '#080808', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                alignSelf: 'center',
                boxShadow: '0 0 30px rgba(201,168,76,0.3)',
                transition: 'all 0.3s ease',
                minWidth: '200px',
              }}
              onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {status === 'sending'
                ? (isDE ? 'Wird gesendet ...' : 'Sending ...')
                : (isDE ? 'Absenden & starten' : 'Submit & get started')}
            </button>
          </form>
        )}
      </div>

      {showContract && (
        <ContractModal form={form} onClose={() => setShowContract(false)} />
      )}

      <style>{`
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(245,245,245,0.2); }
        select option { background: #111; color: #f5f5f5; }
      `}</style>
    </section>
  )
}
