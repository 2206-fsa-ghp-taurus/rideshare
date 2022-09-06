
import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import { useLocation } from 'react-router-dom';
import { DriverContext } from '../driverContext';
import { CometChat } from '@cometchat-pro/chat';
import * as CONSTANTS from '../constants/constants';
function CurrentRide(props) {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });
  const { userId } = useAuth();
  const { isDriver, setIsDriver } = useContext(DriverContext);
  const [currentRides, setCurrentRides] = useState([]);
  const [rideComplete, setRideComplete] = useState({});
  const [rideCancelled, setRideCancelled] = useState(false);
  const [user, setCurrentUser] = useState([]);
  const { selectedDrive, setSelectToDrive } = props;
  const [showChat, setShowChat] = useState(true);
  const location = useLocation();
  const { ride } = location.state;
  const { currentRide, setCurrentRide } = useContext(DriverContext);
  const getCompleteRide = () => {
    if (ride) {
      onSnapshot(doc(db, 'Rides', ride.id), (doc) => {
        setRideComplete({ id: doc.id, ...doc.data() });
      });
    }
  };
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
    getCompleteRide();
  }, []);
  const cancelRide = async (ride) => {
    const rideRef = doc(db, 'Rides', ride.id);
    const driverRef = doc(db, 'Users', ride.driverId);
    await updateDoc(rideRef, {
      status: deleteField(),
      riderId: deleteField(),
      riderPickUp: deleteField(),
      riderDropOff: deleteField(),
    });
    await updateDoc(driverRef, {
      driverStatus: deleteField(),
    });
    setRideCancelled(true);
  };
  const FormatNumber = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const completeRide = async (ride) => {
    const rideRef = doc(db, 'Rides', ride.id);
    await updateDoc(rideRef, {
      status: 2,
    });
    setCurrentRide(null);
      const driverRef = doc(db, 'Users', userId); // whoever clicks on the button is driver
      const driverData = (await getDoc(driverRef)).data();
      const driverWallet = driverData.wallet;
      const driverTotalFootPrint = driverData.totalFootPrint;
  
      const riderRef = doc(db, 'Users', ride.riderId); // whoever clicks on the button is driver
      const riderData = (await getDoc(riderRef)).data();
      const riderWallet = riderData.wallet;
      const riderTotalFootPrint = riderData.totalFootPrint;
      
      const distance = riderData.distanceTravelled
      const cost = FormatNumber((distance / 1000) * 0.621371 * 0.585);
      const carbon = FormatNumber(((distance / 1000) * 650) / 1000);
      // update for driver
      await updateDoc(driverRef, {
        wallet: Number(driverWallet) + Number(cost), // parseInt doesn't work, but number works
        totalFootPrint: Number(driverTotalFootPrint) + Number(carbon),
        driverStatus: deleteField(),
      });
      // update for rider
      await updateDoc(riderRef, {
        wallet: Number(riderWallet) - Number(cost),
        totalFootPrint: Number(riderTotalFootPrint) + Number(carbon), // only update footprint for rider
      });
      setSelectToDrive(false);
    }
  
  //Ride not initiated (no status) && No completed ride - render different messages to rider and driver
  if (currentRides.length === 0 && rideComplete.status !== 2) {
    if (isDriver && !rideCancelled) {
      return (
        <p className='text-center font-bold my-5'> Not currently on ride</p>
      );
      //Ride request sent to driver (status=0)
    } else if (isDriver && rideCancelled) {
      return (
        <p className='text-center font-bold my-5'>
          {' '}
          Rider has cancelled current ride
        </p>
      );
    } else if (rideCancelled) {
      return <Redirect to={{ pathname: '/home' }} />;
    } else {
      return (
        <>
          <p className='text-center font-bold my-7 md:text-2xl sm:text-lg'>
            {' '}
            Waiting for a driver to accept your ride request...
          </p>
          <img
            className='mx-auto w-1/4 opacity-75'
            src='https://cdn.dribbble.com/users/778626/screenshots/4339853/car-middle.gif'
            alt='car loading gif'
          />
        </>
      );
    }
  }
  //Ride status chnaged from In-Progress (status-1) to Completed (status-2). Redirect rider to Ride Complete page.
  if (currentRides.length === 0 && rideComplete.status === 2) {
    return (
      <Redirect
        to={{
          pathname: '/rideComplete',
          state: { isDriver, ride: rideComplete },
        }}
      />
    );
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
  CometChat.getLoggedinUser().then(
    (user) => {
      if (!user) {
        CometChat.login(userId, CONSTANTS.AUTH_KEY).then(
          (user) => {
            console.log('Login Successful:', { user });
          },
          (error) => {
            console.log('Login failed with exception:', { error });
          }
        );
      }
    },
    (error) => {
      console.log('Some Error Occured', { error });
    }
  );
  return (
    <div>
      <div className='container'>
        <MapContainer
          center={position}
          zoom={8}
          className='border-2 flex items-center wx-auto'
          scrollWheelZoom>
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
            <div className='text-center'>
              <UserDetails userId={ride.riderId} />{' '}
              <div className='flex justify-center items-center'>
                <button
                  className='btn btn-outline bg-success'
                  onClick={() => setShowChat(!showChat)}>
                  {showChat ? 'Chat with Rider' : 'Hide Chat'}
                </button>
              </div>
              <div>
                <div className='items-center flex justify-center my-5 flex-wrap'>
                  {!showChat && (
                    <Messaging
                      id={ride.id}
                      driverId={ride.driverId}
                      riderId={ride.riderId}
                      isDriver={isDriver}
                    />
                  )}
                  <div className='items-center flex justify-center pt-6 my-5 flex-wrap'>
                    <Link
                      to={{
                        pathname: '/rideComplete',
                        state: { isDriver, ride },
                      }}>
                      <button
                        id={ride.id}
                        className='btn btn-outline btn-success'
                        onClick={() => completeRide(ride)}>
                        Ride Complete
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='my-4'>
              <UserDetails
                userId={ride.driverId}
                currentRide={ride.id}
                driverDetails={true}
              />
              <div className='items-center flex justify-center my-5'>
                <button
                  className='btn btn-outline bg-success'
                  onClick={() => setShowChat(!showChat)}>
                  {showChat ? 'Chat with Driver' : 'Hide Chat'}
                </button>
              </div>
              <div>
                <div className='items-center flex justify-center my-5 flex-wrap'>
                  {!showChat && (
                    <Messaging
                      id={ride.id}
                      driverId={ride.driverId}
                      riderId={ride.riderId}
                    />
                  )}
                </div>
                <div className='items-center flex justify-center pt-6 my-5 flex-wrap'>
                  <button
                    id={ride.id}
                    className='btn btn-warning'
                    onClick={() => cancelRide(ride)}>
                    Cancel Ride
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      ;
    </div>
  );
}
export default CurrentRide;
