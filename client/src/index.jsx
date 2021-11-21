// entry point
import React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import {createStore} from "redux";
import {Provider} from "react-redux";

const defaultState = {
    headerCollapse: true,
}

const reducer = (state = defaultState, action) => {
    switch (action.type){
        case "HEADER_COLLAPSE":
            return {...state, headerCollapse: true};
        case "HEADER_DISCOLLAPSE":
            return {...state, headerCollapse: false};
        default:
            return state;
    }
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.body
);
