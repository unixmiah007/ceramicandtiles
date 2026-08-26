import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { faqItems } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { getFaqItemsForSchema, getFaqSeo } from '../seo/meta';
import { galleryImages } from '../data/images';

export default function FAQPage() {
  const { locale, f } = useLanguage();
  const faqSchemaItems = getFaqItemsForSchema(locale, f);
  const seo = getFaqSeo(locale, faqSchemaItems);
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.faq.heroTitle}
        subtitle={f.faq.heroSubtitle}
        backgroundImage={galleryImages[2]}
      />

      <section className="section">
        <div className="container faq-container">
          <div className="faq-list">
            {faqItems.map((item) => {
              const question = f.faq.items[item.questionKey as keyof typeof f.faq.items];
              const answer = f.faq.items[item.answerKey as keyof typeof f.faq.items];
              const isOpen = openId === item.id;

              return (
                <div key={item.id} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    {question}
                  </button>
                  {isOpen && <div className="faq-answer">{answer}</div>}
                </div>
              );
            })}
          </div>

          <div className="faq-footer-cta">
            <h3>{f.faq.stillHaveQuestions}</h3>
            <p>{f.faq.contactUs}</p>
            <Link to="/contact" className="btn btn-primary">
              {f.seasonal.cta}
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
