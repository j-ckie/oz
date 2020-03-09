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

    // const params = {
    //     pagination: {
    //         el: ".swiper-pagination",
    //         type: "fraction"
    //     },
    //     navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev"
    //     }
    // }

    const params = {
        effect: 'coverflow',
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 25,
            stretch: -25,
            depth: 100,
            modifier: 5,
            slideShadows: false
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            // when window width is <= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window width is <= 480px
            480: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is <= 640px
            640: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            800: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1920: {
                slidesPerView: 1,
                spaceBetween: 20
            }
        }
    }

    let entryMarkup = !loading ? (
        entries.map(entry => <div className="entry-history"><EntryHistory entries={entry} /></div>)
    ) : (
            <p> Loading...</p>
        )

    return (
        <Card className="card">
            <CardContent className="content">
                <Swiper {...params}>

                    {entryMarkup}

                </Swiper>
            </CardContent>
        </Card>
    )

}

export default EntryCarousel