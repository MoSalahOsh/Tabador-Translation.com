'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { track } from '@vercel/analytics'
import { CheckCircle, AlertCircle } from 'lucide-react'

const schema = z.object({
  docType: z.string().min(2, 'Required'),
  langFrom: z.string().min(2, 'Required'),
  langTo: z.string().min(2, 'Required'),
  name: z.string().min(2, 'Required'),
  phone: z.string().min(7, 'Required'),
})

type FormData = z.infer<typeof schema>

type Props = {
  lang: string
  dict: { quote: Record<string, string> }
  site: { contact: { whatsapp: string; whatsappMessage: string; email: string } }
}

export function QuickQuoteForm({ lang, dict, site }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const q = dict.quote

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      })
      if (!res.ok) throw new Error('API error')
      track('form_submit', { lang, form: 'quick-quote' })
      setStatus('success')
    } catch {
      track('form_fail', { lang, form: 'quick-quote' })
      // Fallback: open mailto with form contents
      const body = encodeURIComponent(
        `Name: ${data.name}\nPhone: ${data.phone}\nDocument: ${data.docType}\nFrom: ${data.langFrom}\nTo: ${data.langTo}`
      )
      window.location.href = `mailto:${site.contact.email}?subject=Translation Request&body=${body}`
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle className="text-green-500" size={48} />
        <h3 className="text-lg font-semibold">{q.successTitle}</h3>
        <p className="text-muted-foreground">{q.successBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card rounded-2xl p-6 shadow-md border border-border">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">{q.docType}</label>
          <input
            {...register('docType')}
            placeholder={q.docTypePlaceholder}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.docType && <p className="text-xs text-destructive mt-1">{errors.docType.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">{q.name}</label>
          <input
            {...register('name')}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">{q.langFrom}</label>
          <input
            {...register('langFrom')}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.langFrom && <p className="text-xs text-destructive mt-1">{errors.langFrom.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">{q.langTo}</label>
          <input
            {...register('langTo')}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.langTo && <p className="text-xs text-destructive mt-1">{errors.langTo.message}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">{q.phone}</label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
          <AlertCircle size={16} />
          {q.errorBody}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-xl bg-brand-navy text-white font-bold hover:bg-brand-navy-light transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? q.submitting : q.submit}
      </button>

      {/* WhatsApp fallback CTA */}
      <a
        href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex justify-center py-3 rounded-xl border border-[#25D366] text-[#25D366] font-semibold hover:bg-[#25D366]/10 transition-colors text-sm"
      >
        {q.submitWhatsApp}
      </a>
    </form>
  )
}
