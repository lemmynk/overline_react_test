import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { buildIconsLibrary } from './config';
import * as serviceWorker from './serviceWorker';

import './app/i18n';

const root = document.getElementById('root');
if (root) {
  buildIconsLibrary();

  // eslint-disable-next-line react/jsx-filename-extension
  ReactDOM.render(<App />, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
