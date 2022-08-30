import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMap } from 'react-leaflet';
import { useAuth } from '../auth';
import { db } from '../firebase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './userMap.css';
import { myIcon } from './MarkerIcon'
import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import UserDetails from './UserDetails';
import { MapContainer, TileLayer } from 'react-leaflet';


function RideRequests(props) {
  const { userId } = useAuth();
  const history = useHistory();
  const { isDriver } = props;
  const [requests, setRideRequests] = useState([]);
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const getRideRequests = async () => {
    onSnapshot(
      query(
        collection(db, 'Rides'),
        where('status', '==', 0),
        where('driverId', '==', `${userId}`)
      ),
      async (snapshot) =>
        await setRideRequests(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
    );
  };


  useEffect(() => {
    getRideRequests();
   
  }, []);

  //setting group of markers in case we allow more than 1 rider.
  const ShowMarkerBeforeRideAccepted = () => {
    const map = useMap();
    let markerBounds = L.latLngBounds();
    if (requests.length && requests.length > 0) {
      requests.forEach((marker) => {
        let markerIcon = L.marker(
          [marker.riderPickUp.lat, marker.riderPickUp.lng],
          { icon: myIcon }
        ).addTo(map);
        markerIcon.bindPopup(`${marker.riderId}`);
        markerBounds.extend([marker.riderPickUp.lat, marker.riderPickUp.lng]);
      });
      map.fitBounds(markerBounds);
    }
    return null;
  };


  const acceptRide = async (riderRequest) => {
    const rideRef = doc(db, 'Rides', riderRequest.id);
    await updateDoc(rideRef, {
      status: 1,
    });
    history.replace('/currentRide');
  };



  const inputCarDetails = async () => {
    history.replace('/editProfile');
  };

  console.log(userId);
  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={8} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {requests && requests.length !== 0 ?
        <ShowMarkerBeforeRideAccepted /> : ""}

        </MapContainer>
      </div>
      <div>
        {requests && requests.length !== 0 ? (
          <div className='row col-8 justify-content-center'>
            {requests.map((request) => (
              <div key={request.id} className='card product-card shadow-lg'>
                <div className='card-body'>
                  <p className='my-4 card-title product-name text-center font-weight-bold'>
                    Requested Ride:
                  </p>
                  <UserDetails userId={request.riderId} />
                  <button
                    className='btn rounded-full'
                    onClick={() => acceptRide(request)}>
                    Accept Ride
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No rides requested</div>
        )}
      </div>
      <div className='divider'></div>
      <div>
        <h4>Would you like to update your car details?</h4>
        <button className='btn rounded-full' onClick={inputCarDetails}>
          Edit Car Details
        </button>
      </div>
    </div>
  );
}

export default RideRequests;
