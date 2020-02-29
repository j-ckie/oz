import React, { Component } from "react";
// import PropTypes from "prop-types";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// // REDUX
// import { connect } from "react-redux";

// // COMPONENTS
// import Chat from "../Components/chatbot/Chat";



class home extends Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h2" > {/*className={classes.pageTitle}*/}
                        Home
                    </Typography>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

export default home;