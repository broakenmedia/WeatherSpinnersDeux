import React from "react";
import { connect } from 'react-redux';
import {fetchWeatherDataSuccess, fetchWeatherDataError, fetchWeatherDataPending} from '../redux/reducers/weatherReducer';
import weatherMapper from '../utils/weatherDataMapper';
import '../styles/ValuesDisplay.css';
import { bindActionCreators } from "redux";

export interface OwnProps {
    weatherData?: any,
    pending?: boolean,
    error?: string,
    searchParam?: string
}

interface DispatchProps {
    
}

type Props = DispatchProps & OwnProps;

class ValuesDisplay extends React.Component<Props>{
           
    state = { isShowing: true };

    componentDidMount() {
       
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
                <div className="valueDisplay" onClick={this.handleClick.bind(this)}>
                    <p className="valueDisplayHeader">{this.props.searchParam}</p>
                    <p>Temperature: {weatherMapper.getTemperatureCelcius(this.props.weatherData.main.temp)}°C</p>
                    <p>Wind Speed: {this.props.weatherData.wind.speed}m/s</p>
                    <p>Lightning: {weatherMapper.isLightningWeather(this.props.weatherData.weather.ID) ? 'true' : 'false'}</p>
                    <p>Raining: {weatherMapper.isRaining(this.props.weatherData.weather.ID) ? 'true' : 'false'}</p>
                </div>
            : <></>}
            </>
        );
    }
}

const mapStateToProps = function(state: any) {
    return {
        searchParam: state.searchReducer.searchQuery,
        error: fetchWeatherDataError(state.weatherReducer),
        weatherData: fetchWeatherDataSuccess(state.weatherReducer),
        pending: fetchWeatherDataPending(state.weatherReducer)
    }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ValuesDisplay);
