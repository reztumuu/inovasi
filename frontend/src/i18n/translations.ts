export type Language = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
      getInTouch: 'Get in Touch',
    },
    hero: {
      badge: 'Premium Software Engineering Studio',
      titlePart1: 'We build ',
      titleSpan: 'software',
      titlePart2: ' that scales & inspires',
      subtitle: 'Custom web portals, high-performance mobile apps, and secure cloud infrastructure — engineered for companies ready to grow systematically.',
      ctaStart: 'Start a Project',
      ctaWork: 'View Our Work',
      stats: {
        projects: 'Projects Delivered',
        retention: 'Client Retention',
        countries: 'Countries',
        engineers: 'Engineers',
      }
    },
    services: {
      badge: 'Core Capabilities',
      title: 'Everything you need to ship great software',
      subtitle: 'State-of-the-art software systems optimized for performance, security, and exceptional user experiences.',
      web: {
        title: 'Web Development',
        desc: 'Custom portals, e-commerce & SaaS platforms built with Next.js and Laravel for maximum performance.'
      },
      mobile: {
        title: 'Mobile Apps',
        desc: 'High-performance cross-platform mobile apps for iOS & Android using React Native and Flutter.'
      },
      design: {
        title: 'UI/UX Design',
        desc: 'Human-centered design systems, prototypes, and style guides that delight and retain users.'
      },
      cloud: {
        title: 'Cloud & DevOps',
        desc: 'Scalable AWS/GCP architectures, automated CI/CD pipelines, and container infrastructure.'
      },
      ai: {
        title: 'AI & Automation',
        desc: 'Custom AI workflows, intelligent chatbots, NLP interfaces, and automated scripts.'
      }
    },
    featured: {
      badge: 'Featured Works',
      title: 'Projects we\'re proud to ship',
      viewAll: 'View All Projects',
      visitSite: 'Visit Live Site',
      client: 'Client',
    },
    statsStrip: {
      completed: 'Projects Completed',
      retention: 'Client Retention',
      served: 'Countries Served',
      senior: 'Senior Engineers',
    },
    testimonials: {
      badge: 'Client Stories',
      title: 'Trusted by industry leaders',
      list: [
        {
          quote: 'InovasiTech completely re-architected our transaction services. API load times dropped 60%, and our engineering team had a seamless experience.',
          author: 'Marcus Aurelius',
          role: 'VP of Engineering, Apex Retailers'
        },
        {
          quote: 'World-class UX designers and engineers. They shipped our fitness app in record time — 4.8 stars on the App Store within weeks.',
          author: 'Elena Rostova',
          role: 'Product Owner, FitLife Inc.'
        },
        {
          quote: 'The DevOps team designed a secure, automated AWS framework that saves our infrastructure team dozens of hours weekly.',
          author: 'David Vance',
          role: 'Head of Infrastructure, FinTech Ventures'
        }
      ]
    },
    contactSection: {
      badge: 'Start a Partnership',
      title: 'Let\'s build something extraordinary',
      subtitle: 'Have a product idea, legacy migration, or scaling challenge? Fill out the form and one of our principal engineers will reach out within 24 hours.',
      whyUs: [
        { title: 'Needs-First Approach', desc: 'No templates. We study your architecture and requirements before writing a single line.' },
        { title: 'Direct Engineer Access', desc: 'Interface directly with our engineering team — never just sales reps.' },
        { title: 'Agile Delivery', desc: 'Transparent pipelines with daily commits, weekly standups, and on-time delivery.' },
      ]
    },
    contactForm: {
      header: 'Send a Proposal',
      sub: 'Tell us about your project and we\'ll get back to you swiftly.',
      name: 'Full Name *',
      email: 'Email *',
      company: 'Company',
      projectType: 'Project Type *',
      details: 'Project Details *',
      send: 'Send Proposal',
      sending: 'Sending Proposal...',
      placeholderName: 'John Doe',
      placeholderEmail: 'john@company.com',
      placeholderCompany: 'Optional',
      placeholderDetails: 'Describe your project requirements, timeline, and budget...',
      successHeader: 'Proposal Received!',
      successSub: 'Thank you! Our principal engineer will reach out within 24 hours.',
      sendAnother: 'Send Another',
      errorConnect: 'Could not connect to the server. Please try again.',
    },
    portfolioPage: {
      badge: 'Our Work',
      title: 'Projects we\'ve engineered',
      subtitle: 'Filter by category to explore our high-fidelity engineering systems built for global enterprises and innovative startups.',
      filterAll: 'All',
      noProjects: 'No projects found in this category.',
    },
    blogPage: {
      badge: 'Tech Insights',
      title: 'Engineering perspectives',
      subtitle: 'Deep-dives, architecture patterns, and design strategies from our core product team.',
      featured: 'Featured',
      readTime: 'min read',
      readArticle: 'Read Article',
      readMore: 'Read more',
      noArticles: 'No blog posts found.',
    },
    blogSingle: {
      backBtn: 'Back to Blog',
      readyTitle: 'Ready to build something great?',
      readySub: 'Let\'s turn your idea into a premium engineering product.',
      startProject: 'Start a Project',
    },
    footer: {
      description: 'Premium software engineering studio crafting high-performance web, mobile & cloud solutions for ambitious businesses.',
      rights: 'All rights reserved.',
    },
    whatsapp: {
      tooltip: 'Chat with us on WhatsApp',
      message: 'Hi {name}, I would like to discuss a software project with you.',
    }
  },
  id: {
    nav: {
      services: 'Layanan',
      portfolio: 'Portofolio',
      blog: 'Blog',
      contact: 'Kontak',
      getInTouch: 'Hubungi Kami',
    },
    hero: {
      badge: 'Studio Rekayasa Perangkat Lunak Premium',
      titlePart1: 'Kami membangun ',
      titleSpan: 'perangkat lunak',
      titlePart2: ' yang berskala & menginspirasi',
      subtitle: 'Portal web kustom, aplikasi seluler berkinerja tinggi, dan infrastruktur cloud yang aman — dirancang untuk perusahaan yang siap tumbuh secara sistematis.',
      ctaStart: 'Mulai Proyek',
      ctaWork: 'Lihat Hasil Kerja Kami',
      stats: {
        projects: 'Proyek Selesai',
        retention: 'Retensi Klien',
        countries: 'Negara',
        engineers: 'Insinyur',
      }
    },
    services: {
      badge: 'Kemampuan Inti',
      title: 'Semua yang Anda butuhkan untuk merilis software hebat',
      subtitle: 'Sistem perangkat lunak mutakhir yang dioptimalkan untuk kinerja, keamanan, dan pengalaman pengguna yang luar biasa.',
      web: {
        title: 'Pengembangan Web',
        desc: 'Portal kustom, platform e-commerce & SaaS yang dibangun dengan Next.js dan Laravel untuk kinerja maksimal.'
      },
      mobile: {
        title: 'Aplikasi Seluler',
        desc: 'Aplikasi seluler lintas platform berkinerja tinggi untuk iOS & Android menggunakan React Native dan Flutter.'
      },
      design: {
        title: 'Desain UI/UX',
        desc: 'Sistem desain yang berorientasi pada manusia, prototipe, dan panduan gaya yang menyenangkan dan mempertahankan pengguna.'
      },
      cloud: {
        title: 'Cloud & DevOps',
        desc: 'Arsitektur AWS/GCP yang skalabel, pipa CI/CD otomatis, dan infrastruktur kontainer.'
      },
      ai: {
        title: 'AI & Otomatisasi',
        desc: 'Alur kerja AI kustom, chatbot pintar, antarmuka NLP, dan skrip otomatis.'
      }
    },
    featured: {
      badge: 'Karya Pilihan',
      title: 'Proyek yang bangga kami rilis',
      viewAll: 'Lihat Semua Proyek',
      visitSite: 'Kunjungi Situs',
      client: 'Klien',
    },
    statsStrip: {
      completed: 'Proyek Selesai',
      retention: 'Retensi Klien',
      served: 'Negara Dilayani',
      senior: 'Insinyur Senior',
    },
    testimonials: {
      badge: 'Cerita Klien',
      title: 'Dipercaya oleh para pemimpin industri',
      list: [
        {
          quote: 'InovasiTech sepenuhnya merancang ulang layanan transaksi kami. Waktu muat API turun 60%, dan tim rekayasa kami mendapatkan pengalaman yang mulus.',
          author: 'Marcus Aurelius',
          role: 'VP Engineering, Apex Retailers'
        },
        {
          quote: 'Desainer UI/UX dan insinyur kelas dunia. Mereka merilis aplikasi kebugaran kami dalam rekor waktu — 4,8 bintang di App Store dalam beberapa minggu.',
          author: 'Elena Rostova',
          role: 'Product Owner, FitLife Inc.'
        },
        {
          quote: 'Tim DevOps merancang kerangka kerja AWS yang aman dan terotomatisasi yang menghemat puluhan jam kerja tim infrastruktur kami setiap minggu.',
          author: 'David Vance',
          role: 'Head of Infrastructure, FinTech Ventures'
        }
      ]
    },
    contactSection: {
      badge: 'Mulai Kemitraan',
      title: 'Mari membangun sesuatu yang luar biasa',
      subtitle: 'Memiliki ide produk, migrasi sistem warisan, atau tantangan skalabilitas? Isi formulir dan salah satu insinyur utama kami akan menghubungi dalam waktu 24 jam.',
      whyUs: [
        { title: 'Pendekatan Kebutuhan Utama', desc: 'Tanpa templat. Kami mempelajari arsitektur dan persyaratan Anda sebelum menulis satu baris kode.' },
        { title: 'Akses Insinyur Langsung', desc: 'Berinteraksi langsung dengan tim insinyur kami — tidak pernah hanya dengan staf penjualan.' },
        { title: 'Pengiriman Cepat (Agile)', desc: 'Pipa transparan dengan commit harian, standup mingguan, dan pengiriman tepat waktu.' },
      ]
    },
    contactForm: {
      header: 'Kirim Proposal Proyek',
      sub: 'Beritahu kami tentang proyek Anda dan kami akan merespons dengan cepat.',
      name: 'Nama Lengkap *',
      email: 'Email *',
      company: 'Perusahaan',
      projectType: 'Jenis Proyek *',
      details: 'Detail Proyek *',
      send: 'Kirim Proposal',
      sending: 'Mengirim Proposal...',
      placeholderName: 'John Doe',
      placeholderEmail: 'john@company.com',
      placeholderCompany: 'Opsional',
      placeholderDetails: 'Jelaskan persyaratan proyek Anda, lini waktu, dan anggaran...',
      successHeader: 'Proposal Diterima!',
      successSub: 'Terima kasih! Insinyur utama kami akan menghubungi Anda dalam waktu 24 jam.',
      sendAnother: 'Kirim Lainnya',
      errorConnect: 'Tidak dapat terhubung ke server. Silakan coba lagi.',
    },
    portfolioPage: {
      badge: 'Portofolio',
      title: 'Proyek yang kami rancang',
      subtitle: 'Saring berdasarkan kategori untuk menjelajahi sistem rekayasa dengan fidelitas tinggi yang dibangun untuk perusahaan global dan startup inovatif.',
      filterAll: 'Semua',
      noProjects: 'Tidak ada proyek yang ditemukan dalam kategori ini.',
    },
    blogPage: {
      badge: 'Wawasan Teknologi',
      title: 'Perspektif rekayasa',
      subtitle: 'Analisis mendalam, pola arsitektur, dan strategi desain dari tim produk inti kami.',
      featured: 'Pilihan',
      readTime: 'menit baca',
      readArticle: 'Baca Artikel',
      readMore: 'Selengkapnya',
      noArticles: 'Artikel blog tidak ditemukan.',
    },
    blogSingle: {
      backBtn: 'Kembali ke Blog',
      readyTitle: 'Siap membangun sesuatu yang hebat?',
      readySub: 'Mari ubah ide Anda menjadi produk rekayasa premium.',
      startProject: 'Mulai Proyek',
    },
    footer: {
      description: 'Studio rekayasa perangkat lunak premium yang merancang solusi web, seluler, dan cloud berkinerja tinggi untuk bisnis yang ambisius.',
      rights: 'Hak cipta dilindungi undang-undang.',
    },
    whatsapp: {
      tooltip: 'Hubungi kami di WhatsApp',
      message: 'Halo {name}, saya ingin mendiskusikan proyek software bersama Anda.',
    }
  }
};
