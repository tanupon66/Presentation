const CACHE = 'dmss-faas-interactive-v1.3.1';
const CORE = [
  './index.html', './index_th.html', './presenter.html',
  './styles.css?v=1.3.1', './app.js?v=1.3.1', './presenter.js?v=1.3.1',
  './manifest.webmanifest', './assets/icon.svg',
  './assets/workflow-paper.webp', './assets/characterization-paper.webp', './assets/microscopy-paper.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request, { ignoreSearch: true })) || (fallbackUrl ? await cache.match(fallbackUrl) : Response.error());
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate') {
    const fallback = url.pathname.endsWith('presenter.html') ? './presenter.html' : './index.html';
    event.respondWith(networkFirst(event.request, fallback));
    return;
  }
  if (/\.(?:html|css|js)$/.test(url.pathname)) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }))
  );
});
