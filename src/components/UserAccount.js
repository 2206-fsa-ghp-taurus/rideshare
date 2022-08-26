import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useAuth } from '../auth';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, onSnapshot} from "firebase/firestore"
import { ref, getStorage, uploadBytes,getDownloadURL } from "firebase/storage";


const UserAccount= () => {
    const {userId} = useAuth();
    const [user, setUser] = useState({});
    const getUser = () => {onSnapshot(doc(db, 'Users', userId), (doc) =>{
          setUser(doc.data())
    })}
    useEffect(()=>{getUser()}, []) // so only sending request once 
    console.log('this is the user', user);
    const DEFAULTimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7TEM9d91DuHZgbmbtlx4tlSl-FJQKvREDA&usqp=CAU'
    return (
        <>
            <div class="avatar">
            <div class="mb-8 rounded-full w-14 h-14">
                <img src= {user.pictureUrl ? user.pictureUrl: DEFAULTimg}/>
            </div>
            </div> 
            {/* all users will have email, footprint and wallet for sure; some users may sign up without entering in details */}
            <p> NAME: {user?.firstName} {user?.lastName}</p>  
            <p> EMAIL: {user?.email} </p>
            <p> PHONE: {user?.phone} </p>
            <p> TOTAL CARBON FOOTPRINT: {user?.totalFootPrint} </p>
            <p> WALLET($): {user?.wallet} </p>
        </>
    )
}
export default UserAccount;