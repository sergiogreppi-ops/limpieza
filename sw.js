// Service Worker — permite instalación como PWA
const CACHE = 'limpieza-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Network first — siempre datos frescos de Supabase
self.addEventListener('fetch', e => {
  // Solo cachear el HTML principal
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/'))
    );
  }
});
