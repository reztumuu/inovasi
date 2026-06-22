'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, Building2, Briefcase, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '', email: '', company: '', project_type: 'Web Development', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');
    try {
      const res = await fetch('https://codevora.id/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setStatus('success');
        setResponseMsg(data.message);
        setForm({ name: '', email: '', company: '', project_type: 'Web Development', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setResponseMsg(t('contactForm.errorConnect'));
    }
  };

  if (status === 'success') {
    return (
      <div
        className="solid-card"
        style={{
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
        }}
      >
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'rgba(5, 150, 105, 0.1)',
          border: '1px solid rgba(5, 150, 105, 0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '8px',
          animation: 'fadeIn 0.4s ease',
        }}>
          <CheckCircle2 style={{ width: '28px', height: '28px', color: 'var(--accent-emerald)' }} />
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {t('contactForm.successHeader')}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '340px' }}>
          {responseMsg || t('contactForm.successSub')}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn btn-ghost btn-sm"
          style={{ marginTop: '8px' }}
        >
          {t('contactForm.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <div
      className="solid-card"
      style={{ padding: '32px' }}
    >
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
        {t('contactForm.header')}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        {t('contactForm.sub')}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="name" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <User style={{ width: '12px', height: '12px' }} />
              {t('contactForm.name')}
            </label>
            <input
              type="text" id="name" name="name" required
              value={form.name} onChange={handleChange}
              placeholder={t('contactForm.placeholderName')}
              className="input-field"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="email" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Mail style={{ width: '12px', height: '12px' }} />
              {t('contactForm.email')}
            </label>
            <input
              type="email" id="email" name="email" required
              value={form.email} onChange={handleChange}
              placeholder={t('contactForm.placeholderEmail')}
              className="input-field"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="company" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Building2 style={{ width: '12px', height: '12px' }} />
              {t('contactForm.company')}
            </label>
            <input
              type="text" id="company" name="company"
              value={form.company} onChange={handleChange}
              placeholder={t('contactForm.placeholderCompany')}
              className="input-field"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="project_type" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Briefcase style={{ width: '12px', height: '12px' }} />
              {t('contactForm.projectType')}
            </label>
            <select
              id="project_type" name="project_type" required
              value={form.project_type} onChange={handleChange}
              className="input-field"
            >
              <option value="Web Development">{t('services.web.title')}</option>
              <option value="Mobile App Development">{t('services.mobile.title')}</option>
              <option value="UI/UX Design">{t('services.design.title')}</option>
              <option value="Cloud & DevOps Solutions">{t('services.cloud.title')}</option>
              <option value="AI & Intelligent Systems">{t('services.ai.title')}</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="message" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MessageSquare style={{ width: '12px', height: '12px' }} />
            {t('contactForm.details')}
          </label>
          <textarea
            id="message" name="message" required rows={4}
            value={form.message} onChange={handleChange}
            placeholder={t('contactForm.placeholderDetails')}
            className="input-field"
            style={{ resize: 'none' }}
          />
        </div>

        {/* Error */}
        {status === 'error' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 14px',
            background: 'rgba(225,29,72,0.08)',
            border: '1px solid rgba(225,29,72,0.2)',
            borderRadius: '4px',
            color: 'var(--accent-rose)',
            fontSize: '0.85rem',
          }}>
            <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
            {responseMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '0.9rem',
            opacity: status === 'loading' ? 0.7 : 1,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            marginTop: '4px',
          }}
        >
          {status === 'loading' ? (
            <>
              <Loader2 style={{ width: '15px', height: '15px', animation: 'spin 1s linear infinite' }} />
              {t('contactForm.sending')}
            </>
          ) : (
            <>
              <Send style={{ width: '15px', height: '15px' }} />
              {t('contactForm.send')}
            </>
          )}
        </button>
      </form>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}