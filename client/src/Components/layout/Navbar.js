import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import ChatBubble from "@material-ui/icons/ChatBubble";

// REDUX
import { connect } from "react-redux";

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props;

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
                            <Link to="/chat">
                                <Button tip="Chat">
                                    <ChatBubble />
                                </Button>
                            </Link>
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
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);