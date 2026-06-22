'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, RefreshCw, Mail, Calendar, MessageSquare, Briefcase,
  Trash2, CheckCircle2, Loader2, User, LayoutDashboard, AlertCircle,
  Archive, RotateCcw, Plus, Edit2, X, Save, ExternalLink,
  Image as ImageIcon, BookOpen, FolderOpen, Inbox, Settings, Layers, Upload,
  Globe, Smartphone, Palette, Cloud, Cpu, Code2, Shield, Database, Terminal
} from 'lucide-react';

/* =====================================================
   TYPES
===================================================== */
interface Lead {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  project_type: string;
  message: string;
  status: 'pending' | 'contacted' | 'archived';
  created_at: string;
}

interface Portfolio {
  id: number;
  title: string;
  client_name?: string | null;
  category: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string | null;
  order?: number;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
}

type ActiveTab = 'leads' | 'portfolio' | 'blog' | 'services' | 'settings';

const serviceIconMap: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  Globe,
  Smartphone,
  Palette,
  Cloud,
  Cpu,
  Code2,
  Shield,
  Database,
  Layers,
  Terminal,
};

/* =====================================================
   HELPERS
===================================================== */
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const statusConfig = {
  pending:   { label: 'Pending',   color: 'var(--accent-amber)',   accent: 'var(--accent-amber)' },
  contacted: { label: 'Contacted', color: 'var(--accent-emerald)', accent: 'var(--accent-emerald)' },
  archived:  { label: 'Archived',  color: 'var(--text-secondary)', accent: 'var(--text-muted)' },
};

/* =====================================================
   REUSABLE COMPONENTS
===================================================== */
function IconBtn({ onClick, icon: Icon, color = 'var(--text-secondary)', title }: {
  onClick: () => void; icon: React.ComponentType<{ style?: React.CSSProperties }>;
  color?: string; title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="admin-icon-btn"
      style={{ color }}
    >
      <Icon style={{ width: '14px', height: '14px' }} />
    </button>
  );
}

function ModalOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

function InputField({ label, name, value, onChange, type = 'text', placeholder, required, rows }: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string; placeholder?: string; required?: boolean; rows?: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}{required && ' *'}
      </label>
      {rows ? (
        <textarea
          name={name} value={value} onChange={onChange}
          placeholder={placeholder} required={required} rows={rows}
          className="input-field"
          style={{ resize: 'vertical' }}
        />
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange}
          placeholder={placeholder} required={required}
          className="input-field"
        />
      )}
    </div>
  );
}

/* =====================================================
   PORTFOLIO FORM MODAL
===================================================== */
const emptyPortfolio = { title: '', client_name: '', category: '', description: '', image_url: '', tech_stack_str: '', live_url: '' };

