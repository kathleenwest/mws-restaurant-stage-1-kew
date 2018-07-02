# mws-restaurant-stage-1-kew
-----------------------------
Responsive Images were designed for a DPR setting of 1.0. When testing under Google Chrome Tools make sure your DPR setting is set to 1.0.
-------------------------------------
Accessibility: Google Maps was hidden the Accessibility Tree but I added the application role per guidance of my mentor. 
-------------------------------------
Service Worker Notes and Offline Capability: Works but there is a visible warning/error in the console log
--------------------------
Service Worker was verified to work offline and store/retrieve the cache properly
There is a known bug/issue with the service worker trying to store/retrieve the google maps api resources and neither my mentor or any other mobile web students or help on slack is able to help me with solutions to get rid of the warning that is visible only in the console log and only when the service worker is operating in offline mode. They say this should be ignored. Also, I have tried to catch this error/warning in every place in the code but it did not resolve the error/warning. There is currently no fix for this issue. 
---------------
Ignore this in the Console Log 
-----------------
The FetchEvent for "https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2F127.0.0.1%3A8000%2F&3sAIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&7s0l93yf&10e1&callback=_xdc_._61egs6&key=AIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&token=126029" resulted in a network error response: the promise was rejected.
Promise.catch (async)
(anonymous) @ sw.js:49
sw.js:1 Uncaught (in promise) TypeError: Failed to fetch
js?key=AIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&libraries=places&callback=initMap:65 GET https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2F127.0.0.1%3A8000%2F&3sAIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&7s0l93yf&10e1&callback=_xdc_._61egs6&key=AIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&token=126029 0 ()
------------------
