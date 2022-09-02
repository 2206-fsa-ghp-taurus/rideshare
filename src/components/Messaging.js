import React from 'react';
import { CometChatMessages } from '../cometChat/src';

const Messaging = (props) => {
  const { driverId } = props;
  const { riderId } = props;
  const { isDriver } = props;

  //will need to be changed depending on what's able to be passed through props -- determining whether other user is a driver or rider
  // const findUser = async () => {
  //   //going to pass ride id through props, once component is hooked up
  //   //might pass all ride info. Can clean up thiscode and pull directly from props
  //   let rideInfo = await getDoc(doc(db, 'Rides', rideId));
  //   const riderId = rideInfo.data().riderId;
  //   const status = rideInfo.data().status;
  //   const driverId = rideInfo.data().driverId;

  //   if (driverId === userId && status > 0) {
  //     return await riderId;
  //   } else {
  //     return 'Error loading messaging';
  //   }
  // };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* pass throguh props, either rider or driver's id depending on current status; delete accounts upon closing chat in the next view*/}
      <CometChatMessages chatWithUser={isDriver ? riderId : driverId} />
    </div>
  );
};

export default Messaging;
