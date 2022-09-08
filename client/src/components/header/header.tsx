import React, {lazy, Suspense, useEffect, useState} from 'react';
import Logo from "../logo/logo";
import cl from './header.module.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {defatultStateType} from "../../index";
import {unloggedUser, userType} from "../../types/userType";
import userState from "../../webWorkers/user/userState.ts";
import classNames from "classnames";

const UserStatus = lazy(() => import("../userStatus/userStatus"));
const Button = lazy(() => import("../button/button"));

const Header = () => {
    const dispatch = useDispatch();
    const collapseHeader = useSelector<defatultStateType>(state => state.headerCollapse);
    const loggedHeader = useSelector<defatultStateType>(state => state.headerLogged);
    const [userData, updateUserData] = useState(unloggedUser);

    useEffect(() => {

        userState.isLogged().then((data: boolean) => {
            if(data){ dispatch({ type: "HEADER_LOGGED" }) }
            else{ dispatch({ type: "HEADER_UNLOGGED" }) }
        });

        userState.onUpdate((data: userType) => {
            updateUserData(data);
        });

    }, []);

    const clasesHeader = classNames(cl.header, { [cl.transparent]: collapseHeader} );
    const clasesUnderheader = classNames(cl.underHeader, {[cl.hide]: !collapseHeader});

    return (
        <>
            <header className={ clasesHeader }>
                <div className={cl.container}>
                    <div className={cl.leftHeader}>
                        <Link to="/">
                            <Logo alternate={!collapseHeader} />
                        </Link>
                    </div>
                    { collapseHeader &&
                        <div>
                            <Suspense fallback="">
                                {
                                    loggedHeader ? <UserStatus userData={userData}/> :
                                        (<Link to="/login">
                                            <Button text="Войти"/>
                                        </Link>)
                                }
                            </Suspense>
                        </div>
                    }
                </div>
            </header>
            <div className={ clasesUnderheader }/>
        </>

    );
};

export default Header;
