import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';
import { db, storage } from '../firebase';
import { doc, updateDoc, onSnapshot, deleteField } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProfile = () => {
  const { userId } = useAuth();
  const history = useHistory(); // sending users to other places
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState(0);

  const [pictureUrl, setPictureUrl] = useState('');
  const [carMake, setMake] = useState("");
  const [carModel, setModel] = useState('');
  const [carColor, setColor] = useState("");
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
      setGoal(doc.data().goal);
    });

  };
  useEffect(() => {
    getUserInfo();
  }, []); // so only sending request once

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
    const userData = { firstName, lastName, pictureUrl, phone, goal};

    if (carMake) Object.assign(userData, { carMake })
    if (carModel) Object.assign(userData, { carModel });
    if (carColor) Object.assign(userData, { carColor });
    if (carLicense) Object.assign(userData, { carLicense });

    if (pictureUrl.startsWith('blob:')) {
      // save the image to Cloud , if starts with 'blob:'
      userData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    console.log('this user data', userData);
    await updateDoc(doc(db, 'Users', userId), userData); // change from setDoc to updateDoc otherwise original fields are overwritten

    if(userData.carMake === undefined) {
      await updateDoc(doc(db, 'Users', userId), {
        carMake: deleteField()
      })
    }
    if(userData.carModel === undefined) {
      await updateDoc(doc(db, 'Users', userId), {
        carModel: deleteField()
      })
    }
    if(userData.carColor === undefined) {
      await updateDoc(doc(db, 'Users', userId), {
        carColor: deleteField()
      })
    }
    if(userData.carLicense === undefined) {
      await updateDoc(doc(db, 'Users', userId), {
        carLicense: deleteField()
      })
    }

    history.goBack();
  };

  return (
    <div>
      <h2 className='text-center font-bold my-5 text-l'> Edit Profile </h2>
      <form className='form-control mx-5' onSubmit={handleSaveUser}>

      <div className='grid gap-6 mb-6 md:grid-cols-2'>

        <div>
        <label className='input-group' htmlFor='firstName'>
          First Name
        </label>
        <input
          className='input input-bordered w-full'
          placeholder='First Name'
          name='firstName'
          type='text'
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
        </div>

        <div>
        <label className='input-group' htmlFor='lastName'>
          Last Name
        </label>
        <input
          className='input input-bordered w-full'
          placeholder='Last Name'
          name='lastName'
          type='text'
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
        </div>

        <div>
        <label className='input-group' htmlFor='goal'>
          Carbon Savings Goal (kg){' '}
        </label>
        <input
          className='input input-bordered w-full'
          placeholder='Carbon Savings Goal (kg)'
          name='goal'
          type='number'
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          required
        />
        </div>

        <div>
          <label htmlFor='image'>Upload your picture</label>
          <input
            name='image'
            type='file'
            accept='image/*'
            className='my-2'
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
        </div>

        <h3 className='text-center font-bold my-5 text-l'>Car Details</h3>

        <div className='grid gap-6 mb-6 md:grid-cols-2'>

          <div>
        <label className='input-group' htmlFor='carMake'>
          Car Make
        </label>
        <input
          className='input input-bordered w-full'
          name='carMake'
          placeholder='Car Make'
          type='text'
          value={carMake}
          onChange={(event) => setMake(event.target.value)}
        />
        </div>

        <div>
        <label className='input-group' htmlFor='carModel'>
          Model
        </label>
        <input
          className='input input-bordered w-full'
          placeholder='Model'
          name='carModel'
          type='text'
          value={carModel}
          onChange={(event) => setModel(event.target.value)}
        />
        </div>

        <div>
        <label className='input-group' htmlFor='carColor'>
          Color
        </label>
        <input
          className='input input-bordered w-full'
          name='carColor'
          placeholder='Color'
          type='text'
          value={carColor}
          onChange={(event) => setColor(event.target.value)}
        />
        </div>

        <div>
        <label className='input-group' htmlFor='carLicense'>
          License Plate
        </label>
        <input
          className='input input-bordered w-full'
          name='carLicense'
          placeholder='License'
          type='text'
          value={carLicense}
          onChange={(event) => setLicense(event.target.value)}
        />
        </div>
        </div>

        <button className='btn btn-outline bg-success py-2 mx-auto' onClick={handleSaveUser}>
          {' '}
          Save{' '}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
