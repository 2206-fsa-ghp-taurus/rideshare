import React, { useContext, useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const CurrentRideContext = React.createContext();
export function useCurrentRide() {
  return useContext(CurrentRideContext);
}

// return (
//   <Context.Provider value={{isLoading, setIsLoading, user, setUser, cometChat, selectedFrom, setSelectedFrom, selectedTo, setSelectedTo, rideRequest, setRideRequest, currentRide, setCurrentRide}}></Context.Provider>

export const CurrentRideContextProvider = () => {
  const [currentRide, setCurrentRide] = useState([]);
  // let userId
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'Rides'),
        where('status', '==', 1),
        async (snapshot) =>
          await setCurrentRide(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
      )
    );
  }, [currentRide]);
  // return (
  //   currentRide)
  //   <CurrentRideContext.Provider
  //     value={{
  //       currentRide,
  //       setCurrentRide
  //     }}
  //   >
  //   </CurrentRideContext.Provider>
  // )
};
