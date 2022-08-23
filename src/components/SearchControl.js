import { useEffect} from "react";
//import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
//import "react-leaflet-geosearch/node_modules/leaflet-geosearch/assets/css/leaflet.css";
import L from 'leaflet'

const SearchControl = (props) => {
//   const map = useMap();
 
  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      ...props
    });
    // props.map.addControl(searchControl);
    
    
    document.getElementById("geosearch").appendChild(searchControl.onAdd(props.map))
    document.getElementById("geosearch").appendChild(searchControl.onAdd(props.map))
    // const results = L.layerGroup().addTo(props.map);

    // props.map.on("results", function (data) {
    //   console.log(data.results)
    //   results.clearLayers();
    //   for (let i = data.results.length - 1; i >= 0; i--) {
    //     results.addLayer(L.marker(data.results[i].latlng));
    //   }
    // })
    
    function searchEventHandler(result) {
      console.log(result.location);
    }
    props.map.on('geosearch/showlocation', searchEventHandler);

    return () => props.map.removeControl(searchControl);

  },[props]);

  return null;
};
export default SearchControl;