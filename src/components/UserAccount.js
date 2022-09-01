import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot, deleteDoc} from "firebase/firestore"
import { deleteUser } from 'firebase/auth'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const UserAccount= () => {
    const {userId} = useAuth();
    const [user, setUser] = useState({});
    const getUserInfo = () => {onSnapshot(doc(db, 'Users', userId), (doc) =>{
          setUser(doc.data())
    })}
    useEffect(()=>{getUserInfo()}, []) // so only sending request once

    const history = useHistory();
    const handleDelete = async() => { // delete entry in user table, also delete authentication
        await deleteDoc(doc(db, 'Users', userId));
        await deleteUser(auth.currentUser);
        window.alert('Account Deleted');
        history.replace('/home');
    }

    // if (!user) return (
    //     <p> It is one of our test users that we grants authentication but did not create entry in user table</p>
    // )
    return (
        <>
            <div className="avatar">
            <div className="mb-8 rounded-full w-14 h-14">
                <img src= {user?.pictureUrl}/>
            </div>
            </div>
            {/* all users will have email, footprint and wallet except for the ones we manually added to auth*/}
            <p> NAME: {user?.firstName} {user?.lastName}</p>
            <p> EMAIL: {user?.email }  </p>
            <p> PHONE: {user?.phone} </p>
            <p> TOTAL CARBON FOOTPRINT (gram): {user?.totalFootPrint} </p>
            <p> WALLET($): {user?.wallet} </p>
            <Link to= '/ridesHistory'> <button className="btn rounded-full"> See My Carbon Footprint</button></Link>
            <p> ---------- </p>
            <p> Car Details </p>
            <p> MAKE: {user?.carMake} </p>
            <p> MODEL: {user?.carModel} </p>
            <p> COLOR: {user?.carColor} </p>
            <p> LICENSE: {user?.carLicense} </p>
            <Link to= '/editProfile'> <button className="btn rounded-full"> Edit Profile</button></Link>
            <button className="btn rounded-full" onClick = {handleDelete}> Delete Account
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </>
    )
}
export default UserAccount;
