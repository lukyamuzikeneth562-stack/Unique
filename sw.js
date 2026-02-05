const CACHE_NAME = 'textbook-vfinal-cache';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './mybook.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
];

// Force immediate caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Take control of the app immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Serve files from cache first (Offline mode)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
