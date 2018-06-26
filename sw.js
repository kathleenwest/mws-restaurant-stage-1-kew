// Define the Caches
var staticCacheName = 'mws-restaurant-static-v1';
var contentImgsCache = 'mws-restaurant-content-imgs';
var allCaches = [staticCacheName, contentImgsCache];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      'index.html',
      'restaurant.html',
      '/css/main.css',
      '/css/responsive.css',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/js/register.js',
      '//normalize-css.googlecode.com/svn/trunk/normalize.css',
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500'
    ])
      .catch(error => {
        console.log("Opening Cache Failed: " + error + " May need to Reload");
      });
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-restaurant-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => cachedResponse || fetch(event.request)));
 });

/* Tried to do the skeleton thingie and failed
self.addEventListener('fetch', function(event) {
    //Respond to requests for the root page with the page skeleton from the cache
    var requestUrl = new URL(event.request.url);
  
    //Only intercept requests from the same origin (i.e. Don't intercept Google Fonts requests, or any third party request like that)
    if (requestUrl.origin === location.origin) {
      //Check if the request is for the root page
      if (requestUrl.pathname === '/') {
        //Respond with the cached skeleton, which will be there as it is now cached as part of the install step
        event.respondWith(caches.match('/skeleton'));
        return;
      }
      if (requestUrl.pathname.startsWith('/img/')) {
        event.respondWith(servePhoto(event.request));
        return;
      }
    }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
*/

function servePhoto(request) {
  var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}


 
