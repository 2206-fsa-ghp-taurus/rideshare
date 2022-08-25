import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useState } from "react";

//


const Routing = (props) => {
  //  const [pickUpCoords, setPickUpCoords] = useState({});
  //  const [dropOffCoords, setDropOffCoords] = useState ({})
    const {pickUpCoords} = props
    const {dropOffCoords} = props
    console.log('props for pickup', pickUpCoords)
    console.log('props for dropoff', dropOffCoords)

    const pickUpLat = props.pickUpCoords ? props.pickUpCoords.lat : null; 
    const pickUpLng = props.pickUpCoords ? props.pickUpCoords.lng : null; 
    const dropOffLat = props.dropOffCoords ? props.dropOffCoords.lat : null; 
    const dropOffLng = props.dropOffCoords ? props.dropOffCoords.lng : null; 


  const map = useMap();
  const routing = L.Routing.control({
    waypoints: [L.latLng(pickUpLat, pickUpLng), L.latLng( dropOffLat, dropOffLng)],
    router: L.Routing.mapbox('sk.eyJ1Ijoia2xldmluZTg4IiwiYSI6ImNsNzUxeDVoeTFuazUzcG1xb3ZuOGd3aXcifQ.gTCOe2GB8DcStiCKcoowJw'),
  // your other options go here
    }).addTo(map)

    routing.on('routeselected', function(e) {
      const coord = e.route.coordinates;
    
     console.log(coord)
  
     for(let i=0; i<coord.length; i++ ){
      if((Math.abs(coord[i].lat - 51.4994425) < 0.1) && (Math.abs(coord[i].lng - (-0.197512)) < 0.1)) {
        console.log("There are drivers going the same route.") 
        return "Drivers found."
      } else {
        console.log("No drivers going the same route")
        return "No drivers today!"
      }
     } 
     
})
    routing.on('routesfound', function(e) {
      const routes = e.routes;
      const summary =  routes[0].summary
      console.log("summary", summary)

  
  });

}

export default Routing;

// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
	// Sets a map view that contains the given geographical bounds with the
	// maximum zoom level possible.

	// fitBounds: function (bounds, options) {

	// 	bounds = toLatLngBounds(bounds);

	// 	if (!bounds.isValid()) {
	// 		throw new Error('Bounds are not valid.');
	// 	}

// catch resulting routes when they are returned to the control for example, you should listen to the routesfound event.
//   routeControl.on('routesfound', function(e) {
//     var routes = e.routes;
//     [...]
// });
