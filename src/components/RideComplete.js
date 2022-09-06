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
    // const [distance, setDistance] = useState(0)

    const getUserInfo = async () => {
        const userRef = doc(db, "Users", userId);
        const userData = (await getDoc(userRef)).data();
        setFirstName(userData.firstName);
    }

    // const getRideInfo = async () => {
    //     const rideRef = doc(db, "Rides", ride.id);
    //     const rideData = (await getDoc(rideRef)).data();
    //     setDistance(rideData.distance);
    // }

    const distance = ride.distance

    useEffect(() => {
        getUserInfo();
        // getRideInfo();
    }, []);

    const FormatNumber = (num)=> {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    return (
        <div>
        <h2 className='text-center font-bold text-4xl my-3' style={{ fontFamily: 'Oswald' }}>Ride Complete</h2>
        <h3 className='text-center font-semibold md:text-lg sm:text-md my-3'>{`Hi ${firstName}, Here is the summary of your ride`}</h3>
        {isDriver ?
         ( <div className="mx-5 text-center">
                <p className='py-2'>You Earned: {`$ ${FormatNumber(distance/1000 * 0.621371 * 0.585)}`} </p>
                <p className='py-2'>You Drove the Rider for: {`${FormatNumber(distance/1000)} km`}</p>
                <p className='py-2'>You Helped the Rider Save: {`${FormatNumber(distance/1000 * 650 / 1000)} kg of carbon`}</p>
                <img src='https://miro.medium.com/max/606/1*e78xMjlb8Xd0YeIs9PyaaA.png' alt='environmental pic' className='mx-auto w-1/4 opacity-60'/>
                <p className='py-2'>Thank you for helping save our environment!</p>
            </div>
        )
        : (
            <div className='mx-5 text-center'>
                <p className='py-2'>You Spent: {`$ ${FormatNumber(distance/1000 * 0.621371 * 0.585)}`} </p>
                <p className='py-2'>You Traveled For: {`${FormatNumber(distance/1000)} km`}</p>
                <p className='py-2'>You Saved: {`${FormatNumber(distance/1000 * 650 / 1000)} kg of carbon`}</p>
                <img src='https://miro.medium.com/max/606/1*e78xMjlb8Xd0YeIs9PyaaA.png' alt='environmental pic' className='mx-auto md:w-1/4 opacity-60'/>
                <p className='py-2'>Thank you for helping save our environment!</p>
            </div>
        )
        }
        </div>
    );
};

export default RideComplete;
