import React, {useEffect, useState} from 'react';
import cl from "./loginPage.module.scss";
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
        <div className={cl.loginPage}>

            <Popup titleClose={true} title="Успех" isActive={successPopupState[0]} setActive={successPopupState[1]}>
                <p className={cl.p}>Ваш аккаунт успешно зарегистрирован!</p>
                <p className={cl.p}>Воспользуйтесь формой входа чтобы продолжить</p>
            </Popup>

            <Popup titleClose={true} title="Регистрация" isActive={regPop} setActive={openRegPop}>
                <div className={cl.formCont}>
                    <RegisterForm popupControll={openRegPop} successPopupController={successPopupState}/>
                </div>
            </Popup>
            <div className={cl.bigBanner}>
                <div className={cl.container}>
                    <div className={cl.bannerText}>
                        <h2 className={cl.subBanner}>Отслеживайте прогресс в личном аккаунте</h2>
                        <span className={cl.decorativeBig}>55+49</span>
                    </div>
                </div>
            </div>
            <div className={cl.leftSide}>
                <div className={cl.container}>
                    <div className={cl.formCont}>
                        <h3 className={cl.formTitle}>Авторизация</h3>
                        <LoginForm/>
                        <p className={cl.subText}>
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
