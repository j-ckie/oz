import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Chat from "../Components/chatbot/Chat";

// redux
import { connect } from 'react-redux';

export class chat extends Component {
    render() {

        return (
            <Fragment>
                <Chat />
            </Fragment>
        )
    }
}

chat.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(chat);
