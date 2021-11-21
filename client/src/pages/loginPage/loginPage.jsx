import React, {useEffect} from 'react';
import "./loginPage.scss";
import LoginForm from "../../components/loginForm/loginForm";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "HEADER_DISCOLLAPSE"
        });
        return () => {
            dispatch({
                type: "HEADER_COLLAPSE"
            });
        }
    });

    return (
        <div className="loginPage">
            <div className="bigBanner">
                <div className="container">
                    <div className="banner-text">
                        <h2 className="subBanner">Отслеживайте прогресс в личном аккаунте</h2>
                        <span className="decorativeBig">55+49</span>
                    </div>
                </div>
            </div>
            <div className="leftSide">
                <div className="container">
                    <div className="formCont">
                        <h3 className="formTitle">Авторизация</h3>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
