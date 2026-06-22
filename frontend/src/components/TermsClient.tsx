'use client';

import React from 'react';
import { FileText, Mail, Calendar, ArrowLeft, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsClient() {
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
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText style={{ width: '24px', height: '24px', color: 'rgba(99,102,241,1)' }} />
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 850,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              {isEn ? 'Terms & Conditions' : 'Syarat & Ketentuan Layanan'}
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
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>1. General Terms & Acceptance of Terms</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Welcome to the official website of <strong>Codevora</strong> (https://codevora.id), operated by <strong>PT INOVASI DIGITAL ASIA</strong>. This document outlines the official Terms and Conditions of Service (hereinafter referred to as the "Terms") governing all rights, obligations, and the working relationship between us as the technology engineering services provider and you as the Client or User.
                  </p>
                  <p>
                    By accessing our website, submitting proposals through our contact forms, or signing a Service Agreement (SPK) with PT INOVASI DIGITAL ASIA, you legally agree to have read, understood, and accepted all clauses within these Terms without exception. If you do not agree to any part of these Terms, you are advised to stop using our website and services.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>2. Scope of Services</h2>
                  <p style={{ marginBottom: '12px' }}>
                    PT INOVASI DIGITAL ASIA specializes in premium information technology consulting and software engineering services. The services we offer include, but are not limited to:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Custom Web Systems engineering (SaaS platforms, corporate web portals, e-commerce, and internal dashboards) utilizing modern frameworks such as Next.js, React, Node.js, and Laravel.</li>
                    <li>Mobile Application development (iOS and Android) using Native or Cross-Platform architectures (React Native / Flutter).</li>
                    <li>Professional User Interface and User Experience (UI/UX) design, including customized design systems and interactive prototyping.</li>
                    <li>Cloud infrastructure architecture design (AWS, GCP, DigitalOcean) and CI/CD automated deployment pipeline management (DevOps).</li>
                    <li>System maintenance (Server Maintenance), database optimization, and software bug remediation.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>3. Project Onboarding & Written Agreements</h2>
                  <p style={{ marginBottom: '12px' }}>All software engineering bookings are structured formally through the following stages:</p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Consultation & Scoping</strong>: The Client submits project requirements via the contact form on Codevora or by contacting us directly.</li>
                    <li><strong>Technical Proposal & Cost Estimation (SOW & RAB)</strong>: We will draft a Statement of Work (SOW) and a detailed Cost Estimate (RAB) based on the agreed specifications.</li>
                    <li><strong>Binding Contract (SPK)</strong>: Formal cooperation is considered legally active and binding only after the Client and the management of PT INOVASI DIGITAL ASIA sign a formal Service Agreement (SPK), detailing timelines, deliverables, fees, and responsibilities.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>4. Payment Terms & Milestone Fees</h2>
                  <p style={{ marginBottom: '12px' }}>
                    All project payment policies are governed strictly by the written agreement signed in the SPK, with the following general milestones:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Down Payment (DP)</strong>: The Client must pay a non-refundable upfront deposit of 30% to 50% of the total project value before planning, design, or codebase writing begins.</li>
                    <li><strong>Milestone-Based Payments</strong>: Subsequent payments will be invoiced upon the successful delivery of specific project milestones (e.g. UI/UX approval, Beta/UAT release).</li>
                    <li><strong>Final Settlement & Handover</strong>: The remaining contract balance must be paid in full by the Client upon completion of User Acceptance Testing (UAT) and prior to the deployment of the application to the Client\'s live production environments.</li>
                    <li>Payments transferred for completed stages of work are non-refundable.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>5. Intellectual Property & Source Code Ownership</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Software ownership policies upon project completion are governed as follows:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Client Ownership</strong>: Upon receipt of 100% full payment, all Intellectual Property (IP) rights and ownership of custom source code built specifically for the Client\'s project will be transferred entirely to the Client.</li>
                    <li><strong>Third-Party Licenses</strong>: Source code may incorporate open-source elements, third-party libraries, or premium API keys. Licenses for these elements remain under their respective terms, and subscription fees for any external APIs remain the sole responsibility of the Client.</li>
                    <li><strong>Portfolio Rights</strong>: Unless prohibited by a formal Non-Disclosure Agreement (NDA), PT INOVASI DIGITAL ASIA reserves the right to display visual mockups and case summaries of completed projects as portfolio items on the Codevora website.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>6. Change Requests (CR)</h2>
                  <p>
                    Deliverable scope outlined in the SOW/SPK contract is binding. If the Client requests new features, significant modifications to the business logic, or design conceptual shifts outside the initial scope while development is underway, these requests will be classified as <strong>Change Requests (CR)</strong>. CRs require a signed contract addendum detailing price adjustments and timeline extensions.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>7. Warranty & Maintenance SLA</h2>
                  <p style={{ marginBottom: '12px' }}>
                    We guarantee the quality of our software engineering deliverables with the following warranty terms:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Free Bug Fixes</strong>: We provide a free system error and bug remediation warranty for 30 (thirty) calendar days starting from the date of official handover or deployment.</li>
                    <li><strong>Warranty Exclusions</strong>: The free warranty becomes void if system malfunctions are caused by modifications made by third parties outside our team, incorrect server configurations made by the Client, cyberattacks, or external API breaking updates.</li>
                    <li>Following the expiration of the warranty period, the Client can opt to continue support through a monthly or annual Service Level Agreement (SLA Maintenance Contract).</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>8. Limitation of Liability</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Under no circumstances shall PT INOVASI DIGITAL ASIA (Codevora), including its directors, employees, and subcontractors, be liable for:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Financial losses, lost profits, operational downtime, or data corruption experienced by the Client in their production environment.</li>
                    <li>System accessibility issues resulting from third-party services outside our direct control, such as ISP outages, AWS/GCP server disruptions, Google Play Store/Apple App Store account suspensions, or hosting vendor terminations.</li>
                    <li>Force Majeure occurrences such as natural disasters, wars, acts of terrorism, civil unrest, government regulations, or national power/internet grids failures.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>9. Governing Law & Dispute Resolution</h2>
                  <p>
                    These Terms and Conditions are governed by, and interpreted in accordance with, the laws of the Republic of Indonesia. In the event of a dispute or contract interpretation disagreement between PT INOVASI DIGITAL ASIA and the Client, both parties agree to resolve the issue amicably through consensus. If a resolution is not reached within 30 days, the dispute shall be resolved through the jurisdiction of the District Court of Sumedang or relevant arbitration bodies in Indonesia.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>10. Contact Us</h2>
                  <p style={{ marginBottom: '16px' }}>
                    If you require further information or have questions regarding these Terms & Conditions, please contact our official representative:
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
                      <User style={{ width: '14px', height: '14px', color: 'var(--text-accent)' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Owner & CEO: <strong>Restu Ariadi</strong>
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone style={{ width: '14px', height: '14px', color: 'var(--text-accent)' }} />
                      <a href="tel:+6281222054811" style={{ color: 'var(--text-accent)', textDecoration: 'none' }}>+62 81222054811</a>
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
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>1. Ketentuan Umum & Penerimaan Syarat</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Selamat datang di situs resmi <strong>Codevora</strong> (https://codevora.id) yang dikelola oleh <strong>PT INOVASI DIGITAL ASIA</strong>. Halaman ini memuat Syarat dan Ketentuan Layanan resmi (selanjutnya disebut "Ketentuan") yang mengatur seluruh hak, kewajiban, serta hubungan kerja antara kami sebagai penyedia jasa rekayasa teknologi dan Anda sebagai Klien atau Pengguna situs.
                  </p>
                  <p>
                    Dengan mengakses situs web kami, mengirimkan proposal melalui formulir kontak, atau menandatangani Surat Perjanjian Kerja (SPK) dengan PT INOVASI DIGITAL ASIA, Anda secara hukum menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan di dalam dokumen ini tanpa terkecuali. Jika Anda tidak menyetujui bagian mana pun dari Ketentuan ini, Anda disarankan untuk menghentikan penggunaan situs web dan layanan kami.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>2. Ruang Lingkup Jasa & Layanan Kami</h2>
                  <p style={{ marginBottom: '12px' }}>
                    PT INOVASI DIGITAL ASIA bergerak di bidang jasa konsultasi dan pengembangan teknologi informasi kelas premium. Jasa yang kami tawarkan meliputi, namun tidak terbatas pada:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Pengembangan Web Sistem kustom (SaaS, Enterprise Portals, E-Commerce, Dashboard internal) menggunakan framework modern seperti Next.js, React, Node.js, dan Laravel.</li>
                    <li>Pengembangan Aplikasi Mobile (iOS dan Android) berbasis Native maupun Cross-Platform (React Native / Flutter).</li>
                    <li>Desain Antarmuka dan Pengalaman Pengguna (UI/UX Design) profesional, termasuk kustom sistem desain dan prototipe interaktif.</li>
                    <li>Penyusunan arsitektur sistem cloud (AWS, GCP, DigitalOcean) dan manajemen integrasi CI/CD pipelines (DevOps).</li>
                    <li>Pemeliharaan server (Server Maintenance), optimalisasi performa basis data, dan perbaikan bug sistem.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>3. Alur Pengajuan Proyek & Perjanjian Tertulis</h2>
                  <p style={{ marginBottom: '12px' }}>Prosedur pemesanan jasa pengembangan sistem diatur melalui tahapan formal berikut:</p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Konsultasi & Kebutuhan</strong>: Klien mengirimkan ringkasan kebutuhan proyek melalui formulir leads di situs Codevora atau menghubungi kami secara langsung.</li>
                    <li><strong>Proposal Teknis & Penawaran Harga (SOW & RAB)</strong>: Kami akan menyusun draf Dokumen Lingkup Kerja (Statement of Work - SOW) serta Rincian Anggaran Biaya (RAB) berdasarkan spesifikasi yang disepakati.</li>
                    <li><strong>Kontrak SPK</strong>: Kerja sama resmi dianggap sah dan mengikat hanya setelah Klien dan pihak manajemen PT INOVASI DIGITAL ASIA menandatangani dokumen Surat Perjanjian Kerja (SPK) resmi di atas materai, yang mencakup jadwal kerja, harga, detail fitur, serta penanggung jawab proyek.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>4. Ketentuan Pembayaran & Termin Biaya</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Seluruh kebijakan pembayaran proyek diatur secara ketat berdasarkan kesepakatan tertulis di dalam SPK, dengan skema umum sebagai berikut:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Down Payment (DP)</strong>: Klien wajib membayar uang muka sebesar minimal 30% hingga 50% dari total nilai proyek sebelum pekerjaan perencanaan desain atau penulisan kode baris pertama dimulai oleh tim engineer kami.</li>
                    <li><strong>Pembayaran Termin (Milestone-based)</strong>: Pembayaran lanjutan akan ditagihkan secara bertahap setelah penyelesaian target fase kerja tertentu (misalnya: selesai Desain UI/UX, selesai versi Beta/UAT).</li>
                    <li><strong>Pelunasan & Serah Terima</strong>: Pembayaran sisa kontrak (pelunasan) harus dibayarkan penuh oleh Klien setelah proses Uji Coba Pengguna (User Acceptance Testing - UAT) selesai dan sebelum aplikasi dideploy secara resmi ke server produksi (production release) Klien.</li>
                    <li>Pembayaran yang sudah ditransfer untuk tahapan pekerjaan yang sudah selesai dikerjakan tidak dapat ditarik kembali (non-refundable).</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>5. Hak Kekayaan Intelektual & Kepemilikan Kode Sumber</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Kejijakan kepemilikan aset perangkat lunak diatur sebagai berikut setelah proses pengerjaan selesai:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Kepemilikan Klien</strong>: Setelah Klien melakukan pelunasan biaya proyek secara penuh (100%), seluruh Hak Kekayaan Intelektual (HAKI) dan kepemilikan kode sumber (source code) yang dibangun secara kustom khusus untuk proyek Klien akan dialihkan sepenuhnya kepada Klien.</li>
                    <li><strong>Lisensi Pihak Ketiga</strong>: Kode sumber mungkin mengandung elemen open-source, library pihak ketiga, atau API berbayar. Lisensi untuk komponen pihak ketiga tersebut tunduk pada lisensi masing-masing penyedia layanan, dan biaya langganan API eksternal sepenuhnya menjadi tanggung jawab Klien.</li>
                    <li><strong>Hak Portofolio</strong>: Kecuali ada perjanjian kerahasiaan tertulis (NDA) yang melarangnya, PT INOVASI DIGITAL ASIA berhak menampilkan visual antarmuka dan rangkuman deskripsi proyek yang telah selesai dikerjakan sebagai portofolio resmi di situs web Codevora.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>6. Perubahan Lingkup Pekerjaan (Change Requests)</h2>
                  <p>
                    Lingkup kerja yang telah disepakati pada draf SOW dalam SPK bersifat mengikat. Jika Klien meminta penambahan fitur baru, perubahan alur bisnis sistem yang signifikan, atau perbaikan konsep di luar ruang lingkup kerja awal selama proses pengembangan sedang berlangsung, maka permintaan tersebut akan dikategorikan sebagai <strong>Change Request (CR)</strong>. Proses ini akan memerlukan kesepakatan adendum baru terkait penyesuaian biaya tambahan dan perpanjangan jadwal pengerjaan proyek.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>7. Garansi Sistem & Masa Pemeliharaan (Maintenance)</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Kami menjamin keandalan kualitas rekayasa perangkat lunak yang kami bangun dengan ketentuan garansi sebagai berikut:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Garansi Bug Gratis</strong>: Kami memberikan masa garansi perbaikan bug dan galat sistem (error) secara gratis selama 30 (tiga puluh) hari kalender terhitung sejak tanggal serah terima aplikasi atau deployment ke server Klien.</li>
                    <li><strong>Batasan Garansi</strong>: Garansi gratis ini gugur apabila kegagalan sistem disebabkan oleh modifikasi kode sumber oleh pihak ketiga di luar tim kami, kesalahan konfigurasi server secara mandiri oleh Klien, serangan siber pihak luar, atau ketidakcocokan versi API pihak ketiga yang diperbarui sepihak.</li>
                    <li>Setelah masa garansi berakhir, Klien dapat memilih untuk memperpanjang kerja sama melalui kontrak pemeliharaan server berkala (SLA Maintenance Contract) yang ditagih bulanan/tahunan.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>8. Batasan Tanggung Jawab</h2>
                  <p style={{ marginBottom: '12px' }}>
                    Dalam kondisi apa pun, PT INOVASI DIGITAL ASIA (Codevora), termasuk direksi, karyawan, dan subkontraktor kami, tidak bertanggung jawab atas:
                  </p>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Kerugian finansial, kehilangan keuntungan bisnis, gangguan operasional, atau kehilangan data yang dialami Klien akibat kegagalan fungsi aplikasi dalam masa produksi.</li>
                    <li>Gangguan akses aplikasi yang diakibatkan oleh pihak ketiga yang berada di luar kendali teknis langsung kami, seperti masalah jaringan ISP, gangguan server cloud AWS/GCP, pemblokiran Google Play Store/Apple App Store, atau penangguhan akun hosting.</li>
                    <li>Keadaan memaksa (Force Majeure) seperti bencana alam, perang, sabotase, kerusuhan massal, regulasi baru pemerintah, atau pemadaman listrik/internet nasional.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>9. Hukum yang Berlaku & Penyelesaian Sengketa</h2>
                  <p>
                    Syarat dan Ketentuan Layanan ini diatur, ditafsirkan, dan tunduk sepenuhnya pada peraturan perundang-undangan Republik Indonesia. Apabila timbul perselisihan atau sengketa penafsiran kontrak kerja di kemudian hari antara PT INOVASI DIGITAL ASIA dan Klien, kedua belah pihak sepakat untuk menyelesaikan permasalahan tersebut terlebih dahulu melalui jalur musyawarah mufakat secara kekeluargaan. Jika mufakat tidak tercapai dalam waktu 30 hari, sengketa akan diselesaikan secara hukum melalui yurisdiksi Pengadilan Negeri Sumedang atau badan arbitrase terkait di Indonesia.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>10. Hubungi Kami</h2>
                  <p style={{ marginBottom: '16px' }}>
                    Apabila Anda memiliki pertanyaan, keberatan, atau ingin meminta klarifikasi lebih lanjut mengenai Syarat dan Ketentuan Layanan ini, silakan hubungi perwakilan resmi kami:
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
                      <User style={{ width: '14px', height: '14px', color: 'var(--text-accent)' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Pemilik & CEO: <strong>Restu Ariadi</strong>
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone style={{ width: '14px', height: '14px', color: 'var(--text-accent)' }} />
                      <a href="tel:+6281222054811" style={{ color: 'var(--text-accent)', textDecoration: 'none' }}>+62 81222054811</a>
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
