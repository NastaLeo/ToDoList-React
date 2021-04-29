import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';
import {Provider} from 'react-redux';
import store from './redux/store.js';

import './index.scss';
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

