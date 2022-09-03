import React from 'react';
import { CometChatMessages } from '../cometChat/src';

const Messaging = (props) => {
  const { driverId } = props;
  const { riderId } = props;
  const { isDriver } = props;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <CometChatMessages chatWithUser={isDriver ? riderId : driverId} />
    </div>
  );
};

export default Messaging;
