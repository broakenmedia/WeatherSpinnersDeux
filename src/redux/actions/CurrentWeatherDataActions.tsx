import { FETCH_WEATHER_DATA_PENDING, FETCH_WEATHER_DATA_SUCCESS, FETCH_WEATHER_DATA_ERROR } from "../types/weatherTypes";
import dummyWeather from '../../dummy/DummyWeather.json';
function fetchWeatherDataPending() {
    return {
        type: FETCH_WEATHER_DATA_PENDING
    }
}

function fetchWeatherDataSuccess(data:string) {
    return {
        type: FETCH_WEATHER_DATA_SUCCESS,
        weatherData: data
    }
}

function fetchWeatherDataError(error:string) {
    return {
        type: FETCH_WEATHER_DATA_ERROR,
        error: error
    }
}

function fetchWeatherData(param:string) {
    return (dispatch: { (arg0: { type: string; }): void; (arg0: { type: string; weatherData: string; }): void; (arg0: { type: string; error: string; }): void; }) => {
        dispatch(fetchWeatherDataPending());
        if(process.env.REACT_APP_USE_DUMMY_DATA === 'true'){
            console.log("Using dummy data");
            dispatch(fetchWeatherDataSuccess(JSON.parse(JSON.stringify(dummyWeather))));
            return dummyWeather; 
        }else{
            console.log("Fetching:" + param);
            fetch('http://api.openweathermap.org/data/2.5/weather?q=' + param + '&APPID=' + process.env.REACT_APP_OPEN_WEATHER_API_KEY)
            .then(res => {
                return res.json()
            })
            .then(res => {
                if(res.cod !== 200) {
                    throw(res.message);
                }
                dispatch(fetchWeatherDataSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchWeatherDataError(error));
            })
        }
    }
}
export default fetchWeatherData;