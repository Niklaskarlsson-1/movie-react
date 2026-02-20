const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v2";

const STATIC_FILES = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_FILES);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/movies")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((fetchRes) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    }),
  );
});
