import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, toggleMsgLoader } from 'react-chat-widget';
import axios from "axios";
import store from "../../redux/store";
import avatar from "../../img/oz-chat.png";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timestamp: new Date().toISOString()
        }

    }

    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
        addResponseMessage(this.state.timestamp)

    }

    handleNewUserMessage = (newMessage) => {

        console.log(`New message incoming! ${newMessage}`);
        toggleMsgLoader();
        // Now send the message throught the backend API
        axios({
            method: "POST",
            url: "/dialogflowGateway",
            data: {
                "queryInput": {
                    "timeStamp": this.state.timestamp,
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
                toggleMsgLoader();
                addResponseMessage(botResponse);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="ChatApp">
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    // profileAvatar={logo}
                    title="Gratitude Journal!"
                    subtitle="Log your worries away"
                    className="ChatWidget"
                    profileAvatar={avatar}
                />
            </div>
        );
    }
}

export default Chat
