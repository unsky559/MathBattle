import React from 'react';
import "./smartIcon.scss";

const SmartIcon = (props) => {
    return (
        <div className="smartIcon">
            <div className="iconicInfo">
                <div className="iconicIcon">
                    { props.icon }
                </div>
                <div className="iconicData">
                    { props.text }
                </div>
            </div>
        </div>
    );
};

export default SmartIcon;
