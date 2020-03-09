import React from 'react';
import Chat from "../Components/chatbot/Chat";
import EntryCarousel from "../Components/dashboard/EntryCarousel";
import NotificationButton from "../Components/dashboard/NotificationButton";

// mui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import MoodGraph from "../Components/dashboard/MoodGraph";

// redux
import store from "../redux/store";

function dashboard(props) {
    const state = store.getState()
    const { user: { entries, moods, credentials: { name } } } = state;

    console.log("ENTRIES:")
    console.log(entries)
    console.log("MOODS")
    console.log(moods);

    return (
        <Grid container spacing={2} >
            <Grid item xs={1} sm={2} />
            <Grid item xs={10} sm={8}>
                <Typography variant="h2">Dashboard <span className="accent centered small-h4">Welcome {name}!</span></Typography>
                <br />
                <div className="centered-item notif-button">
                    <NotificationButton />
                </div>
                <h2 className="accent thin">I am grateful for...</h2>
                <div className="spacer-sm"></div>
                <EntryCarousel entries={entries} />
                <div className="spacer"></div>
                <MoodGraph moods={moods} />
                <Chat />
            </Grid>
            <Grid item xs={1} sm={2} />
        </Grid >
    )
}

export default dashboard;