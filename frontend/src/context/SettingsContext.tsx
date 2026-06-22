'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Settings {
  site_name: string;
  site_logo: string;
  site_favicon: string;
  link_rel: string;
  google_analytics_id: string;
  google_tag_manager_id: string;
  meta_description: string;
  meta_keywords: string;
  robots: string;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  site_name: 'Codevora',
  site_logo: '',
  site_favicon: '',
  link_rel: '',
  google_analytics_id: '',
  google_tag_manager_id: '',
  meta_description: '',
  meta_keywords: '',
  robots: 'index, follow',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children, initialSettings }: { children: React.ReactNode, initialSettings?: Settings }) {
  const [settings, setSettings] = useState<Settings>(initialSettings || defaultSettings);
  const [loading, setLoading] = useState<boolean>(!initialSettings);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch('https://codevora.id/api/settings');
      if (res.ok) {
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          setSettings(json.data);
          // Apply favicon / title dynamically in head
          updateDocumentBranding(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDocumentBranding = (data: Settings) => {
    if (typeof window === 'undefined') return;

    // 1. Title
    if (data.site_name) {
      const currentTitle = document.title;
      // We only update if title hasn't been set to admin dashboard or something specific,
      // or if it's the home/main title containing InovasiTech.
      if (!currentTitle || currentTitle.includes('InovasiTech') || currentTitle === '') {
        document.title = currentTitle.replace('InovasiTech', data.site_name) || `${data.site_name} | Premium Software Engineering Studio`;
      }
    }

    // 2. Favicon
    if (data.site_favicon || data.site_logo) {
      // Find existing favicon link
      let favicon: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(favicon);
      }
      favicon.href = data.site_favicon || data.site_logo;
    }

    // 3. Inject custom link rel tags
    if (data.link_rel) {
      // Remove any previously injected settings link rel tags to avoid duplication
      const existingInjected = document.querySelectorAll('.injected-setting-rel');
      existingInjected.forEach(el => el.remove());

      // Create a temporary div to parse HTML string safely
      const div = document.createElement('div');
      div.innerHTML = data.link_rel.trim();
      
      Array.from(div.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName.toLowerCase() === 'link') {
            const newLink = document.createElement('link');
            // Copy all attributes
            Array.from(el.attributes).forEach(attr => {
              newLink.setAttribute(attr.name, attr.value);
            });
            newLink.classList.add('injected-setting-rel');
            document.head.appendChild(newLink);
          }
        }
      });
    }
  };

  useEffect(() => {
    refreshSettings();
    if (typeof window !== 'undefined') {
      window.addEventListener('settings-updated', refreshSettings);
      return () => window.removeEventListener('settings-updated', refreshSettings);
    }
  }, [refreshSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
