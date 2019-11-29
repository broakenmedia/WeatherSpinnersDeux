import React from 'react';
import '../styles/App.css';
import SpinnersBackground from './SpinnersBackground';
import ValuesDisplay from './ValuesDisplay';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import SearchBar from './SearchBar';
import _debounce from 'lodash.debounce';

class App extends React.Component{

  state = { controlsHidden: false };

  onControlsShown(){
    this.setState({controlsHidden:false});
  }

  onControlsHidden(){
    this.setState({controlsHidden:true});
  }

  /* Reset state on page resize to maintain responsiveness */
  debounce = _debounce(() => window.location.reload(), 200)

  componentDidMount() {
    window.addEventListener('resize', this.debounce)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounce)
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
