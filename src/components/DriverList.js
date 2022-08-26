import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { onSnapshot, collection, query, where, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import DriverDetails from './DriverDetails'
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

const DriverList = ()=> {
  const {userId} = useAuth()
  const [drivers, setDrivers] = useState([])
  const matchingDriver = []
  const  [pickUpCoords, setPickUpCoords] = useState({});
  const  [dropOffCoords, setDropOffCoords] = useState({});

  // first get all drivers from database 

  useEffect(
    () =>
      onSnapshot(collection(db, "Rides"),  (snapshot) =>
         setDrivers(snapshot.docs.map((doc) => doc.data()))
    ),
    []
  )

  useEffect(
    () =>
    onSnapshot(doc(db, 'Users', userId), (doc)=>{
       console.log('doc', doc.data())
       setPickUpCoords(doc.data().riderPickUp);
       setDropOffCoords (doc.data().riderDropOff);
    }
    ),
    []
  )
  // const getAllDriversAndSelfLoc =()=>{
  //   onSnapshot(collection(db, 'Rides'),  (snapshot) => {
  //         snapshot.docs.forEach((doc)=> {
  //          drivers.push({...doc.data(), id: doc.id})
  //        })
  //     });
  //   getDoc(doc(db, 'Users', userId)).then((doc)=>{
  //       console.log('doc', doc.data())
  //        setPickUpCoords(doc.data().riderPickUp);
  //        setDropOffCoords (doc.data().riderDropOff);
  //     })
  // }
  // useEffect( getAllDriversAndSelfLoc(),[])
  // loop over each driver to find matching driver 

 
  

  console.log('for this requester, pick up and drop off', pickUpCoords, dropOffCoords)
  console.log('all Drivers', drivers)

  for (let idx = 0; idx< drivers.length; idx++){
    // const routing = L.Routing.control({
    // waypoints: [L.latLng(drivers[idx].pickUp.lat, drivers[idx].pickUp.lng ), L.latLng( drivers[idx].dropOff.lat, drivers[idx].dropOff.lng)],
    // router: L.Routing.mapbox('sk.eyJ1Ijoia2xldmluZTg4IiwiYSI6ImNsNzUxeDVoeTFuazUzcG1xb3ZuOGd3aXcifQ.gTCOe2GB8DcStiCKcoowJw'),
    // show: false,
    //   })
    // console.log('routing', routing)
//      routing.on('routeselected', function(e) {
//       const coord = e.route.coordinates;
//       console.log('this driver coord', coord);                 
//       for (let i = 0; i< coord.length; i++){
//         if (Math.abs(pickUpCoords.lat - coord[i].lat) < 0.1 && Math.abs(pickUpCoords.lng - coord[i].lng)< 0.1){
//           for (let j = i; j< coord.length; j++){
//             if (Math.abs(dropOffCoords.lat - coord[j].lat) < 0.1 && Math.abs(dropOffCoords.lng - coord[j].lng)< 0.1){
//               matchingDriver.push(drivers[idx].driverId);
//             }
//           }
//         }
//       }
//  })
    if (Math.abs(pickUpCoords.lat - drivers[idx].pickUp.lat)<0.1 && Math.abs(pickUpCoords.lng - drivers[idx].pickUp.lng)<0.1&&
    Math.abs(dropOffCoords.lat - drivers[idx].dropOff.lat)<0.1 && Math.abs(dropOffCoords.lng - drivers[idx].dropOff.lng)<0.1){
      matchingDriver.push(drivers[idx])
    }
    console.log('matching drivers', matchingDriver)
}

  const requestRide = () => {

  };
  if (matchingDriver.length === 0){
    return (
      <p> No Driver Found</p>
    )
  }
  return (
    <div className='row col-8 justify-content-center'>
      {matchingDriver.map((driver) => (
      <div className='card product-card shadow-lg'>
        <div className='card-body'>
          <p className='my-4 card-title product-name text-center font-weight-bold'>{driver.driverId} </p> 
           <DriverDetails userId={driver.driverId} />
      <button className="btn rounded-full">Request Ride</button>
        </div>
      </div>
      ))}
    </div>
  );
}


export default DriverList;




  //   onSnapshot(collection(db, 'Rides'),  (snapshot) => {
  //     snapshot.docs.forEach((doc)=> {
  //      drivers.push({...doc.data(), id: doc.id})
  //    })
  //    console.log('all drivers', drivers)
  //  })
  //   getDocs(collection(db,'Rides')).then((snapshot)=>{
  //   snapshot.docs.forEach((doc)=>{
  //     drivers.push({...doc.data()});
  //   })
  //   console.log(drivers)
  // })
   // loop over each driver and find matching driver 

  