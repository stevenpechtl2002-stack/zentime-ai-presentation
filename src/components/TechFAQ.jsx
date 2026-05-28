import { useState, useRef, useEffect } from 'react'
import { useLang } from '../LanguageContext'

const FAQ_DE = [
  {
    q: 'Welche Technologie steckt dahinter?',
    a: 'TTS-System für die Sprachverarbeitung, n8n für die Workflow-Automatisierung, Supabase als Datenbank-Backend — deployment über eigene Infrastruktur. Vollständig EU-konform, Daten auf Servern in Deutschland.',
  },
  {
    q: 'Gibt es eine API?',
    a: 'Ja — über n8n kann ich quasi jede bestehende Software anbinden. Sag mir was du nutzt, ich prüfe die Integration direkt.',
  },
  {
    q: 'Wo werden die Daten gespeichert?',
    a: 'Ausschließlich EU — Supabase läuft auf AWS Frankfurt. Kein Drittlandtransfer außer dem TTS-System-Anbieter (USA), dafür haben wir Standardvertragsklauseln nach Art. 46 DSGVO. AVV ist im Vertrag direkt inklusive.',
  },
  {
    q: 'Was ist die Latenz beim Anruf?',
    a: 'Das TTS-System liegt bei unter 500ms Response-Zeit. In der Praxis klingt das Gespräch flüssig — keine merkliche Pause.',
  },
  {
    q: 'Was passiert bei einem Ausfall des TTS-Systems?',
    a: 'Dann greift die Weiterleitung — der Anruf landet bei dir direkt. Ausfälle von Drittanbietern sind im SLA explizit geregelt und von der Haftung ausgeschlossen.',
  },
  {
    q: 'Kann ich den Gesprächsablauf anpassen?',
    a: 'Ja — du sagst mir was geändert werden soll, ich setze es um. Begrüßungstext, Routing-Regeln, Antworten, Gesprächslogik — kein technisches Wissen deinerseits nötig.',
  },
  {
    q: 'Wie skaliert das bei hohem Anrufvolumen?',
    a: 'TTS-System und Supabase skalieren automatisch. Parallele Anrufe sind kein Problem — kein manuelles Capacity Planning nötig.',
  },
  {
    q: 'Werden Gespräche aufgezeichnet und wer hat Zugriff?',
    a: 'Nein — weder Rohaufnahmen noch Transkriptionen werden gespeichert. Das TTS-System verarbeitet die Sprache in Echtzeit und speichert keine dauerhaften Daten. Nach dem Gespräch bleibt nichts zurück.',
  },
  {
    q: 'Wie läuft das Onboarding technisch ab?',
    a: 'Du gibst mir deine Anforderungen, ich richte alles ein — Rufnummer, Gesprächslogik, Kalenderanbindung. Du bekommst den fertigen Assistenten, keine technische Arbeit deinerseits.',
  },
  {
    q: 'Kann ich das in meine eigene Plattform einbetten für meine Kunden?',
    a: 'Interessante Frage — das wäre ein Reseller-Modell. Lass uns das separat besprechen, da gibt es Möglichkeiten.',
    highlight: true,
  },
]

const FAQ_EN = [
  {
    q: 'What technology is behind it?',
    a: 'TTS-System for voice processing, n8n for workflow automation, Supabase as database backend — deployed on own infrastructure. Fully EU-compliant, data on servers in Germany.',
  },
  {
    q: 'Is there an API?',
    a: 'Yes — via n8n I can connect virtually any existing software. Tell me what you use and I\'ll check the integration directly.',
  },
  {
    q: 'Where is data stored?',
    a: 'EU only — Supabase runs on AWS Frankfurt. No third-country transfer except the TTS-system provider (USA), for which we have Standard Contractual Clauses under Art. 46 GDPR. DPA is included directly in the contract.',
  },
  {
    q: 'What is the call latency?',
    a: 'TTS-System response time is under 500ms. In practice the conversation sounds fluid — no noticeable pause.',
  },
  {
    q: 'What happens if the TTS system goes down?',
    a: 'Failover kicks in — the call routes directly to you. Third-party outages are explicitly covered in the SLA and excluded from liability.',
  },
  {
    q: 'Can the conversation flow be customized?',
    a: 'Yes — you tell me what needs to change, I implement it. Greeting text, routing rules, responses, conversation logic — no technical knowledge required on your end.',
  },
  {
    q: 'How does it scale at high call volume?',
    a: 'TTS-System and Supabase scale automatically. Parallel calls are no problem — no manual capacity planning needed.',
  },
  {
    q: 'Are conversations recorded and who has access?',
    a: 'No — neither raw recordings nor transcriptions are stored. The TTS system processes speech in real time and stores no permanent data. After the call, nothing is retained.',
  },
  {
    q: 'How does technical onboarding work?',
    a: 'You give me your requirements, I set everything up — phone number, conversation logic, calendar integration. You get the finished assistant, no technical work on your end.',
  },
  {
    q: 'Can I embed this in my own platform for my customers?',
    a: 'Great question — that would be a reseller model. Let\'s discuss that separately, there are possibilities.',
    highlight: true,
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0)
    }
  }, [open])

  return (
    <div style={{
      border: `1px solid ${item.highlight
        ? 'rgba(201,168,76,0.3)'
        : 'rgba(201,168,76,0.1)'}`,
      borderRadius: '14px',
      background: item.highlight
        ? 'rgba(201,168,76,0.05)'
        : 'rgba(255,255,255,0.02)',
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '1.25rem 1.5rem',
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: '1rem',
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.92rem', fontWeight: 600,
          color: item.highlight ? '#c9a84c' : '#f5f5f5',
          lineHeight: 1.4,
        }}>
          {item.highlight && '⭐ '}{item.q}
        </span>
        <span style={{
          color: 'rgba(201,168,76,0.6)', fontSize: '1.1rem',
          flexShrink: 0, transition: 'transform 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          +
        </span>
      </button>

      <div style={{
        height: `${height}px`,
        overflow: 'hidden',
        transition: 'height 0.3s ease',
      }}>
        <div ref={contentRef} style={{
          padding: '0 1.5rem 1.25rem',
          fontFamily: 'Inter, sans-serif', fontSize: '0.87rem',
          color: 'rgba(245,245,245,0.6)', lineHeight: 1.7,
        }}>
          {item.a}
        </div>
      </div>
    </div>
  )
}

export default function TechFAQ() {
  const { lang } = useLang()
  const isDE = lang === 'de'
  const items = isDE ? FAQ_DE : FAQ_EN

  return (
    <section
      id="faq"
      className="flex flex-col items-center justify-center px-8 py-24"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #080808 100%)' }}
    >
      <div className="max-w-3xl w-full">
        <div style={{
          fontSize: '0.72rem', letterSpacing: '0.4em',
          color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem', textAlign: 'center',
        }}>
          {isDE ? 'Technische Details' : 'Technical Details'}
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800, color: '#f5f5f5',
          textAlign: 'center', marginBottom: '0.75rem',
        }}>
          {isDE ? 'Häufige Fragen' : 'Frequently Asked Questions'}
        </h2>
        <p style={{
          textAlign: 'center', fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem', color: 'rgba(245,245,245,0.35)',
          marginBottom: '3rem',
        }}>
          {isDE
            ? 'Für alle die genau wissen wollen wie es funktioniert.'
            : 'For everyone who wants to know exactly how it works.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
