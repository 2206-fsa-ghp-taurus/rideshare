import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth, db, storage } from '../firebase';
import { doc, updateDoc, onSnapshot} from "firebase/firestore"
import { ref, getStorage, uploadBytes,getDownloadURL } from "firebase/storage";


const EditProfile= () => {
  const { userId } = useAuth();
  const history = useHistory(); // sending users to other places
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState();
  const [license, setLicense] = useState("");
  const fileInputRef = useRef();
  const getUserInfo = () => {onSnapshot(doc(db, 'Users', userId), (doc) =>{
        setFirstName(doc.data().firstName);
        setLastName(doc.data().lastName)
        setPhone(doc.data().phone)
        setPictureUrl(doc.data().pictureUrl)
        if(doc.data().make) setMake(doc.data().make);
        if(doc.data().model) setModel(doc.data().model)
        if(doc.data().color) setColor(doc.data().color)
        if(doc.data().license) setLicense(doc.data().license)
  })}
  useEffect(()=>{getUserInfo()}, []) // so only sending request once
  console.log('before edit user profile', firstName, lastName)

  const savePicture = async (blobUrl, userId) => { // save picture to firebase storage
    const response = await fetch(blobUrl);
    const blob = await response.blob(); // getting the blob object
    console.log('blob', blob)
    const storageRef = ref(storage, `/users/${userId}/profilePicture`); // path userFolder-> picture folder
    const snapshot = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(snapshot.ref);
    console.log('url',url)
    return url;
  }

  const handlePictureChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);// generate a url for the picture
      setPictureUrl(pictureUrl);
    }
  };

  const handleSaveUser = async (event) => {
    event.preventDefault();
    const userData = { firstName, lastName, pictureUrl, phone, make, model, color, license };
    if (pictureUrl.startsWith('blob:')) { // save the image to Cloud , if starts with 'blob:'
      userData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    console.log('this user data', userData)
    await updateDoc(doc(db, 'Users', userId), userData) // change from setDoc to updateDoc otherwise original fields are overwritten
    history.goBack();
  };

  return (
    <div>
      <h2> Edit Profile </h2>
      <form className = 'form-control' onSubmit = {handleSaveUser}>
        <label className = 'input-group' htmlFor='firstName'>First Name</label>
        <input className="input input-bordered" name='firstName' type='text' value = {firstName} onChange = {(event)=> setFirstName(event.target.value)} required/>

        <label className = 'input-group' htmlFor='lastName'>Last Name</label>
        <input className="input input-bordered" name='lastName' type='text' value = {lastName} onChange = {(event) => setLastName(event.target.value)} required/>

        <label className = 'input-group' htmlFor='phone'>Phone</label>
        <input className="input input-bordered" name='phone' type='text' value = {phone} onChange = {(event) => setPhone(event.target.value)} required/>

        <div>
          <label htmlFor='image'>Upload your picture</label>
          <input name='image' type='file' accept='image/*'  ref={fileInputRef} onChange={handlePictureChange} />
          <img id = 'profile-image' src={pictureUrl} alt="" style={{ cursor: 'pointer' }}
                // onClick={()=>fileInputRef.current.click()}
              />
        </div>

        <h3>Car Details</h3>
        <label class = 'input-group' htmlFor='make'>Car Make</label>
        <input class="input input-bordered" name='make' type='text' value = {make} onChange = {(event) => setMake(event.target.value)}/>

        <label class = 'input-group' htmlFor='model'>Model</label>
        <input class="input input-bordered" name='model' type='text' value = {model} onChange = {(event) => setModel(event.target.value)}/>

        <label class = 'input-group' htmlFor='color'>Color</label>
        <input class="input input-bordered" name='color' type='text' value = {color} onChange = {(event) => setColor(event.target.value)}/>

        <label class = 'input-group' htmlFor='license'>License Plate</label>
        <input class="input input-bordered" name='license' type='text' value = {license} onChange = {(event) => setLicense(event.target.value)}/>

        <button className="btn rounded-full" > Save </button>
      </form>
    </div>
  );
};

export default EditProfile;
