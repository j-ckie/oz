import { GET_GRATITUDE_ENTRIES, LOADING_DATA, GET_MOOD_RECORDS } from "../types";

const initialState = {
    timestamp: null,
    entry: {},
    entries: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GRATITUDE_ENTRIES:
            return {
                ...state,
                entries: action.payload,
                loading: false
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
};