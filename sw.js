const CACHE_NAME = 'maths-v12-topics';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './topic1.pdf', './topic2.pdf', './topic3.pdf', './topic4.pdf',
  './topic5.pdf', './topic6.pdf', './topic7.pdf', './topic8.pdf',
  './topic9.pdf', './topic10.pdf', './topic11.pdf', './topic12.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
