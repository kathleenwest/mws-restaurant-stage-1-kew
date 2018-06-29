# mws-restaurant-stage-1-kew
GRADER READ THIS FIRST
Responsive Images were designed for a DPR setting of 1.0. When testing under Google Chrome Tools make sure your DPR setting is set to 1.0.
-------------------------------------
Grader Comments
"There is whole lot of space left on bigger screens. You may want to take a look there."
-----
see https://github.com/kathleenwest/mws-restaurant-stage-1-kew/blob/master/testing/nowhitespace.jpg
It is shown from my image that the app and code adequately provides an auto-margin after 900px 
If you still have an issue with this, send a screen capture, and detailed instructions on how to re-create your observence.
---------
"Also, need to take care of horizontal scroll on restaurant page"

Check your browser settings or use the Google developer tools to verify. The restaurant page does not have scroll bar issues as observed using the google developer tools on the site. I attached some screen captures. If you still have an issue with this, send a screen capture, and detailed instructions on how to re-create your observence. 

https://github.com/kathleenwest/mws-restaurant-stage-1-kew/blob/master/testing/320pxwide.jpg
https://github.com/kathleenwest/mws-restaurant-stage-1-kew/blob/master/testing/524pxwide.jpg
-------------------------------------
Accessibility: Google Maps wis hidden the Accessibility Tree but I added the application role per guidance of my mentor. 
-------------------------------------
Service Worker Notes and Offline Capability: Works but there is a visible warning/error in the console log
--------------------------
Service Worker was verified to work offline and store/retrieve the cache properly
There is a known bug/issue with the service worker trying to store/retrieve the google maps api resources and neither my mentor or any other mobile web students or help on slack is able to help me with solutions to get rid of the warning that is visible only in the console log and only when the service worker is operating in offline mode. They say this should be ignored. Also, I have tried to catch this error/warning in every place in the code but it did not resolve the error/warning. There is no fix for this issue and it needs to be ignored in the grading rubric. 
---------------
Ignore this in the Console Log 
-----------------
The FetchEvent for "https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2F127.0.0.1%3A8000%2F&3sAIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&7s0l93yf&10e1&callback=_xdc_._61egs6&key=AIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&token=126029" resulted in a network error response: the promise was rejected.
Promise.catch (async)
(anonymous) @ sw.js:49
sw.js:1 Uncaught (in promise) TypeError: Failed to fetch
js?key=AIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&libraries=places&callback=initMap:65 GET https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2F127.0.0.1%3A8000%2F&3sAIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&7s0l93yf&10e1&callback=_xdc_._61egs6&key=AIzaSyAhXhPjZlCsSU-ByZO61Pw24Pg0-rBnB20&token=126029 0 ()
------------------
