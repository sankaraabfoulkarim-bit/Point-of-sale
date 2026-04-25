// ════════════════════════════════════════════════════════════════
// DIGITALE SOLUTION POS — Service Worker
// Stratégie : Cache-First pour les assets, Network-First pour Firebase
// ════════════════════════════════════════════════════════════════

const CACHE_NAME = 'ds-pos-v1';
const OFFLINE_URL = './index.html';

// Fichiers à mettre en cache immédiatement à l'installation
const PRECACHE_ASSETS = [
  './index.html',
  './manifest.json',
];

// Domaines Firebase et Google — toujours réseau (pas de cache)
const NETWORK_ONLY_HOSTS = [
  'firestore.googleapis.com',
  'firebase.googleapis.com',
  'identitytoolkit.googleapis.com',
  'securetoken.googleapis.com',
  'www.gstatic.com',
];

// ── INSTALLATION ─────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATION — nettoyage anciens caches ────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH — stratégie selon la ressource ─────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Firebase / Google APIs → toujours réseau, jamais de cache
  if (NETWORK_ONLY_HOSTS.some(h => url.hostname.includes(h))) {
    event.respondWith(fetch(request));
    return;
  }

  // 2. Google Fonts → cache avec fallback réseau
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 3. Requêtes POST / non-GET → toujours réseau
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // 4. Assets locaux → Cache-First avec mise à jour réseau
  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Hors ligne : retourner la page principale si navigation
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });

      return cached || networkFetch;
    })
  );
});

// ── PUSH NOTIFICATIONS (optionnel, prêt pour l'avenir) ───────
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'Digitale Solution POS', {
      body: data.body || '',
      icon: './icons/icon-192.png',
      badge: './icons/icon-72.png',
      tag: data.tag || 'ds-notif',
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const client of list) {
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(event.notification.data.url);
    })
  );
});
