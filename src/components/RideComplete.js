import React, {useState, useEffect, useContext} from 'react';
import { useAuth } from '../auth';
import { useLocation } from "react-router-dom";
import { db } from '../firebase';
import { doc, getDoc, onSnapshot} from "firebase/firestore";
import { DriverContext} from '../driverContext';

const RideComplete = (props) => {
    const {userId} = useAuth();
    const location = useLocation();
    const { isDriver, ride } = location.state;
    const [firstName, setFirstName] = useState('')
    const [distance, setDistance] = useState(0)

    const getUserInfo = async () => {
        const userRef = doc(db, "Users", userId);
        const userData = (await getDoc(userRef)).data();
        setFirstName(userData.firstName);
    }

    const getRideInfo = async () => {
        const rideRef = doc(db, "Rides", ride.id);
        const rideData = (await getDoc(rideRef)).data();
        setDistance(rideData.distance);
    }

    useEffect(() => {
        getUserInfo();
        getRideInfo();
    }, []);

    const FormatNumber = (num)=> {
        return (Math.round(num * 100) / 100).toFixed(2);
    }
  
    return (
        <div>
        <h1> {`Hi ${firstName}, Here is the summary of your ride` }</h1>
        {isDriver ?
         ( <div>
            <p> You Earned: {`${FormatNumber(distance/1000 * 0.621371 * 0.585)} $`} </p>
            <p> You Drove the Rider for : {`${distance/1000} km`}</p>
            <p> You Helped the Rider Saved : {`${FormatNumber(distance/1000 * 650)} grams of carbon`}</p>
            </div>
        )
        : (
            <div>
            <p> You Spent: {`${FormatNumber(distance/1000 * 0.621371 * 0.585)} $`} </p>
            <p> You Travelled For : {`${distance/1000} km`}</p>
            <p> You Saved : {`${FormatNumber(distance/1000 * 650)} grams of carbon`}</p>
            </div>
        )
        }
        </div>
    );
};

export default RideComplete;
