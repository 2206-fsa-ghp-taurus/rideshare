import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';


function DriverDetails(props) {
  const [Driver, setDetails] = useState([])
  const driverId = props.userId

  const getDriver = async () => {
    const driverName = []
    const docSnap = await getDoc(doc(db, "Users",
      driverId));
    driverName.push(docSnap.data());
    setDetails(driverName)
    }

  useEffect(() => {
    getDriver()
  }, [])

  return (
    <div>
      {Driver.map((driver) => (
        <div>
          <p className='my-4 card-title product-name text-center font-weight-bold'>{driver.firstName} </p>
          <img className='my-4 card-title product-name text-center font-weight-bold' src={driver.pictureUrl} alt="driver pic"></img>
        </div>
      ))}
    </div>
  );
}

export default DriverDetails;
