import React, { useState, useEffect, useContext } from 'react';
// import { onSnapshot, collection } from '../firebase/firestore';
import { db } from '../firebase';
import Context from './Context';
import { CometChatMessages } from '../cometchat-pro-react-ui-kit/CometChatWorkspace/src';

const Messaging = () => {
  const [authObj] = useContext(Context);

  const user = db.collection('Rides').get();
  console.log(user);
  // useEffect(() =>
  //   onSnapshot(
  //     collection(db, 'Rides'),
  //     async (snapshot) => await getRides(snapshot.docs.map)
  //   )
  // );

  // const findUser = () => {
  //   if (driverId === authObj.userId) {
  //     if (user.role === 'user' && currentRide.driver && currentRide.driver.id) {
  //       return currentRide.driver.id;
  //     } else if (
  //       user.role === 'driver' &&
  //       currentRide.requestor &&
  //       currentRide.requestor.id
  //     ) {
  //       return currentRide.requestor.id;
  //     }
  //   }
  // };

  //query rides db for status (), pull current ride

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* <CometChatMessages chatWithUser={} /> */}
    </div>
  );
};

export default Messaging;
