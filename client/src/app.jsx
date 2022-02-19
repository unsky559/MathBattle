import React, {useEffect, Suspense, lazy} from "react";
import {Route, BrowserRouter} from "react-router-dom";

import "../static/container.css"; // include container class
import "../static/reset.css"; // reset default styles

import "./themes/white-theme.scss"; // set white theme
import "./styles/shared/block.scss";
import "./styles/shared/texts.scss";


import Header from "./components/header/header";
import {useSelector} from "react-redux";
import {newExpressionAudio, startGameAudio} from "./workers/audioController";
import Spinner from "./components/spinner/spinner";

const HomePage = lazy(() => import("./pages/homePage"));
const LoginPage = lazy(() => import("./pages/loginPage/loginPage"));
const GamePage = lazy(() => import("./pages/gamePage/gamePage"));
const UserPage = lazy(() => import("./pages/userPage/userPage"));
const TestPage = lazy(() => import("./pages/testPage/testPage"));

const Popup = lazy(() => import("./components/popup/popup"));
const SearchGamePopup = lazy(() => import("./layouts/popups/searchGamePopup/searchGamePopup"));

function App() {
    const searchGamePopupState = useSelector(state => state.searchGamePopup);

    useEffect(() => {
        startGameAudio.load();
        newExpressionAudio.load();
    }, []);

    return (
        <>
            <Suspense fallback="">
                <Popup
                    titleClose={false} title="Поиск оппонента"
                    isActive={searchGamePopupState} nonClosable>
                    <Suspense fallback="">
                        <SearchGamePopup/>
                    </Suspense>
                </Popup>
            </Suspense>

            <BrowserRouter>
                <Header />
                <Suspense fallback={
                    <div className="preloader-container">
                        <Spinner/>
                    </div>
                }>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/game/:id" component={GamePage}/>
                    <Route path="/user/:id" component={UserPage}/>
                    <Route path="/test" component={TestPage}/>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
