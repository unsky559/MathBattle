import React from "react";
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
            <Header collapse={false} />
            {/*<HomePage/>*/}
            <LoginPage/>
        </>
    );
}

export default App;
