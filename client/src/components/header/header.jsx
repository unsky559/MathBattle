import React, {lazy, Suspense, useEffect, useState} from 'react';
import Logo from "../logo/logo";


import './header.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import userState from "../../webWorkers/user/userState";

const UserStatus = lazy(() => import("../userStatus/userStatus"));
const Button = lazy(() => import("../button/button"));

const Header = () => {
    const dispatch = useDispatch();
    const collapseHeader = useSelector(state => state.headerCollapse);
    const loggedHeader = useSelector(state => state.headerLogged);
    const userData = useState({});

    useEffect(() => {

        userState.isLogged().then((data) => {
            if(data){ dispatch({ type: "HEADER_LOGGED" }) }
            else{ dispatch({ type: "HEADER_UNLOGGED" }) }
        });

        userState.onUpdate((data) => {
            userData[1](data);
        });

    }, []);

    return (
        <>
            <header className={ ["header", ...collapseHeader ? "" : ["transparent"]].join(" ") }>
                <div className="container">
                    <div className="leftHeader">
                        <Link to="/">
                            <Logo alternate={!collapseHeader} />
                        </Link>
                        {/* collapseHeader && <Nav /> */}
                    </div>
                    { collapseHeader &&
                        <div className="rightHeader">
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
            <div className={["underHeader", ...collapseHeader ? "" : ["hide"]].join(" ")}/>
        </>

    );
};

export default Header;
