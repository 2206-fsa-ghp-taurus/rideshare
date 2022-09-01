import React, {useState, useEffect} from 'react';
import { useAuth } from '../auth';
import { db } from '../firebase';
import { collection, doc, onSnapshot, query, where, orderBy} from "firebase/firestore"


const RidesHistory = () => {
  const { userId } = useAuth();
  const [ rides, setRides] = useState([]) // history as rider 
  const [ drives, setDrives] = useState([]) // history as driver 
  const [isShownHoverContent, setIsShownHoverContent] = useState(false); // show some information when hovering over text

  const colRef = collection(db, 'Rides');
  const q1 = query(colRef, where("riderId", "==", userId), where("status", "==", 2)) // 2 means ride completed
  const getAllRides = () => {
    onSnapshot(q1, (snapshot) =>{
        setRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data(), type: 'rider'})))}
    )
  }

  const q2 = query(colRef, where("driverId", "==", userId), where("status", "==", 2)) // 2 means ride completed
  const getAllDrives = () => {
    onSnapshot(q2, (snapshot) =>{
        setDrives(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data(), type: 'driver'})))}
    )
  }

  useEffect(()=>{getAllRides()}, []) 
  useEffect(()=>{getAllDrives()}, []) 

  const allRides = [...rides, ...drives]

  const FormatNumber = (num)=> {
    console.log(num);
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  const TREEIMAGE = 'data:image/jpeg;base64,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'
  return (
    <div>
      <div> 
      {allRides.length >0 
      ? (
        <div>
          {allRides.map((ride) => (
            <div key={ride.id} >
              <p> ------------------</p>
              <p> Role: {ride.type === 'rider' ? "Rider" : "Driver"}</p>
              <p> Time: {ride.timestamp.toDate().toDateString()}</p>
              <p> From: {ride.pickUpAddress}</p>
              <p> To: {ride.dropOffAddress}</p>
              <div onMouseEnter={() => setIsShownHoverContent(true)} onMouseLeave={() => setIsShownHoverContent(false)}>
                <p> Distance (km): {FormatNumber(ride.distance/1000)}</p>
                <p> Cost ($): {FormatNumber(ride.distance/1000 * 0.621371 * 0.585)}</p>
                {/* m to km, to miles, 58.5 cents for IRS reimbursement rate */}
                <p> CO2 Saved(gram) : {FormatNumber(ride.distance/1000 * 650)}</p>
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
        <img src={TREEIMAGE} alt="Save Planet"/>
      </div>
  );
};

export default RidesHistory;
