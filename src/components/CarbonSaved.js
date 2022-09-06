import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import tree from '../images/tree.gif';

const CarbonSaved = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState({});
  const getUserInfo = () => {
    onSnapshot(doc(db, 'Users', userId), (doc) => {
      setUser(doc.data());
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []); // so only sending request once

  return (
    <>
      <h2
        className='font-bold text-center text-2xl my-3 md:text-6xl'
        style={{ fontFamily: 'Loved by the King' }}>
        Reducing my Carbon Footprint
      </h2>
      <p
        className='pt-7 text-3xl text-center mb-0 my-2'
        style={{ fontFamily: 'Loved by the King' }}>
        Amount of Carbon Saved: {user?.totalFootPrint} kg
      </p>
      <div className='flex items-center justify-center mt-7 pt-3'>
        <img src={tree} alt='tree gif' />
      </div>
    </>
  );
};

export default CarbonSaved;
