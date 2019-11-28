import { FETCH_WEATHER_DATA_PENDING, FETCH_WEATHER_DATA_SUCCESS, FETCH_WEATHER_DATA_ERROR } from "../types/weatherTypes";

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

function fetchWeatherData() {
    return (dispatch: { (arg0: { type: string; }): void; (arg0: { type: string; weatherData: string; }): void; (arg0: { type: string; error: string; }): void; }) => {
        dispatch(fetchWeatherDataPending());
        fetch('http://api.openweathermap.org/data/2.5/weather?q=Oxford,uk&APPID=' + process.env.REACT_APP_OPEN_WEATHER_API_KEY)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.cod !== 200) {
                throw(res.message);
            }
            dispatch(fetchWeatherDataSuccess(res));
            return res.weatherData;
        })
        .catch(error => {
            dispatch(fetchWeatherDataError(error));
        })
    }
}
export default fetchWeatherData;