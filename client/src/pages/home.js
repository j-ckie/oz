import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";

class home extends Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    <h1>HI THISI S THE HOME PAGE</h1>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <h2>Stuff here...</h2>
                </Grid>
            </Grid>
        )
    }
}

export default home;