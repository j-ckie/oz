import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../redux/actions/userActions";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";
import PowerOff from "@material-ui/icons/PowerSettingsNew";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

// REDUX
import { connect } from "react-redux";

const styles = (theme) => ({
    ...theme.spreadThis,
    title: {
        color: "white",
        marginRight: 20
    }
})

export class Navbar extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { authenticated, classes } = this.props;

        // console.log("Authenticated?????? Navbar")
        // console.log(this.props)

        return (
            <AppBar>
                <Toolbar>
                    {authenticated ? (
                        <Fragment>
                            <Link to="/">
                                <Typography variant="h6" className={classes.title}>
                                    theozproject
                                </Typography>
                            </Link>
                            <Link to="/">
                                <Tooltip title="Home">
                                    <Button>
                                        <HomeIcon style={{ color: "white" }} />
                                    </Button>
                                </Tooltip>
                            </Link>
                            <Tooltip title="Dashboard">
                                <Button component={Link} to="/dashboard">
                                    <AppsIcon style={{ color: "white" }} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Logout">
                                <Button onClick={this.handleLogout}>
                                    <PowerOff style={{ color: "white" }} />
                                </Button>
                            </Tooltip>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Link to="/">
                                    <Typography variant="h6" className={classes.title}>
                                        theozproject
                                </Typography>
                                </Link>
                                <Button style={{ color: "white" }} component={Link} to="/">Home</Button>
                                <Button style={{ color: "white" }} component={Link} to="/login">Login</Button>
                                <Button style={{ color: "white" }} component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar));