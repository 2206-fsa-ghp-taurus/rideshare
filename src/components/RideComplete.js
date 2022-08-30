// will render different thing based on isDriver or not 
// adding money for driver, reducing money for rider (also updating footprint for rider)
import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";


const RideComplete = (props) => {
    // console.log(props)
    const location = useLocation(props.location);
    const { isDriver, name, cost, carbon, distance } = location.state;
    console.log('location', location )
    console.log('isDriver on the ride complete page', isDriver)


    return (
        <div>
        <h1> {`Hi ${name}, Here is the summary of your ride` }</h1>
        {isDriver
        ? ( <div> 
            <p> You Earned: {`${cost} $`} </p>
            <p> You Drove the Rider for : {`${distance} km`}</p>
            <p> You Helped the Rider Saved : {`${carbon} grams of carbon`}</p>
            </div> 
        )
        : (
            <div> 
            <p> You Spent: {`${cost} $`} </p>
            <p> You Travelled for : {`${distance} km`}</p>
            <p> You Saved : {`${carbon} grams of carbon`}</p>
            </div> 
        )
        }
        </div>
    );
};

export default RideComplete;
