'use client';

import { useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';

// Google Tag Manager noscript fallback (required for GTM to work when JS is disabled)
export default function GtmNoscript() {
  const { settings } = useSettings();

  useEffect(() => {
    if (settings.google_tag_manager_id) {
      // Insert noscript iframe after body
      const noscriptDiv = document.createElement('noscript');
      noscriptDiv.innerHTML = `
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=${settings.google_tag_manager_id}"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe>
      `;
      document.body.insertBefore(noscriptDiv, document.body.firstChild);
    }
  }, [settings.google_tag_manager_id]);

  return null;
}
