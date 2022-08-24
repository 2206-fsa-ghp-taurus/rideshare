// import React, {useEffect, useState} from "react";

// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
// const params = {
//   q: "",
//   format: "json",
//   addressdetails: "addressdetails",
// };
// const SearchBar = (props) => {
//   const [searchText, setSearchText] = useState("");
//   const [listPlaces, setlistPlaces] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const {selectPosition, setSelectPosition} = props;

// useEffect(() => {
//     const params = {
//         q: searchText,
//         format: "json",
//         addressdetails: 1,
//         countrycodes: "gb",
//         polygon_geojson: 0,
//       };
//       const queryString = new URLSearchParams(params).toString();
//       const requestOptions = {
//         method: "GET",
//         redirect: "follow",
//       };
//       fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
//         .then((response) => response.text())
//         .then((result) => {
//           console.log(JSON.parse(result));
//           setlistPlaces(JSON.parse(result));
//         })
//         .catch((err) => console.log("err: ", err));
//     })

// const handleSelectPosition = (e) => {
//     // setSelectPosition(e)
//     setSearchText(e)
//     setSuggestions([])

// }

// const changeHandler = (text) => {
//     let matches = []
//     if(text.length > 0) {
//         matches = listPlaces.filter(place => {
//             if(text === place.address.road) {
//                 const regex = new RegExp(`${text}`, "gi")
//                 return place.display_name.match(regex)
//             }
//         })
//     }
//     setSuggestions(matches)
//     setSearchText(text)
// }

//   console.log(searchText);
//   return (
//     <div>
//       <div style={{display: "flex", flex: "row"}}>
//       <label>From</label>
//       <input style={{border: "1px solid black"}}
//         type="text"
//         placeholder="Where to?"
//         value={searchText}
//         onChange={(e) => changeHandler(e.target.value)}
//         onBlur={(() => {
//             setSuggestions([])
//         }, 100)}
//       />
//       <button type="submit"> Go
//       </button>
//       </div>
//       <div>
//       <ul>
//         {suggestions && suggestions.map((item) => (
//             <li key={item.osm_id}>
//               <div onClick={handleSelectPosition(item.display_name)}>{item.display_name}</div>
//             </li>
//           )
//         )}
//       </ul>
//     </div>
// </div>
//   );
// };

// export default SearchBar

