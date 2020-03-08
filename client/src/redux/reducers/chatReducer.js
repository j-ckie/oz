import { SET_CHAT_TIMESTAMP, SEND_GRATITUDE_ENTRY, GET_GRATITUDE_ENTRIES, LOADING_DATA, GET_MOOD_RECORDS } from "../types";

const initialState = {
    timestamp: null,
    entry: {},
    entries: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CHAT_TIMESTAMP:
            return {
                ...state,
                timestamp: new Date().toISOString()
            }
        case SEND_GRATITUDE_ENTRY:
            return {
                ...state,
                scribble: action.payload
            }
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