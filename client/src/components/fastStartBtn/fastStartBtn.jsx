import React from 'react';
import "./fastStartBtn.scss";
import SmartIcon from "../smartIcon/smartIcon";

const FastStartBtn = () => {
    return (
        <div className="fastStartBtn" tabIndex="0">
            <div className="foreground">
                <div className="content">
                    <h3 className="startTitle">Реакция</h3>
                    <div className="iconRow">
                        <SmartIcon text="1s"/>
                    </div>
                </div>
            </div>
            <div className="background">
                <span className="example">1+6</span>
            </div>
        </div>
    );
};

export default FastStartBtn;
