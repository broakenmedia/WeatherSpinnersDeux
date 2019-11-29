import React from 'react';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchWeatherDataAction from '../redux/actions/CurrentWeatherDataActions';
import {fetchForecastWeatherDataAction, clearForecastWeatherDataAction} from '../redux/actions/ForecastDataActions';
import weatherMapper from '../utils/weatherDataMapper';
import posed from 'react-pose';
import '../styles/SpinnersBackground.css';
import Loader from './Loader';
import Error from './Error';

export interface OwnProps {
    spinnerCount: number,
    currentWeatherData?: any,
    currentWeatherPending?: boolean,
    currentWeatherError?: string,
    searchParam : string,
    forecastData?: any,
    forecastDataPending?: boolean,
    forecastDataError?: string,
    forecastSliderVal: number
}

interface DispatchProps {
    fetchWeatherData: (val:string) => void
    fetchForecastData: (val:string, sliderVal: number) => void
    clearForecastData: () => void
}

type Props = DispatchProps & OwnProps;

const FlashBackground = posed.div({
    flash: {
        backgroundColor: isDay() ? '#000000' : '#ffffff',
        transition: { 
            default: { ease: 'anticipate', duration:50}
        }
    },
    noflash: {
        backgroundColor: isDay() ? '#ffffff' : '#000000',
        transition: { 
            default: { ease: 'anticipate', duration:50}
        }
    }
});

function sleep (time:number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function isDay() {
    const hours = (new Date()).getHours();
    return (hours >= 6 && hours < 18);
}

class SpinnersBackground extends React.Component<Props>{

    state = { currentWeatherData: null, isFlashing: false, spinners:[]};

    componentDidMount() {
        this.search();
        setInterval(() => { 
            var weatherObject = (typeof this.props.forecastData !== 'undefined' ? this.props.forecastData : this.props.currentWeatherData);
            if(typeof weatherObject !== 'undefined'){
                const weatherTypeID = weatherObject.weather[0].id;
                if(weatherMapper.isLightningWeather(weatherTypeID)){
                    this.setState({ isFlashing: true });
                    sleep(50).then(() => {
                        this.setState({ isFlashing: false });
                    });
                }
            }
        }, 10000);
    }

    componentDidUpdate(props: any) {
        if (props.searchParam !== this.props.searchParam) {
          this.search();
        }
        if (props.forecastSliderVal !== this.props.forecastSliderVal) {
            if(this.props.forecastSliderVal > 0){
                this.getForecastDay();
            }else{
                this.search();
            }
        }
        if(props.forecastData !== this.props.forecastData){
            if(typeof this.props.forecastData !== 'undefined'){
                this.createSpinners();
            }
        }
        if(props.currentWeatherData !== this.props.currentWeatherData){
            if(typeof this.props.currentWeatherData !== 'undefined'){
                this.createSpinners();
            }
        }
    }

    getForecastDay(){
        console.log("Getting Forecast Weather")
        this.props.fetchForecastData(this.props.searchParam, this.props.forecastSliderVal || 0);
        this.forceUpdate();
    }

    search() {
        console.log("Getting Current Weather")
        this.props.clearForecastData();
        this.props.fetchWeatherData(this.props.searchParam);
    }

    createSpinners = () => {
        var weatherObject = (typeof this.props.forecastData !== 'undefined' ? this.props.forecastData : this.props.currentWeatherData);
        if(typeof weatherObject !== 'undefined'){
            const windSpeed = weatherObject.wind.speed;
            const weatherTypeID = weatherObject.weather[0].id;
            const weatherTemp = weatherObject.main.temp;
            var animDurForWindSpeed = weatherMapper.getDurationForWindSpeed(windSpeed);
            var rotationForWindSpeed = weatherMapper.getRotationForWindSpeed(windSpeed);
            var isRaining = weatherMapper.isRaining(weatherTypeID);
            this.setState({spinners:[]}, () => { 
                for (let i = 0; i < this.props.spinnerCount; i++) {
                    this.setState((prevState:any) => ({
                        spinners: prevState.spinners.concat(<Spinner key={i} shouldFall={isRaining} tempKelvin={weatherTemp} animationDuration={animDurForWindSpeed} rotationAmount={rotationForWindSpeed}/>),
                    }));
                }
            });
        }
        return this.state.spinners;
    } 

    render() {
        
        if(this.props.currentWeatherPending === true){
            return <Loader/>;
        }else if(this.props.currentWeatherError !== null && typeof this.props.currentWeatherError !== 'undefined'){
            return <Error errorMsg={this.props.currentWeatherError}/>
        }else if(typeof this.props.currentWeatherData === 'undefined'){
            return <Loader/>;
        }

        return ( 
            <>
            <FlashBackground className="flashBG" pose={this.state.isFlashing ? 'flash' : 'noflash'}/>
            {this.state.spinners.map((spinner, i) => {
                return spinner;
            })}
            </>
        );
    }
}

const mapStateToProps = function(state: any) {
    return {
        searchParam: state.searchReducer.searchQuery,
        forecastSliderVal: state.forecastSliderReducer.sliderVal,
        currentWeatherError: state.weatherReducer.error,
        currentWeatherData: state.weatherReducer.weatherData,
        currentWeatherPending: state.weatherReducer.isPending,
        forecastData: state.forecastWeatherReducer.forecastData,
        forecastDataPending: state.forecastWeatherReducer.isPending,
        forecastDataError: state.forecastWeatherReducer.error,
    }
}
  
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    fetchWeatherData: fetchWeatherDataAction,
    fetchForecastData: fetchForecastWeatherDataAction,
    clearForecastData: clearForecastWeatherDataAction
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpinnersBackground);
