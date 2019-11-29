import { SET_SEARCH_QUERY } from "../types/searchTypes";
import { SET_SLIDER_VAL } from "../types/forecastSliderTypes";

const sliderInitialState = {
    sliderVal: 0,
}

const initialState = {
    searchQuery: process.env.REACT_APP_DEFAULT_LOCATION,
}

export function searchReducer(state = initialState, action: { type: any; searchQuery: any; }) {
    switch(action.type) {
        case SET_SEARCH_QUERY: 
            return {
                ...state,
                searchQuery: action.searchQuery
            }
        default: 
            return state;
    }
}

export function forecastSliderReducer(state = sliderInitialState, action: { type: any; sliderVal: any; }) {
    switch(action.type) {
        case SET_SLIDER_VAL: 
            return {
                ...state,
                sliderVal: action.sliderVal
            }
        default: 
            return state;
    }
}