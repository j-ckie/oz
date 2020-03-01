// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";

// import userReducer from "./reducers/userReducer";
// // import dataReducer from "./reducers/dataReducer";
// import uiReducer from "./reducers/uiReducer";

// const initialState = {};

// const middleware = [thunk];

// const reducers = combineReducers({
//     user: userReducer,
//     // data: dataReducer,
//     UI: uiReducer
// })

// const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_COMPOSE__ || compose))

// export default store;


import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    UI: uiReducer
})
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store