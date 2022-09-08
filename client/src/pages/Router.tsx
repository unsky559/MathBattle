import React, {lazy, Suspense} from 'react';
import Spinner from "../components/spinner/spinner";
import {Route} from "react-router-dom";

const HomePage = lazy(() => import("./homePage/homePage"));
const LoginPage = lazy(() => import("./loginPage/loginPage"));
const GamePage = lazy(() => import("./gamePage/gamePage"));
const UserPage = lazy(() => import("./userPage/userPage"));
const TestPage = lazy(() => import("./testPage/testPage"));

const Router = () => {
    return (
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
    );
};

export default Router;
