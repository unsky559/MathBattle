import React from 'react';
import Logo from "../logo/logo";
import Nav from "../navigation/nav";
import UserStatus from "../userStatus/userStatus";
import Button from "../button/button";

import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="leftHeader">
                    <Logo />
                    <Nav />
                </div>
                <div className="rightHeader">
                    {/*<UserStatus/>*/}
                    <Button text="Login"/>
                </div>
            </div>
        </header>
    );
};

export default Header;
