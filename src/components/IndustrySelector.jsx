import { INDUSTRIES } from '../data/industries'

export default function IndustrySelector({ selected, onChange }) {
  return (
    <section
      id="industry-selector"
      style={{
        background: '#080808',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        padding: '2rem 2rem 1.5rem',
        position: 'sticky',
        top: '64px',
        zIndex: 40,
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(8,8,8,0.95)',
      }}
    >
      <p style={{
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.7rem',
        letterSpacing: '0.35em',
        color: 'rgba(201,168,76,0.5)',
        textTransform: 'uppercase',
        marginBottom: '1.25rem',
      }}>
        Wählen Sie Ihre Branche
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem',
        justifyContent: 'center',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {INDUSTRIES.map((ind) => {
          const active = selected?.id === ind.id
          return (
            <button
              key={ind.id}
              onClick={() => onChange(ind)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                border: `1px solid ${active ? '#c9a84c' : 'rgba(201,168,76,0.18)'}`,
                background: active
                  ? 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))'
                  : 'rgba(201,168,76,0.03)',
                color: active ? '#c9a84c' : 'rgba(245,245,245,0.5)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: active ? '0 0 16px rgba(201,168,76,0.18)' : 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                  e.currentTarget.style.color = 'rgba(245,245,245,0.8)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'
                  e.currentTarget.style.color = 'rgba(245,245,245,0.5)'
                }
              }}
            >
              <span style={{ fontSize: '1rem' }}>{ind.icon}</span>
              {ind.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
