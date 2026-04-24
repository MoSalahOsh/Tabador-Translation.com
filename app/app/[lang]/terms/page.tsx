import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from '../dictionaries'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'ar' ? 'الشروط والأحكام | مؤسسة دار تبادر للترجمة' : 'Terms of Service | Tabador Translation Est.',
    robots: { index: false },
  }
}

const content = {
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: April 2026',
    sections: [
      {
        heading: '1. Services',
        body: 'Tabador Translation Est. provides certified translation and interpretation services. All translations are performed by qualified translators and bear the official seal of the establishment where required.',
      },
      {
        heading: '2. Client Responsibility',
        body: 'You are responsible for providing accurate and complete source documents. Tabador certifies the accuracy of the translation, not the authenticity or accuracy of the original document.',
      },
      {
        heading: '3. Turnaround & Delivery',
        body: 'Estimated delivery times are provided at the time of quotation. Express service is available at an additional charge. Tabador is not liable for delays caused by factors outside our control (e.g., authority processing times).',
      },
      {
        heading: '4. Fees & Payment',
        body: 'Fees are quoted per document based on type, length, and language pair. Payment is required before delivery of certified translations unless a prior arrangement is in place.',
      },
      {
        heading: '5. Acceptance Guarantee',
        body: 'We stand behind our certified translations. If an authority rejects a translation solely due to a translation error (not a formatting requirement change), we will re-translate at no additional charge.',
      },
      {
        heading: '6. Confidentiality',
        body: 'All documents submitted to Tabador are treated with strict confidentiality. We do not share your documents with third parties.',
      },
      {
        heading: '7. Governing Law',
        body: 'These terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes shall be resolved in the courts of Dammam.',
      },
      {
        heading: '8. Contact',
        body: 'For questions about these terms: newtabador@gmail.com | +966 53 899 2076',
      },
    ],
  },
  ar: {
    title: 'الشروط والأحكام',
    updated: 'آخر تحديث: أبريل ٢٠٢٦',
    sections: [
      {
        heading: '١. الخدمات',
        body: 'تقدم مؤسسة دار تبادر للترجمة خدمات الترجمة المعتمدة والترجمة الفورية. تُنجز جميع الترجمات من قِبَل مترجمين مؤهلين وتحمل الختم الرسمي للمؤسسة عند الاقتضاء.',
      },
      {
        heading: '٢. مسؤولية العميل',
        body: 'أنت مسؤول عن تقديم المستندات الأصلية كاملةً وصحيحةً. تبادر تُصادق على دقة الترجمة لا على صحة المستند الأصلي أو مصداقيته.',
      },
      {
        heading: '٣. مواعيد الإنجاز والتسليم',
        body: 'تُحدَّد المواعيد التقديرية للتسليم عند تقديم عرض السعر. تتوفر خدمة الإنجاز العاجل بتكلفة إضافية. لا تتحمل تبادر المسؤولية عن التأخيرات الناجمة عن أسباب خارجة عن إرادتنا.',
      },
      {
        heading: '٤. الأسعار والدفع',
        body: 'تُحسب الأسعار لكل مستند بحسب نوعه وحجمه وزوج اللغات. يُطلب السداد قبل تسليم الترجمات المعتمدة ما لم يكن ثمة اتفاق مسبق.',
      },
      {
        heading: '٥. ضمان القبول',
        body: 'نقف خلف ترجماتنا المعتمدة. إذا رُفضت الترجمة من جهة رسمية بسبب خطأ في الترجمة فقط (لا بسبب تغيير في متطلبات الشكل)، نُعيد الترجمة دون أي تكلفة إضافية.',
      },
      {
        heading: '٦. السرية',
        body: 'تُعامَل جميع المستندات المُقدَّمة لتبادر بسرية تامة. لا نشارك مستنداتك مع أطراف ثالثة.',
      },
      {
        heading: '٧. القانون المطبق',
        body: 'تخضع هذه الشروط لأنظمة المملكة العربية السعودية. تُحسم أي نزاعات أمام محاكم الدمام.',
      },
      {
        heading: '٨. التواصل',
        body: 'للاستفسار عن هذه الشروط: newtabador@gmail.com | ٩٧٦ ٨٩٩ ٥٣ ٩٦٦+',
      },
    ],
  },
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
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
