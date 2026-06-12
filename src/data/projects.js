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
    linkLabel: 'Siteye Git',
    cardThumbnail: '/enigmaatlas-card.png',
    detailImage: '/enigmaatlas.png',
    thumbnail: '/enigmaatlas.png',
    summary:
      'Dünyanın gizemli yerleri ve olaylarını interaktif biçimde keşfetmeye yarayan bir platform.',
    challenge:
      'Büyük miktarda içeriği kullanıcıya sıkmadan, görsel açıdan çekici şekilde sunmak.',
    solution:
      'Kart tabanlı keşif arayüzü, filtreleme sistemi ve animasyonlu geçişlerle zengin bir kullanıcı deneyimi oluşturuldu.',
    result: 'Yayına alındığı ilk ayda düzenli kullanıcı kitlesi oluştu.',
    screenshots: [],
    detailSections: [
      {
        type: 'intro',
        title: 'Enigma Atlas — Dünya Gizemleri Keşif Platformu',
        lead: 'Tarihin, coğrafyanın ve bilinmeyenin kesiştiği noktaları kart tabanlı bir keşif deneyimiyle sunan web platformu.',
      },
      {
        type: 'section',
        title: 'Ne İşe Yarar?',
        paragraphs: [
          'Enigma Atlas, dünyanın gizemli yerlerini, olaylarını ve efsanelerini keşfetmek isteyenler için tasarlanmış interaktif bir web uygulamasıdır.',
          'Yoğun içeriği sıkmadan sunmak için kart tabanlı gezinme, filtreleme ve animasyonlu geçişler kullanılır.',
        ],
        list: [
          'Konum ve tema bazlı keşif kartları',
          'Filtreleme ve hızlı gezinme',
          'Mobil uyumlu, karanlık tema arayüz',
          'Akıcı animasyonlar ve görsel odaklı sunum',
        ],
      },
      {
        type: 'section',
        title: 'Teknik Altyapı',
        subsections: [
          {
            title: 'Frontend ve Deneyim',
            items: [
              'React + Vite — hızlı geliştirme ve performans',
              'Framer Motion — sayfa ve kart geçiş animasyonları',
              'Responsive layout — masaüstü ve mobil uyum',
            ],
          },
          {
            title: 'Yayın',
            items: [
              'Vercel üzerinde canlı yayın',
              'SEO dostu sayfa yapısı',
              'Düşük gecikmeli statik + dinamik içerik akışı',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Kimler İçin?',
        paragraphs: [
          'Meraklı gezginler, tarih ve gizem içeriklerini seven kullanıcılar ve keşif odaklı dijital deneyim arayan herkes için uygundur.',
        ],
      },
      {
        type: 'faq',
        title: 'Merak Edilenler',
        items: [
          {
            q: 'Ücretsiz mi?',
            a: 'Platformu keşfetmek için enigma.akiyom.com adresinden erişebilirsiniz.',
          },
          {
            q: 'Mobilde çalışır mı?',
            a: 'Evet, responsive tasarım sayesinde telefon ve tablette de kullanılabilir.',
          },
          {
            q: 'Hesap gerekir mi?',
            a: 'Keşif deneyimi hesap gerektirmeden kullanılabilir; ek özellikler zamanla genişletilebilir.',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Keşfe Başlayın',
        paragraphs: [
          'Enigma Atlas’ı ziyaret ederek dünyanın gizemli noktalarını interaktif biçimde keşfedebilirsiniz.',
        ],
      },
    ],
  },
  {
    slug: 'aki-finans',
    title: 'Aki Finans',
    subtitle: 'Kişisel Finans ve Cüzdan Yönetimi',
    category: 'Windows Uygulaması',
    tech: ['Windows App SDK', 'Microsoft Store', 'Local Storage'],
    duration: '4 ay',
    status: 'Yayında',
    url: 'https://apps.microsoft.com/detail/9PKRN1TB6RN5?hl=tr-tr&gl=TR&ocid=pdpshare',
    linkLabel: "Microsoft Store'a Git",
    detailImage: '/akifinans.png',
    thumbnail: '/akifinans.png',
    summary:
      'Günlük gelir-gider takibi, bütçe planlama ve finansal hedef yönetimi için Windows masaüstü uygulaması.',
    challenge:
      'Microsoft Store politikalarına uyum sağlarken kullanışlı ve hızlı bir uygulama geliştirmek.',
    solution:
      'Native Windows deneyimi sunmak için Windows App SDK kullanıldı, offline-first yaklaşımla tüm veriler lokalde tutuldu.',
    result: "Microsoft Store'da yayınlandı, düzenli güncelleme alıyor.",
    screenshots: [],
    detailSections: [
      {
        type: 'intro',
        title: 'Aki Finans — Kişisel Finans ve Cüzdan Yönetimi',
        lead: 'Gelir-gider takibi, bütçe planlama ve finansal hedeflerinizi tek Windows uygulamasında, verileriniz cihazınızda kalarak yönetin.',
      },
      {
        type: 'section',
        title: 'Ne İşe Yarar?',
        paragraphs: [
          'Aki Finans, günlük harcamalarınızı ve gelirlerinizi takip etmenizi, bütçe oluşturmanızı ve finansal hedeflerinize ilerlemenizi sağlayan kişisel finans uygulamasıdır.',
          'Tüm finansal veriler yalnızca cihazınızda saklanır; buluta otomatik yedekleme yapılmaz.',
        ],
        list: [
          'Gelir ve gider kayıtları',
          'Hesap bakiyeleri ve bütçe planlama',
          'Finansal hedefler ve abonelik takibi',
          'Borç / alacak yönetimi',
          'Canlı döviz kuru ve kıymetli maden fiyatları',
        ],
      },
      {
        type: 'section',
        title: 'Öne Çıkan Özellikler',
        subsections: [
          {
            title: 'Günlük Kullanım',
            items: [
              'Hızlı işlem ekleme ve kategorilendirme',
              'Para birimi ve dil tercihleri',
              'Özet ekranlar ve dönemsel görünüm',
              'Veritabanını sıfırlama ve manuel yedekleme',
            ],
          },
          {
            title: 'Gizlilik ve Güvenlik',
            items: [
              'Veriler yalnızca yerel cihazda tutulur',
              'Reklam veya analitik veri toplama yok',
              'Kişisel veri üçüncü taraflarla paylaşılmaz',
              'Döviz kuru sorgularında kişisel veri gönderilmez',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Kimler İçin?',
        paragraphs: [
          'Kişisel bütçesini düzenli takip etmek isteyen bireyler, abonelik ve borç yönetimi yapan kullanıcılar ve offline çalışan bir finans aracı arayan herkes için uygundur.',
        ],
      },
      {
        type: 'faq',
        title: 'Merak Edilenler',
        items: [
          {
            q: 'Verilerim nerede tutuluyor?',
            a: 'Tüm finansal kayıtlar yalnızca cihazınızda, yerel veri klasöründe saklanır.',
          },
          {
            q: 'İnternet gerekli mi?',
            a: 'Günlük kayıt ve raporlama offline çalışır; canlı döviz kurları için internet bağlantısı gerekir.',
          },
          {
            q: 'Nereden indirebilirim?',
            a: 'Microsoft Store üzerinden Windows cihazınıza kurabilirsiniz.',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Hemen İndirin',
        paragraphs: [
          'Aki Finans Microsoft Store’da yayında. Kişisel finans takibinize bugün başlayın.',
        ],
      },
    ],
  },
  {
    slug: 'akizen-pc',
    title: 'Akizen PC',
    subtitle: 'PC Performans ve Sistem Sağlığı',
    category: 'Windows Uygulaması',
    tech: ['Windows App SDK', 'Microsoft Store', 'System APIs'],
    duration: '3 ay',
    status: 'Yayında',
    url: 'https://apps.microsoft.com/detail/9N7LNV11PWLP?hl=tr-tr&gl=TR&ocid=pdpshare',
    linkLabel: "Microsoft Store'a Git",
    detailImage: '/Akizenpc.png',
    thumbnail: '/Akizenpc.png',
    summary:
      'Bilgisayar performansını izleyen, gereksiz dosyaları temizleyen ve sistem sağlığını raporlayan Windows uygulaması.',
    challenge: "Sistem seviyesi API'lere erişirken Store sandbox kısıtlamalarını aşmak.",
    solution:
      "İzin verilen Windows API'leri ile maksimum veri toplanarak kullanıcıya anlamlı öneriler sunuldu.",
    result: "Microsoft Store'da yayınlandı.",
    screenshots: [],
    detailSections: [
      {
        type: 'intro',
        title: 'Akizen PC — PC Performans ve Sistem Sağlığı',
        lead: 'Bilgisayarınızın performansını izleyin, sistem sağlığını raporlayın ve gereksiz dosyaları güvenle temizleyin.',
      },
      {
        type: 'section',
        title: 'Ne İşe Yarar?',
        paragraphs: [
          'Akizen PC, Windows bilgisayarınızın kaynak kullanımını, sıcaklığını ve disk durumunu tek panelden takip etmenizi sağlar.',
          'Performans düşüşlerini erken fark etmenize ve temel bakım adımlarını uygulamanıza yardımcı olur.',
        ],
        list: [
          'CPU, RAM, disk ve sıcaklık izleme',
          'Sistem sağlığı özeti ve uyarılar',
          'Gereksiz dosya temizliği',
          'Kullanıcı tercihleri ve tema ayarları',
        ],
      },
      {
        type: 'section',
        title: 'Öne Çıkan Özellikler',
        subsections: [
          {
            title: 'İzleme ve Raporlama',
            items: [
              'Anlık performans göstergeleri',
              'Kaynak kullanım trendleri',
              'Disk ve bellek durumu',
              'Sistem sağlığı raporları',
            ],
          },
          {
            title: 'Gizlilik',
            items: [
              'Kişisel kimlik verisi talep edilmez',
              'Veriler öncelikli olarak cihazda işlenir',
              'Reklam veya pazarlama hedeflemesi yok',
              'Minimum veri prensibiyle çalışır',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Kimler İçin?',
        paragraphs: [
          'Bilgisayarını düzenli kullanan bireyler, performans sorunlarını erken yakalamak isteyen kullanıcılar ve basit sistem bakımı arayan herkes için uygundur.',
        ],
      },
      {
        type: 'faq',
        title: 'Merak Edilenler',
        items: [
          {
            q: 'Verilerim paylaşılır mı?',
            a: 'Kişisel verileriniz üçüncü taraflarla paylaşılmaz; teknik veriler cihazınızda işlenir.',
          },
          {
            q: 'Hangi platformda çalışır?',
            a: 'Windows masaüstü uygulamasıdır; Microsoft Store’dan indirilebilir.',
          },
          {
            q: 'Otomatik temizlik yapar mı?',
            a: 'Temizlik ve bakım adımları kullanıcı kontrolünde sunulur; neyin silineceğine siz karar verirsiniz.',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Microsoft Store’da',
        paragraphs: [
          'Akizen PC’yi Store’dan indirerek bilgisayarınızın sağlığını ve performansını takip etmeye başlayın.',
        ],
      },
    ],
  },
  {
    slug: 'akipos',
    title: 'AKİPos',
    subtitle: 'Satış, Stok ve Raporlama Otomasyonu',
    category: 'Windows Uygulaması',
    tech: ['Windows App SDK', 'Electron', 'Local JSON', 'Supabase'],
    duration: 'Devam ediyor',
    status: 'Test Aşamasında',
    url: '',
    detailImage: '/akipos.png',
    thumbnail: '/akipos.png',
    summary:
      'Küçük ve orta ölçekli işletmeler için kasa, stok, müşteri ve raporlama işlemlerini tek panelde yöneten Windows masaüstü POS uygulaması.',
    challenge:
      'Esnaf ve küçük işletmelerin günlük satış, stok ve müşteri takibini internetsiz, hızlı ve güvenilir şekilde yapabilmesi.',
    solution:
      'Offline-first mimari, işletme tipine göre otomatik uyarlanan arayüz ve yerel JSON veri saklama ile tek kasa odaklı POS deneyimi sunuldu.',
    result: 'Test aşamasında; erken kullanıcı geri bildirimleri toplanıyor.',
    screenshots: [],
    detailSections: [
      {
        type: 'intro',
        title: 'AKİPos — Satış, Stok ve Raporlama Otomasyonu',
        lead: 'İşletmenizin Kasa Operasyonlarından Stok Kontrolüne Kadar Tüm İhtiyaçları Tek Bir Uygulamada!',
      },
      {
        type: 'section',
        title: 'İşletmeniz İçin Hepsi-Bir-Arada Kasa Çözümü',
        paragraphs: [
          'Küçük ve orta ölçekli işletmeler için geliştirilmiş, Windows masaüstü üzerinde çalışan güçlü bir satış ve stok otomasyonu yazılımıdır. AKİPos (Perakende POS), esnafın dijital dönüşümünü kolaylaştırır ve işletme verimliliğini artırır.',
          'Uygulama, tek bir arayüzden şunları yönetmenizi sağlar:',
        ],
        list: [
          'Hızlı Kasa / Satış İşlemleri',
          'Stok ve Ürün Yönetimi',
          'Müşteri ve Tedarikçi Kayıtları',
          'Detaylı Raporlama ve Analiz',
        ],
      },
      {
        type: 'section',
        title: 'Öne Çıkan Özellikler',
        subsections: [
          {
            title: 'Hızlı ve Verimli Kasa',
            items: [
              'Ürün Arama: Barkod, kategori çipleri veya favori ürünler ile hızlı işlem yapın.',
              'Çoklu Sepet Desteği: Aynı anda birden fazla müşteriye hizmet verin.',
              'Esnek Satış Modları: Perakende ve toptan satış seçenekleri.',
              'Ödeme Kaydı: Ödemeleri nakit veya kart olarak kaydedin. (Banka POS cihazı değildir, ödemeyi ayrı cihazdan alıp kaydedersiniz.)',
              'Müşteri Borcu: Eksik ödemeleri doğrudan müşteri borcuna ekleyin.',
              'Fatura Oluşturma: Satış sonrası HTML formatında fatura oluşturun.',
              'Ürün Çeşitliliği: Gramajlı (tartılı) ve adetli ürünleri destekler.',
            ],
          },
          {
            title: 'Akıllı Stok Kontrolü',
            items: [
              'Düşük Stok Uyarıları: Kritik seviyedeki ürünler için anında uyarı alın.',
              'Kapsamlı Ürün Kartları: Barkod, fiyat, maliyet, indirim ve görsel ekleyerek ürünleri detaylandırın.',
              'Stok Geçmişi: Stok girişi, sayımı ve hareketlerini takip edin.',
              'Barkod Yönetimi: Barkod üretin ve yazdırın.',
            ],
          },
          {
            title: 'İlişki ve Raporlama Yönetimi',
            items: [
              'Kişiselleştirilmiş İletişim: Müşteri ve tedarikçilerin borç bakiyelerini, geçmiş satışlarını ve iletişim bilgilerini izleyin.',
              'Veriye Dayalı Kararlar: Günlük ciro, kar oranı, en çok satan ürünler ve trend analizlerini içeren raporlar.',
              'Excel Dışa Aktarım: Verilerinizi XLSX formatında dışa aktarın.',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'İşletme Tipinize Göre Otomatik Uyarlanır',
        paragraphs: [
          'Uygulama, farklı esnaf ve küçük işletme profilleri için menüleri, etiketleri ve temayı otomatik olarak uyarlar.',
        ],
        list: [
          'Perakende / Genel (Butik, tekel vb.)',
          'Market / Bakkal (Barkodlu ürün odaklı)',
          'Kafe / Restoran (Hızlı kasa ve menü yönetimi)',
          'Kuaför / Güzellik Salonu (Hizmet + ürün satışı)',
          'Eczane (İlaç kartları ve SKT takibi)',
          'Kırtasiye',
        ],
      },
      {
        type: 'section',
        title: 'Avantajlarınız',
        list: [
          'İnternetsiz (Offline) Çalışma: Günlük satış ve stok işlemleri için internet bağlantısı şart değildir. Ara sıra internet bağlantısı, lisans doğrulama ve hesap özellikleri için gereklidir.',
          'Veri Güvenliği: Tüm verileriniz cihazınızda yerel bir JSON dosyasında tutulur. Buluta otomatik yedekleme yoktur, yedekleri manuel olarak alabilirsiniz.',
          'Kullanıcı Dostu Arayüz: İlk açılış turu, sayfa yardım metinleri ve animasyonlu Framer Motion geçişleri ile kolay kullanım.',
          'Ek Özellikler: Gün sonu kapanışı, Akiyom Radyo (opsiyonel telifsiz müzik), modüler yedekleme ve Supabase tabanlı lisans aktivasyonu.',
        ],
      },
      {
        type: 'faq',
        title: 'Merak Edilenler',
        items: [
          {
            q: 'Verilerim nerede tutuluyor?',
            a: 'Verileriniz yerel pos-data.json dosyasında, cihazınızda saklanır.',
          },
          {
            q: 'Kaç kullanıcı aynı anda kullanabilir?',
            a: 'Uygulama, tek bilgisayar ve tek kasa odaklı tasarlanmıştır.',
          },
          {
            q: 'Telefonda çalışır mı?',
            a: 'Hayır, şu an yalnızca Windows masaüstü platformunda çalışır.',
          },
          {
            q: 'Yazarkasa entegrasyonu var mı?',
            a: 'Hayır, yazarkasa/ÖKC entegrasyonu yoktur. Ödeme tutarını kasada manuel kaydedersiniz.',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Hemen Başlayın!',
        paragraphs: [
          'AKİPos, esnaf ve küçük işletmelerin dijitalleşmesi için ihtiyacınız olan her şeyi sunuyor. Daha fazla bilgi ve destek için e-posta göndererek veya uygulama içi formu kullanarak iletişime geçebilirsiniz.',
        ],
      },
    ],
  },
  {
    slug: 'akifactory',
    title: 'AkiFactory',
    subtitle: 'AI Destekli Kısa Video Stüdyosu',
    category: 'Windows Uygulaması',
    tech: ['Python', 'FastAPI', 'Ollama', 'FFmpeg', 'pywebview'],
    duration: 'Devam ediyor',
    status: 'Geliştirme Aşamasında',
    url: '',
    cardThumbnail: '/akifactory-card.png',
    detailImage: '/akifactory-app.png',
    thumbnail: '/akifactory-app.png',
    summary:
      'TikTok, YouTube Shorts ve Reels için konudan videoya otomatik üretim. Ollama senaryo, Edge TTS, altyazı ve seri üretim kuyruğu — tek masaüstü stüdyoda.',
    challenge:
      'Kısa video üretimini birden fazla araç, API ve render adımına bölmeden yerel ve hızlı bir akışta toplamak.',
    solution:
      'MoneyPrinterTurbo motorunu sarmalayan FastAPI arayüzü, pywebview masaüstü kabuğu ve platform profilleriyle tek tıkla format, süre ve altyazı uyumu sağlandı.',
    result: 'v2.3.0 sürümünde; taşınabilir EXE ve Windows kurulum paketi ile test kullanımında.',
    screenshots: [],
    detailSections: [
      {
        type: 'intro',
        title: 'AkiFactory — Kısa Video Stüdyosu',
        lead: 'Konudan TikTok, Shorts ve Reels videolarına: senaryo, ses, görüntü ve altyazıyı yerel AI ile tek panelde üretin.',
      },
      {
        type: 'section',
        title: 'Ne İşe Yarar?',
        paragraphs: [
          'AkiFactory, kısa form video üretimini masaüstünde toplayan bir Akiyom uygulamasıdır. Ollama ile senaryo ve caption üretir; Pexels görüntüleri, Edge TTS seslendirme ve FFmpeg render ile videoyu tamamlar.',
          'Streamlit veya Gradio yerine özel web arayüzü (FastAPI + HTML/JS) ve pywebview ile native Windows penceresi sunar.',
        ],
        list: [
          'Platform profili — TikTok, YouTube Shorts, Reels, LinkedIn',
          'Üretim dili — TR, EN, DE, FR',
          'Altyazı stilleri — TikTok, YouTube, Minimal veya özel',
          'Seri üretim — en fazla 10 konu, sıralı kuyruk',
          'Galeri — kalıcı videolar, hashtag ve caption kopyalama',
        ],
      },
      {
        type: 'section',
        title: 'Teknik Altyapı',
        subsections: [
          {
            title: 'Yerel AI ve Render',
            items: [
              'Ollama — senaryo, caption ve hashtag üretimi',
              'Whisper — CUDA veya CPU ile altyazı zamanlaması',
              'FFmpeg — NVENC (GPU) veya libx264 (CPU) encode',
              'Edge TTS — çok dilli seslendirme',
            ],
          },
          {
            title: 'Kurulum Seçenekleri',
            items: [
              'Baslat.bat — kurulum + masaüstü penceresi (WebView2)',
              'Taşınabilir EXE — release klasöründen çalıştırma',
              'Windows Setup — Program Files kurulum sihirbazı (v2.3.0)',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Kimler İçin?',
        paragraphs: [
          'İçerik üreticileri, sosyal medya yöneticileri ve kısa video denemelerini hızlıca üretmek isteyen ekipler için tasarlandı. İnternet bağlantısı Pexels ve TTS için gereklidir; Ollama yerelde çalışır.',
        ],
      },
      {
        type: 'faq',
        title: 'Merak Edilenler',
        items: [
          {
            q: 'Hangi platformlar destekleniyor?',
            a: 'TikTok, YouTube Shorts, Instagram Reels ve LinkedIn profilleriyle format, süre ve altyazı otomatik ayarlanır.',
          },
          {
            q: 'İnternet gerekli mi?',
            a: 'Ollama ve render yerelde çalışır; görsel ve TTS kaynakları için internet bağlantısı gerekir.',
          },
          {
            q: 'Nasıl kurulur?',
            a: 'Windows için taşınabilir EXE veya kurulum sihirbazı mevcuttur; erken erişim için iletişime geçebilirsiniz.',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Erken Erişim',
        paragraphs: [
          'AkiFactory şu an geliştirme ve test aşamasındadır. Kurulum, lisans veya iş birliği için bizimle iletişime geçebilirsiniz.',
        ],
      },
    ],
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
    linkLabel: 'Uygulamaya Git',
    cardThumbnail: '/akibeat-card.png',
    detailImage: '/akibeat.png',
    thumbnail: '/akibeat.png',
    summary:
      'Müzisyenler için yapay zeka destekli ses analizi, mastering önerileri ve mix feedback platformu.',
    challenge:
      'Karmaşık audio işleme algoritmalarını web ortamında gerçek zamanlı çalıştırmak.',
    solution:
      'Server-side AI pipeline ile client-side görselleştirme birleştirilerek düşük gecikmeli analiz sağlandı.',
    result: 'Beta aşamasında, erken erişim kullanıcıları test ediyor.',
    screenshots: [],
    detailSections: [
      {
        type: 'intro',
        title: 'Akibeat — AI Destekli Müzik Analiz ve Mastering',
        lead: 'Miks ve mastering sürecinize yapay zeka destekli analiz, geri bildirim ve önerilerle hız kazandırın.',
      },
      {
        type: 'section',
        title: 'Ne İşe Yarar?',
        paragraphs: [
          'Akibeat, müzisyenler ve prodüktörler için ses dosyalarını analiz eden, mix kalitesi hakkında geri bildirim veren ve mastering yönünde öneriler sunan web tabanlı bir platformdur.',
          'Karmaşık audio işleme pipeline’ı sunucu tarafında çalışır; arayüzde görselleştirme ve sonuçlar hızlı biçimde sunulur.',
        ],
        list: [
          'AI destekli ses analizi',
          'Mastering ve mix geri bildirimi',
          'Görselleştirme ve rapor ekranları',
          'Web tabanlı erişim — kurulum gerektirmez',
        ],
      },
      {
        type: 'section',
        title: 'Teknik Altyapı',
        subsections: [
          {
            title: 'Platform',
            items: [
              'React + Vite frontend',
              'Supabase — hesap ve veri katmanı',
              'Sunucu tarafı AI / audio pipeline',
              'Düşük gecikmeli analiz akışı',
            ],
          },
          {
            title: 'Yol Haritası',
            items: [
              'Gelişmiş AI model entegrasyonları',
              'Profesyonel kalite mastering önerileri',
              'Performans ve model optimizasyonları',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Kimler İçin?',
        paragraphs: [
          'Ev stüdyosu müzisyenleri, bağımsız prodüktörler, mix/mastering sürecinde objektif geri bildirim arayan sanatçılar ve AI destekli müzik araçlarını denemek isteyen kullanıcılar için tasarlandı.',
        ],
      },
      {
        type: 'faq',
        title: 'Merak Edilenler',
        items: [
          {
            q: 'Şu an kullanılabilir mi?',
            a: 'Beta aşamasındadır; akibeat.akiyom.com üzerinden erken erişim denenebilir.',
          },
          {
            q: 'Dosyalarım sunucuya gidiyor mu?',
            a: 'Analiz için ses dosyası işlenir; kullanım ve gizlilik politikaları uygulama içinde açıklanır.',
          },
          {
            q: 'Profesyonel mastering yerine geçer mi?',
            a: 'Akibeat bir yardımcı analiz aracıdır; nihai kararlar sanatçıya aittir.',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Beta’ya Katılın',
        paragraphs: [
          'Akibeat’i deneyerek AI destekli müzik analizini keşfedin veya erken erişim hakkında bizimle iletişime geçin.',
        ],
      },
    ],
  },
];

export default projects;
