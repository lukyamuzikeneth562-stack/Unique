const CACHE_NAME = 'maths-v7';
const assets = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // IF THE FILE IS IN CACHE (Phone Memory), RETURN IT INSTANTLY (0 Data Used)
      if (cachedResponse) {
        return cachedResponse;
      }

      // IF NOT IN CACHE, DOWNLOAD IT AND SAVE IT FOR NEXT TIME
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
