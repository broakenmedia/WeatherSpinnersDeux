import React from 'react';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchWeatherDataSuccess, fetchWeatherDataError, fetchWeatherDataPending} from '../redux/reducers/weatherReducer';
import fetchWeatherDataAction from '../redux/actions/fetchWeatherData';
import weatherMapper from '../utils/weatherDataMapper';

export interface OwnProps {
    spinnerCount: number,
    weatherData?: any,
    pending?: boolean,
    error?: string
}

interface DispatchProps {
    fetchWeatherData: () => void
}

type Props = DispatchProps & OwnProps;

class SpinnersBackground extends React.Component<Props>{
    componentDidMount() {
        this.props.fetchWeatherData();
    }
    render() {
        if(this.props.pending === true){
            return <>Loading...</>;
        }else if(this.props.error !== null){
            return <>{this.props.error}</>
        }else if(typeof this.props.weatherData === 'undefined' || this.props.weatherData.length === 0){
            return <>Loading...</>
        }

        const windSpeed = this.props.weatherData.wind.speed;
        const weatherTypeID = this.props.weatherData.weather[0].ID;
        var animDurForWindSpeed = weatherMapper.getDurationForWindSpeed(windSpeed);
        var rotationForWindSpeed = weatherMapper.getRotationForWindSpeed(windSpeed);
        /* IDs determined by OpenWeatherMap, 500 - 531 are different stages of rain. Not currently concered with intensity */
        var isRaining = (weatherTypeID >= 500 && weatherTypeID <= 531) ? true : false;

        const spinners = [];
        for (let i = 0; i < this.props.spinnerCount; i++) {
            spinners.push(<Spinner key={i} shouldFall={isRaining} animationDuration={animDurForWindSpeed} rotationAmount={rotationForWindSpeed}/>);
        }
        return (
            spinners.map((value, index) => {
                return value;
            })
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
  
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    fetchWeatherData: fetchWeatherDataAction
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpinnersBackground);
