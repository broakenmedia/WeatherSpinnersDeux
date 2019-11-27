import { FETCH_WEATHER_DATA_PENDING, FETCH_WEATHER_DATA_SUCCESS, FETCH_WEATHER_DATA_ERROR } from "../types/weatherTypes";

const initialState = {
    pending: false,
    weatherData: [],
    error: null
}

export function weatherReducer(state = initialState, action: { type: any; weatherData: any; error: any; }) {
    switch(action.type) {
        case FETCH_WEATHER_DATA_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_WEATHER_DATA_SUCCESS:
            return {
                ...state,
                pending: false,
                weatherData: action.weatherData
            }
        case FETCH_WEATHER_DATA_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const fetchWeatherDataSuccess = (state: { weatherData: any; }) => state.weatherData;
export const fetchWeatherDataPending = (state: { pending: any; }) => state.pending;
export const fetchWeatherDataError = (state: { error: any; }) => state.error;