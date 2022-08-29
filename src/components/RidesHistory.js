import React, {useState, useEffect} from 'react';
import { useAuth } from '../auth';
import { db } from '../firebase';
import { collection, doc, onSnapshot, query, where, orderBy} from "firebase/firestore"


const RidesHistory = () => {
  const { userId } = useAuth();
  const [ rides, setRides] = useState([])
  const [isShownHoverContent, setIsShownHoverContent] = useState(false); // show some information when hovering over text

  const colRef = collection(db, 'Rides');
  const q = query(colRef, where("riderId", "==", userId), where("status", "==", 2)) // 2 means ride completed
  const getAllRides = () => {
    onSnapshot(q, (snapshot) =>{
        setRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))}
    )
  }
  useEffect(()=>{getAllRides()}, []) 
  console.log("my rides history", rides)

  const FormatNumber = (num)=> {
    console.log(num);
    return (Math.round(num * 100) / 100).toFixed(2);
  }


  return (
    <div>
      {rides.length >0 
      ? (
        <div>
          {rides.map((ride) => (
            <div key={ride.id} >
              <p> ------------------</p>
              <p> Time {ride.timestamp.toDate().toDateString()}</p>
              <p> From: {"placeholder for real location"}</p>
              <p> To: {"placeholder for real location"}</p>
              <div onMouseEnter={() => setIsShownHoverContent(true)} onMouseLeave={() => setIsShownHoverContent(false)}>
                <p> Distance (km): {FormatNumber(ride.distanceTravelled/1000)}</p>
                <p> Cost ($): {FormatNumber(ride.distanceTravelled/1000 * 0.621371 * 0.585)}</p>
                {/* m to km, to miles, 58.5 cents for IRS reimbursement rate */}
                <p> Carbon Saved(gram) : {FormatNumber(ride.distanceTravelled/1000 * 650)}</p>
                {/* based on BBC article: https://www.bbc.com/future/article/20200317-climate-change-cut-carbon-emissions-from-your-commute */}
              </div>
            </div>
          ))}
           {isShownHoverContent && (
                  <div className="footer items-center p-4 bg-neutral text-neutral-content">
                    <p>Cost is calculated based on IRS reimbursement rate  </p> 
                    <p>Carbon Saved is calculated based on the emission of CO2 for an average passenger vehicle</p>
                  </div>
                )}
        </div>
      )
      : <p> No rides Found, No Carbon Saved Yet</p>
      }
    </div>
  );
};

export default RidesHistory;
