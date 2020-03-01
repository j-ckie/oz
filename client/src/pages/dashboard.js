import React from 'react';
import Chat from "../Components/chatbot/Chat";

// mui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// redux
import store from "../redux/store";

function Dashboard(props) {
    const state = store.getState()
    const { user: { loading, credentials: { email, name }, entries } } = state;

    console.log(state.user.credentials)
    console.log(`ENTRIES: ${entries}`)

    return (
        < Grid container spacing={2} >
            <Grid item sm />
            <Grid item sm>
                <Typography variant="h2">Dashboard</Typography>
                <Typography variant="body2">Welcome {name}</Typography>
                {/* <p>{entries}</p> */}
                <Chat />
            </Grid>
            <Grid item sm />
        </Grid >
    )
}

export default Dashboard;