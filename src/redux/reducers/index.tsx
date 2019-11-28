import { combineReducers } from 'redux'
import {weatherReducer} from './weatherReducer'
import {searchReducer} from './searchReducer'

export default combineReducers({
    weatherReducer,
    searchReducer
})