import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { esc, isSameOrigin, validateAttachment, type AttachmentInput } from '@/lib/email'

const schema = z.object({
  name: z.string().min(2).max(200),
  phone: z.string().min(5).max(30),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().max(200).optional(),
  message: z.string().min(5).max(2000),
  lang: z.enum(['en', 'ar']),
  honeypot: z.string().max(0).optional(),
  file: z
    .object({
      filename: z.string().max(200),
      mimetype: z.string().max(200),
      contentBase64: z.string().max(6_000_000),
    })
    .optional(),
})

const ALLOWED_HOSTS = new Set(['tabador-translation.com', 'www.tabador-translation.com', 'tabador-translation.vercel.app', 'localhost:3000'])

const requestCount = new Map<string, { count: number; reset: number }>()

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
  const host = request.headers.get('host') ?? ''
  if (!ALLOWED_HOSTS.has(host) && !isSameOrigin(request, host)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

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

  const { name, phone, email, service, message, file } = parsed.data

  const fileErr = validateAttachment(file as AttachmentInput | undefined)
  if (fileErr) {
    return NextResponse.json({ error: fileErr }, { status: 415 })
  }

  const emailTo = process.env.CONTACT_EMAIL_PRIMARY ?? 'newtabador@gmail.com'
  const emailCC = process.env.CONTACT_EMAIL_BACKUP ?? ''
  const resendKey = process.env.RESEND_API_KEY

  const waLink = `https://wa.me/${phone.replace(/\D/g, '')}`

  const subject = `[Tabador] Contact — ${esc(name)}`
  const htmlBody = `
    <h2>New Contact Message</h2>
    <table style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${esc(name)}</td></tr>
      <tr><td><strong>Phone</strong></td><td><a href="tel:${esc(phone)}">${esc(phone)}</a> · <a href="${esc(waLink)}">WhatsApp</a></td></tr>
      ${email ? `<tr><td><strong>Email</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>` : ''}
      ${service ? `<tr><td><strong>Service</strong></td><td>${esc(service)}</td></tr>` : ''}
      <tr><td valign="top"><strong>Message</strong></td><td><pre style="white-space:pre-wrap;margin:0;font-family:inherit">${esc(message)}</pre></td></tr>
      ${file ? `<tr><td><strong>Attachment</strong></td><td>${esc(file.filename)}</td></tr>` : ''}
    </table>
  `

  if (!resendKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  try {
    const payload: Record<string, unknown> = {
      from: 'Tabador Website <onboarding@resend.dev>',
      to: [emailTo],
      subject,
      html: htmlBody,
      reply_to: email ? email : undefined,
    }
    if (emailCC) payload.cc = [emailCC]
    if (file) {
      payload.attachments = [{ filename: file.filename, content: file.contentBase64 }]
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Resend error')
  } catch {
    return NextResponse.json({ error: 'Email service unavailable' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
