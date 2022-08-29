import "./UserMap.css";
import {MapContainer, TileLayer} from "react-leaflet";
import React, {useState, useEffect, useRef} from "react";
import L from "leaflet";
import {UserMarker} from "./UserMarker";
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import LocationPickUp from "./LocationPickUp";
import LocationDropOff from "./LocationDropOff";
import {Link} from "react-router-dom";
import {useAuth} from "../auth";
import {db} from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import {useHistory} from "react-router-dom";
import { UseGeolocation } from './UseGeolocation';
import {useMap} from "react-leaflet";
import "leaflet.locatecontrol"
import "leaflet.locatecontrol/dist/L.Control.Locate.css"

const UserMap = (props) => {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const [pickUpCoords, setPickUpCoords] = useState({});
  const [dropOffCoords, setDropOffCoords] = useState({});
  const [driverButtonText, setDriverButtonText] = useState(
    "Confirm to Be Driver"
  );
  const {isDriver} = props;
  const {userDistance, setUserDistance} = props
  const [disable, setDisable] = useState(false);
  const {userId} = useAuth();
  const history = useHistory();
  const location = UseGeolocation();
  const mapRef = useRef()
  

  useEffect(() => setDriverButtonText("Confirmed"), []);


  const beDriver = (e) => {
    addDoc(collection(db, "Rides"), {
      // on the Rides table
      driverId: userId,
      timestamp: serverTimestamp(),
      driverPickUp: pickUpCoords, // may be overwriitten by rides detail later
      driverDropOff: dropOffCoords,
      // no status information yet.
    });
    setDisable(true);
  };

  const findDriver = () => {
    // temporarly put on user table, can delete after ride is complete
    console.log("userDistance", userDistance)
    updateDoc(doc(db, "Users", userId), {
      pickUp: pickUpCoords,
      dropOff: dropOffCoords,
      distanceTravelled: userDistance,
    });
  };

  const locateMe = () => {
  //   const map = useMap()
   
  //  L.control.locate().addTo(map);
  //  map.layerscontrol.removeFrom(map)

     mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng])
  }


  // const rideComplete = () => {
  //   setDisable(false);
  //   setDriverButtonText("Confirm to Be Driver");
  // };

  return (
    <div>
      <div className="container">
        <MapContainer ref={mapRef} center={position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UserMarker />
          <Routing pickUpCoords={pickUpCoords} dropOffCoords={dropOffCoords} setUserDistance={setUserDistance}/>
          {/* <LocateMe /> */}
          <div>
      </div>
        </MapContainer>
      </div>
      <div>
      (<button class="btn btn-xs" onClick={locateMe}>Locate Me</button>)
      </div>
      <div>
        <LocationPickUp
          pickUpCoords={pickUpCoords}
          setPickUpCoords={setPickUpCoords}
        />
        <LocationDropOff
          dropOffCoords={dropOffCoords}
          setDropOffCoords={setDropOffCoords}
        />
      </div>
      {isDriver ? (
        <div>
          <button
            className="btn rounded-full"
            disabled={disable}
            onClick={beDriver}
          >
            {driverButtonText}
          </button>
          {/* <button onClick={rideComplete}>Ride Complete</button> */}
          <Link to="/riderequestlist">
            <button>See Requested Rides</button>
          </Link>
        </div>
      ) : (
        <Link to="/driverlist">
          {" "}
          <button className="btn rounded-full" onClick={findDriver}>
            Find Drivers
          </button>
        </Link>
      )}
    </div>
  );
};

export default UserMap;
