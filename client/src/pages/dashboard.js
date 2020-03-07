import React, { useState, useEffect } from 'react';
import Chat from "../Components/chatbot/Chat";
import EntryHistory from "../Components/dashboard/EntryHistory";

// mui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import Swiper from 'react-id-swiper';
import "swiper/css/swiper.css";

// redux
import store from "../redux/store";
import { getGratitudeEntries } from "../redux/actions/chatActions";

function Dashboard(props) {
    const state = store.getState()
    const { user: { entries, loading, credentials: { email, name } } } = state;


    // console.log(state.user.credentials)
    console.log("ENTRIES:")
    console.log(entries)
    console.log("STATE")
    console.log(state);

    let entryMarkup = !loading ? (
        entries.map(entry => <EntryHistory key={entry.createdAt} entries={entry} />)
    ) : <p>Loading...</p>



    //console.log("entryMarkup")
    //console.log(entryMarkup)


    // console.log(entryMarkup[0])



    return (
        <Grid container spacing={2} >
            <Grid item xs={1} sm={2} />
            <Grid item xs={10} sm={8}>
                <Typography variant="h2">Dashboard</Typography>
                <Typography variant="body2">Welcome {name}</Typography>



                <Card className="dashboard-card card">
                    <CardContent className="content">
                        <CardHeader title="Previous Gratitude Entries" />
                        <Swiper>
                            {entryMarkup}
                        </Swiper>
                    </CardContent>
                </Card>
                <Chat />
            </Grid>
            <Grid item xs={1} sm={2} />
        </Grid >
    )
}

export default Dashboard;