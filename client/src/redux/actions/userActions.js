import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from "../types";

import axios from "axios";

export const loginUser = (userData) => (dispatch, history) => {
    console.log("Trying to log in...")
    dispatch({ type: LOADING_UI });
    axios.post("https://us-central1-the-oz-project.cloudfunctions.net/api/login", userData)
        .then(res => {
            console.log("Logging user in...")
            setAuthorizationHeader(res.data.token);

            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: SET_ERRORS, payload: error.response })
        })
};

export const signupUser = (newUserData) => (dispatch, history) => {
    dispatch({ type: LOADING_UI })
    axios.post("https://us-central1-the-oz-project.cloudfunctions.net/api/signup", newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch(err => {
            console.log(err)
            // dispatch({ type: SET_ERRORS, payload: err.data })
        })
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem(`FBIDToken`);
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get("https://us-central1-the-oz-project.cloudfunctions.net/api/user")
        .then(res => {
            dispatch({ type: SET_USER, payload: res.data });
        })
        .catch(err => console.log(err))
};

const setAuthorizationHeader = (token) => {
    const FBIDToken = `Bearer ${token}`;
    localStorage.setItem("FBIDToken", FBIDToken);
    axios.defaults.headers.common["Authorization"] = FBIDToken;
}