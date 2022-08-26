import React, { useEffect, useContext } from 'react';
import Context from './Context';

export const ChatSetup = () => {
  const { cometChat, setCometChat } = useContext(Context);

  useEffect(() => {
    initCometChat();
  }, []);

  /**
   * init comet chat.
   */
  const initCometChat = async () => {
    const { CometChat } = await import('@cometchat-pro/chat');
    const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      (error) => {}
    );
  };
};
