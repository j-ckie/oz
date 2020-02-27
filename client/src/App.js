import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import axios from "axios";

import 'react-chat-widget/lib/styles.css';

import logo from './logo.svg';

axios.defaults.baseURL = "https://us-central1-the-oz-project.cloudfunctions.net/"

class App extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        axios({
            method: "POST",
            url: "/dialogflowGateway",
            data: {
                "sessionId": "dookiedoo@da.org", //change me to user identifying data - token?
                "queryInput": {
                    "text": {
                        "text": newMessage,
                        "languageCode": "en-US"
                    }
                }
            }
        })
            .then(res => {
                console.log(res)
                let botResponse = res.data.fulfillmentText;
                addResponseMessage(botResponse);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="App">
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    profileAvatar={logo}
                    title="Gratitude Journal!"
                    subtitle="Log your worries away"
                />
            </div>
        );
    }
}

export default App;