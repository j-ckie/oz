import React from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";
import Chat from "./Components/Chat";

import 'react-chat-widget/lib/styles.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";

import login from "./pages/login";
import signup from "./pages/signup";

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://us-central1-the-oz-project.cloudfunctions.net/"

const token = localStorage.fireBaseIDToken;

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        // store.dispatch(logoutUser())
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        // store.dispatch()
    }
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Switch>
                        {/* <Route exact path="/" component={home} /> */}
                        <Route exact path="/login" component={login} />
                        <Route exact path="/signup" component={signup} />
                    </Switch>
                    <Chat />
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App;