import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';


function DriverDetails(props) {
  const [Driver, getDetails] = useState([])
  const driverId = props.userId
  const getDriver = async () => {
    const driverName = []
    const docSnap = await getDoc(doc(db, "Users",
      driverId));
    driverName.push(docSnap.data());
    getDetails(driverName)
    }

  useEffect(() => {
    getDriver()
  }, [])

return (
  <div>
    {Driver.map((driver) => (
      <div>
  <p className='my-4 card-title product-name text-center font-weight-bold'>{driver.firstName} </p>
  <div>
  <img className='my-4 card-title product-name text-center font-weight-bold' src={driver.image} alt="No image found"></img>
  </div>
  </div>
    ))}
  </div>

);
}

export default DriverDetails;
