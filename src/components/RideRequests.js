import React, {useEffect, useState} from "react";
import {useMap} from "react-leaflet";
import {useAuth} from "../auth";
import {db} from "../firebase";
import L from "leaflet";
import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import UserDetails from "./UserDetails";
import {MapContainer, TileLayer} from "react-leaflet";
import "./UserMap.css";

function RideRequests() {
  const {userId} = useAuth();
  const history = useHistory()
  const [requests, setRideRequests] = useState([]);
  const [rideInProgress, setRideInProgress] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const getRideRequests = async () => {
    onSnapshot(
      query(
        collection(db, "Rides"),
        where("status", "==", 0),
        where("driverId", "==", `${userId}`)
      ),
      async (snapshot) =>
        await setRideRequests(
          snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        )
    );
  };

  const rideAccepted = async () => {
    onSnapshot(
      query(
        collection(db, "Rides"),
        where("status", "==", 1),
        where("driverId", "==", `${user.userId}`)
      ),
      async (snapshot) =>
        await setMarkers(
          snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        )
    );
  };

  useEffect(() => {
    getRideRequests();
    rideAccepted();
    setRideInProgress(true);
  }, []);

  //setting group of markers in case we allow more than 1 rider.
  const ShowMarker = () => {
    const map = useMap();
    let markerBounds = L.latLngBounds();
    if (markers.length && markers.length > 0) {
      markers.forEach((marker) => {
        let markerIcon = L.marker(
          [marker.riderPickUp.lat, marker.riderPickUp.lng],
          {icon: riderIcon}
        ).addTo(map);
        markerIcon.bindPopup(`${marker.riderId}`);
        markerBounds.extend([marker.riderPickUp.lat, marker.riderPickUp.lng]);
      });
      map.fitBounds(markerBounds);
    }
    return null;
  };

  const acceptRide = async (riderRequest) => {
    const rideRef = doc(db, "Rides", riderRequest.id);
    if (user) {
      await updateDoc(rideRef, {
        status: 1,
      });
      rideAccepted();
      setRideInProgress(true);
    }
  };

  const riderIcon = L.icon({
    iconUrl: "http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png",
    iconSize: [28, 45],
    iconAnchor: [20, 41],
    popupAnchor: [2, -40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  return (
    <div>
      <div className="container">
        <MapContainer center={position} zoom={8} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {rideInProgress ? <ShowMarker /> : ""}
        </MapContainer>
      </div>
      <div>
        {requests && requests.length !== 0 ? (
          <div className="row col-8 justify-content-center">
            {requests.map((request) => (
              <div key={request.id} className="card product-card shadow-lg">
                <div className="card-body">
                  <p className="my-4 card-title product-name text-center font-weight-bold">
                    Requested Ride:
                  </p>
                  <UserDetails userId={request.riderId} />
                  <button
                    className="btn rounded-full"
                    id={request.id}
                    onClick={() => acceptRide(request)}
                  >
                    Accept Ride
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No rides requested</div>
        )}
      </div>
    </div>
  );
}

export default RideRequests;
