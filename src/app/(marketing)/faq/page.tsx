export const revalidate = false; // SSG static page

export default function FAQPage() {
  const faqs = [
    { q: 'How do I access purchased courses?', a: 'Once purchased, your content is available in your user dashboard.' },
    { q: 'What rendering strategies does this store use?', a: 'We leverage SSG for static marketing, ISR for product catalogs, and SSR for dynamic search.' },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg">{faq.q}</h3>
            <p className="text-muted-foreground mt-1">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}