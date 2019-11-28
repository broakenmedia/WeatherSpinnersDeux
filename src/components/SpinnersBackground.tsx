import React from 'react';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchWeatherDataSuccess, fetchWeatherDataError, fetchWeatherDataPending} from '../redux/reducers/weatherReducer';
import fetchWeatherDataAction from '../redux/actions/fetchWeatherData';
import weatherMapper from '../utils/weatherDataMapper';
import posed from 'react-pose';
import '../styles/SpinnersBackground.css';
import Loader from './Loader';

export interface OwnProps {
    spinnerCount: number,
    weatherData?: any,
    pending?: boolean,
    error?: string
    searchParam : string
}

interface DispatchProps {
    fetchWeatherData: (val:string) => void
}

type Props = DispatchProps & OwnProps;

const FlashBackground = posed.div({
    flash: {
        backgroundColor: isDay() ? '#000000' : '#ffffff',
        transition: { 
            default: { ease: 'anticipate'}
        }
    },
    noflash: {
        backgroundColor: isDay() ? '#ffffff' : '#000000',
        transition: { 
            default: { ease: 'anticipate'}
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

    state = { isFlashing: false };

    componentDidMount() {
        this.search();
        setInterval(() => { 
            if(typeof this.props.weatherData !== 'undefined' && this.props.weatherData.length !== 0){
                const weatherTypeID = this.props.weatherData.weather[0].ID;
                if(weatherMapper.isLightningWeather(weatherTypeID)){
                    this.setState({ isFlashing: true });
                    sleep(500).then(() => {
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
    }

    search() {
        this.props.fetchWeatherData(this.props.searchParam);
    }

    createSpinners = () => {
        const windSpeed = this.props.weatherData.wind.speed;
        const weatherTypeID = this.props.weatherData.weather[0].ID;
        var animDurForWindSpeed = weatherMapper.getDurationForWindSpeed(windSpeed);
        var rotationForWindSpeed = weatherMapper.getRotationForWindSpeed(windSpeed);
        var isRaining = weatherMapper.isRaining(weatherTypeID);
        const spinners = [];
        for (let i = 0; i < this.props.spinnerCount; i++) {
            spinners.push(<Spinner key={i} shouldFall={isRaining} animationDuration={animDurForWindSpeed} rotationAmount={rotationForWindSpeed}/>);
        }
        return spinners;
    } 

    render() {
        if(this.props.pending === true){
            return <Loader/>;
        }else if(this.props.error !== null){
            return <>{this.props.error}</>
        }else if(typeof this.props.weatherData === 'undefined' || this.props.weatherData.length === 0){
            return <Loader/>;
        }

        return ( 
            <>
            <FlashBackground className="flashBG" pose={this.state.isFlashing ? 'flash' : 'noflash'}/>
            {this.createSpinners()}
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
    fetchWeatherData: fetchWeatherDataAction
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpinnersBackground);
