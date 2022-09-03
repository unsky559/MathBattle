import React, {useEffect, useState} from 'react';
import "./loginPage.scss";
import {useDispatch} from "react-redux";
import Popup from "../../components/popup/popup";
import RegisterForm from "../../layouts/forms/registerForm/registerForm";
import LoginForm from "../../layouts/forms/loginForm/loginForm";
import {useHistory} from "react-router-dom";
import userState from "../../webWorkers/user/userState.ts";

const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [regPop, openRegPop] = useState(false);
    const successPopupState = useState(false);
    useEffect(() => {
        userState.isLogged().then((isLogged: boolean) => {
           if(isLogged){
               history.push("/");
               dispatch({ type: "HEADER_LOGGED" });
           }
        });
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

            <Popup titleClose={true} title="Успех" isActive={successPopupState[0]} setActive={successPopupState[1]}>
                <p className="p">Ваш аккаунт успешно зарегистрирован!</p>
                <p className="p">Воспользуйтесь формой входа чтобы продолжить</p>
            </Popup>

            <Popup titleClose={true} title="Регистрация" isActive={regPop} setActive={openRegPop}>
                <div className="formCont">
                    <RegisterForm popupControll={openRegPop} successPopupController={successPopupState}/>
                </div>
            </Popup>
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
                        <p className="subText">
                            Нет аккаунта?
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                openRegPop(true);
                            }}> Зарегестрируйтесь!</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
