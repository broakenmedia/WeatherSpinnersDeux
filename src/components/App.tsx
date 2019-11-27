import React from 'react';
import '../styles/App.css';
import SpinnersBackground from './SpinnersBackground';
import { Provider } from 'react-redux';
import store from '../redux/Store';

class App extends React.Component{
  render() {
      return (
          <Provider store={store}>
            <SpinnersBackground spinnerCount={40}/>
          </Provider>
      );
  }
}

export default (App);
