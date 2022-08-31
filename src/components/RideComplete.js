import React, {useState, useEffect} from 'react';
import { useAuth } from '../auth';
import { useLocation } from "react-router-dom";
import { db } from '../firebase';
import { doc, getDoc, onSnapshot} from "firebase/firestore";


const RideComplete = (props) => {
    const {userId} = useAuth();
    // const location = useLocation(props.location);
    const location = useLocation();
    // const { isDriver, ride } = location.state;
    const state = location.state;
    // const state =  location.state;
    const [firstName, setFirstName] = useState('')
    const [distance, setDistance] = useState(0)
   
    
    const getUserInfo = async () => {
        const userRef = doc(db, "Users", userId);
        const userData = (await getDoc(userRef)).data();
        setFirstName(userData.firstName);
    }


    const getRideInfo = async () => {
        if(state && state.isDriver) {
            console.log('state', state)
        const rideRef = doc(db, "Rides", state.ride.id);
        const rideData = (await getDoc(rideRef)).data();
        setDistance(rideData.distance);
        } 
        
        if(state && !state.isDriver) {
            const rideRef = doc(db, "Rides", state.id);
            const rideData = (await getDoc(rideRef)).data();
            setDistance(rideData.distance);

        }
    }

   
    useEffect(() => {
        getUserInfo();
        getRideInfo();
    }, []);


    const FormatNumber = (num)=> {
        return (Math.round(num * 100) / 100).toFixed(2);
    }
    console.log('another state', state)
    console.log('distance', distance)
    return (
        <div>
        <h1> {`Hi ${firstName}, Here is the summary of your ride` }</h1>
        {state && state.isDriver
        ? ( <div> 
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
