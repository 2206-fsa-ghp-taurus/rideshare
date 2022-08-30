import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { useState } from 'react';
import { greenIcon } from './MarkerIcon'
import './UserMap.css';

const Routing = (props) => {

  const { pickUpCoords } = props;
  const { dropOffCoords } = props;
  const { userDistance, setUserDistance } = props;
  console.log('props for pickup', pickUpCoords);
  console.log('props for dropoff', dropOffCoords);

  const pickUpLat = props.pickUpCoords ? props.pickUpCoords.lat : null;
  const pickUpLng = props.pickUpCoords ? props.pickUpCoords.lng : null;
  const dropOffLat = props.dropOffCoords ? props.dropOffCoords.lat : null;
  const dropOffLng = props.dropOffCoords ? props.dropOffCoords.lng : null;
 

  const wayPoint1 = L.latLng(pickUpLat, pickUpLng);
  const wayPoint2 = L.latLng(dropOffLat, dropOffLng);

  const map = useMap();

  const routing = L.Routing.control({
    waypoints: [
      wayPoint1 ,
      wayPoint2 ,
    ],
    // router: L.Routing.mapbox(`${process.env.REACT_APP_MAP_BOX_API_KEY}`),
    createMarker: function (i,start, n) {
      return L.marker(start.latLng, { icon: greenIcon })
  }}).addTo(map);


  routing.on('routeselected', function (e) {
    const bounds = L.latLngBounds(wayPoint1, wayPoint2);
    map.fitBounds(bounds);
  });

  routing.on('routesfound', function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;
    console.log('summary', summary);
    setUserDistance(summary.totalDistance);
  });
  
  routing.hide();
  // routing.on('routeselected', function(e) {
  //   const coord = e.route.coordinates;
  //   setCoordsList(coord);

  //  console.log(coord)

  //  for(let i=0; i<coord.length; i++ ){
  //   if((Math.abs(coord[i].lat - 51.4994425) < 0.1) && (Math.abs(coord[i].lng - (-0.197512)) < 0.1)) {
  //     console.log("There are drivers going the same route.")
  //     return "Drivers found."
  //   } else {
  //     console.log("No drivers going the same route")
  //     return "No drivers today!"
  //   }
  //  }

  // })
};
export default Routing;
