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

// REDUX
import { connect } from "react-redux";

export class Navbar extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { authenticated } = this.props;

        // console.log("Authenticated?????? Navbar")
        // console.log(this.props)

        return (
            <AppBar>
                <Toolbar>
                    {authenticated ? (
                        <Fragment>
                            <Link to="/">
                                <Button tip="Home">
                                    <HomeIcon />
                                </Button>
                            </Link>
                            <Button tip="Chat" component={Link} to="/dashboard"><AppsIcon /></Button>
                            <Button tip="Logout" onClick={this.handleLogout}>
                                <PowerOff />
                            </Button>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button component={Link} to="/">Home</Button>
                                <Button component={Link} to="/login">Login</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar);