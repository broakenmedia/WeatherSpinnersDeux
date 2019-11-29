import { FETCH_FORECAST_WEATHER_DATA_PENDING, FETCH_FORECAST_WEATHER_DATA_SUCCESS, FETCH_FORECAST_WEATHER_DATA_ERROR, CLEAR_FORECAST_WEATHER_DATA } from "../types/forecastWeatherTypes";

import dummyWeather from '../../dummy/DummyForecastWeather.json';

function fetchForecastWeatherDataPending() {
    return {
        type: FETCH_FORECAST_WEATHER_DATA_PENDING
    }
}

function fetchForecastWeatherDataSuccess(data:string) {
    return {
        type: FETCH_FORECAST_WEATHER_DATA_SUCCESS,
        forecastData: data
    }
}

function fetchForecastWeatherDataError(error:string) {
    return {
        type: FETCH_FORECAST_WEATHER_DATA_ERROR,
        error: error
    }
}

export function clearForecastWeatherDataAction() {
    return {
        type: CLEAR_FORECAST_WEATHER_DATA,
        forecastData: undefined
    }
}

function getForecastDayForSlider(forecastData:any, sliderVal:any){
    /* Horrible format coming from weather API. Ungrouped list of 5 days in the future split by every 3 hours.
    Having to group all of these values by their date so we can use them with the slider */
    const forcastDays = forecastData.list.reduce((forcastDays: { [x: string]: any[]; }, forecast: { dt_txt: string; }) => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!forcastDays[date]) {
          forcastDays[date] = [];
        }
        forcastDays[date].push(forecast);
        return forcastDays;
    }, {});
    const forcastDaysAsArray = Object.keys(forcastDays).map((date) => {
        return { date, forecasts: forcastDays[date] };
    });
    var arrIndexes = {25:1, 50:2, 75:3, 100:4};
    var index = (arrIndexes as any)[sliderVal];
    return forcastDaysAsArray[index].forecasts[Math.floor(forcastDaysAsArray[index].forecasts.length / 2)];
}

export function fetchForecastWeatherDataAction(param:string, sliderVal:number) {
    return (dispatch: { (arg0: { type: string; }): void; (arg0: { type: string; forecastData: string; }): void; (arg0: { type: string; error: string; }): void; }) => {
        dispatch(fetchForecastWeatherDataPending());
        if(process.env.REACT_APP_USE_DUMMY_DATA === 'true'){
            console.log("Using dummy data");
            var res = JSON.parse(JSON.stringify(dummyWeather));
            var forecastDay = getForecastDayForSlider(res, sliderVal);
            dispatch(fetchForecastWeatherDataSuccess(forecastDay));
            return forecastDay;
        }else{
            fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + param + '&APPID=' + process.env.REACT_APP_OPEN_WEATHER_API_KEY)
            .then(res => {
                return res.json()
            })
            .then(res => {
                if(res.cod !== 200 && res.cod !== "200") {
                    throw(res.message);
                }
                var forecastDay = getForecastDayForSlider(res, sliderVal);
                dispatch(fetchForecastWeatherDataSuccess(forecastDay));
                return forecastDay;
            })
            .catch(error => {
                dispatch(fetchForecastWeatherDataError(error));
            })
        }
    }
}