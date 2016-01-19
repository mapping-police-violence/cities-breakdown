/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
 */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file

import 'file?name=[name].[ext]!../.htaccess';
import 'file?name=[name].[ext]!../manifest.json';
import 'file?name=[name].[ext]!../serviceworker.js';

import '../css/main.css';

import thunk from 'redux-thunk';
import FontFaceObserver from 'fontfaceobserver';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import rootReducer from './reducers/rootReducer';
import CitiesGraphic from './components/CitiesGraphic.react';

// Check for ServiceWorker support before trying to install it
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js').then(() => {
    // Registration was successful
  }).catch(() => {
    // Registration failed
  });
} else {
  // No ServiceWorker Support
}

// Import all the third party stuff

// Observer loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add the js-open-sans-loaded class to the body
openSansObserver.check().then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, () => {
  document.body.classList.remove('js-open-sans-loaded');
});

// Import the pages

// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder

// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware =
    applyMiddleware(thunk)(
      (window.devToolsExtension ? window.devToolsExtension() : (f) => f)(createStore));
const store = createStoreWithMiddleware(rootReducer);

/* eslint-disable max-len, global-require */
// Make reducers hot reloadable, see
// http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;

    store.replaceReducer(nextRootReducer);
  });
}

/* eslint-enable */

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Provider store={store}>
    <CitiesGraphic />
  </Provider>,
  document.getElementById('cities-graphic')
);
