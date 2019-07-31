// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const root = document.getElementById('root');
if (root) {
  // buildFontsLibrary();

  ReactDOM.render(<App />, root);
}
