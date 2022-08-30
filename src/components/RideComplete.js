// // will render different thing based on isDriver or not 
// // adding money for driver, reducing money for rider (also updating footprint for rider)
// import React, {useState, useEffect} from 'react';
// import { useAuth } from '../auth';
// import { db } from '../firebase';
// import { doc, onSnapshot} from "firebase/firestore"


// const RideComplete = () => {
//   const { userId } = useAuth();
//   const [firstName, setFirstName] = useState('')
//   const getUserInfo = () => {onSnapshot(doc(db, 'Users', userId), (doc) =>{
//     setFirstName(doc.data().firstName);
// })}
// useEffect(()=>{getUserInfo()}, []) // so only sending request once
//   return (
//     <div>
//       <h1> {`Hi ${firstName}, Here is the summary of your ride` }</h1>
//     </div>
//   );
// };

// export default RideComplete;
