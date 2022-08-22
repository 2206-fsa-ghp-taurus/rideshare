import "./userMap.css";
import {MapContainer, TileLayer} from "react-leaflet";
import L from "leaflet";
import React, {useState, useEffect} from "react";
import {UserMarker} from "./userMarker";
import SearchControl from "./geoSearch";
import "leaflet/dist/leaflet.css";
import {OpenStreetMapProvider} from "react-leaflet-geosearch";
// import "react-leaflet-geosearch/node_modules/leaflet-geosearch/assets/css/leaflet.css";
//import * as ELG from "esri-leaflet-geocoder";
import {useGeoLocation} from "../hooks/useGeoLocation";


const UserMap = () => {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const prov = OpenStreetMapProvider();

  const [map, setMap] = useState(null);
  // const location = useGeoLocation();

  // useEffect(() => {
  //   setPosition({ 
  //     lat: location.coordinates.lat, lng: location.coordinates.lng
  //   });
  // }, [location.coordinates.lat, location.coordinates.lng]);


 
  return (
    <div>
      <div className="container">
        <MapContainer ref={setMap} center={position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UserMarker />
        </MapContainer>
      </div>
      <div id="controlBar">{map ? <SearchControl container="controlBar" map={map} provider={prov} /> : null}</div>
    </div>
  );
};

export default UserMap;