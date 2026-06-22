'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, ChevronRight, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/components/Providers';
import { useSettings } from '@/context/SettingsContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSettings();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/#services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.2s ease',
        borderBottom: scrolled ? '1px solid var(--border-default)' : '1px solid transparent',
        background: scrolled ? 'var(--bg-surface)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '6px',
                background: settings.site_logo ? 'transparent' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {settings.site_logo ? (
                <img src={settings.site_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <Zap style={{ width: '22px', height: '22px', color: 'var(--bg-base)' }} />
              )}
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              {settings.site_name || 'Codevora'}
            </span>
          </Link>

          {/* Desktop Nav & Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="hidden-mobile">
            <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Vertical Divider */}
            <div style={{ width: '1px', height: '18px', background: 'var(--border-default)' }} />

            {/* Controls: Theme & Language */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Language Switcher */}
              <div style={{ display: 'flex', height: '34px', border: '1px solid var(--border-default)', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                <button
                  onClick={() => setLanguage('en')}
                  style={{
                    padding: '0 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: language === 'en' ? 'var(--text-primary)' : 'transparent',
                    color: language === 'en' ? 'var(--bg-base)' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('id')}
                  style={{
                    padding: '0 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: language === 'id' ? 'var(--text-primary)' : 'transparent',
                    color: language === 'id' ? 'var(--bg-base)' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ID
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  height: '34px',
                  width: '34px',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  padding: 0,
                }}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun style={{ width: '16px', height: '16px' }} />
                ) : (
                  <Moon style={{ width: '16px', height: '16px' }} />
                )}
              </button>
            </div>

            <Link
              href="/#contact"
              className="btn btn-primary btn-sm"
            >
              <span>{t('nav.getInTouch')}</span>
              <ChevronRight style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="show-mobile-flex">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '7px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun style={{ width: '15px', height: '15px' }} />
              ) : (
                <Moon style={{ width: '15px', height: '15px' }} />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '7px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <X style={{ width: '16px', height: '16px' }} />
              ) : (
                <Menu style={{ width: '16px', height: '16px' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            style={{
              borderTop: '1px solid var(--border-default)',
              padding: '16px 0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              animation: 'fadeIn 0.2s ease',
              background: 'var(--bg-surface)',
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Lang Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', marginTop: '4px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Language / Bahasa</span>
              <div style={{ display: 'flex', border: '1px solid var(--border-default)', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => { setLanguage('en'); setIsOpen(false); }}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: language === 'en' ? 'var(--text-primary)' : 'transparent',
                    color: language === 'en' ? 'var(--bg-base)' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => { setLanguage('id'); setIsOpen(false); }}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: language === 'id' ? 'var(--text-primary)' : 'transparent',
                    color: language === 'id' ? 'var(--bg-base)' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ID
                </button>
              </div>
            </div>

            <div style={{ paddingTop: '12px', marginTop: '4px', borderTop: '1px solid var(--border-default)' }}>
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                {t('nav.getInTouch')}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile-flex { display: none !important; }
        }
      `}</style>
    </header>
  );
}