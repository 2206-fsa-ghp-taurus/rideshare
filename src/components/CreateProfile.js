import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useAuth } from '../auth';
import { auth, db, storage } from '../firebase';
import { doc, setDoc} from "firebase/firestore"
import { ref, getStorage, uploadBytes,getDownloadURL } from "firebase/storage";

const DEFAULTimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7TEM9d91DuHZgbmbtlx4tlSl-FJQKvREDA&usqp=CAU'

const CreateProfile= () => {
  const { userId } = useAuth(); 
  const history = useHistory(); // sending users to other places 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureUrl, setPictureUrl] = useState(DEFAULTimg);
  const fileInputRef = useRef();

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
  useEffect(() => () => {
    if (pictureUrl.startsWith('blob:')) { // for memory management 
      URL.revokeObjectURL(pictureUrl);
    }
  }, [pictureUrl]);

  const handleSaveUser = async (event) => {
    event.preventDefault();
    const userData = { firstName, lastName, pictureUrl, phone };
    if (pictureUrl.startsWith('blob:')) { // save the image to Cloud , if starts with 'blob:'
      userData.pictureUrl = await savePicture(pictureUrl, userId); 
    }
    console.log('this user data', userData)
    await setDoc(doc(db, 'Users', userId), userData)
    // history.goBack(); 
    history.push('/hello');
  };

  return (
    <div>
      <h2> Create Profile </h2>
      <form onSubmit = {handleSaveUser}>
        <label htmlFor='firstName'>First Name</label>
        <input name='firstName' type='text' value = {firstName} onChange = {(event)=> setFirstName(event.target.value)}/>

        <label htmlFor='lastName'>Last Name</label>
        <input name='lastName' type='text' value = {lastName} onChange = {(event) => setLastName(event.target.value)}/>

        <label htmlFor='phone'>Phone</label>
        <input name='phone' type='text' value = {phone} onChange = {(event) => setPhone(event.target.value)}/>

        <div>
          <label htmlFor='image'>Upload your picture</label>
          <input name='image' type='file' accept='image/*' hidden ref={fileInputRef} onChange={handlePictureChange} />
          <img src={pictureUrl} alt="" style={{ cursor: 'pointer' }}
                onClick={()=>fileInputRef.current.click()}
              />
        </div>

        <button > Save </button>
      </form>
    </div>
  );
};

export default CreateProfile;
