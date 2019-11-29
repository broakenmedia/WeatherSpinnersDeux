import { FETCH_FORECAST_WEATHER_DATA_PENDING, FETCH_FORECAST_WEATHER_DATA_SUCCESS, FETCH_FORECAST_WEATHER_DATA_ERROR, CLEAR_FORECAST_WEATHER_DATA } from "../types/forecastWeatherTypes";

const initialState = {
    isPending: false,
    forecastData: undefined,
    error: null
}

export function forecastWeatherReducer(state = initialState, action: { type: any; forecastData: any; error: any; }) {
    switch(action.type) {
        case FETCH_FORECAST_WEATHER_DATA_PENDING: 
            return {
                ...state,
                isPending: true,
                error:null
            }
        case FETCH_FORECAST_WEATHER_DATA_SUCCESS:
            return {
                ...state,
                isPending: false,
                forecastData: action.forecastData,
                error:null
            }
        case FETCH_FORECAST_WEATHER_DATA_ERROR:
            return {
                ...state,
                isPending: false,
                forecastData:undefined,
                error: action.error
            }
        case CLEAR_FORECAST_WEATHER_DATA:
                return {
                    ...state,
                    isPending: false,
                    forecastData:undefined,
                    error: null
                }
        default: 
            return state;
    }
}