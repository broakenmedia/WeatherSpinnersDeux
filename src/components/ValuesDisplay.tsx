import React from "react";
import { connect } from 'react-redux';
import weatherMapper from '../utils/weatherDataMapper';
import '../styles/ValuesDisplay.css';
import { bindActionCreators } from "redux";

export interface OwnProps {
    currentWeatherData?: any,
    forecastData?: any,
    currentWeatherPending?: boolean,
    currentWeatherError?: string,
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
        if(this.props.currentWeatherPending === true){
            return <></>;
        }else if(this.props.currentWeatherError !== null){
            return <></>
        }else if(typeof this.props.currentWeatherData === 'undefined' || this.props.currentWeatherData.length === 0){
            return <></>
        }

        var weatherObject = (typeof this.props.forecastData !== 'undefined' ? this.props.forecastData : this.props.currentWeatherData);

        /* console.log("DisplayValues:")
        console.log(this.props.forecastData); */
        return (
            <>
            { isShowing ? 
                <div className="valueDisplay" onClick={this.handleClick.bind(this)}>
                    <p className="valueDisplayHeader">{this.props.searchParam}</p>
                    <p>Temperature: {weatherMapper.getTemperatureCelcius(weatherObject.main.temp)}°C</p>
                    <p>Wind Speed: {weatherObject.wind.speed}m/s</p>
                    <p>Lightning: {weatherMapper.isLightningWeather(weatherObject.weather[0].id) ? 'true' : 'false'}</p>
                    <p>Raining: {weatherMapper.isRaining(weatherObject.weather[0].id) ? 'true' : 'false'}</p>
                </div>
            : <></>}
            </>
        );
    }
}

const mapStateToProps = function(state: any) {
    return {
        searchParam: state.searchReducer.searchQuery,
        currentWeatherError: state.weatherReducer.error,
        currentWeatherData: state.weatherReducer.weatherData,
        currentWeatherPending: state.weatherReducer.isPending,
        forecastData: state.forecastWeatherReducer.forecastData
    }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ValuesDisplay);
