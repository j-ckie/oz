import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import chatReducer from "./reducers/chatReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    UI: uiReducer,
    chat: chatReducer
})
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store