import React, {useState, useEffect} from 'react';
import { useAuth } from '../auth';
import { db } from '../firebase';
import { collection, onSnapshot, query, where} from "firebase/firestore"


const RidesHistory = () => {
  const { userId } = useAuth();
  const [ rides, setRides] = useState([]) // history as rider
  const [ drives, setDrives] = useState([]) // history as driver
  const [isShownHoverContent, setIsShownHoverContent] = useState(false); // show some information when hovering over text
  const [type, setType] = useState("");  // see all, driving history, or riding history
  const [sort ,setSort] = useState(""); // sorting choice

  const colRef = collection(db, 'Rides');
  const q1 = query(colRef, where("riderId", "==", userId), where("status", "==", 2))
  const getAllRides = () => {
    onSnapshot(q1, (snapshot) =>{
        setRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data(), type: 'rider'})))}
    )
  }
  const q2 = query(colRef, where("driverId", "==", userId), where("status", "==", 2))
  const getAllDrives = () => {
    onSnapshot(q2, (snapshot) =>{
        setDrives(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data(), type: 'driver'})))}
    )
  }

  useEffect(()=>{getAllRides()}, [])
  useEffect(()=>{getAllDrives()}, [])
  let allRides = [...rides, ...drives]
  if (type === 'Rides') allRides = [...rides]
  else if (type === 'Drives') allRides = [...drives]

  if (sort === 'dateDesc') {
    allRides.sort(function(a,b){
      return a.timestamp > b.timestamp ? -1 : 1
    })
  }
  else if (sort === 'dateAesc') {
    allRides.sort(function(b,a){
      return a.timestamp > b.timestamp ? -1 : 1
    })
  }
  else if (sort === 'distDesc') {
    allRides.sort(function(a,b){
      return a.distance > b.distance ? -1 : 1
    })
  }
  else {
    allRides.sort(function(b,a){
      return a.distance > b.distance ? -1 : 1
    })
  }

  const FormatNumber = (num)=> {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  const TREEIMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3mrA7m7HY1x2ySK7cFs9XTVg6KvhpH6Uw36h1JQf4ng&s'

  return (
    <div>
      <div>
        <h3 className='text-center text-4xl my-3' style={{ fontFamily: 'Oswald' }}>Rider History</h3>
      {(rides.length + drives.length) >0
      ? (
        <div className='m-3'>
          <div className='flex my-2'>
              <p className='mx-2'>Filter by type:</p>
              <select
                name='type'
                value={type}
                onChange={(evt)=>setType(evt.target.value)}>
                <option value= "All" >View All Rides</option>
                <option value= "Rides" >See my Riding History Only</option>
                <option value= "Drives">See my Driving History Only</option>
              </select>
            </div>

            <div className='flex my-2'>
              <p className='mx-2'>Filter by time or distance:</p>
              <select
                name='sort'
                value={sort}
                onChange={(evt)=>setSort(evt.target.value)}>
                <option value= "dateDesc" >Sort By Descending Time</option>
                <option value= "dateAesc" >Sort By Ascending Time</option>
                <option value= "distDesc">Sort By Descending Distance</option>
                <option value= "distAesc">Sort By Ascending Distance</option>
              </select>
            </div>

          <div className='grid gap-6 my-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
            {allRides.map((ride) => (
              <div key={ride.id} className='ml-3 card w-auto bg-base-100 shadow-xl my-3'>
                {/* <span className='w-full border-b border-gray-300'></span> */}
                <div className='card-body'>
                  <p className='font-semibold'>Role: {ride.type === 'rider' ? "Rider" : "Driver"}</p>
                  <p>Time: {ride.timestamp.toDate().toDateString()}</p>
                  <p>From: {ride.pickUpAddress}</p>
                  <p>To: {ride.dropOffAddress}</p>
                  <div onMouseEnter={() => setIsShownHoverContent(true)} onMouseLeave={() => setIsShownHoverContent(false)}>
                    <p> Distance (km): {FormatNumber(ride.distance/1000)}</p>
                    <p> Cost ($): {FormatNumber(ride.distance/1000 * 0.621371 * 0.585)}</p>
                    {/* m to km, to miles, 58.5 cents for IRS reimbursement rate */}
                    <p> Carbon Footprint(kg) : {FormatNumber(ride.distance/1000 * 650 /1000)}</p>
                    {/* based on BBC article: https://www.bbc.com/future/article/20200317-climate-change-cut-carbon-emissions-from-your-commute */}
                  </div>
                </div>
              </div>
            ))}
            </div>

            {isShownHoverContent && (
                    <div className="footer items-center p-4 bg-neutral text-neutral-content">
                      <p>Cost is calculated based on IRS reimbursement rate  </p>
                      <p>Carbon Saved is calculated based on the emission of CO2 for an average passenger vehicle</p>
                    </div>
                  )}
        </div>
      )
      : <>
          <p> No rides Found, No Carbon Saved Yet</p>
          <img src={TREEIMAGE} alt="Save Planet"/>
        </>
      }

      </div>
      </div>
  );
};

export default RidesHistory;
