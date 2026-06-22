'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle, Zap, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (localStorage.getItem('admin_token')) router.push('/admin/dashboard');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('https://codevora.id/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Invalid login credentials.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Could not connect to the backend server.');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        position: 'relative',
        background: 'var(--bg-base)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '4px',
            background: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Zap style={{ width: '22px', height: '22px', color: 'var(--bg-base)' }} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 850, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Sign in to manage services, portfolios & leads
          </p>
        </div>

        {/* Form Card */}
        <div
          className="solid-card"
          style={{ padding: '32px' }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="email" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  width: '15px', height: '15px', color: 'var(--text-secondary)',
                  pointerEvents: 'none',
                }} />
                <input
                  type="email" id="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@inovasitech.com"
                  className="input-field"
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="password" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  width: '15px', height: '15px', color: 'var(--text-secondary)',
                  pointerEvents: 'none',
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="input-field"
                  style={{ paddingLeft: '40px', paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-secondary)', padding: '4px',
                    display: 'flex', alignItems: 'center',
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword
                    ? <EyeOff style={{ width: '15px', height: '15px' }} />
                    : <Eye style={{ width: '15px', height: '15px' }} />
                  }
                </button>
              </div>
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 12px',
                background: 'rgba(225,29,72,0.08)',
                border: '1px solid rgba(225,29,72,0.2)',
                borderRadius: '4px',
                color: 'var(--accent-rose)',
                fontSize: '0.82rem',
              }}>
                <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary"
              style={{
                width: '100%', padding: '12px',
                fontSize: '0.9rem',
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                marginTop: '4px',
              }}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 style={{ width: '15px', height: '15px', animation: 'spin 1s linear infinite' }} />
                  Signing in...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '24px' }}>
          This is a restricted admin area. Unauthorized access is prohibited.
        </p>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
