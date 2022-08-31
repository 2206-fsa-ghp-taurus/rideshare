
import React, { useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { doc, getDoc} from "firebase/firestore"
import { db } from './firebase';
//////////////////////////////// useAuth hook
// custom hook, so other components do not to use useContext
// return an objet with loggedin property
export const AuthContext = React.createContext({ loggedIn: false });
export function useAuth() {
  return useContext(AuthContext);
}


/////////////////////////////// useAuthInithook
// initialize the authentication sate
// returns loading flag + auth object (loggedin + userId)

// const getUser = async (userId) => {
//   const docSnap = await getDoc(doc(db, "Users",
//     userId));
//    const user = (docSnap.data());
//    if(user.driverStatus) {
//     setIsDriver(user.driverStatus)
//    }
//   }
// console.log(getUser())

export function useAuthInit() {
  const [authInit, setAuthInit] = useState({ loading: true });
  // const [isDriver, setIsDriver] = useState(false);

  // const getUser = async (userId) => {
  //   const docSnap = await getDoc(doc(db, "Users",
  //     userId));
  //    const user = (docSnap.data());
  //    if(user.driverStatus) {
  //     setIsDriver(true)
  //    }
  //   }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      const authObj = user ?
        { loggedIn: true, userId: user.uid } :
        { loggedIn: false };
      setAuthInit({ loading: false, authObj });
    });
  }, []);
  return authInit;
}
