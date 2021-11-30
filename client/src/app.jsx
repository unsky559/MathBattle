import React, {useState} from "react";
import {Route, BrowserRouter} from "react-router-dom";

import "../static/container.css"; // include container class
import "../static/reset.css"; // reset default styles
import "./themes/white-theme.scss";// set white theme

import Header from "./components/header/header";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage/loginPage";
import GamePage from "./pages/gamePage/gamePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/game" component={GamePage}/>

            </BrowserRouter>

        </>
    );
}

export default App;
