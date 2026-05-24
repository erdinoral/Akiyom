const projects = [
  {
    slug: 'enigma-atlas',
    title: 'Enigma Atlas',
    subtitle: 'Dünya Gizemleri Keşif Platformu',
    category: 'Web Uygulaması',
    tech: ['React', 'Vite', 'Framer Motion', 'Vercel'],
    duration: '3 ay',
    status: 'Yayında',
    url: 'https://enigma.akiyom.com',
    thumbnail: '/enigmaatlas.png',
    summary:
      'Dünyanın gizemli yerleri ve olaylarını interaktif biçimde keşfetmeye yarayan bir platform.',
    challenge:
      'Büyük miktarda içeriği kullanıcıya sıkmadan, görsel açıdan çekici şekilde sunmak.',
    solution:
      'Kart tabanlı keşif arayüzü, filtreleme sistemi ve animasyonlu geçişlerle zengin bir kullanıcı deneyimi oluşturuldu.',
    result: 'Yayına alındığı ilk ayda düzenli kullanıcı kitlesi oluştu.',
    screenshots: [],
  },
  {
    slug: 'aki-finans',
    title: 'Aki Finans',
    subtitle: 'Kişisel Finans ve Cüzdan Yönetimi',
    category: 'Windows Uygulaması',
    tech: ['Windows App SDK', 'Microsoft Store', 'Local Storage'],
    duration: '4 ay',
    status: 'Yayında',
    url: 'https://apps.microsoft.com',
    thumbnail: '/akifinans.png',
    summary:
      'Günlük gelir-gider takibi, bütçe planlama ve finansal hedef yönetimi için Windows masaüstü uygulaması.',
    challenge:
      'Microsoft Store politikalarına uyum sağlarken kullanışlı ve hızlı bir uygulama geliştirmek.',
    solution:
      'Native Windows deneyimi sunmak için Windows App SDK kullanıldı, offline-first yaklaşımla tüm veriler lokalde tutuldu.',
    result: "Microsoft Store'da yayınlandı, düzenli güncelleme alıyor.",
    screenshots: [],
  },
  {
    slug: 'akizen-pc',
    title: 'Akizen PC',
    subtitle: 'PC Performans ve Sistem Sağlığı',
    category: 'Windows Uygulaması',
    tech: ['Windows App SDK', 'Microsoft Store', 'System APIs'],
    duration: '3 ay',
    status: 'Yayında',
    url: 'https://apps.microsoft.com',
    thumbnail: '/Akizenpc.png',
    summary:
      'Bilgisayar performansını izleyen, gereksiz dosyaları temizleyen ve sistem sağlığını raporlayan Windows uygulaması.',
    challenge: "Sistem seviyesi API'lere erişirken Store sandbox kısıtlamalarını aşmak.",
    solution:
      "İzin verilen Windows API'leri ile maksimum veri toplanarak kullanıcıya anlamlı öneriler sunuldu.",
    result: "Microsoft Store'da yayınlandı.",
    screenshots: [],
  },
  {
    slug: 'akibeat',
    title: 'Akibeat',
    subtitle: 'AI Destekli Müzik Analiz ve Mastering',
    category: 'Web Uygulaması',
    tech: ['React', 'AI/ML', 'Supabase', 'Vite'],
    duration: 'Devam ediyor',
    status: 'Geliştirme Aşamasında',
    url: 'https://akibeat.akiyom.com',
    thumbnail: '/akibeat.png',
    summary:
      'Müzisyenler için yapay zeka destekli ses analizi, mastering önerileri ve mix feedback platformu.',
    challenge:
      'Karmaşık audio işleme algoritmalarını web ortamında gerçek zamanlı çalıştırmak.',
    solution:
      'Server-side AI pipeline ile client-side görselleştirme birleştirilerek düşük gecikmeli analiz sağlandı.',
    result: 'Beta aşamasında, erken erişim kullanıcıları test ediyor.',
    screenshots: [],
  },
];

export default projects;
