import { SET_SEARCH_QUERY } from "../types/searchTypes";

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