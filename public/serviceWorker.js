var CACHE_STATIC_NAME = "static-v3";
var CACHE_DYNAMIC_NAME = "dynamic-v3";
const urlsToChache = [
  "/",
  "./index.html",
  "./css/main.css",
  "./css/main.css.map",
  "./css/spacing.min.css",
  "./static/js/2.1b3fa684.chunk.js.map",
  "./static/js/2.1b3fa684.chunk.js",
  "./static/js/main.b19c69c7.chunk.js",
  "./static/js/main.b19c69c7.chunk.js.map",
  "./static/js/runtime-main.7f7134f8.js",
  "./static/js/runtime-main.7f7134f8.js.map",
];
const self = this;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      return cache.addAll(urlsToChache);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cachesWhiteList = [];
  cachesWhiteList.push("static-v2");
  cachesWhiteList.push("dynamic-v2");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cachesWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

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

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) {
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener("fetch", function (event) {
  var url = "/";
  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
        return fetch(event.request).then(function (res) {
          cache.put(event.request, res.clone());
          return res;
        });
      })
    );
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(caches.match(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(function (err) {
              return caches.open(CACHE_STATIC_NAME).then(function (cache) {
                if (event.request.headers.get("accept").includes("text/html")) {
                  return cache.match("/offline.html");
                }
              });
            });
        }
      })
    );
  }
});
