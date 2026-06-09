import React from 'react';

const ProductDetailSections = ({ sections }) => {
  if (!sections?.length) return null;

  return (
    <div className="product-modal-detail">
      {sections.map((section, index) => {
        if (section.type === 'intro') {
          return (
            <header key={index} className="product-modal-detail-intro">
              <h3 className="product-modal-detail-title">{section.title}</h3>
              {section.lead && <p className="product-modal-detail-lead">{section.lead}</p>}
            </header>
          );
        }

        if (section.type === 'section') {
          return (
            <section key={index} className="product-modal-detail-section">
              <h3 className="product-modal-detail-heading">{section.title}</h3>
              {section.paragraphs?.map((text) => (
                <p key={text} className="product-modal-detail-text">
                  {text}
                </p>
              ))}
              {section.list?.length > 0 && (
                <ul className="product-modal-detail-list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((sub) => (
                <div key={sub.title} className="product-modal-detail-subsection">
                  <h4 className="product-modal-detail-subheading">{sub.title}</h4>
                  <ul className="product-modal-detail-list">
                    {sub.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        }

        if (section.type === 'faq') {
          return (
            <section key={index} className="product-modal-detail-section">
              <h3 className="product-modal-detail-heading">{section.title}</h3>
              <dl className="product-modal-detail-faq">
                {section.items.map((item) => (
                  <div key={item.q} className="product-modal-detail-faq-item">
                    <dt>{item.q}</dt>
                    <dd>{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        }

        if (section.type === 'cta') {
          return (
            <section key={index} className="product-modal-detail-cta">
              <h3 className="product-modal-detail-heading">{section.title}</h3>
              {section.paragraphs?.map((text) => (
                <p key={text} className="product-modal-detail-text">
                  {text}
                </p>
              ))}
            </section>
          );
        }

        return null;
      })}
    </div>
  );
};

export default ProductDetailSections;
