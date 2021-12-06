import React, {useEffect, useState} from 'react';
import Logo from "../logo/logo";
import Nav from "../navigation/nav";
import UserStatus from "../userStatus/userStatus";
import Button from "../button/button";

import './header.scss';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = (props) => {
    // const [collapsed, setCollapsed] = useState(props.collapse);
    const collapseHeader = useSelector(state => state.headerCollapse);
    const loggedHeader = useSelector(state => state.headerLogged);
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
                                loggedHeader ? <UserStatus/> :
                                    (<Link to="/login">
                                        <Button text="Войти"/>
                                    </Link>)
                            }

                        </div>
                    }
                </div>
            </header>
            <div className={ ["underHeader", ...collapseHeader ? "" : ["hide"]].join(" ") }></div>
        </>

    );
};

export default Header;
