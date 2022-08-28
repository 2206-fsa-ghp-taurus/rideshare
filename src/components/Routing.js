import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import {useMap} from "react-leaflet";
import {useState} from "react";

//

const Routing = (props) => {
  //  const [pickUpCoords, setPickUpCoords] = useState({});
  //  const [dropOffCoords, setDropOffCoords] = useState ({})
  const {pickUpCoords} = props;
  const {dropOffCoords} = props;
  const {userDistance, setUserDistance} = props
  console.log("props for pickup", pickUpCoords);
  console.log("props for dropoff", dropOffCoords);

  const pickUpLat = props.pickUpCoords ? props.pickUpCoords.lat : null;
  const pickUpLng = props.pickUpCoords ? props.pickUpCoords.lng : null;
  const dropOffLat = props.dropOffCoords ? props.dropOffCoords.lat : null;
  const dropOffLng = props.dropOffCoords ? props.dropOffCoords.lng : null;

  const map = useMap();
  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  const routing = L.Routing.control({
    waypoints: [
      L.latLng(pickUpLat, pickUpLng),
      L.latLng(dropOffLat, dropOffLng),
    ],
    router: L.Routing.mapbox(
      "sk.eyJ1Ijoia2xldmluZTg4IiwiYSI6ImNsNzUxeDVoeTFuazUzcG1xb3ZuOGd3aXcifQ.gTCOe2GB8DcStiCKcoowJw"
    ),
    createMarker: function (i, start, n){ 
      //for (i = 0; waypoint.length; i++){
      return L.marker (start.latLng, { icon: greenIcon }).bindPopup("start").openPopup();
    }
    
   
  }).addTo(map);
  
  routing.on('routeselected', function(e) {
  const wayPoint1 = L.latLng(pickUpLat, pickUpLng);
  const wayPoint2 = L.latLng(dropOffLat, dropOffLng);
  const bounds = L.latLngBounds(wayPoint1, wayPoint2);
  map.fitBounds(bounds);
  })

  routing.on("routesfound", function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;
    console.log("summary", summary);
    setUserDistance(summary.totalDistance)
  });

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


