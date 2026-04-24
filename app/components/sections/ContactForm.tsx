'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Paperclip, X } from 'lucide-react'
import { track } from '@vercel/analytics'

type Dict = {
  contact: { form: string }
  quote: {
    name: string
    phone: string
    email: string
    emailOptional: string
    upload: string
    uploadHint: string
    fileTooLarge: string
    fileTypeBad: string
    removeFile: string
    submit: string
    submitting: string
    successTitle: string
    successBody: string
    errorTitle: string
    errorBody: string
    required: string
    invalidEmail: string
    serviceLabel: string
    serviceOptional: string
    messageLabel: string
  }
}

const MAX_FILE_BYTES = 3 * 1024 * 1024
const ALLOWED_EXT = /\.(pdf|jpe?g|png|webp|docx?)$/i
const ALLOWED_MIME = new Set([
  'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

type Props = { lang: string; dict: Dict; emailContact: string }

export function ContactForm({ lang, dict, emailContact }: Props) {
  const q = dict.quote
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [file, setFile] = useState<File | null>(null)
  const [fileErr, setFileErr] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const schema = z.object({
    name: z.string().min(2, q.required).max(200),
    phone: z.string().min(5, q.required).max(30),
    email: z.string().email(q.invalidEmail).optional().or(z.literal('')),
    service: z.string().max(200).optional(),
    message: z.string().min(5, q.required).max(2000),
    honeypot: z.string().max(0).optional(),
  })
  type Fields = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>({ resolver: zodResolver(schema) })

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileErr(null)
    const f = e.target.files?.[0] ?? null
    if (!f) { setFile(null); return }
    if (!ALLOWED_EXT.test(f.name) || !ALLOWED_MIME.has(f.type)) {
      setFileErr(q.fileTypeBad); setFile(null); e.target.value = ''; return
    }
    if (f.size > MAX_FILE_BYTES) {
      setFileErr(q.fileTooLarge); setFile(null); e.target.value = ''; return
    }
    setFile(f)
  }

  function fileToBase64(f: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => {
        const res = String(r.result ?? '')
        resolve(res.includes(',') ? res.split(',')[1] : res)
      }
      r.onerror = () => reject(r.error)
      r.readAsDataURL(f)
    })
  }

  const onSubmit = async (data: Fields) => {
    setStatus('sending')
    try {
      const payload: Record<string, unknown> = { ...data, lang }
      if (file) {
        payload.file = { filename: file.name, mimetype: file.type, contentBase64: await fileToBase64(file) }
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('API error')
      track('contact_submit', { lang, hasFile: !!file })
      setStatus('success'); reset(); setFile(null)
    } catch {
      track('contact_fail', { lang })
      const { name, phone, email, service, message } = data
      const body = [`Name: ${name}`, `Phone: ${phone}`, email ? `Email: ${email}` : '', service ? `Service: ${service}` : '', `Message: ${message}`]
        .filter(Boolean).join('%0A')
      window.location.href = `mailto:${emailContact}?subject=Contact%20from%20Tabador%20Website&body=${body}`
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 rounded-2xl bg-secondary/30 border border-border text-center space-y-2">
        <p className="text-2xl font-bold text-brand-gold">✓</p>
        <p className="font-semibold">{q.successTitle}</p>
        <p className="text-sm text-muted-foreground">{q.successBody}</p>
      </div>
    )
  }

  const isAr = lang === 'ar'
  const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" dir={isAr ? 'rtl' : 'ltr'}>
      <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" tabIndex={-1} />

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="cf-name">{q.name}</label>
        <input id="cf-name" type="text" {...register('name')} className={inputCls} />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="cf-phone">{q.phone}</label>
        <input id="cf-phone" type="tel" inputMode="tel" {...register('phone')} className={inputCls} />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="cf-email">
          {q.email} <span className="text-muted-foreground font-normal">({q.emailOptional})</span>
        </label>
        <input id="cf-email" type="email" inputMode="email" {...register('email')} className={inputCls} />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="cf-service">
          {q.serviceLabel} <span className="text-muted-foreground font-normal">({q.serviceOptional})</span>
        </label>
        <input id="cf-service" type="text" {...register('service')} className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="cf-message">{q.messageLabel}</label>
        <textarea id="cf-message" rows={4} {...register('message')} className={inputCls + ' resize-none'} />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-file" className="block text-sm font-medium mb-1.5">{q.upload}</label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="cf-file"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-border bg-background hover:bg-secondary/60 cursor-pointer text-sm transition-colors"
          >
            <Paperclip size={16} />
            {file ? file.name : q.upload}
          </label>
          <input
            ref={fileInputRef}
            id="cf-file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
            onChange={onFileChange}
            className="hidden"
          />
          {file && (
            <button
              type="button"
              aria-label={q.removeFile}
              onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
              className="p-1 rounded hover:bg-muted"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{q.uploadHint}</p>
        {fileErr && <p className="text-xs text-destructive mt-1">{fileErr}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-brand-navy-light transition-colors disabled:opacity-60"
      >
        <Send size={16} />
        {status === 'sending' ? q.submitting : dict.contact.form}
      </button>

      {status === 'error' && <p className="text-sm text-destructive">{q.errorBody}</p>}
    </form>
  )
}
