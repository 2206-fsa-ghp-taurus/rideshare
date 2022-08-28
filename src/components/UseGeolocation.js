import React, {useEffect, useState, useRef} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet"

export const UseGeolocation = () => {

  const map = useMap();
  
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {lat: "", lng: ""},
    accuracy: ""
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      accuracy: location.coords.accuracy
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    //check if browser supports the geolocation api
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    setInterval(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, 2000);
  }, []);

    return location;
}
