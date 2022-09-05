import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMap } from 'react-leaflet';
import { useAuth } from '../auth';
import { db } from '../firebase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './userMap.css';
import { myIcon } from './MarkerIcon';
import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  deleteDoc, deleteField
} from 'firebase/firestore';
import UserDetails from './UserDetails';
import { MapContainer, TileLayer } from 'react-leaflet';
import { DriverContext} from '../driverContext';

function RideRequests(props) {
  const { userId } = useAuth();
  const history = useHistory();
  const { selectedDrive, setSelectToDrive }  = props;
  const [requests, setRideRequests] = useState();
  const { currentRide, setCurrentRide } = useContext(DriverContext);
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

console.log("current ride", currentRide)

  const getRideRequests = async () => {
    onSnapshot(
      query(
        collection(db, 'Rides'),
        where('status', '==', 0),
        where('driverId', '==', `${userId}`)
      ),
      async (snapshot) =>
      await
          setRideRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    )
  )};

  useEffect(() => {
    getRideRequests();
  },[]);

  //setting group of markers in case we allow more than 1 rider.
  const ShowMarkerBeforeRideAccepted = () => {
    const map = useMap();
    let markerBounds = L.latLngBounds();
    if (requests.length && requests.length > 0) {
      console.log(requests[0].requestorIds)
      requests[0].requestorIds.forEach((marker) => {
        let markerIcon = L.marker(
          [marker.pickUpCoords.lat, marker.pickUpCoords.lng],
          { icon: myIcon }
        ).addTo(map);
        markerIcon.bindPopup(`${marker.riderId}`);
        markerBounds.extend([marker.pickUpCoords.lat, marker.pickUpCoords.lng]);
      });
      map.fitBounds(markerBounds);
    }
    return null;
  };

  const cancelDrive = async () => {
    const rideRef = doc(db, 'Rides', `${currentRide}`)
    await deleteDoc(rideRef)

    const driverRef = doc(db, 'Users', userId)
      await updateDoc(driverRef, {
        driverStatus: deleteField()
      })
      setCurrentRide(null)
      history.replace('/home')
    }

  const acceptRide = async (riderRequest, requestor) => {
    history.replace({
      pathname: '/currentRide',
      state: { ride: riderRequest }
      });

    const rideRef = doc(db, 'Rides', riderRequest.id);
    await updateDoc(rideRef, {
      status: 1,
      riderId: requestor.userId,
      riderPickUp: requestor.pickUpCoords,
      riderDropOff: requestor.dropOffCoords,
      distance: requestor.distance,
      pickUpAddress: requestor.pickUpAddress,
      dropOffAddress: requestor.dropOffAddress,
      requestorIds: deleteField()
    });
  };

  const inputCarDetails = async () => {
    history.replace('/editProfile');
  };

console.log(requests)
  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={8} scrollWheelZoom className='border-2 flex items-center wx-auto'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {requests && requests.length !== 0 ? (
            <ShowMarkerBeforeRideAccepted />
          ) : (
            ''
          )}
        </MapContainer>
      </div>
      <div>
        {requests && requests.length !== 0 ?(
          <div className='row col-8 justify-content-center'>
              <div key={requests[0].id} className='card product-card shadow-lg'>
                <div className='card-body'>
                  <p className='my-4 card-title product-name text-center font-weight-bold'>
                    Requested Ride:
                  </p>
                  {requests[0].requestorIds.map((requestor) => (
                    <div id={requests[0]}>
                  <UserDetails userId={requestor.userId} />
                  <button
                    className='btn btn-outline bg-white mt-3'
                    id={requests[0]}
                    rider={requestor}
                    onClick={() => {acceptRide(requests[0], requestor)}}>
                    Accept Ride
                  </button>
                  </div>
            ))}
                </div>
              </div>
              </div>
     ) : (
          <div className='flex items-center justify-center'>No rides requested</div>
      )}
      <div className='divider'></div>
      <div>

        <button className='btn btn-outline btn-info mx-2' onClick={inputCarDetails}>
          Edit Car Details
        </button>

        <button className='btn btn-warning mx-2' onClick={cancelDrive}>
          Cancel Drive
        </button>

      </div>
    </div>
    </div>
  );

}

export default RideRequests;
