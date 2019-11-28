import React from 'react';
import '../styles/App.css';
import SpinnersBackground from './SpinnersBackground';
import ValuesDisplay from './ValuesDisplay';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import SearchBar from './SearchBar';

class App extends React.Component{
  render() {
      return (
          <Provider store={store}>
            <SearchBar/>
            <ValuesDisplay/>
            <SpinnersBackground spinnerCount={40}/>
          </Provider>
      );
  }
}

export default (App);
