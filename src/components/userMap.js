import './userMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';
import { UserMarker } from './UserMarker';
import 'leaflet/dist/leaflet.css';
import Routing from './Routing';
import LocationPickUp from "./LocationPickUp"
import LocationDropOff from "./LocationDropOff"
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const UserMap = (props) => {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const [pickUpCoords, setPickUpCoords] = useState({});
  const [dropOffCoords, setDropOffCoords] = useState({});
  const {isDriver} = props

  const user = useAuth()

  const beDriver = () => {
    addDoc(collection(db, "Rides"), {
      driverId: user.userId,
      timestamp: serverTimestamp()
    })
  }

  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <UserMarker />
          <Routing pickUpCoords={pickUpCoords} dropOffCoords = {dropOffCoords}/>
        </MapContainer>
      </div>
      <div>
        <LocationPickUp pickUpCoords={pickUpCoords} setPickUpCoords={setPickUpCoords}/>
        <LocationDropOff dropOffCoords={dropOffCoords} setDropOffCoords={setDropOffCoords}/>
      </div>
      {isDriver? (<button className="btn rounded-full" onClick={beDriver}>Confirm to Be Driver</button>) :
       (<Link to="/drivers"><button className="btn rounded-full">Find Drivers</button></Link>)}

    </div>
  );
};

export default UserMap;
