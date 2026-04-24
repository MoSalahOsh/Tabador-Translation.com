import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(200),
  phone: z.string().min(5).max(30),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().max(200).optional(),
  message: z.string().min(5).max(2000),
  lang: z.enum(['en', 'ar']),
  honeypot: z.string().max(0).optional(),
})

let requestCount: Map<string, { count: number; reset: number }> = new Map()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = requestCount.get(ip)
  if (!entry || entry.reset < now) {
    requestCount.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 })
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const { name, phone, email, service, message } = parsed.data
  const emailTo = process.env.CONTACT_EMAIL_PRIMARY ?? 'newtabador@gmail.com'
  const emailCC = process.env.CONTACT_EMAIL_BACKUP ?? ''
  const resendKey = process.env.RESEND_API_KEY

  const subject = `[Tabador] Contact Message from ${name}`
  const htmlBody = `
    <h2>New Contact Message</h2>
    <table>
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
      ${email ? `<tr><td><strong>Email</strong></td><td>${email}</td></tr>` : ''}
      ${service ? `<tr><td><strong>Service</strong></td><td>${service}</td></tr>` : ''}
      <tr><td><strong>Message</strong></td><td><pre>${message}</pre></td></tr>
    </table>
  `

  if (resendKey) {
    try {
      const payload: Record<string, unknown> = {
        from: 'Tabador Website <onboarding@resend.dev>',
        to: [emailTo],
        subject,
        html: htmlBody,
      }
      if (emailCC) payload.cc = [emailCC]

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Resend error')
    } catch {
      return NextResponse.json({ error: 'Email service unavailable' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
