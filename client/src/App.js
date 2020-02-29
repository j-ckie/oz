import React from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./App.css";

import 'react-chat-widget/lib/styles.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser } from "./redux/actions/userActions";

import login from "./pages/login";
import signup from "./pages/signup";
import home from "./pages/home";
import chat from "./pages/chat";
import AuthRoute from "./util/AuthRoute";
import Navbar from "./Components/layout/Navbar";

import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

import store from "./redux/store";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://us-central1-the-oz-project.cloudfunctions.net/"

const token = localStorage.fireBaseIDToken;

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser())
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
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={home} />
                            <Route exact path="/login" component={login} />
                            <Route exact path="/signup" component={signup} />
                            <AuthRoute exact path="/chat" component={chat} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}

export default App;