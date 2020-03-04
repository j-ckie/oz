import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
import { logoutUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

const styles = (theme) => ({
    ...theme.spreadThis,
    title: {
        marginRight: 20,
        color: "white"
    },
    stickToTop: {
        top: 0
    }
});

export class Navbar extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {

        const { authenticated, classes } = this.props;

        return (
            <AppBar position="fixed" className={classes.stickToTop}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        theozproject
                    </Typography>
                    {authenticated ? (
                        <Fragment>
                            <Link to="/">

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
    authenticated: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

const mapActionToProps = {
    logoutUser
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Navbar));