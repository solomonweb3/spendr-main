import { useState, useEffect, useCallback } from "react";

export type ConsentStatus = "accepted" | "rejected" | null;

const STORAGE_KEY = "spendr_cookie_consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "rejected") return stored;
    } catch {}
    return null;
  });

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  }, []);

  return { consent, accept, reject, showBanner: consent === null };
}

/**
 * Load Google Analytics only after consent is given.
 * Call this hook in App or a top-level component.
 * Pass your GA Measurement ID (e.g. "G-XXXXXXXXXX").
 * Scripts are never injected if consent is not "accepted".
 */
export function useAnalytics(measurementId?: string) {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent !== "accepted" || !measurementId) return;

    // Prevent double-loading
    if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    const inline = document.createElement("script");
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', { anonymize_ip: true });
    `;
    document.head.appendChild(inline);
  }, [consent, measurementId]);
}