function PortfolioModal({ item, onClose, onSave }: {
  item: Portfolio | null; onClose: () => void;
  onSave: (data: Omit<Portfolio, 'id'>) => Promise<void>;
}) {
  const [form, setForm] = useState(item ? {
    title: item.title, client_name: item.client_name || '',
    category: item.category, description: item.description,
    image_url: item.image_url, tech_stack_str: item.tech_stack.join(', '),
    live_url: item.live_url || '',
  } : emptyPortfolio);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      await onSave({
        title: form.title, client_name: form.client_name || null,
        category: form.category, description: form.description,
        image_url: form.image_url,
        tech_stack: form.tech_stack_str.split(',').map(s => s.trim()).filter(Boolean),
        live_url: form.live_url || null,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally { setSaving(false); }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="solid-card" style={{ width: '100%', maxWidth: '600px', padding: '28px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {item ? 'Edit Portfolio' : 'Add New Portfolio'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <InputField label="Project Title" name="title" value={form.title} onChange={handleChange} required placeholder="E-Commerce Platform" />
            <InputField label="Client Name" name="client_name" value={form.client_name} onChange={handleChange} placeholder="Apex Retailers" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <InputField label="Category" name="category" value={form.category} onChange={handleChange} required placeholder="Web Development" />
            <InputField label="Live URL" name="live_url" value={form.live_url} onChange={handleChange} type="url" placeholder="https://..." />
          </div>
          <InputField label="Image URL" name="image_url" value={form.image_url} onChange={handleChange} required type="url" placeholder="https://images.unsplash.com/..." />
          <InputField label="Tech Stack (comma-separated)" name="tech_stack_str" value={form.tech_stack_str} onChange={handleChange} required placeholder="Next.js, Laravel, MySQL, Docker" />
          <InputField label="Description" name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="Brief project description..." />
          {error && (
            <div style={{ padding: '10px 12px', background: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.2)', borderRadius: '4px', color: 'var(--accent-rose)', fontSize: '0.82rem' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">Cancel</button>
            <button
              type="submit" disabled={saving}
              className="btn btn-primary btn-sm"
              style={{ opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {saving ? <Loader2 style={{ width: '13px', height: '13px', animation: 'spin 1s linear infinite' }} /> : <Save style={{ width: '13px', height: '13px' }} />}
              {saving ? 'Saving...' : 'Save Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

/* =====================================================
   BLOG FORM MODAL
===================================================== */
const emptyPost = { title: '', summary: '', content: '', image_url: '', author_name: '' };

function BlogModal({ item, onClose, onSave }: {
  item: Post | null; onClose: () => void;
  onSave: (data: Omit<Post, 'id' | 'slug' | 'created_at'>) => Promise<void>;
}) {
  const [form, setForm] = useState(item ? {
    title: item.title, summary: item.summary, content: item.content,
    image_url: item.image_url, author_name: item.author_name,
  } : emptyPost);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try { await onSave(form); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="solid-card" style={{ width: '100%', maxWidth: '680px', padding: '28px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {item ? 'Edit Article' : 'Add New Article'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField label="Article Title" name="title" value={form.title} onChange={handleChange} required placeholder="Why Headless Architecture is the Future..." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <InputField label="Author Name" name="author_name" value={form.author_name} onChange={handleChange} placeholder="John Doe (CTO)" />
            <InputField label="Cover Image URL" name="image_url" value={form.image_url} onChange={handleChange} required type="url" placeholder="https://images.unsplash.com/..." />
          </div>
          <InputField label="Summary (max 500 chars)" name="summary" value={form.summary} onChange={handleChange} required rows={2} placeholder="Brief summary of the article..." />
          <InputField label="Content (Markdown supported: ### heading, - list, ```code```)" name="content" value={form.content} onChange={handleChange} required rows={8} placeholder={'### Introduction\n\nYour article content here...\n\n### Section 2\n\nMore content...'} />
          {error && (
            <div style={{ padding: '10px 12px', background: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.2)', borderRadius: '4px', color: 'var(--accent-rose)', fontSize: '0.82rem' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">Cancel</button>
            <button
              type="submit" disabled={saving}
              className="btn btn-primary btn-sm"
              style={{ opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {saving ? <Loader2 style={{ width: '13px', height: '13px', animation: 'spin 1s linear infinite' }} /> : <Save style={{ width: '13px', height: '13px' }} />}
              {saving ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

/* =====================================================
   SERVICES FORM MODAL
===================================================== */
const emptyService = { title: '', description: '', icon_name: '', order: '0' };

function ServiceModal({ item, onClose, onSave }: {
  item: Service | null; onClose: () => void;
  onSave: (data: Omit<Service, 'id'>) => Promise<void>;
}) {
  const [form, setForm] = useState(item ? {
    title: item.title,
    description: item.description,
    icon_name: item.icon_name,
    order: String(item.order || 0),
  } : emptyService);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.icon_name) {
      setError('Please select a service icon.');
      return;
    }
    setSaving(true); setError('');
    try {
      await onSave({
        title: form.title,
        description: form.description,
        icon_name: form.icon_name,
        order: Number(form.order) || 0,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally { setSaving(false); }
  };

  const AVAILABLE_ICONS = [
    { name: 'Globe', label: 'Web' },
    { name: 'Smartphone', label: 'Mobile' },
    { name: 'Palette', label: 'Design' },
    { name: 'Cloud', label: 'Cloud' },
    { name: 'Cpu', label: 'AI' },
    { name: 'Code2', label: 'Code' },
    { name: 'Shield', label: 'Security' },
    { name: 'Database', label: 'Data' },
    { name: 'Layers', label: 'System' },
    { name: 'Terminal', label: 'Console' }
  ];

  return (
    <ModalOverlay onClose={onClose}>
      <div className="solid-card" style={{ width: '100%', maxWidth: '500px', padding: '28px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {item ? 'Edit Service' : 'Add New Service'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField label="Service Title" name="title" value={form.title} onChange={handleChange} required placeholder="Web Development" />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Service Icon *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '4px' }}>
              {AVAILABLE_ICONS.map(iconOpt => {
                const IconComp = serviceIconMap[iconOpt.name] || Layers;
                const isSelected = form.icon_name === iconOpt.name;
                return (
                  <button
                    key={iconOpt.name}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, icon_name: iconOpt.name }))}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '12px 8px',
                      borderRadius: '4px',
                      border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-default)',
                      background: isSelected ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <IconComp style={{ width: '20px', height: '20px' }} />
                    <span style={{ fontSize: '0.62rem', fontWeight: 600 }}>{iconOpt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <InputField label="Sort Order" name="order" value={form.order} onChange={handleChange} type="number" placeholder="0" />
          <InputField label="Description" name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="We build high-performance web systems..." />
          {error && (
            <div style={{ padding: '10px 12px', background: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.2)', borderRadius: '4px', color: 'var(--accent-rose)', fontSize: '0.82rem' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">Cancel</button>
            <button
              type="submit" disabled={saving}
              className="btn btn-primary btn-sm"
              style={{ opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {saving ? <Loader2 style={{ width: '13px', height: '13px', animation: 'spin 1s linear infinite' }} /> : <Save style={{ width: '13px', height: '13px' }} />}
              {saving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

/* =====================================================
   SECTION HEADER
===================================================== */
function SectionHeader({ title, count, onAdd, onRefresh, loading, addLabel }: {
  title: string; count: number; onAdd: () => void; onRefresh: () => void;
  loading: boolean; addLabel: string;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h2>
        <span style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', borderRadius: '2px', padding: '2px 8px', fontSize: '0.72rem', fontWeight: 700 }}>
          {count}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={onRefresh} disabled={loading} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {loading ? <Loader2 style={{ width: '12px', height: '12px', animation: 'spin 1s linear infinite' }} /> : <RefreshCw style={{ width: '12px', height: '12px' }} />}
          Refresh
        </button>
        {addLabel && (
          <button onClick={onAdd} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Plus style={{ width: '12px', height: '12px' }} />
            {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   MAIN DASHBOARD
===================================================== */
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('leads');
  const [adminUser, setAdminUser] = useState<{ name?: string; email?: string } | null>(null);

  /* --- Leads state --- */
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  /* --- Portfolio state --- */
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [portfolioError, setPortfolioError] = useState('');
  const [portfolioModal, setPortfolioModal] = useState<{ open: boolean; item: Portfolio | null }>({ open: false, item: null });

  /* --- Blog state --- */
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState('');
  const [postModal, setPostModal] = useState<{ open: boolean; item: Post | null }>({ open: false, item: null });

  /* --- Services state --- */
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');
  const [serviceModal, setServiceModal] = useState<{ open: boolean; item: Service | null }>({ open: false, item: null });

  /* --- Settings state --- */
  const [settingsForm, setSettingsForm] = useState({
    site_name: '',
    site_logo: '',
    site_favicon: '',
    link_rel: '',
    google_analytics_id: '',
    google_tag_manager_id: '',
    meta_description: '',
    meta_keywords: '',
    robots: 'index, follow',
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  /* --- Auth check & fetch --- */
  const handleLogout = useCallback(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  }, [router]);

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true); setLeadsError('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('https://codevora.id/api/admin/leads', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') setLeads(data.data);
      else { setLeadsError(data.message || 'Failed to fetch leads.'); if (res.status === 401) handleLogout(); }
    } catch { setLeadsError('Cannot connect to server.'); }
    finally { setLeadsLoading(false); }
  }, [handleLogout]);

  const fetchPortfolios = useCallback(async () => {
    setPortfolioLoading(true); setPortfolioError('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('https://codevora.id/api/admin/portfolios', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') setPortfolios(data.data);
      else setPortfolioError(data.message || 'Failed to fetch portfolios.');
    } catch { setPortfolioError('Cannot connect to server.'); }
    finally { setPortfolioLoading(false); }
  }, []);

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true); setPostsError('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('https://codevora.id/api/admin/posts', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') setPosts(data.data);
      else setPostsError(data.message || 'Failed to fetch posts.');
    } catch { setPostsError('Cannot connect to server.'); }
    finally { setPostsLoading(false); }
  }, []);

  const fetchServices = useCallback(async () => {
    setServicesLoading(true); setServicesError('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('https://codevora.id/api/admin/services', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') setServices(data.data);
      else setServicesError(data.message || 'Failed to fetch services.');
    } catch { setServicesError('Cannot connect to server.'); }
    finally { setServicesLoading(false); }
  }, []);

  const fetchSettings = useCallback(async () => {
    setSettingsLoading(true); setSettingsError('');
    try {
      const res = await fetch('https://codevora.id/api/settings');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSettingsForm({
          site_name: data.data.site_name || '',
          site_logo: data.data.site_logo || '',
          site_favicon: data.data.site_favicon || '',
          link_rel: data.data.link_rel || '',
          google_analytics_id: data.data.google_analytics_id || '',
          google_tag_manager_id: data.data.google_tag_manager_id || '',
          meta_description: data.data.meta_description || '',
          meta_keywords: data.data.meta_keywords || '',
          robots: data.data.robots || 'index, follow',
        });
      }
    } catch { setSettingsError('Failed to fetch settings from backend.'); }
    finally { setSettingsLoading(false); }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    const user = localStorage.getItem('admin_user');
    if (user) setAdminUser(JSON.parse(user));
    fetchLeads();
    fetchPortfolios();
    fetchPosts();
    fetchServices();
    fetchSettings();
  }, [router, fetchLeads, fetchPortfolios, fetchPosts, fetchServices, fetchSettings]);

  /* -------------------- LEADS -------------------- */
  const handleUpdateStatus = async (id: number, newStatus: Lead['status']) => {
    setUpdatingId(id);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`https://codevora.id/api/admin/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') setLeads(p => p.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch { /* silent */ }
    finally { setUpdatingId(null); }
  };

  const handleDeleteLead = async (id: number) => {
    setDeleteConfirm({
      open: true,
      title: 'Delete Project Proposal',
      message: 'Are you sure you want to delete this project proposal permanently? This action cannot be undone.',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const res = await fetch(`https://codevora.id/api/admin/leads/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
          });
          const data = await res.json();
          if (res.ok && data.status === 'success') setLeads(p => p.filter(l => l.id !== id));
        } catch { /* silent */ }
        setDeleteConfirm(null);
      }
    });
  };

  /* -------------------- PORTFOLIOS -------------------- */
  const savePortfolio = async (formData: Omit<Portfolio, 'id'>) => {
    const token = localStorage.getItem('admin_token');
    const editing = portfolioModal.item;
    const url = editing
      ? `https://codevora.id/api/admin/portfolios/${editing.id}`
      : 'https://codevora.id/api/admin/portfolios';
    const method = editing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok || data.status !== 'success') throw new Error(data.message || 'Save failed.');
    await fetchPortfolios();
    setPortfolioModal({ open: false, item: null });
  };

  const deletePortfolio = async (id: number) => {
    setDeleteConfirm({
      open: true,
      title: 'Delete Portfolio Item',
      message: 'Are you sure you want to delete this portfolio item permanently? This action cannot be undone.',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const res = await fetch(`https://codevora.id/api/admin/portfolios/${id}`, {
            method: 'DELETE', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
          });
          const data = await res.json();
          if (res.ok && data.status === 'success') setPortfolios(p => p.filter(i => i.id !== id));
        } catch { /* silent */ }
        setDeleteConfirm(null);
      }
    });
  };

  /* -------------------- POSTS -------------------- */
  const savePost = async (formData: Omit<Post, 'id' | 'slug' | 'created_at'>) => {
    const token = localStorage.getItem('admin_token');
    const editing = postModal.item;
    const url = editing
      ? `https://codevora.id/api/admin/posts/${editing.id}`
      : 'https://codevora.id/api/admin/posts';
    const method = editing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok || data.status !== 'success') throw new Error(data.message || 'Save failed.');
    await fetchPosts();
    setPostModal({ open: false, item: null });
  };

  const deletePost = async (id: number) => {
    setDeleteConfirm({
      open: true,
      title: 'Delete Article',
      message: 'Are you sure you want to delete this article permanently? This action cannot be undone.',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const res = await fetch(`https://codevora.id/api/admin/posts/${id}`, {
            method: 'DELETE', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
          });
          const data = await res.json();
          if (res.ok && data.status === 'success') setPosts(p => p.filter(i => i.id !== id));
        } catch { /* silent */ }
        setDeleteConfirm(null);
      }
    });
  };

  /* -------------------- SERVICES -------------------- */
  const saveService = async (formData: Omit<Service, 'id'>) => {
    const token = localStorage.getItem('admin_token');
    const editing = serviceModal.item;
    const url = editing
      ? `https://codevora.id/api/admin/services/${editing.id}`
      : 'https://codevora.id/api/admin/services';
    const method = editing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok || data.status !== 'success') throw new Error(data.message || 'Save failed.');
    await fetchServices();
    setServiceModal({ open: false, item: null });
  };

  const deleteService = async (id: number) => {
    setDeleteConfirm({
      open: true,
      title: 'Delete Service',
      message: 'Are you sure you want to delete this service permanently? This action cannot be undone.',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const res = await fetch(`https://codevora.id/api/admin/services/${id}`, {
            method: 'DELETE', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
          });
          const data = await res.json();
          if (res.ok && data.status === 'success') setServices(p => p.filter(i => i.id !== id));
        } catch { /* silent */ }
        setDeleteConfirm(null);
      }
    });
  };

  /* -------------------- SETTINGS -------------------- */
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setSettingsError('');
    setSettingsSuccess('');

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('https://codevora.id/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSettingsForm(prev => ({ ...prev, site_logo: data.url }));
        setSettingsSuccess('Logo uploaded successfully!');
      } else {
        setSettingsError(data.message || 'Upload failed.');
      }
    } catch {
      setSettingsError('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setSettingsError('');
    setSettingsSuccess('');

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('https://codevora.id/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSettingsForm(prev => ({ ...prev, site_favicon: data.url }));
        setSettingsSuccess('Favicon uploaded successfully!');
      } else {
        setSettingsError(data.message || 'Upload failed.');
      }
    } catch {
      setSettingsError('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true); setSettingsError(''); setSettingsSuccess('');
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('https://codevora.id/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSettingsSuccess('Settings updated successfully!');
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('settings-updated'));
        }
      } else {
        setSettingsError(data.message || 'Failed to update settings.');
      }
    } catch {
      setSettingsError('Failed to connect to backend.');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleLogoutAction = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      await fetch('https://codevora.id/api/logout', {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
    } catch { /* silent */ }
    handleLogout();
  };

  /* =====================================================
     RENDER
  ===================================================== */
  const tabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ style?: React.CSSProperties }>; count: number }[] = [
    { id: 'leads', label: 'Leads', icon: Inbox, count: leads.length },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen, count: portfolios.length },
    { id: 'blog', label: 'Blog Articles', icon: BookOpen, count: posts.length },
    { id: 'services', label: 'Services', icon: Layers, count: services.length },
    { id: 'settings', label: 'Settings', icon: Settings, count: 0 },
  ];

  const pending   = leads.filter(l => l.status === 'pending').length;
  const contacted = leads.filter(l => l.status === 'contacted').length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', transition: 'background-color 0.3s ease', paddingTop: '88px', paddingBottom: '48px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* === TOP HEADER === */}
        <div className="solid-card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutDashboard style={{ width: '18px', height: '18px', color: 'var(--bg-base)' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>Admin Dashboard</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{adminUser?.email || 'Admin'}</p>
            </div>
          </div>
          <button
            onClick={handleLogoutAction}
            className="admin-logout-btn"
          >
            <LogOut style={{ width: '13px', height: '13px' }} />
            Sign Out
          </button>
        </div>

        {/* === STATS ROW === */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Total Leads', value: leads.length, color: 'var(--text-accent)', icon: Inbox },
            { label: 'Pending', value: pending, color: 'var(--accent-amber)', icon: MessageSquare },
            { label: 'Contacted', value: contacted, color: 'var(--accent-emerald)', icon: CheckCircle2 },
            { label: 'Portfolios', value: portfolios.length, color: 'var(--accent-violet)', icon: FolderOpen },
            { label: 'Articles', value: posts.length, color: 'var(--accent-cyan)', icon: BookOpen },
          ].map(({ label, value, color, icon: Icon }, i) => (
            <div key={i} className="solid-card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <Icon style={{ width: '15px', height: '15px', color }} />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* === TABS === */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '4px' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '8px 12px', borderRadius: '2px', border: 'none', cursor: 'pointer',
                  fontFamily: "var(--font-display)", fontSize: '0.8rem', fontWeight: 600,
                  transition: 'all 0.15s ease',
                  background: active ? 'var(--text-primary)' : 'transparent',
                  color: active ? 'var(--bg-base)' : 'var(--text-secondary)',
                }}
              >
                <Icon style={{ width: '14px', height: '14px' }} />
                <span className="tab-label-text">{tab.label}</span>
                <span style={{
                  background: active ? 'rgba(255,255,255,0.2)' : 'var(--bg-elevated)',
                  color: active ? '#fff' : 'var(--text-primary)',
                  borderRadius: '2px', padding: '1px 6px', fontSize: '0.68rem', fontWeight: 700,
                  marginLeft: '4px',
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================== LEADS TAB ======================== */}
        {activeTab === 'leads' && (
          <div>
            <SectionHeader
              title="Project Proposals"
              count={leads.length}
              onAdd={() => {}}
              onRefresh={fetchLeads}
              loading={leadsLoading}
              addLabel=""
            />
            {leadsLoading && leads.length === 0 ? (
              <EmptyLoading />
            ) : leadsError ? (
              <ErrorBox msg={leadsError} />
            ) : leads.length === 0 ? (
              <EmptyBox icon="📬" title="No proposals yet" desc="Client proposals submitted through the contact form will appear here." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {leads.map(lead => {
                  const cfg = statusConfig[lead.status];
                  const isUpd = updatingId === lead.id;
                  return (
                    <div key={lead.id} className="solid-card" style={{ padding: 0, overflow: 'hidden', borderLeft: `3px solid ${cfg.accent}` }}>
                      {/* Top row */}
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 8px', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: cfg.color }}>{cfg.label}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>{lead.project_type}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatDate(lead.created_at)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {lead.status !== 'contacted' && <ActionBtn label="Contacted" color="var(--accent-emerald)" icon={CheckCircle2} disabled={isUpd} onClick={() => handleUpdateStatus(lead.id, 'contacted')} />}
                          {lead.status !== 'archived' && <ActionBtn label="Archive" color="var(--text-secondary)" icon={Archive} disabled={isUpd} onClick={() => handleUpdateStatus(lead.id, 'archived')} />}
                          {lead.status !== 'pending' && <ActionBtn label="Re-open" color="var(--accent-amber)" icon={RotateCcw} disabled={isUpd} onClick={() => handleUpdateStatus(lead.id, 'pending')} />}
                          <IconBtn onClick={() => handleDeleteLead(lead.id)} icon={Trash2} color="var(--accent-rose)" title="Delete" />
                        </div>
                      </div>
                      {/* Body */}
                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                          <InfoChip icon={User} label="Sender" value={lead.name} color="var(--text-primary)" />
                          <InfoChip icon={Mail} label="Email" value={lead.email} color="var(--text-accent)" link={`mailto:${lead.email}`} />
                          {lead.company && <InfoChip icon={Briefcase} label="Company" value={lead.company} color="var(--accent-violet)" />}
                        </div>
                        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                            <MessageSquare style={{ width: '12px', height: '12px', color: 'var(--text-secondary)' }} />
                            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{lead.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================== PORTFOLIO TAB ======================== */}
        {activeTab === 'portfolio' && (
          <div>
            <SectionHeader
              title="Portfolio Items"
              count={portfolios.length}
              onAdd={() => setPortfolioModal({ open: true, item: null })}
              onRefresh={fetchPortfolios}
              loading={portfolioLoading}
              addLabel="Add Portfolio"
            />
            {portfolioLoading && portfolios.length === 0 ? (
              <EmptyLoading />
            ) : portfolioError ? (
              <ErrorBox msg={portfolioError} />
            ) : portfolios.length === 0 ? (
              <EmptyBox icon="🗂️" title="No portfolio items" desc="Add your first project to showcase your work." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {portfolios.map(item => (
                  <div key={item.id} className="solid-card" style={{ padding: 0, overflow: 'hidden', display: 'flex' }}>
                    {/* Thumbnail */}
                    <div style={{ width: '110px', minHeight: '90px', flexShrink: 0, overflow: 'hidden', background: 'var(--bg-elevated)', position: 'relative' }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ImageIcon style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px', minWidth: 0 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                          <div style={{ minWidth: 0 }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.client_name || 'No client'}</span>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.title}
                            </h4>
                          </div>
                          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                            {item.live_url && (
                              <a href={item.live_url} target="_blank" rel="noopener noreferrer">
                                <IconBtn onClick={() => {}} icon={ExternalLink} color="var(--accent-cyan)" title="View live" />
                              </a>
                            )}
                            <IconBtn onClick={() => setPortfolioModal({ open: true, item })} icon={Edit2} color="var(--text-primary)" title="Edit" />
                            <IconBtn onClick={() => deletePortfolio(item.id)} icon={Trash2} color="var(--accent-rose)" title="Delete" />
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>{item.category}</span>
                        {item.tech_stack.slice(0, 4).map((t, i) => (
                          <span key={i} className="tech-pill" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>{t}</span>
                        ))}
                        {item.tech_stack.length > 4 && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>+{item.tech_stack.length - 4}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================== BLOG TAB ======================== */}
        {activeTab === 'blog' && (
          <div>
            <SectionHeader
              title="Blog Articles"
              count={posts.length}
              onAdd={() => setPostModal({ open: true, item: null })}
              onRefresh={fetchPosts}
              loading={postsLoading}
              addLabel="New Article"
            />
            {postsLoading && posts.length === 0 ? (
              <EmptyLoading />
            ) : postsError ? (
              <ErrorBox msg={postsError} />
            ) : posts.length === 0 ? (
              <EmptyBox icon="✍️" title="No articles yet" desc="Write your first blog article to share insights." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {posts.map(post => (
                  <div key={post.id} className="solid-card" style={{ padding: 0, overflow: 'hidden', display: 'flex' }}>
                    {/* Thumbnail */}
                    <div style={{ width: '110px', minHeight: '90px', flexShrink: 0, overflow: 'hidden', background: 'var(--bg-elevated)' }}>
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BookOpen style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px', minWidth: 0 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2px' }}>
                              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{formatDate(post.created_at)}</span>
                              {post.author_name && <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>by {post.author_name}</span>}
                            </div>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {post.title}
                            </h4>
                          </div>
                          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              <IconBtn onClick={() => {}} icon={ExternalLink} color="var(--accent-cyan)" title="View article" />
                            </a>
                            <IconBtn onClick={() => setPostModal({ open: true, item: post })} icon={Edit2} color="var(--text-primary)" title="Edit" />
                            <IconBtn onClick={() => deletePost(post.id)} icon={Trash2} color="var(--accent-rose)" title="Delete" />
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        /blog/{post.slug}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================== SERVICES TAB ======================== */}
        {activeTab === 'services' && (
          <div>
            <SectionHeader
              title="Services"
              count={services.length}
              onAdd={() => setServiceModal({ open: true, item: null })}
              onRefresh={fetchServices}
              loading={servicesLoading}
              addLabel="Add Service"
            />
            {servicesLoading && services.length === 0 ? (
              <EmptyLoading />
            ) : servicesError ? (
              <ErrorBox msg={servicesError} />
            ) : services.length === 0 ? (
              <EmptyBox icon="🛠️" title="No services configured" desc="Add services/capabilities to showcase your offerings." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {services.map(item => {
                  const IconComponent = serviceIconMap[item.icon_name] || Layers;
                  return (
                    <div key={item.id} className="solid-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconComponent style={{ width: '18px', height: '18px', color: 'var(--text-primary)' }} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.description}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <IconBtn onClick={() => setServiceModal({ open: true, item })} icon={Edit2} color="var(--text-primary)" title="Edit" />
                        <IconBtn onClick={() => deleteService(item.id)} icon={Trash2} color="var(--accent-rose)" title="Delete" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================== SETTINGS TAB ======================== */}
        {activeTab === 'settings' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Website Settings</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Manage site branding, SEO, and analytics tracking.</p>
            </div>
            
            <form onSubmit={saveSettings} className="solid-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InputField
                label="Website Title / Logo Name"
                name="site_name"
                value={settingsForm.site_name}
                onChange={e => setSettingsForm(prev => ({ ...prev, site_name: e.target.value }))}
                required
                placeholder="Codevora"
              />

              {/* Website Logo URL / File */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Website Logo URL
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="site_logo"
                    value={settingsForm.site_logo}
                    onChange={e => setSettingsForm(prev => ({ ...prev, site_logo: e.target.value }))}
                    placeholder="https://..."
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <div style={{ position: 'relative' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      style={{ display: 'none' }}
                      id="logo-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="logo-upload"
                      className="btn btn-ghost btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '100%', cursor: 'pointer', border: '1px solid var(--border-default)', padding: '0 12px' }}
                    >
                      {uploading ? (
                        <Loader2 style={{ width: '13px', height: '13px', animation: 'spin 1s linear infinite' }} />
                      ) : (
                        <Upload style={{ width: '13px', height: '13px' }} />
                      )}
                      Upload Logo
                    </label>
                  </div>
                </div>
              </div>

              {/* Website Favicon URL / File */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Website Favicon URL (Link Rel Icon)
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="site_favicon"
                    value={settingsForm.site_favicon}
                    onChange={e => setSettingsForm(prev => ({ ...prev, site_favicon: e.target.value }))}
                    placeholder="https://..."
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <div style={{ position: 'relative' }}>
                    <input
                      type="file"
                      accept="image/*,.ico"
                      onChange={handleFaviconUpload}
                      style={{ display: 'none' }}
                      id="favicon-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="favicon-upload"
                      className="btn btn-ghost btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '100%', cursor: 'pointer', border: '1px solid var(--border-default)', padding: '0 12px' }}
                    >
                      {uploading ? (
                        <Loader2 style={{ width: '13px', height: '13px', animation: 'spin 1s linear infinite' }} />
                      ) : (
                        <Upload style={{ width: '13px', height: '13px' }} />
                      )}
                      Upload Favicon
                    </label>
                  </div>
                </div>
              </div>

              <InputField
                label="Link Rel Tags (Custom Link tags for external stylesheets, fonts, icons, etc.)"
                name="link_rel"
                value={settingsForm.link_rel}
                onChange={e => setSettingsForm(prev => ({ ...prev, link_rel: e.target.value }))}
                rows={4}
                placeholder={'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap">\n<link rel="icon" type="image/png" href="/custom-favicon.png">'}
              />

              {/* SEO Settings Section */}
              <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '16px', marginTop: '4px' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>SEO & Analytics</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <InputField
                    label="Google Analytics ID"
                    name="google_analytics_id"
                    value={settingsForm.google_analytics_id}
                    onChange={e => setSettingsForm(prev => ({ ...prev, google_analytics_id: e.target.value }))}
                    placeholder="G-XXXXXXXXXX"
                  />
                  <InputField
                    label="Google Tag Manager ID"
                    name="google_tag_manager_id"
                    value={settingsForm.google_tag_manager_id}
                    onChange={e => setSettingsForm(prev => ({ ...prev, google_tag_manager_id: e.target.value }))}
                    placeholder="GTM-XXXXXXX"
                  />
                </div>

                <div style={{ marginTop: '12px' }}>
                  <InputField
                    label="Meta Description (max 320 chars)"
                    name="meta_description"
                    value={settingsForm.meta_description}
                    onChange={e => setSettingsForm(prev => ({ ...prev, meta_description: e.target.value }))}
                    rows={2}
                    placeholder="Brief description of your website for search engines..."
                  />
                </div>

                <div style={{ marginTop: '12px' }}>
                  <InputField
                    label="Meta Keywords (comma-separated)"
                    name="meta_keywords"
                    value={settingsForm.meta_keywords}
                    onChange={e => setSettingsForm(prev => ({ ...prev, meta_keywords: e.target.value }))}
                    placeholder="web development, mobile app, software house, cloud"
                  />
                </div>

                <div style={{ marginTop: '12px' }}>
                  <InputField
                    label="Robots Meta Tag"
                    name="robots"
                    value={settingsForm.robots}
                    onChange={e => setSettingsForm(prev => ({ ...prev, robots: e.target.value }))}
                    placeholder="index, follow"
                  />
                </div>

                <div style={{ marginTop: '8px', padding: '10px 12px', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Google Analytics ID:</strong> Format: G-XXXXXXXXXX atau GTM-XXXXXXX<br/>
                  <strong style={{ color: 'var(--text-primary)' }}>Robots:</strong> index,follow = semua halaman diindex. Gunakan noindex,nofollow untuk halaman private.
                </div>
              </div>

              {settingsError && <ErrorBox msg={settingsError} />}
              {settingsSuccess && (
                <div style={{ padding: '10px 12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '4px', color: 'var(--accent-emerald)', fontSize: '0.82rem' }}>
                  {settingsSuccess}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
                <button
                  type="submit"
                  disabled={settingsLoading || uploading}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {settingsLoading ? (
                    <Loader2 style={{ width: '13px', height: '13px', animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <Save style={{ width: '13px', height: '13px' }} />
                  )}
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* === MODALS === */}
      {portfolioModal.open && (
        <PortfolioModal
          item={portfolioModal.item}
          onClose={() => setPortfolioModal({ open: false, item: null })}
          onSave={savePortfolio}
        />
      )}
      {postModal.open && (
        <BlogModal
          item={postModal.item}
          onClose={() => setPostModal({ open: false, item: null })}
          onSave={savePost}
        />
      )}
      {serviceModal.open && (
        <ServiceModal
          item={serviceModal.item}
          onClose={() => setServiceModal({ open: false, item: null })}
          onSave={saveService}
        />
      )}
      {deleteConfirm && deleteConfirm.open && (
        <ConfirmDeleteModal
          title={deleteConfirm.title}
          message={deleteConfirm.message}
          onConfirm={deleteConfirm.onConfirm}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 560px) {
          .tab-label-text { display: none; }
        }
      `}</style>
    </div>
  );
}

function ConfirmDeleteModal({ title, message, onConfirm, onCancel }: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <ModalOverlay onClose={onCancel}>
      <div
        className="solid-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          background: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderRadius: '4px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              background: 'rgba(225,29,72,0.08)',
              border: '1px solid rgba(225,29,72,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AlertCircle style={{ width: '20px', height: '20px', color: 'var(--accent-rose)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {message}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost btn-sm"
            style={{ padding: '8px 16px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-sm"
            style={{
              background: 'var(--accent-rose)',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =====================================================
   SMALL HELPER COMPONENTS
===================================================== */
function EmptyLoading() {
  return (
    <div className="solid-card" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <Loader2 style={{ width: '24px', height: '24px', color: 'var(--text-primary)', animation: 'spin 1s linear infinite' }} />
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading...</p>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="solid-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(225,29,72,0.05)', borderColor: 'rgba(225,29,72,0.2)' }}>
      <AlertCircle style={{ width: '16px', height: '16px', color: 'var(--accent-rose)', flexShrink: 0 }} />
      <p style={{ fontSize: '0.85rem', color: 'var(--accent-rose)' }}>{msg}</p>
    </div>
  );
}

function EmptyBox({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="solid-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{title}</h3>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
  );
}

function ActionBtn({ label, color, icon: Icon, onClick, disabled }: {
  label: string; color: string; icon: React.ComponentType<{ style?: React.CSSProperties }>;
  onClick: () => void; disabled: boolean;
}) {
  return (
    <button
      onClick={onClick} disabled={disabled}
      className="admin-action-btn"
      style={{ color }}
    >
      <Icon style={{ width: '12px', height: '12px' }} />
      {label}
    </button>
  );
}

function InfoChip({ icon: Icon, label, value, color, link }: {
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  label: string; value: string; color: string; link?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon style={{ width: '12px', height: '12px', color }} />
      </div>
      <div>
        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</div>
        {link ? (
          <a href={link} style={{ fontSize: '0.82rem', fontWeight: 600, color, textDecoration: 'none' }}>{value}</a>
        ) : (
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
        )}
      </div>
    </div>
  );
}