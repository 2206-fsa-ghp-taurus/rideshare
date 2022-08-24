import React, {useState} from "react";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";

const LocationDropOff = () => {
  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({lat, lng}) => console.log("latitude and longitude", {lat, lng}));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect(address)}
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
              // const className = suggestion.active
              //   ? "suggestion-item--active"
              //   : "suggestion-item";
              // // inline style for demonstration purpose
              // const style = suggestion.active
              //   ? {backgroundColor: "#fafafa", cursor: "pointer"}
              //   : {backgroundColor: "#ffffff", cursor: "pointer"};
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
