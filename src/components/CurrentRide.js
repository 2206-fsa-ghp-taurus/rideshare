import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, doc, getDoc, updateDoc, query, where, onSnapshot, deleteField } from 'firebase/firestore';
import UserDetails from './UserDetails'
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import L from 'leaflet'

function CurrentRide() {
  const {userId} = useAuth()
  const history = useHistory()
  const [currentRides, setCurrentRides] = useState([])
  const [user, setCurrentUser] = useState([])
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });
  

  const getCurrentRide= async () => {
    onSnapshot(query(collection(db, "Rides"), where("status", "==", 1), where("driverId", "==", `${userId}`|| "riderId", "==", `${userId}`)), async (snapshot) =>
    await setCurrentRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    ))
  }

  const getCurrentUser = async () => {
    const userName = []
    const docSnap = await getDoc(doc(db, "Users",
      userId));
      userName.push(docSnap.data());
      setCurrentUser(userName)
    }

  useEffect(() => {
    getCurrentUser()
    getCurrentRide()
  }, [])

  const cancelRide = async (evt) => {
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    await updateDoc(rideRef, {
      "status": deleteField(),
      "riderId": deleteField()
      //remove  pick-up / drop-off details -- confirm key names
    })
    history.replace('/home');;
  }

if (currentRides.length === 0){
  return (
    <p> Not currently on ride</p>
  )
}



const RoutingAfterRideAccepted = () => {
  const map = useMap()
  const greenIcon = new L.Icon({
    iconUrl:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const pickUp = currentRides.length ? currentRides[0].riderPickUp : null;
  const dropOff = currentRides.length ? currentRides[0].riderDropOff : null;


  const routing = L.Routing.control({
    waypoints: [
      L.latLng(pickUp.lat, pickUp.lng),
      L.latLng(dropOff.lat, dropOff.lng),
    ],
    // router: L.Routing.mapbox(`${process.env.REACT_APP_MAP_BOX_API_KEY}`),
    createMarker: function (i, start, n) {
      //for (i = 0; waypoint.length; i++){
      return L.marker(start.latLng, { icon: greenIcon })
        .bindPopup('start')
        .openPopup();
    },
  }).addTo(map);

  routing.on('routeselected', function (e) {
    const wayPoint1 = L.latLng(pickUp.lat, pickUp.lng);
    const wayPoint2 = L.latLng(dropOff.lat, dropOff.lng);
    const bounds = L.latLngBounds(wayPoint1, wayPoint2);
    map.fitBounds(bounds);
  })


}
  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={8} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        <RoutingAfterRideAccepted /> 
        </MapContainer>
      </div>
    {currentRides.map((ride) => (
      <div>
        {ride.driverId === userId ?
          <div>
            <UserDetails userId={ride.riderId} />
          </div>
        :
          <div>
            <UserDetails userId={ride.driverId} currentRide={ride.id} isDriver={true}/>
            <button id={ride.id} className="btn rounded-full" onClick = {cancelRide}>Cancel Ride</button>
          </div>
        }
      </div>
    ))}
    </div>
  )
}



export default CurrentRide
