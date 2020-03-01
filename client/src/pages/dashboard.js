import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Chat from "../Components/chatbot/Chat";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// redux
import { connect } from 'react-redux';


export class Dashboard extends Component {
    render() {
        const { authenticated } = this.props
        console.log("TESTING DASHBOARD")
        console.log(authenticated)


        return (
            <Grid container spacing={2}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h2">Dashboard</Typography>
                    <Typography variant="body2">Welcome!</Typography>
                    <Chat />
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}


// Dashboard.propTypes = {
//     authenticated: PropTypes.bool.isRequired
// }

// const mapStateToProps = (state) => ({
//     authenticated: state.user.authenticated
// })

// export default connect(mapStateToProps)(Dashboard);

export default Dashboard;
