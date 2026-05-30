import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VISION_PARAGRAPHS = [
  'Hayalleri teknolojiyle buluşturma misyonuyla yola çıktık. Kendi ürünlerimizi geliştirirken Akiyom Studio ile özel yazılım, ERP ve kurumsal yazılımlar, Akiyom AI ile kurumsal yerel yapay zeka altyapısı sunuyoruz.',
  'Teknoloji ve yaratıcılığın kesiştiği noktada, her projeyi bir sanat eseri olarak görüyoruz. Kullanıcı deneyiminden performansa, güvenlikten ölçeklenebilirliğe kadar her detayı özenle tasarlıyoruz. Amacımız, sadece yazılım geliştirmek değil; dijital dünyada anlamlı ve kalıcı izler bırakan çözümler yaratmak.',
  'Akiyom ekosistemi; bireysel kullanıcılardan KOBİ\'lere, kurumsal ekiplerden içerik platformlarına kadar geniş bir kitleye hizmet verir. Her ürün kendi alanında uzmanlaşır; Studio ve AI hizmetleri ise fikirden canlıya uzanan yolu kısaltır.',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const VisionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="vizyon" className="vision-section" ref={sectionRef}>
      <motion.div
        className="vision-content"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Vizyonumuz
        </motion.h2>

        {VISION_PARAGRAPHS.map((text) => (
          <motion.p key={text.slice(0, 40)} className="vision-text" variants={itemVariants}>
            {text}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
};

export default VisionSection;
