import React, {useState} from "react";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";

const LocationDropOff = (props) => {
  const {dropOffAddress, setDropOffAddress} = props
  const {dropOffCoords, setDropOffCoords} = props

  const handleChange = (dropOffAddress) => {
    setDropOffAddress(dropOffAddress);
  };

  const handleSelect = (dropOffAddress) =>{
    setDropOffAddress(dropOffAddress);
    setCoords(dropOffAddress);
  }

  const setCoords = (address) =>{
    geocodeByAddress(address)
    .then((results) => getLatLng(results[0]))
    .then((coordinates) => {
        console.log("drop off latitude and longitude", coordinates.lat, coordinates.lng);
        setDropOffCoords((coordinates));
    })
  }

  return (
    <PlacesAutocomplete
      value={dropOffAddress}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Drop-Off point",
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

export default LocationDropOff;
