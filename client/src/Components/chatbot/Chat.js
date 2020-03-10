import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, toggleMsgLoader } from 'react-chat-widget';
import axios from "axios";
import store from "../../redux/store";
import avatar from "../../img/oz-chat.png";
import { getUserData } from '../../redux/actions/userActions';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timestamp: new Date().toISOString()
        }

    }

    componentDidMount() {
        addResponseMessage("Welcome! Feel free to get started by typing 'I want to create a gratitude entry' or 'I want to record my mood for the day'!");
        // addResponseMessage(this.state.timestamp)

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
                store.dispatch(getUserData());
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
