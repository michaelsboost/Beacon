// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst } = workbox.strategies;
const { clientsClaim, skipWaiting } = workbox.core;

const cacheName = 'Beacon-cache-v1.0.6';  // Change version number when you update

// Activate new service worker immediately and claim clients
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Forces new SW to take control immediately
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log(`Deleting old cache: ${cache}`);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    clientsClaim(); // Forces all open clients to be controlled by new SW
});

// Cache strategy for assets
registerRoute(
    ({ request }) => ['script', 'style', 'document', 'image', 'font', 'audio', 'video'].includes(request.destination),
    new CacheFirst({
        cacheName: cacheName,
    })
);

// Update checking for `version.json`
registerRoute(
    ({ url }) => url.pathname.endsWith('/version.json'),
    new NetworkFirst({
        cacheName: 'version-cache',
        networkTimeoutSeconds: 3,
    })
);
