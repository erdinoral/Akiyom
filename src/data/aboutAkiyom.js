/** Biz Kimiz sayfası içeriği — metinleri buradan güncelleyebilirsiniz. */

import projects from './projects.js';

const activeProductLineCount = String(projects.length);
const activeProductLineHint = projects.map((project) => project.title).join(', ');

export const ABOUT_COMPANY = {
  legalName: 'Akiyom Yazılım ve Geliştirme',
  foundedYear: 2025,
  location: 'İstanbul merkezli',
  founder: 'Erdin Oral',
  founderRole: 'Kurucu & Geliştirici',
};

export const ABOUT_INTRO = {
  title: 'Biz Kimiz',
  lead:
    'Akiyom Yazılım ve Geliştirme; 2025\'te kurulan, kendi ürünlerini geliştiren ve şirketlere özel yazılım ile kurumsal yerel yapay zeka altyapısı sunan İstanbul merkezli bir teknoloji stüdyosudur.',
};

export const ABOUT_MISSION =
  'Sağlam temellere dayanan teknolojiyle hareket etmek — fikirden ürüne, üründen sürdürülebilir değere.';

export const ABOUT_NAME_ORIGIN = {
  title: 'Akiyom ismi nereden geliyor?',
  paragraphs: [
    'İngilizcedeki axiom (aksiyom) kavramından ilham aldık: kanıtlanabilir, güvenilir ve sağlam bir başlangıç noktası. Üzerine kurduğunuz her şeyin doğru temele dayanması gerekir — yazılımda da öyle.',
    'Akiyom, bu fikri Türkçedeki aksiyon ile buluşturur: doğru temel + hareket. Statik bir ajans değil; ürün çıkaran, geliştiren ve canlı tutan bir yapı. İsmimiz, ne yaptığımızın özünü taşır.',
  ],
};

export const ABOUT_STORY = [
  '2025\'te Erdin Oral tarafından kurulan Akiyom, yalnızca müşteri projesi üreten bir ajans olmak için değil; kendi ürünlerini geliştirip aynı mühendislik disiplinini Studio ve AI hizmetlerine taşımak için yola çıktı.',
  'Akibeat, Aki Finans, Enigma Atlas ve Akizen PC gibi projelerde edindiğimiz saha tecrübesi, özel yazılım ve kurumsal AI tarafında size sunduğumuz kalite standardının kaynağıdır. Yeni bir markayız; ancak ürün geliştirme, yayın ve ölçekleme konusunda köklü bir pratiğimiz var.',
  'Her projede kullanıcı deneyimi, performans, güvenlik ve ölçeklenebilirliği birlikte düşünürüz. Hedefimiz yalnızca kod teslim etmek değil; dijital dünyada anlamlı, güvenilir ve uzun ömürlü çözümler üretmektir.',
];

export const ABOUT_STATS = [
  { value: '2025', label: 'Kuruluş yılı', hint: 'Akiyom\'un resmi başlangıcı' },
  { value: activeProductLineCount, label: 'Aktif ürün hattı', hint: activeProductLineHint },
  { value: '3', label: 'Hizmet kolu', hint: 'Ürünler, Akiyom Studio, Akiyom AI' },
  { value: '2', label: 'Store yayını', hint: 'Microsoft Store\'da canlı uygulamalar' },
];

export const ABOUT_FOUNDER = {
  name: 'Erdin Oral',
  role: 'Kurucu & Geliştirici',
  bio: 'Akiyom\'un kurucusu. Ürün tasarımından full-stack geliştirmeye, yayın süreçlerinden kurumsal AI mimarisine kadar ekosistemin tüm katmanlarında doğrudan üretime odaklanır. Studio ve AI projelerinde de aynı standartla çalışır.',
};

export const ABOUT_PILLARS = [
  {
    id: 'products',
    title: 'Kendi Ürünlerimiz',
    description:
      'Gerçek kullanıcılarla test ettiğimiz ürünler, Studio ve AI tarafındaki kalite standardımızın temelini oluşturur.',
    items: [
      'Akibeat — AI destekli müzik analizi',
      'Aki Finans — kişisel finans (Microsoft Store)',
      'Enigma Atlas — keşif platformu',
      'Akizen PC — sistem sağlığı (Microsoft Store)',
    ],
  },
  {
    id: 'studio',
    title: 'Akiyom Studio',
    description:
      'Web sitesi, mobil ve masaüstü uygulama, ERP, CRM ve kurumsal yazılım projelerini planlama, tasarım ve geliştirme adımlarıyla tek çatı altında yürütürüz.',
    items: [
      'Kişisel ve ticari site paketleri',
      'Özel uygulama ve panel geliştirme',
      'ERP / stok / muhasebe entegrasyonları',
      'Bakım ve teslim sonrası destek',
    ],
  },
  {
    id: 'ai',
    title: 'Akiyom AI',
    description:
      'Şirket verilerinin dışarı çıkmadığı, ofis içinde çalışan yerel yapay zeka sunucu altyapısı. Bulut abonelik maliyetlerine alternatif, KVKK odaklı mimari.',
    items: [
      'Modüler GPU ve sunucu paketleri',
      'Graph-RAG doküman analizi',
      'Yerel görsel üretim (FLUX)',
      'Kuruma özel proje ve holding çözümleri',
    ],
  },
];

export const ABOUT_VALUES = [
  {
    title: 'Sağlam temel',
    text: 'Her özellik ve mimari karar, uzun vadede sürdürülebilir olacak şekilde tasarlanır — axiom felsefesinin pratiğe yansıması.',
  },
  {
    title: 'Güvenlik ve mahremiyet',
    text: 'Özellikle kurumsal ve AI projelerinde veriyi mümkün olduğunca yerelde tutar, şeffaf veri politikalarıyla ilerleriz.',
  },
  {
    title: 'Mühendislik disiplini',
    text: 'Hızlı teslimat ile birlikte sürdürülebilir kod, ölçeklenebilir altyapı ve ölçülebilir performans hedefleriz.',
  },
  {
    title: 'Dürüst fiyatlandırma',
    text: 'Kapsam, süre ve maliyeti baştan konuşuruz. Tekliflerimizde KDV hariç fiyatlar şeffaf şekilde paylaşılır.',
  },
];

export const ABOUT_PROCESS = [
  { step: '01', title: 'Keşif', text: 'İhtiyacınızı, hedef kitlenizi ve teknik kısıtları birlikte netleştiririz.' },
  { step: '02', title: 'Plan & teklif', text: 'Kapsam, zaman çizelgesi ve yatırım planını yazılı olarak sunarız.' },
  { step: '03', title: 'Geliştirme', text: 'Tasarım ve yazılımı iteratif ilerletir, kritik aşamalarda sizi dahil ederiz.' },
  { step: '04', title: 'Canlıya alma', text: 'Test, yayın ve dokümantasyon sonrası teslim; gerekirse eğitim ve destek devam eder.' },
];

export const ABOUT_CONTACT = {
  email: 'akiyom.iletisim@gmail.com',
  location: 'İstanbul, Türkiye',
  note: 'Proje teklifi, Akiyom AI demo talebi veya ürün geri bildirimi için bize yazın. Mesajlarınıza en kısa sürede dönüş yapıyoruz.',
};

/** Sosyal medya linkleri hazır olunca buraya ekleyin */
export const ABOUT_SOCIAL = [];
