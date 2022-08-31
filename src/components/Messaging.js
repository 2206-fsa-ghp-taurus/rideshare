import React from 'react';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatMessages } from '../cometChat/src';
import { useAuth } from '../auth';
import * as CONSTANTS from '../constants/constants';

const Messaging = (props) => {
  const { userId } = useAuth();
  const { driverId } = props;
  const { riderId } = props;
  const { isDriver } = props;

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
