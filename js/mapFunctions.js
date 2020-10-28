
//https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey={YOUR_API_KEY}&query=Pariser+1+Berl&beginHighlight=<b>&endHighlight=</b>
var platform = new H.service.Platform({
    'apikey': window.hereCreds.JSKEY
  });
  
  // Retrieve the target element for the map:
  var targetElement = document.getElementById('mapContainer');
  var defaultLayers = platform.createDefaultLayers();
  
  // Obtain the default map types from the platform object:
  var myPosition = { lat: -25.428653, lng: -49.267379 } //-25.428653, -49.267379 curitiba
  
  
  // Instantiate (and display) a map object:
  var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 2,
      center: myPosition
    });
  
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  // Enable the event system on the map instance:
  var mapEvents = new H.mapevents.MapEvents(map);
  // Initialize for map behaviour on events
  var behavior = new H.mapevents.Behavior(mapEvents);
  
  
  map.addEventListener('tap', ((evt) => {
    // Log 'tap' and 'mouse' events:
    //console.log(evt); 
    let pointer = evt.currentPointer;
    console.log(map.screenToGeo(pointer.viewportX, pointer.viewportY));
  }));
  
  // Define a callback function to process the routing response:
  var onResult = function (result) {
    // ensure that at least one route was found
    let totalLength, totalDuration, priceRoute;
  
    if (result.routes.length) {
      totalLength = 0;
      totalDuration = 0;
      priceRoute = 0;
      result.routes[0].sections.forEach((section) => {
        // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
  
        // Create a polyline to display the route:
        let routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: 'orangered', lineWidth: 3 }
        });
  
        // Create a marker for the start point:
        let startMarker = new H.map.Marker(section.departure.place.location);
  
        // Create a marker for the end point:
        let endMarker = new H.map.Marker(section.arrival.place.location);
  
        totalLength += (section.summary.length) / 1000;
        totalDuration += section.summary.duration;
        console.log(section.summary.duration)
  
        // Add the route polyline and the two markers to the map:
  
        map.addObjects([routeLine, startMarker, endMarker]);
  
        // Set the map's viewport to make the whole route visible:
        map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
  
      });
  
  
    }
    calculatePriceRoute(totalDuration, totalLength, priceRoute);
  };
  
  const calculatePriceRoute = (totalDuration, totalLength, priceRoute) => {
  
    let hoursDuration = 0, minutesDuration = 0;
    let  price1km = 5, price6km = 10, price10km = 15, price13km = 18, price15km = 20, priceKm = 1.30;
  
      totalDuration = totalDuration / 60;
      document.querySelector('#durationRoute').value = totalDuration.toFixed(0);
      
    if (totalLength <= 1) {
      document.querySelector('#priceRoute').value = price1km.toFixed(2);
    } else if (totalLength <= 6) {
      priceRoute = price6km;
      document.querySelector('#priceRoute').value = price6km.toFixed(2);
    } else if (totalLength > 6 && totalLength <= 10) {
      priceRoute = price10km;
      document.querySelector('#priceRoute').value = price10km.toFixed(2);
    } else if (totalLength > 10 && totalLength <= 13) {
      priceRoute = price13km;
      document.querySelector('#priceRoute').value = price13km.toFixed(2);
    } else if (totalLength > 13 && totalLength <= 15) {
      priceRoute = price15km;
      document.querySelector('#priceRoute').value = price15km.toFixed(2);
    } else {
      priceRoute = priceKm * totalLength;
      document.querySelector('#priceRoute').value = priceRoute.toFixed(2);
    }
    // lengthRoute = totalLength.toFixed(1);
    totalLength = parseFloat(totalLength);
    document.querySelector('#lengthRoute').value = totalLength.toFixed(2);
    let teste = document.querySelector('#lengthRoute');
    console.log(teste.value)
    console.log(typeof minutesDuration, minutesDuration);
    console.log(typeof totalLength, totalLength)
    console.log(typeof priceRoute, priceRoute);
    console.log(document.querySelector('#lengthRoute').value)
  }
  
  const calculateReturnPrice = returnKey => {
    let priceReturn = 0;  
    
    if (returnKey == true) {
      priceRoute = document.querySelector('#priceRoute').value;
      priceRoute = parseFloat(priceRoute);
      priceReturn = priceRoute * 0.50;
      priceRoute = priceReturn + priceRoute;
      document.querySelector('#priceRoute').value = priceRoute.toFixed(2);    
    } else {
      priceRoute = parseFloat(priceRoute);
      setPositions();
      priceRoute = priceRoute - priceReturn;
      document.querySelector('#priceRoute').value = priceRoute.toFixed(2);
    }
  }
  
  // Get an instance of the routing service version 8:
  var router = platform.getRoutingService(null, 8);
  
  // Call calculateRoute() with the routing parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  // router.calculateRoute(routingParameters, onResult,
  //   function(error) {
  //     console.log(error.message);
  //   });
  
  const setPositions = () => {
    // Create the parameters for the routing request:
   
    var routingParameters = {}
  
    routingParameters = {
      'routingMode': 'short',
      'transportMode': 'car',
      // The start point of the route:
      'origin': `${waypoint0Lat},${waypoint0Lng}`,
      // The end point of the route:
      'destination': `${waypoint1Lat},${waypoint1Lng}`,
      // Include the route shape in the response
      'return': 'polyline,summary',
      'departure': 'now',
    };
    router.calculateRoute(routingParameters, onResult,
      function (error) {
        console.log(error.message);
      });
  
  }
  
  
  