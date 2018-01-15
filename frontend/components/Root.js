import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import App from './App';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <App />
      </Provider>
    );
  }
}
