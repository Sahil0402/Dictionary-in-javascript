self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./index.html","./style.css","./app.js", "./dictionary_180.png","./dictionary_512.png","./circle-scatter-haikei.svg"]);
        })
    );
});

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );

});