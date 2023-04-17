// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
// const CACHE_NAME = 'pwa-cache';

// const cacheContent = [
//   // CSS
//   '/css/index.css',
//   '/css/style.css',
//   '/css/Login.css',
//   '/css/diary.css',
//   '/css/nav.css',

//   // JavaScript
//   '/js/chart.js',
//   '/js/login.js',
//   '/js/nav.js',

// ];
// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('install', async (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => cache.addAll(cacheContent))
//   );
// });

// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }

// workbox.routing.registerRoute(
//   new RegExp('/*'),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: CACHE_NAME
//   })
// );

// self.addEventListener('fetch', (event) => {
//   if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         const preloadResp = await event.preloadResponse;

//         if (preloadResp) {
//           return preloadResp;
//         }

//         const networkResp = await fetch(event.request);
//         return networkResp;
//       } catch (error) {

//         const cache = await caches.open(CACHE_NAME);
//         const cachedResp = await cache.match(offlineFallbackPage);
//         return cachedResp;
//       }
//     })());
//   }
// });





//               self.addEventListener("activate", (e) => {
//                 e.waitUntil(
//                   caches.keys().then((keyList) => {
//                     return Promise.all(
//                       keyList.map((key) => {
//                         if (key === CACHE_NAME) {
//                           return;
//                         }
//                         return caches.delete(key);
//                       })
//                     );
//                   })
//                 );
//               });

//               self.addEventListener("fetch", (e) => {
//                 e.respondWith(
//                   (async () => {
//                     const r = await caches.match(e.request);
//                     console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
//                     if (r) {
//                       return r;
//                     }
//                     const response = await fetch(e.request);
//                     const cache = await caches.open(CACHE_NAME);
//                     console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//                     cache.put(e.request, response.clone());
//                     return response;
//                   })()
//                 );
//               });

//               self.addEventListener('message', (event) => {
//                 if (event.data === 'skipWaiting') self.skipWaiting()
//             })
            
// self.addEventListener('install', async e => {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(staticAssets);
//   return self.skipWaiting();
// });

// self.addEventListener('activate', e => {
//   self.clients.claim();
// });

// self.addEventListener('fetch', async e => {
//   const req = e.request;
//   const url = new URL(req.url);

//   if (url.origin === location.origin) {
//     e.respondWith(cacheFirst(req));
//   } else {
//     e.respondWith(networkAndCache(req));
//   }
// });

// async function cacheFirst(req) {
//   const cache = await caches.open(cacheName);
//   const cached = await cache.match(req);
//   return cached || fetch(req);
// }

// async function networkAndCache(req) {
//   const cache = await caches.open(cacheName);
//   try {
//     const fresh = await fetch(req);
//     await cache.put(req, fresh.clone());
//     return fresh;
//   } catch (e) {
//     const cached = await cache.match(req);
//     return cached;
//   }
// }
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