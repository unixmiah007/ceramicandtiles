import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; theme?: 'light' | 'dark'; callback?: (token: string) => void; 'expired-callback'?: () => void }
      ) => number;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

let scriptLoading: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (window.grecaptcha) {
    return Promise.resolve();
  }

  if (scriptLoading) {
    return scriptLoading;
  }

  scriptLoading = new Promise((resolve, reject) => {
    window.onRecaptchaLoad = () => resolve();

    const existing = document.querySelector('script[src*="recaptcha/api.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(script);
  });

  return scriptLoading;
}

interface RecaptchaWidgetProps {
  siteKey: string;
  onChange: (token: string) => void;
  onExpired?: () => void;
}

export default function RecaptchaWidget({ siteKey, onChange, onExpired }: RecaptchaWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  const renderWidget = useCallback(async () => {
    if (!containerRef.current || !siteKey) return;

    await loadRecaptchaScript();

    if (widgetIdRef.current !== null) {
      window.grecaptcha?.reset(widgetIdRef.current);
      return;
    }

    widgetIdRef.current = window.grecaptcha!.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'light',
      callback: onChange,
      'expired-callback': onExpired,
    });
  }, [siteKey, onChange, onExpired]);

  useEffect(() => {
    renderWidget().catch(console.error);
  }, [renderWidget]);

  return <div ref={containerRef} className="recaptcha-widget" />;
}

export function resetRecaptcha(widgetContainer: HTMLElement | null) {
  if (widgetContainer && window.grecaptcha) {
    const widgetId = widgetContainer.getAttribute('data-widget-id');
    if (widgetId) {
      window.grecaptcha.reset(Number(widgetId));
    }
  }
}
