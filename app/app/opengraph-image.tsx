import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1E2A6E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#A07850',
            marginBottom: 20,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Certified Translation · Dammam, Saudi Arabia
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Tabador Translation Est.
        </div>
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          مؤسسة دار تبادر للترجمة
        </div>
        <div
          style={{
            display: 'flex',
            gap: 32,
            fontSize: 16,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <span>Licence No. 317</span>
          <span>·</span>
          <span>C.R. 2051221647</span>
          <span>·</span>
          <span>Embassy Accepted</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
