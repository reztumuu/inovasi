'use client';

import Link from 'next/link';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';

export default function Footer() {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const services = [
    { label: t('services.web.title'), href: '/#services' },
    { label: t('services.mobile.title'), href: '/#services' },
    { label: t('services.design.title'), href: '/#services' },
    { label: t('services.cloud.title'), href: '/#services' },
    { label: t('services.ai.title'), href: '/#services' }
  ];

  const company = [
    { label: t('nav.portfolio'), href: '/portfolio' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.contact'), href: '/#contact' },
  ];

  const socials = [
    {
      href: 'https://github.com/reztumuu', label: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      )
    },
    {
      href: 'https://www.linkedin.com/in/reztumu/', label: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      href: 'https://t.me/gamingku', label: 'Telegram',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px' }}>
          <path d="M11.944 0C5.344 0 0 5.344 0 12c0 6.656 5.344 12 11.944 12 6.656 0 12-5.344 12-12 0-6.656-5.344-12-12-12zm5.88 7.37c-.156 1.637-.872 5.86-1.233 7.795-.153.82-.455 1.096-.747 1.123-.635.058-1.117-.42-1.73-.822-.962-.628-1.505-1.017-2.44-1.633-1.08-.712-.38-1.104.236-1.745.16-.168 2.955-2.708 3.01-2.937.007-.03.007-.15-.064-.213-.071-.062-.175-.042-.25-.025-.107.024-1.815 1.155-5.12 3.39-.484.333-.923.496-1.317.483-.434-.013-1.27-.25-1.89-.452-.76-.248-1.365-.38-1.312-.803.027-.22.33-.446.91-.678 3.567-1.55 5.946-2.57 7.137-3.06 3.398-1.4 4.103-1.643 4.563-1.651.102-.002.327.023.473.143.123.1.156.24.17.34.015.097.032.298.016.488z"/>
        </svg>
      )
    },
  ];

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-default)',
        position: 'relative',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 0' }}>
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            paddingBottom: '48px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', width: 'fit-content' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '6px',
                background: settings.site_logo ? 'transparent' : 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {settings.site_logo ? (
                  <img src={settings.site_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <Zap style={{ width: '22px', height: '22px', color: 'var(--bg-base)' }} />
                )}
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                {settings.site_name || 'Codevora'}
              </span>
            </Link>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '260px' }}>
              {t('footer.description')}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-link"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              {t('nav.services')}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
              {services.map(s => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="footer-link"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Company
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
              {company.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="footer-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              {t('nav.contact')}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin style={{ width: '14px', height: '14px', color: 'var(--text-secondary)', marginTop: '3px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Cibiru Cipacing, JL Raya Jatinangor<br />Sumedang, Indonesia
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone style={{ width: '14px', height: '14px', color: 'var(--text-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>+62 81222054811</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail style={{ width: '14px', height: '14px', color: 'var(--text-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>hello@codevora.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '24px 0' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {year} {settings.site_name || 'Codevora'}. {t('footer.rights')}
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service'].map(label => (
              <a
                key={label}
                href="#"
                className="footer-link"
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}