import React, {useEffect, useState} from 'react';
import Logo from "../logo/logo";
import Nav from "../navigation/nav";
import UserStatus from "../userStatus/userStatus";
import Button from "../button/button";

import './header.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import userState from "../../webWorkers/user/userState";

const Header = (props) => {
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
                            <Logo alternate={collapseHeader ? false : true} />
                        </Link>
                        { collapseHeader && <Nav /> }
                    </div>
                    { collapseHeader &&
                        <div className="rightHeader">

                            {
                                loggedHeader ? <UserStatus userData={userData}/> :
                                    (<Link to="/login">
                                        <Button text="Войти"/>
                                    </Link>)
                            }

                        </div>
                    }
                </div>
            </header>
            <div className={["underHeader", ...collapseHeader ? "" : ["hide"]].join(" ")}/>
        </>

    );
};

export default Header;
