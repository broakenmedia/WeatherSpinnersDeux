import React from "react";
import { connect } from 'react-redux';
import {fetchWeatherDataSuccess, fetchWeatherDataError, fetchWeatherDataPending} from '../redux/reducers/weatherReducer';
import weatherMapper from '../utils/weatherDataMapper';
import '../styles/ValuesDisplay.css';

export interface OwnProps {
    weatherData?: any,
    pending?: boolean,
    error?: string
}

class ValuesDisplay extends React.Component<OwnProps>{
           
    state = { isShowing: true };

    componentDidMount() {
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({isShowing: false});
    }

    render() {
        const { isShowing } = this.state;
        if(this.props.pending === true){
            return <></>;
        }else if(this.props.error !== null){
            return <></>
        }else if(typeof this.props.weatherData === 'undefined' || this.props.weatherData.length === 0){
            return <></>
        }
        return (
            <>
            { isShowing ? 
                <div className="valueDisplay" onClick={this.handleClick}>
                    {/* <p className="valueDisplayHeader">Values</p> */}
                    <p>Temperature: {weatherMapper.getTemperatureCelcius(this.props.weatherData.main.temp)}°C</p>
                    <p>Wind Speed: {this.props.weatherData.wind.speed}m/s</p>
                    <p>Has Lightning: {weatherMapper.isLightningWeather(this.props.weatherData.weather.ID) ? 'true' : 'false'}</p>
                    <p>Is Raining: {weatherMapper.isRaining(this.props.weatherData.weather.ID) ? 'true' : 'false'}</p>
                </div>
            : <></>}
            </>
        );
    }
}

const mapStateToProps = function(state: any) {
    return {
        error: fetchWeatherDataError(state.weatherReducer),
        weatherData: fetchWeatherDataSuccess(state.weatherReducer),
        pending: fetchWeatherDataPending(state.weatherReducer)
    }
}
  
export default connect(
    mapStateToProps
)(ValuesDisplay);
