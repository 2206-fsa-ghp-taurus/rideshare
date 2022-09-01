import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth, db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CometChat } from '@cometchat-pro/chat';
import * as CONSTANTS from '../constants/constants';

const DEFAULTimg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7TEM9d91DuHZgbmbtlx4tlSl-FJQKvREDA&usqp=CAU';

const CreateProfile = () => {
  const { userId } = useAuth();
  const history = useHistory(); // sending users to other places
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureUrl, setPictureUrl] = useState(DEFAULTimg);
  const [carMake, setMake] = useState('');
  const [carModel, setModel] = useState('');
  const [carColor, setColor] = useState('');
  const [carLicense, setLicense] = useState('');
  const fileInputRef = useRef();

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
  useEffect(
    () => () => {
      if (pictureUrl.startsWith('blob:')) {
        // for memory management
        URL.revokeObjectURL(pictureUrl);
      }
    },
    [pictureUrl]
  );

  const handleSaveUser = async (event) => {
    event.preventDefault();
    const userData = {
      firstName,
      lastName,
      pictureUrl,
      phone
    };

    // save car details if entered
    if (carMake) Object.assign(userData, {carMake})
    if (carModel) Object.assign(userData, {carModel})
    if (carColor) Object.assign(userData, {carColor})
    if (carLicense) Object.assign(userData, {carLicense})

    if (pictureUrl.startsWith('blob:')) {
      // save the image to Cloud , if starts with 'blob:'
      userData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    console.log('this user data', userData, carMake);
    await updateDoc(doc(db, 'Users', userId), userData); // change from setDoc to updateDoc otherwise original fields are overwritten
    // history.goBack();

    let cometUser = new CometChat.User(userId);
    cometUser.setName(firstName);

    CometChat.createUser(cometUser, CONSTANTS.AUTH_KEY).then(
      (user) => {
        console.log('user created', user);
      },
      (error) => {
        console.log('error', error);
      }
    );
    history.push('/selectride');
  };

  return (
    <div>
      <h2> Create Profile </h2>
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

        <label className='input-group' htmlFor='phone'>
          Phone
        </label>
        <input
          className='input input-bordered'
          name='phone'
          type='text'
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
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
        <label class='input-group' htmlFor='carMake'>
          Car Make
        </label>
        <input
          class='input input-bordered'
          name='carMake'
          type='text'
          value={carMake}
          onChange={(event) => event.target.value ? setMake(event.target.value) : ""}
        />

        <label class='input-group' htmlFor='carModel'>
          Model
        </label>
        <input
          class='input input-bordered'
          name='carModel'
          type='text'
          value={carModel}
          onChange={(event) => event.target.value ? setModel(event.target.value) : ""}
        />

        <label class='input-group' htmlFor='carColor'>
          Color
        </label>
        <input
          class='input input-bordered'
          name='carColor'
          type='text'
          value={carColor}
          onChange={(event) =>  event.target.value ? setColor(event.target.value) : ""}
        />

        <label class='input-group' htmlFor='carLicense'>
          License Plate
        </label>
        <input
          class='input input-bordered'
          name='carLicense'
          type='text'
          value={carLicense}
          onChange={(event) => event.target.value ? setLicense(event.target.value) : ""}
        />

        <button className='btn rounded-full'> Save </button>
      </form>
    </div>
  );
};

export default CreateProfile;
