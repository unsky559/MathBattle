import React, {useState} from "react";
import {Link, Route, BrowserRouter, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Header from "./components/header/header";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage/loginPage";

import "../static/container.css"; // include container class
import "../static/reset.css"; // reset default styles
import "../static/fonts/fonts.css"; // import fonts
import "./themes/white-theme.scss"; // set white theme

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>

            </BrowserRouter>

        </>
    );
}

export default App;
