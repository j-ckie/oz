import React from "react";
import EntryHistory from "./EntryHistory";
import Swiper from 'react-id-swiper';
import "swiper/css/swiper.css";

// redux
import store from "../../redux/store";

function EntryCarousel(data) {
    const state = store.getState()
    const { user: { entries, loading } } = state;

    // console.log(state.user.credentials)
    console.log("ENTRIES:")
    console.log(entries)
    console.log("STATE")
    console.log(state);

    let entryMarkup = !loading ? (
        entries.map(entry => <EntryHistory key={entry.createdAt} entries={entry} />)
    ) : <p>Loading...</p>

    return (
        <Swiper>
            {entryMarkup}
        </Swiper>
    )

}

export default EntryCarousel