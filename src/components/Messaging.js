import React from 'react';
import { CometChatMessages } from '../cometChat/src';

const Messaging = (props) => {
  const { driverId, riderId, isDriver } = props;

  return (
    <div style={{ width: '50vw', height: '35vh' }} className='outline-6'>
      <CometChatMessages chatWithUser={isDriver ? riderId : driverId} />
    </div>
  );
};

export default Messaging;
