import React, {useEffect, Suspense, lazy} from "react";
import {Route, BrowserRouter} from "react-router-dom";

import "../static/container.css"; // include container class
import "../static/reset.css"; // reset default styles

import "./themes/white-theme.scss"; // set white theme
import "./styles/shared/block.scss";
import "./styles/shared/texts.scss";

import Header from "./components/header/header";
import {useSelector} from "react-redux";
import {newExpressionAudio, startGameAudio} from "./workers/audioController.ts";
import Spinner from "./components/spinner/spinner";
import {defatultStateType} from "./index";
import Router from "./pages/Router";



const Popup = lazy(() => import("./components/popup/popup"));
const SearchGamePopup = lazy(() => import("./layouts/popups/searchGamePopup/searchGamePopup"));

function App() {
    const searchGamePopupState = useSelector((state: defatultStateType ) => state.searchGamePopup);

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
                <Router />
            </BrowserRouter>
        </>
    );
}

export default App;
