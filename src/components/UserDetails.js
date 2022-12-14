import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';

function UserDetails(props) {
  const [user, setDetails] = useState([])
  const { userId, driverDetails } = props;

  const getUser = async () => {
    const userName = []
    const docSnap = await getDoc(doc(db, "Users",
      userId));
      userName.push(docSnap.data());
    setDetails(userName)
    }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      {driverDetails ?
            <div>
          {user.map((user) => (
            <div key={user.userId} className='text-center'>
              <img src={user.pictureUrl} className='avatar w-24 rounded my-2' alt="user pic"></img>
              <p className='my-4 font-bold text-xl'>{user.firstName}</p>
              <div className='card-body'>
                <p className='font-semibold text-lg'> {user?.carColor} {user?.carMake} {user?.carModel} </p>
                <p className='font-semibold text-lg'>{user?.carLicense} </p>
              </div>
            </div>
          ))}
        </div>

        :

        <div>
          {user.map((user) => (
            <div key={user.userId} className='center-content'>
              <img src={user.pictureUrl} className='avatar w-24 my-2 rounded flex justify-center center-content mx-auto' alt="user pic" />
              <div className='card-body mx-3'>
                <p className='my-4 font-bold text-xl text-center'>{user.firstName}</p>
                <p className='my-1 font-semibold text-lg'>Pick Up: {user.pickUpAddress} </p>
                <p className='my-1 font-semibold text-lg'>Drop Off: {user.dropOffAddress} </p>
              </div>
            </div>
          ))}
        </div>

      }
    </div>
  );
}

export default UserDetails;
