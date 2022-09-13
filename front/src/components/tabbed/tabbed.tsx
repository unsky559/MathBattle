import React from 'react';

import cl from "./tabbed.module.scss";
import "./tabs.scss";

type propType = {
    children: JSX.Element
}

const Tabbed = (props: propType) => {
    return (
        <div className={cl.tabbed}>

            {/*<div className="tabs">*/}
            {/*    <div className="tabBtn active" tabIndex="0">*/}
            {/*        Быстрый старт*/}
            {/*    </div>*/}
            {/*    <div className="tabBtn" tabIndex="0">*/}
            {/*        Лобби*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={cl.contents}>
                {props.children}
            </div>
        </div>
    );
};

export default Tabbed;
