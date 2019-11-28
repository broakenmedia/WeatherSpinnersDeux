import React from 'react';
import '../styles/App.css';
import SpinnersBackground from './SpinnersBackground';
import ValuesDisplay from './ValuesDisplay';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import SearchBar from './SearchBar';

class App extends React.Component{

  state = { controlsHidden: false };

  onControlsShown(){
    this.setState({controlsHidden:false});
  }

  onControlsHidden(){
    this.setState({controlsHidden:true});
  }

  render() {
      return (
          <Provider store={store}>
            { this.state.controlsHidden ? <div className="btnShowControls" onClick={this.onControlsShown.bind(this)}>Show Controls</div> : <></>}
            <SearchBar onCloseControlsClicked={this.onControlsHidden.bind(this)} controlsHidden={this.state.controlsHidden}/>
            <ValuesDisplay/>
            <SpinnersBackground spinnerCount={40}/>
          </Provider>
      );
  }
}

export default (App);
