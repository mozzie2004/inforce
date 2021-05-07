import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store/store';
import firebase from 'firebase/app';
import App from './components/app';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

firebase.initializeApp({
  apiKey: "AIzaSyCtMcuJy88Zlq2bJYu-AT7LCMqwERJ-U4s",
  authDomain: "inforce-ac4e6.firebaseapp.com",
  projectId: "inforce-ac4e6",
  storageBucket: "inforce-ac4e6.appspot.com",
  messagingSenderId: "1011254190106",
  appId: "1:1011254190106:web:a7b2972bc8dd2c01bc71a3"
});

ReactDOM.render(
    <Provider store={store}>
      <Router>
      <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);
