// entry point
import React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import {createStore} from "redux";
import {Provider} from "react-redux";

const defaultState = {
    headerCollapse: document.location.pathname !== "/login",
    headerLogged: false,
    searchGamePopup: false,
    cancelEvent: () => {}
}

const reducer = (state = defaultState, action) => {
    switch (action.type){
        case "HEADER_COLLAPSE":
            return {...state, headerCollapse: true};
        case "HEADER_DISCOLLAPSE":
            return {...state, headerCollapse: false};
        case "HEADER_LOGGED":
            return {...state, headerLogged: true};
        case "HEADER_UNLOGGED":
            return {...state, headerLogged: false};
        case "SEARCH_GAME":
            return {...state, searchGamePopup: action.val, cancelEvent: action.cancelEvent};
        default:
            return state;
    }
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
