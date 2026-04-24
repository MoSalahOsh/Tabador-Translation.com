'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send } from 'lucide-react'
import { track } from '@vercel/analytics'

const schema = z.object({
  name: z.string().min(2).max(200),
  phone: z.string().min(5).max(30),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().max(200).optional(),
  message: z.string().min(5).max(2000),
  honeypot: z.string().max(0).optional(),
})

type Fields = z.infer<typeof schema>

type Props = {
  lang: string
  dict: {
    contact: {
      form: string
    }
    quote: {
      name: string
      phone: string
      submit: string
      submitting: string
      successTitle: string
      successBody: string
      errorTitle: string
      errorBody: string
    }
  }
  emailContact: string
}

export function ContactForm({ lang, dict, emailContact }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Fields>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Fields) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      })
      if (res.ok) {
        track('contact_submit', { lang })
        setStatus('success')
        reset()
      } else {
        throw new Error('API error')
      }
    } catch {
      track('contact_fail', { lang })
      const { name, phone, email, service, message } = data
      const body = [
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : '',
        service ? `Service: ${service}` : '',
        `Message: ${message}`,
      ].filter(Boolean).join('%0A')
      window.location.href = `mailto:${emailContact}?subject=Contact%20from%20Tabador%20Website&body=${body}`
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 rounded-2xl bg-secondary/30 border border-border text-center space-y-2">
        <p className="text-2xl font-bold text-brand-gold">✓</p>
        <p className="font-semibold">{dict.quote.successTitle}</p>
        <p className="text-sm text-muted-foreground">{dict.quote.successBody}</p>
      </div>
    )
  }

  const isAr = lang === 'ar'
  const labelEn: Record<string, string> = {
    name: dict.quote.name,
    phone: dict.quote.phone,
    email: lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)',
    service: lang === 'ar' ? 'الخدمة المطلوبة (اختياري)' : 'Service needed (optional)',
    message: lang === 'ar' ? 'رسالتك' : 'Your message',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" dir={isAr ? 'rtl' : 'ltr'}>
      <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" tabIndex={-1} />

      {([['name', 'text'], ['phone', 'tel'], ['email', 'email']] as const).map(([field, type]) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1.5" htmlFor={`cf-${field}`}>
            {labelEn[field]}
          </label>
          <input
            id={`cf-${field}`}
            type={type}
            {...register(field)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
          />
          {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]?.message}</p>}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="cf-service">{labelEn.service}</label>
        <input
          id="cf-service"
          type="text"
          {...register('service')}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="cf-message">{labelEn.message}</label>
        <textarea
          id="cf-message"
          rows={4}
          {...register('message')}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 resize-none"
        />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-brand-navy-light transition-colors disabled:opacity-60"
      >
        <Send size={16} />
        {status === 'sending' ? dict.quote.submitting : dict.quote.submit}
      </button>

      {status === 'error' && (
        <p className="text-sm text-destructive">{dict.quote.errorBody}</p>
      )}
    </form>
  )
}
