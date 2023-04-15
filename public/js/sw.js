const cacheName = 'newyey';
const staticAssets = ([
                '/',
                '/css/index.css',
                '/css/style.css',
                '/css/Login.css',
                '/css/diary.css',
                '/css/nav.css',
                '/css/loader.css',
                '/js/chart.js',
                '/js/diary.js',
                '/js/loader.js',
                '/js/login.js',
                '/js/nav.js',
                '/js/serialize.js',
                '/js/signup.js',
                '/login.hbs',
                '/home.hbs',
                '/main.hbs',
                '/_header_login.hbs',
                '/_header_stories.hbs',
                '/_header.hbs',
                '/chart.hbs',
                '/loading.hbs',
                '/profiili.hbs',
                '/verensokeriAdd.hbs',
                '/verensokeriarvot.hbs',
              ]);

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
// // Install event listener
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('my-cache')
//         .then((cache) => {
//           return cache.addAll([
//             '/',
//             '/css/index.css',
//             '/css/style.css',
//             '/css/Login.css',
//             '/css/diary.css',
//             '/css/nav.css',
//             '/css/loader.css',
//             '/js/chart.js',
//             '/js/diary.js',
//             '/js/loader.js',
//             '/js/login.js',
//             '/js/nav.js',
//             '/js/serialize.js',
//             '/js/signup.js',
//             '/login.hbs',
//             '/home.hbs',
//             '/main.hbs',
//             '/_header_login.hbs',
//             '/_header_stories.hbs',
//             '/_header.hbs',
//             '/chart.hbs',
//             '/loading.hbs',
//             '/profiili.hbs',
//             '/verensokeriAdd.hbs',
//             '/verensokeriarvot.hbs',
//           ]);
//         })
//     );
//   });
  
//   // Fetch event listener
//   self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request)
//         .then((response) => {
//           return response || fetch(event.request);
//         })
//     );
//   });
  
//   // Push event listener
//   self.addEventListener('push', (event) => {
//     const data = event.data.json();
//     self.registration.showNotification(data.title, {
//       body: data.message,
//       icon: '/kuvat/blood-drop128.png'
//     });
//   });