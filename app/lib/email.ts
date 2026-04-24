const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function esc(input: string): string {
  return String(input).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c)
}

export function isSameOrigin(req: Request, allowedHost: string): boolean {
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')
  try {
    if (origin) return new URL(origin).host === allowedHost
    if (referer) return new URL(referer).host === allowedHost
  } catch {
    return false
  }
  return false
}

export const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

export const ALLOWED_EXT = /\.(pdf|jpe?g|png|webp|docx?|)$/i
export const MAX_FILE_BYTES = 3 * 1024 * 1024 // 3 MB raw (~4 MB base64)

export type AttachmentInput = {
  filename: string
  mimetype: string
  contentBase64: string
}

export function validateAttachment(att: AttachmentInput | undefined): string | null {
  if (!att) return null
  if (!att.filename || typeof att.filename !== 'string') return 'Invalid filename'
  if (!ALLOWED_EXT.test(att.filename)) return 'Unsupported file type'
  if (!ALLOWED_MIME.has(att.mimetype)) return 'Unsupported mimetype'
  const approxBytes = Math.floor((att.contentBase64.length * 3) / 4)
  if (approxBytes > MAX_FILE_BYTES) return 'File too large (max 3 MB)'
  return null
}
