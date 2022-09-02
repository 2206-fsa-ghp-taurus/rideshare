import React, {useEffect, useState, useContext} from "react";
import {Link, Redirect} from "react-router-dom";
import {useAuth} from "../auth";
import {db} from "../firebase";
import {collection, query, where, onSnapshot} from "firebase/firestore";

const RequestNotification = () => {
  const {userId} = useAuth();
  const [requestedRides, setRequestedRides] = useState([]);

  const getRequestedRides = async () => {
    onSnapshot(
      query(
        collection(db, "Rides"),
        where("status", "==", 0),
        where("driverId", "==", `${userId}`)
      ),
      async (snapshot) =>
        await setRequestedRides(
          snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        )
    );
  };

  useEffect(() => {
    getRequestedRides();
  });

  const rideCount = () => {
    let count = 0;
    if (requestedRides.length) {
      for (let i = 0; i < requestedRides.length; i++) {
        count += 1;
      }
      return count;
    }
  };

  return <>{rideCount()}</>;
};

export default RequestNotification;
