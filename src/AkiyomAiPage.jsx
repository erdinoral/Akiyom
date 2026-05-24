import React, { useEffect } from 'react';
import PageShell from './components/PageShell.jsx';
import AkiyomAiPricing from './components/AkiyomAiPricing.jsx';
import { setPageSeo, injectJsonLd } from './utils/seo.js';
import '../AkiyomLanding.css';

const PAGE_TITLE = 'Akiyom AI | Kurumsal Yerel AI Altyapısı — Akiyom';
const PAGE_DESCRIPTION =
  "Verileriniz şirket dışına çıkmadan yerel AI sunucu çözümleri. Mikro'dan Holding'e modüler paketler, Graph-RAG, FLUX ve özelleştirilebilir GPU altyapısı.";
const SCHEMA_ID = 'akiyom-ai-schema';

const AkiyomAiPage = () => {
  useEffect(() => {
    const resetSeo = setPageSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      path: '/akiyom-ai',
    });

    const removeSchema = injectJsonLd(SCHEMA_ID, {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Akiyom AI',
      description: PAGE_DESCRIPTION,
      brand: { '@type': 'Brand', name: 'Akiyom' },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'TRY',
        lowPrice: '5000',
        offerCount: 4,
        url: 'https://akiyom.com/akiyom-ai',
      },
      url: 'https://akiyom.com/akiyom-ai',
    });

    return () => {
      resetSeo();
      removeSchema();
    };
  }, []);

  return (
    <PageShell>
      <AkiyomAiPricing isPage />
    </PageShell>
  );
};

export default AkiyomAiPage;
