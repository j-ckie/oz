import { SET_CHAT_TIMESTAMP, SEND_GRATITUDE_ENTRY, GET_GRATITUDE_ENTRIES, LOADING_DATA } from "../types";
import axios from "axios"

export const getGratitudeEntries = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.get("https://us-central1-the-oz-project.cloudfunctions.net/api/entries")
        .then(res => {
            console.log("GETTING ENTRIES.....")
            dispatch({ type: GET_GRATITUDE_ENTRIES, payload: res.data })
        })
        .catch(err => console.log(`GETTING GRATITUDE ENTRIES ERROR: ${err}`))
};