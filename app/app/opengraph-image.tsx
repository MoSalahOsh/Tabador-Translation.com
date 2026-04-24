import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Tabador Translation Est. — Certified Translation in Dammam, Saudi Arabia'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1E2A6E 0%, #2a3a8a 50%, #1E2A6E 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, transparent, #C99D52, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, transparent, #C99D52, transparent)' }} />

        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '10px 22px', background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(201,157,82,0.4)', borderRadius: 999,
          marginBottom: 32, fontSize: 18, color: '#C99D52',
          letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
        }}>
          <span style={{ width: 10, height: 10, background: '#C99D52', borderRadius: 999 }} />
          Certified Translation · Dammam · KSA
        </div>

        <div style={{
          fontSize: 84, fontWeight: 800, color: '#ffffff',
          textAlign: 'center', lineHeight: 1.05, marginBottom: 12, letterSpacing: '-0.02em',
        }}>
          Tabador Translation Est.
        </div>

        <div style={{
          fontSize: 44, color: '#C99D52', textAlign: 'center', marginBottom: 36, fontWeight: 700,
        }}>
          مؤسسة دار تبادر للترجمة
        </div>

        <div style={{
          fontSize: 24, color: 'rgba(255,255,255,0.85)',
          textAlign: 'center', marginBottom: 44, maxWidth: 920,
        }}>
          Accepted by all government authorities and embassies — first time, every time.
        </div>

        <div style={{
          display: 'flex', gap: 28, fontSize: 18,
          color: 'rgba(255,255,255,0.65)', alignItems: 'center',
        }}>
          <span>Licence No. 317</span>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: '#C99D52' }} />
          <span>C.R. 2051221647</span>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: '#C99D52' }} />
          <span>15+ Years</span>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: '#C99D52' }} />
          <span>100+ Languages</span>
        </div>

        <div style={{
          position: 'absolute', bottom: 36, right: 60,
          fontSize: 16, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em',
        }}>
          tabador-translation.com
        </div>
      </div>
    ),
    { ...size }
  )
}
