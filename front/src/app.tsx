import React, {useEffect, Suspense, lazy} from "react";
import {BrowserRouter} from "react-router-dom";

import "../static/reset.css"; // reset default styles

import "./themes/white-theme.scss"; // set white theme

import Header from "./components/header/header";
import {useSelector} from "react-redux";
import {newExpressionAudio, startGameAudio} from "./workers/audioController.ts";
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
