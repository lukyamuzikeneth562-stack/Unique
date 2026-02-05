const CACHE_NAME = 'textbook-permanent-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './mybook.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
];

// 1. Install Event - This saves the files to the phone
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching book for offline use...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Forces the new worker to take over
  );
});

// 2. Activate Event - Cleans up old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 3. Fetch Event - This is the "Magic" that works without internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached file if found, otherwise try the network
      return response || fetch(event.request);
    })
  );
});
