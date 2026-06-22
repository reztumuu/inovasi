'use client';

import React from 'react';
import { Shield, Mail, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyClient() {
  const { language } = useLanguage();

  const isEn = language === 'en';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', transition: 'background-color 0.3s ease', color: 'var(--text-primary)' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '100px 0 50px',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              textDecoration: 'none', 
              color: 'var(--text-muted)', 
              fontSize: '0.85rem',
              marginBottom: '24px',
              transition: 'color 0.2s ease'
            }}
            className="hover-text-primary"
          >
            <ArrowLeft style={{ width: '14px', height: '14px' }} />
            {isEn ? 'Back to Home' : 'Kembali ke Beranda'}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield style={{ width: '24px', height: '24px', color: 'var(--text-accent)' }} />
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 850,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              {isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}
            </h1>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar style={{ width: '13px', height: '13px' }} />
              {isEn ? 'Last updated: June 22, 2026' : 'Terakhir diperbarui: 22 Juni 2026'}
            </span>
            <span>•</span>
            <span>PT INOVASI DIGITAL ASIA</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '48px 0 100px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.7, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            
            {isEn ? (
              // English Content
              <>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>1. Introduction</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Welcome to <strong>Codevora</strong> (accessible at https://codevora.id), which is fully owned, managed, and operated by <strong>PT INOVASI DIGITAL ASIA</strong>. We are committed to protecting the privacy and security of your personal information—whether you are a website visitor, a prospective partner submitting a project proposal (leads), or a client utilizing our software engineering services (web development, mobile apps, cloud infrastructure, UI/UX, and other technology solutions).
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, disclose, store, and safeguard the confidentiality of the data you provide through this website or in the course of our professional collaboration. By using this website or entering into a business relationship with us, you agree to the data protection practices described in this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>2. Information We Collect</h2>
                  <p style={{ marginBottom: '12px' }}>We collect information from you in several ways, including but not limited to:</p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>
                      <strong>Contact & Proposal Form Information (Leads)</strong>: Full name, active email address, company/organization name, telephone/WhatsApp number, project category submitted (e.g. Web Development, Mobile Apps, UI/UX Design), and detailed project descriptions sent to us.
                    </li>
                    <li>
                      <strong>Technical & Work Log Information</strong>: During active software development collaborations, we may collect credentials for hosting environments, code repositories (such as GitHub/GitLab), API keys, and server configuration details voluntarily shared by you for integration and deployment purposes.
                    </li>
                    <li>
                      <strong>Website Usage Information</strong>: Your IP address, browser type, internet service provider, referring/exit pages, operating system, date/time stamps, and other site navigation data collected automatically through analytical scripts (such as Google Analytics & Google Tag Manager).
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>3. How We Use Your Information</h2>
                  <p style={{ marginBottom: '12px' }}>The information we collect is used to support our business operations and improve the quality of our services, including:</p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Contacting you regarding project proposals submitted through the contact forms.</li>
                    <li>Preparing project cost estimations (RAB), schedules (timeline), and technical development proposals.</li>
                    <li>Conducting ongoing communication during design, code engineering, system testing, and deployment.</li>
                    <li>Managing business relations, invoicing, payments, and periodic project reporting.</li>
                    <li>Analyzing Codevora website performance to optimize the visitor navigation experience.</li>
                    <li>Ensuring legal compliance, including compliance with regulations in the Republic of Indonesia.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>4. Jaminan Kerahasiaan (Non-Disclosure Agreement / NDA)</h2>
                  <p style={{ marginBottom: '12px' }}>
                    As a professional software engineering studio, <strong>PT INOVASI DIGITAL ASIA</strong> deeply respects the strategic value of your business ideas, user data, workflow schemes, and project intellectual property. Therefore:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>All project information, internal documentation, and databases shared with us are guaranteed to remain strictly confidential.</li>
                    <li>We are fully prepared to sign a formal Non-Disclosure Agreement (NDA) before any technical discussions or sharing of sensitive data begins.</li>
                    <li>Access to client production environments is strictly restricted to trusted engineers directly assigned to the respective project team.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>5. Data Protection and Storage</h2>
                  <p style={{ marginBottom: '12px' }}>
                    We implement stringent technical and organizational security measures to protect your data from unauthorized access, loss, misuse, or damaging modifications. Data is stored securely in local database environments and encrypted cloud systems utilizing SSL (Secure Sockets Layer) protocols.
                  </p>
                  <p>
                    We will only retain your personal data for as long as necessary to fulfill the original purposes of collection, including satisfying any administrative reporting, legal requirements, tax audits, or dispute resolutions.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>6. Disclosure to Third Parties</h2>
                  <p style={{ marginBottom: '12px' }}>
                    We do not sell, rent, trade, or transfer your personal data to outside parties without your written consent. This does not include:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Trusted infrastructure providers (such as AWS, Google Cloud, or third-party hosting partners agreed upon in the contract) that assist us in operating your application or servers, under strict confidentiality obligations.</li>
                    <li>Emergency legal scenarios where we are required by law or judicial decisions of the Republic of Indonesia to disclose information in compliance with legal processes.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>7. Cookies and Tracking Technologies</h2>
                  <p>
                    Our website uses cookies to enhance functionality and analyze traffic patterns. Cookies are small files transferred to your computer storage through your web browser. You can choose to disable cookies in your browser settings, though doing so may impact certain interactive features on our site.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>8. User Rights</h2>
                  <p style={{ marginBottom: '12px' }}>
                    In accordance with the Personal Data Protection Law (UU PDP) of the Republic of Indonesia, you have full rights to:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Request access and explanations regarding your personal data stored in our systems.</li>
                    <li>Rectify any errors, inaccuracies, or incomplete data in our databases.</li>
                    <li>Request deletion of your personal data after the business contract has officially terminated and legal requirements are met.</li>
                    <li>Withdraw your consent regarding the usage of your project details for public portfolios or promotional purposes.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>9. Changes to this Privacy Policy</h2>
                  <p>
                    We reserve the right to review and update this Privacy Policy periodically to adjust to changes in our services, legal mandates, or digital regulations. The date of the latest update will be listed at the top of this policy page. We recommend reading this page regularly to stay informed about how we safeguard your personal information.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>10. Contact Us</h2>
                  <p style={{ marginBottom: '16px' }}>
                    If you have any questions, objections, or require further clarification regarding this Privacy Policy, please contact our legal team:
                  </p>
                  <div 
                    style={{ 
                      background: 'var(--bg-surface)', 
                      border: '1px solid var(--border-default)', 
                      borderRadius: '6px', 
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>PT INOVASI DIGITAL ASIA (Codevora)</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail style={{ width: '14px', height: '14px', color: 'var(--text-accent)' }} />
                      <a href="mailto:hello@codevora.id" style={{ color: 'var(--text-accent)', textDecoration: 'none' }}>hello@codevora.id</a>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Office Address: Cibiru Cipacing, JL Raya Jatinangor, Sumedang, West Java, Indonesia
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Indonesian Content
              <>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>1. Pendahuluan</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Selamat datang di <strong>Codevora</strong> (diakses melalui https://codevora.id), yang dimiliki, dikelola, dan dioperasikan sepenuhnya oleh <strong>PT INOVASI DIGITAL ASIA</strong>. Kami berkomitmen untuk melindungi privasi serta keamanan informasi pribadi Anda—baik Anda sebagai pengunjung situs, calon mitra yang mengajukan penawaran proyek (leads), maupun klien yang menggunakan jasa pengembangan perangkat lunak (web, aplikasi mobile, sistem cloud, UI/UX, dan solusi teknologi lainnya) dari kami.
                  </p>
                  <p>
                    Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, menyimpan, serta menjaga kerahasiaan data yang Anda berikan melalui situs web ini atau dalam proses kolaborasi kerja bersama kami. Dengan menggunakan situs ini atau menjalin kerja sama dengan kami, Anda menyetujui praktik perlindungan data yang dijelaskan dalam Kebijakan Privasi ini.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>2. Informasi yang Kami Kumpulkan</h2>
                  <p style={{ marginBottom: '12px' }}>Kami mengumpulkan informasi dari Anda dalam beberapa cara, termasuk namun tidak terbatas pada:</p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>
                      <strong>Informasi Formulir Kontak & Penawaran (Leads)</strong>: Nama lengkap, alamat email aktif, nama perusahaan/organisasi, nomor telepon/WhatsApp, kategori proyek yang diajukan (misal: Pembuatan Web, Aplikasi Mobile, Desain UI/UX), dan detail deskripsi proyek yang dikirimkan kepada kami.
                    </li>
                    <li>
                      <strong>Informasi Log Kerja & Teknis</strong>: Selama masa kerja sama pengembangan aplikasi, kami dapat mengumpulkan akses ke kredensial hosting, repositori kode (seperti GitHub/GitLab), API key, dan detail konfigurasi server yang Anda berikan secara sukarela untuk keperluan integrasi dan deployment.
                    </li>
                    <li>
                      <strong>Informasi Penggunaan Situs</strong>: Alamat IP Anda, jenis peramban (browser), penyedia layanan internet, halaman rujukan/keluar, sistem operasi, stempel waktu, dan data navigasi situs lainnya yang dikumpulkan secara otomatis melalui skrip analitik (seperti Google Analytics & Google Tag Manager).
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>3. Penggunaan Informasi</h2>
                  <p style={{ marginBottom: '12px' }}>Informasi yang kami kumpulkan dari Anda digunakan untuk kepentingan operasional bisnis dan peningkatan kualitas layanan, di antaranya:</p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Menghubungi Anda kembali terkait proposal proyek yang diajukan melalui formulir kontak.</li>
                    <li>Menyusun estimasi biaya (RAB), jadwal kerja (timeline), dan proposal teknis pengerjaan aplikasi Anda.</li>
                    <li>Melakukan komunikasi berkelanjutan selama masa desain, pengembangan kode, pengujian, hingga rilis aplikasi.</li>
                    <li>Mengelola hubungan kerja sama bisnis, administrasi pembayaran, tagihan, dan pelaporan berkala.</li>
                    <li>Menganalisis kinerja situs web Codevora untuk mengoptimalkan pengalaman navigasi pengunjung.</li>
                    <li>Kepatuhan hukum, termasuk kepatuhan terhadap peraturan perundang-undangan di Republik Indonesia.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>4. Jaminan Kerahasiaan (Non-Disclosure Agreement / NDA)</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Sebagai penyedia jasa rekayasa perangkat lunak profesional, <strong>PT INOVASI DIGITAL ASIA</strong> sangat memahami nilai strategis dari ide bisnis, data pengguna, skema alur kerja, dan kekayaan intelektual proyek Anda. Oleh karena itu:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Semua informasi proyek, dokumen internal, dan basis data (database) yang dibagikan kepada kami dijamin kerahasiaannya.</li>
                    <li>Kami siap menandatangani Perjanjian Kerahasiaan (NDA) resmi sebelum kerja sama teknis atau pembagian informasi sensitif dimulai.</li>
                    <li>Akses ke lingkungan produksi (production environment) milik klien dibatasi secara ketat hanya untuk engineer tepercaya yang bertugas langsung dalam tim proyek terkait.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>5. Perlindungan dan Penyimpanan Data</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Kami menerapkan standar pengamanan teknis dan organisasi yang ketat guna melindungi data Anda dari akses tanpa izin, kehilangan, penyalahgunaan, atau modifikasi yang merusak. Data tersimpan di lingkungan server lokal dan layanan komputasi awan yang aman dengan protokol enkripsi SSL (Secure Sockets Layer).
                  </p>
                  <p>
                    Kami hanya akan menyimpan data pribadi Anda selama diperlukan untuk memenuhi tujuan awal pengumpulannya, termasuk untuk keperluan pelaporan administratif, kepatuhan hukum, audit pajak, atau penyelesaian sengketa kontrak kerja sama.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>6. Pengungkapan Data Kepada Pihak Ketiga</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Kami tidak menjual, menyewakan, memperdagangkan, atau memindahkan data pribadi Anda kepada pihak luar tanpa persetujuan tertulis dari Anda. Ketentuan ini tidak mencakup:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Mitra penyedia infrastruktur tepercaya (seperti AWS, Google Cloud, atau penyedia hosting pihak ketiga yang disepakati bersama) yang membantu pengoperasian aplikasi atau server Anda, dengan ketentuan mereka wajib menjaga kerahasiaan tersebut.</li>
                    <li>Situasi darurat hukum jika kami diwajibkan oleh hukum atau putusan pengadilan di Republik Indonesia untuk mengungkapkannya guna mematuhi proses hukum yang berlaku.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>7. Cookies dan Teknologi Pelacakan</h2>
                  <p>
                    Situs web ini menggunakan cookies untuk meningkatkan fungsionalitas dan menganalisis perilaku pengunjung. Cookies adalah berkas kecil yang dikirim ke penyimpanan komputer Anda oleh browser. Anda dapat memilih untuk menonaktifkan cookies melalui pengaturan browser Anda, namun hal tersebut mungkin dapat memengaruhi beberapa fungsionalitas interaktif pada situs web kami.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>8. Hak Pengguna Terhadap Informasi Pribadi</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Sesuai dengan Undang-Undang Pelindungan Data Pribadi (UU PDP) yang berlaku di Indonesia, Anda memiliki hak penuh untuk:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Meminta akses dan penjelasan mengenai data pribadi Anda yang kami simpan.</li>
                    <li>Memperbaiki kesalahan, kekeliruan, atau ketidakakuratan data Anda dalam sistem kami.</li>
                    <li>Meminta penghapusan data pribadi Anda setelah kontrak kerja sama resmi berakhir dan kewajiban hukum terpenuhi.</li>
                    <li>Menarik kembali persetujuan Anda atas penggunaan data untuk keperluan promosi atau portofolio publik.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>9. Perubahan pada Kebijakan Privasi</h2>
                  <p>
                    Kami dapat meninjau dan memperbarui Kebijakan Privasi ini dari waktu ke waktu secara berkala guna menyesuaikan dengan perubahan layanan hukum maupun regulasi digital. Tanggal perubahan terbaru akan dicantumkan di bagian atas halaman kebijakan ini. Kami menyarankan Anda untuk membaca halaman ini secara teratur agar selalu mengetahui bagaimana kami melindungi data pribadi Anda.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>10. Hubungi Kami</h2>
                  <p style={{ marginBottom: '16px' }}>
                    Apabila Anda memiliki pertanyaan, keberatan, atau ingin meminta klarifikasi lebih lanjut mengenai Kebijakan Privasi ini, silakan hubungi tim legal kami:
                  </p>
                  <div 
                    style={{ 
                      background: 'var(--bg-surface)', 
                      border: '1px solid var(--border-default)', 
                      borderRadius: '6px', 
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>PT INOVASI DIGITAL ASIA (Codevora)</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail style={{ width: '14px', height: '14px', color: 'var(--text-accent)' }} />
                      <a href="mailto:hello@codevora.id" style={{ color: 'var(--text-accent)', textDecoration: 'none' }}>hello@codevora.id</a>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Alamat Kantor: Cibiru Cipacing, JL Raya Jatinangor, Sumedang, Jawa Barat, Indonesia
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
