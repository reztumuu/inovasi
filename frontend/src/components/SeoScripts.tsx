'use client';

import { useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function SeoScripts() {
  const { settings } = useSettings();

  useEffect(() => {
    // Google Tag Manager
    if (settings.google_tag_manager_id) {
      const gtmScript = document.createElement('script');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${settings.google_tag_manager_id}');
      `;
      gtmScript.setAttribute('id', 'gtm-script');
      document.head.appendChild(gtmScript);
    }

    // Google Analytics
    if (settings.google_analytics_id) {
      // Load gtag.js
      const gaScript = document.createElement('script');
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`;
      gaScript.setAttribute('id', 'ga-script-src');
      gaScript.async = true;
      document.head.appendChild(gaScript);

      // Configure GA
      const gaConfig = document.createElement('script');
      gaConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${settings.google_analytics_id}', {
          page_path: window.location.pathname,
        });
      `;
      gaConfig.setAttribute('id', 'ga-config-script');
      document.head.appendChild(gaConfig);
    }

    // Cleanup function
    return () => {
      const gtmScript = document.getElementById('gtm-script');
      const gaScriptSrc = document.getElementById('ga-script-src');
      const gaConfig = document.getElementById('ga-config-script');
      if (gtmScript) gtmScript.remove();
      if (gaScriptSrc) gaScriptSrc.remove();
      if (gaConfig) gaConfig.remove();
    };
  }, [settings.google_tag_manager_id, settings.google_analytics_id]);

  return null;
}
