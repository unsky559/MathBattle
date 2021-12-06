import React, {useEffect, useState} from "react";
import {Route, BrowserRouter} from "react-router-dom";

import "../static/container.css"; // include container class
import "../static/reset.css"; // reset default styles
import "./themes/white-theme.scss";// set white theme

import Header from "./components/header/header";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage/loginPage";
import GamePage from "./pages/gamePage/gamePage";
import Popup from "./components/popup/popup";
import SearchGamePopup from "./layouts/popups/searchGamePopup/searchGamePopup";
import TestPage from "./pages/testPage/testPage";
import isLoggedIn from "./webWorkers/user/isLoggedIn";
import {useDispatch} from "react-redux";

function App() {
    const searchGamePopupState = useState(true);
    const dispatch = useDispatch();
    isLoggedIn().then(isLogged => {
        if(isLogged){
            dispatch({type: "HEADER_LOGGED"});
        }else{
            dispatch({type: "HEADER_UNLOGGED"});
        }
    });

    return (
        <>
            <Popup titleClose={false} title="Поиск оппонента" isActive={searchGamePopupState[0]} setActive={searchGamePopupState[1]}>
                <SearchGamePopup setActive={searchGamePopupState[1]}/>
            </Popup>
            <BrowserRouter>
                <Header />

                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/game" component={GamePage}/>
                <Route path="/test" component={TestPage}/>

            </BrowserRouter>

        </>
    );
}

export default App;
