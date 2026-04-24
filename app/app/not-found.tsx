import Link from 'next/link'

export default function RootNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
      <p className="text-8xl font-extrabold text-brand-gold">404</p>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      <Link href="/en" className="px-6 py-3 rounded-lg bg-brand-navy text-white font-semibold hover:bg-brand-navy-light transition-colors">
        Go Home
      </Link>
    </div>
  )
}
