import React from 'react';
import '../styles/App.css';
import SpinnersBackground from './SpinnersBackground';
import ValuesDisplay from './ValuesDisplay';
import { Provider } from 'react-redux';
import store from '../redux/Store';

class App extends React.Component{
  render() {
      return (
          <Provider store={store}>
            <ValuesDisplay/>
            <SpinnersBackground spinnerCount={40}/>
          </Provider>
      );
  }
}

export default (App);
