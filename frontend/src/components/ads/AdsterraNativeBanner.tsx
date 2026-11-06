'use client';

import React, { useEffect, useRef } from 'react';

export default function AdsterraNativeBanner({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    // Clean previous script tag if present
    const prevScript = wrapper.querySelector('script');
    if (prevScript) {
      prevScript.remove();
    }

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://bauval.org/21/9f4508dcde8b89b050cfaffcb69c2829';

    wrapper.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        margin: '36px 0',
        minHeight: '100px',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div id="container-9f4508dcde8b89b050cfaffcb69c2829" />
    </div>
  );
}

