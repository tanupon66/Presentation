const CACHE = 'dmss-faas-interactive-v2.3.0';
const CORE = [
  './index.html',
  './index_th.html',
  './presenter.html',
  './styles.css?v=2.3.0',
  './research_content.js?v=2.3.0',
  './scene_enrichment.js?v=2.3.0',
  './app.js?v=2.3.0',
  './presenter.js?v=2.3.0',
  './manifest.webmanifest',
  './assets/icon.svg',
  './assets/workflow-paper.webp',
  './assets/characterization-paper.webp',
  './assets/microscopy-paper.webp',
  './assets/topic_01.svg',
  './assets/topic_02.svg',
  './assets/topic_03.svg',
  './assets/topic_04.svg',
  './assets/topic_05.svg',
  './assets/topic_06.svg',
  './assets/topic_07.svg',
  './assets/topic_08.svg',
  './assets/topic_09.svg',
  './assets/topic_10.svg',
  './assets/topic_11.svg',
  './assets/topic_12.svg',
  './assets/topic_13.svg',
  './assets/paper_crops/fig1_A_dispersion.webp',
  './assets/paper_crops/fig1_B_magnetic_separation.webp',
  './assets/paper_crops/fig1_C_probe_capture.webp',
  './assets/paper_crops/fig1_D_probe_removal.webp',
  './assets/paper_crops/fig1_E_flame_detection.webp',
  './assets/paper_crops/fig2_A_ftir.webp',
  './assets/paper_crops/fig2_B_zeta.webp',
  './assets/paper_crops/fig2_C_tga_all.webp',
  './assets/paper_crops/fig2_D_dtg_opp.webp',
  './assets/paper_crops/fig2_E_dtg_mopp.webp',
  './assets/paper_crops/fig2_F_dtg_fe3o4.webp',
  './assets/paper_crops/fig3_A_opp_tem.webp',
  './assets/paper_crops/fig3_B_mopp_tem.webp',
  './assets/paper_crops/fig3_C_fe3o4_tem.webp',
  './assets/paper_crops/fig3_D_opp_sem.webp',
  './assets/paper_crops/fig3_E_mopp_sem.webp',
  './assets/paper_crops/fig3_F_fe3o4_sem.webp'
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
