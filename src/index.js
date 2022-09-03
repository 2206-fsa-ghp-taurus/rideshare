import React from 'react';
import ReactDOM from 'react-dom/client';
import './';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import * as CONSTANTS from './constants/constants';
import { CometChat } from '@cometchat-pro/chat';

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(CONSTANTS.REGION)
  .build();
CometChat.init(CONSTANTS.APP_ID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
    // You can now call login function.
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    );
  },
  (error) => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
