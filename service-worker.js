const CACHE_VERSION = 'sutsumu-v1-0-0-cache-2';
const CORE_ASSETS = [
  './',
  './index.html',
  './recovery.html',
  './style.css',
  './app.js',
  './service-worker.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './vendor/localforage-1.10.0.min.js',
  './vendor/jszip-3.1.5.min.js',
  './vendor/epub.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(CORE_ASSETS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const isNavigation = request.mode === 'navigate';
  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isNavigation) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_VERSION);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (_err) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  if (isSameOrigin) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) {
        event.waitUntil((async () => {
          try {
            const fresh = await fetch(request);
            const cache = await caches.open(CACHE_VERSION);
            cache.put(request, fresh.clone());
          } catch (_err) {}
        })());
        return cached;
      }

      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_VERSION);
        cache.put(request, fresh.clone());
        return fresh;
      } catch (_err) {
        return cached || Response.error();
      }
    })());
  }
});
