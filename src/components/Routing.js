import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

//


const Routing = (props) => {
  
    // const {pickUpCoords} = props
    // const {dropOffCoords} = props
    // console.log('props', props.pickUpCoords)

  const map = useMap();
  const routing = L.Routing.control({
    waypoints: [L.latLng(29.788800, -95.378350), L.latLng(29.799720, -95.387878)],
    router: L.Routing.mapbox('sk.eyJ1Ijoia2xldmluZTg4IiwiYSI6ImNsNzUxeDVoeTFuazUzcG1xb3ZuOGd3aXcifQ.gTCOe2GB8DcStiCKcoowJw'),
  // your other options go here
    }).addTo(map)
}

export default Routing;
