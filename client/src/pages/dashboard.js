import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Chat from "../Components/chatbot/Chat";

import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// redux
import { connect } from 'react-redux';
import AuthRoute from '../util/AuthRoute';

export class dashboard extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <Grid container spacing={2}>
                <Grid item sm />
                <Grid item sm>
                    {authenticated ? (
                        <Fragment>
                            <Typography variant="h2">Dashboard</Typography>
                            <Chat />
                        </Fragment>

                    ) : (
                            <Typography variant="h3">
                                Not logged in! Please do so <Link to="/login">here</Link>
                            </Typography>
                        )
                    }
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

dashboard.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(dashboard);
