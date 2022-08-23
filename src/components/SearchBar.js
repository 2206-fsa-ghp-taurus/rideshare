import React, {useState} from "react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};
const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const [listPlaces, setlistPlaces] = useState([]);
  const {selectPosition, setSelectPosition} = props;

const handleSubmit = (e) => {
    e.preventDefault()
    const params = {
        q: searchText,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      };
      const queryString = new URLSearchParams(params).toString();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(JSON.parse(result));
          setlistPlaces(JSON.parse(result));
        })
        .catch((err) => console.log("err: ", err));

}

const handleSelectPosition = (e) => {
    // setSearchText(e)
    setSelectPosition(e)
    // setlistPlaces([])

}

  console.log(searchText);
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div style={{display: "flex", flex: "row"}}>
      <label>From</label>
      <input type="text"
        placeholder="Where to?"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit"> Go
      </button>
      </div>
      </form>
      <div>
      <ul>
        {listPlaces.map((item) => (
            <li key={item.osm_id}>
              <div button="true" onClick={handleSelectPosition(item.display_name)}>{item.display_name}</div>
            </li>
          )
        )}
      </ul>
    </div>
</div>
  );
};

export default SearchBar