import { SET_SEARCH_QUERY } from "../types/searchTypes";
import { SET_SLIDER_VAL } from "../types/forecastSliderTypes";

export function setSearchQueryAction(param:string) {
    return {
        type: SET_SEARCH_QUERY,
        searchQuery: param
    };
}

export function setForecastSliderValAction(param:number) {
    return {
        type: SET_SLIDER_VAL,
        sliderVal: param
    };
}