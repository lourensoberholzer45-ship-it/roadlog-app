/* RoadLog Service Worker — cache version 2 */
const CACHE = 'roadlog-v2';
const ASSETS = [
  '/roadlog-app/',
  '/roadlog-app/index.html',
  '/roadlog-app/manifest.json',
  '/roadlog-app/icon-192.png',
  '/roadlog-app/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Always fetch fresh from network, fall back to cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
