import React from 'react';
import Chat from "../Components/chatbot/Chat";
import EntryCarousel from "../Components/dashboard/EntryCarousel";

// mui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

// redux
import store from "../redux/store";

function Dashboard(props) {
    const state = store.getState()
    const { user: { entries, credentials: { name } } } = state;

    console.log("ENTRIES:")
    console.log(entries)
    console.log("STATE")
    console.log(state);

    return (
        <Grid container spacing={2} >
            <Grid item xs={1} sm={2} />
            <Grid item xs={10} sm={8}>
                <Typography variant="h2">Dashboard</Typography>
                <Typography variant="body2">Welcome {name}</Typography>



                <Card className="dashboard-card card">
                    <CardContent className="content">
                        <CardHeader title="Previous Gratitude Entries" />

                        <EntryCarousel />

                    </CardContent>
                </Card>
                <Chat />
            </Grid>
            <Grid item xs={1} sm={2} />
        </Grid >
    )
}

export default Dashboard;