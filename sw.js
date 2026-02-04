const CACHE_NAME = 'textbook-v1';
const ASSETS = [
  '/',
  'index.html',
  'manifest.json',
  'mybook.pdf' // High priority for offline reading
];

// Install Event: Saves files to the device
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event: Serves files from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});