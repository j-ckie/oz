// import { GET_GRATITUDE_ENTRIES, LOADING_DATA, GET_MOOD_RECORDS } from "../types";
// import axios from "axios"

// // export const getGratitudeEntries = () => (dispatch) => {
// //     dispatch({ type: LOADING_DATA });

// //     axios.get("https://us-central1-the-oz-project.cloudfunctions.net/api/entries")
// //         .then(res => {
// //             console.log("GETTING ENTRIES.....")
// //             dispatch({ type: GET_GRATITUDE_ENTRIES, payload: res.data })
// //         })
// //         .catch(err => console.log(`GETTING GRATITUDE ENTRIES ERROR: ${err}`))
// // };

// export const getMoodRecords = () => (dispatch) => {
//     dispatch({ type: LOADING_DATA })

//     axios.get("https://us-central1-the-oz-project.cloudfunctions.net/api/moods")
//         .then(res => {
//             console.log("GETTING MOODS...")
//             dispatch({ type: GET_MOOD_RECORDS, payload: res.data })
//         })
//         .catch(err => console.log(`GETTING MOOD RECORDS ERROR: ${err}`))
// }