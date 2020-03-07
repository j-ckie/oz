import React from "react";
import EntryHistory from "./EntryHistory";
import Swiper from 'react-id-swiper';
import "swiper/css/swiper.css";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

    const params = {
        pagination: {
            el: ".swiper-pagination",
            type: "fraction"
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    return (
        <Card className="card">
            <CardContent className="content">
                <Swiper {...params}>

                    {entries.map(entry => <div className="entry-history"><EntryHistory entries={entry} /></div>)}

                </Swiper>
            </CardContent>
        </Card>
    )

}

export default EntryCarousel