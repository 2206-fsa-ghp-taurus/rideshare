import React, {useEffect, useState} from "react";

export const UseGeolocation = () => {

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
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
;
  }, []);

    return location;
}
