import React, { useEffect } from 'react';
import { Marker, Popup, FeatureGroup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UseGeolocation } from './UseGeolocation';
import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';

export const UserMarker = () => {
  const map = useMap();

  const myIcon = L.icon({
    iconUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [20, 41],
    popupAnchor: [2, -40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const location = UseGeolocation();

  useEffect(() => {
    map.flyTo([location.coordinates.lat, location.coordinates.lng], 15);
  }, [location.coordinates.lat, location.coordinates.lng, map]);

  return (
    <div>
      {location.loaded && !location.error && (
        <FeatureGroup>
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={myIcon}>
            <Popup>
              You are here. <br />
            </Popup>
            <Circle
              center={[location.coordinates.lat, location.coordinates.lng]}
              radius={100}
            />
          </Marker>
        </FeatureGroup>
      )}
    </div>
  );
};
