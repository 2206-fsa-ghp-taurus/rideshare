import React from 'react';

const CreateProfile = () => {
  return (
    <div>
      <form>
        <label htmlFor='firstName'>First Name</label>
        <input name='firstName' type='text' />

        <label htmlFor='lastName'>Last Name</label>
        <input name='lastName' type='text' />

        <label htmlFor='email'>Email</label>
        <input name='email' type='text' />

        <label htmlFor='phone'>Phone</label>
        <input name='phone' type='text' />

        <label htmlFor='image'>Upload your picture</label>
        <input name='image' type='file' accept='image/*' />
      </form>
    </div>
  );
};

export default CreateProfile;
