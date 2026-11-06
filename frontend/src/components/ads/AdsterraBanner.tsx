'use client';

import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdsterraBanner({
  adKey,
  width,
  height,
  className,
  style,
}: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset container to avoid duplicate iframes on remount
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = `${width}`;
    iframe.height = `${height}`;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.margin = '0 auto';
    iframe.style.display = 'block';
    iframe.scrolling = 'no';
    iframe.setAttribute('title', `Advertisement ${width}x${height}`);

    container.appendChild(iframe);

    try {
      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <style>
                * { box-sizing: border-box; }
                body {
                  margin: 0;
                  padding: 0;
                  overflow: hidden;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: transparent;
                }
              </style>
            </head>
            <body>
              <script type="text/javascript">
                atOptions = {
                  'key' : '${adKey}',
                  'format' : 'iframe',
                  'height' : ${height},
                  'width' : ${width},
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="https://bauval.org/22/${adKey}"></script>
            </body>
          </html>
        `);
        doc.close();
      }
    } catch (err) {
      console.error('Failed to load ad banner:', err);
    }
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '16px auto',
        maxWidth: '100%',
        minHeight: `${height}px`,
        ...style,
      }}
    />
  );
}

