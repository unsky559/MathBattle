import React from "react";
import Header from "./components/header/header";
import HomePage from "./pages/homePage";

import "../static/container.css"; // include container class
import "../static/reset.css"; // reset default styles
import "../static/fonts/fonts.css"; // import fonts
import "./themes/white-theme.scss"; // set white theme

function App() {
    return (
        <>
            <Header/>
            <HomePage/>
        </>
    );
}

export default App;
