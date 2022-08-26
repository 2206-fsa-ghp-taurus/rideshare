import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';

function UserDetails(props) {
  const [user, setDetails] = useState([])
  const userId = props.userId

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
      {user.map((user) => (
        <div key={user.userId}>
           <img className='my-4 card-title product-name text-center font-weight-bold' src={user.pictureUrl} alt="user pic"></img>
          <p className='my-4 card-title product-name text-center font-weight-bold'>{user.firstName} </p>
        </div>
      ))}
    </div>
  );
}

export default UserDetails;
