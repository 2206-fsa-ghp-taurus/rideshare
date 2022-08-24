import React, {useState} from "react";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";

const LocationPickUp = (props) => {
  const [address, setAddress] = useState("");
  const {pickUpCoords, setPickUpCoords} = props

  const handleChange = (address) => {
    setAddress(address);
  };

  // const handleSelect = (address) => {
  //   geocodeByAddress(address)
  //     .then((results) => getLatLng(results[0]))
  //     .then(({lat, lng}) => {
  //     console.log("latitude and longitude")
  //     setPickUpCoords({lat, lng})
  //    });
  // };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={()=>{geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((coordinates) => {
            console.log("pick up latitude and longitude", coordinates.lat, coordinates.lng);
            setPickUpCoords((coordinates));
      })}}
    >
      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Pick-Up point",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              return (
                <div
                  {...getSuggestionItemProps(suggestion)}
                  className="suggestion-item--active"
                  style={{backgroundColor: "light-grey", cursor: "pointer"}}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationPickUp;
