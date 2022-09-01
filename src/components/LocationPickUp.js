import React, {useState} from "react";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";

const LocationPickUp = (props) => {
  const {pickUpAddress, setPickUpAddress} = props
  const {pickUpCoords, setPickUpCoords} = props

  const handleChange = (pickUpAddress) => {
    setPickUpAddress(pickUpAddress);
    
  };

  const handleSelect = (pickUpAddress) =>{
    setPickUpAddress(pickUpAddress);
    setCoords(pickUpAddress);
  }

  const setCoords = (address) =>{
    geocodeByAddress(address)
    .then((results) => getLatLng(results[0]))
    .then((coordinates) => {
        console.log("drop off latitude and longitude", coordinates.lat, coordinates.lng);
        setPickUpCoords((coordinates));
    })
  }
  
  return (
    <PlacesAutocomplete
      value={pickUpAddress}
      onChange={handleChange}
      onSelect={handleSelect}
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

