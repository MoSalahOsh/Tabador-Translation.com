import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from '../dictionaries'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'ar' ? 'سياسة الخصوصية | مؤسسة دار تبادر للترجمة' : 'Privacy Policy | Tabador Translation Est.',
    robots: { index: false },
  }
}

const content = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: April 2026',
    sections: [
      {
        heading: '1. Who We Are',
        body: 'Tabador Translation Est. ("we", "our") is a certified translation office registered in Dammam, Saudi Arabia (C.R. 2051221647). This policy explains how we collect, use, and protect personal data submitted through this website, in compliance with the Saudi Personal Data Protection Law (PDPL) and its executive regulations.',
      },
      {
        heading: '2. Data We Collect',
        body: 'When you submit a quote request or contact form, we collect: your name, phone number, email address (if provided), document type requested, and message content. We do not collect payment information through this website.',
      },
      {
        heading: '3. How We Use Your Data',
        body: 'We use your data solely to: respond to your translation request, contact you about your order, and send service-related updates. We do not sell, rent, or share your data with third parties for marketing purposes.',
      },
      {
        heading: '4. Data Storage & Security',
        body: 'Inquiries are transmitted via secure HTTPS and processed through Resend (an email delivery service). We retain client data for the period necessary to complete your request and comply with legal obligations.',
      },
      {
        heading: '5. Your Rights (PDPL)',
        body: 'Under the Saudi PDPL, you have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact us at newtabador@gmail.com.',
      },
      {
        heading: '6. Cookies',
        body: 'This website uses no tracking cookies. Anonymous analytics (Vercel Analytics) may collect aggregated, non-identifying usage data.',
      },
      {
        heading: '7. Contact',
        body: 'For privacy-related inquiries: newtabador@gmail.com | +966 53 899 2076',
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث: أبريل ٢٠٢٦',
    sections: [
      {
        heading: '١. من نحن',
        body: 'مؤسسة دار تبادر للترجمة ("نحن") مكتب ترجمة معتمد مسجل في الدمام، المملكة العربية السعودية (س.ت ٢٠٥١٢٢١٦٤٧). توضح هذه السياسة كيفية جمع البيانات الشخصية واستخدامها وحمايتها، وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL) ولوائحه التنفيذية.',
      },
      {
        heading: '٢. البيانات التي نجمعها',
        body: 'عند تقديم طلب سعر أو نموذج تواصل، نجمع: الاسم، رقم الهاتف، البريد الإلكتروني (إذا ذُكر)، نوع المستند المطلوب، ومحتوى الرسالة. لا نجمع بيانات الدفع عبر الموقع.',
      },
      {
        heading: '٣. كيف نستخدم بياناتك',
        body: 'نستخدم بياناتك حصرياً للرد على طلبات الترجمة والتواصل بشأن طلبك. لا نبيع بياناتك ولا نشاركها مع أطراف ثالثة لأغراض تسويقية.',
      },
      {
        heading: '٤. تخزين البيانات وأمانها',
        body: 'تُرسَل الاستفسارات عبر بروتوكول HTTPS آمن وتُعالَج من خلال خدمة إرسال البريد الإلكتروني Resend. نحتفظ ببيانات العملاء للمدة اللازمة لإتمام الطلب والامتثال للالتزامات القانونية.',
      },
      {
        heading: '٥. حقوقك (نظام PDPL)',
        body: 'بموجب نظام حماية البيانات الشخصية السعودي، يحق لك الاطلاع على بياناتك الشخصية وتصحيحها أو طلب حذفها. للتواصل: newtabador@gmail.com',
      },
      {
        heading: '٦. ملفات تعريف الارتباط',
        body: 'لا يستخدم هذا الموقع ملفات تعريف الارتباط التتبعية. قد تُجمَع بيانات استخدام مجمعة وغير محددة الهوية عبر Vercel Analytics.',
      },
      {
        heading: '٧. التواصل',
        body: 'للاستفسارات المتعلقة بالخصوصية: newtabador@gmail.com | ٩٧٦ ٨٩٩ ٥٣ ٩٦٦+',
      },
    ],
  },
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const c = content[lang as keyof typeof content] ?? content.en

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{c.title}</h1>
        <p className="text-sm text-muted-foreground mb-10">{c.updated}</p>
        <div className="space-y-8">
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold mb-2">{s.heading}</h2>
              <p className="text-foreground/80 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
