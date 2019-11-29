import { FETCH_WEATHER_DATA_PENDING, FETCH_WEATHER_DATA_SUCCESS, FETCH_WEATHER_DATA_ERROR } from "../types/weatherTypes";

const initialState = {
    isPending: false,
    weatherData: undefined,
    error: null
}

export function weatherReducer(state = initialState, action: { type: any; weatherData: any; error: any; }) {
    switch(action.type) {
        case FETCH_WEATHER_DATA_PENDING: 
            return {
                ...state,
                isPending: true,
                error:null
            }
        case FETCH_WEATHER_DATA_SUCCESS:
            return {
                ...state,
                isPending: false,
                weatherData: action.weatherData,
                error:null
            }
        case FETCH_WEATHER_DATA_ERROR:
            return {
                ...state,
                isPending: false,
                weatherData:undefined,
                error: action.error
            }
        default: 
            return state;
    }
}