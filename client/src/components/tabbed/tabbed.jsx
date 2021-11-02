import React from 'react';

import "./tabbed.scss";
import "./tabs.scss";

const Tabbed = (props) => {
    return (
        <div className="tabbed">
            <div className="tabs">
                <div className="tabBtn active" tabIndex="0">
                    Быстрый старт
                </div>
                <div className="tabBtn" tabIndex="0">
                    Лобби
                </div>
            </div>
            <div className="contents">
                {props.children}
            </div>
        </div>
    );
};

export default Tabbed;
