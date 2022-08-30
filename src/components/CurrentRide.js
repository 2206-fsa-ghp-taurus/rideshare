import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  deleteField,
} from 'firebase/firestore';
import UserDetails from './UserDetails';
import Messaging from './Messaging';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { greenIcon } from './MarkerIcon';
import './userMap.css';

function CurrentRide(props) {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });
  const { userId } = useAuth();
  const { isDriver, setIsDriver } = props;
  const [currentRides, setCurrentRides] = useState([]);
  const [user, setCurrentUser] = useState([]);
  const [showChat, setShowChat] = useState(true);

  const getCurrentRide = async () => {
    if (isDriver) {
      onSnapshot(
        query(
          collection(db, 'Rides'),
          where('status', '==', 1),
          where('driverId', '==', `${userId}`)
        ),
        async (snapshot) =>
          await setCurrentRides(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
      );
    } else {
      onSnapshot(
        query(
          collection(db, 'Rides'),
          where('status', '==', 1),
          where('riderId', '==', `${userId}`)
        ),
        async (snapshot) =>
          await setCurrentRides(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
      );
    }
  };

  useEffect(() => {
    getCurrentRide();
  }, []);

  const cancelRide = async (evt) => {
    const rideRef = doc(db, 'Rides', `${evt.target.id}`);
    await updateDoc(rideRef, {
      status: deleteField(),
      riderId: deleteField(),
      riderPickUp: deleteField(),
      riderDropOff: deleteField(),
    });
  };
  console.log(isDriver);
  const completeRide = async (evt) => {
    const rideRef = doc(db, 'Rides', `${evt.target.id}`);
    await updateDoc(rideRef, {
      status: 2,
      // add total cost / carbon footprint updates
    });
    // setIsDriver(false);
  };

  if (currentRides.length === 0) {
    return <p> Not currently on ride</p>;
  }

  if (currentRides.length === 0) {
    return <p> Not currently on ride</p>;
  }

  const RoutingAfterRideAccepted = () => {
    const map = useMap();

    const pickUp = currentRides.length ? currentRides[0].riderPickUp : null;
    const dropOff = currentRides.length ? currentRides[0].riderDropOff : null;
    const wayPoint1 = L.latLng(pickUp.lat, pickUp.lng);
    const wayPoint2 = L.latLng(dropOff.lat, dropOff.lng);

    const routing = L.Routing.control({
      waypoints: [wayPoint1, wayPoint2],
      createMarker: function (i, start, n) {
        return L.marker(start.latLng, { icon: greenIcon });
      },
    }).addTo(map);

    routing.on('routeselected', function (e) {
      const bounds = L.latLngBounds(wayPoint1, wayPoint2);
      map.fitBounds(bounds);
    });
    routing.hide();
  };

  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={8} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {currentRides.length ? <RoutingAfterRideAccepted /> : null}
        </MapContainer>
      </div>
      {currentRides.map((ride) => (
        <div>
          {ride.driverId === userId ? (
            <div>
              <UserDetails userId={ride.riderId} />{' '}
              <button
                className='btn rounded-full'
                onClick={() => setShowChat(!showChat)}>
                {showChat ? 'Chat with Rider' : 'Hide Chat'}
              </button>
              {!showChat && (
                <Messaging
                  id={ride.id}
                  driverId={ride.driverId}
                  riderId={ride.riderId}
                  isDriver={true}
                />
              )}
              <Link to='/home'>
                <button
                  id={ride.id}
                  className='btn rounded-full'
                  onClick={completeRide}>
                  Ride Complete
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <UserDetails
                userId={ride.driverId}
                currentRide={ride.id}
                driverDetails={true}
              />
              <button
                className='btn rounded-full'
                onClick={() => setShowChat(!showChat)}>
                {showChat ? 'Chat with Driver' : 'Hide Chat'}
              </button>
              {!showChat && (
                <Messaging
                  id={ride.id}
                  driverId={ride.driverId}
                  riderId={ride.riderId}
                />
              )}
              <button
                id={ride.id}
                className='btn rounded-full'
                onClick={cancelRide}>
                Cancel Ride
              </button>
            </div>
          )}
          ;
        </div>
      ))}
      ;
    </div>
  );
}

export default CurrentRide;
