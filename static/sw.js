importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js",
);

workbox.precaching.precacheAndRoute([
  { url: /^\//, revision: "A" },
]);

workbox.routing.registerRoute(/^\//, new workbox.strategies.NetworkFirst());
