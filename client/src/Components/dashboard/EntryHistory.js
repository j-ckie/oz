import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as dayjs from "dayjs";

// MUI
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';

// REDUX
import { connect } from "react-redux";
import store from "../../redux/store";





const styles = {
    card: {
        position: "relative",
        marginBottom: 20
    },
    content: {
        padding: 25
    },
    large: {
        width: 100,
        height: 100
    }
}

function EntryHistory(entry) {
    // const state = store.getState()
    // const userData = state.user.entries;

    //console.log("EntryHistory entries")
    //console.log(entry)

    let dateCreated = entry.entries.createdAt;
    //Date.parse(dateCreated)
    //console.log(dayjs(dateCreated))


    return (

        <div className="entry-content">
            <p className="entry-date">
                Created: {dayjs(dateCreated).format('ddd, MMM. D, YYYY')}
            </p>
            <Typography variant="body1">
                {JSON.stringify(entry.entries.body)}
            </Typography>
        </div>






    )

}

EntryHistory.propTypes = {
    entries: PropTypes.array.isRequired
}

export default withStyles(styles)(EntryHistory)
