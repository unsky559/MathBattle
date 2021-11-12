import React, {useEffect, useState} from 'react';
import Logo from "../logo/logo";
import Nav from "../navigation/nav";
import UserStatus from "../userStatus/userStatus";
import Button from "../button/button";

import './header.scss';

const Header = (props) => {
    const [collapsed, setCollapsed] = useState(props.collapse);

    return (
        <>
            <header className={ ["header", ...collapsed ? "" : ["transparent"]].join(" ") }>
                <div className="container">
                    <div className="leftHeader">
                        <Logo alternate={collapsed ? false : true} />
                        { collapsed && <Nav /> }
                    </div>
                    <Button text="toogle" onClick={() => {
                        setCollapsed(!collapsed);
                    }}/>
                    { collapsed &&
                    <div className="rightHeader">
                        {/*<UserStatus/>*/}
                        <Button text="Input"/>
                    </div>
                    }
                </div>
            </header>
            <div className={ ["underHeader", ...collapsed ? "" : ["hide"]].join(" ") }></div>
        </>

    );
};

export default Header;
