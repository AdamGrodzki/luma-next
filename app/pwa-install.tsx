'use client';

import { useEffect } from 'react';

export default function PWAInstall() {
  useEffect(() => {
    // Rejestracja Service Workera
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service Worker nie jest wymagany, aplikacja będzie działać bez niego
      });
    }

    // Obsługa instalacji PWA
    let deferredPrompt: BeforeInstallPromptEvent | null = null;

    window.addEventListener('beforeinstallprompt', (event: Event) => {
      const e = event as BeforeInstallPromptEvent;
      e.preventDefault();
      deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
    });

    return () => {
      // Cleanup
    };
  }, []);

  return null;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
