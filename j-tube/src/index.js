import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk'
import { reducers } from './reducers'
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';


const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='239190893562-c9ugfhkvr6d2juveducbjc76jk14n5fu.apps.googleusercontent.com'>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </GoogleOAuthProvider>
);

