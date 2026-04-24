'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { track } from '@vercel/analytics'
import { CheckCircle, AlertCircle, Paperclip, X } from 'lucide-react'

type Dict = {
  quote: {
    docType: string
    docTypePlaceholder: string
    langFrom: string
    langTo: string
    name: string
    phone: string
    email: string
    emailOptional: string
    notes: string
    notesOptional: string
    upload: string
    uploadHint: string
    fileTooLarge: string
    fileTypeBad: string
    removeFile: string
    submit: string
    submitWhatsApp: string
    submitting: string
    successTitle: string
    successBody: string
    errorTitle: string
    errorBody: string
    required: string
    invalidEmail: string
  }
}

const MAX_FILE_BYTES = 3 * 1024 * 1024
const ALLOWED_EXT = /\.(pdf|jpe?g|png|webp|docx?)$/i
const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

type Props = {
  lang: string
  dict: Dict
  site: { contact: { whatsapp: string; whatsappMessage: string; email: string } }
}

export function QuickQuoteForm({ lang, dict, site }: Props) {
  const q = dict.quote
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fileErr, setFileErr] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const schema = z.object({
    docType: z.string().min(2, q.required),
    langFrom: z.string().min(2, q.required),
    langTo: z.string().min(2, q.required),
    name: z.string().min(2, q.required),
    phone: z.string().min(7, q.required),
    email: z.string().email(q.invalidEmail).optional().or(z.literal('')),
    notes: z.string().max(2000).optional().or(z.literal('')),
    honeypot: z.string().max(0).optional(),
  })
  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

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
        const b64 = res.includes(',') ? res.split(',')[1] : res
        resolve(b64)
      }
      r.onerror = () => reject(r.error)
      r.readAsDataURL(f)
    })
  }

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const payload: Record<string, unknown> = { ...data, lang }
      if (file) {
        payload.file = {
          filename: file.name,
          mimetype: file.type,
          contentBase64: await fileToBase64(file),
        }
      }
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('API error')
      track('form_submit', { lang, form: 'quick-quote', hasFile: !!file })
      setStatus('success')
    } catch {
      track('form_fail', { lang, form: 'quick-quote' })
      const body = encodeURIComponent(
        `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email ?? ''}\nDocument: ${data.docType}\nFrom: ${data.langFrom}\nTo: ${data.langTo}\nNotes: ${data.notes ?? ''}`
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

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring'

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="space-y-4 bg-card rounded-2xl p-6 shadow-md border border-border">
      <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="qq-docType" className="text-sm font-medium mb-1 block">{q.docType}</label>
          <input id="qq-docType" {...register('docType')} placeholder={q.docTypePlaceholder} className={inputCls} />
          {errors.docType && <p className="text-xs text-destructive mt-1">{errors.docType.message}</p>}
        </div>
        <div>
          <label htmlFor="qq-name" className="text-sm font-medium mb-1 block">{q.name}</label>
          <input id="qq-name" {...register('name')} className={inputCls} />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="qq-langFrom" className="text-sm font-medium mb-1 block">{q.langFrom}</label>
          <input id="qq-langFrom" {...register('langFrom')} className={inputCls} />
          {errors.langFrom && <p className="text-xs text-destructive mt-1">{errors.langFrom.message}</p>}
        </div>
        <div>
          <label htmlFor="qq-langTo" className="text-sm font-medium mb-1 block">{q.langTo}</label>
          <input id="qq-langTo" {...register('langTo')} className={inputCls} />
          {errors.langTo && <p className="text-xs text-destructive mt-1">{errors.langTo.message}</p>}
        </div>
        <div>
          <label htmlFor="qq-phone" className="text-sm font-medium mb-1 block">{q.phone}</label>
          <input id="qq-phone" type="tel" inputMode="tel" {...register('phone')} className={inputCls} />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="qq-email" className="text-sm font-medium mb-1 block">
            {q.email} <span className="text-muted-foreground font-normal">({q.emailOptional})</span>
          </label>
          <input id="qq-email" type="email" inputMode="email" {...register('email')} className={inputCls} />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="qq-notes" className="text-sm font-medium mb-1 block">
          {q.notes} <span className="text-muted-foreground font-normal">({q.notesOptional})</span>
        </label>
        <textarea id="qq-notes" rows={3} {...register('notes')} className={inputCls + ' resize-none'} />
      </div>

      {/* File upload */}
      <div>
        <label htmlFor="qq-file" className="text-sm font-medium mb-1 block">{q.upload}</label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="qq-file"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-border bg-background hover:bg-secondary/60 cursor-pointer text-sm transition-colors"
          >
            <Paperclip size={16} />
            {file ? file.name : q.upload}
          </label>
          <input
            ref={fileInputRef}
            id="qq-file"
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

      <a
        href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex justify-center py-3 rounded-xl border border-brand-navy text-brand-navy font-semibold hover:bg-brand-navy/10 transition-colors text-sm"
      >
        {q.submitWhatsApp}
      </a>
    </form>
  )
}
