import './UserMap.css';
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
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";


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
      timestamp: serverTimestamp(),
      pickUp: pickUpCoords,
      dropOff: dropOffCoords
    })
  }

  const findDriver = ()=>{
    let matchingDriver = [];
    let drivers = [];
   // first get all drivesr from database - getting their pickUpCoords and dropOffCoords 
    onSnapshot(collection(db, 'Rides'), (snapshot) => {
     snapshot.docs.forEach((doc)=> {
       drivers.push({...doc.data(), id: doc.id})
     })
     console.log('all drivers', drivers)
   })
   // loop over each driver and find matching driver 
   for (let idx = 0; idx< drivers.length; idx++){
      const routing = L.Routing.control({
      waypoints: [L.latLng(drivers[idx].pickUp.lat, drivers[idx].pickUp.lng ), L.latLng( drivers[idx].dropOff.lat, drivers[idx].dropOff.lng)],
      router: L.Routing.mapbox('sk.eyJ1Ijoia2xldmluZTg4IiwiYSI6ImNsNzUxeDVoeTFuazUzcG1xb3ZuOGd3aXcifQ.gTCOe2GB8DcStiCKcoowJw'),
      })
      routing.on('routeselected', function(e) {
        const coord = e.route.coordinates;
        console.log('this driver coord', coord);                 
        for (let i = 0; i< coord.length; i++){
          if (Math.abs(pickUpCoords.lat - coord[i].lat) < 0.1 && Math.abs(pickUpCoords.lng - coord[i].lng)< 0.1){
            for (let j = i; j< coord.length; j++){
              if (Math.abs(dropOffCoords.lat - coord[j].lat) < 0.1 && Math.abs(dropOffCoords.lng - coord[j].lng)< 0.1){
                matchingDriver.push(drivers[idx].driverId);
                // then we can connect to driverList component 
              }
            }
          }
        }
   }
  )}}

  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <UserMarker />
          <Routing pickUpCoords={pickUpCoords} dropOffCoords = {dropOffCoords} />
        </MapContainer>
      </div>
      <div>
        <LocationPickUp pickUpCoords={pickUpCoords} setPickUpCoords={setPickUpCoords}/>
        <LocationDropOff dropOffCoords={dropOffCoords} setDropOffCoords={setDropOffCoords}/>
      </div>
      {isDriver? (<button className="btn rounded-full" onClick={beDriver}>Confirm to Be Driver</button>) :
       (<Link to="/drivers"><button className="btn rounded-full" onClick = {findDriver}>Find Drivers</button></Link>)}

    </div>
  );
};

export default UserMap;
