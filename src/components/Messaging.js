// import React from 'react';
// import { db } from '../firebase';
// import { getDoc, doc } from 'firebase/firestore';
// import { CometChat } from '@cometchat-pro/chat';
// import { CometChatMessages } from '../cometchat-pro-react-ui-kit/CometChatWorkspace/src';
// import { useAuth } from '../auth';
// import * as CONSTANTS from '../constants/constants';

// const appSetting = new CometChat.AppSettingsBuilder()
//   .subscribePresenceForAllUsers()
//   .setRegion(CONSTANTS.REGION)
//   .build();
// CometChat.init(CONSTANTS.APP_ID, appSetting).then(
//   () => {
//     console.log('Initialization completed successfully');
//     // You can now call login function.
//   },
//   (error) => {
//     console.log('Initialization failed with error:', error);
//     // Check the reason for error and take appropriate action.
//   }
// );

// const Messaging = (props) => {
//   const { userId } = useAuth();
//   console.log(props);
//   const rideId = props.id;
//   const { driverId } = props;
//   const { riderId } = props;
//   const { isDriver } = props;

//   const userInfo = async () => {
//     const userName = await getDoc(doc(db, 'Users', userId));
//     const firstName = userName.data().firstName;
//     return firstName;
//   };

//   const setUserInfo = async () => {
//     let user = new CometChat.User(userId);
//     let firstName = await userInfo();
//     user.setName(firstName);

//     CometChat.createUser(user, CONSTANTS.AUTH_KEY).then(
//       (user) => {
//         console.log('user created', user);
//       },
//       (error) => {
//         console.log('error', error);
//       }
//     );
//   };

//   setUserInfo();

//   //will need to be changed depending on what's able to be passed through props -- determining whether other user is a driver or rider
//   // const findUser = async () => {
//   //   //going to pass ride id through props, once component is hooked up
//   //   //might pass all ride info. Can clean up thiscode and pull directly from props
//   //   let rideInfo = await getDoc(doc(db, 'Rides', rideId));
//   //   const riderId = rideInfo.data().riderId;
//   //   const status = rideInfo.data().status;
//   //   const driverId = rideInfo.data().driverId;

//   //   if (driverId === userId && status > 0) {
//   //     return await riderId;
//   //   } else {
//   //     return 'Error loading messaging';
//   //   }
//   // };

//   //   //query rides db for status (), pull current ride

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       {/* pass throguh props, either rider or driver's id depending on current status; delete accounts upon closing chat in the next view*/}
//       <CometChatMessages chatWithUser={isDriver ? riderId : driverId} />
//     </div>
//   );
// };

// export default Messaging;
