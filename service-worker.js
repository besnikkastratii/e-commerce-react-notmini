const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/context.js",
  "/data.js",
  "http://besnikkastrati.netlify.app"
  // Add more URLs to cache as needed
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Serve cached response if available
     console.log(response) }
      return fetch(event.request);
      console.log(response) // Otherwise, fetch from the network
    })
  );
});
