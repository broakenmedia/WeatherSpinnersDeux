import { combineReducers } from 'redux'
import {weatherReducer} from './CurrentWeatherDataReducer'
import {forecastWeatherReducer} from './ForecastDataReducer'
import {searchReducer, forecastSliderReducer} from './SearchControlsReducer'

export default combineReducers({
    weatherReducer,
    searchReducer,
    forecastWeatherReducer,
    forecastSliderReducer
})