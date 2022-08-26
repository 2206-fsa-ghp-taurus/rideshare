import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot} from "firebase/firestore"
import { Link } from 'react-router-dom';

const UserAccount= () => {
    const {userId} = useAuth();
    const [user, setUser] = useState({});
    const getUserInfo = () => {onSnapshot(doc(db, 'Users', userId), (doc) =>{
          setUser(doc.data())
    })}
    useEffect(()=>{getUserInfo()}, []) // so only sending request once 
    console.log('this is the user', user);
    const DEFAULTimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7TEM9d91DuHZgbmbtlx4tlSl-FJQKvREDA&usqp=CAU'
    return (
        <>
            <div class="avatar">
            <div class="mb-8 rounded-full w-14 h-14">
                <img src= {user.pictureUrl ? user.pictureUrl: DEFAULTimg}/>
            </div>
            </div> 
            {/* all users will have email, footprint and wallet except for the ones we manually added to auth*/}
            <p> NAME: {user?.firstName} {user?.lastName}</p>  
            <p> EMAIL: {user?.emai }  </p>
            <p> PHONE: {user?.phone} </p>
            <p> TOTAL CARBON FOOTPRINT: {user.totalFootPrint ? user.totalFootPrint: 0} </p>
            <p> WALLET($): {user.wallet ? user.wallet : 100} </p>
            <Link to= '/createProfile'> <button class="btn rounded-full"> Edit Profile</button></Link>
        </>
    )
}
export default UserAccount;