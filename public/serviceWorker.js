const CACHE_NAME = "version-1";
const urlsToChache = ["index.html", "offline.html", "./static/js/main.chunk.js",
  "./css/main.css", "./css/spacing.min.css", "./static/js/0.chunk.js"];

const self = this;

// Install sw
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToChache);
    })
  );
});

// listen for cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// activate the sw
self.addEventListener("activate", (event) => {
  const cachesWhiteList = [];
  cachesWhiteList.push("version-1");

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cachesWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
