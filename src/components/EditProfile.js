import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth, db, storage } from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProfile = () => {
  const { userId } = useAuth();
  const history = useHistory(); // sending users to other places
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [carMake, setMake] = useState('');
  const [carModel, setModel] = useState('');
  const [carColor, setColor] = useState('');
  const [carLicense, setLicense] = useState('');
  const fileInputRef = useRef();
  const getUserInfo = () => {
    onSnapshot(doc(db, 'Users', userId), (doc) => {
      setFirstName(doc.data().firstName);
      setLastName(doc.data().lastName);
      setPhone(doc.data().phone);
      setPictureUrl(doc.data().pictureUrl);
      setMake(doc.data().carMake);
      setModel(doc.data().carModel);
      setColor(doc.data().carColor);
      setLicense(doc.data().carLicense);
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []); // so only sending request once
  console.log('before edit user profile', firstName, lastName);

  const savePicture = async (blobUrl, userId) => {
    // save picture to firebase storage
    const response = await fetch(blobUrl);
    const blob = await response.blob(); // getting the blob object
    console.log('blob', blob);
    const storageRef = ref(storage, `/users/${userId}/profilePicture`); // path userFolder-> picture folder
    const snapshot = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(snapshot.ref);
    console.log('url', url);
    return url;
  };

  const handlePictureChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file); // generate a url for the picture
      setPictureUrl(pictureUrl);
    }
  };

  const handleSaveUser = async (event) => {
    event.preventDefault();
    const userData = { firstName, lastName, pictureUrl, phone };

    if (carMake) Object.assign(userData, { carMake });
    if (carModel) Object.assign(userData, { carModel });
    if (carColor) Object.assign(userData, { carColor });
    if (carLicense) Object.assign(userData, { carLicense });

    if (pictureUrl.startsWith('blob:')) {
      // save the image to Cloud , if starts with 'blob:'
      userData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    console.log('this user data', userData);
    await updateDoc(doc(db, 'Users', userId), userData); // change from setDoc to updateDoc otherwise original fields are overwritten
    history.goBack();
  };

  return (
    <div>
      <h2> Edit Profile </h2>
      <form className='form-control' onSubmit={handleSaveUser}>
        <label className='input-group' htmlFor='firstName'>
          First Name
        </label>
        <input
          className='input input-bordered'
          name='firstName'
          type='text'
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />

        <label className='input-group' htmlFor='lastName'>
          Last Name
        </label>
        <input
          className='input input-bordered'
          name='lastName'
          type='text'
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />

        <div>
          <label htmlFor='image'>Upload your picture</label>
          <input
            name='image'
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handlePictureChange}
          />
          <img
            id='profile-image'
            src={pictureUrl}
            alt=''
            style={{ cursor: 'pointer' }}
            // onClick={()=>fileInputRef.current.click()}
          />
        </div>

        <h3>Car Details</h3>
        <label className='input-group' htmlFor='carMake'>
          Car Make
        </label>
        <input
          className='input input-bordered'
          name='carMake'
          type='text'
          value={carMake}
          onChange={(event) =>
            event.target.value ? setMake(event.target.value) : ''
          }
        />

        <label className='input-group' htmlFor='carModel'>
          Model
        </label>
        <input
          className='input input-bordered'
          name='carModel'
          type='text'
          value={carModel}
          onChange={(event) =>
            event.target.value ? setModel(event.target.value) : ''
          }
        />

        <label className='input-group' htmlFor='carColor'>
          Color
        </label>
        <input
          className='input input-bordered'
          name='carColor'
          type='text'
          value={carColor}
          onChange={(event) =>
            event.target.value ? setColor(event.target.value) : ''
          }
        />

        <label className='input-group' htmlFor='carLicense'>
          License Plate
        </label>
        <input
          className='input input-bordered'
          name='carLicense'
          type='text'
          value={carLicense}
          onChange={(event) =>
            event.target.value ? setLicense(event.target.value) : ''
          }
        />

        <button className='btn rounded-full' onClick={handleSaveUser}>
          {' '}
          Save{' '}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
