import { SET_SEARCH_QUERY } from "../types/searchTypes";

export function setSearchQueryAction(param:string) {
    return {
        type: SET_SEARCH_QUERY,
        searchQuery: param
    };
}