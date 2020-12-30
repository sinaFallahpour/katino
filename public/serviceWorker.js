// var CACHE_STATIC_NAME = "static-v2";
// var CACHE_DYNAMIC_NAME = "dynamic-v2";

// const urlsToChache = [
//   "/",
//   "./index.html",
//   "./css/main.css",
//   "./css/spacing.min.css",
//   "./static/js/main.ef6d7cd0.chunk.js",
//   "./static/js/2.26da0ab9.chunk.js",
//   "./static/js/runtime-main.7f7134f8.js",
// ];
// const self = this;

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME).then((cache) => {
//       return cache.addAll(urlsToChache);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   const cachesWhiteList = [];
//   cachesWhiteList.push("static-v2");
//   cachesWhiteList.push("dynamic-v2");

//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cachesWhiteList.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//       return fetch(event.request).then((res) => {
//         cache.put(event.request, res.clone());
//         return res;
//       });
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then((res) => {
//             return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//               cache.put(event.request.url, res.clone());
//               return res;
//             });
//           })
//           .catch(() => {});
//       }
//     })
//   );
// });
