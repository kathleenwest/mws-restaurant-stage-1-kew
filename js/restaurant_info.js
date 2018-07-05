let restaurant;
var newMap;
/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {  
  initMap();
});   

/**
 * Initialize leaflet map
 */
initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {      
      self.newMap = L.map('map', {
        center: [restaurant.latlng.lat, restaurant.latlng.lng],
        zoom: 16,
        scrollWheelZoom: false
      });
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
        mapboxToken: 'pk.eyJ1Ijoia2F0aGxlZW53ZXN0IiwiYSI6ImNqajd0amcwcTBlYjczd3AyOGgyOHpnNHgifQ.L_077kPDw_UJUNMvztc83Q',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'    
      }).addTo(newMap);
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
}  
 
/* window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
} */

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {

  /******************* Restaurant Name ***************************/
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  /****************** Restaurant Address **************************/
  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  var aria_label = document.getElementById('address_label');
  aria_label.innerHTML = "Address: " + restaurant.address;
        
  /***************Restaurant Image *****************************/
  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  var imgurlbase = DBHelper.imageUrlForRestaurant(restaurant);
  var length_image = imgurlbase.length;
  imgurlbase = imgurlbase.substring(0, length_image-4);
  const imgurl1x = imgurlbase + "_320.jpg";
  const imgurl2x = imgurlbase + "_503.jpg";
  const imgurl3x = imgurlbase + "_900.jpg";
  image.src = imgurl1x;
  image.srcset = `${imgurl1x} 320w, ${imgurl2x} 503w, ${imgurl3x} 900w`;
  image.sizes = `(max-width: 320px) 320px, (max-width: 503px) 503px, 900px`;
  image.alt = restaurant.name + " restaurant marketing photograph";	

  /************** Restaruant Cusine ***************************/
  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;
  var aria_label = document.getElementById('cuisine_label');
  aria_label.innerHTML = "Cuisine: " + restaurant.cuisine_type;
  
  /************* Restaurant Hours ****************************/
  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }

  /************* Restaurant Reviews **************************/
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    // Create Attitube for Tab Index on Row Only
    var label_tabindex = document.createAttribute("tabindex");       
    label_tabindex.value = 0;
    // Set the attirubte to the row
    row.setAttributeNode(label_tabindex);

    // Aria Labelled By
    var label_attribute = document.createAttribute("aria-labelledby");    
    label_attribute.value = key + "_label";                          
    row.setAttributeNode(label_attribute); 
    
    // Day
    const day = document.createElement('td');
    day.innerHTML = key;                          
    row.appendChild(day);

    // Hours            
    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);
    hours.appendChild(row);

    // Aria Label for Row That Speaks Day + Hours
    var aria_label = document.createElement('label');
    aria_label.id = key + "_label";
    aria_label.className = "aria-label";
    aria_label.innerHTML = key + operatingHours[key];
      
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
 
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));      
  });

  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {

  // Set Review ID to the Next Random Number
  var randomNumberBetween0and19999 = Math.floor(Math.random() * 20000);
  var review_id = randomNumberBetween0and19999;
  
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  // Add Tab Index for the List Element
  var label_tabindex = document.createAttribute("tabindex");       
  label_tabindex.value = 0;
  // Set the attirubte to the row
  li.setAttributeNode(label_tabindex);

  // Add Aria LabelledBy Attribute for Review
  var label_attribute = document.createAttribute("aria-labelledby");    
  label_attribute.value = review_id + "_label";                         
  li.setAttributeNode(label_attribute); 

  // Add Aria Label for Single Review
  var aria_label = document.createElement('label');
  aria_label.id = review_id + "_label";
  aria_label.className = "aria-label";
  aria_label.innerHTML = "Rating " + review.rating + " stars. Date " + review.date + ". Reviewed By " + review.name + ". Comments: " + review.comments;

  li.appendChild(aria_label);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  const a = document.createElement("a");
  a.href = window.location; 
  a.innerHTML = restaurant.name;
  a.setAttribute("aria-current", "page");
  li.appendChild(a);
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
